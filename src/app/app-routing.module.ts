import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsComponent } from './components/main/cards/cards.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuard } from './services/auth/auth.guard';

const route: Routes = [
    {path:'login',component:LoginComponent, data: { state: 'login' }},
    {path:'signup',component:SignupComponent, data: { state: 'signup' }},
    {path:'',component:CardsComponent, canActivate: [AuthGuard]},
]

@NgModule({
    imports: [RouterModule.forRoot(route)],
    exports: [RouterModule],
    providers: [
        AuthGuard
    ]
})

export class AppRouting {}