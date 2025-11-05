import { TestBed, waitForAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AngularSvgIconPreloaderService } from './angular-svg-icon-preloader.service';
import { HttpClient } from '@angular/common/http';
import { SvgIconRegistryService } from 'angular-svg-icon';

const DEMO_ICONS_JSON = {
	iconImageFiles: [
		{
			iconName: 'badge-check',
			iconPath: '/assets/icons/badge-check.svg',
		},
	],
	customIcons: [
		{
			iconName: 'academic-cap',
			iconData:
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"> <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" /> </svg>',
		},
	],
};

describe('AngularSvgIconPreloaderService', () => {
	let service: AngularSvgIconPreloaderService;
	let mockHttpClient: HttpClient;
	let mockSvgIconRegistryService: SvgIconRegistryService;

	beforeEach(() => {
		mockHttpClient = {
			get: null,
		} as any as HttpClient;
		mockSvgIconRegistryService = {
			loadSvg: jest.fn().mockReturnValue(of(null)),
			addSvg: jest.fn(),
		} as any as SvgIconRegistryService;
		TestBed.configureTestingModule({
			providers: [
				{ provide: HttpClient, useValue: mockHttpClient },
				{
					provide: SvgIconRegistryService,
					useValue: mockSvgIconRegistryService,
				},
				AngularSvgIconPreloaderService,
			],
		});

		service = TestBed.inject(AngularSvgIconPreloaderService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should call the load icons method', waitForAsync(() => {
		mockHttpClient.get = jest.fn().mockReturnValue(of(DEMO_ICONS_JSON));

		service.loadConfig().subscribe(() => {
			expect(mockSvgIconRegistryService.loadSvg).toHaveBeenCalledTimes(1);
			expect(mockSvgIconRegistryService.addSvg).toHaveBeenCalledTimes(1);
		});
	}));

	it('should handle an error when loading the JSON file', waitForAsync(() => {
		mockHttpClient.get = jest
			.fn()
			.mockReturnValue(throwError(() => 'JSON File Loading Error'));

		service.loadConfig().subscribe(() => {
			expect(mockSvgIconRegistryService.loadSvg).toHaveBeenCalledTimes(0);
			expect(mockSvgIconRegistryService.addSvg).toHaveBeenCalledTimes(0);
		});
	}));
});
