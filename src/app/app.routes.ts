import { Routes } from '@angular/router';

const t = (s: string) => `${s} — МагистральСервис`;

export const routes: Routes = [
  { path: '', title: 'МагистральСервис — ремонт и обслуживание грузовиков', loadComponent: () => import('./pages/home').then((m) => m.Home) },
  { path: 'services', title: t('Услуги'), loadComponent: () => import('./pages/services').then((m) => m.Services) },
  { path: 'services/:slug', loadComponent: () => import('./pages/service-detail').then((m) => m.ServiceDetail) },
  { path: 'brands', title: t('Марки техники'), loadComponent: () => import('./pages/brands').then((m) => m.Brands) },
  { path: 'about', title: t('О компании'), loadComponent: () => import('./pages/about').then((m) => m.About) },
  { path: 'reviews', title: t('Отзывы'), loadComponent: () => import('./pages/reviews').then((m) => m.Reviews) },
  { path: 'news', title: t('Новости'), loadComponent: () => import('./pages/news').then((m) => m.News) },
  { path: 'contacts', title: t('Контакты'), loadComponent: () => import('./pages/contacts').then((m) => m.Contacts) },
  { path: '**', title: t('Страница не найдена'), loadComponent: () => import('./pages/not-found').then((m) => m.NotFound) },
];
