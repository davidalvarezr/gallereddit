import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, catchError, switchMap } from 'rxjs/operators';
import { RedditService } from '../services/reddit.service';
import * as fromLayout from '../ngx-store/actions/layout.action';
import { from, of } from 'rxjs';
import { Media } from '../components/gallery/Media';

@Injectable()
export class RedditEffects {

    @Effect()
    loadThumbnails$ = this.actions$.pipe(
        ofType(fromLayout.LOAD_THUMBNAILS),
        switchMap((action: fromLayout.LoadThumbnails) =>
            from(this.redditService.loadMoreThumbnails()).pipe(
                map((medias: Media[]) => new fromLayout.ThumbnailsLoaded(medias)),
                catchError(err => of(new fromLayout.ThumbnailsLoadingFailed(err)))
            )
        )
    );

    constructor(
        private actions$: Actions,
        private redditService: RedditService,
    ) {}
}

