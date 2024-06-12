import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { TaskComponent } from './task/task.component';
import { AccountsComponent } from './accounts/accounts.component';

export const routes: Routes = [

    { path: '' , component: LoginComponent},
    { path: 'home' , component: HomeComponent},
    { path: 'register' , component: RegisterComponent},
    { path: 'login' , component: LoginComponent},
    { path: 'users' , component: UsersComponent},
    {path: 'task', component: TaskComponent},
    {path: 'accounts', component: AccountsComponent},
    { path: '**' , component: NotfoundComponent},
    
];

 