import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
url = 'https://api.openweathermap.org/data/2.5/weather';
apiKey = "24333939c359a9f43901e6c8c78e4010
";
constructor(private http:HttpClient){}

getWeatherDataByCordinates(lat, lon){
  let params = new HttpParams()
.set('lat', lat)
.set('lon', lon)
.set('units', 'imperial')
.set('appid', this.apiKey)

return this.http.get(this.url, { params });
}
}