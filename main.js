import dayjs from 'dayjs/esm/index.js';
import utc from 'dayjs/esm/plugin/utc/index.js';
import timezone from 'dayjs/esm/plugin/timezone/index.js';

dayjs.extend(utc);
dayjs.extend(timezone);


const updateTime = () => {
    const current_time = `Current time is ${dayjs().format('MMMM D, YYYY hh:mm:ss A')}`;
    const timeContainer = document.getElementById("time");
    timeContainer.innerHTML = current_time;
}

const getTimezone = () => {
    const timeZoneContainer = document.getElementById("time-zone");
    timeZoneContainer.innerHTML = dayjs.tz.guess();
}


updateTime();
setInterval(updateTime, 1000);
getTimezone();