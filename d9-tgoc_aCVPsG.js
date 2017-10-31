/*global window*/

/*jslint es6, browser, for*/

window.onload = function onload() {
    "use strict";
    
    let d9_tgoc = [];
    let d9_tgoc_canvas;
    let d9_tgoc_canvas_context;
    let main_canvas;
    let main_canvas_context;
    
    document.body.innerHTML = "<div style='text-align: center; color: white'>" +
            "Loading. Please wait." +
            "</div>";
    
    function main() {
        document.body.innerHTML = "<div style='text-align: center'>" +
                "<button id='title' style='background-color: black; border: none; outline: none; user-select: none;'>d9-    tgoc_aCVPsG</button>" +
                "<span id='subtitle' style='user-select: none;'><br>diagrams9 - the_gesture_of_creation; audioControlledVideoPlayer and simpleGranulator<br><br></span>" +
                "<canvas id='canvas' style='user-select: none;'></canvas>" +
                "</div>";
        
        function initCanvas() { 
            let title = document.getElementById("title");
            let subtitle = document.getElementById("subtitle");

            main_canvas.height = Math.max(Math.floor(window.innerHeight * 0.83 / 9) * 9, 504);
            main_canvas.width = main_canvas.height * 16 / 9;

            title.style = "background-color: black; color: lightgrey; font-family: times; font-size: " + Math.floor(main_canvas.height * 0.07) + "px; border: none; outline: none; cursor: pointer; user-select: none;";
            subtitle.style = "color: grey; font-size: " + Math.floor(main_canvas.height * 0.03) + "px; user-select: none;";

            title.onclick = function onclick() {
                window.open("https://ccloudblog.com/2016/08/04/d9-tgoc_acvpsg/", "_blank");
            };

            d9_tgoc_canvas = [];
            d9_tgoc_canvas_context = [];

            let i;

            for (i = 0; i < 8; i += 1) {
                d9_tgoc_canvas.push(document.createElement("canvas"));
                d9_tgoc_canvas[i].width = main_canvas.width;
                d9_tgoc_canvas[i].height = Math.floor(d9_tgoc[i].height * main_canvas.width / 1920);
                d9_tgoc_canvas_context.push(d9_tgoc_canvas[i].getContext("2d"));
                d9_tgoc_canvas_context[i].drawImage(d9_tgoc[i], 0, 0, d9_tgoc_canvas[i].width, d9_tgoc_canvas[i].height);
            }
        }

        navigator.mediaDevices.getUserMedia({audio: true}).then(function getUserMedia(stream) {
            main_canvas = document.getElementById("canvas");
            main_canvas_context = main_canvas.getContext("2d");

            initCanvas();

            window.onresize = initCanvas;

            window.alert("IMPORTANT! Before proceeding set the volume to a low level. Click OK, make some sounds, and raise the volume slowly and carefully to avoid too much feedback (do not use headphones). Click on the title for more information.");


            // audio

            const context = new window.AudioContext();
            const source = context.createMediaStreamSource(stream);
            const analyser = context.createAnalyser();
            const input = context.createScriptProcessor(4096, 1, 1);
            const buffer = context.createBuffer(2, context.sampleRate * 2, context.sampleRate);
            const playback_rate = [0, 1 / 1.08, 1 / 1.14, 1 / 0.12, 1 / 5.2, 1 / 1.6, 1 / 3.6, 1 / 0.05, 1 / 0.09];

            let limit = 0.707946;
            let offset = 0;


            // video

            let perspective = Math.floor(Math.random() * 8) + 1;
            let last_perspective = perspective;
            let direction = 0;
            let frame;

            const range = [10, 8, 8, 9, 10, 8, 8, 10];

            // narative

            let hold = true; // hold a paradigm or a withdrawal for the minimum period of time
            let hold_clock = 0; // compare with the minimum period of holding a paradigm or a withdrawal to determine the value of hold
            let change_clock = 0; // compare with change_time to determine if a breakthrough is about to happen
            let end_black_screen_clock = 0; // compare with end_black_screen_time to determine if a withdrawal is about to end
            let end_black_screen_early = false; // true if a withdrawal is ended sooner than expected
            let end_black_screen = false; // true if a withdrawal is about to end
            let change = false; // true if a breakthrough is about to happen
            let repetition = false; // avoid repeating the same progress
            let change_time = 0; // set when a breakthrough is about to happen
            let end_black_screen_time = 0; // set when a withdrawal is about to end

            source.connect(analyser);
            analyser.smoothingTimeConstant = 1;
            analyser.fftSize = input.bufferSize;
            input.connect(context.destination);
            analyser.connect(input);

            function animationLoop() {
                main_canvas_context.clearRect(0, 0, main_canvas.width, main_canvas.height);

                if (perspective > 0) {
                    main_canvas_context.drawImage(d9_tgoc_canvas[perspective - 1], 0, main_canvas.height * frame, main_canvas.width, main_canvas.height, 0, 0, main_canvas.width, main_canvas.height);
                }

                window.requestAnimationFrame(animationLoop);
            }

            input.onaudioprocess = function onaudioprocess(e) {
                hold_clock += input.bufferSize / context.sampleRate * 1000;
                change_clock += input.bufferSize / context.sampleRate * 1000;
                end_black_screen_clock += input.bufferSize / context.sampleRate * 1000;

                if (perspective !== 0 && hold_clock <= 1000 && end_black_screen_early === true) {
                    limit = (1000 - hold_clock) / 1000 * 18 + 0.707946;
                } else {
                    limit = 0.707946;
                    end_black_screen_early = false;
                }

                const inputArray = new Float32Array(input.bufferSize);

                let rms = 0.5;
                let peak = 0.000001;

                analyser.getFloatTimeDomainData(inputArray);

                let i;

                for (i = 0; i < input.bufferSize; i += 1) {
                    rms += Math.pow(inputArray[i], 2);

                    if (Math.abs(inputArray[i]) > peak) {
                        peak = Math.abs(inputArray[i]);
                    }
                }

                rms /= input.bufferSize;
                rms = Math.pow(rms, 0.5);

                peak = Math.min(peak, limit);
                peak /= limit;

                if ((offset + input.bufferSize) < (context.sampleRate * 2)) {
                    offset += input.bufferSize;
                } else {
                    offset = 0;
                }

                buffer.copyToChannel(e.inputBuffer.getChannelData(0), 0, offset);
                buffer.copyToChannel(e.inputBuffer.getChannelData(0), 1, offset);

                let granulator = context.createBufferSource();

                if (rms >= 0.000032) {
                    // update frame (audio controlled video player)
                    if (perspective > 0) {
                        direction = 1 - direction;
                        frame = Math.min(Math.floor(range[perspective - 1] * (1 + (direction * 2 - 1) * peak)), range[perspective - 1] * 2 - 1);
                    }

                    // simple granulator
                    if (perspective !== 0) {
                        granulator.buffer = buffer;
                        granulator.connect(context.destination);
                        granulator.playbackRate.value = playback_rate[perspective];
                        granulator.start(context.currentTime, Math.random() * 2, input.bufferSize / context.sampleRate * granulator.playbackRate.value);
                    }
                }


                // THE NARRATIVE
                // =============

                // setting hold to false after a minimum period of time: 5 seconds for a paradigm and 1 second for a withdrawal
                if ((perspective !== 0 && hold_clock >= 5000) || (perspective === 0 && hold_clock >= 1000)) {
                    hold = false;
                }

                function newPerspective(old_perspective) {
                    const perspective_array = [1, 2, 3, 4, 5, 6, 7, 8];

                    if (old_perspective > 0) {
                        perspective_array.splice(old_perspective - 1, 1);
                    }

                    return perspective_array[Math.floor(Math.random() * perspective_array.length)];
                }

                // holding a paradigm or a withdrawal for a minimum period of time
                if (!hold) {
                    // checking if progress was made
                    if (frame <= 1 || frame >= range[perspective - 1] - 2) {
                        // avoiding the repetition of the same progress
                        if (!repetition) {
                            repetition = true;
                            // a progress has 1/3 chance of leading to a breakthrough
                            if (Math.floor(Math.random() * 3) === 2) {
                                change_clock = 0;
                                change_time = Math.random() * 4900 + 100;
                                change = true;
                            }
                        }
                        return;
                    }

                    if (perspective === 0 && peak >= 0.8) { // ending a withdrawal sooner than expected
                        hold_clock = 0;
                        hold = true;
                        end_black_screen = false;
                        end_black_screen_early = true;

                        perspective = newPerspective(last_perspective);

                        return;
                    }

                    repetition = false;
                }

                // a breakthrough is about to happen
                if (change && change_clock >= change_time) {

                    // a breakthrough has 1/3 chance of leading to a withdrawal and 2/3 chance of leading to a paradigm shift
                    if (Math.floor(Math.random() * 3) === 2) {
                        last_perspective = perspective;
                        perspective = 0;
                        end_black_screen_clock = 0;
                        end_black_screen_time = Math.random() * 27000 + 3000;
                        end_black_screen = true;
                        granulator.stop();
                    } else {
                        perspective = newPerspective(perspective);
                    }

                    hold_clock = 0;
                    hold = true;
                    change = false;
                    return;
                }

                // a withdrawal is about to end
                if (end_black_screen && end_black_screen_clock >= end_black_screen_time) {
                    hold_clock = 0;
                    hold = true;
                    end_black_screen = false;

                    perspective = newPerspective(last_perspective);

                    return;
                }
            };

            window.requestAnimationFrame(animationLoop);
        }).catch(function error() {
            window.alert("Please allow d9-tgoc_aCVPsG to use your microphone. Click on the title for more information.");
        });
    }

    let i;
    
    for (i = 0; i < 8; i += 1) {
        d9_tgoc.push(new Image());
    }

    d9_tgoc[0].src = "d9-tgoc/d9-1-tgoc.jpg";

    i = 0;
    
    function loadImages() {
        i += 1;

        if (i < 8) {
            d9_tgoc[i].src = "d9-tgoc/d9-" + (i + 1) + "-tgoc.jpg";
            d9_tgoc[i].onload = loadImages;
        } else {
            main();
        }
    }
    
    d9_tgoc[0].onload = loadImages;
};
