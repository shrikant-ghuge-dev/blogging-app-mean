import { Routes } from '@angular/router';
import { AddPostComponent } from './Pages/add-post/add-post.component';
import { ResetPasswordComponent } from './Pages/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './Pages/forgot-password/forgot-password.component';
import { SigninComponent } from './Pages/signin/signin.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { HomeComponent } from './Pages/home/home.component';
import { PostDetailsComponent } from './Pages/post-details/post-details.component';
import { UserProfileComponent } from './Pages/user-profile/user-profile.component';
import { restrictRouteGuard } from './Guards/restrict-route.guard';
import { AdminHomeComponent } from './AdminPanel/Pages/admin-home/admin-home.component';
import { UsersComponent } from './AdminPanel/Pages/users/users.component';
import { AdminComponent } from './AdminPanel/Components/admin/admin.component';

export const routes: Routes = [
    {
        path: '', pathMatch: "full", redirectTo: "/home"
    },
    {
        path: 'signin',
        component: SigninComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'forget-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'reset-password',
        component: ResetPasswordComponent
    },
    {
        path: 'add-post',
        component: AddPostComponent,
        canActivate: [restrictRouteGuard]
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'blog/:id',
        component: PostDetailsComponent
    },
    {
        path: 'user/:id',
        component: UserProfileComponent,
        canActivate: [restrictRouteGuard]
    },
    {
        path: 'admin',
        redirectTo: 'admin/home',
        pathMatch: 'full' // Redirect only when the full path is '/admin'
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: 'home',
                component: AdminHomeComponent,
            },
            {
                path: 'users',
                component: UsersComponent,
            }
        ]
    },
    {
        path: '**',
        component: SigninComponent
    }
];
