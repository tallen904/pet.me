$(document).ready(function() {
    $('select').material_select();
});


// Generate States Dropdown

var states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
var stateSelector = $("#stateSelector");

for (var i = 0; i < states.length; i++){
	var newOption = $("<option>");
	newOption.attr("value", states[i])
	newOption.append(states[i]);
	stateSelector.append(newOption);
}

// AJAX Request

var citySelection;
var stateSelection;
var animalSelection;



$("#submitSearch").on("click", function(e){
	e.preventDefault();
	citySelection = $("#city").val();
	stateSelection = $("#stateSelector").val();
	animalSelection = $("#animalType").val();

	var queryURL = "http://api.petfinder.com/pet.find?key=f2d74c99d5bc5124b40b57a6aaade29e&location=" + citySelection + "%20" + stateSelection + "&animal=" + animalSelection + "&count=100&output=full&format=json"
	var settings = {
		url: queryURL,
		method: "GET",
		jsonp: "callback",
		dataType: "jsonp"
	}
	console.log(queryURL);

	$.ajax(settings)
	.done(function(json){
		console.log(json);
	})
})

