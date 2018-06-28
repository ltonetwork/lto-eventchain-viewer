import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, shareReplay, map } from 'rxjs/operators';
import { ChainsService } from '../../services/chains.service';
import { LTO } from 'lto-api';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {
  chain$: Observable<any>;
  events$: Observable<any[]>;

  private _lto = new LTO();

  constructor(route: ActivatedRoute, chainsService: ChainsService) {
    this.chain$ = route.params.pipe(
      switchMap(params => chainsService.getChain(params['chainId'])),
      shareReplay(1)
    );

    this.events$ = this.chain$.pipe(map(chain => chain.events));
  }

  ngOnInit() {}
}
