import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { IndexPage } from './pages/index/index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPage } from './pages/signin/signin.component';
import { SignUpPage } from './pages/signup/signup.component';

const routes: Routes = [
  { path: '', component: IndexPage },
  { path: 'signup', component: SignUpPage },
  { path: 'signin', component: SignInPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
