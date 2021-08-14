import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminComponent } from './admin.component';
import { AdminRoutes } from './admin.routing';
import { ChartistModule } from 'ng-chartist';

import { SalesOverviewGrapComponent } from './dashboard-components/sales-overview-grap/sales-overview-grap.component';
import { VisiterGraphComponent } from './dashboard-components/visiter-graph/visiter-graph.component';
import { StickerComponent } from './dashboard-components/sticker/sticker.component';
import { ContactsComponent } from './dashboard-components/contacts/contacts.component';
import { ActivityComponent } from './dashboard-components/activity/activity.component';
import { ProductsListComponent } from './modules/products/products-list/products-list.component';
import { OrdersListComponent } from './modules/orders/orders-list/orders-list.component';
import { SharedModule } from '../shared/shared.module';
import { DetailProductComponent } from './modules/products/detail-product/detail-product.component';
import { AddProductComponent } from './modules/products/add-product/add-product.component';
import { EditProductComponent } from './modules/products/edit-product/edit-product.component';
import { CopyProductComponent } from './modules/products/copy-product/copy-product.component';
import { ListMessagesComponent } from './modules/messages/list-messages/list-messages.component';
import { NewMessageComponent } from './modules/messages/new-message/new-message.component';
import { ResponseMessageComponent } from './modules/messages/response-message/response-message.component';
import { GenerateOrderMessageComponent } from './modules/messages/generate-order-message/generate-order-message.component';
import { DetailOrderComponent } from './modules/orders/detail-order/detail-order.component';
import { CreateOrderComponent } from './modules/orders/create-order/create-order.component';
import { AccordanceOrderComponent } from './modules/orders/accordance-order/accordance-order.component';
import { PaymentOrderComponent } from './modules/orders/payment-order/payment-order.component';
import { StateOrderComponent } from './modules/orders/state-order/state-order.component';
import { PackingListComponent } from './modules/packings/packing-list/packing-list.component';
import { DetailPackingComponent } from './modules/packings/detail-packing/detail-packing.component';
import { AddPackingComponent } from './modules/packings/add-packing/add-packing.component';
import { EditPackingComponent } from './modules/packings/edit-packing/edit-packing.component';
import { AddProductStep2Component } from './modules/products/add-product-step2/add-product-step2.component';
import { AddProductStep3Component } from './modules/products/add-product-step3/add-product-step3.component';
import { ProductStep1Component } from './modules/products/steps/product-step1/product-step1.component';
import { ProductStep2Component } from './modules/products/steps/product-step2/product-step2.component';
import { ProductStep3Component } from './modules/products/steps/product-step3/product-step3.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DemoMaterialModule,
        FlexLayoutModule,
        ChartistModule,
        SharedModule,
        HttpClientModule,
        AngularEditorModule,
        RouterModule.forChild(AdminRoutes)
    ],
    declarations: [
        AdminComponent,
        SalesOverviewGrapComponent, 
        VisiterGraphComponent, 
        StickerComponent, 
        ContactsComponent, 
        ActivityComponent, 
        ProductsListComponent, 
        OrdersListComponent, 
        DetailProductComponent, 
        AddProductComponent, 
        EditProductComponent, 
        CopyProductComponent, 
        ListMessagesComponent, 
        NewMessageComponent, 
        ResponseMessageComponent, 
        GenerateOrderMessageComponent, 
        DetailOrderComponent, 
        CreateOrderComponent, 
        AccordanceOrderComponent, 
        PaymentOrderComponent, 
        StateOrderComponent, 
        PackingListComponent, 
        DetailPackingComponent, 
        AddPackingComponent, 
        EditPackingComponent, AddProductStep2Component, AddProductStep3Component, ProductStep1Component, ProductStep2Component, ProductStep3Component
    ]
})
export class AdminModule { }