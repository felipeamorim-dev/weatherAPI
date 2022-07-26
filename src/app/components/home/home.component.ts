import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { environment } from './../../../environments/environment';
import { CurrentLocation } from './../../models/current-location';
import { CurrentWeather } from './../../models/current-weather';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private mostraError: boolean = false;
  pesquisa: boolean = false;

  weather: CurrentWeather = {
    name: 'Recife',
    weather: {
      id: 0,
      main: '',
      description: 'Limpo',
      icon: ''
    },
    main: {
      temp: 30,
      temp_min: 0,
      temp_max: 0,
      humidity: 0
    },
    wind: {
      speed: 0,
      deg: 0
    }
  }

  image: string = "http://openweathermap.org/img/wn/03n@2x.png";

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    if(localStorage.getItem("weather")) {
      this.weather = JSON.parse(localStorage.getItem("weather") || '{}');
    } else {
      this.weatherService.getCurrentLocation(environment.LOCATION).subscribe({
        next: resp => {
          const location: CurrentLocation = resp[0];
          this.searchweather(location.lat, location.lon);
        },
        error: error => {
          if(error) this.mostraError = !this.mostraError;
          setTimeout(() =>{this.mostraError = !this.mostraError}, 3000);
        }
      })
    }
  }

  submit(input: string){
    this.pesquisa = true;
    this.weatherService.getCurrentLocation(input).subscribe({
      next: resp => {
        const location: CurrentLocation = resp[0];
        this.searchweather(location.lat, location.lon);

    },
      error: error => {
        if(error) this.mostraError = !this.mostraError;
        setTimeout(() =>{this.mostraError = !this.mostraError}, 3000);
      }
    });
  }

  private searchweather(lat: number, lon: number){
    this.weatherService.getCurrentWeather(lat, lon).subscribe({
      next: resp => {
        this.weather = resp
        this.weather.weather.id = resp.weather[0].id;
        this.weather.weather.main = resp.weather[0].main;
        this.weather.weather.description = resp.weather[0].description;
        this.weather.weather.icon = resp.weather[0].icon;
        this.image = environment.ICON + this.weather.weather.icon + "@2x.png";
        this.pesquisa = false;
        this.setLocalStorate();
      },
      error: error => {
        if(error) this.mostraError = !this.mostraError;
        setTimeout(() =>{this.mostraError = !this.mostraError}, 3000);
      }
    })
  }

  setLocalStorate(){
    localStorage.setItem('weather', JSON.stringify(this.weather))
  }

  mError(): boolean{
    this.pesquisa = false;
    return this.mostraError;
  }
}
