import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@app/api/services/auth.service';
import { Nullable } from '@app/types/nullable.type';
import { UserInterface } from '@app/interfaces/user.interface';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { GetAllAds } from '@app/store/actions/ads.actions';
import { Select, Store } from '@ngxs/store';
import { AdsState } from '@app/store/state/ads.state';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
    @Select(AdsState.ads)
    ads$: Observable<any[]> | undefined;

    user: Nullable<UserInterface> | undefined;
    private unSubscriber$: Subject<void> = new Subject<void>();

    constructor(public authService: AuthService, private store: Store) {}

    ngOnInit() {
        const userString = localStorage.getItem('user');
        if (this.authService.isAuthenticated && userString) {
            this.user = JSON.parse(userString);
        }

        // this.getAllAds();
        // // @ts-ignore
        // this.ads$.pipe(takeUntil(this.unSubscriber$)).subscribe((value) => console.log(value));
        this.store.dispatch(new GetAllAds());
        // @ts-ignore
        this.ads$.subscribe(ads => console.log(ads));
    }

    @Dispatch()
    getAllAds = (): GetAllAds => new GetAllAds();

    ngOnDestroy(): void {
        this.unSubscriber$.next();
        this.unSubscriber$.complete();
    }
}
