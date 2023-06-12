const db = require("../db-config");
const sha256 = require("sha256");

class UserController {
  async getUserInfo(req, res) {
    const login = req.body.user;
    let userInfo;
    try {
      if (req.body.role = "client") {
        userInfo = await db(req.body.role).query(
          'SELECT full_name, phone_number FROM Users WHERE login = $1',
          [login]
        );
      }else if (req.body.role = "administrator")
      {
        userInfo = await db(req.body.role).query(
          'SELECT full_name, phone_number, category FROM Users '
        );
      }

    } catch (error) {
      console.error(error);
    }
    res.json({ ...userInfo.rows[0], login: login });
  }

  async getAllUser(req, res) {
    let userInfo;
    try {
        userInfo = await db(req.body.role).query(
          `SELECT user_id, login, full_name, phone_number, category FROM Users 
           ORDER BY users.user_id ASC`
        );
      
    } catch (error) {
      console.error(error);
    } 
    res.json(userInfo.rows);
  }

  async updateUserInfo(req, res) {
    let { login, password, new_password, full_name, phone_number } = req.body;
    let updatedUser;
    try {
      const user = await db(req.body.role).query(
        'SELECT password FROM Users WHERE login = $1',
        [login]
      );

      if (user && user.rows.length > 0) {
        const currentPassword = user.rows[0].password;
        if (currentPassword !== sha256(password)) {
          return res.status(400).json({ error: "Invalid password" });
        }
        if (new_password == null) {
          new_password = currentPassword;
        } else {
          new_password = sha256(new_password);
        }
        updatedUser = await db(req.body.role).query(
          `UPDATE Users SET password = $1, full_name = $2, phone_number = $3 WHERE login = $4`,
          [new_password, full_name, phone_number, login]
        );

        res.json(updatedUser.rows[0]);
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async signUpUserForAdmin(req, res) {
    const { login, password, full_name, phone_number, category } = req.body;
    let newUser;
    try {
      newUser = await db(req.body.role).query(
        `insert into Users (login, password, full_name, phone_number, category) values ($1, $2, $3, $4, $5)`,
        [login, password, full_name, phone_number, category]
      );
    } catch (err) {
      console.error(err);
      if (err.code == 23505)
        return res.status(409).json({ error: `${err.detail}` });

      else return res.status(400).json({ error: "bad request" }); 
    }
    res.status(201).json(newUser);
  }

  async updateUserForAdmin(req, res) {
    let { login, password,  full_name, phone_number , category} = req.body;
    let updatedUser;
    try {
      const user = await db(req.body.role).query(
        'SELECT password FROM Users WHERE login = $1',
        [login]
      );

      if (user && user.rows.length > 0) {
        const currentPassword = user.rows[0].password;
        
        if (password == null) {
          password = currentPassword;
        } else {
          password = sha256(password);
        }
        updatedUser = await db(req.body.role).query(
          `UPDATE Users SET password = $1, full_name = $2, phone_number = $3, category = $4  WHERE login = $5`,
          [password, full_name, phone_number, category, login]
        );

        res.json(updatedUser.rows[0]);
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteUser(req, res) {
    const user_id = req.body.user_id;
    try {
      await db(req.body.role).query(
        `DELETE FROM booking WHERE client_id = $1`,
        [user_id]
      );
      await db(req.body.role).query(
        `DELETE FROM ticket WHERE client_id = $1`,
        [user_id]
      );
      await db(req.body.role).query(
        `DELETE FROM Users WHERE user_id = $1`,
        [user_id]
      );
      return res.status(201).json();
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Delete error" });
    }
  }
}
module.exports = new UserController();