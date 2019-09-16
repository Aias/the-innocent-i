// Most of this taken from:
// https://github.com/11ty/eleventy-base-blog/blob/bbad06deaecd101a5e38ead1e59ad5087eccaf7a/.eleventy.js

const pluginRss = require('@11ty/eleventy-plugin-rss');

module.exports = function(eleventyConfig) {
	/* Eleventy behavior */
	eleventyConfig.setDataDeepMerge(true);
	eleventyConfig.addPlugin(pluginRss);

	/* Markdown plugins */
	let markdownIt = require('markdown-it');
	let markdownItAnchor = require('markdown-it-anchor');
	let markdownOpts = {
		html: true,
		breaks: true,
		linkify: true
	};
	let anchorOpts = {
		permalink: true,
		permalinkClass: 'heading-link',
		permalinkSymbol: '⚓',
		permalinkSpace: false
	};

	eleventyConfig.setLibrary(
		'md',
		markdownIt(markdownOpts).use(markdownItAnchor, anchorOpts)
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
			data: '_data',
			output: '_site'
		}
	};
};
