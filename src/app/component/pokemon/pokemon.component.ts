import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Howl, Howler } from 'howler';
import * as Pokedex from 'pokeapi-js-wrapper';
const P = new Pokedex.Pokedex();

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  @ViewChild('auto', {static: false}) auto;

  pokemon;
  display: string = 'block';
  spriteType: Number = 1;
  spriteFront: string;
  spriteBack: string;
  error: string;
  dropdownData: string[];
  searchInput: string;

  @Input() public pokemonList;
  @Input() public statDiffData;
  @Input() public pokedex1: boolean;
  @Input() public pokedex2: boolean;
  @Input() public cap: any;
  @Output() public pokeStats = new EventEmitter();
  @Output() public pokemonData = new EventEmitter();

  ngOnInit() {

  }

  inputChanged(event) {
    this.searchInput = event;
    this.toggleDropdown(event);
  }

  toggleDropdown(event) {
    if (event.length > 0) {
      this.dropdownData = this.pokemonList;
    } else {
      this.closeDropdown();
    }
  }

  closeDropdown() {
    this.dropdownData = [];
    this.auto.clear();
  }

  handlePokemonSelect(event) {
    this.getPokemon(event.name);
    this.closeDropdown();
  }

  handlePokemonEntered() {
    this.getPokemon(this.searchInput);
    this.closeDropdown();
  }

  async attemptFetchPokemon(pokemon) {
    try {
      this.error = "";
      this.pokemonData.emit(pokemon);
      this.pokemon = await P.resource("https://pokeapi.co/api/v2/pokemon/" + pokemon);
      return this.pokemon;
    }

    catch (err) {
      this.error = err.message;
    }
  }

  pokemonExists(searchInput) {
    return this.pokemonList.filter(pokemon => pokemon.name === searchInput).length > 0;
  }

  getPokemon(input) {
    if (this.pokemonExists(input)) {
      this.display = "none";
      this.attemptFetchPokemon(this.searchInput).then((pokemon) => {
        if (pokemon) {
          this.pokeStats.emit(this.pokemon.stats);
          this.spriteFront = this.pokemon.sprites.front_default;
          this.spriteBack = this.pokemon.sprites.back_default;
          this.playSound();
        }
      })
    } else {
      this.pokemon.types = [];
      this.error = "Pokemon does not exist";
    }
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

  keyword = 'name';
  data = [
     {
       id: 1,
       name: 'Usa'
     },
     {
       id: 2,
       name: 'England'
     }
  ];
}
