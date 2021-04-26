import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:
      [
        {
          path: 'walklist',
          children:
            [
              {
                path: '',
                loadChildren: () => import('../pages/walk-list/walk-list.module').then( m => m.WalkListPageModule)
              },
              {
                path: 'walkinfo',
                loadChildren: () => import('../pages/walk-info/walk-info.module').then( m => m.WalkInfoPageModule)
              }
            ]
        },
        {
          path: 'home',
          children:
            [
              {
                path: '',
                loadChildren: () => import('../pages/home/home.module').then( m => m.HomePageModule)
              }
            ]
        },
        {
          path: 'viewdog',
          children:
            [
              {
                path: '',
                loadChildren: () => import('../pages/view-dog/view-dog.module').then( m => m.ViewDogPageModule)
              },
              {
                path: 'adddog',
                loadChildren: () => import('../pages/add-dog/add-dog.module').then( m => m.AddDogPageModule)
              },
              {
                path: 'doginfo',
                loadChildren: () => import('../pages/dog-info/dog-info.module').then( m => m.DogInfoPageModule)
              }
            ]
        },
        {
          path: 'viewuser',
          children:
            [
              {
                path: '',
                loadChildren: () => import('../pages/view-user/view-user.module').then( m => m.ViewUserPageModule)
              },
              {
                path: 'login',
                loadChildren: () => import('../pages/login/login.module').then( m => m.LoginPageModule)
              },
              {
                path: 'register',
                loadChildren: () => import('../pages/register/register.module').then( m => m.RegisterPageModule)
              },
            ]
        },
        {
          path: '',
          redirectTo: '/tabs/home',
          pathMatch: 'full'
        },
      ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
