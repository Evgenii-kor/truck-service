import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="section">
      <div class="wrap">
        <h1>Такой страницы нет</h1>
        <p class="lede">Возможно, ссылка устарела. Начните с главной или выберите услугу.</p>
        <a class="btn btn--dark" routerLink="/">На главную</a>
        <a class="btn btn--ghost" routerLink="/services">Все услуги</a>
      </div>
    </section>
  `,
  styles: `
    .btn {
      margin-right: 10px;
    }
  `,
})
export class NotFound {}
