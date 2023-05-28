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
        login$: (userData: Login): Observable<any> => {
            const url = `${this.config.api.root}/user/sign_in`;
            return this.http.post(url, userData, {withCredentials: true});
        },

        refresh$: (token: string): Observable<any> => {
            const headers = new HttpHeaders();
            headers.set("Cookie", token);
            const url = `${this.config.api.root}/refresh`;
            return this.http.get(url, {headers, withCredentials: true});
        }
    }
}