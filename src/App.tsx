import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Timer, Flag } from 'lucide-react';

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStartStop = useCallback(() => {
    setIsRunning(!isRunning);
  }, [isRunning]);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  }, []);

  const handleLap = useCallback(() => {
    setLaps((prevLaps) => [...prevLaps, time]);
  }, [time]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-gray-800 mb-4">
            <Timer className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold mb-2">Stopwatch</h1>
          <div className="text-6xl font-mono tracking-wider">
            {formatTime(time)}
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={handleStartStop}
            className={`p-4 rounded-full ${
              isRunning
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            } transition-colors`}
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button
            onClick={handleReset}
            className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <RotateCcw className="w-6 h-6" />
          </button>
          <button
            onClick={handleLap}
            className="p-4 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors"
            disabled={!isRunning}
          >
            <Flag className="w-6 h-6" />
          </button>
        </div>

        {laps.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">Lap Times</h2>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {laps.map((lapTime, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-700 p-3 rounded"
                >
                  <span>Lap {laps.length - index}</span>
                  <span className="font-mono">{formatTime(lapTime)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;