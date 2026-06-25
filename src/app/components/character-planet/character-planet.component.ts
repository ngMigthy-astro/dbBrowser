import { Component, input } from '@angular/core';
import { Planet } from '@interfaces/dragonball.interface';

@Component({
  selector: 'app-character-planet',
  imports: [],
  templateUrl: './character-planet.component.html',
})
export class CharacterPlanetComponent {
  public readonly planet = input<Planet | null | undefined>();
}
