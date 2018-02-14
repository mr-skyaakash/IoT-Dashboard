import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsComponent } from './components/main/cards/cards.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuard } from './services/auth/auth.guard';
import { TabsComponent } from './components/main/tabs/tabs.component';
import { ErrorComponent } from './components/notFound/error/error.component';

const route:  Routes = [
    {path: '', component: TabsComponent, canActivate:  [AuthGuard]},
    {path: 'login', component: LoginComponent, data:  { state:  'login' }},
    {path: 'signup', component: SignupComponent, data:  { state:  'signup' }},
    
    {path:'**',component: ErrorComponent}
];

@NgModule({
    imports:  [RouterModule.forRoot(route)],
    exports:  [RouterModule],
    providers: [
        AuthGuard
    ]
})

export class AppRouting {}
