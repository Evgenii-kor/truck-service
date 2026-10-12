import { Component } from '@angular/core';
import { REVIEWS } from '../core/data';

@Component({
  selector: 'app-reviews',
  template: `
    <section class="page-head">
      <div class="wrap">
        <h1>Отзывы</h1>
        <p>Что говорят автопарки, которые обслуживаются у нас.</p>
      </div>
    </section>
    <section class="section">
      <div class="wrap">
        @for (r of reviews; track $index) {
          <article>
            <blockquote>{{ r.text }}</blockquote>
            <p class="who">
              <b>{{ r.person }}</b><br />{{ r.company }}
            </p>
          </article>
        }
        <p class="sample">Образцы. Замените реальными отзывами в файле core/data.ts.</p>
      </div>
    </section>
  `,
  styles: `
    article {
      padding: 28px 0;
      border-bottom: 1px solid var(--line);
      max-width: 760px;
    }
    blockquote {
      margin: 0 0 12px;
      font: 500 1.25rem/1.45 var(--font-head);
    }
    .who {
      color: var(--muted);
      margin: 0;
    }
    .sample {
      margin-top: 24px;
      font-size: 0.85rem;
      color: var(--muted);
    }
  `,
})
export class Reviews {
  protected readonly reviews = REVIEWS;
}
