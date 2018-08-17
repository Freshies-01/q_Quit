import { Component, AfterViewInit, Renderer, ElementRef } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { JhiEventManager } from "ng-jhipster";

import { LoginService } from "app/core/login/login.service";
import { StateStorageService } from "app/core/auth/state-storage.service";

@Component({
  selector: "jhi-login-page",
  templateUrl: "./login-page.component.html"
})
export class LoginPageComponent implements AfterViewInit {
  authenticationError: boolean;
  password: string;
  rememberMe: boolean;
  username: string;
  credentials: any;

  constructor(
    private loginService: LoginService,
    private stateStorageService: StateStorageService,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private router: Router
  ) {
    this.credentials = {};
  }

  ngAfterViewInit() {
    this.renderer.invokeElementMethod(
      this.elementRef.nativeElement.querySelector("#username"),
      "focus",
      []
    );
  }

  cancel() {
    this.credentials = {
      username: null,
      password: null,
      rememberMe: true
    };
    this.authenticationError = false;
  }

  login() {
    this.loginService
      .login({
        username: this.username,
        password: this.password,
        rememberMe: this.rememberMe
      })
      .then(() => {
        this.authenticationError = false;
        if (
          this.router.url === "/register" ||
          /^\/activate\//.test(this.router.url) ||
          /^\/reset\//.test(this.router.url)
        ) {
          this.router.navigate([""]);
        }

        // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
        // // since login is succesful, go to stored previousState and clear previousState
        const redirect = this.stateStorageService.getUrl();
        if (redirect) {
          this.stateStorageService.storeUrl(null);
          this.router.navigate([redirect]);
        }
      })
      .catch(() => {
        this.authenticationError = true;
      });
  }

  register() {
    this.router.navigate(["/register"]);
  }

  requestResetPassword() {
    this.router.navigate(["/reset", "request"]);
  }
}