import { Component } from '@angular/core';
import { CharacterExplorerComponent } from '@pages/character-explorer/character-explorer.component';
import { HeaderComponent } from "@components/header/header.component";
@Component({
  selector: 'app-root',
  imports: [CharacterExplorerComponent, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {

}
