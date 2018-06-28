import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { switchMap, shareReplay, map, take } from 'rxjs/operators';
import { ChainsService } from '../../services/chains.service';
import { LTO, EventChain, Event } from 'lto-api';

@Component({
  selector: 'app-chain-info',
  templateUrl: './chain-info.component.html',
  styleUrls: ['./chain-info.component.scss']
})
export class ChainInfoComponent implements OnInit {
  chain$: Observable<any>;
  eventChain$: Observable<EventChain>;
  bodies: { [hash: string]: any } = {};

  navLinks = [
    {
      path: 'events',
      label: 'Events'
    },
    {
      path: 'identities',
      label: 'Identities'
    },
    {
      path: 'comments',
      label: 'Comments'
    }
  ];

  constructor(route: ActivatedRoute, chainsService: ChainsService) {
    this.chain$ = route.params.pipe(
      switchMap(params => chainsService.getChain(params['chainId'])),
      shareReplay()
    );

    this.eventChain$ = this.chain$.pipe(
      map(chainJSON => {
        const eventChain = new EventChain();
        eventChain.setValues(chainJSON);
        console.log(eventChain);
        return eventChain;
      }),
      shareReplay(1)
    );

    setTimeout(() => {
      this.eventChain$.pipe(take(1)).subscribe(chain => {
        chain.events.forEach(event => {
          this.bodies[event.hash] = event.getBody();
        });
        console.log('All bodies calculated');
      });
    });
  }

  ngOnInit() {}

  getBodyFor(hash: string): any {
    return this.bodies[hash] || {};
  }
}
