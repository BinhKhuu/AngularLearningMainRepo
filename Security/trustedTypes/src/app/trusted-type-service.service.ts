import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TrustedTypeServiceService {
  private policy: TrustedTypePolicy | null = null;

  constructor() {
    if(window.trustedTypes) {
      this.policy = window.trustedTypes.createPolicy('myPolicy', {
        createHTML: (input:string) => {
          // Sanitize the input and return it as TrustedHTML
          return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        },
        createScript: (input:string) => {
          // Sanitize the script content
          return input.replace(/<script>/g, "").replace(/<\/script>/g, "");
        },
        createScriptURL: (input:string) => {
          // Sanitize the URL
          const url = new URL(input, document.baseURI);
          // Perform any additional URL sanitization logic here
          return url.href;
        }
      });
    }
  }

  sanitizeHTML(html: string): any {
    if(this.policy)
      return this.policy?.createHTML(html);
    else {
      console.error('trustedPolicy not supported for your browser');
      return '';
    }
  }

  sanitizeScript(script: string):  any {
    if(this.policy)
      return this.policy.createScript(script);
    else {
      console.error('trustedPolicy not supported for your browser');
      return '';
    }
  }

  sanitizeScriptURL(url: string): any {
    if(this.policy)
      return this.policy.createScriptURL(url);
    else {
      console.error('trustedPolicy not supported for your browser');
      return '';
    }
  }
}
