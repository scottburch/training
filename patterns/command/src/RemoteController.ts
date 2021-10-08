import {Maybe, Some} from "monet";
import {newRemote, remoteAddCmd, RemoteCmd, remotePressKey} from "./Remote";
import {memoize} from "lodash";
import {newCmdRunner, redoCommand, runCommand, undoCommand} from "./cmdRunner";
import {passThrough} from "promise-passthrough";

const getRemote = memoize(() => Some(newRemote()));
const getCmdRunner = memoize(() => Some(newCmdRunner()));

Some(document)
    .map(document => document.querySelectorAll('[data-type="remote"]'))
    .forEach(btns =>
        btns.forEach((btn, idx) =>
            btn.addEventListener('click', () =>
                getRemote().forEach(remotePressKey(idx))
            )
        )
    );

Maybe.fromNull(document.querySelector('#undo'))
    .forEach(btn =>
        btn.addEventListener('click', () =>
            getCmdRunner().forEach(runner => undoCommand(runner))
        )
    );

Maybe.fromNull(document.querySelector('#redo'))
    .forEach(btn =>
        btn.addEventListener('click', () =>
            getCmdRunner().forEach(runner => redoCommand(runner))
        )
    );

(global as any).assignCmd = (btn: number, cmd: RemoteCmd) => {
    getRemote()
        .forEach(remoteAddCmd(btn, () =>
                getCmdRunner()
                    .forEach(runCommand(cmd, undoTyping()))
            )
        );
}

const undoTyping = () => {
    const curr = document.querySelector('#log')?.innerHTML || '';
    return () => Maybe.fromNull(document.querySelector('#log'))
        .forEach(el => el.innerHTML = curr);
}


(global as any).log = (text: string) =>
    Maybe.fromNull(document.querySelector('#log'))
        .forEach(el => el.innerHTML = document.querySelector('#log')?.innerHTML + text);


