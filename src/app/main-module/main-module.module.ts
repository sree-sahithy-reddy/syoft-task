import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainModuleRoutingModule } from './main-module-routing.module';
import { ProductsComponent } from './products/products.component';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';


@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    MainModuleRoutingModule,
    FormsModule
  ],
  providers:[ProductService]
})
export class MainModuleModule { }
