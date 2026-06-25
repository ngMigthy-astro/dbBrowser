import { Component, input, model } from '@angular/core';
import { Transformation } from '@interfaces/dragonball.interface';

@Component({
  selector: 'app-character-transformations',
  imports: [],
  templateUrl: './character-transformations.component.html',
})
export class CharacterTransformationsComponent {
  public transformations = input<Transformation[]>([]);
  public activeImage = model('');
}
