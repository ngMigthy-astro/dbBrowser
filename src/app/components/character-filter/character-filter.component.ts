import { Component, computed, input, model, signal } from '@angular/core';
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

  public isGenderOpen = signal<boolean>(false);
  public isRaceOpen = signal<boolean>(false);

  public activeGenderLabel = computed(() => {
    const label = this.genders().find((genderOption ) => genderOption .value === this.gender());
    return label ? label.label : 'Seleccionar...';
  });

  public activeRaceLabel = computed(() => {
    const label = this.races().find((raceOption ) => raceOption .value === this.race());
    return label ? label.label : 'Seleccionar...';
  });

  public selectGender(value: string) {
    this.gender.set(value);
    this.isGenderOpen.set(false);
  }

  public selectRace(value: string) {
    this.race.set(value);
    this.isRaceOpen.set(false);
  }
}
