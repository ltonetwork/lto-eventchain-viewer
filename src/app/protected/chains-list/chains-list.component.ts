import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MediaQueryService } from '../../services/media-query.service';

@Component({
  selector: 'app-chains-list',
  templateUrl: './chains-list.component.html',
  styleUrls: ['./chains-list.component.scss']
})
export class ChainsListComponent implements OnInit {
  columns$: Observable<number>;
  constructor(private _mediaQuery: MediaQueryService) {
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
