# МагистральСервис — сайт сервиса грузовой техники (Angular 22)

Требуется Node.js ≥ 22.22.3 (или 24.15+).

    npm install
    npm start        # http://localhost:4200
    npm run build    # dist/my-first-app/browser
    npm test         # Vitest

Что заменить перед запуском (всё в `src/app/core/data.ts`):
название и контакты (`COMPANY`), услуги и цены (`SERVICES`), марки, отзывы, новости, FAQ.
Отзывы, новости и «табло постов» — образцы, замените реальными.
Отправка заявок: `src/app/core/lead.service.ts`, метод `submit()` (сейчас имитация).
Для хостинга настройте SPA-фолбэк: все пути отдают index.html.
