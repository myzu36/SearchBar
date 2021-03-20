import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Album } from '../interface/album';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  count!: string;
  album!: [];
  url!:string;
  localStorageName: void;
  constructor(private http: HttpClient) { 
    this.localStorageName;
  }
  
  private baseUrl = "https://itunes.apple.com/search?term="
  private endUrl = "&media=music&entity=album&attribute=artistTerm&limit=500";

  getUrl(searchName:string){
    this.url = `https://itunes.apple.com/search?term=${searchName}
    &media=music&entity=album&attribute=artistTerm&limit=500`;
    this.localStorageName = localStorage.setItem('search', searchName);
  }

  fetchData(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
