import {curry} from "lodash";
import {List as LinkedList, Item as Item} from 'linked-list'
import {Some} from "monet";

export const newCmdRunner =  (): CmdRunner =>
    Some(new LinkedList())
        .map(list => ({
            cmds: list,
            ptr: undefined
        }))
        .join();

interface ListItem {
    cmd: Cmd,
    undoCmd: Cmd
}

interface CmdRunner {
    ptr: Item
    cmds: LinkedList<ListItem>
}
type Cmd = () => void;

export const runCommand = curry((cmd: Cmd, undoCmd: Cmd, runner: CmdRunner): CmdRunner => {
    cmd();
    return runner;
});

//export const undoCommand = (runner: CmdRunner) =>

