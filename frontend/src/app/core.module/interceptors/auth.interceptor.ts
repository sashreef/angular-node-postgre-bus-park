import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, from, switchMap } from 'rxjs';
import { ManageService } from 'src/app/services/manage.service';

@Injectable()
export class authInterceptor { }

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private manageService: ManageService
    ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.cookieService.get("accesstoken");
    const role = this.cookieService.get("role");
    if (!authToken) {
      return next.handle(request);
    }
    return from(this.manageService.token$).pipe(
      switchMap(tokenData => {
        if (!tokenData?.isAlive) {
          return from(this.manageService.refresh(tokenData.token)).pipe(
            switchMap(refreshData => {
              console.log("refresh success");
              refreshData.accessToken;
              request = request.clone({
                setHeaders: {
                  "Authorization": "Bearer " + authToken,
                  // "accept-language":  + ";q=0.8,en-us;q=0.6,de-de;q=0.4,de;q=0.2",
                  "Role": role
                }
              });
              return next.handle(request);
            })
          )
        } else {
          request = request.clone({
            setHeaders: {
              "Authorization": "Bearer " + authToken,
              // "accept-language":  + ";q=0.8,en-us;q=0.6,de-de;q=0.4,de;q=0.2",
              "Role": role
            }
          });
        return next.handle(request);
        }
      })
    )
  }
}