/*global window, polygon1, GUI*/

/*jslint es6, for*/

function logReader() {
    "use strict";
    
    GUI.dragAndDrop();
    
    document.body.ondragenter = function ondragenter(e) {
        e.stopPropagation();
        e.preventDefault();
    };

    document.body.ondragover = function ondragover(e) {
        e.stopPropagation();
        e.preventDefault();
    };

    document.body.ondrop = function ondrop(e) {
        e.stopPropagation();
        e.preventDefault();

        let reader = new FileReader();

        reader.readAsText(e.dataTransfer.files[0]);
        reader.onloadend = function read(e) {
            let log = e.target.result.split("\n");

            if (log[0] !== "polygon1-ann-psAs-di-log") {
                window.alert("Invalid File!");
                return;
            }
                        
            polygon1.image = new Image();
            polygon1.image.src = "polygon1-ann-psAs-di/images/polygon1-full.png";

            polygon1.image.onload = function onloadImage() {
                const performer = {};

                let line = 1;

                GUI.load();

                function readLine() {
                    if (log[line][1] === "ending") {
                        performer.ending = true;
                        performer.next_event_index = 0;
                    } else if (log[line][1] === "the end") {
                        performer.state = "ended";
                    } else {
                        performer.ending = false;
                        
                        const temporary_current_event = Object.assign({}, performer.current_event);

                        log[line][1] = log[line][1].split(": ");
                        log[line][1][0] = log[line][1][0].split(",");

                        performer.current_event = {part: parseInt(log[line][1][0][0]), t: parseFloat(log[line][1][0][1])};

                        if (temporary_current_event.part !== performer.current_event.part) {
                            polygon1.previous_part = temporary_current_event.part;
                        }

                        let i;

                        for (i = 1; i <= 3; i += 1) {
                            if (log[line][1][i] !== "[]") {
                                log[line][1][i] = log[line][1][i].split(",");
                                performer["next_event_" + i] = {part: parseInt(log[line][1][i][0]), t: parseInt(log[line][1][i][1])};
                            } else {
                                delete performer["next_event_" + i];
                            }
                        }

                        performer.next_event_index = parseInt(log[line][1][4]);
                    }
                    
                    if (line < log.length - 1) {
                        line += 1;
                        log[line] = log[line].split("| ");
                    }
                }

                function loop(t) {
                    if (performer.state === "playing") {
                        performer.clock.delta = (t - performer.clock.t0) / 1000;
                        performer.clock.master += performer.clock.delta;

                        performer.current_event.t += performer.clock.delta;

                        if (performer.clock.master >= parseFloat(log[line][0])) {
                            readLine();
                        }
                    }

                    performer.clock.t0 = t;

                    GUI.draw(performer);

                    window.requestAnimationFrame(loop);
                }

                function interact(e) {
                    if (e.keyCode >= 49 && e.keyCode <= 51) {
                        if (performer.state === "ready") {
                            performer.state = "playing";
                        }
                    }
                }
            
                GUI.clear();
                                
                performer.clock = {master: 0, delta: 0, t0: 0};
                performer.state = "ready";
                
                log[1] = log[1].split("| ");
                
                readLine();
                
                polygon1.previous_part = performer.current_event.part;

                GUI.init();

                window.requestAnimationFrame(loop);

                window.onkeyup = interact;
            };
        };
    };
}