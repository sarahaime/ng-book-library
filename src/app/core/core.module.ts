import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { IBookService } from './models/book.service.interface';
import { InMemoryBookService } from './services/in-memory-book.service';
import { HttpBookService } from './services/http-book.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  providers: [
    {
      provide: IBookService,
      useClass: environment.useHttpBookService
        ? HttpBookService
        : InMemoryBookService,
    },
  ],
  declarations: [],
  imports: [HttpClientModule, CommonModule],
  exports: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
