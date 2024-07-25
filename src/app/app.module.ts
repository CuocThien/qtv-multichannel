import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthService } from './core/services';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { FeaturesModule } from './features/features.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  MsalGuard,
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalService,
} from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import {
  MSALInstanceFactory,
  protectedResourceMap,
} from './shared/directives/msal-config';

registerLocaleData(en);

const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

const TENANT_ID = '2dff09ac-2b3b-4182-9953-2b548e0d0b39';
const CLIENT_ID = '2496ba32-31c9-41fb-9259-59c60debcfc3';

// Factory function for MSAL Interceptor configuration
export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: protectedResourceMap,
  };
}

// Factory function for MSAL Guard configuration
export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    FeaturesModule,
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    HttpClientModule,
    // MsalModule.forRoot(
    //   new PublicClientApplication({
    //     auth: {
    //       clientId: CLIENT_ID, // Replace with your Azure AD client ID
    //       authority: `https://login.microsoftonline.com/${TENANT_ID}`, // Replace with your Azure AD tenant ID
    //       redirectUri: 'http://localhost:4200', // Replace with your redirect URI
    //     },
    //     cache: {
    //       cacheLocation: 'localStorage',
    //       storeAuthStateInCookie: isIE,
    //     },
    //   }),
    //   {
    //     interactionType: InteractionType.Redirect, // MSAL Guard Configuration
    //     authRequest: {
    //       scopes: ['user.read'],
    //     },
    //   },
    //   {
    //     interactionType: InteractionType.Redirect, // MSAL Interceptor Configuration
    //     protectedResourceMap: new Map([
    //       ['https://graph.microsoft.com/v1.0/me', ['user.read']],
    //     ]),
    //   },
    // ),
    MsalModule.forRoot(
      MSALInstanceFactory(),
      MSALGuardConfigFactory(),
      MSALInterceptorConfigFactory(),
    ),
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    provideAnimationsAsync(),
    provideHttpClient(),
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    MsalService,
    MsalGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
