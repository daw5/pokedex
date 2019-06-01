import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InteractionService } from '../../interaction.service';
import * as Pokedex from 'pokeapi-js-wrapper';
import { Howl, Howler } from 'howler';
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
  spriteType = 1;
  spriteFront;
  spriteBack;
  search: string;
  error: string;
  searchInput: string;
  @Input() public statData;
  @Input() public pokedex1: boolean;
  @Input() public pokedex2: boolean;
  @Output() public pokeStats = new EventEmitter();
  @Output() public pokemonData = new EventEmitter();


  async confirmPokemon() {
    try {
      let pokemon = this.search.toLowerCase();
      this.error = "";
      this.pokemonData.emit(pokemon);
      this.pokemon = await P.getPokemonByName(pokemon);
      return this.pokemon;
    }

    catch (err) {
      this.error = err.message;
    }
  }

  fireEvent() {
    this.pokeStats.emit(this.pokemon.stats);
    console.log('pokemon: ', this.pokemon)
    this.spriteFront = this.pokemon.sprites.front_default;
    this.spriteBack = this.pokemon.sprites.back_default;
    console.log('sprite front: ', this.spriteFront)
    var sound = new Howl({
      src: ['/assets/old/' + this.pokemon.id + '.ogg']
    });
    sound.play();
  }

  toggleSprites() {
    if (this.spriteType == 2) {
      this.spriteType = 1;
      this.spriteFront = this.pokemon.sprites.front_default;
      this.spriteBack = this.pokemon.sprites.back_default;
    } else {
      this.spriteType = 2;
      this.spriteFront = this.pokemon.sprites.front_shiny;
      this.spriteBack = this.pokemon.sprites.back_shiny;
    }
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      this.confirmPokemon().then((pokemon) => {
        if (pokemon) {
          this.fireEvent()
        }
      })
      event.target.value = '';
    }
  }

  getPokemon(pokemon) {
    this.search = pokemon.target.value;
  }

  async ngOnInit() {
    // this._interactionService.message$.subscribe(
    //   message => {
    //     this.stats = message;
    //   }
    // );
  }
}
