import { Component, input } from '@angular/core';

@Component({
  selector: 'app-admin-profile',
  imports: [],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {
  data = input<string>('');
}
