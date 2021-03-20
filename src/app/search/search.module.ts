import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        SearchRoutingModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [
        SearchComponent
    ]
})

export class SearchModule {
    
}