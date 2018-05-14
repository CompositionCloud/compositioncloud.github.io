/*global window, polygon1*/

/*jslint es6, for*/

const GUI = (function GUI_() {
    "use strict";
    
    let screen_info = {};
    let elements = {};
    
    let previously_drawn = [];
    
    let large_font_size;
    
    function dragAndDrop() {
        document.body.innerHTML = "<div class='simple-text' id='drag-and-drop'>" +
                "Drag and drop a polygon1-ann-psAs-di log file." +
                "</div>";
        
        const drag_and_drop = document.getElementById("drag-and-drop");
        
        drag_and_drop.style.width = window.innerWidth + "px";
        drag_and_drop.style.height = window.innerHeight + "px";
        
        window.onresize = dragAndDrop;
    }
    
    function load() {
        document.body.innerHTML = "<div class='simple-text'>" +
                "Loading." +
                "</div>";
    }
    
    function clear() {
        document.body.innerHTML = "";
    }
                
    function init() {
        function resize() {
            const ratio = 1.6;

            if (window.innerWidth / window.innerHeight <= ratio) {
                screen_info.screen_width = window.innerWidth;
                screen_info.screen_height = screen_info.screen_width / ratio;
            } else {
                screen_info.screen_height = window.innerHeight;
                screen_info.screen_width = screen_info.screen_height * ratio;
            }

            const scale = screen_info.screen_width / 1280;

            elements.frame.style.width = screen_info.screen_width + "px";
            elements.frame.style.height = screen_info.screen_height + "px";

            elements.current_event.width = Math.ceil(screen_info.screen_width * 0.601); // bug correction, supposed to be 0.6
            elements.current_event.height = screen_info.screen_height;

            elements.annotation1.style.fontSize = (17 * scale) + "px";
            elements.annotation2.style.fontSize = (17 * scale) + "px";

            large_font_size = 21 * scale;

            elements.clock.style.fontSize = (21 * scale) + "px";

            elements.next_event_1.width = screen_info.screen_width * 0.16;
            elements.next_event_1.height = elements.next_event_1.width / 0.96;
            elements.next_event_2.width = screen_info.screen_width * 0.16;
            elements.next_event_2.height = elements.next_event_2.width / 0.96;
            elements.next_event_3.width = screen_info.screen_width * 0.16;
            elements.next_event_3.height = elements.next_event_3.width / 0.96;

            previously_drawn = {
                next_event_1: -1,
                next_event_2: -1,
                next_event_3: -1
            };
        }
        
        document.body.innerHTML = "<div class='window' id='window'>" +
                "<div class='screen' id='screen'>" +
                "   <div class='annotations'>" +
                "       <table class='annotations-table'>" +
                "           <tr class='annotations-row'>" +
                "               <td id='annotation1' />" +
                "           </tr>" +
                "           <tr class='annotations-row'>" +
                "               <td id='annotation2' />" +
                "           </tr>" +
                "           <tr class='annotations-row'>" +
                "               <td id='annotation3' />" +
                "           </tr>" +
                "       </table>" +
                "   </div>" +
                "   <div class='main'>" +
                "       <canvas id='current_event' />" +
                "   </div>" +
                "   <div class='clock-and-previews'>" +
                "       <div class='clock-frame'>" +
                "           <span id='clock' class='clock' />" +
                "       </div>" +
                "       <div class='preview-frame'>" +
                "           <canvas id='next_event_1' />" +
                "       </div>" +
                "       <div class='preview-frame'>" +
                "           <canvas id='next_event_2' />" +
                "       </div>" +
                "       <div class='preview-frame'>" +
                "           <canvas id='next_event_3' />" +
                "       </div>" +
                "   </div>" +
                "</div>";
        
        elements = {
            frame: document.getElementById("screen"),
            annotation1: document.getElementById("annotation1"),
            annotation2: document.getElementById("annotation2"),
            current_event: document.getElementById("current_event"),
            clock: document.getElementById("clock"),
            next_event_1: document.getElementById("next_event_1"),
            next_event_2: document.getElementById("next_event_2"),
            next_event_3: document.getElementById("next_event_3")
        };

        elements.current_event_ctx = elements.current_event.getContext("2d");
        elements.next_event_1_ctx = elements.next_event_1.getContext("2d");
        elements.next_event_2_ctx = elements.next_event_2.getContext("2d");
        elements.next_event_3_ctx = elements.next_event_3.getContext("2d");
        
        window.onresize = resize;
        
        resize();
    }
                
    function draw(performer) {
        function writeAnnotations(performer) {
            let annotation1 = "";
            let annotation2 = "";
            
            elements.annotation1.classList = "current-event";
            elements.annotation2.classList = "next-event";
                                
            annotation1 = polygon1.annotations.text(performer.current_event.part);
                
            const next = "<span style='font-size: " + large_font_size + "px'><b>NEXT</b></span><br><br>";

            if (performer.ending) {
                annotation2 = next + "the end";
            } else {
                annotation2 = next + polygon1.annotations.preview.text(performer["next_event_" + performer.next_event_index].part);
            }
            
            elements.annotation1.innerHTML = annotation1;
            elements.annotation2.innerHTML = annotation2;
        }
        
        function drawEvent(performer, event) {
            const ctx = elements[event + "_ctx"];
            
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            
            let scale = ctx.canvas.width / 768;
            
            let sx;
            let sy;

            if (event === "current_event" && performer.current_event.t < 0) {
                let previous_part = polygon1.previous_part;

                const transition = polygon1.transition(previous_part, performer.current_event.part);
                const interpolation = Math.min((performer.current_event.t + transition) / transition, 1);

                sx = polygon1.parts[performer.current_event.part][0] * interpolation + polygon1.parts[previous_part][0] * (1 - interpolation) - 384;
                sy = polygon1.parts[performer.current_event.part][1] * interpolation + polygon1.parts[previous_part][1] * (1 - interpolation) - 400;
            } else {
                sx = polygon1.parts[performer[event].part][0] - 384;
                sy = polygon1.parts[performer[event].part][1] - 400;
            }

            ctx.drawImage(
                polygon1.image,
                sx,
                sy,
                768,
                800,
                0,
                0,
                768 * scale,
                800 * scale
            );
                        
            if (event !== "current_event" || performer.current_event.t >= 0) {
                ctx.strokeStyle = "red";
                ctx.lineWidth = 2 * scale;
                
                ctx.beginPath();
                ctx.setLineDash([Math.ceil(6 * scale), Math.ceil(4 * scale)]);
                ctx.strokeRect(Math.floor((ctx.canvas.width - polygon1.parts[performer[event].part][2] * scale) / 2), Math.floor((ctx.canvas.height - polygon1.parts[performer[event].part][3] * scale) / 2), Math.ceil(polygon1.parts[performer[event].part][2] * scale), Math.ceil(polygon1.parts[performer[event].part][3] * scale));
            }
            
            if (event === "current_event") {
                let timer;
                
                if (performer.current_event.t >= 0) {
                    timer = Math.ceil(Math.max(polygon1.durations[performer.current_event.part] - performer.current_event.t, 0));
                } else {
                    timer = Math.ceil(Math.max(performer.current_event.t * -1, 0));
                }
                
                if (performer.state === "ended") {
                    timer = 0;
                }
                
                ctx.fillStyle = "red";
                ctx.font = (22 * scale) + "px Courier";
                ctx.textAlign = "right";
                ctx.fillText(timer, ctx.canvas.width - 10 * scale, 30 * scale);
            }
        }
        
        function updateClock(performer) {
            if (performer.state === "ready") {
                elements.clock.innerHTML = "--- ready ---";
            } else if (performer.state === "playing") {
                let mm = Math.floor(performer.clock.master / 60);
                let ss = Math.floor(performer.clock.master - mm * 60);

                if (mm < 10) {
                    mm = "0" + mm;
                }

                if (ss < 10) {
                    ss = "0" + ss;
                }
                
                elements.clock.innerHTML = "--- " + mm + ":" + ss + " ---";
            } else if (performer.state === "ended") {
                elements.clock.innerHTML = "-- the end --";
            }
        }
                
        writeAnnotations(performer);

        drawEvent(performer, "current_event");

        let i;

        for (i = 1; i <= 3; i += 1) {
            const next_event = "next_event_" + i;
                        
            if (performer[next_event] && performer[next_event].part !== previously_drawn[next_event]) {
                drawEvent(performer, next_event);
                
                previously_drawn[next_event] = performer[next_event].part;
            } else if (!performer[next_event]) {
                if (previously_drawn[next_event] !== -1) {
                    elements[next_event + "_ctx"].clearRect(0, 0, elements[next_event].width, elements[next_event].height);
                }
                
                previously_drawn[next_event] = -1;
            }

            if (i === performer.next_event_index) {
                elements[next_event].style = "outline: " + (4 * screen_info.screen_width / 1280) + "px solid red";
            } else {
                elements[next_event].style = "outline: 0px";
            }
        }
        
        updateClock(performer);
    }
    
    return {
        dragAndDrop: dragAndDrop,
        load: load,
        clear: clear,
        init: init,
        draw: draw
    };
}());