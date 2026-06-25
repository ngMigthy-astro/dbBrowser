import { Component, input, model } from '@angular/core';
import { DataFilter } from '../../data/data';

@Component({
  selector: 'app-character-filter',
  imports: [],
  templateUrl: './character-filter.component.html',
  styleUrl: './character-filter.component.css',
})
export class CharacterFilterComponent {
  public search = model<string>('');
  public gender = model<string>('');
  public race = model<string>('');

  public genders = input<DataFilter[]>([]);
  public races = input<DataFilter[]>([]);
}
