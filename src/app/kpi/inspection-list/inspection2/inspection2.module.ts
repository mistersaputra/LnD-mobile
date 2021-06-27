import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Inspection2PageRoutingModule } from './inspection2-routing.module';

import { Inspection2Page } from './inspection2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Inspection2PageRoutingModule
  ],
  declarations: [Inspection2Page]
})
export class Inspection2PageModule {}
