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
  isRedirecting = false;

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
      this.isRedirecting = true;
      await new Promise(r => requestAnimationFrame(r));
      window.location.href = originalUrl;
    }
  }

  copyUrl() {
    if (!this.newUrl) return;
    navigator.clipboard.writeText(this.newUrl)
      .then(() => {
        alert('URL copied to clipboard!');
      })
      .catch(err => console.error('Failed to copy:', err));
  }
}