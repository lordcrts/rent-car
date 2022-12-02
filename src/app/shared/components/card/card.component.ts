import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from 'src/app/core/models/car.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.sass']
})
export class CardComponent implements OnInit {
  @Input() cars!:Car[]
  @Input() buttonText!:string
  constructor() { }

  ngOnInit(): void {
  }

}
