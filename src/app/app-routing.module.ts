import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { PostDetailComponent } from './features/post-detail/post-detail.component';
import { FacebookPostDetailComponent } from './features/facebook-post-detail/facebook-post-detail.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'post/:id',
    component: PostDetailComponent,
    canActivate: [AuthGuard],
  },
  { path: 'post/fb/:id', component: FacebookPostDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
