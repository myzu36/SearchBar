import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Album } from '../interface/album';
import { SearchService } from '../service/search.service';
//import { StorageServiceModule } from 'ngx-webstorage-service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchName!: string;
  count!: number;
  album!: Array<Album>;
  album_final!: Array<Album>;

  sizeOption: number[] = [5, 10, 20, 50, 100, 200];

  constructor(
    private search: SearchService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.searchName = '';
    this.count = 0;
    this.album = [];
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if (params.name) {
        this.searchName = params.name;
        this.search.getUrl(this.searchName);
        this.search
          .fetchData()
          .pipe(
            map((response) => {
              //this.count = response.resultsCount;
              //this.album = response.results;
              //console.log(this.searchName);
              //console.log(this.count);
              //console.log(response.results);
              return response.results;
            })
          )
          .subscribe((result) => {
            this.album = result;
            this.count = this.album.length;
            this.album_final = this.album;
            //console.log(this.album_final);
          });
      }
    });
    // let searchTerm = localStorage.getItem('search');
    // if (searchTerm){
    //   this.search.getUrl(searchTerm);
    //   this.search.fetchData().pipe(map(response => {
    //     this.count = response.resultsCount;
    //     console.log(searchTerm);
    //     console.log(response.results);
    //     return response.results;
    //   })).subscribe(result => this.album = result);
    // }
  }

  searchResult() {
    this.router.navigate([this.searchName]);
    this.search.getUrl(this.searchName);
    this.search
      .fetchData()
      .pipe(
        map((response) => {
          //this.count = response.resultCount;
          return response.results;
        })
      )
      .subscribe((result) => {
        this.album = result;
        this.count = this.album.length;
      });
  }

  onSelect(e: Event) {
    let element = e.currentTarget as HTMLInputElement;
    let value = element.value;
    this.album_final = this.album.slice(0, parseInt(value));
    console.log(this.album.length);
    // console.log(value);
  }

  // like:boolean = false;
  // dislike:boolean = false;

  // onLike() {
  //   if (!this.like && !this.dislike) {
  //     this.like = !this.like;
  //   } else if (this.like && !this.dislike) {
  //     this.like = !this.like;
  //   } else {
  //     this.like = !this.like;
  //     this.dislike = !this.dislike;
  //   }
  // }

  // onDislike() {
  //   if (!this.like && !this.dislike) {
  //     this.dislike = !this.dislike;
  //   } else if (this.dislike && !this.like) {
  //     this.dislike = !this.dislike;
  //   } else {
  //     this.dislike = !this.dislike;
  //     this.like = !this.like;
  //   }
  // }

  like = new Set();
  dislike = new Set();

  onLike(id: number) {
    this.like.add(id);
    if (this.like.has(id)){
      this.dislike.delete(id);
    }
  }

  onDislike(id: number){
    this.dislike.add(id);
    if (this.dislike.has(id)){
      this.like.delete(id);
    }
    }
  

}
