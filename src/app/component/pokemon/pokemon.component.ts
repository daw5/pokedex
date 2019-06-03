import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InteractionService } from '../../interaction.service';
import * as Pokedex from 'pokeapi-js-wrapper';
import { Howl, Howler } from 'howler';
import { stringify } from '@angular/compiler/src/util';
import { BlockingProxy } from 'blocking-proxy';
const P = new Pokedex.Pokedex();

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  constructor(private _interactionService: InteractionService) { }

  pokemon;
  display: string;
  spriteType = 1;
  spriteFront;
  spriteBack;
  search: string;
  error: string;
  searchInput: string;
  @Input() public statData;
  @Input() public statDiffData;
  @Input() public pokedex1: boolean;
  @Input() public pokedex2: boolean;
  @Input() public cap: any;
  @Output() public pokeStats = new EventEmitter();
  @Output() public pokemonData = new EventEmitter();


  async confirmPokemon() {
    try {
      let pokemon = this.search.toLowerCase();
      this.error = "";
      this.pokemonData.emit(pokemon);
      this.pokemon = await P.resource("https://pokeapi.co/api/v2/pokemon/" + pokemon);
      return this.pokemon;
    }

    catch (err) {
      this.pokemon.types = [];
      this.error = err.message;
    }
  }

  fireEvent() {
    this.pokeStats.emit(this.pokemon.stats);
    this.spriteFront = this.pokemon.sprites.front_default;
    this.spriteBack = this.pokemon.sprites.back_default;
    this.playSound();
  }

  playSound() {
    const sound = new Howl({
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
    if (event.key === 'Enter' && event.target.value != "") {
      this.display = "none";
      this.confirmPokemon().then((pokemon) => {
        if (pokemon) {
          event.target.value = '';
          this.fireEvent()
        }
      })
    }
  }

  getPokemon(pokemon) {
    this.search = pokemon.target.value;
  }

  async ngOnInit() {
    this.display = 'block';
    // this._interactionService.message$.subscribe(
    //   message => {
    //     this.stats = message;
    //   }
    // );
  }


  determineClass(type) {
    switch (type.type.name) {
      case "normal":
        return "#bbbab0";
      case "poison":
        return "#9d619c";
      case "psychic":
        return "#e970b2";
      case "grass":
        return "#9dd565"
      case "ground":
        return "#e5c969"
      case "ice":
        return "#abeffd"
      case "fire":
        return "#e8624d"
      case "rock":
        return "#cbbd7c"
      case "dragon":
        return "#867af7";
      case "water":
        return "#6cadf8"
      case "bug":
        return "#c6d04a"
      case "dark":
        return "#886a59"
      case "fighting":
        return "#9d5a4a"
      case "ghost":
        return "#7877d1"
      case "steel":
        return "#c4c2d9";
      case "flying":
        return "#80a1f8";
      case "electric":
        return "#f9e35d";
      case "fairy":
        return "#eeb2fa";
    }
  }
}
