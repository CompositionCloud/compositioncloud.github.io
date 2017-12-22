/*global window*/
/*jslint es6, for*/

function ccl1GUI() {
    "use strict";
    
    let HTML_elements;
    let width;
    
    // temporary menu
    function menu() {
        const LIST_OF_SCORES = [
            "1. diagram10-2v1" + "\n" +
                    "2. polygon1v1" + "\n" +
                    "3. iS1iS2_x1iS6iS5" + "\n" +
                    "4. iS1iS2iS3" + "\n" +
                    "5. tM12sk33",
            "1. pencil2" + "\n" +
                    "2. type1v1" + "\n" +
                    "3. iS1iS2v1" + "\n" +
                    "4. iS4v1" + "\n" +
                    "5. lbclpf07",
            "1. diagram9-8" + "\n" +
                    "2. pen1v1v1v1x1x2pencil1" + "\n" +
                    "3. iS1" + "\n" +
                    "4. iS3x2" + "\n" +
                    "5. lnnsib",
            "1. diagram3x1" + "\n" +
                    "2. polygon1" + "\n" +
                    "3. iS1v2iS2" + "\n" +
                    "4. iS5" + "\n" +
                    "5. zr1tS"
        ];
        const LIST_OF_BEGINNINGS = [
            [3, 8, 12, 8, 4],
            [16, 28, 4, 6, 2],
            [17, 24, 3, 19, 2],
            [126, 11, 5, 6, 1]
        ];

        let musician;
        let score;
        let beginning;
        
        function chooseMusician() {
            do {
                musician = parseInt(window.prompt(
                    "*** CHOOSE A MUSICIAN ***" + "\n\n" +
                    "1. Amit Dubester" + "\n" +
                    "2. Daniel More" + "\n" +
                    "3. Francesca Naibo" + "\n" +
                    "4. Oded Geizhals" + "\n\n" +
                    "Type a number between 1 and 4 and click \"OK\"."
                ));
            } while (musician < 1 || musician > 4);
            
            if (musician) {
                chooseScore();
            }
        }
        
        function chooseScore() {
            do {
                score = parseInt(window.prompt(
                    "*** CHOOSE A SCORE ***" + "\n\n" +
                    LIST_OF_SCORES[musician - 1] + "\n\n" +
                    "Type a number between 1 and 5 and click \"OK\"."
                ));
            } while (score < 1 || score > 5);
            
            if (score) {
                chooseBeginning();
            } else {
                chooseMusician();
            }
        }
        
        function chooseBeginning() {
            if (!(musician === 4 && score === 5)) {
                do {
                    beginning = parseInt(window.prompt("*** CHOOSE A BEGINNING ***" + "\n\n" + "Type a number between 1 and " + LIST_OF_BEGINNINGS[musician - 1][score - 1] + " and click \"OK\"."));
                } while (beginning < 1 || beginning > LIST_OF_BEGINNINGS[musician - 1][score - 1]);

                if (!beginning) {
                    chooseScore();
                }
            }
        }

        window.alert("Best viewed in full screen at 1280x800 resolution." + "\n\n" + "Use 1, 2, and 3 on the keyboard to interact with the scores. Note that some of them only respond to keys 1 and 3. The score \"zr1tS\" is not interactive.");
        
        chooseMusician();
        
        return {musician: musician, score: score, beginning: beginning - 1};
    }
    
    function loading() {
        document.body.innerHTML =
                "<div style='text-align: center; color: grey; margin-top: 8px'>" +
                "Loading. Please wait." +
                "</div>";
    }
    
    function setScoreHTML() {
        document.body.innerHTML =
                "<div id='window' class='window'>" +
                "   <div id='score-frame' class='score-frame'>" +
                "       <div class='annotations'>" +
                "           <table class='annotations-table'>" +
                "               <tr class='annotations-row'>" +
                "                   <td id='annotation1' />" +
                "               </tr>" +
                "               <tr class='annotations-row'>" +
                "                   <td id='annotation2' />" +
                "               </tr>" +
                "               <tr class='annotations-row'>" +
                "                   <td id='annotation3' />" +
                "               </tr>" +
                "           </table>" +
                "       </div>" +
                "       <div class='score-main'>" +
                "           <canvas id='main-canvas' />" +
                "       </div>" +
                "       <div class='clock-and-previews'>" +
                "           <div class='clock-frame'>" +
                "               <span id='clock' class='clock' />" +
                "           </div>" +
                "           <div class='preview-panel'>" +
                "               <canvas id='preview1' />" +
                "           </div>" +
                "           <div class='preview-panel'>" +
                "               <canvas id='preview2' />" +
                "           </div>" +
                "           <div class='preview-panel'>" +
                "               <canvas id='preview3' />" +
                "           </div>" +
                "       </div>" +
                "   </div>" +
                "</div>";

        HTML_elements = {
            window: document.getElementById("window"),
            score_frame: document.getElementById("score-frame"),
            annotation1: document.getElementById("annotation1"),
            annotation2: document.getElementById("annotation2"),
            annotation3: document.getElementById("annotation3"),
            main_canvas: document.getElementById("main-canvas"),
            clock: document.getElementById("clock"),
            preview1: document.getElementById("preview1"),
            preview2: document.getElementById("preview2"),
            preview3: document.getElementById("preview3")
        };

        HTML_elements.main_ctx = HTML_elements.main_canvas.getContext("2d");
        HTML_elements.preview1_ctx = HTML_elements.preview1.getContext("2d");
        HTML_elements.preview2_ctx = HTML_elements.preview2.getContext("2d");
        HTML_elements.preview3_ctx = HTML_elements.preview3.getContext("2d");
    }
        
    function updateScoreSize() {
        HTML_elements.window.style.width = window.innerWidth + "px";
        HTML_elements.window.style.height = window.innerHeight + "px";

        if (window.innerWidth >= window.innerHeight) {
            width = Math.min(window.innerHeight * 1.6, window.innerWidth);
        } else {
            width = window.innerWidth * 0.9;
        }

        HTML_elements.score_frame.style.width = width + "px";
        HTML_elements.score_frame.style.height = width * 0.625 + "px";

        HTML_elements.annotation1.style.fontSize = Math.round(width / 1280 * 19) + "px";
        HTML_elements.annotation2.style.fontSize = Math.round(width / 1280 * 19) + "px";
        HTML_elements.annotation3.style.fontSize = Math.round(width / 1280 * 19) + "px";

        HTML_elements.main_canvas.width = Math.ceil(width * 0.6);
        HTML_elements.main_canvas.height = Math.ceil(width * 0.625);

        HTML_elements.clock.style.fontSize = Math.round(width / 1280 * 24) + "px";

        HTML_elements.preview1.width = Math.ceil(width * 0.16);
        HTML_elements.preview1.height = Math.ceil(width * 0.16 / 0.96);
        HTML_elements.preview2.width = Math.ceil(width * 0.16);
        HTML_elements.preview2.height = Math.ceil(width * 0.16 / 0.96);
        HTML_elements.preview3.width = Math.ceil(width * 0.16);
        HTML_elements.preview3.height = Math.ceil(width * 0.16 / 0.96);
    }
    
    function drawEvent(events, ctx, preview) {
        function sumArray(array, i) {
            let sum = 0;
            
            array.forEach(function addItem(item, index) {
                if (index < i) {
                    sum += item;
                }
            });
            
            return sum;
        }

        let scale = ctx.canvas.width / 768;
        
        let images = [];
        let text;
        let message;
        
        let mask;
        let cursor;
        let timer;
        
        let part;
        
        let exception;
                
        if (events.score.type === "image-mod") {
            ctx.fillStyle = "white";
            
            if (!preview) {
                part = events.current_event.part;
            } else {
                part = events.next_event.options[preview - 1].part;
            }
            
            events.score.parts[part].forEach(function addPart(part) {
                images.push({
                    sx: part[0],
                    sy: part[1],
                    swidth: part[2],
                    sheight: part[3],
                    dx: 0,
                    dy: 0,
                    dwidth: ctx.canvas.width,
                    dheight: ctx.canvas.height
                });
            });
        }
        
        if (events.score.type === "scroll-loop") {
            ctx.fillStyle = "black";

            events.current_event.subpart %= events.score.image.width;

            if (events.current_event.subpart < 0) {
                events.current_event.subpart += events.score.image.width;
            }

            images.push({
                sx: 0,
                sy: 0,
                swidth: events.score.image.width,
                sheight: events.score.image.height,
                dx: (768 / 2 - events.current_event.subpart) * scale,
                dy: ((800 - events.score.parts[events.current_event.part]) / 2 - sumArray(events.score.parts, events.current_event.part)) * scale,
                dwidth: events.score.image.width * scale,
                dheight: events.score.image.height * scale
            });

            if (events.current_event.subpart < 768 / 2) {
                images.push({
                    sx: 0,
                    sy: 0,
                    swidth: events.score.image.width,
                    sheight: events.score.image.height,
                    dx: (768 / 2 - events.current_event.subpart - events.score.image.width) * scale,
                    dy: ((800 - events.score.parts[events.current_event.part]) / 2 - sumArray(events.score.parts, events.current_event.part)) * scale,
                    dwidth: events.score.image.width * scale,
                    dheight: events.score.image.height * scale
                });
            }
            
            if (events.current_event.subpart > events.score.image.width - 768 / 2) {
                images.push({
                    sx: 0,
                    sy: 0,
                    swidth: events.score.image.width,
                    sheight: events.score.image.height,
                    dx: (768 / 2 - events.current_event.subpart + events.score.image.width) * scale,
                    dy: ((800 - events.score.parts[events.current_event.part]) / 2 - sumArray(events.score.parts, events.current_event.part)) * scale,
                    dwidth: events.score.image.width * scale,
                    dheight: events.score.image.height * scale
                });
            }
            
            mask = {
                color: "rgba(127, 127, 0, 0.5)",
                coord: [
                    {
                        x: 0,
                        y: Math.max(images[0].dy, 0),
                        width: 768 * scale,
                        height: (800 - events.score.parts[events.current_event.part]) / 2 * scale - Math.max(images[0].dy, 0)
                    },
                    {
                        x: 0,
                        y: ((800 + events.score.parts[events.current_event.part]) / 2) * scale,
                        width: 768 * scale,
                        height: (events.score.image.height - sumArray(events.score.parts, events.current_event.part) - events.score.parts[events.current_event.part]) * scale
                    }
                ]
            };

            cursor = {
                type: "arrow",
                dim: {
                    height: events.score.parts[events.current_event.part] * scale,
                    offset: 0
                }
            };
        }
        
        if (events.score.type === "scroll-mod") {
            ctx.fillStyle = "white";
            
            if (!preview) {
                
                // pen1v1v1v1x1x2pencil1 exception
                if (events.current_event.part > 21) {
                    images.push({
                        sx: 0,
                        sy: 800 * (events.current_event.part - 22),
                        swidth: 768,
                        sheight: 800,
                        dx: 0,
                        dy: 0,
                        dwidth: ctx.canvas.width,
                        dheight: ctx.canvas.height
                    });
                    
                    exception = true;
                } else {
                    images.push({
                        sx: Math.floor(events.current_event.part / 2) * events.score.grid,
                        sy: (events.current_event.part % 2 * 4 + events.current_event.direction) * events.score.grid,
                        swidth: events.current_event.duration,
                        sheight: events.score.grid,
                        dx: (768 / 2 - events.current_event.subpart) * scale,
                        dy: (800 - events.score.grid) / 2 * scale,
                        dwidth: events.current_event.duration * scale,
                        dheight: events.score.grid * scale
                    });
                    
                    images.push({
                        sx: Math.floor(events.next_event.options[events.next_event.index].part / 2) * events.score.grid,
                        sy: (events.next_event.options[events.next_event.index].part % 2 * 4 + events.next_event.options[events.next_event.index].direction) * events.score.grid,
                        swidth: events.next_event.options[events.next_event.index].duration,
                        sheight: events.score.grid,
                        dx: (768 / 2 - events.current_event.subpart + events.current_event.duration + events.score.transition(events.current_event.part, events.next_event.options[events.next_event.index].part)) * scale,
                        dy: (800 - events.score.grid) / 2 * scale,
                        dwidth: events.next_event.options[events.next_event.index].duration * scale,
                        dheight: events.score.grid * scale
                    });

                    mask = {
                        color: "rgba(255, 255, 255, 0.5)",
                        coord: [{
                            x: images[1].dx,
                            y: images[1].dy,
                            width: images[1].dwidth,
                            height: images[1].dheight
                        }]
                    };
                
                    if (events.previous_events.length > 0) {
                        let i = 1;
                        let dx = 768 / 2 - (events.score.transition(events.previous_events[events.previous_events.length - i].part, events.current_event.part) + events.current_event.subpart + events.previous_events[events.previous_events.length - i].duration);

                        while (dx >= -800 && events.previous_events[events.previous_events.length - i].part < 22) {
                            images.push({
                                sx: Math.floor(events.previous_events[events.previous_events.length - i].part / 2) * events.score.grid,
                                sy: (events.previous_events[events.previous_events.length - i].part % 2 * 4 + events.previous_events[events.previous_events.length - i].direction) * events.score.grid,
                                swidth: events.previous_events[events.previous_events.length - i].duration,
                                sheight: events.score.grid,
                                dx: dx * scale,
                                dy: (800 - events.score.grid) / 2 * scale,
                                dwidth: events.previous_events[events.previous_events.length - i].duration * scale,
                                dheight: events.score.grid * scale
                            });

                            if (i < events.previous_events.length) {
                                dx -= (events.score.transition(events.previous_events[events.previous_events.length - i - 1].part, events.previous_events[events.previous_events.length - i].part) + events.previous_events[events.previous_events.length - i - 1].duration);

                                i += 1;
                            } else {
                                break;
                            }
                        }
                    }
                                
                    cursor = {
                        type: "arrow",
                        dim: {
                            height: ctx.canvas.height - 60 * scale,
                            offset: 30 * scale
                        }
                    };
                }
            } else {
                // pen1v1v1v1x1x2pencil1 exception
                if (events.next_event.options[preview - 1].part > 21) {
                    // zoom correction
                    let zoom;
                    
                    if (events.next_event.options[preview - 1].part > 22) {
                        zoom = 1;
                    } else {
                        zoom = -0.05;
                    }
                    
                    images.push({
                        sx: 0,
                        sy: 800 * (events.next_event.options[preview - 1].part - 22),
                        swidth: 768,
                        sheight: 800,
                        dx: 0 - zoom * ctx.canvas.width / 2,
                        dy: 0 - zoom * ctx.canvas.height / 2,
                        dwidth: ctx.canvas.width + zoom * ctx.canvas.width,
                        dheight: ctx.canvas.height + zoom * ctx.canvas.height
                    });
                    
                    exception = true;
                } else {
                    images.push({
                        sx: Math.floor(events.next_event.options[preview - 1].part / 2) * events.score.grid,
                        sy: (events.next_event.options[preview - 1].part % 2 * 4 + events.next_event.options[preview - 1].direction) * events.score.grid,
                        swidth: events.next_event.options[preview - 1].duration,
                        sheight: events.score.grid,
                        dx: (ctx.canvas.width - events.next_event.options[preview - 1].duration * scale * 2) / 2,
                        dy: (ctx.canvas.height - events.score.grid * scale * 2) / 2,
                        dwidth: events.next_event.options[preview - 1].duration * scale * 2,
                        dheight: events.score.grid * scale * 2
                    });
                }
            }
        }
        
        if (events.score.type === "scroll-map") {
            ctx.fillStyle = "black";
            
            images.push({
                sx: 0,
                sy: 0,
                swidth: events.score.image.width,
                sheight: events.score.image.height,
                dx: ((768 - events.score.cursor) / 2 - events.current_event.subpart[0]) * scale,
                dy: ((800 - events.score.cursor) / 2 - events.current_event.subpart[1]) * scale,
                dwidth: events.score.image.width * scale,
                dheight: events.score.image.height * scale
            });
            
            mask = {
                color: "rgba(127, 127, 0, 0.5)",
                coord: [
                    {
                        x: 0,
                        y: 0,
                        width: ctx.canvas.width,
                        height: Math.round((ctx.canvas.height - events.score.cursor * scale) / 2)
                    },
                    {
                        x: 0,
                        y: Math.round((ctx.canvas.height - events.score.cursor * scale) / 2) + Math.round(events.score.cursor * scale),
                        width: ctx.canvas.width,
                        height: (ctx.canvas.height - events.score.cursor * scale) / 2
                    },
                    {
                        x: 0,
                        y: Math.round((ctx.canvas.height - events.score.cursor * scale) / 2),
                        width: (ctx.canvas.width - events.score.cursor * scale) / 2,
                        height: Math.round(events.score.cursor * scale)
                    },
                    {
                        x: (ctx.canvas.width + events.score.cursor * scale) / 2,
                        y: Math.round((ctx.canvas.height - events.score.cursor * scale) / 2),
                        width: (ctx.canvas.width - events.score.cursor * scale) / 2,
                        height: Math.round(events.score.cursor * scale)
                    }
                ]
            };
            
            cursor = {
                type: "rectangle",
                dim: {
                    width: events.score.cursor * scale,
                    height: events.score.cursor * scale
                }
            };
        }
        
        if (events.score.type === "map") {
            ctx.fillStyle = "white";
            
            if (events.current_event.subpart < 0 && !preview) {
                let interpolation = (events.score.transition(events.previous_events[events.previous_events.length - 1].part, events.current_event.part) + events.current_event.subpart) / events.score.transition(events.previous_events[events.previous_events.length - 1].part, events.current_event.part);
                    
                images.push({
                    sx: events.score.parts[events.current_event.part][0] * interpolation + events.score.parts[events.previous_events[events.previous_events.length - 1].part][0] * (1 - interpolation) - 768 / 2,
                    sy: events.score.parts[events.current_event.part][1] * interpolation + events.score.parts[events.previous_events[events.previous_events.length - 1].part][1] * (1 - interpolation) - 800 / 2,
                    swidth: 768,
                    sheight: 800,
                    dx: 0,
                    dy: 0,
                    dwidth: ctx.canvas.width,
                    dheight: ctx.canvas.height
                });
                
                timer = Math.abs(events.current_event.subpart) / events.score.speed / 1000;
                timer = timer.toFixed(1);
            } else {
                if (!preview) {
                    part = events.current_event.part;
                    
                    timer = (events.score.duration[part] - events.current_event.subpart) / 1000;
                    timer = timer.toFixed(1);
                } else {
                    part = events.next_event.options[preview - 1].part;
                }
                
                images.push({
                    sx: events.score.parts[part][0] - 768 / 2,
                    sy: events.score.parts[part][1] - 800 / 2,
                    swidth: 768,
                    sheight: 800,
                    dx: 0,
                    dy: 0,
                    dwidth: ctx.canvas.width,
                    dheight: ctx.canvas.height
                });

                cursor = {
                    type: "rectangle",
                    dim: {
                        width: events.score.parts[part][2] * scale,
                        height: events.score.parts[part][3] * scale
                    }
                };
            }
        }
        
        if (events.score.type === "text") {
            ctx.fillStyle = "white";
            text = true;
        }
        
        if (events.score.type === "audio") {
            ctx.fillStyle = "white";
            message = "playing audio";
        }
        
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        
        if (images) {
            let image;
            
            if (exception) {
                image = events.score.image2;
            } else {
                image = events.score.image;
            }
            
            images.forEach(function drawImage(item) {
                ctx.drawImage(
                    image,
                    item.sx,
                    item.sy,
                    item.swidth,
                    item.sheight,
                    Math.floor(item.dx),
                    Math.floor(item.dy),
                    Math.ceil(item.dwidth),
                    Math.ceil(item.dheight)
                );
            });
        }
        
        if (text) {
            ctx.font = Math.round(24 * scale) + "px Helvetica";
            ctx.textAlign = "left";

            // iS1 exception
            if (events.score.annotation.text.length > events.score.parts.length) {
                ctx.fillStyle = "black";
                ctx.fillText(events.score.text[0], Math.round(10 * scale), Math.round(ctx.canvas.height / 2));
            } else {
                events.score.text.forEach(function drawText(line, index) {
                    if (index >= sumArray(events.score.parts, events.current_event.part) && index <= sumArray(events.score.parts, events.current_event.part) + events.score.parts[events.current_event.part] - 1) {
                        ctx.fillStyle = "black";
                    } else {
                        ctx.fillStyle = "lightgrey";
                    }
                    ctx.fillText(line, Math.round(10 * scale), Math.round(ctx.canvas.height / 2 - 30 * scale * (sumArray(events.score.parts, events.current_event.part) + (events.score.parts[events.current_event.part] - 1) / 2) + index * 30 * scale));
                });
            }
        }
        
        if (message) {
            ctx.font = Math.round(32 * scale) + "px Courier";
            ctx.fillStyle = "black";
            ctx.textAlign = "center";
            ctx.fillText(message, Math.round(ctx.canvas.width / 2), Math.round(ctx.canvas.height / 2));
        }
        
        if (mask) {
            ctx.fillStyle = mask.color;
            
            mask.coord.forEach(function drawMask(mask) {
                ctx.fillRect(
                    mask.x,
                    mask.y,
                    mask.width,
                    mask.height
                );
            });
        }
        
        if (cursor) {
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2 * scale;
            
            if (cursor.type === "arrow") {
                ctx.beginPath();
                ctx.setLineDash([Math.ceil(6 * scale), Math.ceil(4 * scale)]);
                ctx.moveTo(Math.round(ctx.canvas.width / 2), Math.round(ctx.canvas.height / 2 - cursor.dim.height / 2));
                ctx.lineTo(Math.round(ctx.canvas.width / 2), Math.round(ctx.canvas.height / 2 + cursor.dim.height / 2 + cursor.dim.offset));
                ctx.stroke();
                ctx.beginPath();
                ctx.setLineDash([]);
                ctx.moveTo(Math.round(ctx.canvas.width / 2), Math.round(ctx.canvas.height / 2 - cursor.dim.height / 2 - 30 * scale));
                ctx.lineTo(Math.round(ctx.canvas.width / 2), Math.round(ctx.canvas.height / 2 - cursor.dim.height / 2 - 10 * scale));
                ctx.lineTo(Math.round(ctx.canvas.width / 2 + 5 * scale), Math.round(ctx.canvas.height / 2 - cursor.dim.height / 2 - 15 * scale));
                ctx.lineTo(Math.round(ctx.canvas.width / 2 - 5 * scale), Math.round(ctx.canvas.height / 2 - cursor.dim.height / 2 - 15 * scale));
                ctx.lineTo(Math.round(ctx.canvas.width / 2), Math.round(ctx.canvas.height / 2 - cursor.dim.height / 2 - 10 * scale));
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
        
        if (timer) {
            ctx.fillStyle = "red";
            ctx.font = Math.round(24 * scale) + "px Courier";
            ctx.textAlign = "right";
            ctx.fillText(timer, ctx.canvas.width - Math.ceil(10 * scale), Math.ceil(50 * scale));
        }
    }
    
    function drawScore(player) {
        if (player.state === "ready") {
            HTML_elements.clock.innerHTML = "--- ready ---";
        }
        
        if (player.state === "playing") {
            let mm = Math.floor(player.clock.master / 60000);
            let ss = Math.floor((player.clock.master - mm * 60000) / 1000);

            if (mm < 10) {
                mm = "0" + mm;
            }

            if (ss < 10) {
                ss = "0" + ss;
            }

            HTML_elements.clock.innerHTML = "--- " + mm + ":" + ss + " ---";
        }
        
        drawEvent(player.events, HTML_elements.main_ctx);
        
        if (player.events.score.network) {
            player.events.next_event.options.forEach(function previewEvent(option, index) {
                let element_name = "preview" + (index + 1);

                drawEvent(player.events, HTML_elements[element_name + "_ctx"], (index + 1));
                
                if (player.events.next_event.index === index && (player.events.score.type !== "image-mod" && !(player.events.score.type === "scroll-mod" && player.events.current_event.part > 21))) { // + pen1v1v1v1x1x2pencil1 exception
                    HTML_elements[element_name].style = "outline: " + Math.round(4 * window.innerWidth / 1280) + "px solid red";
                } else {
                    HTML_elements[element_name].style = "outline: 0px";
                }
            });
            
            if (player.events.next_event.options.length < 3) {
                HTML_elements.preview3_ctx.clearRect(0, 0, HTML_elements.preview3.width, HTML_elements.preview3.height);
                HTML_elements.preview3.style = "outline: 0px";
            }
        }
        
        if (player.events.score.annotation.type === "array" && player.events.score.type !== "image-mod") { // + type1v1 exception
            HTML_elements.annotation1.className = "next-event";
            HTML_elements.annotation2.className = "current-event";
            HTML_elements.annotation3.className = "next-event";
        } else {
            HTML_elements.annotation1.className = "current-event";
            HTML_elements.annotation2.className = "next-event";
        }
        
        
        if (player.events.score.type === "image-mod" || (player.events.score.type === "scroll-mod" && player.events.current_event.part > 21)) {
            // pen1v1v1v1x1x2pencil1 exception
            if (player.events.score.type === "scroll-mod" && player.events.current_event.part > 21) {
                HTML_elements.annotation1.innerHTML = player.events.score.annotation.text(player.events.current_event.part);
            } else if (player.events.score.type === "image-mod") {
                HTML_elements.annotation1.innerHTML = player.events.score.annotation.text[player.events.current_event.part];
            }
            
            HTML_elements.annotation2.innerHTML = "<u>NEXT EVENT</u>";
            
            let annotation = [];
            
            player.events.next_event.options.forEach(function setAnnotation(option, index) {
                // pen1v1v1v1x1x2pencil1 exception
                if (player.events.score.type === "scroll-mod" && player.events.current_event.part > 21) {
                    annotation.push(player.events.score.annotation.text(option.part, true));
                } else if (player.events.score.type === "image-mod") {
                    annotation.push(player.events.score.annotation.text[option.part]);
                }
                
                
                if ((index === 1 && annotation[0] === annotation[1]) || (index === 2 && annotation[0] !== annotation[1] && (annotation[0] === annotation[2] || annotation[1] === annotation[2]))) {
                    HTML_elements.annotation2.innerHTML += "<br><br>pedal " + (index + 1) + ":<br>" + annotation[index] + " (1)";
                } else if (index === 2 && annotation[0] === annotation[1] && annotation[0] === annotation[2]) {
                    HTML_elements.annotation2.innerHTML += "<br><br>pedal " + (index + 1) + ":<br>" + annotation[index] + " (2)";
                } else {
                    HTML_elements.annotation2.innerHTML += "<br><br>pedal " + (index + 1) + ":<br>" + annotation[index] + "";
                }
            });
        } else {
            if (player.events.score.annotation.type === "fixed") {
                HTML_elements.annotation1.innerHTML = player.events.score.annotation.text[0];
            }
            
            if (player.events.score.annotation.type === "array") {
                if (player.events.current_event.part > 0) {
                    HTML_elements.annotation1.innerHTML = player.events.score.annotation.text[player.events.current_event.part - 1];
                } else {
                    HTML_elements.annotation1.innerHTML = "";
                }
                
                HTML_elements.annotation2.innerHTML = player.events.score.annotation.text[player.events.current_event.part];
                
                if (player.events.current_event.part < player.events.score.annotation.text.length - 1) {
                    HTML_elements.annotation3.innerHTML = player.events.score.annotation.text[player.events.current_event.part + 1];
                } else {
                    HTML_elements.annotation3.innerHTML = "";
                }
            }
            
            if (player.events.score.annotation.type === "function") {
                HTML_elements.annotation1.innerHTML = player.events.score.annotation.text(player.events.current_event.part);
                
                if (player.events.score.annotation.text(player.events.current_event.part) !== player.events.score.annotation.text(player.events.next_event.options[player.events.next_event.index].part)) {
                    HTML_elements.annotation2.innerHTML = "<u>NEXT EVENT</u><br><br>" + player.events.score.annotation.text(player.events.next_event.options[player.events.next_event.index].part);
                } else {
                    HTML_elements.annotation2.innerHTML = "";
                }
            }
            
            if (player.events.score.annotation.type === "array + fixed") {
                HTML_elements.annotation1.innerHTML = player.events.score.annotation.text[Math.floor(player.events.current_event.part / 2)] + player.events.score.annotation.fixed;
                                
                if (player.events.score.annotation.text[Math.floor(player.events.current_event.part / 2)] === player.events.score.annotation.text[Math.floor(player.events.next_event.options[player.events.next_event.index].part / 2)]) {
                    HTML_elements.annotation2.innerHTML = "<u>NEXT EVENT</u><br><br>" + player.events.score.annotation.text[Math.floor(player.events.next_event.options[player.events.next_event.index].part / 2)] + " (1)";
                } else {
                    HTML_elements.annotation2.innerHTML = "<u>NEXT EVENT</u><br><br>" + player.events.score.annotation.text[Math.floor(player.events.next_event.options[player.events.next_event.index].part / 2)];
                }
            }
            
            if (player.events.score.annotation.type === "fixed + array + fixed") {
                HTML_elements.annotation1.innerHTML = player.events.score.annotation.fixed1 + player.events.score.annotation.text[player.events.current_event.part] + player.events.score.annotation.fixed2;
                HTML_elements.annotation2.innerHTML = "<u>NEXT EVENT</u><br><br>" + player.events.score.annotation.text[player.events.next_event.options[player.events.next_event.index].part];
            }
        }
    }
    
    return {
        menu: menu,
        loading: loading,
        setScoreHTML: setScoreHTML,
        updateScoreSize: updateScoreSize,
        drawScore: drawScore
    };
}