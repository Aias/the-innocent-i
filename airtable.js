var Airtable = require('airtable');
var dotenv = require('dotenv');

dotenv.config();

Airtable.configure({
	endpointUrl: process.env.AIRTABLE_API_URL,
	apiKey: process.env.AIRTABLE_API_KEY,
});

let commonplace = Airtable.base('appDxOYNGfqhrpvYv');

module.exports = {
	Airtable,
	commonplace,
};
