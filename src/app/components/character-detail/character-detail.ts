import { Component, computed, inject, input, linkedSignal, output } from '@angular/core';
import { DragonBallService } from '@services/dragonball.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { CharacterDetail } from '@interfaces/dragonball.interface';

@Component({
  selector: 'app-character-detail',
  imports: [],
  templateUrl: './character-detail.html',
  styleUrl: './character-detail.css',
})
export class CharacterDetailComponent {
  public dragonballService = inject(DragonBallService);

  public characterId = input<number | null>(null);
  public closePanel = output<void>();

  public activeImage =linkedSignal(()=>this.character()?.image ?? '');

  public characterResource = rxResource<CharacterDetail | null, number | null>({
    params: () => this.characterId(),

    stream: ({ params: id }) => {
      if (id === null) {
        return of(null);
      }
      return this.dragonballService.getCharacterById(id);
    },
  });

  public character = computed(() => this.characterResource.value());
  public planet = computed(() => this.character()?.originPlanet);
  public transformations = computed(() => this.character()?.transformations ?? []);
}
