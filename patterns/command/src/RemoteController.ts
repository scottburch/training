import {Some} from "monet";
import {newRemote, remoteAddCmd, RemoteCmd, remotePressKey} from "./Remote";
import {memoize} from "lodash";

const getRemote = memoize(() => Some(newRemote()));

Some(document)
    .map(document => document.querySelectorAll('button'))
    .forEach(btns =>
        btns.forEach((btn, idx) =>
            btn.addEventListener('click', () =>
                getRemote().forEach(remotePressKey(idx))
            )
        )
    );

(global as any).assignCmd = (btn: number, cmd: RemoteCmd) =>
    getRemote()
        .forEach(remoteAddCmd(btn, cmd));