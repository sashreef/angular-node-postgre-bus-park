import { Injectable } from "@angular/core";
import { BackendService } from "./backend.service";
import { Observable } from "rxjs";
import { Login } from "../interfaces/core.interfaces";


@Injectable()
export class ManageService {


    constructor(
        private readonly backendService:  BackendService
    ) {

    }

    public login(userData: Login): Observable<any> {
        return this.backendService.auth.login$(userData);
    }

}