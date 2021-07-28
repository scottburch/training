import {default as EventBus} from 'js-event-bus'

const bus = new EventBus();

enum C {
    PLAY_PRESSED= 'play-pressed',
    FORWARD_PRESSED = 'forward-pressed',
    BACK_PRESSED = 'back-pressed',
    TRACK_CHANGED = 'track-changed'
}

const pressPlay = () => bus.emit(C.PLAY_PRESSED);
const pressForward = () => bus.emit(C.FORWARD_PRESSED);
const pressBack = () => bus.emit(C.BACK_PRESSED)


bus.on(C.PLAY_PRESSED, () => {
    console.log('wait for track');
    bus.emit(C.TRACK_CHANGED, null, 1);
});

(() => {
    let track = 0;
    bus.on(C.FORWARD_PRESSED, () =>
        bus.emit(C.TRACK_CHANGED, null, track + 1)
    );

    bus.on(C.BACK_PRESSED, () =>
        bus.emit(C.TRACK_CHANGED, null, track - 1)
    )

    bus.on(C.TRACK_CHANGED, (t) => track = t);
})();

bus.on(C.TRACK_CHANGED, () => console.log('BEEP'));

bus.on('track-changed', (track) =>
    console.log('playing track', track)
);


pressPlay();
setTimeout(pressForward, 2000);
setTimeout(pressForward, 4000);
setTimeout(pressBack, 6000);