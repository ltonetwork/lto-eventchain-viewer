import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { EventChain } from 'lto-api';
import { ChainInfoComponent } from '../chain-info.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  eventChain$: Observable<EventChain>;

  constructor(private _parent: ChainInfoComponent) {
    this.eventChain$ = _parent.eventChain$;
  }

  ngOnInit() {}

  getBodyFor(hash: string): any {
    return this._parent.getBodyFor(hash);
  }
}
