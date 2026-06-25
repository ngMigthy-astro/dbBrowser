import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CharacterCard } from '@components/character-card/character-card';
import { CharacterDetailComponent } from '@components/character-detail/character-detail';
import { CharacterFilterComponent } from '@components/character-filter/character-filter.component';
import { genders, races } from '@data/data';
import { APIResponse, Character } from '@interfaces/dragonball.interface';
import { DragonBallService } from '@services/dragonball.service';

@Component({
  selector: 'app-character-explorer',
  imports: [CharacterCard, CharacterDetailComponent, CharacterFilterComponent],
  templateUrl: './character-explorer.component.html',
  styleUrl: './character-explorer.component.css',
})
export class CharacterExplorerComponent {
  private readonly dbService = inject(DragonBallService);

  public genderFilter = signal<string>('');
  public raceFilter = signal<string>('');
  public searchName = signal<string>('');

  public selectedCharacterId = signal<number | null>(null);

  public genders = signal(genders);
  public races = signal(races);

  characterResource = rxResource<
    APIResponse<Character> | Character[],
    { limit: number; gender: string; race: string; name: string }
  >({
    params: () => ({
      limit: 100,
      gender: this.genderFilter(),
      race: this.raceFilter(),
      name: this.searchName(),
    }),

    stream: ({ params }) => {
      if (params.name) {
        return this.dbService.searchCharactersByName(params.name);
      }
      return this.dbService.getCharacters(params);
    },
  });

  public carousel = viewChild<ElementRef<HTMLDivElement>>('carouselRef');

  public characters = computed(() => {
    const res = this.characterResource.value();
    if (!res) return [];
    return Array.isArray(res) ? res : res.items || [];
  });

  public meta = computed(() => {
    const res = this.characterResource.value();
    if (res && !Array.isArray(res)) {
      return res.meta;
    }
    return null;
  });

  public selectCharacter(id: number) {
    this.selectedCharacterId.set(id);
  }

  public closeDetail() {
    this.selectedCharacterId.set(null);
  }

  public onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchName.set(value);
  }

  public onGenderChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.genderFilter.set(value);
  }

  public onRaceChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.raceFilter.set(value);
  }

  public scroll(direction: 'left' | 'right') {
    const el = this.carousel()?.nativeElement;
    if (el) {
      const scrollAmount = 350;
      el.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  }
}
