import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Panel1Component } from "./panel/panel1/panel1.component";
import { Panel2Component } from "./panel/panel2/panel2.component";
import { PanelOneComponent } from './panel/panel-one/panel-one.component';
import { CounterService } from './services/signals/counter.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Panel1Component, Panel2Component, PanelOneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SignalApp';

  constructor(
    private counterService: CounterService
  ){

  }

  incrementCounter(){
    this.counterService.incrementCounter();
  }
}
