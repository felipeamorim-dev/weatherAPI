import { environment } from './../../../environments/environment';
import { Component, DoCheck, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { CurrentLocation } from './../../models/current-location';
import { CurrentWeather } from './../../models/current-weather';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {


  public weather: CurrentWeather = localStorage.getItem("weather") ? JSON.parse(localStorage.getItem("weather") || '{}') : {
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

  public location: CurrentLocation = {
    name: '',
    lat: 0,
    lon: 0,
    country: '',
    state: ''
  }

  public image: string = "http://openweathermap.org/img/wn/03n@2x.png";

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.setLocalStorate();
  }

  public submit(input: string){
    this.weatherService.getCurrentLocation(input).subscribe(
      resp => {
      this.location.name = resp[0].name;
      this.location.lat = resp[0].lat;
      this.location.lon = resp[0].lon;
      this.location.country = resp[0].country;
      this.location.state = resp[0].state;

      this.weatherService.getCurrentWeather(this.location.lat, this.location.lon).subscribe(resp => {
        resp;
        this.weather.name = resp.name;
        this.weather.weather.id = resp.weather[0].id;
        this.weather.weather.main = resp.weather[0].main;
        this.weather.weather.description = resp.weather[0].description;
        this.weather.weather.icon = resp.weather[0].icon;
        this.weather.main.temp = resp.main.temp;
        this.weather.main.temp_max = resp.main.temp_max;
        this.weather.main.temp_min = resp.main.temp_min;
        this.weather.main.humidity = resp.main.humidity;
        this.weather.wind.speed = resp.wind.speed;
        this.weather.wind.deg = resp.wind.deg;
        this.image = environment.ICON + this.weather.weather.icon + "@2x.png";
      })
    });
  }

  public setLocalStorate(){
    localStorage.setItem('weather', JSON.stringify(this.weather))
  }
}
