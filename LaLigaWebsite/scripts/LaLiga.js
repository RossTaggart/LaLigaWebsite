//main search method - garners what search type is
//being executed and calls the appropriate function
function search(searchType, searchText)
{	
	switch (searchType){
		case "City":
			searchCity(searchText);
			break;
		case "Region":
			searchRegion(searchText);
			break;
		case "Team":
			searchTeam(searchText);
			break;
		default:
		
	}
}

//function that searches for a city based on
//the searched text
function searchCity(searchText)
{
	console.log("search city");
	console.log(searchText);
	
	var src = "cities.php";
	var output= "";
	var cityName = "";
	var lat = "";
	var lng = "";
	var tourismLink = "";
	var images = [];
	
	$.get(src, function(data){
		
		var json = $.parseJSON(data);
		
		for (var i in json.cities)
		{
			//checks to see if the searched text exists in the returned data
			//allows for part of the name of a city to give the correct
			//search results
			if (json.cities[i].city_name.includes(searchText))
			{
				console.log("TRUE");
				cityName = json.cities[i].city_name;
				lat = json.cities[i].lat;
				lng = json.cities[i].long;
				tourismLink = json.cities[i].tourism;
				for (var j in json.cities[i].images)
				{
					images.push(json.cities[i].images[j].url);
				}
			}
			else {
				alert('Incorrect Search data entered. Please try again.');
			}
		}
	})
	
	
	
	output += "<br><img src='./images/" + images[0] + "' style='width:300px;height:200px;'/>";
	output += "<img src='./images/" + images[1] + "' style='width:300px;height:200x;'/>";
	output += "<img src='./images/" + images[2] + "' style='width:300px;height:200x;'/>";
	output += "<br>Name:" + cityName;
	output += "<br>Lat: " + lat;
	output += "<br>Long: " + lng;
	output += "<br>Tourism Information: <a href='http://www." + tourismLink + "' target='_blank' >" + tourismLink + "</a>";
	output += "<img src='./images/flickr.png' style='width:200px; height:75px;' />"
	output += "<div id='flickr' style='display:none'></div>";
	
	document.getElementById("citySearch").innerHTML = output;
	document.getElementById("citySearch").style.display = 'block';
	document.getElementById("map").style.display = 'none';
	document.getElementById("teamSearch").style.display = 'none';
	document.getElementById("regionSearch").style.display = 'none';
	
	var url = "http://api.flickr.com/services/feeds/photos_public.gne?tags=" + cityName + "&format=json&jsoncallback=?";
	$.getJSON(url, function(data) {
		$.each(data.items, function(i,item){
			$("<img/>").attr("src", item.media.m).appendTo(document.getElementById('flickr')).height(100).width(100);
			return (i == 20) ? false : null;
			});
	});
}

//function that searches for a region based on
//the searched text
function searchRegion(searchText)
{
	console.log("search region");
	console.log(searchText);
	
	var src = "regions.php";
	var output= "";
	var regionName = "";
	var lat = "";
	var lng = "";
	var flag = "";
	var location = "";
	var images = [];
	
	$.get(src, function(data){
		
		var json = $.parseJSON(data);
		
		for (var i in json.regions)
		{
			//checks to see if the searched text exists in the returned data
			//allows for part of the name of a city to give the correct
			//search results
			if (json.regions[i].region_name.includes(searchText))
			{
				console.log("TRUE");
				regionName = json.regions[i].region_name;
				lat = json.regions[i].lat;
				lng = json.regions[i].long;
				flag = json.regions[i].flag;
				location = json.regions[i].location;
				
				for (var j in json.regions[i].images)
				{
					images.push(json.regions[i].images[j].url);
				}
				
			}
			else {
				alert('Incorrect Search data entered. Please try again.');
			}
		}
	})
	
	output += "<br><img src='./images/" + images[0] + "' style='width:300px;height:200px;'/>";
	output += "<img src='./images/" + images[1] + "' style='width:300px;height:200x;'/>";
	output += "<img src='./images/" + images[2] + "' style='width:300px;height:200x;'/>";
	output += "<br>Region Name: " + regionName;
	output += "<br>Lat: " + lat;
	output += "<br>Long: " + lng;
	output += "<br>Flag: <img src='./images/" + flag + "' style='width:300px;height:200x;'/>";
	output += "<br>Location : <img src='./images/" + location + "' style='width:300px;height:200x;'/>";
	output += "<img src='./images/flickr.png' style='width:200px; height:75px;' />"
	output += "<div id='flickr' style='display:none'></div>";
	
	document.getElementById("regionSearch").innerHTML = output;
	document.getElementById("regionSearch").style.display = 'block';
	document.getElementById("map").style.display = 'none';
	document.getElementById("citySearch").style.display = 'none';
	document.getElementById("teamSearch").style.display = 'none';
	
	var url = "http://api.flickr.com/services/feeds/photos_public.gne?tags=" + regionName + "&format=json&jsoncallback=?";
	$.getJSON(url, function(data) {
		$.each(data.items, function(i,item){
			$("<img/>").attr("src", item.media.m).appendTo(document.getElementById('flickr')).height(100).width(100);
			return (i == 20) ? false : null;
			});
	});
}

//function that searches for a team based on
//the searched text
function searchTeam(searchText)
{
	console.log("search team");
	console.log(searchText);
	
	var src = "teams.php";
	var output= "";
	var teamName = "";
	var stadiumName = "";
	var badge = "";
	var strips = "";
	var images = [];
	var youtube = "";
	
	$.get(src, function(data){
		
		var json = $.parseJSON(data);
		
		for (var i in json.teams)
		{
			//checks to see if the searched text exists in the returned data
			//allows for part of the name of a city to give the correct
			//search results
			if (json.teams[i].team_name.includes(searchText))
			{
				console.log("TRUE");
				teamName = json.teams[i].team_name;
				stadiumName = json.teams[i].stadium;
				badge = json.teams[i].badge;
				strips = json.teams[i].strips;
				youtube = json.teams[i].YouTube;
				for (var j in json.teams[i].images)
				{
					images.push(json.teams[i].images[j].url);
				}
			}
			else {
				alert('Incorrect Search data entered. Please try again.');
			}
		}
	})
	
	var fullYouTubeLink = linkToYTVid(youtube);
	
	output += "<br><img src='./images/" + images[0] + "' style='width:500px;height:400px;'/>";
	output += "<img src='./images/" + images[1] + "' style='width:500px;height:400x;'/>";
	output += "<br><h1>" + teamName+ "</h1>";
	output += "<p>Stadium name: " + stadiumName + "</p>";
	output += "<br>Badge: <img src='./images/" + badge + "' style='width:200px;height:200px;'/>";
	output += "<br>Strips: <img src='./images/" + strips + "' style='width:400px;height:200px;'/>";
	output += "<br><a href='" + fullYouTubeLink + "' target='_blank'><img src='./images/YouTube.jpg' style='width:200px; height:75px;'> </a>";
	output += "<img src='./images/flickr.png' style='width:200px; height:75px;' />"
	output += "<div id='flickr' style='display:none'></div>";
	
	document.getElementById("teamSearch").innerHTML = output;
	document.getElementById("teamSearch").style.display = 'block';
	document.getElementById("map").style.display = 'none';
	document.getElementById("citySearch").style.display = 'none';
	document.getElementById("regionSearch").style.display = 'none';
	
	var url = "http://api.flickr.com/services/feeds/photos_public.gne?tags=" + teamName + "&format=json&jsoncallback=?";
	$.getJSON(url, function(data) {
		$.each(data.items, function(i,item){
			$("<img/>").attr("src", item.media.m).appendTo(document.getElementById('flickr')).height(100).width(100);
			return (i == 20) ? false : null;
			});
	});
}

//constructs the YouTube link
function linkToYTVid(youtube)
{
	console.log("LINK TO YOUTUBE VIDEO");
	
	return "http://www.youtube.com/watch?v=" + youtube;
	
}

//function that activates when the Home button is pressed
//hides and show the relevant divs
function showHome()
{
	document.getElementById("map").style.display = 'block';
	document.getElementById("teamsPage").style.display = 'none';
	document.getElementById("tablePage").style.display = 'none';
	document.getElementById("teamSearch").style.display = 'none';
	document.getElementById("teamSearch").innerHTML = "";
	document.getElementById("regionSearch").style.display = 'none';
	document.getElementById("regionSearch").innerHTML = "";
	document.getElementById("citySearch").style.display = 'none';
	document.getElementById("citySearch").innerHTML = "";
}

//function that activates when the Teams button is pressed
//hides and show the relevant divs
function showTeams()
{
	document.getElementById("map").style.display = 'none';
	document.getElementById("teamsPage").style.display = 'block';
	document.getElementById("tablePage").style.display = 'none';
	document.getElementById("teamSearch").style.display = 'block';
	document.getElementById("regionSearch").style.display = 'none';
	document.getElementById("regionSearch").innerHTML = "";
	document.getElementById("citySearch").style.display = 'none';
	document.getElementById("citySearch").innerHTML = "";
}

//function that activates when the Scores/Table button is pressed
//hides and show the relevant divs
function showTable()
{
	document.getElementById("map").style.display = "none";
	document.getElementById("teamsPage").style.display = 'none';
	document.getElementById("tablePage").style.display = 'block';
	document.getElementById("teamSearch").style.display = 'none';
	document.getElementById("teamSearch").innerHTML = "";
	document.getElementById("regionSearch").style.display = 'none';
	document.getElementById("regionSearch").innerHTML = "";
	document.getElementById("citySearch").style.display = 'none';
	document.getElementById("citySearch").innerHTML = "";
}

//function that searches for a team based on the city ID
//used in conjunction with creating the Info Window
function searchTeamsByCityID(cityID)
{
	var src = "teams.php";
	var teams = [];
	
	//$.ajaxSetup({async:false});
	$.get(src, function(data, status){
		var json = $.parseJSON(data);
		for (var i in json.teams)
		{
			if (json.teams[i].city_id == cityID)
			{
				teams.push(json.teams[i].team_name);
			}
		}
	})
	
	return teams;
}

//function creates the Info Window for the Google Maps
function createInfoWindowContent(markLat, markLong)
{
	var src = "cities.php";
	var output = "";
	var city = "";
	var imageDesc = [];
	var imageLinks = [];
	var cityID = "";
	var regionID = "";
	var regionName = "";
	
	$.ajaxSetup({async:false});
	$.get(src, function(data, status){
		var json = $.parseJSON(data);
		
		for (var i in json.cities)
		{
			if (json.cities[i].lat == markLat || json.cities[i].long == markLong)
			{
				city = json.cities[i].city_name;
				cityID = json.cities[i].city_id;
				regionID = json.cities[i].region_id;
				
				for (var j in json.cities[i].images)
				{
					imageDesc.push(json.cities[i].images[j].description);
					imageLinks.push(json.cities[i].images[j].url);
				}
			}
		}
	})
	
	var src2 = "regions.php";
	
	$.get(src2, function(data, status){
		var json2 = $.parseJSON(data);
		
		for (var i in json2.regions)
		{
			if (json2.regions[i].region_id == regionID)
			{
				regionName = json2.regions[i].region_name;
				
			}
		}
	})
	
	output += "<h2> " + city + " </h2>";
	output += "<p>This city belongs to the " + regionName + " region of Spain. ";
	output += "<br><img src='./images/" + imageLinks[0] + "' style='width:200px;height:200px;'/>";
	output += "<br>" + imageDesc[0] + "";
	output += "<br> Teams that play in this city are: <br>";
	var teamsInCity = searchTeamsByCityID(cityID);
	for (var i in teamsInCity)
	{
		output += teamsInCity[i] + "<br>";
	}
	
	return output;
}

//function to grab all of the markers to show on-screen
//queries cities.php
function getMarkersMap()
{
	var lats = [];
	var longs = [];
	var colours = [];
	
	var src = "cities.php";
	
	$.ajaxSetup({async:false});
	$.get(src, function(data, status){
		var json = $.parseJSON(data);
		var output= "";
		for (var i in json.cities)
		{
			var lt = json.cities[i].lat;
			lats.push(lt);
			var lg = json.cities[i].long;
			longs.push(lg);
			
			var regionID = json.cities[i].region_id;
			
			switch (regionID){
				case '1':
					colours.push('0058FC');
					break;
				case '2':
					colours.push('B5B7BA');
					break;
				case '3':
					colours.push('FF0000');
					break;
				case '4':
					colours.push('EAFF00');
					break;
				case '5':
					colours.push('009900');
					break;
				case '6':
					colours.push('8C00FF');
					break;
				case '7':
					colours.push('FF8800');
					break;
				case '8':
					colours.push('000000');
					break;
				default:
			}
		}
	})
	
	return [lats, longs, colours];

	
}

//function that loads all of the regions 
function loadRegions()
{
	console.log("loadRegions");
	
	var src = "regions.php";
	var output= "";
	var regionNames = [];
	
	$.get(src, function(data){
		
		var json = $.parseJSON(data);
		
		for (var i in json.regions)
		{
			regionNames.push(json.regions[i].region_name);
		}
	})
	
	output += "<a href='javascript:void(0)' class='closebtn' onclick='closeNav()'>&times;</a>"
	for (var i in regionNames)
	{
		output += '<a href="#" onclick="javascript:searchRegion(\'' + regionNames[i] + '\')">' + regionNames[i] + '</a>';
	}
	
	document.getElementById("mySidenav").innerHTML = output;
}

//function that loads all of the cities
function loadCities()
{
	console.log("loadcities");
	
	var src = "cities.php";
	var output= "";
	var cityNames = [];
	
	$.get(src, function(data){
		
		var json = $.parseJSON(data);
		
		for (var i in json.cities)
		{
			cityNames.push(json.cities[i].city_name);
		}
	})
	
	output += "<a href='javascript:void(0)' class='closebtn' onclick='closeNav()'>&times;</a>"
	for (var i in cityNames)
	{
		output += '<a href="#" onclick="javascript:searchCity(\'' + cityNames[i] + '\')">' + cityNames[i] + '</a>';
	}
	
	document.getElementById("mySidenav").innerHTML = output;
}

//function that loads all of the teams
function loadTeams()
{
	console.log("loadTeams");
	
	var src = "teams.php";
	var output= "";
	var teamNames = [];
	
	$.get(src, function(data){
		
		var json = $.parseJSON(data);
		
		for (var i in json.teams)
		{
			teamNames.push(json.teams[i].team_name);
		}
	})
	
	output += "<a href='javascript:void(0)' class='closebtn' onclick='closeNav()'>&times;</a>"
	for (var i in teamNames)
	{
		output += '<a href="#" onclick="javascript:searchTeam(\'' + teamNames[i] + '\')">' + teamNames[i] + '</a>';
	}
	
	document.getElementById("mySidenav").innerHTML = output;
}

/* Set the width of the side navigation to 250px */
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
	loadDefaultMenu();
}

//function that loads the default sidebar menu
function loadDefaultMenu()
{
	var output = "";
	
	output += "<a href='javascript:void(0)' class='closebtn' onclick='closeNav()'>&times;</a>"
	output += "<a href='#' onclick='javascript:loadRegions()'>Region</a>"
	output += "<a href='#' onclick='javascript:loadCities()'>City</a>"
	output += "<a href='#' onclick='javascript:loadTeams()'>Team</a>"
	
	document.getElementById("mySidenav").innerHTML = output;
}