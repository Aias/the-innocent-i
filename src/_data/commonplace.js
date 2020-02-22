var { commonplace } = require('../../airtable');

async function getTable(table, options = {}) {
	let allOps = { ...options };
	if (process.env.ELEVENTY_ENV === 'development') {
		allOps.maxRecords = 50;
	}

	let records = {
		byId: {},
		all: [],
	};
	let pages = await commonplace(table)
		.select(allOps)
		.eachPage((rows, fetchNextPage) => {
			rows.forEach(record => {
				const id = record.id;
				const fields = record.fields;
				const recordWithId = {
					id,
					...fields,
				};

				records.byId[id] = recordWithId;
				records.all.push(recordWithId);
			});

			fetchNextPage();
		});

	return records;
}

module.exports = async function() {
	let extracts = await getTable('extracts');
	let works = await getTable('groups');
	let creators = await getTable('creators');
	let spaces = await getTable('spaces');

	return {
		extracts,
		works,
		creators,
		spaces,
	};
};
