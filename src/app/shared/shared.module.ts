import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { CardModule } from 'primeng/card';
import { TruncatePipe } from './pipes/truncate.pipe';
import { SearchComponent } from './components/search/search.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule } from '@angular/router';
import { SlugifyPipe } from './pipes/slugify.pipe';
import { SkeletonModule } from 'primeng/skeleton';
import { SkeletonCardComponent } from './components/skeleton-card/skeleton-card.component';
@NgModule({
  declarations: [
    CardComponent,
    SearchComponent,
    TruncatePipe,
    SlugifyPipe,
    SkeletonCardComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    RouterModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    SkeletonModule
  ],
  exports:[
    CardComponent,
    SearchComponent,
    SkeletonCardComponent,
    TruncatePipe,
    SlugifyPipe
  ],
  providers:[
    TruncatePipe,
    SlugifyPipe
  ]
})
export class SharedModule { }
