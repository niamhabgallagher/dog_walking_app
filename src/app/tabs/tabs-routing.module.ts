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
          path: 'tab1',
          children:
            [
              {
                path: '',
                loadChildren: () => import('../walk-list/walk-list.module').then( m => m.WalkListPageModule)
              }
            ]
        },
        {
          path: 'tab2',
          children:
            [
              {
                path: '',
                loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
              }
            ]
        },
        {
          path: 'tab3',
          children:
            [
              {
                path: '',
                loadChildren: () => import('../view-dog/view-dog.module').then( m => m.ViewDogPageModule)
              }
            ]
        },
        {
          path: 'tab4',
          children:
            [
              {
                path: '',
                loadChildren: () => import('../view-user/view-user.module').then( m => m.ViewUserPageModule)
              }
            ]
        },
        {
          path: '',
          redirectTo: '/tabs/tab2',
          pathMatch: 'full'
        }
      ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab2',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
