//
// JSON mockup code
//

/* 
The mockJSON generator creates a JSON from a fixture. Yet the things 
we wanted to loop through weren't in there, namely the country's of Europe, 
and the flat, house and farm. In the first two statements I add these lists. 
*/

// Fill in the country's that are needed!

$.mockJSON.data.EU_COUNTRY = [
'al', 'ad', 'at', 'by', 'be','ba','bg','hr','cy','cz','dk','ee','fo','fi','fr','de','gi','gr','hu','is','ie','it','lv','li','lt','lu','mk','mt','md','mc','nl','no','pl','pt','ro','ru','sm','rs','sk','si','es','se','ch','ua','gb','va', 'im','me'
];

$.mockJSON.data.HTYPE = [
'flat', 'house', 'farm'
];

/* 
This is the fixure itself. It takes some weeeird syntax, 
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
// The calculation for the Pie and the Chart. 
//

// This first var creates the array for all the country's. 

/* 
Still need to be filled with the right country's. 
Remember to make the mockJSON list above correspond with these country's, 
else there won't be votes for that country! 
*/

var countryCount = [
	{country: "total", htype: "", flat: 0, house: 0, farm: 0},
	{country: "nl", htype: "", flat: 0, house: 0, farm: 0},
	{country: "de", htype: "", flat: 0, house: 0, farm: 0},
	{country: "fr", htype: "", flat: 0, house: 0, farm: 0},
	{country: "gb", htype: "", flat: 0, house: 0, farm: 0},
	{country: "pt", htype: "", flat: 0, house: 0, farm: 0},
	{country: "dk", htype: "", flat: 0, house: 0, farm: 0},
	{country: "sk", htype: "", flat: 0, house: 0, farm: 0},
	{country: "ro", htype: "", flat: 0, house: 0, farm: 0},
	{country: "no", htype: "", flat: 0, house: 0, farm: 0},
	{country: "is", htype: "", flat: 0, house: 0, farm: 0},
];

// Here I'm checking the length of the arrays voters.permanent and countryCount. 

var arrayPermanentLength = voters.permanent.length;	
var arrayCountryCountLength = countryCount.length;
				
/* 
The 'for' statement creates a loop: a codeblock which will run 
a limited amount of times. Infinite loops make your 
computer go boom. It takes three parameters, between the (). 
The first statement defines the variable which will be used to determine the amount 
of times it runs. The second parameter sets the condition up which 
the loop will be broken, in this case the total amount of votes. The last 
statement adds one to the variable at the end of each loop so that 
the variable will reach the condition.

Within the for loop it's not that complicated. 
If, for example, the choice in one of the votes is 'flat' 
then it adds one to countryCount[s].choice. 

The first loop runs trough the votes array like above. The second 
loop runs trough the country's in the same manner. When the country's match, 
it checks the choice add one to that country count. It skips the first object
in the array because that's the total (s = 1)
*/

for (var i = 0; i < arrayPermanentLength; i++) {

	// Calculating the total

	if (voters.permanent[i].choice == "flat") {
			countryCount[0].flat++; 
	};
	if (voters.permanent[i].choice == "house") {
			countryCount[0].house++; 
	};
	if (voters.permanent[i].choice == "farm") {
			countryCount[0].farm++; 
	};


	for (var s = 1; s < arrayCountryCountLength; s++)

		// Calculating the total per country

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

// Checking which country htype wins for the map

for (var s = 0; s < arrayCountryCountLength; s++) {
	if (countryCount[s].flat > countryCount[s].house && countryCount[s].flat > countryCount[s].farm) {
		countryCount[s].htype = "flat";
	};
	if (countryCount[s].house > countryCount[s].flat && countryCount[s].house > countryCount[s].farm) {
		countryCount[s].htype = "house";
	};
	if (countryCount[s].farm > countryCount[s].flat && countryCount[s].farm > countryCount[s].house) {
		countryCount[s].htype = "farm";
	};
};

// Here I'm setting the attributes of bigpie piechart to the right value's.

document.getElementById("bigpie").setAttribute("houseval", countryCount[0].house);
document.getElementById("bigpie").setAttribute("flatval", countryCount[0].flat);
document.getElementById("bigpie").setAttribute("farmval", countryCount[0].farm);


// And here is the usual logging stuff. 

console.log(voters);
console.log(countryCount);
console.log(countryCount[0]);
