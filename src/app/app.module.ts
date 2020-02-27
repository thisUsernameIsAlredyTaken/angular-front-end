import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './component/login/login.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './component/register/register.component';
import {MoviesTableComponent} from './component/movies-table/movies-table.component';
import {MovieTableCellComponent} from './component/movie-table-cell/movie-table-cell.component';
import {SearchComponent} from './component/search/search.component';
import {HomeComponent} from './component/home/home.component';
import {TokenInterceptor} from './interceptor/token.interceptor';
import { MovieInfoComponent } from './component/movie-info/movie-info.component';
import { PersonalComponent } from './component/personal/personal.component';
import { PersonalMoviesComponent } from './component/personal-movies/personal-movies.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MoviesTableComponent,
    MovieTableCellComponent,
    SearchComponent,
    HomeComponent,
    MovieInfoComponent,
    PersonalComponent,
    PersonalMoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
