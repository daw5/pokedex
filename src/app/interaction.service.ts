import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();
@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  private _messageSource = new Subject();

  pokemon;

  message$ = this._messageSource.asObservable();

  constructor() { }

  async getPokemon(pokemon) {
    try {
      this.pokemon = await P.getPokemonByName(pokemon);
    }

    catch (err) {
      console.log(err.message);
    }
  }

  sendMessage(message: string) {
    this.getPokemon(message).then(() => {
      this._messageSource.next(this.pokemon);
    })
  }
}
