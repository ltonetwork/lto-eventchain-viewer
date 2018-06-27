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
  MatExpansionModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

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
            component: EventsListComponent
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
  declarations: [ProtectedComponent, ChainsListComponent, EventsListComponent]
})
export class ProtectedModule {}
