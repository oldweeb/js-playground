const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

const giveaway = document.querySelector('.sales-date');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

const futureDate = new Date(2021, 7, 24, 0, 0, 0);

const year = futureDate.getFullYear();
const month = months[futureDate.getMonth()];
const hours = futureDate.getHours();
const mins = futureDate.getMinutes();
const secs = futureDate.getSeconds();
const day = weekDays[futureDate.getDay()];
const date = futureDate.getDate();

giveaway.textContent = `sales end on ${day} ${date} ${month} ${year} ${hours}:${mins}:${secs}am`;

//future time in ms
const futureTime = futureDate.getTime();

const getRemainingTime = () => {
    const today = new Date().getTime();
    const remainingTime = futureTime - today;
    // 1s = 1000ms
    // 1m = 60s
    // 1hr = 60m
    // 1d = 24hr
    const oneDay = 24 * 60 * 60 * 1000; // one day in ms
    const oneHour = 60 * 60 * 1000; // one hour in ms
    const oneMinute = 60 * 1000; // one minute in ms
    const oneSecond = 1000; // one second in ms

    let days = Math.floor(remainingTime / oneDay);
    let hours = Math.floor((remainingTime % oneDay) / oneHour);
    let mins = Math.floor((remainingTime % oneHour) / oneMinute);
    let secs = Math.floor((remainingTime % oneMinute) / oneSecond);

    let format = (item) => {
        if (item < 10) {
            return item = `0${item}`;
        } else {
            return item;
        }
    };
    const values = [days, hours, mins, secs];
    items.forEach((item, index) => {
        item.innerHTML = format(values[index]);
    });
    if (remainingTime < 0) {
        clearInterval(countdown);
        deadline.innerhTML = `<h4 class="expired">The sales have ended</h4>`;
    }
};

// countdown
let countdown = setInterval(getRemainingTime, 1000);
getRemainingTime();