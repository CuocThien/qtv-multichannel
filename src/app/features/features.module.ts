import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { FacebookPostDetailComponent } from './facebook-post-detail/facebook-post-detail.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    PostDetailComponent,
    FacebookPostDetailComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    NzCardModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzPaginationModule,
  ],
  exports: [
    LoginComponent,
    HomeComponent,
    PostDetailComponent,
    FacebookPostDetailComponent,
  ],
})
export class FeaturesModule {}
