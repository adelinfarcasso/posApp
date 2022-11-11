import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaginationService {
  paginationDetails = {
    pageIndex: 0,
    pageSize: 5,
    totalLength: 0,
  };

  pageChange = new Subject<{
    pageIndex?: number;
    pageSize?: number;
    totalLength?: number;
  }>();

  iterator() {
    const start =
      this.paginationDetails.pageSize * this.paginationDetails.pageIndex;
    const end =
      (this.paginationDetails.pageIndex + 1) * this.paginationDetails.pageSize;
    console.log('Start:', start, 'End', end);

    return [start, end];
  }

  onChange() {}
}
