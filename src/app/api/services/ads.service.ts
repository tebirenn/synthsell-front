import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { adsEndpoints } from '@app/api/endpoints/ads.endpoints';
import { AuthService } from '@app/api/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdsService {
    private apiUrl = environment.apiUrl;

    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) {}

    getAllAds(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + adsEndpoints.getAll(), {});
    }

    getAllCities(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + adsEndpoints.getAllCities(), {});
    }

    getAllCategories(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl + adsEndpoints.getAllCategories(), {});
    }

    createAd(dto: any): Observable<any> {
        return this.http.post<any>(this.apiUrl + adsEndpoints.createAd(), dto, {
            headers: { Authorization: `Bearer ${this.authService.token}` },
        });
    }
}
