import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();
  @Input() placeholder = 'Search...';


  searchValue(value: string): void {
    this.search.emit(value || '');
  }

} 