import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [StorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
