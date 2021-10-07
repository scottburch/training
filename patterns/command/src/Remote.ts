import {Maybe, Some} from "monet";
import {passThrough} from "promise-passthrough";

export const newRemote = (): Remote => ({
    buttons: []
});

type RemoteCmd = () => void;
interface Remote {
    buttons: RemoteCmd[]
}

export const remoteAddCmd = (btnNo: number, cmd: () => void) => (remote: Remote) =>
        Some(remote)
            .map(passThrough(remote => remote.buttons[btnNo] = cmd))
            .join();

export const remotePressKey = (btnNo: number) => (remote: Remote) =>
    Maybe.fromUndefined(remote.buttons[btnNo])
        .forEach(cmd => cmd());

