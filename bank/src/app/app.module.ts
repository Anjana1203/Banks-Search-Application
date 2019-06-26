import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule  } from '@angular/material';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatTableModule} from '@angular/material/table'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
// import { FlexLayoutModule } from '@angular/flex-layout';
import {
  // MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  // MatRippleModule
} from '@angular/material';
// ReactiveFormsModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BankDetailsComponent } from './bank-details/bank-details.component';
import { CacheService } from './cache.service';


@NgModule({
  declarations: [
    AppComponent,
    BankDetailsComponent
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule ,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [CacheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
