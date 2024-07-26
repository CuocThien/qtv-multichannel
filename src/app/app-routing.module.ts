import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { PostDetailComponent } from './features/post-detail/post-detail.component';
import { FacebookPostDetailComponent } from './features/facebook-post-detail/facebook-post-detail.component';
import { AuthGuard } from './core/guards/auth.guard';
import { PolicyComponent } from './features/policy/policy.component';
import { CreatePostComponent } from './features/create-post/create-post.component';
import { InstagramPostDetailComponent } from './features/instagram-post-detail/instagram-post-detail.component';
import { ZaloPostDetailComponent } from './features/zalo-post-detail/zalo-post-detail.component';
import { MsalGuard } from '@azure/msal-angular';
import { PowerBiComponent } from './shared/components/power-bi/power-bi.component';
import { PowerBiV2Component } from './shared/components/power-bi-v2/power-bi-v2.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'policy', component: PolicyComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'post/:id',
    component: PostDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'post/fb/:id',
    component: FacebookPostDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'post/instagram/:id',
    component: InstagramPostDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'post/zalo/:id',
    component: ZaloPostDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-post',
    component: CreatePostComponent,
    canActivate: [AuthGuard],
  },
  { path: 'quarterly-post-reaction', component: PowerBiComponent },
  { path: 'reactions-comments-by-type', component: PowerBiV2Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
