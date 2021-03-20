import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators } from '@angular/forms';
import { Subject, throwError } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, catchError, retry} from 'rxjs/operators';
import { DataService } from '../Service/data.service';
import { Album } from '../Interface/album';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private dataSearch: DataService) { }

  public loading!: boolean;
  public searchTerm = new Subject<string>();
  public searchResults: any;
  public errorMessage: any;
  public paginationElements: any;

  public searchForm = new FormGroup({
    search: new FormControl("", Validators.required),
  })

  public search(){
    this.searchTerm.pipe(
      map((e: any) => {
        console.log(e.target.value);
        return e.target.value;
      }),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(term => {
        this.loading = true;
        return this.dataSearch._searchEntries(term);
      }),
      catchError((e) => {
        console.log(e);
        this.loading = false;
        this.errorMessage= e.message;
        return throwError(e);
      }),
    ).subscribe(v=>{
      this.loading=true;
      this.searchResults = v;
      this.paginationElements = this.searchResults;
    })
  }

  ngOnInit(): void {

  }

}
