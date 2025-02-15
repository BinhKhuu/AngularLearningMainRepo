import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-injection',
  imports: [FormsModule, CommonModule],
  templateUrl: './injection.component.html',
  styleUrl: './injection.component.css'
})
export class InjectionComponent {
  userInput: string = '';
  safeTemplate: SafeHtml = '';

  constructor(
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.updateTemplate();
  }

  updateTemplate() {
    this.safeTemplate = this.sanitizer.bypassSecurityTrustHtml(this.userInput);
  }
}
