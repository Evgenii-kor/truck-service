import { Component, input } from '@angular/core';

/** Иллюстрации нарисованы в SVG. Замените на фотографии вашего сервиса, когда они появятся. */
@Component({
  selector: 'app-art',
  template: `
    @switch (name()) {
      @case ('hero') {
        <svg viewBox="0 0 640 440" role="img" aria-label="Седельный тягач с полуприцепом на дороге">
          <rect width="640" height="440" rx="28" fill="#dff0e7" />
          <circle cx="510" cy="96" r="46" fill="#ffd9b8" />
          <circle cx="510" cy="96" r="28" fill="#ff7a1a" />
          <path d="M0 300c80-70 150-90 230-60s130 10 200-40 150-30 210 20v220H0z" fill="#bfe0d0" />
          <path d="M0 330c90-40 170-50 260-20s160 0 380-40v170H0z" fill="#8fc7ae" />
          <rect y="342" width="640" height="98" fill="#1d3a31" />
          <rect y="338" width="640" height="8" fill="#0d4a3a" />
          <g fill="#f4fbf7">
            <rect x="30" y="392" width="70" height="7" rx="3" />
            <rect x="160" y="392" width="70" height="7" rx="3" />
            <rect x="290" y="392" width="70" height="7" rx="3" />
            <rect x="420" y="392" width="70" height="7" rx="3" />
            <rect x="550" y="392" width="70" height="7" rx="3" />
          </g>
          <!-- полуприцеп -->
          <rect x="34" y="160" width="360" height="156" rx="8" fill="#fff" />
          <rect x="34" y="262" width="360" height="22" fill="#ff7a1a" />
          <rect x="34" y="160" width="360" height="156" rx="8" fill="none" stroke="#0d4a3a" stroke-width="4" />
          <text x="214" y="230" text-anchor="middle" font-family="Unbounded, Arial, sans-serif" font-weight="700" font-size="30" fill="#0d4a3a">МагистральСервис</text>
          <rect x="60" y="316" width="320" height="14" rx="3" fill="#0d4a3a" />
          <!-- кабина -->
          <path d="M404 330V218l34-52h84l32 56v108z" fill="#0d4a3a" />
          <path d="M432 178h60l22 40h-86z" fill="#bfe8f4" />
          <path d="M404 262h140v14H404z" fill="#ff7a1a" />
          <rect x="544" y="296" width="14" height="22" rx="3" fill="#ffd9b8" />
          <rect x="396" y="324" width="170" height="14" rx="4" fill="#1d3a31" />
          <!-- колёса -->
          <g fill="#14201b">
            <circle cx="96" cy="346" r="30" />
            <circle cx="162" cy="346" r="30" />
            <circle cx="232" cy="346" r="30" />
            <circle cx="448" cy="346" r="32" />
            <circle cx="518" cy="346" r="32" />
          </g>
          <g fill="#c8d6cf">
            <circle cx="96" cy="346" r="12" />
            <circle cx="162" cy="346" r="12" />
            <circle cx="232" cy="346" r="12" />
            <circle cx="448" cy="346" r="13" />
            <circle cx="518" cy="346" r="13" />
          </g>
        </svg>
      }
      @case ('workshop') {
        <svg viewBox="0 0 640 440" role="img" aria-label="Мастерская с подъёмниками и грузовиком на посту">
          <rect width="640" height="440" rx="28" fill="#14614c" />
          <rect x="30" y="60" width="580" height="300" rx="10" fill="#0d4a3a" />
          <g fill="#e6f2ec">
            <rect x="52" y="90" width="170" height="250" rx="6" />
            <rect x="235" y="90" width="170" height="250" rx="6" />
            <rect x="418" y="90" width="170" height="250" rx="6" />
          </g>
          <g stroke="#bcd9cc" stroke-width="3">
            <path d="M52 130h170M52 170h170M52 210h170M52 250h170M52 290h170" />
            <path d="M235 130h170M235 170h170M235 210h170M235 250h170M235 290h170" />
            <path d="M418 130h170M418 170h170M418 210h170M418 250h170M418 290h170" />
          </g>
          <!-- грузовик в среднем боксе -->
          <g>
            <rect x="255" y="206" width="90" height="84" rx="6" fill="#fff" stroke="#0d4a3a" stroke-width="3" />
            <path d="M345 290v-58l14-24h28l14 26v56z" fill="#ff7a1a" />
            <path d="M362 214h24l8 18h-40z" fill="#bfe8f4" />
            <circle cx="285" cy="296" r="14" fill="#14201b" />
            <circle cx="320" cy="296" r="14" fill="#14201b" />
            <circle cx="378" cy="296" r="14" fill="#14201b" />
          </g>
          <rect y="340" width="640" height="100" fill="#0a3a2d" />
          <rect x="30" y="352" width="580" height="8" fill="#ff7a1a" />
          <!-- ключ -->
          <g transform="translate(500 340) rotate(-35)">
            <rect x="-6" y="-120" width="12" height="150" rx="6" fill="#ffd9b8" />
            <path d="M-22-130a22 22 0 1 1 44 0v18h-14v-14a8 8 0 1 0-16 0v14h-14z" fill="#ffd9b8" />
          </g>
        </svg>
      }
    }
  `,
  styles: `
    :host {
      display: block;
    }
    svg {
      width: 100%;
      height: auto;
      display: block;
    }
  `,
})
export class Art {
  readonly name = input<'hero' | 'workshop'>('hero');
}
