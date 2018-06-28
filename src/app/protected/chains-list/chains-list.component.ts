import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, filter, switchMap } from 'rxjs/operators';
import { MediaQueryService } from '../../services/media-query.service';
import { ChainsService } from '../../services/chains.service';

@Component({
  selector: 'app-chains-list',
  templateUrl: './chains-list.component.html',
  styleUrls: ['./chains-list.component.scss']
})
export class ChainsListComponent implements OnInit {
  columns$: Observable<number>;
  chains$: Observable<any>;

  isError = false;

  constructor(private _mediaQuery: MediaQueryService, private _chains: ChainsService) {
    this.chains$ = _chains.chains$.pipe(
      catchError(error => {
        this.isError = true;

        return of(null);
      }),
      filter(chains => !!chains)
    );

    this.columns$ = this._mediaQuery.mediaAlias$.pipe(
      map(media => {
        switch (media) {
          case 'xs':
            return 1;
          case 'sm':
            return 2;
          default:
            return 3;
        }
      })
    );
  }

  ngOnInit() {}
}
