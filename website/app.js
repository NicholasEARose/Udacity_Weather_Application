//from Udacity lesson 'Async Fetch with Web APIs Demo' with some light syntax tweaks for unique vars
//set global variables
const form = document.querySelector('.app__form'); //set up global container variable for app
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='; //URL var for API requests
const apiKey = '&appid=4d770665982bf5c91e5c5e2cca465603&units=imperial';// var for my personal api key

let date = new Date(); //JS method that spits out date and puts it in this var... more info here https://www.w3schools.com/js/js_dates.asp
let newDate = date.getMonth() + '.' + date.getDate() + '.' + date.getFullYear(); //var for month/date/year in log...more here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth

document.getElementById('generate_button').addEventListener('click', performAction); //this grabs the HTML button element/executes a function on button click defined below

//altered function from this Udacity FE lesson: 'Async Fetch with Web APIs Demo'
function performAction(event) { //takes event param and executes the getTheWeather function
  event.preventDefault(); //prevent it from submitting if cancellable/necessary for HTML forms/submits...more info https://www.w3schools.com/jsref/event_preventdefault.asp
  const newZip = document.getElementById('zip').value; //var for the input value in the text field within the form...in this case the zip... more info here https://www.w3schools.com/jsref/prop_text_value.asp
  const log = document.getElementById('feelings').value; //same as above but for the feelings/content input
  //this is from this Udacity FE lesson: 'Chaining Proimses' where then() is first introduced.
  getTheWeather(baseURL, newZip, apiKey) //fetch request
    .then(function (inputData) {//then run function using user input data
      //"Inside .then() we could call another async function to make a POST request to store this data in our app. Assuming a POST route has been setup on the server side to add data it received to the app endpoint, we could simply call the function we have been using to create POST requests on the client side and pass it the POST route url and the data we want to save to our app. The only tricky part (which can also be fun!), is that we need to use the returned data, and data that we retrieve from a DOM element to create the structure for our POST request."
      //"which can also be fun"
      postData('/add', { date: newDate, temp: inputData.main.temp, log })//postData user input data from previous Fetch using some dot notation and which was, indeed, pretty fun
    }).then(function () { //then run the thing that updates the app
      //more info here: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
      updateApp()//this updates the app in the DOM
    })
  form.reset();//reset's the HTML form element to empty post submit more info ...https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/reset
}

//from this Udacity lesson: 'Adding Fetch to Your Code'
const getTheWeather = async (baseURL, newZip, apiKey) => {
  const res = await fetch(baseURL + newZip + apiKey);
  try { //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
    const inputData = await res.json(); //convert request to json
    return inputData; //retruns user input (zip, feelings)
  } catch (error) { //throws an error if promise is rejected  more info...https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
    console.log("error", error); //log an error in the console if fethc request fails
  }
}

//from Udacity's FE lesson: 'Client Side, Server Side'
const postData = async (url = '', data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({ //converts this obejct to a JSON string more info...https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
      date: data.date, //grabbing the values/data to convert to JSON
      temp: data.temp,
      log: data.log
    })
  })
  try {
    const newData = await req.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};

//from this Udacity FE lesson: 'Updating UI elements'
//updated the elements to match form
const updateApp = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json()
    document.getElementById('date').innerHTML = allData.date; //pulling in unique element/value and injecting it into the html
    document.getElementById('temp').innerHTML = allData.temp;
    document.getElementById('log').innerHTML = allData.log;
  }
  catch (error) {
    console.log("error", error);
  }
};
