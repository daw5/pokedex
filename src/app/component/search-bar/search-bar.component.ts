import { Component, OnInit } from '@angular/core';
const Pokedex = require('pokeapi-js-wrapper');
const P = new Pokedex.Pokedex();

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
