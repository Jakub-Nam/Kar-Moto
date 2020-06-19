import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user = null;
  hideLoginButton = true;
  public toggleNavbar = true;
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user.subscribe(
      next => { if (next === null) { return; }
      else { this.changeButtonsVisability(); }
    }
    );
  }
  logout() {
    this.authService.logout();
    this.changeButtonsVisability();
  }
  changeButtonsVisability() {
    this.hideLoginButton = !this.hideLoginButton;
  }
}
