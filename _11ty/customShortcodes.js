const split = (string = '') => {
	return `<span class="split">${string
		.split(' ')
		.map(word => {
			return `<span class="split-word">${word
				.split('')
				.map(char => {
					return `<span class="split-char">${char}</span>`;
				})
				.join('')}</span>`;
		})
		.join('')}</span>`;
};

module.exports = {
	split,
};
