import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
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
	} = { customIcons: [], iconImageFiles: [] };
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

	loadConfig(): Observable<any> {
		return this._http
			.get<{
				iconImageFiles: IconImageFile[];
				customIcons: CustomIconData[];
			}>(this.configUrl)
			.pipe(
				tap(
					(configData: {
						iconImageFiles: IconImageFile[];
						customIcons: CustomIconData[];
					}) => {
						this.iconsFileData = configData;
						this.loadIcons();
					}
				),
				catchError((err) => {
					console.error(
						'An error occurred loading the icons:\n',
						err,
						'\nNo icons will be loaded.'
					);
					this.iconsFileData = {
						customIcons: [],
						iconImageFiles: [],
					};
					this.loadIcons();
					return EMPTY;
				})
			);
	}

	loadIcons() {
		this.iconsFileData.iconImageFiles.forEach((i: IconImageFile) => {
			const iconObs = this._iconRegistry.loadSvg(i.iconPath, i.iconName);

			if (iconObs) {
				iconObs.pipe(take(1)).subscribe();
			}
		});
		this.iconsFileData.customIcons.forEach((i: CustomIconData) => {
			this._iconRegistry.addSvg(i.iconName, i.iconData);
		});
	}
}
