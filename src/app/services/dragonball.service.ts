import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  APIResponse,
  Character,
  CharacterDetail,
  CharacterPayload,
} from '../interfaces/dragonball.interface';
import { Observable } from 'rxjs';
import { environment } from '@env/environment.development';

@Injectable({ providedIn: 'root' })
export class DragonBallService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  public getCharacters(params?: CharacterPayload): Observable<APIResponse<Character>> {
    let httpParams = new HttpParams();

    if (params) {
      httpParams = httpParams.set('limit', params.limit.toString());
      if(params.page){
        httpParams = httpParams.set('page',params.page.toString());
      }
    }

    if (params?.gender) {
      httpParams = httpParams.set('gender', params.gender);
    }
    if (params?.race) {
      httpParams = httpParams.set('race', params.race);
    }

    return this.http.get<APIResponse<Character>>(`${this.apiUrl}/characters`, {
      params: httpParams,
    });
  }

  public getCharacterById(id: number): Observable<CharacterDetail> {
    return this.http.get<CharacterDetail>(`${this.apiUrl}/characters/${id}`);
  }

  public searchCharactersByName(name: string): Observable<Character[]> {
    let httpParams = new HttpParams();

    if (name) {
      httpParams = httpParams.set('name', name.toString());
    }

    return this.http.get<Character[]>(`${this.apiUrl}/characters`, { params: httpParams });
  }
}
