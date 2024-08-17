import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { NoopAnimationsModule, provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(MatSnackBarModule),
    importProvidersFrom(NoopAnimationsModule),
    provideNoopAnimations()
]
};
