import { Injectable } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { Observable, merge, of } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';

type MediaAlias = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Injectable({ providedIn: 'root' })
export class MediaQueryService {
  currentMedia$: Observable<MediaChange>;
  mediaAlias$: Observable<MediaAlias>;

  constructor(observableMedia: ObservableMedia) {
    this.currentMedia$ = observableMedia.asObservable().pipe(shareReplay(1));
    this.mediaAlias$ = merge(
      this.currentMedia$.pipe(map(change => change.mqAlias as MediaAlias)),
      of('md' as 'md')
    );
  }
}
