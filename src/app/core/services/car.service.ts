import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Car } from '../models/car.model';

@Injectable({
    providedIn: 'root'
})
export class CarService implements Resolve<Car> {


    totalCount: number;
    urlFilters!: ActivatedRouteSnapshot | any;
    page!: number;
    dataFilters: any;
    items!: any[];
    onItemsChanged: BehaviorSubject<any>;


    constructor(
        private _httpClient: HttpClient
    ) {
        // Set the defaults
        this.totalCount = 0;
        this.dataFilters = {};
        this.onItemsChanged = new BehaviorSubject({});
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.urlFilters = JSON.parse(JSON.stringify(route.queryParams));
        const activeFilter: any = false;
        this.dataFilters = {};
        if (this.urlFilters.hasOwnProperty('offset') === false) {
            this.page = 0;
            this.urlFilters['offset'] = 0;
        } else {
            if (this.urlFilters['offset'] === '0') {
                this.page = 0
            } else {
                this.page = this.urlFilters['offset'] / this.urlFilters['limit']
            }

        }

        if (this.urlFilters.hasOwnProperty('search') && this.urlFilters['search'].trim()) {
            let dataFilters = {};
            dataFilters = `${decodeURIComponent(this.urlFilters['search'].trim())}`;
            this.urlFilters['search'] = dataFilters;
        }

        if (!this.urlFilters.hasOwnProperty('ordering')) {
          this.urlFilters['ordering'] = 'id';
        }else{
            this.urlFilters['ordering'] = this.urlFilters['ordering']
        }
        return new Promise((resolve, reject) => {
            Promise.all([
                this._getCars(this.urlFilters),
            ]).then(
                () => {
                    resolve(0);
                },
                reject
            );
        });
    }

    public getCars(){
        this._getCars(this.urlFilters);
    }

    public _getCars(params?: any): Promise<any> {
        params['limit'] = '10'
        const toUrlEncoded = (obj:any) => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');
        const url = `${environment.url}api/cars/?expand=state,brand&${toUrlEncoded(params)}`;
        return new Promise((resolve, reject) => {
            this._httpClient.get<any>(url)
                .subscribe((response: any) => {
                    this.totalCount = response.count;
                    this.items = response.results;
                    this.onItemsChanged.next(this.items);
                    resolve(response);
                }, reject);
        });
    }

    // Create model
    public create(data: Car): Promise<Car> {
        let formData = new FormData();
        formData.append('brand',String(data.brand))
        formData.append('model',String(data.model))
        formData.append('year',String(data.year))
        formData.append('price',String(data.price))
        formData.append('specification.maker',String(data?.specification?.maker))
        formData.append('specification.identification_number',String(data?.specification?.identification_number))
        formData.append('specification.height',String(data?.specification?.height))
        formData.append('specification.widht',String(data?.specification?.widht))
        formData.append('specification.longitude',String(data?.specification?.longitude))
        formData.append('specification.km',String(data?.specification?.km))
        formData.append('description',String(data.description))
        formData.append('image',data.image)
        return new Promise((resolve, reject) => {
            this._httpClient.post<Car>(`${environment.url}api/cars/`, formData)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    // get model
    public getCarByModel(url_slug: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get<any>(`${environment.url}api/cars/${url_slug}/?expand=state,brand`)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    public getBrands(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get<any>(`${environment.url}api/brands/?expand=state`)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }
}
