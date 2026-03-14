import { Component, inject  } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DbServiceService } from './services/db-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'link-shortener';
  newUrl: string = '';
  urlDb = inject(DbServiceService);

  generateUrl(oldUrl: string) {
    return this.urlDb.addUrl(oldUrl);
    this.newUrl = 'https://short.ly/abc123';
  }
}