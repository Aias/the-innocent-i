// Most of this taken from:
// https://github.com/11ty/eleventy-base-blog/blob/bbad06deaecd101a5e38ead1e59ad5087eccaf7a/.eleventy.js
const timeFormat = require('d3-time-format').timeFormat;
const pluginRss = require('@11ty/eleventy-plugin-rss');
const CleanCSS = require('clean-css');

module.exports = function(eleventyConfig) {
	/* Eleventy behavior */
	eleventyConfig.setDataDeepMerge(true);
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addFilter('cssmin', code => {
		return new CleanCSS({}).minify(code).styles;
	});

	eleventyConfig.addFilter(
		'formatTime',
		(dateObj, specifier = '%Y-%m-%d') => {
			let d = new Date(dateObj);
			let format = timeFormat(specifier);

			return format(d);
		}
	);

	eleventyConfig.addFilter('slugToTitle', slugString => {
		return slugString.replace(/-/g, ' ');
	});

	/* Markdown plugins */
	let markdownIt = require('markdown-it');
	let markdownItAnchor = require('markdown-it-anchor');
	let markdownItAttrs = require('markdown-it-attrs');
	let markdownOpts = {
		html: true,
		breaks: true,
		linkify: true
	};
	let anchorOpts = {
		permalink: true,
		permalinkClass: 'heading-link',
		permalinkSymbol: '#',
		permalinkSpace: false
		// permalinkBefore: false
	};

	eleventyConfig.setLibrary(
		'md',
		markdownIt(markdownOpts)
			.use(markdownItAnchor, anchorOpts)
			.use(markdownItAttrs)
	);

	/* Static files (CSS, images, etc.) */
	eleventyConfig.addPassthroughCopy('static');
	eleventyConfig.addPassthroughCopy({ 'scripts/public': 'scripts' });
	eleventyConfig.addPassthroughCopy({ 'src/favicon.png': 'favicon.png' });

	return {
		templateFormats: ['html', 'liquid', 'md', 'njk'],
		pathPrefix: '/',
		markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
		passthroughFileCopy: true,
		dir: {
			input: 'src',
			includes: '_includes',
			layouts: '_includes/layouts',
			data: '_data',
			output: '_site'
		}
	};
};
