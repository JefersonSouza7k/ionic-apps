import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdicionarItemPage } from './adicionar-item.page';

const routes: Routes = [
  {
    path: '',
    component: AdicionarItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdicionarItemPageRoutingModule {}
