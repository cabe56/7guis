import { createMachine } from 'xstate';

const counter = createMachine(
  {
    id: 'counter',
    initial: 'active',
    context: {
      count: 0,
    },
    schema: {
      events: {} as
        | { type: 'INCREMENT'; num: number }
        | { type: 'RESET' }
        | { type: 'DOUBLE' },
    },
    states: {
      active: {
        on: {
          INCREMENT: { target: 'active', actions: ['increaseCount'] },
          RESET: { target: 'active', actions: ['resetCount'] },
          DOUBLE: { target: 'active', actions: ['increaseCount'] },
        },
      },
    },
  },
  {
    actions: {
      increaseCount: (ctx, { type, payload }) =>
        type === 'DOUBLE' ? (ctx.count += 2) : (ctx.count += payload.num),
      resetCount: (ctx) => (ctx.count = 0),
    },
  }
);

export default counter;
