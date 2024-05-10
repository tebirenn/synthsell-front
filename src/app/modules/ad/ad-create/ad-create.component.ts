import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable, of, switchMap, take } from 'rxjs';
import { FormWrapperType } from '@app/types/form-wrapper.type';
import { AdsService } from '@app/api/services/ads.service';
import { AdsState } from '@app/store/state/ads.state';
import { GetAllCategories, GetAllCities } from '@app/store/actions/ads.actions';
import { AuthService } from '@app/api/services/auth.service';

@Component({
    selector: 'app-ad-create',
    templateUrl: './ad-create.component.html',
    styleUrls: ['./ad-create.component.css'],
})
export class AdCreateComponent implements OnInit {
    @Select(AdsState.cities)
    cities$: Observable<any[]> | undefined;

    @Select(AdsState.categories)
    categories$: Observable<any[]> | undefined;

    constructor(
        private store: Store,
        private adsService: AdsService,
    ) {}

    ngOnInit() {
        this.store.dispatch(new GetAllCategories());
        this.store.dispatch(new GetAllCities());
    }

    adCreateForm: FormGroup<FormWrapperType<any>> = new FormGroup<FormWrapperType<any>>({
        image: new FormControl('', Validators.required),
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
    });

    adCreate(): void {
        if (this.adCreateForm.invalid) {
            return;
        }
        const formData = new FormData();
        formData.append('image', this.adCreateForm.value['image']); // Добавляем изображение в FormData
        formData.append('title', this.adCreateForm.value['title']);
        formData.append('description', this.adCreateForm.value['description']);
        formData.append('category', this.adCreateForm.value['category']);
        formData.append('city', this.adCreateForm.value['city']);
        this.adCreateAction(formData);
    }

    onFileSelected(event: any): void {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.adCreateForm.patchValue({
                image: file,
            });
        }
    }

    adCreateAction(formData: FormData): void {
        this.adsService
            .createAd(formData)
            .pipe(
                take(1),
                switchMap((value) => {
                    return of(value);
                }),
            )
            .subscribe();
    }
}
