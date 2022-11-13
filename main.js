let myArray = [];
let mySearch;


  

async function search(userInput) {
    
    console.log(userInput);
    let id = "#"+ userInput;
    let inputText = $(id).val();
    console.log(inputText);
    mySearch = inputText;

    let myObject = await fetch("https://api.jikan.moe/v4/anime?q="+ inputText +"&sfw");
    let myJson = await myObject.json();
    myArray = myJson.data;
    console.log(myJson);

    let str = " ";
   
    str += '<h2>Search Results</h2> ';

    for(let i = 0; i<myArray.length; i++) {
        str +=  '<div class="row">'
        str +=  '<div class="col1">'
        str +=  '<a href="AnimeDetails.html?id='+i+'&st='+inputText+'"><img src ='+myArray[i].images.jpg.image_url+'>'
        str +=  '<p>'+ myArray[i].title +'</p></a>'
        str +=  '</div>'
        str +=  '</div>'
        console.log(myArray[i].title);
      
      /*  str +=  '</div>'
        str +=  '<div class="col2">'
        str +=  '<img src="Images/TateNoYuusha.jpg" alt="">'
        str +=  '<p>Tate no Yuusha no Nariagari Season 2</p>'
        str +=  '</div>'
        str +=  '<div class="col3">'
        str +=  '<img src="Images/Overlord.jpg" alt="">'
        str +=  '<p>Overlord IV</p>'
        str +=  '</div>'
        str +=  '</div>'*/
    }
    $("#list").html(str);
}


async function loadRatingsPage() {
  let str = "";
  
  let myObject = await fetch("js/data.json");
  let myJson = await myObject.json();

  for(let i = 0; i<myJson.length; i++) {
    numberRanking = i + 1;
    str += '<div class="card">'
    //str += '<h3>'+ numberRanking +'</h3>'
    str += '<div class="row">'
    str += '<div class="columnLeft">'
    str += '<a href="'+ myJson[i].images.jpg.image_url +'"><img src='+ myJson[i].images.jpg.image_url +' alt=""></a>'
    str += '</div>'
    str += '<div class="columnRight">'
    str += '<h3>'+ myJson[i].title +'</h3>'
    str += '<h5>MAL Score:'+ myJson[i].rating +'</h5>'
    str += '<p>'+ myJson[i].synopsis +'</p>'
    str += '</div>'
    str += '</div>'
    str += '</div>'
  }
  $("#ratingsList").html(str);
}

async function loadUpcomingPage() {
  let str = "";
  
  let myObject = await fetch("js/data.json");
  let myJson = await myObject.json();

  for(i = 0; i < myJson.length; i++) {
    str += '<div class="row">'
    str += '<div class="col1">'
    str += '<img src="'+ myJson[i].images.jpg.image_url +'" alt="">'
    str += '<p>'+ myJson[i].title +'</p>'
    str += '</div>'
    str += '<div class="col2">'
    str += '<img src="'+ myJson[i].images.jpg.image_url +'" alt="">'
    str += '<p>'+ myJson[i].title +'</p>'
    str += '</div>'
    str += '<div class="col3">'
    str += '<img src= "'+ myJson[i].images.jpg.image_url +'" alt="">'
    str += '<p>'+ myJson[i].title +'</p>'
    str += '</div>'
    str += '</div>'
  }
  $("#upcomingList").html(str);
}

async function loadDetails() {

  let id = "1";
  let st = "pokemon";

  var url_string = window.location.href
  var url = new URL(url_string);
  id = url.searchParams.get("id");
  st = url.searchParams.get("st");
  console.log("id>>> "+id);
  console.log("st>>> "+st);

  let str = "";
  
  //let myObject = await fetch("js/data.json");
  let myObject = await fetch("https://api.jikan.moe/v4/anime?q="+ st +"&sfw");

  let myJson = await myObject.json();
  let myDetailsArray = myJson.data;

  str += '<div class="fullCard">'
  str += '<h2>'+ myDetailsArray[id].title +'</h2>'
  str += '<a href ='+ myDetailsArray[id].images.jpg.image_url +'><img src='+ myDetailsArray[id].images.jpg.image_url +' alt=""></a>'
  str += '<p>MAL Rating: '+ myDetailsArray[id].score +'</p>'
  str += '<p>Episodes: '+ myDetailsArray[id].episodes +'</p>'
  str += '<p>Status: '+ myDetailsArray[id].status +'</p>'
  str += '<p>Aired: '+ myDetailsArray[id].aired.string +'</p>'
  str += '<br>'
  str += '<p>Synopsis: '+ myDetailsArray[id].synopsis +'</p>'
  str += '</div>'

  $("#details").html(str);
}


// Load Service Worker
if (navigator.serviceWorker) {

  // Register the SW
  navigator.serviceWorker.register('sw.js').then((registration) => {

  }).catch(console.log);
}


/*async function getData() {
    let myObject = await fetch("js/data.json");
    let myJson = await myObject.json();
    console.log(myJson);

    for(let i = 0; i<myJson.length; i++) {

    }
  }*/