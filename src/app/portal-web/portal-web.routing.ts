import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CorporativeGiftsComponent } from './corporative-gifts/corporative-gifts.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogComponent } from './blog/blog.component';
import { CraftsmenDetailComponent } from './craftsmen-detail/craftsmen-detail.component';
import { CraftsmenComponent } from './craftsmen/craftsmen.component';
import { ContactComponent } from './contact/contact.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { QuestionsComponent } from './questions/questions.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomeComponent } from './home/home.component';
import { Routes } from "@angular/router";
import { DeliveryTimesComponent } from './delivery-times/delivery-times.component';
import { ExchangeReturnsComponent } from './exchange-returns/exchange-returns.component';

export const PortalRoutes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'nosotros',
        component: AboutUsComponent
    },
    {
        path: 'preguntas-frecuentes',
        component: QuestionsComponent
    },
    {
        path: 'terminos-condiciones',
        component: TermsConditionsComponent
    },
    {
        path: 'contactenos',
        component: ContactComponent
    },
    {
        path: 'tiempos-entrega',
        component: DeliveryTimesComponent
    },
    {
        path: 'cambios-devoluciones',
        component: ExchangeReturnsComponent
    },
    {
        path: 'artesanos',
        component: CraftsmenComponent
    },
    {
        path: 'artesanos/:id',
        component: CraftsmenDetailComponent
    },
    {
        path: 'blog',
        component: BlogComponent
    },
    {
        path: 'blog/:id',
        component: BlogDetailComponent
    },
    {
        path: 'regalosCorporativos',
        component: CorporativeGiftsComponent
    },
    {
        path: 'regalosCorporativos/:id',
        component: ProductDetailComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
]