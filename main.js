import dayjs from 'dayjs/esm/index.js';
import utc from 'dayjs/esm/plugin/utc/index.js';
import timezone from 'dayjs/esm/plugin/timezone/index.js';
import MicroModal from 'micromodal';

dayjs.extend(utc);
dayjs.extend(timezone);

const all_timezones = Intl.supportedValuesOf('timeZone'); // all Timezones 
const regex_only_asian = /^Asia\//g;
let asian_timezones = [];

for (let timezone of all_timezones) {
    if (timezone.match(regex_only_asian)) {
        asian_timezones.push(timezone);
    }
}

const updateTime = () => {
    const datetime = dayjs().tz(dayjs.tz().$x.$timezone);
    const current_time = datetime.format('hh:mm:ss A');
    const current_date = datetime.format('MMMM D, YYYY');
    const timeContainer = document.getElementById("time");
    timeContainer.innerHTML = current_time;
    const dateContainer = document.getElementById("date");
    dateContainer.innerHTML = current_date;
    getTimezone();
}

const getTimezone = () => {
    const timeZoneContainer = document.getElementById("time-zone");
    timeZoneContainer.innerHTML = dayjs.tz().$x.$timezone;
}

const setTimezone = (timezone) => {
    if (timezone === "Pick a timezone") {
        alert("Please pick a timezone");
    } else {
        dayjs.tz.setDefault(timezone);
        updateTime();
    }
}

const addOptions = (timezones) => {
    const timezoneSel = document.getElementById("modal-sel");
    for (var x of timezones) {
        timezoneSel.options[timezoneSel.options.length] = new Option(x, x);
    }
}

const init = () => {
    MicroModal.init({
        onShow: modal => console.info(`${modal.id} is shown`),
        onClose: modal => {
            console.info(`${modal.id} is hidden`);
            const timezoneToChangeTo = document.getElementById("modal-sel").value;
            setTimezone(timezoneToChangeTo);
        },
        disableScroll: true,
        openClass: 'is-open'
    });
    
    dayjs.tz.setDefault(dayjs.tz.guess());
    updateTime();
    setInterval(updateTime, 1000);
    addOptions(asian_timezones);
}

init();