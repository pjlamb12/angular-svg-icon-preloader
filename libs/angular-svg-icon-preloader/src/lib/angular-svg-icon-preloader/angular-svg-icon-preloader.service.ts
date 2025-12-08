import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError, take, tap } from 'rxjs/operators';
import { AngularSvgIconPreloaderConfig } from '../angular-svg-icon-preloader-config.class';
import { CustomIconData, IconImageFile } from '../icon.interface';

@Injectable({
	providedIn: 'root',
})
export class AngularSvgIconPreloaderService {
	private readonly _http = inject(HttpClient);
	private readonly _iconRegistry = inject(SvgIconRegistryService);
	private readonly _config = inject(AngularSvgIconPreloaderConfig, {
		optional: true,
	});

	private readonly configUrl: string =
		this._config?.configUrl || './assets/icons.json';
	private iconsFileData: {
		iconImageFiles: IconImageFile[];
		customIcons: CustomIconData[];
	} = { customIcons: [], iconImageFiles: [] };
	public configSubject: Subject<any> = new Subject<any>();

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
