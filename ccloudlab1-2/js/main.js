/*global window, ccl1GUI, ccl1Data*/
/*jslint es6*/

window.onload = function onload() {
    "use strict";
    
    let GUI = ccl1GUI();
                    
    function score(data, beginning) {
        let player = {
            state: "ready",
            events: {
                score: data
            },
            audio: false,
            clock: {
                master: 0,
                delta: 0,
                t0: 0
            }
        };
        
        function updateNextEvent() {
            let network = [];

            player.events.score.network[player.events.current_event.part].forEach(function copyNetwork(item) {
                network.push(item);
            });

            while (network.length > 3) {
                let max = 0;
                let max_index = -1;

                network.forEach(function compare(item, index) {
                    if (player.events.histogram[network[network.length - index - 1]] > max) {
                        max = player.events.histogram[network[network.length - index - 1]];
                        max_index = network.length - index - 1;
                    }
                });

                if (max_index !== -1) {
                    network.splice(max_index, 1);
                } else {
                    network.splice(network.length - 1, 1);
                }
            }

            player.events.next_event.options = [];

            network.forEach(function addOption(item, index) {
                player.events.next_event.options.push({
                    part: item
                });

                if (player.events.score.type === "map") {
                    player.events.next_event.options[index].duration = player.events.score.duration[item];
                }

                if (player.events.score.type === "scroll-mod") {
                    let direction = Math.floor(Math.random() * 4);

                    while (direction === player.events.previous_direction[item]) {
                        direction = Math.floor(Math.random() * 4);
                    }

                    player.events.next_event.options[index].direction = direction;
                    
                    player.events.next_event.options[index].duration = player.events.score.duration[Math.floor(player.events.next_event.options[index].part / 2)][Math.floor(player.events.next_event.options[index].direction / 2)];

                }
            });
            
            player.events.next_event.index = 0;
        }
        
        function updateEvents() {
            player.events.previous_events.push(player.events.current_event);

            player.events.current_event = player.events.next_event.options[player.events.next_event.index];

            if (player.events.score.transition) { // scroll-mod, map
                player.events.current_event.subpart = player.events.score.transition(
                    player.events.previous_events[player.events.previous_events.length - 1].part,
                    player.events.current_event.part
                ) * -1;
            }

            player.events.histogram[player.events.current_event.part] += 1;

            if (player.events.score.type === "scroll-mod") {
                player.events.previous_direction[player.events.current_event.part] = player.events.current_event.direction;
            }
            
            updateNextEvent();
        }
        
        (function initEvents() {
            player.events.current_event = {
                part: beginning,
                subpart: 0
            };
            
            if (player.events.score.network) { // image-mod, scroll-mod, map
                player.events.previous_events = [];
                player.events.previous_direction = []; // scroll-mod
                player.events.histogram = [];

                player.events.score.network.forEach(function initHistogram() {
                    if (player.events.score.type === "scroll-mod") {
                        player.events.previous_direction.push(-1);
                    }

                    player.events.histogram.push(0);
                });

                player.events.histogram[player.events.current_event.part] += 1;
                
                player.events.next_event = [];
                
                updateNextEvent();
            }

            if (player.events.score.type === "scroll-loop") {
                player.events.current_event.direction = 1;
                player.events.current_event.subpart = player.events.score.image.width * -0.5;
            }
            
            if (player.events.score.type === "scroll-mod") {
                player.events.current_event.direction = Math.floor(Math.random() * 4);
                player.events.current_event.duration = player.events.score.duration[Math.floor(player.events.current_event.part / 2)][Math.floor(player.events.current_event.direction / 2)];
                player.events.previous_direction[player.events.current_event.part] = player.events.current_event.direction;
            }
            
            if (player.events.score.type === "scroll-map") {
                player.events.current_event.part = 0;
                player.events.current_event.subpart = [
                    beginning % Math.floor(player.events.score.image.width / player.events.score.cursor) * player.events.score.cursor + (player.events.score.image.width - Math.floor(player.events.score.image.width / player.events.score.cursor) * player.events.score.cursor) / 2,
                    Math.floor(beginning / Math.floor(player.events.score.image.width / player.events.score.cursor)) * player.events.score.cursor + (player.events.score.image.height - Math.floor(player.events.score.image.height / player.events.score.cursor) * player.events.score.cursor) / 2
                ];
                player.events.current_event.direction = 0;
            }
            
            if (player.events.score.type === "map") {
                player.events.current_event.duration = player.events.score.duration[player.events.current_event.part];
            }
        }());
        
        function loop(t) {
            player.clock.delta = t - player.clock.t0;
            player.clock.t0 = t;

            if (player.state === "playing") {
                player.clock.master += player.clock.delta;
                
                if (player.events.score.type === "audio" && !player.audio) {
                    player.audio = true;
                    
                    // tM12sk3 exception
                    if (player.events.score.audio.length === 4) {
                        player.events.score.audio[player.events.current_event.part].play();
                    } else {
                        player.events.score.audio.play();
                    }
                }
                
                if (player.events.score.type === "scroll-loop") {
                    player.events.current_event.subpart +=
                            player.clock.delta *
                            player.events.score.speed[player.events.current_event.part] *
                            player.events.current_event.direction;
                } else if (player.events.score.type === "scroll-map") {
                    player.events.current_event.subpart[player.events.current_event.direction % 2] +=
                            player.clock.delta *
                            player.events.score.speed *
                            (Math.floor(player.events.current_event.direction / 2) * -2 + 1);
                    
                    player.events.current_event.subpart[0] = Math.min(Math.max(player.events.current_event.subpart[0], 0), player.events.score.image.width - player.events.score.cursor);
                    player.events.current_event.subpart[1] = Math.min(Math.max(player.events.current_event.subpart[1], 0), player.events.score.image.height - player.events.score.cursor);
                    
                    if (player.events.current_event.subpart[0] === 0 && player.events.current_event.direction === 2) {
                        player.events.current_event.direction = 0;
                    }
                    
                    if (player.events.current_event.subpart[1] === 0 && player.events.current_event.direction === 3) {
                        player.events.current_event.direction = 1;
                    }
                    
                    if (player.events.current_event.subpart[0] === player.events.score.image.width - player.events.score.cursor && player.events.current_event.direction === 0) {
                        player.events.current_event.direction = 2;
                    }
                    
                    if (player.events.current_event.subpart[1] === player.events.score.image.height - player.events.score.cursor && player.events.current_event.direction === 1) {
                        player.events.current_event.direction = 3;
                    }
                } else if (player.events.score.speed) {
                    player.events.current_event.subpart +=
                            player.clock.delta *
                            player.events.score.speed;
                }
                
                if (player.events.current_event.duration && player.events.current_event.subpart >= player.events.current_event.duration) {
                    updateEvents();
                }
            }

            
            GUI.drawScore(player);

            window.requestAnimationFrame(loop);
        }

        function interact(e) {
            if (player.state === "playing") {
                if (player.events.score.type === "image-mod" || (player.events.score.type === "scroll-mod" && player.events.current_event.part > 21)) { // + pen1v1v1v1x1x2pencil1 exception
                    if (e.keyCode === 49) {
                        player.events.next_event.index = 0;
                        updateEvents();
                    }
                    
                    if (e.keyCode === 50) {
                        player.events.next_event.index = 1;
                        updateEvents();
                    }
                    
                    if (e.keyCode === 51 && player.events.next_event.options.length > 2) {
                        player.events.next_event.index = 2;
                        updateEvents();
                    }
                } else if (player.events.score.type === "scroll-mod" || player.events.score.type === "map") {
                    if (e.keyCode === 49) {
                        player.events.next_event.index = 0;
                    }
                    
                    if (e.keyCode === 50) {
                        player.events.next_event.index = 1;
                    }
                    
                    if (e.keyCode === 51 && player.events.next_event.options.length > 2) {
                        player.events.next_event.index = 2;
                    }
                } else if (player.events.score.type === "scroll-map") {
                    if (e.keyCode === 49) {
                        if (player.events.current_event.direction !== 0) {
                            player.events.current_event.direction = 0;
                        } else if (player.events.current_event.direction === 0) {
                            player.events.current_event.direction = 2;
                        }
                    }
                    
                    if (e.keyCode === 51) {
                        if (player.events.current_event.direction !== 1) {
                            player.events.current_event.direction = 1;
                        } else if (player.events.current_event.direction === 1) {
                            player.events.current_event.direction = 3;
                        }
                    }
                } else if (player.events.score.type === "audio") {
                    if (e.keyCode === 49 && player.events.current_event.part > 0) {
                        // tM12sk3 exception
                        if (player.events.score.audio.length === 4) {
                            player.events.score.audio[player.events.current_event.part].pause();
                            player.events.score.audio[player.events.current_event.part - 1].play();
                        }
                        
                        player.events.current_event.part -= 1;
                    }
                    
                    if (e.keyCode === 51 && player.events.current_event.part < player.events.score.annotation.text.length - 1) {
                        // tM12sk3 exception
                        if (player.events.score.audio.length === 4) {
                            player.events.score.audio[player.events.current_event.part].pause();
                            player.events.score.audio[player.events.current_event.part + 1].play();
                        }
                        
                        player.events.current_event.part += 1;
                    }
                } else {
                    if (e.keyCode === 49 && player.events.current_event.part > 0) {
                        player.events.current_event.part -= 1;
                    }
                    
                    // iS1 exception
                    if (player.events.score.annotation.text.length > player.events.score.parts.length) {
                        if (e.keyCode === 51 && player.events.current_event.part < player.events.score.annotation.text.length - 1) {
                            player.events.current_event.part += 1;
                        }
                    } else {
                        if (e.keyCode === 51 && player.events.current_event.part < player.events.score.parts.length - 1) {
                            player.events.current_event.part += 1;
                        }
                    }
                    
                    if (player.events.score.type === "scroll-loop" && e.keyCode === 50) {
                        player.events.current_event.direction *= -1;
                    }
                }
            }
            
            if (player.state === "ready" && e.keyCode >= 49 && e.keyCode <= 51) {
                player.state = "playing";
            }
        }
    
        GUI.setScoreHTML();
        GUI.updateScoreSize();
        
        window.onresize = GUI.updateScoreSize;
        window.onkeyup = interact;
        window.requestAnimationFrame(loop);
    }
    
    // make sure the background is black before the menu appears
    setTimeout(function start() {
        let choice = GUI.menu();

        if (!choice.musician) {
            return;
        }

        GUI.loading();

        let image;

        if (choice.musician === 1 && choice.score === 1) {
            image = new Image();
            image.src = "ccloudlab1-2/images/diagram10-2v1-offset.png";
            image.onload = function () {
                score(ccl1Data(1, image), choice.beginning);
            };
        }

        if (choice.musician === 1 && choice.score === 2) {
            image = new Image();
            image.src = "ccloudlab1-2/images/polygon1v1-full.png";
            image.onload = function () {
                score(ccl1Data(2, image), choice.beginning);
            };
        }

        if (choice.musician === 2 && choice.score === 1) {
            image = new Image();
            image.src = "ccloudlab1-2/images/pencil2-mod.png";
            image.onload = function () {
                score(ccl1Data(6, image), choice.beginning);
            };
        }

        if (choice.musician === 2 && choice.score === 2) {
            image = new Image();
            image.src = "ccloudlab1-2/images/type1v1-mod.png";
            image.onload = function () {
                score(ccl1Data(7, image), choice.beginning);
            };
        }

        if (choice.musician === 3 && choice.score === 1) {
            image = new Image();
            image.src = "ccloudlab1-2/images/diagram9-8-offset.jpg";
            image.onload = function () {
                score(ccl1Data(11, image), choice.beginning);
            };
        }

        if (choice.musician === 3 && choice.score === 2) {
            image = [new Image(), new Image()];
            image[0].src = "ccloudlab1-2/images/pen1v1v1v1x1x2pencil1-mod_1.png";
            image[0].onload = function () {
                image[1].src = "ccloudlab1-2/images/pen1v1v1v1x1x2pencil1-mod_2.png";
                image[1].onload = function () {
                    score(ccl1Data(12, image), choice.beginning);
                };
            };
        }

        if (choice.musician === 4 && choice.score === 1) {
            image = new Image();
            image.src = "ccloudlab1-2/images/diagram3x1.png";
            image.onload = function () {
                score(ccl1Data(16, image), choice.beginning);
            };
        }

        if (choice.musician === 4 && choice.score === 2) {
            image = new Image();
            image.src = "ccloudlab1-2/images/polygon1-full.png";
            image.onload = function () {
                score(ccl1Data(17, image), choice.beginning);
            };
        }

        if (choice.score > 2) {
            score(ccl1Data((choice.musician - 1) * 5 + choice.score), choice.beginning);
        }
    }, 10);
};