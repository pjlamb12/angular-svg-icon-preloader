<p align="center">
 <img width="20%" height="20%" src="https://raw.githubusercontent.com/pjlamb12/angular-svg-icon-preloader/main/logo.svg">
</p>

<br />

[![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg?style=flat-square)]()
[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)]()
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)

Angular SVG Icon Preloader is a library to be used in conjunction with the [angular-svg-icon library](https://www.npmjs.com/package/angular-svg-icon). The purpose is to allow you to provide a JSON file of icons that you will use frequently enough that they can be preloaded when the app bootstraps. You can still load icons after the app bootstraps the same way angular-svg-icon provides; this is just another way of loading the icons.

## Features

-   ✅ Preload icons as files or SVG icon data
-   ✅ Use the icons as soon as the app loads without having to manually load the icon

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)

## Installation

### NPM

`npm install angular-svg-icon-preloader`

### Yarn

`yarn add angular-svg-icon-preloader`

## Usage

For the library to work, you need to first create a JSON file somewhere that your app can load. The easiest location is in the app's `assets` folder. The JSON file should have two top level attributes:

-   `iconImageFiles`: an array of `IconImageFile` items. These items have two attributes each, `iconName` and `iconPath`. Both are strings. `iconName` is how you'll refer to the icon later in your app. `iconPath` is the URL to the SVG image file. This can be in the app's asset folder, or anywhere else that your app has access to reference SVG images.
-   `customIcons`: an array of `CustomIconData` items. These items have two attributes each, `iconName` and `iconData`. Both are strings. `iconName` is how you'll refer to the icon later in your app. `iconData` is the SVG code that would go in your HTML file if you were using the raw SVG.

These arrays can have any number of icons in them, and they'll all be loaded automatically when the app bootstraps for you. Here's an example `icons.json` file:

```json
{
	"iconImageFiles": [
		{
			"iconName": "badge-check",
			"iconPath": "/assets/icons/badge-check.svg"
		}
	],
	"customIcons": [
		{
			"iconName": "academic-cap",
			"iconData": "<svg xmlns=\"http://www.w3.org/2000/svg\" > <path d=\"...\" /> </svg>"
		}
	]
}
```

Once you've defined your JSON file with the icon information, just import the angular-svg-icon library and this library in your `AppModule`. Make sure to provide the path to the icons JSON file in the `forRoot` method of the `AngularSvgIconPreloaderModule`'s `forRoot` method:

```ts
@NgModule({
	imports: [
		AngularSvgIconModule.forRoot(), // angular-svg-icon library module
		AngularSvgIconPreloaderModule.forRoot({
			configUrl: './assets/json/icons.json',
		}),
	]
})
```

At this point, everything is done. To use the `academic-cap` icon in the above mentioned `customIcons` array, you only need to use the `svg-icon` component from `angular-svg-icon`:

```html
<svg-icon name="badge-check"></svg-icon>
<svg-icon name="academic-cap"></svg-icon>
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
