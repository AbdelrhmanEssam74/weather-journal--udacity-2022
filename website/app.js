/* Global Variables */
//my API Key from OpenWeatherMap API
const myKey = "e4a94c0e2352d3cbb2a669b3af0ba9c3";
const generateButton = document.querySelector("#generate");
const zipCodeInput = document.querySelector("#zip");
const feelingInput = document.querySelector("#feelings");
const date = document.querySelector("#date");
const city = document.querySelector("#city");
const temp = document.querySelector("#temp");
const content = document.querySelector("#content");
const entry = document.querySelector(".entry");
const img = document.querySelector("img");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
//function to get the data
//and update the UI

const getTheData = async (zipValue, feelingsValue) => {
  try {
    //  URL to retrieve weather information (USA)
    const mainUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipValue},&appid=${myKey}&units=metric`;
    const response = await fetch(mainUrl);
    const data = await response.json();

    if (data.main == undefined) {
      alert(`data undefined\nplease enter correct code`);
    }
    const temperature = data.main.temp;
    const cityName = data.name;
    updateUI(temperature, cityName, feelingsValue);
    return temperature;
  } catch (error) {
    //if i have an error it will be shown in the console
    console.log(`Error:${error}`);
  }
};
const updateUI = async (temperature, cityName, feelings) => {
  const respose = await fetch("/getALLDate");
  const result = await respose.json();
  console.log(result);
  date.innerText = `Date:${newDate}`;
  temp.innerText = `temperature:${temperature}C`;
  content.innerText = `Your Feeling:${feelings}`;
  city.innerHTML = `City Name:${cityName}`;
};

//function to post the data
async function postTheData(temp, feelingsValue) {
  /*  const postRequest = */ await fetch("/addALLData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date: newDate,
      temp: temp,
      feelings: feelingsValue,
    }),
  });
}
// add Event listener to the generate Button
generateButton.addEventListener("click", async () => {
  //get zipCode && feeling value and save them in a varialbe
  const zipValue = zipCodeInput.value;
  const feelingsValue = feelingInput.value;
  try {
    img.style.transform = "rotate(270deg)";
    img.style.opacity = 1;
    entry.style.opacity = 1;
    //Call function getTheData
    const temp = await getTheData(zipValue, feelingsValue);
    //Call function postTheData
    await postTheData(temp, feelingsValue);
    //if i have an error it will be shown in the console
  } catch (Error) {
    console.log(Error);
  }
});
