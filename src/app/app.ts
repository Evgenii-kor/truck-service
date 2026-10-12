import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header';
import { Footer } from './shared/footer';
import { Modal } from './shared/modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Modal],
  template: `
    <a class="skip" href="#content">К содержимому</a>
    <app-header />
    <main id="content" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
    <app-modal />
  `,
  styles: `
    .skip {
      position: absolute;
      left: -999px;
      top: 8px;
      z-index: 50;
      background: var(--accent);
      color: var(--on-accent);
      padding: 10px 16px;
      border-radius: 6px;
    }
    .skip:focus {
      left: 8px;
    }
    main {
      min-height: 60vh;
      outline: none;
    }
  `,
})
export class App {}
