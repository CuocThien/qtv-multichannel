import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { FacebookPostDetailComponent } from './facebook-post-detail/facebook-post-detail.component';

import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PolicyComponent } from './policy/policy.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../core/interceptors/auth.interceptor';
import { InstagramPostDetailComponent } from './instagram-post-detail/instagram-post-detail.component';
import { ZaloPostDetailComponent } from './zalo-post-detail/zalo-post-detail.component';
import { NgxSpinnerModule } from 'ngx-spinner';
@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    PostDetailComponent,
    FacebookPostDetailComponent,
    PolicyComponent,
    CreatePostComponent,
    InstagramPostDetailComponent,
    ZaloPostDetailComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    CKEditorModule,
    NzCardModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzPaginationModule,
    NzDividerModule,
    NzAvatarModule,
    NzIconModule,
    NzUploadModule,
    NzDatePickerModule,
    NzModalModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
  ],
  exports: [
    LoginComponent,
    HomeComponent,
    PostDetailComponent,
    FacebookPostDetailComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class FeaturesModule {}
