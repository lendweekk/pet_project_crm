const daysEN = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

const daysUK = [
    "Неділя",
    "Понеділок",
    "Вівторок",
    "Середа",
    "Четвер",
    "П’ятниця",
    "Субота"
];

const login = `${daysEN[new Date().getDay()]}${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`.toLocaleLowerCase();
const password = `${daysUK[new Date().getDay()]}${new Date().getDate()}${new Date().getMonth()+1}${new Date().getFullYear()}${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}`;

export {login, password}

console.log(login)
console.log(password)