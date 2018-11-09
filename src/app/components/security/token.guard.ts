import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";

@Injectable({
    providedIn: 'root'
})
export class TokenGuard implements CanActivate {
    constructor(
        private _router: Router, 
        private _tokenService: TokenService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this._tokenService.EstaAutenticado()) {
            return true;
        }

        this._router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
