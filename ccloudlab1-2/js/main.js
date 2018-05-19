/*global window, scores, score_types, GUI, aux*/

/*jslint es6, for*/

function main() {
    "use strict";
    
    const performer = {};

    GUI.load();
    
    function loop(t) {
        if (performer.state === "playing") {
            performer.clock.delta = (t - performer.clock.t0) / 1000;
            performer.clock.master += performer.clock.delta;
            
            if (scores[performer.current_event.score].type === "audio") {
                if (scores[performer.current_event.score].audio.length) {
                    scores[performer.current_event.score].audio.forEach(function playOrPause(audio, index) {
                        if (index === performer.current_event.part && audio.paused) {
                            audio.play();
                        }
                        
                        if (index !== performer.current_event.part && !audio.paused) {
                            audio.pause();
                        }
                    });
                } else if (!performer.audio) {
                    scores[performer.current_event.score].audio.play();
                }
                
                performer.audio = true;
            }
            
            if (score_types[scores[performer.current_event.score].type].updateCurrentEvent) {
                score_types[scores[performer.current_event.score].type].updateCurrentEvent(performer);
            }
        }
        
        performer.clock.t0 = t;
        
        GUI.draw(performer);
                                
        window.requestAnimationFrame(loop);
    }
        
    function interact(e) {
        if (e.keyCode >= 49 && e.keyCode <= 51) {
            if (performer.state === "ready" || performer.state === "pause") {
                performer.state = "playing";
            } else if (performer.state === "playing") {
                score_types[scores[performer.current_event.score].type].interact(performer, e.keyCode - 48);
            }
        }
        
        if (e.keyCode === 83 && (scores[performer.current_event.score].type === "scroll_loop" || scores[performer.current_event.score].type === "scroll_mod" || scores[performer.current_event.score].type === "scroll_map")) {
            performer.state = "pause";
            
            let speed = parseFloat(window.prompt("*** CHANGE THE SCROLLING SPEED ***", performer.speed));
            
            if (speed > 0) {
                performer.speed = speed;
            }
        }
    }
    
    aux.loadMedia(0, 19, "ccloudlab1-2/", true, function init() {
        GUI.clear();
        
        setTimeout(function waitForBrowser() {
            window.alert("Use a USB triple foot switch or 1, 2, and 3 on the keyboard to interact with the scores.");

            do {
                performer.index = parseInt(aux.choosePerformer());

                if (performer.index) {
                    performer.index -= 1;

                    do {
                        performer.current_event = {};

                        performer.current_event.score = aux.chooseScore(performer.index);

                        if (performer.current_event.score) {
                            performer.current_event.score -= 1;

                            if (performer.current_event.score === 19) { // zr1tS
                                performer.current_event = {score: 19, part: 0};
                            } else if (performer.current_event.score !== 15) { // diagram3x1
                                do {
                                    performer.current_event.part = aux.chooseBeginning(performer.current_event.score);

                                    if (performer.current_event.part) {
                                        performer.current_event.part -= 1;
                                    } else {
                                        delete performer.current_event;
                                        break;
                                    }
                                } while (!performer.current_event);
                            }
                        } else {
                            delete performer.current_event;
                            break;
                        }
                    } while (!performer.current_event);
                } else {
                    break;
                }
            } while (!performer.current_event);

            if (!performer.current_event) {
                return;
            }

            if (score_types[scores[performer.current_event.score].type].formatEvent) {
                score_types[scores[performer.current_event.score].type].formatEvent(performer, "current_event");
            }

            if (score_types[scores[performer.current_event.score].type].updateNextEvents) {
                score_types[scores[performer.current_event.score].type].updateNextEvents(performer);
            }

            if (score_types[scores[performer.current_event.score].type].next_event_index && performer.current_event.part < 11) {
                performer.next_event_index = 1;
            } else {
                performer.next_event_index = 0;
            }

            performer.clock = {master: 0, delta: 0, t0: 0};
            performer.state = "ready";
            performer.speed = 1;

            GUI.init();

            window.requestAnimationFrame(loop);

            window.onkeyup = interact;
        }, 500);
    });
}
