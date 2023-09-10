import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {transitionAnimation} from "../../animation/transition.animation";
import {ActivatedRoute, Route, Router, UrlSegment} from "@angular/router";
import {
  ACCOUNT_EDIT, GROUP_CREATE,
  GROUPS,
  HOME,
  LOGIN,
  NOTIFICATIONS,
  PROFILE,
  PROFILE_EDIT
} from "../../constants/app.constants";
import {AuthService} from "../../service/auth/auth.service";
import {GroupService} from "../../service/group/group.service";

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
  @Output() toggleMyEvent = new EventEmitter<boolean>();
  @Output() toggleSearchEvent = new EventEmitter<string | null>();
  @Input() search: string | null = null;

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute, private groupService: GroupService) {

  }

  ngOnInit(): void {
    this.setDefaultRoute()
    this.route.snapshot.url
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

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate([`/${LOGIN}`]).then(r => this.handleNavigation(LOGIN));
    })
  }

  isHome() {
    return this.route.snapshot.url[0].path.includes(HOME);
  }

  isGroups() {
    return this.route.snapshot.url[0].path === GROUPS && this.route.snapshot.paramMap.get("id") === null
  }

  inGroupDomain() {
    return this.isGroupCreate() || this.isGroups()
  }

  isAccountEdit() {
    return this.route.snapshot.url[0].path === ACCOUNT_EDIT;
  }

  isNotifications() {
    return this.route.snapshot.url[0].path === NOTIFICATIONS;
  }

  isGroupCreate() {
    return this.route.snapshot.url[0].path === GROUP_CREATE;
  }

  isProfileOrEdit() {
    return this.currentRoute === `${PROFILE}` || this.currentRoute === `${PROFILE_EDIT}`
  }

  isMy() {
    return this.groupService.isMy()
  }

  myGroups() {
    return this.isMy() ? 'My Groups' : 'All groups'
  }

  toggleMy() {
    this.search = null
    this.groupService.toggleMy()
    this.toggleMyEvent.emit(this.groupService.isMy());
  }

  toggleSearch() {
    this.toggleSearchEvent.emit(this.search);
  }

  private handleNavigation(route: string) {
    console.log(`Navigating to ${route} page`)
    this.setCurrentRoute(route)
  }

  protected readonly HOME = HOME;
  protected readonly GROUPS = GROUPS;
  protected readonly PROFILE_EDIT = PROFILE_EDIT;
  protected readonly PROFILE = PROFILE;
  protected readonly NOTIFICATIONS = NOTIFICATIONS;
  protected readonly ACCOUNT_EDIT = ACCOUNT_EDIT;
  protected readonly GROUP_CREATE = GROUP_CREATE;
}
