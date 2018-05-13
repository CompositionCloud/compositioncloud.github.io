/*global window, aux, scores, score_types*/

/*jslint es6, for*/

const GUI = (function GUI_() {
    "use strict";
    
    let screen_info = {};
    let elements = {};
    
    let previously_drawn = [];
    
    let large_font_size;
        
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
            elements.annotation3.style.fontSize = (17 * scale) + "px";

            large_font_size = 21 * scale;

            elements.clock.style.fontSize = (21 * scale) + "px";

            elements.next_event_1.width = screen_info.screen_width * 0.16;
            elements.next_event_1.height = elements.next_event_1.width / 0.96;
            elements.next_event_2.width = screen_info.screen_width * 0.16;
            elements.next_event_2.height = elements.next_event_2.width / 0.96;
            elements.next_event_3.width = screen_info.screen_width * 0.16;
            elements.next_event_3.height = elements.next_event_3.width / 0.96;

            previously_drawn = {
                current_event: {score: -1, part: -1},
                next_event_1: {score: -1, part: -1, direction: -1, orientation: -1},
                next_event_2: {score: -1, part: -1, direction: -1, orientation: -1},
                next_event_3: {score: -1, part: -1, direction: -1, orientation: -1}
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
            annotation3: document.getElementById("annotation3"),
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
            function previewAnnotation(event) {
                if (scores[performer[event].score].annotations.type !== "array") {
                    if (scores[performer[event].score].annotations.preview.type === "fixed") {
                        return scores[performer[event].score].annotations.preview.text;
                    }

                    if (scores[performer[event].score].annotations.preview.type === "function") {
                        return scores[performer[event].score].annotations.preview.text(performer[event].part);
                    }
                } else {
                    return scores[performer[event].score].annotations.text[performer[event].part];
                }
            }
                                    
            let annotation1 = "";
            let annotation2 = "";
            let annotation3 = "";
            
            if (scores[performer.current_event.score].annotations.type === "array") {
                elements.annotation1.classList = "next-event";
                elements.annotation2.classList = "current-event";
                elements.annotation3.classList = "next-event";
                
                annotation2 = scores[performer.current_event.score].annotations.text[performer.current_event.part];
                
                if (performer.current_event.part > 0) {
                    annotation1 = "<u>left foot switch:</u><br>" + scores[performer.current_event.score].annotations.text[performer.current_event.part - 1];
                }
                
                if (performer.current_event.part < scores[performer.current_event.score].annotations.text.length - 1) {
                    annotation3 = "<u>right foot switch:</u><br>" + scores[performer.current_event.score].annotations.text[performer.current_event.part + 1];
                }
            } else {
                elements.annotation1.classList = "current-event";
                elements.annotation2.classList = "next-event";
                                
                if (scores[performer.current_event.score].annotations.type === "fixed") {
                    annotation1 = scores[performer.current_event.score].annotations.text;
                }
                
                if (scores[performer.current_event.score].annotations.type === "function") {
                    annotation1 = scores[performer.current_event.score].annotations.text(performer.current_event.part);
                }
                
                if (!performer.next_event_index) {
                    let annotation2_1 = "";
                    let annotation2_2 = "";
                    let annotation2_3 = "";
                    
                    if (performer.next_event_1) {
                        annotation2_1 = previewAnnotation("next_event_1");
                    }
                    
                    if (performer.next_event_2) {
                        annotation2_2 = previewAnnotation("next_event_2");
                    }
                    
                    if (performer.next_event_3) {
                        annotation2_3 = previewAnnotation("next_event_3");
                    }
                    
                    if (annotation2_1 === annotation2_2 && annotation2_1 !== "") {
                        annotation2_2 += " (1)";
                    }
                    
                    if (annotation2_1 !== annotation2_2 && (annotation2_1 === annotation2_3 || annotation2_2 === annotation2_3) && annotation2_3 !== "") {
                        annotation2_3 += " (1)";
                    }
                    
                    if (annotation2_1 === annotation2_2 && annotation2_2 === annotation2_3 && annotation2_1 !== "") {
                        annotation2_3 += " (2)";
                    }
                    
                    if (annotation2_1 !== "") {
                        annotation2 += "<u>left foot switch</u><br>" + annotation2_1 + "<br><br>";
                    }
                    
                    if (annotation2_2 !== "") {
                        annotation2 += "<u>middle foot switch</u><br>" + annotation2_2 + "<br><br>";
                    }
                    
                    if (annotation2_3 !== "") {
                        annotation2 += "<u>right foot switch</u><br>" + annotation2_3 + "<br><br>";
                    }
                } else {
                    const next_event = "next_event_" + performer.next_event_index;
                    
                    const next = "<span style='font-size: " + large_font_size + "px'><b>NEXT</b></span><br><br>";
                    
                    if (scores[performer.current_event.score].annotations.type !== "fixed" && !(performer.current_event.score === 11 && performer[next_event].part < 11)) { // pen1v1v1v1x1x2pencil1
                        annotation2 = next + previewAnnotation(next_event);
                    } else {
                        annotation2 = "";
                    }
                }
            }
            
            elements.annotation1.innerHTML = annotation1;
            elements.annotation2.innerHTML = annotation2;
            elements.annotation3.innerHTML = annotation3;
        }
        
        function drawEvent(performer, event) {
            const ctx = elements[event + "_ctx"];
            
            ctx.fillStyle = scores[performer[event].score].background || "white";
            ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            
            let scale = ctx.canvas.width / 768;
            
            if (score_types[scores[performer[event].score].type].imageCoords) {
                const image_coords = score_types[scores[performer[event].score].type].imageCoords(performer, event, scale);
                const image = scores[performer[event].score].image;
                
                image_coords.forEach(function drawImage(coords) {
                    ctx.drawImage(
                        image,
                        coords.sx,
                        coords.sy,
                        coords.swidth,
                        coords.sheight,
                        coords.dx,
                        coords.dy,
                        coords.dwidth,
                        coords.dheight
                    );
                });
            }
            
            if (score_types[scores[performer[event].score].type].maskCoords) {
                ctx.fillStyle = score_types[scores[performer[event].score].type].mask_color;

                const mask_coords = score_types[scores[performer[event].score].type].maskCoords(performer, event, scale);

                mask_coords.forEach(function drawMask(coords) {
                    ctx.fillRect(
                        coords.x,
                        coords.y,
                        coords.width,
                        coords.height
                    );
                });
            }
                        
            if (score_types[scores[performer[event].score].type].cursor) {
                const cursor = score_types[scores[performer[event].score].type].cursor(performer, event, scale);
                
                ctx.strokeStyle = "red";
                ctx.lineWidth = 2 * scale;
                
                if (cursor.type === "arrow") {
                    ctx.beginPath();
                    ctx.setLineDash([6 * scale, 4 * scale]);
                    ctx.moveTo(ctx.canvas.width / 2, ctx.canvas.height / 2 - cursor.dim.height / 2);
                    ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height / 2 + cursor.dim.height / 2 + cursor.dim.offset);
                    ctx.stroke();
                    
                    ctx.beginPath();
                    ctx.setLineDash([]);
                    ctx.moveTo(ctx.canvas.width / 2, ctx.canvas.height / 2 - cursor.dim.height / 2 - 30 * scale);
                    ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height / 2 - cursor.dim.height / 2 - 10 * scale);
                    ctx.lineTo(ctx.canvas.width / 2 + 5 * scale, ctx.canvas.height / 2 - cursor.dim.height / 2 - 15 * scale);
                    ctx.lineTo(ctx.canvas.width / 2 - 5 * scale, ctx.canvas.height / 2 - cursor.dim.height / 2 - 15 * scale);
                    ctx.lineTo(ctx.canvas.width / 2, ctx.canvas.height / 2 - cursor.dim.height / 2 - 10 * scale);
                    ctx.fillStyle = "red";
                    ctx.fill();
                    ctx.stroke();
                }

                if (cursor.type === "rectangle") {
                    ctx.beginPath();
                    ctx.setLineDash([Math.ceil(6 * scale), Math.ceil(4 * scale)]);
                    ctx.strokeRect(Math.floor((ctx.canvas.width - cursor.dim.width) / 2), Math.floor((ctx.canvas.height - cursor.dim.height) / 2), Math.ceil(cursor.dim.width), Math.ceil(cursor.dim.height));
                }
            }
            
            if (score_types[scores[performer[event].score].type].timer && event === "current_event") {
                ctx.fillStyle = "red";
                ctx.font = (22 * scale) + "px Courier";
                ctx.textAlign = "right";
                ctx.fillText(score_types[scores[performer[event].score].type].timer(performer), ctx.canvas.width - 10 * scale, 30 * scale);
            }
            
            if (scores[performer[event].score].text || score_types[scores[performer[event].score].type].text) {
                const font = score_types[scores[performer[event].score].type].font.split("px ");
                
                ctx.font = (parseInt(font[0]) * scale) + "px " + font[1];
                ctx.textAlign = score_types[scores[performer[event].score].type].align || "left";
                
                if (scores[performer[event].score].text) {
                    if (scores[performer[event].score].parts) {
                        scores[performer[event].score].text.forEach(function drawText(text, index) {
                            const sum = aux.sumArray(performer[event].part, scores[performer[event].score].parts);
                            const spacing = 30 * scale;
                            
                            if (index >= sum && index <= sum + scores[performer[event].score].parts[performer[event].part] - 1) {
                                ctx.fillStyle = "black";
                            } else {
                                ctx.fillStyle = "lightgrey";
                            }

                            ctx.fillText(text, 10 * scale, ctx.canvas.height / 2 - spacing * (sum + (scores[performer[event].score].parts[performer[event].part] - 1) / 2) + index * spacing);
                        });
                    } else {
                        scores[performer[event].score].text.forEach(function drawLine(text, index) {
                            ctx.fillStyle = "black";

                            ctx.fillText(text, 10 * scale, ctx.canvas.height / 2 + (index - scores[performer[event].score].text.length / 2 + 0.5) * 30 * scale);
                        });
                    }
                }
                
                if (score_types[scores[performer[event].score].type].text) {
                    ctx.fillStyle = "black";
                    
                    ctx.fillText(score_types[scores[performer[event].score].type].text(performer), ctx.canvas.width / 2, ctx.canvas.height / 2 + 10 * scale);
                }
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
            }
        }
                
        writeAnnotations(performer);

        let previously_drawn_event = previously_drawn.current_event;

        if (scores[performer.current_event.score].type === "map" || scores[performer.current_event.score].type === "scroll_loop" || (scores[performer.current_event.score].type === "scroll_mod" && performer.current_event.part < 11) || scores[performer.current_event.score].type === "scroll_map" || (scores[performer.current_event.score].type === "pause" && performer.current_event.t > -1) || previously_drawn_event.score !== performer.current_event.score || previously_drawn_event.part !== performer.current_event.part) {
            drawEvent(performer, "current_event");
        }

        previously_drawn_event.score = performer.current_event.score;
        previously_drawn_event.part = performer.current_event.part;

        let i;

        for (i = 1; i <= 3; i += 1) {
            const next_event = "next_event_" + i;

            previously_drawn_event = previously_drawn[next_event];

            if (performer[next_event]) {
                if (previously_drawn_event.score !== performer[next_event].score || previously_drawn_event.part !== performer[next_event].part || previously_drawn_event.direction !== performer[next_event].direction || previously_drawn_event.orientation !== performer[next_event].orientation) {
                    drawEvent(performer, next_event);
                }

                previously_drawn_event.score = performer[next_event].score;
                previously_drawn_event.part = performer[next_event].part;
            } else {
                if (previously_drawn_event.score !== -1) {
                    elements[next_event + "_ctx"].clearRect(0, 0, elements[next_event].width, elements[next_event].height);
                }

                previously_drawn_event = {score: -1, part: -1, direction: -1, orientation: -1};
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
        load: load,
        clear: clear,
        init: init,
        draw: draw
    };
}());