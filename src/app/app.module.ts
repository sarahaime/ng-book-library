import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpErrorInterceptor } from './core/http-error.interceptor';
import { CoreModule } from './core/core.module';
import { FooterComponent } from './shared/footer/footer.component';
import { NotificationComponent } from './shared/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule, 
    FooterComponent, 
    NotificationComponent
  ],
  providers: [
    provideHttpClient(
      withInterceptors([httpErrorInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
