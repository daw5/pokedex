import { Component } from '@angular/core';
import { InteractionService } from './interaction.service';
//@ts-ignore 
import ApexCharts from 'apexcharts';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'pokedex-project';
  public pokemonData = {
    pokemon1: "",
    pokemon2: ""
  }
  public pokedex1 = true;
  public pokedex2 = true;
  public statData = {
    data1: [],
    data2: []
  }

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

  public capitalize(s) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  plot() {
    document.getElementById("chart").innerHTML = "";
    var options = {
      chart: {
        height: 350,
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
          this.capitalize(this.pokemonData.pokemon1),
        data: this.curateStats(this.statData.data1)
      }, {
        name: this.capitalize(this.pokemonData.pokemon2),
        data: this.curateStats(this.statData.data2)
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
    for (let i = 0; i < this.statData.data2.length; i++) {
      let diff = this.statData.data2[i].base_stat - this.statData.data1[i].base_stat;
      let diff2 = this.statData.data1[i].base_stat - this.statData.data2[i].base_stat;
      this.pusher(diff > 0 ? '+' + diff : diff, this.statDiff2);
      this.pusher(diff2 > 0 ? '+' + diff2 : diff2, this.statDiff1);
    }
    if (this.statData.data1.length > 1 && this.statData.data2.length > 1) {
      this.plot();
    }
  }

  resetStatDiff() {
    this.statDiff1 = [];
    this.statDiff2 = [];
  }

  updateData1(data) {
    this.resetStatDiff();
    this.statData.data1 = data;
    this.calcStatDiff();
  }

  updateData2(data) {
    this.resetStatDiff();
    this.statData.data2 = data;
    this.calcStatDiff();
  }


  constructor(private _interactionService: InteractionService) { }
  //   this._interactionService.sendMessage();
}
