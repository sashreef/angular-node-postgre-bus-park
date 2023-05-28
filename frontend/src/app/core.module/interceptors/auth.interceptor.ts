import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, from, switchMap } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';

@Injectable()
export class authInterceptor { }

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private backendService: BackendService
    ) { }
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookieService.get("jwt");
    if(!!token) {
      const authReq = req.clone({
        headers: req.headers.set("Authorization",`Bearer ${token}`)
        
      })
    }    
    req = req.clone({
      

    });

    return next.handle(req);
  }
}


  


// export class AuthInterceptor implements HttpInterceptor {
//     constructor( ) { 

        
//     }
//     public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
          
//             // useEffect(() => {
//             //   const requestIntercept = axiosPrivate.interceptors.request.use(
//             //     (config) => {
//             //       if (!config.headers["Authorization"]) {
//             //         config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
//             //         config.headers["Role"] = `${auth.role}`;
//             //       }
//             //       return config;
//             //     },
//             //     (error) => Promise.reject(error)
//             //   );
          
//             //   const responseIntercept = axiosPrivate.interceptors.response.use(
//             //     (response) => response,
//             //     async (error) => {
//             //       const prevRequest = error?.config;
//             //       if (error?.response?.status === 403 && !prevRequest?.sent) {
//             //         prevRequest.sent = true;
//             //         const newAccessToken = await refresh();
//             //         prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//             //         prevRequest.headers["Role"] = `${auth.role}`;
//             //         return axiosPrivate(prevRequest);
//             //       }
//             //       return Promise.reject(error);
//             //     }
//             //   );
          
//             //   return () => {
//             //     axiosPrivate.interceptors.request.eject(requestIntercept);
//             //     axiosPrivate.interceptors.response.eject(responseIntercept);
//             //   };
//             // }, [auth, refresh]);
          
//             // return axiosPrivate;
        
//     }