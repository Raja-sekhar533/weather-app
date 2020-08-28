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
temp_min ;
isday ;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    //this.weatherService.getWeatherDataByCordinates(35, 139).subscribe(console.log)
    this.weather = {
      main: {},
      isDay:true
    }
    this.getLocation();
  }
getLocation(){
  if("geolocation" in navigator){
    navigator.geolocation.watchPosition((success)=>{
      this.lat = success.coords.latitude;
      this.lon = success.coords.longitude;
let currentDate = new Date;
this.isday = (currentDate.getTime()< this.weather.sunsetTime.getTime());
      this.weatherService.getWeatherDataByCordinates(this.lat, this.lon).subscribe(data => {
        this.weather = data;
        this.setWeatherData(data);
      })
    })
  }
}
getCity(city){
this.weatherService.getWeatherDataByCityName(city).subscribe(data => {
  this.weather = data;
})
console.log(this.weather.isDay)
}
setWeatherData(data){
  this.weather = data;
    let sunsetTime = new Date(this.weather.sys.sunset * 1000);
    this.weather.sunset_time = sunsetTime.toLocaleTimeString();
    let currentDate = new Date();
    this.weather.isDay = (currentDate.getTime() < sunsetTime.getTime());

}
}
