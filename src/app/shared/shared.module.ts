import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './components/post-card/post-card.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CommentComponent } from './components/comment/comment.component';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { PowerBiComponent } from './components/power-bi/power-bi.component';
import { PowerBIEmbedModule } from 'powerbi-client-angular';

@NgModule({
  declarations: [PostCardComponent, CommentComponent, PowerBiComponent],
  imports: [CommonModule, NzCardModule, NzAvatarModule, PowerBIEmbedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [PostCardComponent, CommentComponent],
})
export class SharedModule {}
