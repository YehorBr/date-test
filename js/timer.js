const refs = {
    startBtn: document.querySelector('button[data-action-start]'),
    stopBtn: document.querySelector('button[data-action-stop]'),
    clockface: document.querySelector('.js-clockface'),
  };


  const timer = {
    intervalId: null,
  
    start () {
      const startTime = Date.now(); 
  
      this.intervalId = setInterval(() => {
        const currentTime = Date.now();
                              
        const deltaTime = currentTime - startTime;
        console.log('deltaTime: ', deltaTime);

        const time = getTimeComponents(deltaTime)
        const timerScore = updateClockface(time)
        console.log(time);
        
        refs.startBtn.disabled = true;
      },1000)
    },
    stop() {
          clearInterval(this.intervalId);

          refs.startBtn.disabled = false;
      }
  }
  refs.startBtn.addEventListener('click', () => {
    timer.start()
  })
  refs.stopBtn.addEventListener('click', () => {
    timer.stop()
  })


/*
   * Приймає число, приводить його в рядок і додає на початок 0 
   * якщо число менше 2-х знаків
   */
function pad(value) {
    return String(value).padStart(2, '0');
  }


/*
   * - Приймає час в мілісекундах
   * - Вираховує скільки в них вміщується годин/хвилин/секунд
   * - Повертає об'єкт з властивостями hours, mins, secs
   */

 function getTimeComponents(time) {
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { hours, mins, secs };
}

/*
 * - Приймає час в міллісекундах
 * - Вираховує скільки в них вміщується годин/хвилин/секунд
 * - Малює інтерфейс
 */
function updateClockface({ hours, mins, secs }) {
    refs.clockface.textContent = `${hours}:${mins}:${secs}`;
  }