import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { AngularSvgIconPreloaderConfig } from './angular-svg-icon-preloader-config.class';
import { AngularSvgIconPreloaderService } from './angular-svg-icon-preloader/angular-svg-icon-preloader.service';

export function initConfig(svgSvc: AngularSvgIconPreloaderService) {
  return () => svgSvc.loadConfig();
}

@NgModule({
  imports: [CommonModule],
  providers: [
    AngularSvgIconPreloaderService,
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      deps: [AngularSvgIconPreloaderService],
      multi: true,
    },
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
