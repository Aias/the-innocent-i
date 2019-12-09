// Most of this taken from:
// https://github.com/11ty/eleventy-base-blog/blob/bbad06deaecd101a5e38ead1e59ad5087eccaf7a/.eleventy.js
const timeFormat = require('d3-time-format').timeFormat;
const pluginRss = require('@11ty/eleventy-plugin-rss');
// const pluginTypeset = require('eleventy-plugin-typeset');
const CleanCSS = require('clean-css');

module.exports = function(eleventyConfig) {
	/* Eleventy behavior */
	eleventyConfig.setUseGitIgnore(false); //https://github.com/11ty/eleventy/issues/483
	eleventyConfig.setDataDeepMerge(true);

	/* Plugins */
	eleventyConfig.addPlugin(pluginRss);

	/* 
		This won't work until eleventy-plugin-typeset
		is fixed (PR currently open) 
	*/
	// eleventyConfig.addPlugin(
	// 	pluginTypeset({
	// 		only: 'article'
	// 	})
	// );

	/* Filters */
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

	eleventyConfig.addFilter('cssmin', code => {
		return new CleanCSS({}).minify(code).styles;
	});

	/* Markdown options */
	let markdownIt = require('markdown-it');
	let markdownItAnchor = require('markdown-it-anchor');
	let markdownItAttrs = require('markdown-it-attrs');
	let markdownOpts = {
		html: true,
		xhtmlOut: true, // Self-close <br /> tags (this fixes a bug with the Atom feed.)
		breaks: true,
		linkify: true,
	};
	let anchorOpts = {
		permalink: true,
		permalinkClass: 'heading-link',
		permalinkSymbol: '#',
		permalinkSpace: false,
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

	eleventyConfig.addCollection('fragments', collection => {
		// I don't like that I have to specify src/ first here.
		// Is this intentional behavior? Shouldn't it just default to the input directory?
		return collection.getFilteredByGlob([
			'src/fragments/*.md',
			'src/fragments/*.html',
		]);
	});

	eleventyConfig.addCollection('tagList', require('./_11ty/getTagList'));

	return {
		watchTriggerDelay: 200, // https://github.com/11ty/eleventy/pull/564
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
			output: '_site',
		},
	};
};
