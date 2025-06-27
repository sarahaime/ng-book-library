import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { IBookService } from './models/book.service.interface';
import { InMemoryBookService } from './services/in-memory-book.service';

@NgModule({
    // imports: [HttpClientModule], // uncomment to use HttpBookService
  providers: [
    { provide: IBookService, useClass: InMemoryBookService } // comment to use HttpBookService
    // { provide: IBookService, useClass: HttpBookService } // uncomment to use HttpBookService
  ],
  declarations: [    
  ],
  imports: [
    CommonModule,
  ],
  exports:[
  ]
})
export class CoreModule { 
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
