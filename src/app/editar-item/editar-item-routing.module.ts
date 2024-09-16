import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarItemPage } from './editar-item.page';

const routes: Routes = [
  {
    path: '',
    component: EditarItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarItemPageRoutingModule {}
