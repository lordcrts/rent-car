import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-card',
  templateUrl: './skeleton-card.component.html',
  styleUrls: ['./skeleton-card.component.sass']
})
export class SkeletonCardComponent implements OnInit {
  skeletonArray:number[] = new Array(6).fill(0)
  constructor() { }

  ngOnInit(): void {
  }

}
