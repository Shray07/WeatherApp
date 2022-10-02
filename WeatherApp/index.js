  document.querySelector("#search").addEventListener("click", takeInput);

  function takeInput() {
    var location = document.getElementById("location").value;
    console.log(location);
    getData(location);
  }

  async function getData(location) {

    document.getElementById("gmap_canvas").setAttribute("src", `https://maps.google.com/maps?q=${location}&t=&z=13&ie=UTF8&iwloc=&output=embed`)

    var key = "ff9bb9049711ca2235219873572fd6da";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric`;

    var temp = await fetch(url);
    var result = await temp.json();

    var lat = result.coord.lat;
    var lon = result.coord.lon;

    weekdata(lat, lon);
    async function weekdata(lat, lon) {
      var res = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}`
      );

      var wdata = await res.json();
      var week = wdata.daily;
      console.log(week);
      displayday(week[0])
      displayWeek(week)
    }
  }


  function displayday(day){
    document.querySelector(".dailyCard").innerHTML = null
    document.querySelector(".logo").innerHTML = null
      var date = timeConverter(day.dt, "year");
      console.log(date);
      var sunrise = timeConverter(day.sunrise, "time")
      var sunset = timeConverter(day.sunset, "time");
      var mintemp = Math.round((day.temp.min - 273.15) * 10) / 10;
      var maxtemp = Math.round((day.temp.max - 273.15) * 10) / 10;
      var humidity = day.humidity;
      var wind = Math.round((day.wind_speed * 3.6*10))/10 
      var icon = day.weather[0].icon;
      

      let lbox = document.createElement("div");
      lbox.setAttribute("id", "lbox");
      let img = document.createElement("img");
      img.setAttribute("id", "dayimg")
      img.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      let sdate = document.createElement("p");
      sdate.textContent = date;
      let weather = document.createElement("p");
      weather.textContent = `${day.weather[0].main},${day.weather[0].description}`
      

      lbox.append(img,weather,sdate)
      document.querySelector(".logo").append(lbox)

      let tempbox = document.createElement('div');
      tempbox.setAttribute("class", "tempbox")
      let smintemp= document.createElement("p");
      smintemp.textContent = `Min. Temp: ${mintemp}°C`
      let smaxtemp= document.createElement("p");
      smaxtemp.textContent = `Max. Temp: ${maxtemp}°C`
      tempbox.append(smintemp, smaxtemp)

      

      let sunbox = document.createElement("div");
      sunbox.setAttribute("class", "sunbox");
      let rise = document.createElement("p");
      rise.textContent = `Sunrise: ${sunrise}`;
      let set = document.createElement("p");
      set.textContent = `Sunset: ${sunset}`
      sunbox.append(rise, set);

      

      let swind = document.createElement("p");
      swind.setAttribute("class", "wind")
      swind.textContent = `Wind Speed: ${wind}Km/Hr`

      let shumidity = document.createElement("p");
      shumidity.setAttribute("class", "humidity")
      shumidity.textContent = `Humidity: ${humidity}%`
      
      document.querySelector(".dailyCard").append(shumidity, swind, tempbox, sunbox)
  }
      

  function displayWeek(arr) {
    document.querySelector(".week").innerHTML = null;
    arr.shift();
    console.log(arr);
    arr.map(function (day) {
      // console.log(day);
      var div = document.createElement("div");
      div.setAttribute("id", "eachday");
      var temp = Math.round((day.temp.day - 273.15) * 10) / 10;
      var mintemp = Math.round((day.temp.min - 273.15) * 10) / 10;
      var maxtemp = Math.round((day.temp.max - 273.15) * 10) / 10;
      var sunrise = timeConverter(day.sunrise, "time");
      var sunset = timeConverter(day.sunset, "time");
      var humidity = day.humidity;
      var wind = day.wind_speed * 3.6;
      var icon = day.weather[0].icon;
      var des = day.weather[0].main;
      // console.log(temp, mintemp, maxtemp, sunrise, sunset, humidity, wind, icon, des)

      let ptemp = document.createElement("p");
      ptemp.innerHTML = `<i class="fas fa-temperature-high"></i>`;
      ptemp.textContent = mintemp;

      let pset = (document.createElement("p").textContent = sunset);
      let phum = (document.createElement("p").textContent = humidity + "%");

      //maxtemp
      var maxdiv = document.createElement("div");
      maxdiv.setAttribute("id", "maxdiv");
      maxdiv.innerHTML = `<i class="fas fa-temperature-high"></i>`;
      let pmaxtemp = (document.createElement("p").textContent = maxtemp + "°C");
      maxdiv.append(pmaxtemp);

      //min temp
      var mindiv = document.createElement("div");
      mindiv.setAttribute("id", "mindiv");
      mindiv.innerHTML = `<i class="fas fa-temperature-low"></i>`;
      let pmintemp = (document.createElement("p").textContent = mintemp + "°C");
      mindiv.append(pmintemp);

      //temp div
      var tdiv = document.createElement("div");
      tdiv.append(maxdiv, mindiv);
      tdiv.setAttribute("id", "tdiv");

      //date
      var rawDate = timeConverter(day.dt);
      var date = document.createElement("p");
      date.setAttribute("id", "date");
      date.textContent = rawDate;

      //logo
      var logo = document.createElement("img");
      logo.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${icon}@2x.png`
      );
      logo.addEventListener("click", function () {
        displayday(day)
      });

      //description

      var desc = document.createElement("p");
      desc.setAttribute("id", "desc");
      desc.textContent = des;
      // div.append(maxdiv, mindiv, windiv, logo,pwin, pset);
      div.append(logo, desc, date, tdiv);

      document.querySelector(".week").append(div);
    });
  }



  function timeConverter(int, t) {
    var date = new Date(int * 1000);
    var day = date.getUTCDay();
    var month = date.getMonth();
    var year = date.getFullYear();

    var weekobj = {
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
      0: "Sunday",
    };

    var monthobj = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    };

    // console.log(date.getDate(), day);
    if (t == "time") {
      return date.toLocaleTimeString();
    } else if (t == "year") {
      return date.getDate() + " " + weekobj[day] + " " + year;
    } else {
      return date.getDate() + " " + weekobj[day];
    }

    // return date.getDate() + " " + weekobj[day]
  }
