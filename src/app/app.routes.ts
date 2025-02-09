import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {path:"login", component: LoginComponent},
    {path:"", redirectTo: "/login", pathMatch: "full"},
    {path:"home", component: HomeComponent},
    {path : "register", component: RegisterComponent}
];
