import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AdsService } from '@app/api/services/ads.service';
import { GetAllAds, GetAllCategories, GetAllCities } from '@app/store/actions/ads.actions';
import { Observable, tap } from 'rxjs';

export interface AdsStateInterface {
    ads: any[];
    cities: any[];
    categories: any[];
}

@State<AdsStateInterface>({
    name: 'ads',
    defaults: {
        ads: [],
        cities: [],
        categories: [],
    },
})
@Injectable()
export class AdsState {
    constructor(private adsService: AdsService) {}

    @Selector()
    static ads(state: AdsStateInterface): any[] {
        return state.ads;
    }

    @Selector()
    static cities(state: AdsStateInterface): any[] {
        return state.cities;
    }

    @Selector()
    static categories(state: AdsStateInterface): any {
        return state.categories;
    }

    @Action(GetAllAds)
    getAllAds(ctx: StateContext<AdsStateInterface>, action: GetAllAds): Observable<any[]> {
        return this.adsService.getAllAds().pipe(
            tap((value) => {
                ctx.patchState({ ads: value });
            }),
        );
    }

    @Action(GetAllCities)
    getAllCities(ctx: StateContext<AdsStateInterface>, action: GetAllCities): Observable<any[]> {
        return this.adsService.getAllCities().pipe(
            tap((value) => {
                ctx.patchState({ cities: value });
            }),
        );
    }

    @Action(GetAllCategories)
    getAllCategories(ctx: StateContext<AdsStateInterface>, action: GetAllCategories): Observable<any[]> {
        return this.adsService.getAllCategories().pipe(
            tap((value) => {
                ctx.patchState({ categories: value });
            }),
        );
    }
}
