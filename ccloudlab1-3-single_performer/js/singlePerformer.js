/*global window, scores, score_types, GUI, aux*/

/*jslint es6, for*/

function singlePerformer() {
    "use strict";
    
    const performer = {};
        
    const pause_sequence = aux.randomSequence(5);
    const pause_array = [0, 0, 1, 1, 2];
    
    GUI.load();
    
    function updateNextEvents() {
        const temporary_performer = Object.assign({}, performer);

        let i;
        
        if (score_types[scores[temporary_performer.current_event.score].type].updateNextEvents) {
            score_types[scores[temporary_performer.current_event.score].type].updateNextEvents(temporary_performer);
        } else {
            for (i = 1; i <= 3; i += 1) {
                temporary_performer["next_event_" + i] = "[]";
            }
        }
        
        let link;
        
        const fixed_pause = pause_array[pause_sequence[temporary_performer.current_event.score - 1]];
        
        if (temporary_performer.current_event.score === 16) { // diagram3x1
            link = scores[temporary_performer.current_event.score].link(temporary_performer.current_event.x, temporary_performer.current_event.y, fixed_pause);
        } else if (temporary_performer.current_event.score !== 0) {
            link = scores[temporary_performer.current_event.score].link(temporary_performer.current_event.part, fixed_pause);
        }
        
        if (link) {
            for (i = 0; i < link.length; i += 1) {
                temporary_performer["next_event_" + link[i].next_event_index] = link[i].next_event;
            }
        }
                
        for (i = 1; i <= 3; i += 1) {
            const next_event = "next_event_" + i;
            
            if (!performer[next_event] || temporary_performer[next_event].score !== performer[next_event].score || temporary_performer[next_event].part !== performer[next_event].part) {
                performer[next_event] = temporary_performer[next_event];
                                
                if (performer[next_event] !== "[]") {
                    score_types[scores[performer[next_event].score].type].formatEvent(performer, next_event);
                }
            }
        }
        
        if (temporary_performer.general_loudness !== performer.general_loudness) {
            performer.general_loudness = temporary_performer.general_loudness;
        }
    }
    
    function loop(t) {
        if (performer.state === "playing") {
            performer.clock.delta = (t - performer.clock.t0) / 1000;
            performer.clock.master += performer.clock.delta;
            
            if (performer.middle_foot_switch) {
                performer.middle_foot_switch += performer.clock.delta;
            }

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
                
                performer.audio = performer.current_event.score;
            }
            
            if (scores[performer.current_event.score].type !== "audio" && performer.audio) {
                if (scores[performer.audio].audio.length) {
                    scores[performer.audio].audio.forEach(function playOrPause(audio) {
                        if (!audio.paused) {
                            audio.pause();
                        }
                    });
                } else {
                    scores[performer.audio].audio.pause();
                }
                
                performer.audio = 0;
            }
            
            if (score_types[scores[performer.current_event.score].type].updateCurrentEvent) {
                score_types[scores[performer.current_event.score].type].updateCurrentEvent(performer);
            }
            
            updateNextEvents();
        }
        
        performer.clock.t0 = t;
        
        GUI.draw(performer);
                                
        window.requestAnimationFrame(loop);
    }
    
    function interactKeyDown(e) {
        if (e.keyCode === 50 && performer.state === "playing" && !performer.middle_foot_switch) {
            performer.middle_foot_switch = 0.001;
        }
    }
    
    function interactKeyUp(e) {
        if (e.keyCode >= 49 && e.keyCode <= 51) {
            if (performer.state === "ready") {
                performer.state = "playing";
            } else if (performer.state === "playing") {
                if (performer.current_event.score !== 0 && e.keyCode === 50 && performer.middle_foot_switch > 1) {
                    let loudness_array = scores[performer.current_event.score].loudness;

                    if (performer.current_event.score !== 16) { // diagram3x1
                        loudness_array = loudness_array[performer.current_event.part];
                    }
                    
                    const previous_loudness = performer.current_event.loudness;
                    
                    performer.current_event.loudness = loudness_array[(loudness_array.indexOf(performer.current_event.loudness) + Math.max(Math.floor(performer.middle_foot_switch) - 1, 0)) % loudness_array.length];
                    
                    if (previous_loudness !== performer.current_event.loudness) {
                        performer.general_loudness = loudness_array.indexOf(performer.current_event.loudness) / Math.max((loudness_array.length - 1), 1);
                    }
                    
                    let i;
                    
                    for (i = 1; i <= 3; i += 1) {
                        const next_event = "next_event_" + i;
                        
                        if (performer[next_event] !== "[]") {
                            delete performer[next_event].loudness;
                            
                            score_types[scores[performer[next_event].score].type].formatEvent(performer, next_event);
                        }
                    }
                                        
                    performer.middle_foot_switch = 0;
                } else {
                    if (e.keyCode === 50 && performer.middle_foot_switch !== 0) {
                        performer.middle_foot_switch = 0;
                    }
                    
                    score_types[scores[performer.current_event.score].type].interact(performer, e.keyCode - 48);
                }
            }
        }
    }
    
    aux.loadMedia(1, 20, "ccloudlab1-2/", true, function init() {
        GUI.clear();
        
        window.alert("Use a USB triple foot switch or 1, 2, and 3 on the keyboard to interact with the scores.");

        do {
            performer.index = parseInt(aux.choosePerformer());

            if (performer.index) {
                performer.index -= 1;

                do {
                    performer.current_event = {};

                    performer.current_event.score = aux.chooseScore(performer.index);

                    if (performer.current_event.score) {
                        if (performer.current_event.score === 20) { // zr1tS
                            performer.current_event = {score: 20, part: 0};
                        } else if (performer.current_event.score !== 16) { // diagram3x1
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

        performer.general_loudness = 0;

        score_types[scores[performer.current_event.score].type].formatEvent(performer, "current_event");

        if (score_types[scores[performer.current_event.score].type].next_event_index && performer.current_event.part < 11) {
            performer.next_event_index = 1;
        } else {
            performer.next_event_index = 0;
        }

        performer.clock = {master: 0, delta: 0, t0: 0};
        performer.state = "ready";

        GUI.init();

        updateNextEvents();

        window.requestAnimationFrame(loop);

        window.onkeydown = interactKeyDown;
        window.onkeyup = interactKeyUp;
    });
}
