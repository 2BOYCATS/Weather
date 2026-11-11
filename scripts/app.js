const iconElement = document.querySelector('.icon')
const temperatureElmemt = document.querySelector('.temperature-value p')
const descriptionElmemt = document.querySelector('.temperature-desc p')
const locationElmemt = document.querySelector('.location p')
const notificationElement = document.querySelector('.notification')

const weather = {
    city : '-',
    country : '-', 
    iconId : 'unknow',
    description : '-',

    temperature : {
        value: 0
    }
}

const key = '82005d27a116c2880c8f0fcb866998a0'

const displayWeather = () => {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png">`
    temperatureElmemt.innerHTML = `${weather.temperature.value}°<span>C</span> `
    descriptionElmemt.innerHTML = `${weather.description}`
    locationElmemt.innerHTML = `${weather.city}, ${weather.country}`
}

const getWeather = async(lat, lng) => {
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`
    const res = await fetch(api)
    const data = await res.json()
    
    weather.iconId = data.weather[0].icon
    weather.temperature.value = Math.floor(data.main.temp - 273)
    weather.description = data.weather[0].description
    weather.country = data.sys.country
    weather.city = data.name
    
    displayWeather() 
}

const setPosition = (position) => {
    const {latitude, longitude} = position.coords
    getWeather(latitude, longitude)
}

const showError = (error) => {
    notificationElement.style.display = 'block'
    notificationElement.innerHTML = `<p>${error.message}</p>`
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition, showError)
} else {
    notificationElement.style.display = 'block'
    notificationElement.innerHTML = '<p>Error to access Geolocation</p>'
}
