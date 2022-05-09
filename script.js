
// DATE ---------------------
function getTime() {
    let now = new Date();
    let day = now.getDate();
    let month = now.getMonth()+1; //Java script ayları 0 dan başlattığı için
    let year = now.getFullYear();

    document.getElementById("date").innerText = day + "." + month + "." + year;
}

getTime();


// -----------------------------

const urlLonLat = 'https://api.openweathermap.org/geo/1.0/';
const key = '11c7edc4dcfb887b682fc14b7deeb62a';
const url = 'https://api.openweathermap.org/data/2.5/';

const weatherApi = (e) => {
    if(e.keyCode == "13")
        getResult(searchBar.value)
}

const getResult = (cityName) => {
    let lonlat =   `${urlLonLat}direct?q=${cityName}&limit=5&appid=${key}`;
    fetch (lonlat)
        .then(response => {
            return response.json()
        })
        .then(displayLonLat)
}

const displayLonLat = (result) =>{
    let lon = result[0].lon;
    let lat = result[0].lat ;

    let weather = `${url}weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric&lang=tr`
    fetch (weather)
        .then(response => {
            return response.json()
        })
        .then(displayResult)
    
}

const displayResult = (result) =>{
    console.log(result)
    let city = document.querySelector("#city");
    city.innerText = `${result.name} , ${result.sys.country}`;

    let temp = document.querySelector(".degreeValue");
    temp.innerText = `${result.main.temp}°C`;

    let humidity = document.querySelector("#humidity");
    humidity.innerText =`${result.main.humidity} %`;

    let wind = document.querySelector("#wind");
    wind.innerText = `${result.wind.speed} km/h`;

    let visibility = document.querySelector("#visibility");
    visibility.innerText = `${result.visibility} km`;

    let descr = document.querySelector("#weatherDesc");
    descr.innerText = `${result.weather[0].description}`;  

    let descrimg = document.getElementById("weatherDesc").innerText;
    
    console.log(descrimg)
    if (descrimg.includes("bulutlu")) {

        let temptimg = "";
        let img = document.getElementById("imgid");
        temptimg += '<i class="fa-solid fa-cloud"></i>'
        img.innerHTML = temptimg;
    }   
    else if (descrimg == "parçalı bulutlu") {
        let temptimg = "";
        let img = document.getElementById("imgid");
        temptimg += '<i class="fa-solid fa-cloud-bolt"></i>'
        img.innerHTML = temptimg;
    }
    else if (descrimg == "açık" || descrimg.includes("güneş")) {
        let temptimg = "";
        let img = document.getElementById("imgid");
        temptimg += '<i class="fa-solid fa-sun"></i>'
        img.innerHTML = temptimg;
        
    }
    // else if (descrimg == "yağmur" || descrimg == "az yağmur" || descrimg =="hafif yağmur"
    // || descrimg == "şiddetli yağmur") {
    //     let temptimg = "";
    //     let img = document.getElementById("imgid");
    //     temptimg += '<i class="fa-solid fa-cloud-rain"></i>'
    //     img.innerHTML = temptimg;
    // }
    else if (descrimg.includes("yağmur")){
        let temptimg = "";
        let img = document.getElementById("imgid");
        temptimg += '<i class="fa-solid fa-cloud-rain"></i>'
        img.innerHTML = temptimg;
    }

    else if (descrimg.includes("sisli")) {
        let temptimg = "";
        let img = document.getElementById("imgid");
        temptimg += '<i class="fa-solid fa-smog"></i>'
        img.innerHTML = temptimg;
    }

    else {
        let temptimg = "";
        let img = document.getElementById("imgid");
        temptimg += '<i class="fa-solid fa-cloud"></i>'
        img.innerHTML = temptimg;
    }

}

const searchBar = document.getElementById("search");
searchBar.addEventListener("keypress", weatherApi)
