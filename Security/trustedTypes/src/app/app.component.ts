import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TrustedTypeServiceService } from './trusted-type-service.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[TrustedTypeServiceService]
})
export class AppComponent {
  content: string = '<p>This is a <b>trusted</b> message.</p>';
  script: string = 'console.log("This is a trusted script.");';
  scriptURL: string = 'https://example.com/script.js';

  sanitizedContent: string = '';
  sanitizedScript: string = '';
  sanitizedScriptURL: string = '';

  constructor(private trustedTypesService: TrustedTypeServiceService) {}

  ngOnInit() {
    this.sanitizedContent = this.trustedTypesService.sanitizeHTML(this.content);
    this.sanitizedScript = this.trustedTypesService.sanitizeScript(this.script);
    this.sanitizedScriptURL = this.trustedTypesService.sanitizeScriptURL(this.scriptURL);
  }
}
