import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @ViewChild('searchInput', {static: true}) searchInput!: ElementRef;
  @Output()searchInputValue: EventEmitter<any> = new EventEmitter();
  inputValue = '';
  changeSearchInputValue(): void {
    this.inputValue = this.searchInput.nativeElement.value;
    this.searchInputValue.emit(this.inputValue);
    // this.loadedSearchComponent.instance.searchInputValue.next(this.searchInput.nativeElement.value);
  }
}
