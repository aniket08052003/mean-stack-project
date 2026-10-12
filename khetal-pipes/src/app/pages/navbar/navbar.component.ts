import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import {
  RouterLink
} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isDark = false;

  private readonly isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.applySavedTheme();
  }

  toggleTheme(): void {
    if (!this.isBrowser || typeof document === 'undefined') {
      return;
    }

    this.isDark = !this.isDark;
    this.applyTheme(this.isDark);

    localStorage.setItem(
      'khetal-theme',
      this.isDark ? 'dark' : 'light'
    );
  }

  private applySavedTheme(): void {
    if (!this.isBrowser || typeof document === 'undefined') {
      return;
    }

    const savedTheme = localStorage.getItem('khetal-theme');
    this.isDark = savedTheme === 'dark';
    this.applyTheme(this.isDark);
  }

  private applyTheme(isDark: boolean): void {
    if (typeof document === 'undefined' || !document.body) {
      return;
    }

    document.body.classList.toggle('dark-theme', isDark);
  }
}
