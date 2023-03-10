// querySelectror จะคล้ายกับ getElementBy.... 
const iconElement = document.querySelector('.weather-icon')                      // class ใส่ (.) && id ใส่ #
const temperatureElement = document.querySelector('.temperature-value p')       // เข้าถึง p ใน class temperature-value
const descriptionElement = document.querySelector('.temperature-description p') // เข้าถึง p ใน class temperature-description
const locationElement = document.querySelector('.location p')                   
const notificationElement = document.querySelector('.notification')             // ตัวแปร เอาไว้แจ้งเตือนหากเกิด error

const weather = {   // object weather กับการประกาศค่าเริ่มต้น
  city : '-',
  country : '-', 
  iconId : 'unknow',
  description : '-',

  temperature : {
    unit : 'celsius',
    value: 0
  }
}

const KELVIN = 273
const key = '82005d27a116c2880c8f0fcb866998a0'

// Method โชว์สิ่งที่ object weather เก็บ โดยเก็บใน Element แต่ละตัว
const displayWeather = () => {   
  iconElement.innerHTML = `<img src = "icons/${weather.iconId}.png">`
  temperatureElement.innerHTML = `${weather.temperature.value}°<span>C<span>`
  descriptionElement.innerHTML = weather.description
  locationElement.innerHTML = `${weather.city} , ${weather.country}`

}

const getWeather = async (latitude , longitude) => {
  const api  = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
  const response = await fetch(api)
  const data = await response.json()


  weather.temperature.value = Math.floor(data.main.temp - KELVIN)
  
  weather.description = data.weather[0].description
  weather.iconId = data.weather[0].icon
  weather.city = data.name
  weather.country = data.sys.country
  
  displayWeather() 
}

const setPosition = (position) => {
  const {latitude , longitude} = position.coords
  getWeather(latitude , longitude)
}

const showError = (error) => {
  notificationElement.style.display = 'block'
  notificationElement.innerHTML = `<p> ${error.message} </p>`
}

if (navigator.geolocation){
  navigator.geolocation.getCurrentPosition(setPosition, showError)
}else {
  notificationElement.getElementsByClassName.display = 'block'
  notificationElement.innerHTML = '<p>Error to access Geolocation</p>'
}

const celsiusToFahrenheit = (celcius) => Math.floor((celcius*9) / 5 + 32)

temperatureElement.addEventListener('click' , () => {
  if (!weather.temperature.value) return

  if (weather.temperature.unit === 'celsius') {
    const fahrenheit =  celsiusToFahrenheit(weather.temperature.value)
    temperatureElement.innerHTML = `${fahrenheit}°<span>F</span>`
    weather.temperature.unit = 'fahrenheit'
  }else{
    temperatureElement.innerHTML = `${weather.temperature.value}°<span>C</span>`
    weather.temperature.unit = 'celsius'
  }
})