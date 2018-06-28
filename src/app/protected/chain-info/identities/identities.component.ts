import { Component, OnInit } from '@angular/core';
import { ChainInfoComponent } from '../chain-info.component';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

@Component({
  selector: 'app-identities',
  templateUrl: './identities.component.html',
  styleUrls: ['./identities.component.scss']
})
export class IdentitiesComponent implements OnInit {
  identities$: Observable<any[]>;

  constructor(private _parent: ChainInfoComponent) {
    this.identities$ = _parent.chain$.pipe(map(chain => chain.identities));
  }

  ngOnInit() {}
}
