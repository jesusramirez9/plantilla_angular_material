import { AddProductStep3Component } from './modules/products/add-product-step3/add-product-step3.component';
import { AddProductStep2Component } from './modules/products/add-product-step2/add-product-step2.component';
import { EditPackingComponent } from './modules/packings/edit-packing/edit-packing.component';
import { DetailPackingComponent } from './modules/packings/detail-packing/detail-packing.component';
import { AddPackingComponent } from './modules/packings/add-packing/add-packing.component';
import { PackingListComponent } from './modules/packings/packing-list/packing-list.component';
import { DetailOrderComponent } from './modules/orders/detail-order/detail-order.component';
import { CreateOrderComponent } from './modules/orders/create-order/create-order.component';
import { StateOrderComponent } from './modules/orders/state-order/state-order.component';
import { AccordanceOrderComponent } from './modules/orders/accordance-order/accordance-order.component';
import { PaymentOrderComponent } from './modules/orders/payment-order/payment-order.component';
import { GenerateOrderMessageComponent } from './modules/messages/generate-order-message/generate-order-message.component';
import { ResponseMessageComponent } from './modules/messages/response-message/response-message.component';
import { NewMessageComponent } from './modules/messages/new-message/new-message.component';
import { ListMessagesComponent } from './modules/messages/list-messages/list-messages.component';
import { CopyProductComponent } from './modules/products/copy-product/copy-product.component';
import { DetailProductComponent } from './modules/products/detail-product/detail-product.component';
import { EditProductComponent } from './modules/products/edit-product/edit-product.component';
import { Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AddProductComponent } from './modules/products/add-product/add-product.component';
import { ProductsListComponent } from './modules/products/products-list/products-list.component';
import { OrdersListComponent } from './modules/orders/orders-list/orders-list.component';

export const AdminRoutes: Routes = [
  { 
    path: 'dashboard', 
    component: AdminComponent 
  },
  { 
    path: 'product', 
    component: ProductsListComponent 
  },
  { 
    path: 'product/add', 
    component: AddProductComponent 
  },
  { 
    path: 'product/add/step2/:id', 
    component: AddProductStep2Component 
  },
  { 
    path: 'product/add/step3/:id', 
    component: AddProductStep3Component 
  },
  { 
    path: 'product/detail/:id', 
    component: DetailProductComponent
  },
  { 
    path: 'product/edit/:id', 
    component: EditProductComponent
  },
  { 
    path: 'product/copy/:id', 
    component: CopyProductComponent
  },
  { 
    path: 'messages', 
    component: ListMessagesComponent
  },
  { 
    path: 'messages/new', 
    component: NewMessageComponent
  },
  { 
    path: 'messages/response', 
    component: ResponseMessageComponent
  },
  { 
    path: 'messages/generateOrder', 
    component: GenerateOrderMessageComponent
  },
  { 
    path: 'orders',
    component: OrdersListComponent
  },
  { 
    path: 'orders/detail',
    component: DetailOrderComponent
  },
  { 
    path: 'orders/payment',
    component: PaymentOrderComponent
  },
  { 
    path: 'orders/accordance',
    component: AccordanceOrderComponent
  },
  { 
    path: 'orders/changeState',
    component: StateOrderComponent
  },
  { 
    path: 'orders/generate',
    component: CreateOrderComponent
  },
  { 
    path: 'packing',
    component: PackingListComponent
  },
  { 
    path: 'packing/add',
    component: AddPackingComponent
  },
  { 
    path: 'packing/detail/:id',
    component: DetailPackingComponent
  },
  { 
    path: 'packing/edit/:id',
    component: EditPackingComponent
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

];
