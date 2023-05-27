import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ConfigurationService } from "./configuration.service";
import { Login } from "../interfaces/core.interfaces";
import axios from "axios";
import { Observable, of } from "rxjs";

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
    ) { } 

    public readonly auth = {
        login$: (userData: Login): Observable<any> => {
            return of(axios.post(
                "/user/sign_in",
                { login: userData.username, password: userData.password },
                { withCredentials: true }
            ))
        },

        getReq$: ():Observable<any> => {
            const url = `${this.config.api}/get/list`;
            return of(axios.get(url, {withCredentials: true}));
        }
        
    // "auth/login",
    // async (
    //   userData: { login: string; password: string },
    //   { rejectWithValue }
    // ) => {
    //   try {
    //     const response = await axios.post(
    //       "/user/sign_in",
    //       { login: userData.login, password: userData.password },
    //       { withCredentials: true }
    //     );
    //     response.data.login = userData.login;
    //     return response.data;
    //   } catch (err) {
    //     const error = err as AxiosError;
    //     return rejectWithValue(error.response?.status);
    //   }
    // }
    }




}