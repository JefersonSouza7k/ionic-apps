import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'listar-itens',
    loadChildren: () => import('./listar-itens/listar-itens.module').then( m => m.ListarItensPageModule)
  },
  {
    path: 'adicionar-item',
    loadChildren: () => import('./adicionar-item/adicionar-item.module').then( m => m.AdicionarItemPageModule)
  },
  {
    path: 'editar-item',
    loadChildren: () => import('./editar-item/editar-item.module').then( m => m.EditarItemPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
