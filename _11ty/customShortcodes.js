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

const makeList = (arr = []) => {
	switch (arr.length) {
		case 0:
			return '';
		case 1:
			return arr[0];
		case 2:
			return `${arr[0]} & ${arr[1]}`;
		default:
			const front = arr.slice(0, arr.length - 1);
			const end = arr.slice(-1);

			return `${front.join(', ')}, & ${end}`;
	}
};

const article = (str = '', capitalize = false) => {
	const a = capitalize ? 'A' : 'a';

	if (!str) return a;

	const vowels = ['a', 'e', 'i', 'o', 'u'];
	const firstLetter = str[0].toLowerCase();

	if (vowels.includes(firstLetter)) {
		return `${a}n`;
	} else {
		return a;
	}
};

module.exports = {
	split,
	makeList,
	article,
};
