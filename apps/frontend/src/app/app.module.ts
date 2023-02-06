import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInPage } from './pages/signin/signin.component';
import { SignUpPage } from './pages/signup/signup.component';
import { IndexPage } from './pages/index/index.component';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { FormErrorsComponent } from './components/form-controls/form-errors/form-errors.component';
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { GlobalErrorsComponent } from './components/global-errors/global-errors.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskComponent } from './pages/tasks/task/task.component';
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './components/sidebar/profile/profile.component';
import { FolderComponent } from './components/sidebar/folder/folder.component';
import { AddFolderComponent } from './components/sidebar/add-folder/add-folder.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpPage,
    SignInPage,
    IndexPage,
    FormErrorsComponent,
    HeaderComponent,
    GlobalErrorsComponent,
    TasksComponent,
    TaskComponent,
    MainLayoutComponent,
    SidebarComponent,
    ProfileComponent,
    FolderComponent,
    AddFolderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    JwtAuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
