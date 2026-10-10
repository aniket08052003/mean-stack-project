import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import {
  RouterLink,
  RouterLinkActive
} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
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

    if (!this.isBrowser) {
      return;
    }

    const savedTheme =
      localStorage.getItem('khetal-theme');

    this.isDark = savedTheme === 'dark';

    document.body.classList.toggle(
      'dark-theme',
      this.isDark
    );
  }

  toggleTheme(): void {

    if (!this.isBrowser) {
      return;
    }

    this.isDark = !this.isDark;

    document.body.classList.toggle(
      'dark-theme',
      this.isDark
    );

    localStorage.setItem(
      'khetal-theme',
      this.isDark ? 'dark' : 'light'
    );
  }
}
