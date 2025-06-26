import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { IBookService } from './models/book.service.interface';
import { InMemoryBookService } from './services/in-memory-book.service';

@NgModule({
    // imports: [HttpClientModule], // Uncomment if using HttpBookService
  providers: [
    // ---- SWAP SERVICE HERE ----
    { provide: IBookService, useClass: InMemoryBookService }
    // { provide: IBookService, useClass: HttpBookService }
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
