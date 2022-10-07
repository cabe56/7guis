import React, { useEffect, useState } from 'react';
import counter from './xstate/Counter';
import { useMachine } from '@xstate/react';

export default function Counter() {
  const [state, send, service] = useMachine(counter);

  const [localCount, setLocalCount] = useState(1);
  const [lastState, setLastState] = useState<Object>({});

  const setCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.currentTarget.value);
    setLocalCount(num);
  };

  useEffect(() => {
    const subscription = service.subscribe((state) => {
      // simple state logging
      setLastState(state);
    });

    return subscription.unsubscribe;
  }, [service]);

  return (
    <div>
      <p>{state.context.count}</p>
      <input name='count' type='number' onChange={setCount} />
      <button onClick={() => send('INCREMENT', { num: localCount })}>
        INCREMENT
      </button>
      <button onClick={() => send('RESET')}>RESET</button>
      <button onClick={() => send('DOUBLE')}>DOUBLE</button>
      <span>{JSON.stringify(lastState, null, 2)}</span>
    </div>
  );
}
