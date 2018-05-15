// Level 1: Automatic Table and Date Search
// Create a basic HTML web page.
// Using the ufo dataset provided in the form of a JavaScript object, write code that appends a table to your web page and then adds new rows of data for each UFO sighting.
// Make sure you have a column for date/time, city, state, country, shape, and comment at the very least.
// Add an input tag to your HTML document and write JavaScript code that will search through the date/time column to find rows that match user input.

// Set filteredAddresses to addressData initially
var filteredUFOdata = dataSet;

var searchResultCount = 50; //allow to show 50 search results per page
var currentPage = 1;


// Get references to the tbody element, input field and button
var $tbody = document.querySelector("tbody");
var $userInput = document.querySelector("#userinput");
var $searchBtn = document.querySelector("#search");
var $searchTypeDropDwn = document.querySelector("#dropdownMenu1");
var $selection = document.querySelector("#selection");
var selectType = "dd/mm/yyyy" //initial default is datetime

// get list of valid inputs
var validCities = dataSet.map(x=>x.city);
var validCountries = dataSet.map(x=>x.country)
var validStates = dataSet.map(x=>x.state)
var validShapes = dataSet.map(x=>x.shape)

//get pagination buttons
var lastPage = Math.ceil(filteredUFOdata.length / searchResultCount);
var $pagenext = d3.select("#next");
var $page1 = d3.select("#page1");
var $page2 = d3.select("#page2");
var $page3 = d3.select("#page3");
var $page4 = d3.select("#page4");
var $page5 = d3.select("#page5");
var $pageprev = d3.select("#prev");
var $pagecurrent = d3.select("#pagec");


// Add an event listener to the searchButton, searchType call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);



//Add events to pagination buttons
$pagenext.on("click",function(){
  // Reset table content and highlighted pagination buttons to new page
  currentPage = currentPage +1;
  $active = d3.select(".active");
  $active.attr("class","inactive");
  $pagecurrent.text("");

  switch(currentPage) {
    case(1):
      $page1.attr("class","active");  
    break;
    case(2):
      $page2.attr("class","active");
    break;
    case(3):
      $page3.attr("class","active");
    break;
    case(4):
      $page4.attr("class","active");
    break;
    case(5):
      $page5.attr("class","active");
    break;
    default:
      console.log("setting page larger than 5");
      $pagecurrent.attr("class","active");
      $pagecurrent.text(currentPage);      
  }

  console.log("current page", currentPage);
  console.log("last page ",lastPage);
  if (currentPage == lastPage){
    console.log("disable next page");
    $pagenext.attr("class","disabled");  
  } else {
    console.log("re-enable next page");
    $pagenext.attr("class","enabled");  
  }

  //re-enable previous page
  $pageprev.attr("class","enabled");

  renderTable();
  console.log("current page ", currentPage, " last page ", lastPage);


});

$page1.on("click",function(){
  currentPage = 1;
  $active = d3.select(".active");
  $active.attr("class","inactive");
  $page1.attr("class","active");
  $pageprev.attr("class","disabled");
  $pagecurrent.text("");

  renderTable();
  console.log("current page ", currentPage, " last page ", lastPage);
});

$page2.on("click",function(){
  currentPage = 2;
  $active = d3.select(".active");
  $active.attr("class","inactive");
  $page2.attr("class","active");
  $pageprev.attr("class","enabled");
  $pagecurrent.text("");

  renderTable();
  console.log("current page ", currentPage, " last page ", lastPage);

});

$page3.on("click",function(){
  currentPage = 3;
  $active = d3.select(".active");
  $active.attr("class","inactive");
  $page3.attr("class","active");
  $pageprev.attr("class","enabled");
  $pagecurrent.text("");

  renderTable();
  console.log("current page ", currentPage, " last page ", lastPage);

});

$page4.on("click",function(){
  currentPage = 4;
  $active = d3.select(".active");
  $active.attr("class","inactive");
  $page4.attr("class","active");
  $pageprev.attr("class","enabled");
  $pagecurrent.text("");

  renderTable();
  console.log("current page ", currentPage, " last page ", lastPage);

});

$page5.on("click",function(){
  currentPage = 5;
  $active = d3.select(".active");
  $active.attr("class","inactive");
  $page5.attr("class","active");
  $pageprev.attr("class","enabled");
  $pagecurrent.text("");

  renderTable();
  console.log("current page ", currentPage, " last page ", lastPage);

});

$pageprev.on("click",function(){

  if (currentPage==1){
    return;
  }
  currentPage = currentPage -1;
  $active = d3.select(".active");
  $active.attr("class","inactive");
  $pagecurrent.text("");

  switch(currentPage) {
    case(1):
      $page1.attr("class","active");  
      $pageprev.attr("class","disabled")
    break;
    case(2):
      $page2.attr("class","active");
    break;
    case(3):
      $page3.attr("class","active");
    break;
    case(4):
      $page4.attr("class","active");
    break;
    case(5):
      $page5.attr("class","active");
    break;
    default:
      $pagecurrent.attr("class","active");
      $pagecurrent.text(currentPage);
  }


  renderTable();
  console.log("current page ", currentPage, " last page ", lastPage);

});


d3.selectAll(".dropdown-item").on("click", function handleSearchTypeSelect() {

    //console.log(this)
    var mylinkAnchor = d3.select(this);

    // ReSet filteredAddresses to addressData
    var filteredUFOdata = dataSet;
    // // Capture the child element's href attribute

    console.log("set the selection");
    selectType = mylinkAnchor.attr("id");
    if (selectType == "dd/mm/yyyy"){
      $selection.text = "Date/Time";
    } else if (selectType == "Enter City"){
      $selection.text ="City";
    } else if (selectType == "Enter State") {
      $selection.text = "State";
    } else if (selectType == "Enter Shape"){
      $selection.text = "Shape";
    } else if (selectType == "Enter Country"){
      $selection.text = "Country";
    }

    console.log("mylinkAnchorAttribute: " + selectType);
    var inputtext = d3.select($userInput)

    console.log("set the placeholder");
    inputtext.attr("placeholder",selectType)
    inputtext.value='';
    
});


// renderTable renders the filteredUFOData to the tbody
function renderTable() {
  $tbody.innerHTML = "";

  var start_i = (currentPage-1) * searchResultCount;
  if (currentPage * searchResultCount < filteredUFOdata.length)
  {
    var stop_i = currentPage * searchResultCount;
  }
  else
  {
    var stop_i = filteredUFOdata.length;
  }

  console.log("start at ", start_i);
  console.log("stop at ", stop_i); 
  console.log("last page for current search ",lastPage);

  for (var i = start_i; i < stop_i; i++) {
      console.log('i:', i);
      var ufodata = filteredUFOdata[i];
      var fields = Object.keys(ufodata);
      // re-establish index to start from 0 for insertRow
      var insert_i = i-((currentPage-1)*searchResultCount);
      // Create a new row in the tbody, set the index to be i + startingIndex
      var $row = $tbody.insertRow(insert_i);
      for (var j = 0; j < fields.length; j++) {
        // For every field in the address object, create a new cell at set its inner text to be the current value at the current address's field
        var field = fields[j];
        var $cell = $row.insertCell(j);
        $cell.innerText = ufodata[field];
      }
    }
}

// Utility function to validate user input
function validate(inputText)
{
  if (selectType == "dd/mm/yyyy"){
    var dateformat = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    // Match the date format through regular expression
    if(inputText.value.match(dateformat))
    {
      console.log("valid date "+inputText.value);
      var parsedate = inputText.value.split('/');
      var dd  = parseInt(parsedate[0]);
      var mm = parseInt(parsedate[1]);
      var yyyy = parseInt(parsedate[2]);
      
      // Create list of days of a month
      var DaysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
      if (mm==1 || mm>2){
        if (dd>DaysInMonth[mm-1]){
         alert('Invalid date format!');
         return false;}}
      if (mm==2){
        // Check for leap year
        var leapyear = false;
        if ( (!(yyyy % 4) && yyyy % 100) || !(yyyy % 400)) {
          leapyear = true;}
        if ((leapyear==false) && (dd>=29)){
          alert('Invalid date format!');
          return false;}
        if ((leapyear==true) && (dd>29)){
          alert('Invalid date format!');
          return false;}}}
    else{
      alert("Invalid date format!");
      return false;}}
  else { // select type is a name (country, state, city or shape)
    var inputValue = inputText.value.trim().toLowerCase();
    if (selectType == "Enter State") {
      return(validStates.find(function(element){return element===inputValue;}))  } 
    if (selectType == "Enter Country") {
      return(validCountries.find(function(element){return element===inputValue;})) }
    else if (selectType == "Enter City"){
      return(validCities.find(function(element){return element===inputValue;})) } 
    else if (selectType == "Enter Shape"){
      return(validShapes.find(function(element){return element===inputValue;})) } 
  }
  inputText.value = dd+"/"+mm+"/"+yyyy;
  return true;
}





function handleSearchButtonClick() {
    isvalid = validate($userInput);
    console.log(isvalid);
   
    if (isvalid){  
      console.log("user input is valid")
      // Set filteredUFOdata to an array of all matching selected criteria
      filteredUFOdata = dataSet.filter(function(ufodata) {
        if (selectType == "dd/mm/yyyy"){
          var filterName = $userInput.value;
          var nameValue = ufodata.datetime;
          console.log(filterName);
          console.log(nameValue);
        }
        else {
          var filterName = $userInput.value.trim().toLowerCase();
        
          if (selectType == "Enter City"){
            var nameValue = ufodata.city.toLowerCase();
          }
          else if (selectType == "Enter State"){
            var nameValue = ufodata.state.toLowerCase();
          }
          else if (selectType == "Enter Country"){
            var nameValue = ufodata.country.toLowerCase();
          }
          else if (selectType == "Enter Shape") {
            var nameValue = ufodata.shape.toLowerCase();
          }
        }
      // If true, add the address to the filteredAddresses, otherwise don't add it to filteredAddresses
      return nameValue === filterName;
      });
  
      //update last page
      lastPage = Math.ceil(filteredUFOdata.length / searchResultCount);  
      // reset first page is default displayed
      currentPage = 1; 
      renderTable();
  
      $userInput.value='';
      $userInput.style.color="black";

      // pagination feedback
      console.log("feedback pagination");
      console.log("current ",currentPage);
      console.log("last ",lastPage);
        
      $active = d3.select(".active");
      $active.attr("class","inactive");
      $page1.attr("class","active");  
      $pageprev.attr("class","disabled"); // always display page 1 deacivate previous button
         
      switch(lastPage) {
          case(1):
            $pagenext.attr("class","disabled");
            $page2.attr("class","hidden");
            $page3.attr("class","hidden");
            $page4.attr("class","hidden");
            $page5.attr("class","hidden");
          break;
          case(2):
            
            $page2.attr("class","enabled");
            $page3.attr("class","hidden");
            $page4.attr("class","hidden");
            $page5.attr("class","hidden");
          break;
          case(3):
            
            $page2.attr("class","enabled");
            $page3.attr("class","enabled");
            $page4.attr("class","hidden");
            $page5.attr("class","hidden");
          break;
          case(4):
            
            $page2.attr("class","enabled");
            $page3.attr("class","enabled");
            $page4.attr("class","enabled");
            $page5.attr("class","hidden");
          break;
          case(5):
          default:
            
            $page2.attr("class","enabled");
            $page3.attr("class","enabled");
            $page4.attr("class","enabled");
            $page5.attr("class","enabled");
      } 
    }
    else {
      $userInput.value = $userInput.value + " NOT VALID"
      $userInput.style.color="red";
      console.log("user input not valid");
    }
  
  $userInput.focus(); 
  
} 


// Render the table for the first time on page load
renderTable();
