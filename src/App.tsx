import React from 'react';
import './index';
import { PomodoroTimer } from './components/pomodoTimer';

function App(): JSX.Element {
  return (
    <div className="App">
      <PomodoroTimer
        pomodoroTimerTotal={1500}
        shortRestTimer={300}
        longRestTimer={900}
        cycles={4}
      />
    </div>
  );
}

export default App;
