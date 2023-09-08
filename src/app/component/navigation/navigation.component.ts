import {Component, HostListener, OnInit} from '@angular/core';
import {transitionAnimation} from "../../animation/transition.animation";
import {Router} from "@angular/router";
import {
  ACCOUNT_EDIT,
  GROOPS,
  GROUPS,
  HOME,
  LOGIN,
  NOTIFICATIONS,
  PROFILE,
  PROFILE_EDIT
} from "../../constants/app.constants";
import {AuthService} from "../../service/auth/auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  animations: [transitionAnimation]
})
export class NavigationComponent implements OnInit {
  isSticky = false;
  navbarHeight = 50;
  currentRoute = ''


  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    this.setDefaultRoute()
  }

  private setDefaultRoute() {
    this.setCurrentRoute(null)
  }

  private setCurrentRoute(route: string | null) {
    if (route !== null) {
      this.currentRoute = route
      return
    }
    const routeTmp: string | null = this.router.url.split('/')[1]
    this.currentRoute = routeTmp !== null ? routeTmp : ''
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSticky = window.pageYOffset >= this.navbarHeight;
  }

  toHome() {
    this.router.navigate([`/${HOME}`]).then(() => this.handleNavigation(HOME));

  }

  toProfile() {
    this.router.navigate([`/${PROFILE}`]).then(() => this.handleNavigation(PROFILE));
  }

  toProfileEdit() {
    this.router.navigate([`/${PROFILE_EDIT}`]).then(() => this.handleNavigation(PROFILE_EDIT));
  }

  toGroups() {
    this.router.navigate([`/${GROUPS}`]).then(() => this.handleNavigation(GROUPS));
  }

  toNotifications() {
    this.router.navigate([`/${NOTIFICATIONS}`]).then(() => this.handleNavigation(NOTIFICATIONS));
  }

  toAccountEdit() {
    this.router.navigate([`/${ACCOUNT_EDIT}`]).then(() => this.handleNavigation(ACCOUNT_EDIT));
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate([`/${LOGIN}`]).then(r => this.handleNavigation(LOGIN));
    })
  }

  isProfileOrEdit() {
    return this.currentRoute === `${PROFILE}` || this.currentRoute === `${PROFILE_EDIT}`
  }

  private handleNavigation(route: string) {
    console.log(`Navigating to ${route} page`)
    this.setCurrentRoute(route)
  }
}
