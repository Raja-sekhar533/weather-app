import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
lat;
lon;
weather;
temp_min = this.weather -32 * 5/9;
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    //this.weatherService.getWeatherDataByCordinates(35, 139).subscribe(console.log)
    this.getLocation();
  }
getLocation(){
  if("geolocation" in navigator){
    navigator.geolocation.watchPosition((success)=>{
      this.lat = success.coords.latitude;
      this.lon = success.coords.longitude;

      this.weatherService.getWeatherDataByCordinates(this.lat, this.lon).subscribe(data => {
        this.weather = data;
      })
    })
  }
}
getCity(city){
this.weatherService.getWeatherDataByCityName(city).subscribe(data => {
  this.weather = data;
})
}
}
