import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const redirectLoggedInToProfile = () => redirectLoggedInTo(['profile']);

const routes: Routes = [
  { path: 'consultora/list', loadChildren: () => import('./pages/consultora/list/list.module').then(m => m.ListModule) },
  { path: 'consultora/new', loadChildren: () => import('./pages/consultora/new/new.module').then(m => m.NewModule) },
  { path: 'consultora/details', loadChildren: () => import('./pages/consultora/details/details.module').then(m => m.DetailsModule) },
  { path: 'consultora/edit', loadChildren: () => import('./pages/consultora/edit/edit.module').then(m => m.EditModule) },
  { path: 'cliente/list', loadChildren: () => import('./pages/cliente/list/list.module').then(m => m.ListModule) },
  { path: 'cliente/new', loadChildren: () => import('./pages/cliente/new/new.module').then(m => m.NewModule) },
  { path: 'cliente/details', loadChildren: () => import('./pages/cliente/details/details.module').then(m => m.DetailsModule) },
  { path: 'cliente/edit', loadChildren: () => import('./pages/cliente/edit/edit.module').then(m => m.EditModule) },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/auth/login/login.module').then((m) => m.LoginModule),
    ...canActivate(redirectLoggedInToHome),
  },
  { path: 'register', loadChildren: () => import('./pages/auth/register/register.module').then(m => m.RegisterModule) },
  {
    path: 'profile',
    loadChildren: () =>
    import('./pages/user/profile/profile.module').then((m) => m.ProfileModule),
      ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'new',
    loadChildren: () =>
      import('./pages/form/new/new.module').then((m) => m.NewModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('./pages/form/edit/edit.module').then((m) => m.EditModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
