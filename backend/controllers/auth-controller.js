const db = require("../db-config");
const sha256 = require("sha256");
const jwt = require("jsonwebtoken");

class AuthController {

  async signUpUser(req, res) {
    const { login, password, full_name, phone_number } = req.body;
    let newUser;
    try {
      newUser = await db("connect_user").query(
        `insert into Users (login, password, full_name, phone_number) values ($1, $2, $3, $4)`,
        [login, password, full_name, phone_number]
      );
    } catch (err) {
      // newUser = db("connect_user").query(`select reset_user_id_seq()`); // decrement user_id to fix serial sequence
      if (err.code == 23505)
        return res.status(409).json({ error: `${err.detail}` });

      else return res.status(400).json({ error: "bad request" }); 
    }
    res.status(201).json(newUser);
  }

  async signInUser(req, res) {
    try {
      const { login, password } = req.body;
      const foundUser = await db().query(
        `select * from Users where Users.login = $1 and Users.password = $2`,
        [
          login,
          sha256(password), 
        ]
      );
      if (!foundUser.rowCount) throw "no such user yet";
      const accessToken = jwt.sign(
        { login, role: foundUser.rows[0].category },
        process.env.ACCESS_TOKEN_SALT,
        { expiresIn: "30s" }
      );
      const refreshToken = jwt.sign(
        { login, role: foundUser.rows[0].category },
        process.env.REFRESH_TOKEN_SALT,
        { expiresIn: "12h" }
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 12 * 60 * 60 * 1000,
      });
      res.json({ accessToken, role: foundUser.rows[0].category });
    } catch (err) {
      console.log(err);
      return res.status(401).json({ error: "invalid login or password" }); // unauthorized
    }
  }

  signOutUser(req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); // no content
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
    res.sendStatus(204);
  }


  userRefreshToken(req, res) {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SALT,
      async (err, decoded) => {
        let foundUser = await db(req.body.role).query(
          `select * from Users where Users.login = $1`,
          [decoded.login]
        );
        if (err || !foundUser?.rowCount) return res.sendStatus(403);
        const accessToken = jwt.sign(
          { login: decoded.login, role: decoded.role },
          process.env.ACCESS_TOKEN_SALT,
          { expiresIn: "30s" }
        );
        res.json({
          accessToken,
          login: decoded.login,
          role: decoded.role,
        });
      }
    );
  }
}

module.exports = new AuthController();
