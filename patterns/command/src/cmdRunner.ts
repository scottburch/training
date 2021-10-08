import {curry} from "lodash";
import {addListNode, DoubleLinkedListNode} from "./doubleLinkedList";
import {Maybe} from "monet";

interface ListItem {
    cmd: Cmd,
    undoCmd: Cmd
}

interface CmdRunner {
    ptr?: DoubleLinkedListNode<ListItem>
}
type Cmd = () => void;

export const newCmdRunner = () => ({ptr: undefined} as CmdRunner)

export const runCommand = curry((cmd: Cmd, undoCmd: Cmd, runner: CmdRunner): CmdRunner => {
    cmd();
    runner.ptr = addListNode({cmd, undoCmd}, runner.ptr);
    return runner;
});

export const undoCommand = (runner: CmdRunner): CmdRunner => {
    Maybe.fromUndefined(runner.ptr)
    runner.ptr?.data.undoCmd();

    Maybe.fromUndefined(runner.ptr?.prev)
        .forEach(node => runner.ptr = node);

    return runner;
}

export const redoCommand = (runner: CmdRunner): CmdRunner => {
    Maybe.fromUndefined(runner.ptr?.next)
        .forEach(node => {
            node.data.cmd();
            runner.ptr = node;
        });

    return runner;
}
