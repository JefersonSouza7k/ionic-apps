import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarItemPageRoutingModule } from './editar-item-routing.module';

import { EditarItemPage } from './editar-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarItemPageRoutingModule
  ],
  declarations: [EditarItemPage]
})
export class EditarItemPageModule {}
