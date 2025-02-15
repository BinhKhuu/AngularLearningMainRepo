import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomListBoxComponent } from "./custom-list-box/custom-list-box.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CustomListBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'inheritance_app';
}
