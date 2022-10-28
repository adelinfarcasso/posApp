import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HeaderService } from '../header.service';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.css'],
})
export class SearchPanelComponent implements OnInit {
  isVisible = true;
  searchValue: string = '';

  constructor(private headerService: HeaderService) {}
  @ViewChild('search', { static: true }) searchElem: any;

  ngOnInit(): void {
    this.headerService.toggleSearch.subscribe(() => {
      this.searchElem.toggle();
      this.isVisible = !this.isVisible;
      console.log(this.isVisible);
    });
  }
}
