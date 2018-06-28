import { Component, OnInit } from '@angular/core';
import { ChainInfoComponent } from '../chain-info.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments$: Observable<any[]>;
  constructor(private _parent: ChainInfoComponent) {
    this.comments$ = _parent.chain$.pipe(map(chain => chain.comments));
  }

  ngOnInit() {}
}
