import { Component } from '@angular/core';
import { InteractionService } from './interaction.service';
const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokedex-project';
  pokemon;
  search;
  constructor(private _interactionService: InteractionService) { }

  getPokemon(event) {
    this.search = event.target.value;
  }

  async confirmPokemon() {
    this.pokemon = await P.getPokemonByName(this.search);
    this._interactionService.sendMessage(this.pokemon);
  }
}
