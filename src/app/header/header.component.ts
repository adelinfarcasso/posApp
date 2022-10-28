import { Component, Input, OnInit } from '@angular/core';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // isOpened: boolean = false;

  constructor(private headerService: HeaderService) {}

  onSearchToggle() {
    this.headerService.toggleSearch.next();
  }
  ngOnInit(): void {}
}
