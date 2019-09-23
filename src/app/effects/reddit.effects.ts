import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { RedditService } from '../services/reddit.service';
import { Action } from '@ngrx/store';

@Injectable()
export class RedditEffects {

//   loadThumbnails$ = createEffect(() => this.actions$.pipe(
//       ofType('[GALLERY PAGE] Load Thumbnails'),
//       mergeMap(() => this.redditService.getThumbnails()
//       .pipe(
//         map(movies => ({ type: '[REDDIT API] Thumbnails Loaded Success', payload: movies })),
//         catchError(() => EMPTY)
//       ))
//       )
//   );

  constructor(
    private actions$: Actions,
    private redditService: RedditService,
  ) {}
}

