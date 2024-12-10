import { describe, it, expect } from 'vitest';
import { compareElementPosition } from './dom';

describe('DOM', () => {
  it('sorts elements', () => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p class="e-0">
        <strong class="e-1">
          <span class="e-2"></span>
        </strong>
      </p>
      <div class="e-3"></div>
      <section class="e-4">
        <span class="e-5"></span>
      </section>
    `;

    expect(
      Array.from(div.querySelectorAll('*'))
        .sort(compareElementPosition)
        .map((el) => el.className),
    ).toMatchInlineSnapshot(`
      [
        "e-0",
        "e-1",
        "e-2",
        "e-3",
        "e-4",
        "e-5",
      ]
    `);
  });
});
