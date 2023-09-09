import {Component, OnInit} from '@angular/core';
import {transitionAnimation} from "../../../animation/transition.animation";
import {GroupService} from "../../../service/group/group.service";

@Component({
  selector: 'app-group-list-component',
  templateUrl: './group-list-component.component.html',
  styleUrls: ['./group-list-component.component.css'],
  animations: [transitionAnimation]
})
export class GroupListComponentComponent implements OnInit{

  constructor(private groupService: GroupService) {
  }

  ngOnInit(): void {
    this.groupService.resetMy()
  }

}
