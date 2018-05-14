/*global window, polygon1, GUI, Blob, saveAs*/

/*jslint es6, for*/

function main() {
    "use strict";
    
    const performer = {};
    
    let log = "polygon1-ann-psAs-di-log";

    GUI.load();
    
    function updateNextEvents() {
        let network = [];
        
        let i;
                
        for (i = 0; i < polygon1.network[performer.current_event.part].length; i += 1) {
            network.push(polygon1.network[performer.current_event.part][i]);
        }

        while (network.length > 3) {
            let max = 0;
            let max_index = -1;

            for (i = 0; i < network.length; i += 1) {
                if (polygon1.histogram[network[network.length - i - 1]] > max) {
                    max_index = network.length - i - 1;
                    max = polygon1.histogram[network[max_index]];
                }
            }

            if (max_index !== -1) {
                network.splice(max_index, 1);
            } else {
                network.splice(network.length - 1, 1);
            }
        }

        for (i = 1; i <= network.length; i += 1) {
            const next_event = "next_event_" + i;
            
            performer[next_event] = {part: network[i - 1]};

            performer[next_event].t = polygon1.transition(performer.current_event.part, performer[next_event].part) * -1;
        }
        
        if (network.length < 3) {
            delete performer.next_event_3;
        }
    }
    
    function writeLog() {
        log += "\n" + performer.clock.master + "| " + performer.current_event.part + "," + performer.current_event.t + ": ";
        
        let i;
        
        for (i = 1; i <= 3; i += 1) {
            const next_event = "next_event_" + i;
            
            if (performer[next_event]) {
                log += performer[next_event].part + "," + performer[next_event].t + ": ";
            } else {
                log += "[]: ";
            }
        }
        
        log += performer.next_event_index;
    }
    
    function updateCurrentEvent() {
        performer.current_event.t += performer.clock.delta;
        
        if (performer.current_event.t >= polygon1.durations[performer.current_event.part]) {
            if (performer.ending) {
                performer.state = "ended";

                log += "\n" + performer.clock.master + "| the end";
                
                return;
            }
            
            polygon1.histogram[performer.current_event.part] += 1;
                        
            polygon1.previous_part = performer.current_event.part;
            
            const next_event = "next_event_" + performer.next_event_index;
            
            performer.current_event = {part: performer[next_event].part, t: performer[next_event].t};

            performer.next_event_index = 1;
            
            updateNextEvents();
            
            writeLog();
        }
    }
    
    function loop(t) {
        if (performer.state === "playing") {
            performer.clock.delta = (t - performer.clock.t0) / 1000;
            performer.clock.master += performer.clock.delta;
                        
            updateCurrentEvent();
        }
        
        performer.clock.t0 = t;
        
        GUI.draw(performer);
                                
        window.requestAnimationFrame(loop);
    }
        
    function interact(e) {
        if (e.keyCode >= 49 && e.keyCode <= 51) {
            if (performer.state === "ready") {
                performer.state = "playing";
            } else if (performer.state === "playing") {
                const key = e.keyCode - 48;
                
                if (performer["next_event_" + key]) {
                    performer.ending = false;
                    
                    performer.next_event_index = key;
                    
                    writeLog();
                }
            }
        }
        
        if (e.keyCode === 27) { // Esc
            if (performer.state === "playing") {
                performer.ending = true;
                
                performer.next_event_index = 0;
                
                log += "\n" + performer.clock.master + "| ending";
            } else if (performer.state === "ended") {
                let date = new Date();
                let filename = date.getTime() + ".txt";

                let blob = new Blob([log], {type: "text/plain;charset=utf-8"});
                saveAs(blob, filename);
            }
        }
    }

    polygon1.image = new Image();
    polygon1.image.src = "polygon1-ann-psAs-di/images/polygon1-full.png";
    
    polygon1.image.onload = function onloadImage() {
        GUI.clear();
        
        setTimeout(function waitForBrowser() {
            performer.current_event = {};

            do {
                performer.current_event.part = parseInt(window.prompt(
                    "*** CHOOSE A BEGINNING ***" + "\n\n" +
                    "Type a number between 1 and 11 and click \"OK\"."
                ));
            } while (performer.current_event.part < 1 || performer.current_event.part > 11);

            if (!performer.current_event.part) {
                return;
            }
            
            performer.current_event.part -= 1;

            window.alert("Use a USB triple foot switch or 1, 2, and 3 on the keyboard to interact with the score.");

            performer.current_event.t = 0;

            updateNextEvents();

            performer.next_event_index = 1;
            performer.clock = {
                master: 0,
                delta: 0,
                t0: 0
            };

            performer.state = "ready";

            writeLog();

            GUI.init();

            window.requestAnimationFrame(loop);

            window.onkeyup = interact;
        }, 500);
    };
}