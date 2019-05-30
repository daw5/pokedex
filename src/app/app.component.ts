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
    data1: "",
    data2: "data2bingiii"
  }
  public message = "";


  constructor(private _interactionService: InteractionService) { }
  //   this._interactionService.sendMessage();
}
