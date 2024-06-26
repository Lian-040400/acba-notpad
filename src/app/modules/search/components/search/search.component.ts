import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements  OnChanges {
  @ViewChild('searchInput', {static: true}) searchInput!: ElementRef;
  @Input() removeSearchValue = false;
  @Output() searchInputValue: EventEmitter<any> = new EventEmitter();
  ngOnChanges(changes: SimpleChanges) {
    if (this.removeSearchValue) {
      this.resetSearchInputValue();
    }
  }

  changeSearchInputValue(): void {
    this.searchInputValue.emit(this.searchInput.nativeElement.value);
    this.removeSearchValue = false;
  }

  resetSearchInputValue(): void {
    this.searchInput.nativeElement.value = '';
    this.changeSearchInputValue();
  }
}
