import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AdsService } from '@app/api/services/ads.service';
import { GetAllAds } from '@app/store/actions/ads.actions';
import { Observable, tap } from 'rxjs';

export interface AdsStateInterface {
    ads: any[];
}

@State<AdsStateInterface>({
    name: 'ads',
    defaults: {
        ads: [],
    },
})
@Injectable()
export class AdsState {
    constructor(private adsService: AdsService) {}

    @Selector()
    static ads(state: AdsStateInterface): any[] {
        return state.ads;
    }

    @Action(GetAllAds)
    getAllAds(
        ctx: StateContext<AdsStateInterface>,
        action: GetAllAds
    ): Observable<any[]> {
        return this.adsService.getAllAds().pipe(
            tap((value) => {
                ctx.patchState({ ads: value });
            }),

        );
    }
}
