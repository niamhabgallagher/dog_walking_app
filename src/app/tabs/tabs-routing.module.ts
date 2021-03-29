import { LoginPageModule } from './../pages/login/login.module';
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
              }
            ]
        },
        {
          path: '',
          redirectTo: '/tabs/home',
          pathMatch: 'full'
        },
        // { path: 'details/:id', loadChildren: './pages/todo-details/todo-details.module#TodoDetailsPageModule' },
        // { path: 'details', loadChildren: './pages/todo-details/todo-details.module#TodoDetailsPageModule' },
      ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  // { path: 'details/:id', loadChildren: './pages/todo-details/todo-details.module#TodoDetailsPageModule' },
  // { path: 'details', loadChildren: './pages/todo-details/todo-details.module#TodoDetailsPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
