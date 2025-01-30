import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, inject, provideAppInitializer } from '@angular/core';
import { AngularSvgIconPreloaderConfig } from './angular-svg-icon-preloader-config.class';
import { AngularSvgIconPreloaderService } from './angular-svg-icon-preloader/angular-svg-icon-preloader.service';

export function initConfig(svgSvc: AngularSvgIconPreloaderService) {
  return () => svgSvc.loadConfig();
}

@NgModule({
  imports: [CommonModule],
  providers: [
    AngularSvgIconPreloaderService,
    provideAppInitializer(() => {
        const initializerFn = (initConfig)(inject(AngularSvgIconPreloaderService));
        return initializerFn();
      }),
  ],
})
export class AngularSvgIconPreloaderModule {
  static forRoot(
    config: AngularSvgIconPreloaderConfig
  ): ModuleWithProviders<AngularSvgIconPreloaderModule> {
    return {
      ngModule: AngularSvgIconPreloaderModule,
      providers: [
        {
          provide: AngularSvgIconPreloaderConfig,
          useValue: config,
        },
        AngularSvgIconPreloaderService,
      ],
    };
  }
}
