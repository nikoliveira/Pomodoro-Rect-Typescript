import React, { useState, useEffect } from 'react';
import { useInterval } from '../hooks/setInterval';
import { hourTime } from '../util/hour-time';
import { Button } from './button';
import { Timer } from './timer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const audioStartWorking = require('../sounds/start.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const audioStopWorking = require('../sounds/finish.mp3');
const startWorking = new Audio(audioStartWorking);
const stopWorking = new Audio(audioStopWorking);

type Props = {
  pomodoroTimerTotal: number;
  shortRestTimer: number;
  longRestTimer: number;
  cycles: number;
};

export function PomodoroTimer(props: Props): JSX.Element {
  const { pomodoroTimerTotal, shortRestTimer, longRestTimer, cycles } = props;
  const arrayCycles = new Array(cycles).fill(true);
  const [mainTime, setMainTime] = useState(pomodoroTimerTotal);
  const [working, setWorking] = useState(false);
  const [play, setPlay] = useState(false);
  const [rest, setRest] = useState(false);
  const [qtCyclesManeger, setQtCylesManeger] = useState(arrayCycles.length - 1);
  const [qtCycles, setQtCycles] = useState(0);
  const [qtPomodoro, setQtPomodoro] = useState(0);
  const [fullWorking, setFullWorking] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) {
        setFullWorking(fullWorking + 1);
      }
    },
    play ? 1000 : null,
  );

  const playWorking = () => {
    setWorking(true);
    setPlay(true);
    setRest(false);
    setMainTime(pomodoroTimerTotal);
    startWorking.play();
  };

  const playRest = (long: boolean) => {
    setPlay(true);
    setWorking(false);
    setRest(true);
    stopWorking.play();

    if (long === false) {
      setMainTime(shortRestTimer);
    } else {
      setMainTime(longRestTimer);
    }
  };

  //cuidado com uso do return, primeiramente utiliza o if sem
  //essa palavra reservada,caso o if comece atrapalhar é intersante
  useEffect(() => {
    if (working) {
      document.body.classList.add('working');
    }

    if (rest) {
      document.body.classList.remove('working');
    }

    if (mainTime > 0) return;

    if (working && qtCyclesManeger > 0) {
      playRest(false);
      setQtCylesManeger(qtCyclesManeger - 1);
    } else if (working && qtCyclesManeger <= 0) {
      playRest(true);
      setQtCylesManeger(arrayCycles.length - 1);
      setQtCycles(qtCycles + 1);
    }
    if (working) {
      setQtPomodoro(qtPomodoro + 1);
    }
    if (rest) {
      playWorking();
    }
  }, [working, rest, playRest, qtCycles, arrayCycles, mainTime, qtPomodoro]);

  return (
    <div className="pomodoro-timer">
      <h2>Você esta {working ? 'trabalhando' : 'descansando'}</h2>
      <Timer className="timer" value={mainTime} />
      <div className="button-container">
        <Button
          className="button"
          text="trabalhando"
          onClick={() => playWorking()}
        ></Button>

        <Button
          className="button"
          text="descanso"
          onClick={() => playRest(false)}
        ></Button>

        <Button
          className={working || rest ? 'button' : 'hidden'}
          text={play ? 'pausar' : 'continuar'}
          onClick={() => setPlay(!play)}
        ></Button>
      </div>
      <p>Ciclos concluídos:{qtCycles} </p>
      <p>Horas trabalhadas:{hourTime(fullWorking)} </p>
      <p>Pomodoros concluídos:{qtPomodoro} </p>
    </div>
  );
}
