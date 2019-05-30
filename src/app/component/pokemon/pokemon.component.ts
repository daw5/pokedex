import { Component, OnInit } from '@angular/core';
import { InteractionService } from '../../interaction.service';
import * as Pokedex from 'pokeapi-js-wrapper';
import { stringify } from '@angular/compiler/src/util';
const P = new Pokedex.Pokedex();

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  constructor(private _interactionService: InteractionService) { }

  pokemon;
  search;
  error;
  searchInput: string;

  async confirmPokemon() {
    try {
      this.pokemon = await P.getPokemonByName(this.search);
      this.error = "";
    }

    catch (err) {
      console.log(err.message);
      this.error = err.message;
    }
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      this.confirmPokemon();
      event.target.value = '';

    }
  }


  getPokemon(pokemon) {
    this.search = pokemon.target.value;
  }

  async ngOnInit() {
    this._interactionService.message$.subscribe(
      message => {
        this.pokemon = message;
      }
    );
  }
}
