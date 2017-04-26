var WORDS_BASE_URL = 'https://wordsapiv1.p.mashape.com/words/';
var resultLengthArray = [];
var num = 0;
var resultsArray=[];
var resultsObject = {
};
function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: 'https://wordsapiv1.p.mashape.com/words/' + searchTerm + '',
    data: {},
    dataType: 'json',
    type: 'GET',
    success: function(data){
      callback(data, searchTerm);
    },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "5QNhUGUmVamshQCbuFO6ykRJBCqFp1nqhQgjsnNahs0JInCns7");
      }
  };

  $.ajax(settings);
}

function storeResults(data, searchTerm){
 // console.log(data, typeof data.results, data.results, data.results.length);
  var query = $(".js-query").val().split(" ");

resultLengthArray.push(data.results.length);
resultsArray.push(data.results);
resultsObject[searchTerm] = data.results;
num++;
if(num === query.length){
setTimeout(function(){  updateDivs(data);}, 2000);


}
//console.log(resultLengthArray);
}



function displayWORDSearchData(data) {
 // console.log(data.results.length);
  resultLengthArray.push(data.results.length);

  var resultElement = '';
  if (data.Search) {
    data.Search.forEach(function(item) {
     resultElement += '<p>' + item.Title + '</p>';
    });
  }
  else {
    resultElement += '<p>No results</p>';
  }
  
  $('.js-search-results').html(resultElement);
}
function updateDivs(data){

  var query = $(".js-query").val().split(" ");
  console.log(resultsObject[query[0]]);
  $('.word').append('<div class="word 1">' + query[0] + '</div>');
   for(var x=0; x<resultsObject[query[0]].length; x++){
       $('.definitions').append('<input type="checkbox" class="definitions" id="definition ' + (x+1) + 'class="word 1">' + resultsObject[query[0]][x].definition + '</input><br>');

   }
  for(var i=1; i<query.length; i++){ 
   $('.js-search-results').append('<div class="display-none" class="word' + (i+1) + '">' + query[i] + '</div>');
   for(var x=0; x<resultsArray[i].length; x++){
       $('.js-search-results').append('<div class="display-none" id="definition ' + (x+1) + 'class="word' + (i+1) + '">' + resultsArray[i][x].definition + '</div>');

   }
  }
$('.js-search-results').append('<button class="next">Next Word</button>')
$(".next").on("click", function(){
storeDefs(data);

})

}
function storeDefs(data){
  console.log(data);
}
function startApi(){

  var query = $(".js-query").val().split(" ");
    for(var i=0; i<query.length; i++){

        getDataFromApi(query[i], storeResults);
       // console.log(i);
        
      }

     // setTimeout(function(){ displayResultLengths(); }, 2000);
      $('h1, form, button').hide();
}

function watchSubmit() {
  $('.submitButton').on("click", function(e) {
    e.preventDefault();
    startApi();
    
      
    
  });
}

$(function(){watchSubmit();});
