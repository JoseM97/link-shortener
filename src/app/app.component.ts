import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LinkService } from './services/link.service.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  newUrl: string = '';
  urlDb = inject(LinkService);

  async ngOnInit() {
    await this.redirectIfHash();
  }

  async generateUrl(oldUrl: string) {
    try {
      const entry = await this.urlDb.addUrl(oldUrl);
      this.newUrl = `https://JoseM97.github.io/link-shortener/#${entry.new_url}`;
    } catch (error) {
      console.error('Generation fails.', error);
    }
  }

  async redirectIfHash() {
    const hash = window.location.hash.substring(1);
    if (!hash) return;

    const originalUrl = await this.urlDb.getOriginalUrl(hash);
    if (originalUrl) {
      window.location.href = originalUrl;
    }
  }
}