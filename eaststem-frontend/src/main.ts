import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';


/**
 * app.module.ts     configuration setting
 * /components       all the components used in apps, named by roles
 * /entities         all the beans user in apps
 * /service          logical implement and http part
 * @author Likun Li
 * @version 2018.12
 */


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
