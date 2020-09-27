import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewChildren, ElementRef, QueryList} from '@angular/core';
import { Howl, Howler } from 'howler';
import * as Pokedex from 'pokeapi-js-wrapper';
const P = new Pokedex.Pokedex();

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {

  @ViewChild('select') select;

  pokemon;
  loading: boolean = false;
  firstResult: string;
  display: string = 'block';
  spriteType: Number = 1;
  spriteFront: string;
  spriteBack: string;
  error: string;
  searchInput: string = "";
  isOpen = false;

  @Input() public pokemonList;
  @Input() public statDiffData;
  @Input() public pokedex1: boolean;
  @Input() public pokedex2: boolean;
  @Input() public cap: any;
  @Output() public pokeStats = new EventEmitter();
  @Output() public pokemonData = new EventEmitter();

  ngOnInit() {

  }

  toggleDropdown(event) {
    if (event.term.length > 0) {
      this.isOpen = true;
    } else {
      this.isOpen = false;
    }
  }

  onInputChange(event) {
    this.toggleDropdown(event);
  }

  handlePokemonSelect(event) {
    this.select.blur()

    if (event) {
      this.getPokemon(event.name);
      this.isOpen = false;
    }
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
    this.clearDisplay();
    this.loading = true;
    if (this.pokemonExists(input)) {
      this.attemptFetchPokemon(input).then((pokemon) => this.displayInfo(pokemon));
    } else {
      this.error = "Pokemon does not exist";
      this.loading = false;
      this.clearSearch();
    }
  }

  clearSearch() {
    let inputs = document.querySelectorAll(".ng-value");
    inputs.forEach(input => {
      input.textContent = "";
    });
    setTimeout(() => {
      this.select.focus();
    }, 100)
  }

  displayInfo(pokemon) {
    if (pokemon) {
      this.loading = false;
      this.clearSearch();
      this.pokeStats.emit(this.pokemon.stats);
      this.spriteFront = this.pokemon.sprites.front_default;
      this.spriteBack = this.pokemon.sprites.back_default;
      this.playSound();
    }
  }

  clearDisplay() {
    this.display = "none";

    if (this.pokemon != null) {
      this.pokemon.types = [];
    }
  }

  playSound() {
    const sound = new Howl({
      src: ['/assets/old/' + this.pokemon.id + '.ogg'],
      html5: true
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
}
