
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { IndexPage } from './pages/index/index.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPage } from './pages/signin/signin.component';
import { SignUpPage } from './pages/signup/signup.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TaskPage } from './pages/tasks/task/task.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: '', component: IndexPage },
  { path: 'signup', component: SignUpPage },
  { path: 'signin', component: SignInPage },
  {
    path: 'tasks', 
    canActivate: [JwtAuthGuard], 
    component: MainLayoutComponent, 
    children: [
      { path: '', component: TasksComponent },
      { path: ':id', component: TaskPage },
    ]
  },
  { 
    path: 'profile/:id', 
    component: ProfileComponent,
    canActivate: [JwtAuthGuard] 
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
