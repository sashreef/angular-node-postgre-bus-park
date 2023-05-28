import { Component } from "@angular/core";
import { Login } from "../interfaces/core.interfaces";
import { FormControl, UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { Subject, take, takeUntil } from "rxjs";
import { ManageService } from "../services/manage.service";
import { CookieService } from "ngx-cookie-service";

@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})

export class LoginComponent {
    public errorMessage?: string;
    public loginForm: UntypedFormGroup;
    public pending = false;
    
    private unsubscribe$: Subject<void> = new Subject();

    constructor (
        private manageService: ManageService,
        private formBuilder: UntypedFormBuilder,
        private cookieService: CookieService
    ) {
        this.loginForm = this.formBuilder.group({
            username: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required)
        });

        
    }

    public ngOnInit(): void {
        this.pending = true;
        const token = this.cookieService.get("jwt")
        if(!!token) {
            this.manageService.refresh(token).pipe(take(1)).subscribe(() => {

                this.pending = false;
            });
        }
        console.log(this.loginForm);

        
    }

    public login(data: Login): void {
        if(this.loginForm.invalid) {
            throw "Не заполнены обязательные поля"
        }
        this.manageService.login(data).pipe(take(1)).subscribe((data) => {
            console.log(data);
        },
        (err) => {
            console.log(err)
        });
        console.log(data);
        

    //   e.preventDefault();
    //   dispatch(login({ login: user, password: pwd }))
    //     .unwrap()
    //     .then(() => navigate("/"))
    //     .catch((err) => {
    //       if (!err) setErrMsg("no server response");
    //       else if (err === 401) setErrMsg("such user does not exist");
    //       else setErrMsg("login failed");
    //     });
    }


    // const Login = () => {
    // const dispatch = useAppDispatch();
    // const userRef = useRef();
    // const navigate = useNavigate();
  
    // const [user, setUser] = useState("");
    // const [pwd, setPwd] = useState("");
    // const [errMsg, setErrMsg] = useState("");
  
    // useEffect(() => {
    //   userRef.current.focus();
    // }, []);
  
    // useEffect(() => {
    //   setErrMsg("");
    // }, [user, pwd]);
  
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   dispatch(login({ login: user, password: pwd }))
    //     .unwrap()
    //     .then(() => navigate("/"))
    //     .catch((err) => {
    //       if (!err) setErrMsg("no server response");
    //       else if (err === 401) setErrMsg("such user does not exist");
    //       else setErrMsg("login failed");
    //     });
    // };

}
