import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdicionarItemPageRoutingModule } from './adicionar-item-routing.module';

import { AdicionarItemPage } from './adicionar-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdicionarItemPageRoutingModule
  ],
  declarations: [AdicionarItemPage]
})
export class AdicionarItemPageModule {}
