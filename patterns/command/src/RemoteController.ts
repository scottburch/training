import {Some} from "monet";
import {newRemote, remoteAddCmd, remotePressKey} from "./Remote";

const remote = newRemote();

Some(remote)
    .map(remoteAddCmd(0, () => alert('button 0 pressed')))
    .map(remoteAddCmd(1, () => alert('button 1 pressed')));


Some(document)
    .map(document => document.querySelectorAll('button'))
    .forEach(btns =>
        btns.forEach((btn, idx) => btn.addEventListener('click', () => remotePressKey(idx)(remote)))
    )
