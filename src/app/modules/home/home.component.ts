import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@app/api/services/auth.service';
import { Nullable } from '@app/types/nullable.type';
import { UserInterface } from '@app/interfaces/user.interface';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { GetAllAds, GetAllCategories, GetAllCities } from '@app/store/actions/ads.actions';
import { Select, Store } from '@ngxs/store';
import { AdsState } from '@app/store/state/ads.state';
import { Observable, Subject } from 'rxjs';
import { environment } from '@env/environment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
    @Select(AdsState.ads)
    ads$: Observable<any[]> | undefined;

    @Select(AdsState.cities)
    cities$: Observable<any[]> | undefined;

    @Select(AdsState.categories)
    categories$: Observable<any[]> | undefined;

    apiUrl: string = environment.apiUrl;
    user: Nullable<UserInterface> | undefined;
    private unSubscriber$: Subject<void> = new Subject<void>();

    constructor(
        public authService: AuthService,
        private store: Store,
    ) {}

    ngOnInit() {
        const userString = localStorage.getItem('user');
        console.log(this.authService.isAuthenticated);
        console.log(userString);
        if (this.authService.isAuthenticated && userString) {
            this.user = JSON.parse(userString);
        }

        this.store.dispatch(new GetAllAds());
        this.store.dispatch(new GetAllCities());
        this.store.dispatch(new GetAllCategories());
    }

    @Dispatch()
    getAllAds = (): GetAllAds => new GetAllAds();

    @Dispatch()
    getAllCities = (): GetAllCities => new GetAllCities();

    @Dispatch()
    getAllCategories = (): GetAllCategories => new GetAllCategories();

    ngOnDestroy(): void {
        this.unSubscriber$.next();
        this.unSubscriber$.complete();
    }
}
