/*global window, scores, score_types*/

/*jslint es6, for, node*/

const aux = (function aux_() {
    "use strict";

    function sumArray(i, array) {
        let sum = 0;

        array.forEach(function addItem(item, index) {
            if (index < i) {
                sum += item;
            }
        });

        return sum;
    }
    
    function loadMedia(from, to, path, audio, init) {
        (function load(i) {
            if (i <= to) {
                if (scores[i].image) {
                    const image_name = scores[i].image;

                    scores[i].image = new Image();
                    scores[i].image.src = path + "images/" + image_name;
                    
                    scores[i].image.onload = function onloadImage() {
                        load(i + 1);
                    };
                } else if (audio && scores[i].audio) {
                    if (scores[i].audio.length === 4) {
                        let j;
                        
                        for (j = 0; j < 4; j += 1) {
                            scores[i].audio[j] = new Audio(path + "audio/" + scores[i].audio[j]);
                            scores[i].audio[j].loop = true;
                        }
                    } else {
                        scores[i].audio = new Audio(path + "audio/" + scores[i].audio);
                        scores[i].audio.loop = true;
                    }
                    
                    load(i + 1);
                } else {
                    load(i + 1);
                }
            } else {
                init();
            }
        }(from));
    }
    
    function choosePerformer() {
        let performer_index;

        do {
            performer_index = window.prompt(
                "*** CHOOSE A PERFORMER ***" + "\n\n" +
                "1. Amit Dubester" + "\n" +
                "2. Daniel More" + "\n" +
                "3. Francesca Naibo" + "\n" +
                "4. Oded Geizhals" + "\n\n" +
                "Type a number between 1 and 4 and click \"OK\"."
            );
            
            if (performer_index !== "monitor") {
                performer_index = parseInt(performer_index);
            } else {
                break;
            }
            
        } while (performer_index < 1 || performer_index > 4);
        
        return performer_index;
    }
    
    function chooseScore(performer_index) {
        let score_index;
        
        const scores = [
            "1. diagram10-2v1" + "\n" + "2. polygon1v1" + "\n" + "3. iS1iS2_x1iS6iS5" + "\n" + "4. iS1iS2iS3" + "\n" + "5. tMs3",
            "1. pencil2" + "\n" + "2. type1v1v1" + "\n" + "3. iS1iS2v1" + "\n" + "4. iS4v1" + "\n" + "5. 3lbclpf7",
            "1. diagram9-8" + "\n" + "2. pen1v1v1v1x1x2pencil1" + "\n" + "3. iS1" + "\n" + "4. iS3x2" + "\n" + "5. 1lnnsib",
            "1. diagram3x1" + "\n" + "2. polygon1" + "\n" + "3. iS1v2iS2" + "\n" + "4. iS5" + "\n" + "5. zr1tS"
        ];
        
        do {
            score_index = parseInt(window.prompt(
                "*** CHOOSE A SCORE ***" + "\n\n" +
                scores[performer_index] + "\n\n" +
                "Type a number between 1 and 5 and click \"OK\"."
            ));
        } while (score_index < 1 || score_index > 5);
        
        return score_index + performer_index * 5;
    }
    
    function chooseBeginning(score_index) {
        let beginning;
        
        do {
            beginning = parseInt(window.prompt(
                "*** CHOOSE A BEGINNING ***" + "\n\n" +
                "Type a number between 1 and " + (scores[score_index].number_of_parts || scores[score_index].parts.length) + " and click \"OK\"."
            ));
        } while (beginning < 1 || beginning > scores[score_index].number_of_parts);
        
        return beginning;
    }
    
    return {
        sumArray: sumArray,
        loadMedia: loadMedia,
        choosePerformer: choosePerformer,
        chooseScore: chooseScore,
        chooseBeginning: chooseBeginning
    };
}());