import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  htmlSnippet = 'Template <script>console.log("0wned")</script> <b>Syntax</b>';

  constructor(){
    
  }

  ngOnInit(){
    const element = document.querySelector('#InjectHere');
    if(element)
      element.innerHTML = this.htmlSnippet;
  }

}
