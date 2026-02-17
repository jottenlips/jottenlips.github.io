# So you need a TypeScript State Machine?

Here is a simple, less than 50 line, state machine example in TypeScript for a switch.

This is inspired by Kent C Dodds. However, I have made a few simplifications as well as added types.

```typescript
// the types for our state
interface IState {
    // You can add more states
    on: boolean
}
// the types for our state machine
interface IStateMachine {
    state: IState
    actions: {
        // add more actions to modify state
        toggle: () => void
    }
    dispatch: (action: keyof IStateMachine['actions']) => IState
}

// the types for our state machine definition
interface IStateMachineDefition {
    initialState: IState
}

const createMachine = (initialState: IState): IStateMachine => {
    const machine: IStateMachine = {
        state: initialState,
        actions: {
            // add more actions to modify state
            toggle() {
                machine.state.on = !machine.state.on 
            },
        },
        // dispatch an action
        dispatch(action: keyof IStateMachine['actions']) {
            machine.actions[action]()
            return machine.state
        },
    }
    return machine
}

const initialState = {
    on: false
}

const stateMachine = createMachine(initialState)
console.log(stateMachine.state) // off
stateMachine.dispatch('toggle')
console.log(stateMachine.state) // on
```