// html_data
const html_data = [
	// index
	{
		filename: 'index',
		folder: '',
		src: [
			// header
			'app/_template/parts/header.html',

			// todo
			'app/todo/*.html',

			// footer
			'app/_template/parts/footer.html',
		],
	},
]

// sass
const sass_src = [
	//_preset
	'app/_template/_preset.sass',
	'app/**/_preset.sass',
	// *
	'app/_template/*.sass',
	'app/**/*.sass',
]

// js
const js_src = [
	'app/_template/*.js',
	'app/_components/*.js',
	'app/**/*.js',
]

//images
const images_src = [
	'app/**/*.jpg',
	'app/**/*.svg',
	'app/**/*.png',
	'app/**/*.webp',
	'app/**/*.ico',
]

// json
const json_src = ['app/**/*.json']

//
// подключение модулей
//
const { src, dest, series, watch } = require('gulp') // галп
const sass = require('gulp-sass')(require('sass'))
const auto_prefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const del = require('del')

//
// основное тело галпа
//

// del_dist
const del_dist = () => {
	return del('dist/')
}

// html build
const build_html = (data) => {
	return src(data.src)
		.pipe(concat(`${data.filename}.html`))
		.pipe(dest(`dist/${data.folder}`))
}
const build_htmls = async () => {
	for (let i = 0; i < html_data.length; i++) {
		await build_html(html_data[i])
	}
}

// build_css
const build_css = () => {
	return src(sass_src, { allowEmpty: true })
		.pipe(concat('style.sass'))
		.pipe(
			sass({
				indentedSyntax: false,
			})
		)
		.pipe(
			auto_prefixer({
				overrideBrowserslist: 'last 2 versions',
			})
		)
		.pipe(concat('style.css'))
		.pipe(dest('dist/assets/'))
}

// js build
const build_js = () => {
	return src(js_src).pipe(concat('app.js')).pipe(dest('dist/assets/'))
}

// images export
const export_images = () => {
	return src(images_src).pipe(dest('dist/images/'))
}

// files export
const export_json = () => {
	return src(json_src).pipe(dest('dist/json/'))
}

//
// to watch
//
const to_watch = () => {
	// build
	for (let i = 0; i < html_data.length; i++) {
		watch(
			html_data[i].src,

			series(async () => await build_html(html_data[i]))
		)
	}
	watch(sass_src, series(build_css))
	watch(js_src, series(build_js))

	// export
	watch(images_src, series(export_images))
	watch(json_src, series(export_json))
}

//
// объявление функции для консоли
//
exports.default = series(
	// del
	del_dist,

	// build
	build_htmls,
	build_css,
	build_js,

	// export
	export_images,
	export_json,

	// to_watch
	to_watch
)
