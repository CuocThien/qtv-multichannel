import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './components/post-card/post-card.component';
import { NzCardModule } from 'ng-zorro-antd/card';

@NgModule({
  declarations: [PostCardComponent],
  imports: [
    CommonModule,
    NzCardModule
  ],
  exports: [PostCardComponent]
})
export class SharedModule { }
