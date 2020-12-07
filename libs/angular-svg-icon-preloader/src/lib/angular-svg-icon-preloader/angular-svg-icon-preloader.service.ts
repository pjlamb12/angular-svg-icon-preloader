import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AngularSvgIconPreloaderConfig } from '../angular-svg-icon-preloader-config.class';
import { CustomIconData, IconImageFile } from '../icon.interface';

@Injectable({
  providedIn: 'root',
})
export class AngularSvgIconPreloaderService {
  private configUrl: string = './assets/icons.json';
  private iconsFileData: {
    iconImageFiles: IconImageFile[];
    customIcons: CustomIconData[];
  };
  public configSubject: Subject<any> = new Subject<any>();

  constructor(
    private _http: HttpClient,
    @Optional() config: AngularSvgIconPreloaderConfig,
    private _iconRegistry: SvgIconRegistryService
  ) {
    if (config && config.configUrl) {
      this.configUrl = config.configUrl;
    }
  }

  loadConfig(): Promise<any> {
    return this._http
      .get(this.configUrl)
      .toPromise()
      .then(
        (configData: {
          iconImageFiles: IconImageFile[];
          customIcons: CustomIconData[];
        }) => {
          this.iconsFileData = configData;
          this.loadIcons();
        }
      )
      .catch((err: any) => {
        this.iconsFileData = { customIcons: [], iconImageFiles: [] };
        this.loadIcons();
      });
  }

  loadIcons() {
    this.iconsFileData.iconImageFiles.forEach((i: IconImageFile) => {
      this._iconRegistry
        .loadSvg(i.iconPath, i.iconName)
        .pipe(take(1))
        .subscribe();
    });
    this.iconsFileData.customIcons.forEach((i: CustomIconData) => {
      this._iconRegistry.addSvg(i.iconName, i.iconData);
    });
  }
}
