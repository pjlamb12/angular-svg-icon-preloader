import { AppComponent } from './app.component';

describe('AppComponent', () => {
	let app;

	beforeEach(() => {
		app = new AppComponent();
	});

	it('should create the app', () => {
		expect(app).toBeTruthy();
	});
});
