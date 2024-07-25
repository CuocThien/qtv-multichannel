const TENANT_ID = '2dff09ac-2b3b-4182-9953-2b548e0d0b39';
const CLIENT_ID = '2496ba32-31c9-41fb-9259-59c60debcfc3';

import { Configuration, PublicClientApplication } from '@azure/msal-browser';
const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;
export const msalConfig: Configuration = {
  auth: {
    clientId: CLIENT_ID,
    authority: `https://login.microsoftonline.com/${TENANT_ID}`,
    redirectUri: 'http://localhost:4200', // Your redirect URI
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: isIE, // Set this to true if you're having issues on IE11 or Edge
  },
};

export function MSALInstanceFactory(): PublicClientApplication {
  return new PublicClientApplication(msalConfig);
}

export const protectedResourceMap = new Map<string, Array<string>>([
  ['https://graph.microsoft.com/v1.0/me', ['user.read']],
]);
