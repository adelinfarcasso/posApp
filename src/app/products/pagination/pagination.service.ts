import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PaginationService {
  pageIndex: number = 0;
  pageSize: number = 5;
  totalLength: number;

  pageLengthChange = new Subject<number>();

  iterator() {
    const start = this.pageSize * this.pageIndex;
    const end = (this.pageIndex + 1) * this.pageSize;
    return [start, end];
  }

  onChange() {}
}
