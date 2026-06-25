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

  // Computed para dar rareza galáctica a los más poderosos (Ki inmenso o cadenas largas)
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

  // Lógica reactiva para el efecto 3D holográfico con el mouse
  public onMouseMove(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();

    // Posición del cursor respecto a las dimensiones de la tarjeta (0 a 1)
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const px = x / rect.width;
    const py = y / rect.height;

    // Ángulos de rotación 3D (multiplicado por la inclinación máxima deseada)
    const rx = (px - 0.5) * 35; // Rotación en Y (izquierda a derecha)
    const ry = (0.5 - py) * 35; // Rotación en X (arriba a abajo)

    // Distancia del cursor al centro de la tarjeta (hipotenusa normalizada de 0 a 1)
    const hyp = Math.sqrt((px - 0.5) ** 2 + (py - 0.5) ** 2) * 2;

    // Inyectamos las variables al CSS de forma dinámica
    card.style.setProperty('--mx', `${px * 100}%`);
    card.style.setProperty('--my', `${py * 100}%`);
    card.style.setProperty('--posx', `${px * 100}%`);
    card.style.setProperty('--posy', `${py * 100}%`);
    card.style.setProperty('--rx', `${rx}deg`);
    card.style.setProperty('--ry', `${ry}deg`);
    card.style.setProperty('--hyp', `${hyp}`);
    card.style.setProperty('--o', '1');
    card.style.setProperty('--s', '1.04'); // Escala en hover sutil
  }

  public onMouseLeave(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    // Reseteamos el estado de la tarjeta de forma suave
    card.style.setProperty('--o', '0');
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
    card.style.setProperty('--hyp', '0');
    card.style.setProperty('--s', '1');
  }
}
