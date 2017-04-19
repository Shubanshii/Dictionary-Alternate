var WORDS_BASE_URL = 'https://wordsapiv1.p.mashape.com/words/';
var resultLengthArray = [];
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
  //console.log(data.results.length);
resultLengthArray.push(data.results.length);

}

function displayResultLengths(){
//  console.log(resultLengthArray);
  console.log(resultLengthArray);
}

function displayWORDSearchData(data) {
  console.log(data.results.length);
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
function startApi(){
  var query = $(".js-query").val().split(" ");
    for(var i=0; i<query.length; i++){

        getDataFromApi(query[i], storeResultLengths);
        console.log(i);
        if(i==query.length-1){
          displayResultLengths();
        }
      }
}

function watchSubmit() {
  $('.submitButton').on("click", function(e) {
    e.preventDefault();
    startApi();
    
      displayResultLengths();
    
  });
}

$(function(){watchSubmit();});
