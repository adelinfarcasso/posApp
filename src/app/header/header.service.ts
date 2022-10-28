import { Subject } from 'rxjs';

export class HeaderService {
  toggleSearch = new Subject<boolean>();
}
