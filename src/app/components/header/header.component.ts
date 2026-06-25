import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private readonly route = inject(Router);

  public goToHome() {
    this.route.navigate(['/']);
  }
}
