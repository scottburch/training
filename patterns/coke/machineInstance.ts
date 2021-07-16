import {newMachine} from "./machine";

const machine = newMachine({
    display: console.log
})

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', (buf) => cmds[buf.toString()]());


const cmds: Record<string, () => void> = {
    1: () => machine.behaviour.insertCoin(.10),
    2: () => machine.behaviour.insertCoin(.50),
    3: () => machine.behaviour.selectProduct('coke')
}
