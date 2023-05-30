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
    ) { }
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookieService.get("jwt");
    req = req.clone({
      headers: req.headers.set("Authorization",`Bearer ${token}`)
    });
    return next.handle(req);
  }
}