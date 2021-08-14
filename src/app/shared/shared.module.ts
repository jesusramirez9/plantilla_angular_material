import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { ProductCardComponent } from './product-card/product-card.component';
import { DemoMaterialModule } from '../demo-material-module';
import { ColorSketchModule } from 'ngx-color/sketch';
import { CommonModule } from '@angular/common';
import { InputFileComponent } from './input-file/input-file.component';
import { PackingCardComponent } from './packing-card/packing-card.component';
import { MarcasSliderComponent } from './marcas-slider/marcas-slider.component';
import { SlickCarouselModule } from "ngx-slick-carousel";
import { DialogColorComponent } from './dialog-color/dialog-color.component';
import { ProductCatalogueComponent } from './product-catalogue/product-catalogue.component';


@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ProductCardComponent,
    InputFileComponent,
    PackingCardComponent,
    MarcasSliderComponent,
    DialogColorComponent,
    ProductCatalogueComponent
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    ProductCardComponent,
    InputFileComponent,
    PackingCardComponent,
    MarcasSliderComponent,
    ProductCatalogueComponent
  ],
  imports: [
    DemoMaterialModule,
    CommonModule,
    SlickCarouselModule,
    ColorSketchModule
  ],
  providers: [MenuItems]
})
export class SharedModule { }
