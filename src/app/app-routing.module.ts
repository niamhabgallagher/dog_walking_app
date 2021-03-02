import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'walk-info',
    loadChildren: () => import('./walk-info/walk-info.module').then( m => m.WalkInfoPageModule)
  },
  {
    path: 'walk-list',
    loadChildren: () => import('./walk-list/walk-list.module').then( m => m.WalkListPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'add-dog',
    loadChildren: () => import('./add-dog/add-dog.module').then( m => m.AddDogPageModule)
  },
  {
    path: 'view-dog',
    loadChildren: () => import('./view-dog/view-dog.module').then( m => m.ViewDogPageModule)
  },
  {
    path: 'view-user',
    loadChildren: () => import('./view-user/view-user.module').then( m => m.ViewUserPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
