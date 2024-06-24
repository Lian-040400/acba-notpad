import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {NotesService} from "./modules/notes/services/notes/notes.service";
import {ErrorHandlerInterceptorProvider} from "./interceptors/error-handler/error-handler.interceptor";
import {ServerProvider} from "./interceptors/server/server.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    NotesService,
    ErrorHandlerInterceptorProvider,
    ServerProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
