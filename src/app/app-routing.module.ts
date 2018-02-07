import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsComponent } from './components/main/cards/cards.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuard } from './services/auth/auth.guard';

const route: Routes = [
    {path:'',component:CardsComponent, canActivate: [AuthGuard]},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent}
    
]

@NgModule({
    imports: [RouterModule.forRoot(route)],
    exports: [RouterModule],
    providers: [
        AuthGuard
    ]
})

export class AppRouting {}