import { Component, input } from '@angular/core';

@Component({
  selector: 'app-character-planet',
  imports: [],
  templateUrl: './character-planet.component.html',
})
export class CharacterPlanetComponent {
  public readonly planet = input<'Planet' | null | undefined>();
}
