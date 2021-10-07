import {Maybe, Some} from "monet";
import {passThrough} from "promise-passthrough";

export type RemoteCmd = () => void;

interface Remote {
    buttons: RemoteCmd[]
}

export const newRemote = (): Remote => ({
    buttons: []
});


export const remoteAddCmd = (btnNo: number, cmd: () => void) => passThrough((remote: Remote) =>
    remote.buttons[btnNo] = cmd);

export const remotePressKey = (btnNo: number) => (remote: Remote) =>
    Maybe.fromUndefined(remote.buttons[btnNo])
        .forEach(cmd => cmd());

