import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Route } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TokenService } from './token.service';
import { TokenInterceptor } from './token.interceptor';
import { TokenGuard } from './token.guard';

export const LoginRoute: Route = {
  path: 'login',
  component: LoginComponent
};

@NgModule({
  imports: [
    CommonModule, FormsModule, HttpClientModule, HttpModule
  ],
  providers: [ TokenService, TokenGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  declarations: [LoginComponent]
})
export class SecurityModule { }
