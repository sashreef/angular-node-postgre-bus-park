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
    const token = this.cookieService.get("accesstoken");
    const role = this.cookieService.get("role");
    const headers = req.headers
    headers.set("Authorization",`Bearer ${token}`);
    headers.set("Role", role);

    if(token) {
      req = req.clone({
        headers: headers
      });
    }
    return next.handle(req);
  }
}