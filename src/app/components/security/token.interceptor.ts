import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { TokenService } from './token.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private _tokenService: TokenService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this._tokenService.EstaAutenticado()) {
            let token = this._tokenService.Get();
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token.token}`
                }
            })
        }

        return next.handle(request);
    }
}
