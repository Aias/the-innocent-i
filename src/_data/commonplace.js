var { commonplace } = require('../../airtable');

async function getTable(table) {
	let records = {
		byId: {},
		all: [],
	};
	let pages = await commonplace(table)
		.select()
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
	let groups = await getTable('groups');
	let creators = await getTable('creators');
	let spaces = await getTable('spaces');

	return {
		extracts,
		groups,
		creators,
		spaces,
	};
};
