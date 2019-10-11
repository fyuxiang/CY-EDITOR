import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CyEditorModule } from 'cy-editor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CyEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
