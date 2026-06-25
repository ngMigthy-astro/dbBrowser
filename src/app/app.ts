import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CharacterExplorerComponent } from '@pages/character-explorer/character-explorer.component';
@Component({
  selector: 'app-root',
  imports: [CharacterExplorerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly route = inject(Router);

  public goToHome(){
    this.route.navigate(['/'])
  }
}
