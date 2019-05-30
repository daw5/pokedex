import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  stats = {};
  search: string;
  error: string;
  searchInput: string;
  @Input() public secretMessage: string;
  @Input() public statData;
  @Output() public pokeStats = new EventEmitter();

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

  fireEvent() {
    this.pokeStats.emit(this.pokemon.stats);
    console.log('data 1: ', this.statData.data1);
    console.log('data 2: ', this.statData.data2);
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      this.confirmPokemon().then(() => {
        this.fireEvent()
      })
      event.target.value = '';
    }
  }

  getPokemon(pokemon) {
    this.search = pokemon.target.value;
  }

  async ngOnInit() {
    this._interactionService.message$.subscribe(
      message => {
        this.stats = message;
      }
    );
  }
}
