import { Component, computed, ElementRef, inject, linkedSignal, signal, viewChild } from '@angular/core';
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

  // Writable state linked to the filters. Resets to 1 when filters change.
  public currentPage = linkedSignal<string, number>({
    source: () => `${this.genderFilter()}-${this.raceFilter()}-${this.searchName()}`,
    computation: () => 1,
  });

  characterResource = rxResource<
    APIResponse<Character> | Character[],
    { limit: number; gender: string; race: string; name: string; page: number }
  >({
    params: () => ({
      limit: 12,
      gender: this.genderFilter(),
      race: this.raceFilter(),
      name: this.searchName(),
      page: this.currentPage(),
    }),

    stream: ({ params }) => {
      if (params.name) {
        return this.dbService.searchCharactersByName(params.name);
      }
      return this.dbService.getCharacters(params);
    },
  });

  public carousel = viewChild<ElementRef<HTMLDivElement>>('carouselRef');

  // Writable state linked to the resource value. Accumulates items across pages.
  public characters = linkedSignal<APIResponse<Character> | Character[] | undefined, Character[]>({
    source: () => this.characterResource.value(),
    computation: (newVal, previous) => {
      if (!newVal) return [];
      if (Array.isArray(newVal)) return newVal;

      const newItems = newVal.items || [];
      const prevItems = previous?.value || [];

      // Reset accumulator if we are back on page 1
      if (this.currentPage() === 1) {
        return newItems;
      }

      const existingIds = new Set(prevItems.map((character) => character.id));
      const filteredNewItems = newItems.filter((character) => !existingIds.has(character.id));
      return [...prevItems, ...filteredNewItems];
    },
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

  public onScroll(event: Event) {
    const el = event.target as HTMLDivElement;
    if (el) {
      const threshold = 150; // pixels from the right edge
      const isNearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - threshold;
      if (isNearEnd) {
        this.loadNextPage();
      }
    }
  }

  public loadNextPage() {
    if (this.characterResource.isLoading()) return;
    const metaVal = this.meta();
    if (!metaVal) return;

    if (this.currentPage() < metaVal.totalPages) {
      this.currentPage.update((page) => page + 1);
    }
  }
}
