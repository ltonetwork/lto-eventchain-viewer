import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';
import { ChainsService } from '../../services/chains.service';

@Component({
  selector: 'app-chains-list',
  templateUrl: './chains-list.component.html',
  styleUrls: ['./chains-list.component.scss']
})
export class ChainsListComponent implements OnInit {
  chains$: Observable<any[]>;

  isError = false;

  constructor(private _chains: ChainsService) {
    this.chains$ = _chains.chains$.pipe(
      catchError(error => {
        this.isError = true;

        return of(null);
      }),
      filter(chains => !!chains)
    );
  }

  ngOnInit() {}
}
