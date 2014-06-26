//
// JSON mockup code
//

/* 
The mockJSON generator creates a JSON from a fixture. Yet the things 
we wanted to loop through weren't in there, namely the country's of Europe, 
and the flat, house and farm. In the first two statements I add these lists. 
*/

$.mockJSON.data.EU_COUNTRY = [
	'gl', 'is', 'pt', 'es', 'be', 'it', 'by', 'pl', 'gr', 'fi', 'de', 'se', 'no', 'ua', 'ie', 'ch', 'at', 'cz', 'sk', 'hu', 'lt', 'lv', 'md', 'ro', 'bg', 'al', 'ee', 'ad', 'sm', 'mc', 'lu', 'fr', 'li', 'nl', 'ba', 'si', 'mk', 'hr', 'ru', 'gb', 'va', 'mt', 'dk', 'cy', 'rs', 'me', 'Kosovo'
];

$.mockJSON.data.HTYPE = [
'flat', 'house', 'farm'
];

/*; 
This is the fixure itself. It takes some weeeird syntax, 
but it works. It says: In permanent I want 1000-10000 array items 
wich contain a userid of 20-40 numbers, a country of 
the list above, and a htype of the other list above.
*/

var votersFixture = { 
	 "permanent|100-400" : [ 
		{ 
  		"userid|20-40" : "@NUMBER",
  		"htype" : "@EU_COUNTRY",
  		"choice" : "@HTYPE"
  		}
	 	]
	};

// Here the actual mockJSON is created.

var tempVotes = $.mockJSON.generateFromTemplate(votersFixture);

// Here the mockJSON is strinified and stored in localStorage.votes

var TempVotesStringified = JSON.stringify(tempVotes);

localStorage.votes = TempVotesStringified;
