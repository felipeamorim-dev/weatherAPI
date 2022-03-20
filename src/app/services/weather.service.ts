import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private urlBaseLocation = environment.URL_BASE_LOCATION;
  private urlBaseWeather = environment.URL_BASE_WEATHER;

  constructor(private httpClient: HttpClient) { }

  public getCurrentLocation(name: string): Observable<any>{

    const params = name ? new HttpParams()
      .set('q', name)
      .set('appid', environment.APPID) : {};
    return this.httpClient.get<any>(this.urlBaseLocation, { params });
  }

  public getCurrentWeather(lat: number, lon: number): Observable<any>{

    const condition = lat && lon;
    const params = condition ? new HttpParams().set('lat', lat).set('lon', lon).set('appid', environment.APPID).set('units', environment.UNITS).set('lang', environment.LANG) : {};
    return this.httpClient.get<any>(this.urlBaseWeather, { params })
  }
}
