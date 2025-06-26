import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'library', loadChildren: () => import('./features/library/library.module').then(m => m.LibraryModule) },
{ path: '', redirectTo: 'library', pathMatch: 'full' },
{ path: 'about', loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
