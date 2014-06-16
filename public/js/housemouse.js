//
// JSON mockup code
//

/* The mockJSON generator creates a JSON from a fixture. Yet the things 
we wanted to loop through weren't in there, namely the country's of Europe, 
and the flat, house and farm. In the first two statements I add these lists. 
*/

//Fill in the country's that are needed!

$.mockJSON.data.EU_COUNTRY = [
'al', 'ad', 'at', 'by', 'be','ba','bg','hr','cy','cz','dk','ee','fo','fi','fr','de','gi','gr','hu','is','ie','it','lv','li','lt','lu','mk','mt','md','mc','nl','no','pl','pt','ro','ru','sm','rs','sk','si','es','se','ch','ua','gb','va', 'im','me'
];

$.mockJSON.data.HTYPE = [
'flat', 'house', 'farm'
];

/* This is the fixure itself. It takes some weeeird syntax, 
but it works. It says: In permanent I want 1000-10000 array items 
wich contain a userid of 20-40 numbers, a country of 
the list above, and a htype of the other list above.
*/

var votersFixture = { 
	 "permanent|1000-10000" : [ 
		{ 
  		"userid|20-40" : "@NUMBER",
  		"country" : "@EU_COUNTRY",
  		"choice" : "@HTYPE"
  		}
	 	]
	};

	// Here the actual mockJSON is created.

var voters = $.mockJSON.generateFromTemplate(votersFixture);	

//
	// TAARTCODE
	//

	// Here im simply defining variables and taking the length of the voters array.
	
var count = {flat: 0, house: 0, farm: 0};
var arrayPermanentLength = voters.permanent.length;	
	
// The 'for' statement creates a loop: a codeblock which will run 
// a limited ammount of times. Infinite loops make your 
// computer go boom. It takes three parameters, between the (). 
// The first defines the variable which will be used to determine the amount 
// of times it runs. The second parameter sets the condition on which 
// the loop will be broken, in this case the total ammount of votes. The last 
// statement adds one to the variable at the end of each loop so that 
// the variable will reach that point.

// Within the for loop it's not that complicated. 
// If, for example, the choice in one of the votes is 'flat' 
// then it adds one to count.flat. 

for (var u = 0; u < arrayPermanentLength; u++) {
	if (voters.permanent[u].choice == "flat") {
			count.flat++; 
	};
	if (voters.permanent[u].choice == "house") {
			count.house++; 
	};
	if (voters.permanent[u].choice == "farm") {
			count.farm++; 
	};
};

// Here I'm setting the attributes of bigpie to the right value's.

document.getElementById("bigpie").setAttribute("houseval", count.house);
document.getElementById("bigpie").setAttribute("flatval", count.flat);
document.getElementById("bigpie").setAttribute("farmval", count.farm);

//
// Kaartcode
//

// This first var creates the array for all the country's. 

// Still need to be filled with all the country's. 
// Remember to make the mockJSON list above correspond with these country's, 
// else there won't be votes for that country!

var countryCount = [
	{country: "nl", htype: "flat", flat: 0, house: 0, farm: 0},
	{country: "de", htype: "huis", flat: 0, house: 0, farm: 0},
	{country: "fr", htype: "farm", flat: 0, house: 0, farm: 0},
	{country: "gb", htype: "farm", flat: 0, house: 0, farm: 0},
	{country: "pt", htype: "farm", flat: 0, house: 0, farm: 0},
	{country: "dk", htype: "farm", flat: 0, house: 0, farm: 0},
	{country: "sk", htype: "farm", flat: 0, house: 0, farm: 0},
	{country: "ro", htype: "farm", flat: 0, house: 0, farm: 0},
	{country: "no", htype: "farm", flat: 0, house: 0, farm: 0},
	{country: "is", htype: "farm", flat: 0, house: 0, farm: 0},
];

// Here I'm checking the length of the arrays voters.permanent and countryCount. 

var arrayPermanentLength = voters.permanent.length;	
var arrayCountryCountLength = countryCount.length;
				
/* 

This loop is a bit more complicated to understand. 
But actually it does the same thing as the simpler loop above.

The first loop runs trough the votes array like above. The second 
loop runs trough the country's in the same manner. When the country's match, 
it checks the choice add one to that country count. 

	*/

for (var i = 0; i < arrayPermanentLength; i++) {
	for (var s = 0; s < arrayCountryCountLength; s++)
		if (voters.permanent[i].country == countryCount[s].country) {
			if (voters.permanent[i].choice == "flat") {
				countryCount[s].flat++;
			};
			if (voters.permanent[i].choice == "house") {
				countryCount[s].house++;
			};
			if (voters.permanent[i].choice == "farm") {
				countryCount[s].farm++;
			};
		};
};

// And here is the usual logging stuff. 

console.log(voters);
console.log(countryCount);
console.log(count);
