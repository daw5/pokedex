import { Component } from '@angular/core';
import { InteractionService } from './interaction.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokedex-project';
  public pokedex1 = true;
  public pokedex2 = true;
  public statData = {
    data1: [],
    data2: [],
    statDifferences: []
  }
  public message = "";

  pusher(diff) {
    if (!isNaN(diff)) {
      this.statData.statDifferences.push(diff);
    }
  }

  calcStatDiff() {
    for (let i = 0; i < this.statData.data2.length; i++) {
      let diff = this.statData.data2[i].base_stat - this.statData.data1[i].base_stat;
      this.pusher(diff);
    }
  }

  resetStatDiff() {
    this.statData.statDifferences = [];
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
