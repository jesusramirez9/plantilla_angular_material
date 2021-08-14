import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DemoMaterialModule } from "../demo-material-module";
import { SharedModule } from "../shared/shared.module";
import { PortalRoutes } from "./portal-web.routing";
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { QuestionsComponent } from './questions/questions.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { ContactComponent } from './contact/contact.component';
import { DeliveryTimesComponent } from './delivery-times/delivery-times.component';
import { ExchangeReturnsComponent } from './exchange-returns/exchange-returns.component';
import { CraftsmenComponent } from './craftsmen/craftsmen.component';
import { CraftsmenDetailComponent } from './craftsmen-detail/craftsmen-detail.component';
import { BlogComponent } from './blog/blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CorporativeGiftsComponent } from './corporative-gifts/corporative-gifts.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    FlexLayoutModule,
    SharedModule,
    HttpClientModule,
    RouterModule.forChild(PortalRoutes)
  ],
  declarations: [
    HomeComponent,
    AboutUsComponent,
    QuestionsComponent,
    TermsConditionsComponent,
    ContactComponent,
    DeliveryTimesComponent,
    ExchangeReturnsComponent,
    CraftsmenComponent,
    CraftsmenDetailComponent,
    BlogComponent,
    BlogDetailComponent,
    ProductDetailComponent,
    CorporativeGiftsComponent
  ]
})
export class PortalModule { }