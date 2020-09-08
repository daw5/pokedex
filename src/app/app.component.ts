import { Component, OnInit } from '@angular/core';
//@ts-ignore 
import ApexCharts from 'apexcharts';
import * as Pokedex from 'pokeapi-js-wrapper';

const P = new Pokedex.Pokedex();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'pokedex-project';
  public pokemonData = {
    pokemon1: "",
    pokemon2: ""
  }
  public pokedex1 = true;
  public pokedex2 = true;
  public statData = {
    pokedex1: [],
    pokedex2: []
  }
  public pokemonList;
  public statDiff1 = [];
  public statDiff2 = [];
  public message = "";

  pusher(diff, statDiff) {
    if (!isNaN(diff)) {
      statDiff.push(diff);
    }
  }

  setPokemonName(event, pokemon) {
    if (pokemon == 1) {
      this.pokemonData.pokemon1 = event;
    } else {
      this.pokemonData.pokemon2 = event;
    }
  }

  curateStats(data) {
    let curatedStats = [];
    for (var i = 0; i < data.length; i++) {
      curatedStats.push(data[i].base_stat);
    }
    return curatedStats;
  }

  public cap(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  plot() {
    document.getElementById("chart").innerHTML = "";
    var options = {
      chart: {
        height: 280,
        type: 'bar',
        foreColor: 'white'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      series: [{
        name:
          this.cap(this.pokemonData.pokemon1),
        data: this.curateStats(this.statData.pokedex1)
      }, {
        name: this.cap(this.pokemonData.pokemon2),
        data: this.curateStats(this.statData.pokedex2)
      }],
      xaxis: {
        categories: ['Speed', 'Special Defense', 'Special Attack', 'Defense', 'Special Defense', 'HP'],
      },
      fill: {
        opacity: 1
      },
    }

    var chart = new ApexCharts(
      document.querySelector("#chart"),
      options
    );

    chart.render();
  }

  calcStatDiff() {
    if (this.statData.pokedex1.length > 1 && this.statData.pokedex2.length > 1) {
      for (let i = 0; i < this.statData.pokedex2.length; i++) {
        let diff = this.statData.pokedex2[i].base_stat - this.statData.pokedex1[i].base_stat;
        let diff2 = this.statData.pokedex1[i].base_stat - this.statData.pokedex2[i].base_stat;
        this.pusher(diff > 0 ? '+' + diff : diff, this.statDiff2);
        this.pusher(diff2 > 0 ? '+' + diff2 : diff2, this.statDiff1);
      }
      if (this.statData.pokedex1.length > 1 && this.statData.pokedex2.length > 1) {
        this.plot();
      }
    }
  }

  resetStatDiff() {
    this.statDiff1 = [];
    this.statDiff2 = [];
  }

  updateStatData(pokedex: string, data) {
    this.resetStatDiff();
    this.statData[pokedex] = data;
    this.calcStatDiff();
  }

  async fetchPokemonList() {
    try {
      return await P.getPokemonsList();
    }

    catch (err) {
      alert("Pokemon api not responding");
    }
  }

  public getPokemonList() {
    return this.pokemonList;
  }

  ngOnInit() {
    this.fetchPokemonList().then((pokemonList) => {
      this.pokemonList = pokemonList.results;
    });
  }
}
