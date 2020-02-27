import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {RegisterComponent} from './component/register/register.component';
import {SearchComponent} from './component/search/search.component';
import {HomeComponent} from './component/home/home.component';
import {MovieInfoComponent} from './component/movie-info/movie-info.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
  {path: 'search', component: SearchComponent},
  {path: 'home', component: HomeComponent},
  {path: 'movie/:id', component: MovieInfoComponent},
  {path: '', pathMatch: 'full', redirectTo: 'search'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
