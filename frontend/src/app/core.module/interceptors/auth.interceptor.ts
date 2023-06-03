import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable()
export class authInterceptor { }

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.cookieService.get("accesstoken");
    const role = this.cookieService.get("role");
    if(authToken) {
      req = req.clone({
        setHeaders: {
						"Authorization": "Bearer " + authToken,
						// "accept-language":  + ";q=0.8,en-us;q=0.6,de-de;q=0.4,de;q=0.2"
            "Role": role
					}
      });
    }
    return next.handle(req);
  }
}