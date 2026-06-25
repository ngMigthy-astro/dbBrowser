import { Component, computed, input, output } from '@angular/core';
import { Character } from '../../interfaces/dragonball.interface';

@Component({
  selector: 'app-character-card',
  imports: [],
  templateUrl: './character-card.html',
  styleUrl: './character-card.css',
})
export class CharacterCard {
  public readonly character = input.required<Character>();
  public readonly selected = output<Character>();

  public readonly isGalaxyHolo = computed(() => {
    const ki = this.character().ki || '';
    const maxKi = this.character().maxKi || '';
    return (
      ki.includes('Septillion') ||
      ki.includes('Octillion') ||
      maxKi.includes('Septillion') ||
      maxKi.includes('Octillion') ||
      ki.length > 11
    );
  });

  public onCardClick() {
    this.selected.emit(this.character());
  }

  public onMouseMove(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const px = x / rect.width;
    const py = y / rect.height;

    const rx = (px - 0.5) * 35;
    const ry = (0.5 - py) * 35;

    const hyp = Math.hypot((px - 0.5) ** 2 + (py - 0.5) ** 2) * 2;

    card.style.setProperty('--mx', `${px * 100}%`);
    card.style.setProperty('--my', `${py * 100}%`);
    card.style.setProperty('--posx', `${px * 100}%`);
    card.style.setProperty('--posy', `${py * 100}%`);
    card.style.setProperty('--rx', `${rx}deg`);
    card.style.setProperty('--ry', `${ry}deg`);
    card.style.setProperty('--hyp', `${hyp}`);
    card.style.setProperty('--o', '1');
    card.style.setProperty('--s', '1.04');
  }

  public onMouseLeave(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    this.resetCardStyles(card);
  }

  public onTouchMove(event: TouchEvent) {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();

    const touch = event.touches[0];

    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const px = x / rect.width;
    const py = y / rect.height;

    const rx = (px - 0.5) * 35;
    const ry = (0.5 - py) * 35;
    const hyp = Math.hypot((px - 0.5) ** 2 + (py - 0.5) ** 2) * 2;

    card.style.setProperty('--mx', `${px * 100}%`);
    card.style.setProperty('--my', `${py * 100}%`);
    card.style.setProperty('--posx', `${px * 100}%`);
    card.style.setProperty('--posy', `${py * 100}%`);
    card.style.setProperty('--rx', `${rx}deg`);
    card.style.setProperty('--ry', `${ry}deg`);
    card.style.setProperty('--hyp', `${hyp}`);
    card.style.setProperty('--o', '1');
    card.style.setProperty('--s', '1.04');
  }

  public onTouchEnd(event: TouchEvent) {
   const card = event.currentTarget as HTMLElement;
   this.resetCardStyles(card);
  }

  private resetCardStyles(card: HTMLElement) {
    card.style.setProperty('--o', '0');
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
    card.style.setProperty('--hyp', '0');
    card.style.setProperty('--s', '1');
  }
}
