const clock = {
  time: {
    hour: 0,
    minute: 0,
    second: 0
  },
  _hour: document.getElementById("nc-hour"),
  _minute: document.getElementById("nc-minute"),
  _second: document.getElementById("nc-second"),
  _point: {
    hour: document.getElementById("point-hour"),
    minute: document.getElementById("point-minute"),
    second: document.getElementById("point-second"),
  },

  _timer: 0,
  set hour(value){
    this.time.hour = ~~value;
    if (value < 10) value = '0' + value;
    if (this._hour) this._hour.innerText = value;
  },
  set minute(value){
    this.time.minute = ~~value;
    if (value < 10) value = '0' + value;
    if (this._minute) this._minute.innerText = value;
  },
  set second(value){
    this.time.second = ~~value;
    if (value < 10) value = '0' + value;
    if (this._second) this._second.innerText = value;
  },
  get hour(){
    return this.time.hour;
  },
  get minute(){
    return this.time.minute;
  },
  get second(){
    return this.time.second;
  },
  setTime(timeObj){
    this.hour = timeObj.getHours();
    this.minute = timeObj.getMinutes();
    this.second = timeObj.getSeconds();
  },
  setPointVisible(hour=false, minute=false, second=true){
    this._point.hour.style.visibility = hour?'visible':'hidden';
    this._point.minute.style.visibility = minute?'visible':'hidden';
    this._point.second.style.visibility = second?'visible':'hidden';
  }
};

const clockMethods = {
  runCycle(hour = false, minute = false, second = true){
    const delayTime = 8; //ms
    return new Promise(async (resolve) => {
      let val = {
        hour: clock.hour % 10,
        minute: clock.minute % 10,
        second: clock.second % 10
      }
      let counter = 11;
      while(counter --> 0){
        if (hour) clock.hour = Math.floor(clock.hour / 10) * 10  + val.hour % 10;
        if (minute) clock.minute = Math.floor(clock.minute / 10) * 10  + val.minute % 10;
        if (second) clock.second = Math.floor(clock.second / 10) * 10 + val.second % 10;
        await sleep(delayTime);
        val.hour++;
        val.minute++;
        val.second++;
      }
      resolve();
    });
  },
  secretEgg: (function(){
    let clickCounter = 0;
    const goal = 7;
    let timer = null;
    const msg = "U3RhcnRlZCBmcm9tIEphbnUgMTQsIDIwMTkuCkhpLCBHYWZmRUQh";
    const handleClick = () => {
      if (clickCounter === -1){
        return;
      }
      if ((++clickCounter) == goal){
        console.log(atob(msg));
        alert("Hello.")
        timer && clearTimeout(timer);
        clickCounter = -1;
      }
      timer && clearTimeout(timer);
      timer = setTimeout(() => {
        clickCounter = 0;
      }, 5000);
    };
    return handleClick;
  })()
}
document.getElementsByClassName("title")[0].addEventListener('click', clockMethods.secretEgg, false);

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

let time = new Date();
clock.hour = 18;
clock.minute = 59;
clock.second = 2;
clock.setTime(time);
clock.setPointVisible();

// clockMethods.runCycle();
let second_point = true;

setInterval(() => {
  second_point = !second_point;
  clock.setPointVisible(false, false, second_point);
}, 500);

setInterval(async () => {
  time.setTime(time.getTime() + 1000 * 1);
  await clockMethods.runCycle(clock.minute === 59 && clock.second === 59, clock.second === 59, true);
  clock.setTime(time);
}, 1000);

