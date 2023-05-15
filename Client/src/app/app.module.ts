import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    HomeModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
