import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {
  @Input() searchInput!:string;
  @Input() placeholder!:string;
  @Input() loading!:boolean;
  @Output() sendText = new EventEmitter<string>();

  search(type?:string){
    this.sendText.emit(this.searchInput)
  }

  clear(){
    this.searchInput = ''
    this.sendText.emit(this.searchInput)
  }

}
