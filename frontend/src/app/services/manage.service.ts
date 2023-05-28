import { Injectable } from "@angular/core";
import { BackendService } from "./backend.service";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Login } from "../interfaces/core.interfaces";


@Injectable()
export class ManageService {
    public token$: BehaviorSubject<any> = new BehaviorSubject(null);
    public userInfo$: BehaviorSubject<any> = new BehaviorSubject(null);
    public _isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isLoggedIn$ = this._isLoggedIn$.asObservable();


    constructor(
        private readonly backendService:  BackendService
    ) {

    }

    public login(userData: Login): Observable<any> {
        return this.backendService.auth.login$(userData).pipe(
            tap(() => {
                this._isLoggedIn$.next(true);
            })
        );
    }

    public refresh(token: string): Observable<any> {
        return this.backendService.auth.refresh$(token).pipe(
            tap((response) => {
                this.userInfo$.next({role: response.role, login: response.login});
                this.token$.next(response.accessToken);
                console.log("refresh success");
                
            }, (err) => {
                throw err;
            })
        )
    }

}