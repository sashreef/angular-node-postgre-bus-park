import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigurationService } from "./configuration.service";
import { Login } from "../interfaces/core.interfaces";
import { Observable, of } from "rxjs";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class BackendService {
    public headers = new HttpHeaders({
		"Cache-Control": "no-cache, no-store, must-revalidate, post-check=0, pre-check=0",
		"Pragma": "no-cache",
		"Expires": "0"
	});

    constructor(
        private readonly http: HttpClient,
        private readonly config: ConfigurationService,
        private coockieService: CookieService
    ) { } 

    public readonly auth = {
        login$: (userData: {login: string, password: string}): Observable<any> => {
            const url = `${this.config.api.root}/user/sign_in`;
            return this.http.post(url, userData, {withCredentials: true});
        },
        register$: (userData: {login: string, password: string, full_name: string, phone_number: string}): Observable<any> => {
            const url = `${this.config.api.root}/user/sign_up`;
            return this.http.post(url, userData);
        },

        refresh$: (token: string, role:string): Observable<any> => {
            const headers = new HttpHeaders({ Authorization: `Bearer ${token}`,"Role": role });
            const url = `${this.config.api.root}/user/refresh`;
            return this.http.get<any>(url, { withCredentials: true, headers});
        }

    }
}