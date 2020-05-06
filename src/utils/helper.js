export const getTime = (time) => {
  let hours = ``;
  let suffix = "";
  if (time > 12 && time < 24) {
    suffix = "PM";
    hours = `${time - 12}${suffix}`;
  }
  if (time >= 1 && time < 12) {
    suffix = "AM";
    hours = `${time}${suffix}`;
  }
  if (time === 24) {
    suffix = "AM";
    hours = `${12}${suffix}`;
  }
  if (time === 12) {
    suffix = "PM";
    hours = `${12}${suffix}`;
  }
  return hours;
};


export const getDay = (day)=> {
 let arr = [
   {
     n: 0,
     day: 'Sun'
   },
   {
    n: 1,
    day: 'Mon'
  },
  {
    n: 2,
    day: 'Tue'
  },
  {
    n: 3,
    day: 'Wed'
  },
  {
    n: 4,
    day: 'Thu'
  },
  {
    n: 5,
    day: 'Fri'
  },
  {
    n: 6,
    day: 'Sat'
  }
 ]
 let date = new Date(day*1000)
 let n = date.getUTCDay();
 let res = arr.filter(a=>a.n===n);
 return (res[0].day)
}

export const getIcon = (weather) => {
  let icon = "";
  let weatherCondition = "";
  if (weather.toLowerCase().includes("clouds")) {
    icon = require("../assets/cloudy.svg");
    weatherCondition = 'Cloudy'
  }
  if(weather.toLowerCase().includes('clear')) {
    icon = require("../assets/shapes-and-symbols.svg");
    weatherCondition = "Sunny"
  }
  if(weather.toLowerCase().includes('haze')) {
    icon = require("../assets/haze.svg");
    weatherCondition = "Hazy"
  }
  if(weather.toLowerCase().includes('rain')) {
    icon = require("../assets/rain.svg");
    weatherCondition = "Rainy"
  }
  if(weather.toLowerCase().includes('thunderstorm')) {
    icon = require("../assets/thunderstorm.svg");
    weatherCondition = "Thunderstorm"
  }
  if(weather.toLowerCase().includes('nil')) {
    icon = require("../assets/number.svg");
    weatherCondition = "Nil"
  }
  return{
    icon,
    weatherCondition
  };
}