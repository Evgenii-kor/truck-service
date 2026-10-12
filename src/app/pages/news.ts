import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NEWS } from '../core/data';

@Component({
  selector: 'app-news',
  imports: [DatePipe],
  template: `
    <section class="page-head">
      <div class="wrap">
        <h1>Новости</h1>
        <p>Новое оборудование, партнёрства и акции.</p>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        @for (n of news; track n.slug) {
          <article>
            <time [attr.datetime]="n.date">{{ n.date | date: 'd MMMM y' : '' : 'ru' }}</time>
            <div>
              <h2>{{ n.title }}</h2>
              <p>{{ n.text }}</p>
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    article {
      display: grid;
      grid-template-columns: 160px 1fr;
      gap: 24px;
      padding: 24px 0;
      border-bottom: 1px solid var(--line);
    }
    time {
      color: var(--muted);
      font-weight: 600;
    }
    h2 {
      font-size: 1.4rem;
    }
    @media (max-width: 600px) {
      article {
        grid-template-columns: 1fr;
        gap: 6px;
      }
    }
  `,
})
export class News {
  protected readonly news = NEWS;
}
