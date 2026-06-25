import { Component, inject } from '@angular/core';
import { Router } from 'express';

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
