import { Component, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { UrlComponent } from "./url/url.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UrlComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  htmlSnippet = 'Template <script>console.log("0wned")</script> <b>Syntax</b>';
  constructor(
    private domSanitizer: DomSanitizer
  ){
    
  }

  ngOnInit(){
    const element = document.querySelector('#InjectHere');
    if(element)
      element.innerHTML = this.htmlSnippet;

    const element2 = document.querySelector('#InjectHere2');
    if(element2){
      // removes the console.log within the script
      const safeHTML = this.domSanitizer.sanitize(SecurityContext.HTML,this.htmlSnippet);
      console.log(safeHTML)
      element2.innerHTML =  safeHTML ? safeHTML : '';
    }

  }

}
