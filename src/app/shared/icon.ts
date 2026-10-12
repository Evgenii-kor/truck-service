import { Component, computed, input } from '@angular/core';

const c = (x: number, y: number, r: number) =>
  `M${x - r} ${y}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;

const ICONS: Record<string, string[]> = {
  wrench: [
    'M14.7 6.3a4 4 0 0 0-5.2 5.2l-5.9 5.9a1.9 1.9 0 0 0 2.7 2.7l5.9-5.9a4 4 0 0 0 5.2-5.2l-2.6 2.6-2.2-.5-.5-2.2z',
  ],
  gear: [c(12, 12, 3.2), 'M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1', c(12, 12, 6.5)],
  engine: ['M3 10h2V8h3V6h6v2h2v3h3v5h-3v2H8l-2-2v-2H3z', 'M9 12h5'],
  bolt: ['M13 2.5 4.5 14h6.5l-1 7.5L19.5 10H13z'],
  snow: ['M12 2.5v19M3.8 7.2l16.4 9.6M3.8 16.8l16.4-9.6M9.3 4.3 12 6.5l2.7-2.2M9.3 19.7 12 17.5l2.7 2.2'],
  trailer: ['M2 6.5h14.5V16H2zM16.5 10h3.8l1.7 3v3h-5.5', c(6.5, 18, 1.8), c(12, 18, 1.8), c(19, 18, 1.8)],
  truck: ['M2 6h11v10H2zM13 9.5h4l3.5 3.5V16H13', c(6.5, 17.8, 2), c(17, 17.8, 2)],
  tow: ['M2 11h9l2-4h5v4h3v5H2z', 'M14 7V3.5l-3 3', c(6.5, 17.8, 2), c(17, 17.8, 2)],
  shield: ['M12 3l8 3v6c0 5-3.4 7.9-8 9-4.6-1.1-8-4-8-9V6z', 'M8.5 12l2.5 2.5 4.5-5'],
  clock: [c(12, 12, 9), 'M12 7v5.2l3.3 2'],
  phone: ['M5 4h4l2 5-2.4 1.5a11 11 0 0 0 4.9 4.9L15 13l5 2v3.5a2 2 0 0 1-2 2A15.5 15.5 0 0 1 3 6a2 2 0 0 1 2-2z'],
  tire: [c(12, 12, 9), c(12, 12, 3.5), 'M12 3v5.5M12 15.5V21M3 12h5.5M15.5 12H21'],
  paint: ['M5 4h12v5H5z', 'M17 6.5h2.5v4.5H12v3', 'M10.5 14h3v7h-3z'],
  scan: ['M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16M7 12h10'],
  frame: ['M2.5 8h19M2.5 16h19M6 8v8M12 8v8M18 8v8'],
  check: ['M5 12.5l4.5 4.5L19 7.5'],
  pin: ['M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z', c(12, 10, 2.5)],
  mail: ['M3 6h18v12H3z', 'M3 7l9 7 9-7'],
  doc: ['M6 3h8.5L19 7.5V21H6z', 'M14 3v5h5M9 13h7M9 17h7'],
  camera: ['M4 8h3l2-3h6l2 3h3v11H4z', c(12, 13.5, 3.5)],
  tag: ['M3 12.5V4h8.5L21 13.5 13.5 21z', 'M7.5 8.5h.01'],
  arrow: ['M5 12h14M13 6l6 6-6 6'],
  plus: ['M12 5v14M5 12h14'],
  minus: ['M5 12h14'],
};

@Component({
  selector: 'app-icon',
  template: `
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @for (d of paths(); track $index) {
        <path [attr.d]="d" />
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      width: var(--icon-size, 1.5em);
      height: var(--icon-size, 1.5em);
      flex: none;
    }
    svg {
      width: 100%;
      height: 100%;
    }
  `,
})
export class Icon {
  readonly name = input.required<string>();
  protected readonly paths = computed(() => ICONS[this.name()] ?? ICONS['wrench']);
}
