import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  isSticky = false;
  navbarHeight = 50;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSticky = window.pageYOffset >= this.navbarHeight;
  }

}
