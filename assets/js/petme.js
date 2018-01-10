$(document).ready(function() {
    $('select').material_select();
});

// Generate States Dropdown

var states = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ];
var stateSelector = $("#stateSelector");

for (var i = 0; i < states.length; i++){
	var newOption = $("<option>");
	newOption.attr("value", states[i]);
	newOption.append(states[i]);
	stateSelector.append(newOption);
}

// Generate Breeds Dropdown

var breedsSpecific;
var breedSelector = $("#breedSelector")

$("#animalType").on("change", function(){
	$("#breedSelector").empty();
	var animalSelected = $(this).val();
	var breedDefault = $("<option>")
	breedDefault.attr("value", "");
	breedDefault.attr("selected");
	breedDefault.attr("disabled");
	breedSelector.append(breedDefault);
	$.ajax({
		url: "https://api.petfinder.com/breed.list?key=f2d74c99d5bc5124b40b57a6aaade29e&animal=" + animalSelected + "&format=json",
		method: "GET",
		jsonp: "callback",
		dataType: "jsonp"
	}).done(function(json){
		var breeds = json.petfinder.breeds.breed
		breedsSpecific = breeds.map(function(breed){
			return breed["$t"]
		})
		console.log(breedsSpecific)
		console.log(breeds);
		for (var i = 0; i < breedsSpecific.length; i++){
			console.log(breedsSpecific[i])
			var newOption = $("<option>");
			newOption.attr("value", breedsSpecific[i]);
			newOption.append(breedsSpecific[i]);
			breedSelector.append(newOption);
		}
		breedSelector.material_select();
	})
})

// AJAX Request

var citySelection;
var stateSelection;
var animalSelection;
var breedSelection;
var genderSelection;
var ageSelection;



$("#submitSearch").on("click", function(e){
	e.preventDefault();
	$("#searchResults").empty();
	citySelection = $("#city").val();
	stateSelection = $("#stateSelector").val();
	animalSelection = $("#animalType").val();
	breedSelection = $("#breedSelector").val();
	genderSelection = $("#genderSelector").val();
	ageSelection = $("#ageSelector").val();

	if (!genderSelection){
		genderSelection = "";
	}

	if (!ageSelection){
		ageSelection = "";
	}

	var queryURL = "https://api.petfinder.com/pet.find?key=f2d74c99d5bc5124b40b57a6aaade29e&location=" + citySelection + "%20" + stateSelection + "&animal=" + animalSelection + "&breed=" + breedSelection + "&age=" + ageSelection + "&sex=" + genderSelection + "&count=20&output=full&format=json"

	// if (breedSelection === ""){
	// 	queryURL = "https://api.petfinder.com/pet.find?key=f2d74c99d5bc5124b40b57a6aaade29e&location=" + citySelection + "%20" + stateSelection + "&animal=" + animalSelection + "&count=20&output=full&format=json"
	// } else {
	// 	queryURL = "https://api.petfinder.com/pet.find?key=f2d74c99d5bc5124b40b57a6aaade29e&location=" + citySelection + "%20" + stateSelection + "&animal=" + animalSelection + "&breed=" + breedSelection + "&age=" + ageSelection + "&sex=" + genderSelection + "&count=20&output=full&format=json"
	// }
	var settings = {
		url: queryURL,
		method: "GET",
		jsonp: "callback",
		dataType: "jsonp"
	}
	console.log(queryURL);

	$.ajax(settings)
	.done(function(json){
		console.log(JSON.stringify(json))
		var results = json.petfinder.pets.pet;
		console.log(json)
		for (var i = 0; i < results.length; i++){
			var photos = results[i].media.photos.photo[2].$t;
			var newCard = $("<div>");
			$("#searchResults").append(newCard);
			newCard.addClass("col x13 m12");
			newCard.css("width", "25%")
			newCard.css("max-height", "420px")
			var cardDiv = $("<div>");
			cardDiv.addClass("card");
			newCard.append(cardDiv);
			var imgDiv = $("<div>");
			imgDiv.addClass("card-image");
			cardDiv.append(imgDiv);
			var cardImg = $("<img>");
			cardImg.attr("height", 250);
			cardImg.attr("src", photos);
			var pawImg = $("<img class='moveRight' src='./assets/images/PawPrintOutline.png' style='height: 32px; width: auto; position: absolute; top: 0; z-index: 10' />");
			var cardTitle = $("<span>")
			cardTitle.addClass("card-title");
			cardTitle.text(results[i].name.$t);
			cardTitle.css("color", "white");
			cardTitle.css("position", "absolute");
			cardTitle.css("top", 0);
			cardDiv.append(cardTitle);
			imgDiv.append(cardImg);
			imgDiv.append(pawImg);
			var cardContent = $("<div>");
			cardContent.addClass("card-content");
			cardDiv.append(cardContent);
			var gender = $("<p>");
			if (results[i].sex.$t === "M"){
				gender.html("<strong>Gender:</strong> Male");
			} else {
				gender.html("<strong>Gender:</strong> Female");
			}
			var age = $("<p>");
			age.html("<strong>Age:</strong> " + results[i].age.$t);
			var breed = $("<p>");
			if (results[i].breeds.breed.length > 1){
				breed.html("<strong>Breed:</strong> " + results[i].breeds.breed[0].$t + "/" + results[i].breeds.breed[1].$t);
			} else {
				breed.html("<strong>Breed:</strong> " + results[i].breeds.breed.$t);
			}
			cardContent.append(gender);
			cardContent.append(age);
			cardContent.append(breed);
			var cardAction = $("<div>");
			cardAction.addClass("card-action");
			cardDiv.append(cardAction);
			var cardLink = $("<a>");
			cardLink.attr("href", "#");
			cardAction.append(cardLink);
		}
	})
})
