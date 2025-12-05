import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
	provideHttpClient,
	withInterceptorsFromDi,
} from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AngularSvgIconPreloaderModule } from 'angular-svg-icon-preloader';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	bootstrap: [AppComponent],
	imports: [
		BrowserModule,
		AngularSvgIconModule.forRoot(),
		AngularSvgIconPreloaderModule.forRoot({
			configUrl: './assets/json/icons.json',
		}),
	],
	providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
