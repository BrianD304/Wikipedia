var json;
$(document).ready(function() {
  console.log("ready!");
  $("#search-button").on("click", function() {
    getJson();
    $("#search").val("");
  });
  $("#search").keypress(function(e) {
    // enter key for searchbar
    if (e.which == 13) {
      getJson();
          $("#search").val("");
      return false;
    }
  });
});
var searchQuery;
function getSearch() {
  // update searchQuery
  this.searchQuery = document.getElementById("search").value;
  // possibly replace spaces with %20 etc
}
function getJson() {
  getSearch(); //update searchQuery
  var searchTerm =
    "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" +
    this.searchQuery +
    "&format=json&callback=?";
  $.getJSON(searchTerm, function(data) {
    //retrive data
    showSearch(data); // update webpage to search results
  });
}
function showSearch(json) {
  console.log(json);
  // console.log(json.query.search[0].title);
  var i = 0;
  for (i = 1; i < 11; i++) {
    $("#title" + i).text(json.query.search[i - 1].title);
    $("#body" + i).html(json.query.search[i - 1].snippet + " ...");
    var rep = json.query.search[i-1].title;
   rep= rep.replace(" ","_");
    $("#link" + i).attr('href',"https://en.wikipedia.org/wiki/" + rep);
    document.getElementById("panel" + i).style.display = "block";
  }
}