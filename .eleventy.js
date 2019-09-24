// Most of this taken from:
// https://github.com/11ty/eleventy-base-blog/blob/bbad06deaecd101a5e38ead1e59ad5087eccaf7a/.eleventy.js
const { DateTime } = require('luxon');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const CleanCSS = require('clean-css');

module.exports = function(eleventyConfig) {
	/* Eleventy behavior */
	eleventyConfig.setDataDeepMerge(true);
	eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addFilter('cssmin', code => {
		return new CleanCSS({}).minify(code).styles;
	});

	eleventyConfig.addFilter('readableDate', dateObj => {
		return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
			'dd LLL yyyy'
		);
	});

	eleventyConfig.addFilter('htmlDateString', dateObj => {
		return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat(
			'yyyy-LL-dd'
		);
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
	eleventyConfig.addPassthroughCopy({ static: '.' });

	return {
		templateFormats: ['html', 'liquid', 'md', 'njk'],
		pathPrefix: '/',
		markdownTemplateEngine: 'liquid',
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
