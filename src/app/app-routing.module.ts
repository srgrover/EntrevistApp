import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'consultora/list', loadChildren: () => import('./pages/consultora/list/list.module').then(m => m.ListModule) }, { path: 'consultora/new', loadChildren: () => import('./pages/consultora/new/new.module').then(m => m.NewModule) }, { path: 'consultora/details', loadChildren: () => import('./pages/consultora/details/details.module').then(m => m.DetailsModule) }, { path: 'consultora/edit', loadChildren: () => import('./pages/consultora/edit/edit.module').then(m => m.EditModule) }, { path: 'cliente/list', loadChildren: () => import('./pages/cliente/list/list.module').then(m => m.ListModule) }, { path: 'cliente/new', loadChildren: () => import('./pages/cliente/new/new.module').then(m => m.NewModule) }, { path: 'cliente/details', loadChildren: () => import('./pages/cliente/details/details.module').then(m => m.DetailsModule) }, { path: 'cliente/edit', loadChildren: () => import('./pages/cliente/edit/edit.module').then(m => m.EditModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
