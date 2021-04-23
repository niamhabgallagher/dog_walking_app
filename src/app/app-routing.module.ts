import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule) },
  {
    path: 'dog-info',
    loadChildren: () => import('./pages/dog-info/dog-info.module').then( m => m.DogInfoPageModule)
  }
];
@NgModule({
  imports:
    [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
  exports:
    [
      RouterModule
    ]
})

export class AppRoutingModule { }