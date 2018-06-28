import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProtectedComponent } from './protected.component';
import { ChainsListComponent } from './chains-list/chains-list.component';
import { EventsListComponent } from './events-list/events-list.component';
import {
  MatToolbarModule,
  MatGridListModule,
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatTabsModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChainInfoComponent } from './chain-info/chain-info.component';
import { EventsComponent } from './chain-info/events/events.component';
import { IdentitiesComponent } from './chain-info/identities/identities.component';
import { CommentsComponent } from './chain-info/comments/comments.component';

@NgModule({
  imports: [
    MatToolbarModule,
    FlexLayoutModule,
    MatGridListModule,
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProtectedComponent,
        children: [
          {
            path: 'chains',
            component: ChainsListComponent
          },
          {
            path: 'chains/:chainId',
            component: ChainInfoComponent,
            children: [
              {
                path: 'events',
                component: EventsComponent
              },
              {
                path: 'identities',
                component: IdentitiesComponent
              },
              {
                path: 'comments',
                component: CommentsComponent
              },
              {
                path: '',
                pathMatch: 'full',
                redirectTo: 'events'
              }
            ]
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'chains'
          }
        ]
      }
    ])
  ],
  declarations: [
    ProtectedComponent,
    ChainsListComponent,
    EventsListComponent,
    ChainInfoComponent,
    EventsComponent,
    IdentitiesComponent,
    CommentsComponent
  ]
})
export class ProtectedModule {}
