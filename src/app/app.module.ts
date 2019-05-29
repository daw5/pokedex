import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PokemonComponent } from './component/pokemon/pokemon.component';
import { SearchBarComponent } from './component/search-bar/search-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    PokemonComponent,
    SearchBarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
