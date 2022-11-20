import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInPage } from './pages/signin/signin.component';
import { SignUpPage } from './pages/signup/signup.component';
import { IndexPage } from './pages/index/index.component';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    SignUpPage,
    SignInPage,
    IndexPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [JwtAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
