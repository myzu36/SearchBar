import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { empty, of, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { Album } from '../Interface/album';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  public searchResults: any;

  public baseUrl = "https://api.github.com/search/repositories";

  public searchEntries(term:string): Observable<any> {
    if (term === ""){
      console.log('not defined');
      return empty();
    } else {
      let params = {q: term};
      return this.http.get(this.baseUrl,{params}).pipe(
        map(response=> {
          console.log(response);
          return this.searchResults = response;
        })
      );
    }
  }

  //returns the response
  public _searchEntries(term:string){
    return this.searchEntries(term);
  }
}
