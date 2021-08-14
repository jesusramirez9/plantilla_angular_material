import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FullDashboardComponent } from './layouts/fulldashboard/fulldashboard.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';
import { HeaderComponent } from './layouts/fulldashboard/header/header.component';
import { SidebarComponent } from './layouts/fulldashboard/sidebar/sidebar.component';
import { SpinnerComponent } from './shared/spinner.component';
import { LayoutwebComponent } from './layouts/layoutweb/layoutweb.component';

import { SharedModule } from './shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DemoMaterialModule } from './demo-material-module';
import { PortalModule } from './portal-web/portal-web.module';
import { RegisterComponent } from './pages/register/register.component';
import { FooterComponent } from './layouts/fulldashboard/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FullDashboardComponent,
    NewPasswordComponent,
    RecoverPasswordComponent,
    SpinnerComponent,
    HeaderComponent,
    SidebarComponent,
    LayoutwebComponent,
    RegisterComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    DemoMaterialModule,
    FlexLayoutModule,
    PortalModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
