var WORDS_BASE_URL = 'https://wordsapiv1.p.mashape.com/words/';
var resultLengthArray = [];
var num = 0;
var resultsArray=[];
function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: 'https://wordsapiv1.p.mashape.com/words/' + searchTerm + '',
    data: {},
    dataType: 'json',
    type: 'GET',
    success: callback,
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "5QNhUGUmVamshQCbuFO6ykRJBCqFp1nqhQgjsnNahs0JInCns7");
      }
  };

  $.ajax(settings);
}

function storeResultLengths(data){
 // console.log(data, typeof data.results, data.results, data.results.length);
  var query = $(".js-query").val().split(" ");

resultLengthArray.push(data.results.length);
resultsArray.push(data.results);
num++;
if(num === query.length){

  updateDivs(data);

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
  $('.js-search-results').append('<div class="word 1">' + query[0] + '</div>');
   for(var x=0; x<resultsArray[0].length; x++){
       $('.js-search-results').append('<div id="definition ' + (x+1) + 'class="word 1">' + resultsArray[0][x].definition + '</div>');

   }
  for(var i=1; i<query.length; i++){ 
   $('.js-search-results').append('<div class="display-none" class="word' + (i+1) + '">' + query[i] + '</div>');
   for(var x=0; x<resultsArray[i].length; x++){
       $('.js-search-results').append('<div class="display-none" id="definition ' + (x+1) + 'class="word' + (i+1) + '">' + resultsArray[i][x].definition + '</div>');

   }
  }

}
function startApi(){

  var query = $(".js-query").val().split(" ");
    for(var i=0; i<query.length; i++){

        getDataFromApi(query[i], storeResultLengths);
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
