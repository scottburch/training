import {newMachine} from "./machine";

const machine = newMachine()

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', (buf) => cmds[buf.toString()]());


const cmds: Record<string, () => void> = {
    1: () => machine.state.insertCoin(.10),
    2: () => machine.state.insertCoin(.50),
    3: () => machine.state.selectProduct('coke')
}
