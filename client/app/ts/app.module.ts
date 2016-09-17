import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppComponent }        from './app.component';
import { HeroDetailComponent } from './heroes/hero-detail.component';
import { HeroesComponent }     from './heroes/heroes.component';
import { DashboardComponent} from './dashboard/dashboard.component';
import { HeroService }         from './heroes/hero.service';
import { routing } from './app.routing';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        routing
    ],
  declarations: [
      AppComponent,
      DashboardComponent,
      HeroDetailComponent,
      HeroesComponent
  ],
  providers: [
    HeroService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}