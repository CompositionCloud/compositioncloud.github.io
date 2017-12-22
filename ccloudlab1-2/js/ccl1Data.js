/*jslint es6, for*/

function ccl1Data(score, image) {
    "use strict";
  
    // diagram10-2v1
    if (score === 1) {
        return {
            type: "scroll-loop",
            image: image,
            parts: [
                576,
                719,
                446
            ],
            speed: [
                0.017432,
                0.013960,
                0.022500
            ],
            annotation: {
                type: "array",
                text: [
                    "percussive sounds",
                    "percussive sounds and low tones",
                    "percussive sounds and air sounds"
                ]
            }
        };
    }
    
    // polygon1v1
    if (score === 2) {
        return {
            type: "map",
            image: image,
            parts: [
                [453, 1191, 58, 57],
                [931, 1118, 111, 88],
                [1261, 1520, 90, 76],
                [1605, 1220, 69, 68],
                [1581, 1494, 210, 165],
                [1570, 1718, 96, 101],
                [1656, 1379, 71, 68],
                [1713, 1517, 96, 96]
            ],
            duration: [
                10404,
                21218,
                15987,
                13513,
                45000,
                22121,
                13050,
                20454
            ],
            network: [
                [1, 2],
                [0, 2, 3],
                [4, 5, 3, 1, 0],
                [6, 4, 2, 1],
                [7, 6, 5, 3, 2],
                [4, 7, 2],
                [4, 7, 3],
                [4, 6, 5]
            ],
            transition: function transition(from, to) {
                let transitions = [];
                
                let i;
                
                for (i = 0; i < 8; i += 1) {
                    transitions.push([]);
                }
                
                transitions[0][1] = 21804;
                transitions[0][2] = 27815;
                
                transitions[1][0] = 21804;
                transitions[1][2] = 22469;
                transitions[1][3] = 25120;
                
                transitions[2][0] = 27815;
                transitions[2][1] = 22469;
                transitions[2][3] = 21297;
                transitions[2][4] = 18404;
                transitions[2][5] = 19440;
                
                transitions[3][1] = 25120;
                transitions[3][2] = 21297;
                transitions[3][4] = 17281;
                transitions[3][6] = 14071;
                
                transitions[4][2] = 18404;
                transitions[4][3] = 17281;
                transitions[4][5] = 15871;
                transitions[4][6] = 12963;
                transitions[4][7] = 12843;
                
                transitions[5][2] = 19440;
                transitions[5][4] = 15871;
                transitions[5][7] = 16504;
                
                transitions[6][3] = 14071;
                transitions[6][4] = 12963;
                transitions[6][7] = 13428;
                
                transitions[7][4] = 12843;
                transitions[7][5] = 16504;
                transitions[7][6] = 13428;
                
                return transitions[from][to];
            },
            speed: 1,
            annotation: {
                type: "fixed",
                text: ["<u>static image</u><br><br>each different color in the shape enclosed by the dashed rectangle indicates a different multiphonic<br><br><br><u>moving image</u><br><br>[white background]<br>silence<br><br>[foggy background]<br>air sounds"]
            }
        };
    }
    
    // iS1iS2_x1iS6iS5
    if (score === 3) {
        return {
            type: "text",
            text: [
                "] 3 & [ { }",
                "many",
                ", entangled",
                "",
                "{an irritating hassle that will disappear when",
                "a lot of threads",
                "[",
                "-",
                "",
                "just the flatness of some dust left in a big closed box",
                ". /",
                "   [trying to dissolve into, . 123 ^^  ^  . ^",
                "",
                "   ^",
                "",
                "",
                "a babble in the background",
                "                                 . - - / // / (& the excess of things",
                "                                                                       is just some light",
                ".",
                ".",
                "   _- -  -    - -",
                "nothing more than a wide, stagnant",
                "."
            ],
            parts: [
                1,
                3,
                1,
                1,
                3,
                1,
                6,
                1,
                1,
                1,
                3,
                2
            ],
            annotation: {
                type: "array",
                text: [
                    "dots, dashes, underscores, slashes, and brackets indicate the inclusion of different percussive sounds",
                    "very active and complicated playing with many notes",
                    "screeching sounds",
                    "very active and complicated playing with many notes",
                    "(percussive sounds)",
                    "long air sounds, with mouthpiece (into and a bit away from mouthpiece) and without mouthpiece (a bit away from mouthpiece) (no whistles), incorporating flutter-tongue and trills, and shaking tube",
                    "more pauses, some accents in the end",
                    "fast incomprehensible speaking into tube",
                    "(percussive sounds) becoming more and more active",
                    "long high tones, slightly fluctuating in pitch",
                    "(percussive sounds)",
                    "long low tones, steady pitch"
                ]
            }
        };
    }
    
    // iS1iS2iS3
    if (score === 4) {
        return {
            type: "text",
            text: [
                "playing in the junkyard... m \\ scattered",
                "45g xc",
                "",
                ", entangled",
                "qwk0-0,",
                "mU,       gzoO; wqappPQ?U0O + .   s     S >>",
                "mn786\"@$% $| aqwqp     Ö Ü ´´´´",
                ". ..  .    cN ; / a     O",
                "   §:\" 1] $",
                "             ] }",
                "",
                "[ small, even tiny      IN",
                ". /",
                "{0,\"in its ",
                "\"complexity, relative\" significance\"",
                "                                                                 \\\\\\      \\\\ \\\\                               1,",
                "           \\\\",
                "\\\\\\\\\\ //// / //    \\\\\\                      \\\\\\\\\\\\\\\\\\\\",
                "         \\\\",
                "                   \\\\\\ \\\\\\ // \\\\\\\\\\/\\/\\\\\\\\\\\\\\",
                "       /                                                 ****",
                "       \\                                                                      ******************",
                "  ********************",
                "                               | /        //  **",
                "                 /                                   \\       \\\\\\\\",
                " /",
                "                                                                                   * { / /        /could be",
                "",
                "muted agitation - some light but",
                ",  a",
                "cre-",
                "-eaaeaeaaeekkkkk",
                "== creakingly",
                "",
                "maybe                                   **                           */ //",
                "                                                                                                             2:",
                "                                                                                                               ?",
                "",
                "crawling like a"
            ],
            parts: [
                3,
                8,
                4,
                13,
                1,
                5,
                4,
                1
            ],
            annotation: {
                type: "array",
                text: [
                    "without mouthpiece, whistle sounds, rubbing tube with plastic card",
                    "without mouthpiece, syllables",
                    "with sax mouthpiece, soft long tones, simple multiphonics, complex multiphonics",
                    "with trumpet mouthpiece, percussive sounds",
                    "with sax mouthpiece, very soft high tone, constantly changing intonation, timbre, and dynamics (within very soft)",
                    "with sax mouthpiece, low tone, beating with voice",
                    "with sax mouthpiece, percussive sounds",
                    "without mouthpiece, whistle sounds, plastic card, slowly fading"
                ]
            }
        };
    }
    
    let audio;
    
    // tM12sk3
    if (score === 5) {
        audio = [
            new Audio("ccloudlab1-2/audio/tpc-MBP12-slpAwkup-key-3_1.mp3"),
            new Audio("ccloudlab1-2/audio/tpc-MBP12-slpAwkup-key-3_2.mp3"),
            new Audio("ccloudlab1-2/audio/tpc-MBP12-slpAwkup-key-3_3.mp3"),
            new Audio("ccloudlab1-2/audio/tpc-MBP12-slpAwkup-key-3_4.mp3")
        ];
        
        audio.forEach(function loopAudio(item) {
            item.loop = true;
        });
        
        return {
            type: "audio",
            audio: audio,
            annotation: {
                type: "array",
                text: [
                    "chaotic singing and playing, lots of low tones",
                    "following melody",
                    "very high whistle and air sounds",
                    "chaotic singing and playing, lots of low tones"
                ]
            }
        };
    }
    
    // pencil2
    if (score === 6) {
        return {
            type: "scroll-mod",
            image: image,
            grid: 800,
            duration: [
                [774, 213],
                [371, 135],
                [108, 66],
                [77, 65],
                [90, 76],
                [155, 69],
                [25, 21],
                [60, 60]
            ],
            network: [
                [4, 2, 5, 8, 9],
                [2, /*7, */6],
                [9, 10, 12, 13, 8, 7, 14],
                [4, 5, 1, 8, 0],
                [2, 8, 1, 9],
                [2, 1, 9],
                [3, 12, 10, 14, 0],
                [12, 14, 0],
                [10, 3, 12, 13, 5, 4, 1],
                [3, 5, 2, 1],
                [13, 12, 14],
                [13, 9, 12, 3, 15, 7],
                [10, 14, 15, 3, 9, 11],
                [10, 14, 3, 9, 15, 11,/* 7, */6],
                [13, 12, 10],
                [13, 12, 3, 11, 7/*, 6*/]
            ],
            transition: function transition(from, to) {
                let transitions = [];
                
                let i;
                
                for (i = 0; i < 16; i += 1) {
                    transitions.push([]);
                }
                
                transitions[0][2] = 107;
                transitions[0][4] = 100;
                transitions[0][5] = 126;
                transitions[0][8] = 196;
                transitions[0][9] = 215;

                transitions[1][2] = 278;
                transitions[1][6] = 300;
/*
                transitions[1][7] = 294;
*/

                transitions[2][7] = 83;
                transitions[2][8] = 81;
                transitions[2][9] = 42;
                transitions[2][10] = 55;
                transitions[2][12] = 56;
                transitions[2][13] = 64;
                transitions[2][14] = 88;

                transitions[3][0] = 278;
                transitions[3][1] = 107;
                transitions[3][4] = 29;
                transitions[3][5] = 68;
                transitions[3][8] = 156;

                transitions[4][1] = 126;
                transitions[4][2] = 68;
                transitions[4][8] = 116;
                transitions[4][9] = 132;

                transitions[5][1] = 100;
                transitions[5][2] = 29;
                transitions[5][9] = 162;

                transitions[6][0] = 294;
                transitions[6][3] = 83;
                transitions[6][10] = 115;
                transitions[6][12] = 105;
                transitions[6][14] = 121;

                transitions[7][0] = 300;
                transitions[7][12] = 117;
                transitions[7][14] = 138;

                transitions[8][1] = 215;
                transitions[8][3] = 42;
                transitions[8][4] = 162;
                transitions[8][5] = 132;
                transitions[8][10] = 41;
                transitions[8][12] = 63;
                transitions[8][13] = 65;
                
                transitions[9][1] = 196;
                transitions[9][2] = 156;
                transitions[9][3] = 81;
                transitions[9][5] = 116;

                transitions[10][12] = 102;
                transitions[10][13] = 96;
                transitions[10][14] = 120;

                transitions[11][3] = 55;
                transitions[11][7] = 115;
                transitions[11][9] = 41;
                transitions[11][12] = 43;
                transitions[11][13] = 39;
                transitions[11][15] = 85;

                transitions[12][3] = 64;
                transitions[12][9] = 65;
                transitions[12][10] = 39;
                transitions[12][11] = 96;
                transitions[12][14] = 48;
                transitions[12][15] = 63;

                transitions[13][3] = 56;
                transitions[13][6] = 117;
/*
                transitions[13][7] = 105;
*/
                transitions[13][9] = 63;
                transitions[13][10] = 43;
                transitions[13][11] = 102;
                transitions[13][14] = 50;
                transitions[13][15] = 69;

                transitions[14][10] = 85;
                transitions[14][12] = 69;
                transitions[14][13] = 63;

                transitions[15][3] = 88;
/*
                transitions[15][6] = 138;
*/
                transitions[15][7] = 121;
                transitions[15][11] = 120;
                transitions[15][12] = 50;
                transitions[15][13] = 48;
                
                return transitions[from][to];
            },
            speed: 0.007,
            annotation: {
                type: "array + fixed",
                text: [
                    "electric toothbrush with speed control, multiple motors during (and/or after) the black chaotic part, moving objects chaotically in the colorful chaotic part",
                    "yellow electric frothing wand, then multiple motors",
                    "low motor sounds (two motors)",
                    "low motor sounds (one motor)",
                    "rubber bands on wooden box",
                    "rubber bands on plastic package",
                    "rubber bands on ceramic jar",
                    "rubber bands on ceramic jar"
                ],
                fixed: "<br><br>[white background]<br>silence"
            }
        };
    }
    
    // type1v1
    function modToCoord(m1, m2, m3, m4, m5, m6) {
        let coord = [];

        if (m1) {
            coord.push([0, 0, 768, 800]);
        }
        
        if (m2) {
            coord.push([0, 800, 768, 800]);
        }
        
        if (m3) {
            coord.push([0, 1600, 768, 800]);
        }
        
        if (m4) {
            coord.push([0, 2400, 768, 800]);
        }
        
        if (m5) {
            coord.push([0, 3200, 768, 800]);
        }
        
        if (m6) {
            coord.push([0, 4000, 768, 800]);
        }

        return coord;
    }
    
    function modToAnnotation(m1, m2, m3, m4, m5, m6) {
        let annotation = "";
        
        let motors = [
            "",
            "1-2 motors ",
            "2-4 motors ",
            "3-6 motors "
        ];
        
        annotation = motors[m1 + m2 + m3];
        
        if (m6) {
            if (annotation === "") {
                annotation = "rubber bands ";
            } else {
                annotation += "and rubber bands ";
            }
        }
        
        if (m4 && !m5) {
            annotation += "on 1st resonator";
        } else if (!m4 && m5) {
            annotation += "on 2nd resonator";
        } else if (m4 && m5) {
            annotation += "on both resonators";
        }
        
        return annotation;
    }
    
    if (score === 7) {
        return {
            type: "image-mod",
            image: image,
            parts: [
                modToCoord(1, 0, 0, 1, 0, 0),
                modToCoord(0, 1, 0, 1, 0, 0),
                modToCoord(0, 0, 1, 1, 0, 0),
                modToCoord(1, 1, 0, 1, 0, 0),
                modToCoord(1, 0, 1, 1, 0, 0),
                modToCoord(0, 1, 1, 1, 0, 0),
                modToCoord(1, 1, 1, 1, 0, 0),
                modToCoord(1, 0, 0, 1, 1, 0),
                modToCoord(0, 1, 0, 1, 1, 0),
                modToCoord(0, 0, 1, 1, 1, 0),
                modToCoord(1, 1, 0, 1, 1, 0),
                modToCoord(1, 0, 1, 1, 1, 0),
                modToCoord(0, 1, 1, 1, 1, 0),
                modToCoord(1, 1, 1, 1, 1, 0),
                modToCoord(1, 0, 0, 0, 1, 0),
                modToCoord(0, 1, 0, 0, 1, 0),
                modToCoord(0, 0, 1, 0, 1, 0),
                modToCoord(1, 1, 0, 0, 1, 0),
                modToCoord(1, 0, 1, 0, 1, 0),
                modToCoord(0, 1, 1, 0, 1, 0),
                modToCoord(1, 1, 1, 0, 1, 0),
                modToCoord(1, 0, 0, 1, 1, 1),
                modToCoord(0, 1, 0, 1, 1, 1),
                modToCoord(0, 0, 1, 1, 1, 1),
                modToCoord(1, 0, 0, 0, 1, 1),
                modToCoord(0, 1, 0, 0, 1, 1),
                modToCoord(0, 0, 1, 0, 1, 1),
                modToCoord(0, 0, 0, 0, 1, 1)
            ],
            network: [
                [3, 4, 7, 14],
                [3, 5, 8, 15],
                [4, 5, 9, 16],
                [0, 1, 6, 10, 17],
                [0, 2, 6, 11, 18],
                [1, 2, 6, 12, 19],
                [3, 4, 5, 13, 20],
                [10, 11, 0, 14, 21],
                [10, 12, 1, 15, 22],
                [11, 12, 2, 16, 23],
                [7, 8, 13, 3, 17],
                [7, 9, 13, 4, 18],
                [8, 9, 13, 5, 19],
                [10, 11, 12, 6, 20],
                [17, 18, 0, 7, 24, 27],
                [17, 19, 1, 8, 25, 27],
                [18, 19, 2, 9, 26, 27],
                [14, 15, 20, 3, 10],
                [14, 16, 20, 4, 11],
                [15, 16, 20, 5, 12],
                [17, 18, 19, 6, 13],
                [7, 24],
                [8, 25],
                [9, 26],
                [14, 21, 27],
                [15, 22, 27],
                [16, 23, 27],
                [24, 25, 26, 14, 15, 16]
            ],
            annotation: {
                type: "array",
                text: [
                    modToAnnotation(1, 0, 0, 1, 0, 0),
                    modToAnnotation(0, 1, 0, 1, 0, 0),
                    modToAnnotation(0, 0, 1, 1, 0, 0),
                    modToAnnotation(1, 1, 0, 1, 0, 0),
                    modToAnnotation(1, 0, 1, 1, 0, 0),
                    modToAnnotation(0, 1, 1, 1, 0, 0),
                    modToAnnotation(1, 1, 1, 1, 0, 0),
                    modToAnnotation(1, 0, 0, 1, 1, 0),
                    modToAnnotation(0, 1, 0, 1, 1, 0),
                    modToAnnotation(0, 0, 1, 1, 1, 0),
                    modToAnnotation(1, 1, 0, 1, 1, 0),
                    modToAnnotation(1, 0, 1, 1, 1, 0),
                    modToAnnotation(0, 1, 1, 1, 1, 0),
                    modToAnnotation(1, 1, 1, 1, 1, 0),
                    modToAnnotation(1, 0, 0, 0, 1, 0),
                    modToAnnotation(0, 1, 0, 0, 1, 0),
                    modToAnnotation(0, 0, 1, 0, 1, 0),
                    modToAnnotation(1, 1, 0, 0, 1, 0),
                    modToAnnotation(1, 0, 1, 0, 1, 0),
                    modToAnnotation(0, 1, 1, 0, 1, 0),
                    modToAnnotation(1, 1, 1, 0, 1, 0),
                    modToAnnotation(1, 0, 0, 1, 1, 1),
                    modToAnnotation(0, 1, 0, 1, 1, 1),
                    modToAnnotation(0, 0, 1, 1, 1, 1),
                    modToAnnotation(1, 0, 0, 0, 1, 1),
                    modToAnnotation(0, 1, 0, 0, 1, 1),
                    modToAnnotation(0, 0, 1, 0, 1, 1),
                    modToAnnotation(0, 0, 0, 0, 1, 1)
                ]
            }
        };
    }
    
    // iS1iS2v1
    if (score === 8) {
        return {
            type: "text",
            text: [
                "the shortest creak",
                "once in a while",
                "muted agitation - some",
                "creakingly crawling like [ small, even tiny]",
                "",
                "sh"
            ],
            parts: [
                2,
                1,
                2,
                1
            ],
            annotation: {
                type: "array",
                text: [
                    "soft rubber bands, \"once in a while\"",
                    "soft rubber bands, somewhat \"agitating\"",
                    "short interrupted motor sounds",
                    "soft static noise-like motor sound"
                ]
            }
        };
    }
    
    // iS4v1
    if (score === 9) {
        return {
            type: "text",
            text: [
                "this,",
                "as if in a garage",
                "        ~ ZZJH",
                "XUO",
                "(PPP { noisy,",
                "almost a pulse, but still irregular, expanding.",
                "",
                "  trying to interact with, high, short (p l . .. . . k p^",
                "  {",
                "J"
            ],
            parts: [
                2,
                1,
                1,
                1,
                2,
                3
            ],
            annotation: {
                type: "array",
                text: [
                    "loud low motor sounds",
                    "high motor sounds",
                    "soft high motor sounds",
                    "soft motor sounds of unclear pitches",
                    "\"almost a pulse\" (rubber bands), crescendo (motors)",
                    "only rubber bands"
                ]
            }
        };
    }
    
    // lbclpf07
    if (score === 10) {
        audio = new Audio("ccloudlab1-2/audio/31487__lonemonk__bar-crowd-logans-pub-feb-2007.mp3");
        audio.loop = true;
        
        return {
            type: "audio",
            audio: audio,
            crossfade: true,
            annotation: {
                type: "array",
                text: [
                    "imitate the atmosphere of many people talking at the same time",
                    "follow just a single voice and imitate it using only a single motor"
                ]
            }
        };
    }
    
    // diagram9-8
    if (score === 11) {
        return {
            type: "scroll-loop",
            image: image,
            parts: [
                112,
                16,
                208,
                16,
                160,
                16,
                160,
                16,
                192,
                16,
                16,
                752,
                16,
                144,
                16,
                160,
                144
            ],
            speed: [
                0.052915,
                0.140000,
                0.038829,
                0.140000,
                0.044272,
                0.140000,
                0.044272,
                0.140000,
                0.040415,
                0.140000,
                0.140000,
                0.020421,
                0.140000,
                0.046667,
                0.140000,
                0.044272,
                0.046667
            ],
            annotation: {
                type: "fixed",
                text: ["[grey background]<br>AM noise, altered by touching circuit board<br><br>[white background]<br>soft FM noise<br><br>[light turquoise background]<br>between battery and trackpad<br><br>[green turquoise background]<br>between battery and trackpad, altered by touching circuit board<br><br>[black rectangles]<br>different stations<br><br>[black curves]<br>feedback"]
            }
        };
    }
    
    // pen1v1v1v1x1x2pencil1
    if (score === 12) {
        return {
            type: "scroll-mod",
            image: image[0],
            image2: image[1],
            grid: 400,
            duration: [
                [164, 43],
                [29, 20],
                [35, 11],
                [41, 16],
                [35, 33],
                [104, 23],
                [382, 182],
                [400, 119],
                [375, 375],
                [193, 156],
                [85, 26],
                [0, 0], // for image2
                [0, 0]
            ],
            network: [
                [2, 6, 3, 10, 8, 4, 9, 11, 22],
                [10, 2, 22],
                [6, 10, 1, 11],
                [6, 1, 10, 8, 0, 9],
                [8, 12, 22],
                [8, 9, 1],
                [8, 9, 11, 12],
                [3, 2, 1],
                [4, 7, 2, 1, 11, 12],
                [4, 5, 7, 2, 1, 11, 22],
                [7, 3, 1, 9, 8, 12],
                [3, 2, 1, 0],
                [20, 15, 21, 17, 14, 23],
                [5, 9, 15, 18, 7, 21, 20, 11, 19],
                [13, 12, 16],
                [16, 13, 24, 17],
                [13, 23, 14],
                [14, 15, 24],
                [23, 12],
                [23, 12],
                [23, 13, 12],
                [13, 12],
                [24, 16, 23, 18, 17, 19],
                [21, 19, 17, 18, 13],
                [22, 16, 14]
            ],
            transition: function transition(from, to) {
                let transitions = [];
                
                let i;
                
                for (i = 0; i < 25; i += 1) {
                    transitions.push([]);
                }
                
                transitions[0][2] = 37;
                transitions[0][3] = 61;
                transitions[0][4] = 179;
                transitions[0][6] = 54;
                transitions[0][8] = 163;
                transitions[0][9] = 182;
                transitions[0][10] = 98;
                transitions[0][11] = 194;
                transitions[0][22] = 0;

                transitions[1][2] = 169;
                transitions[1][10] = 163;
                transitions[0][22] = 0;

                transitions[2][1] = 61;
                transitions[2][6] = 18;
                transitions[2][10] = 58;
                transitions[2][11] = 140;

                transitions[3][0] = 169;
                transitions[3][1] = 37;
                transitions[3][6] = 29;
                transitions[3][8] = 159;
                transitions[3][9] = 172;
                transitions[3][10] = 65;

                transitions[4][8] = 55;
                transitions[4][12] = 254;
                transitions[0][22] = 0;

                transitions[5][1] = 179;
                transitions[5][8] = 23;
                transitions[5][9] = 44;

                transitions[6][8] = 125;
                transitions[6][9] = 129;
                transitions[6][11] = 130;
                transitions[6][12] = 388;

                transitions[7][1] = 54;
                transitions[7][2] = 29;
                transitions[7][3] = 18;

                transitions[8][1] = 182;
                transitions[8][2] = 172;
                transitions[8][4] = 44;
                transitions[8][7] = 129;
                transitions[8][11] = 235;
                transitions[8][12] = 268;

                transitions[9][1] = 163;
                transitions[9][2] = 159;
                transitions[9][4] = 23;
                transitions[9][5] = 55;
                transitions[9][7] = 125;
                transitions[9][11] = 243;
                transitions[0][22] = 0;

                transitions[10][1] = 194;
                transitions[10][3] = 140;
                transitions[10][7] = 130;
                transitions[10][8] = 243;
                transitions[10][9] = 235;
                transitions[10][12] = 455;

                transitions[11][0] = 163;
                transitions[11][1] = 98;
                transitions[11][2] = 65;
                transitions[11][3] = 58;

                transitions[12][14] = 194;
                transitions[12][15] = 40;
                transitions[12][17] = 130;
                transitions[12][20] = 243;
                transitions[12][21] = 235;
                transitions[12][23] = 0; // 463;

                transitions[13][5] = 254;
                transitions[13][7] = 388;
                transitions[13][9] = 268;
                transitions[13][11] = 455;
                transitions[13][15] = 350;
                transitions[13][18] = 381;
                transitions[13][19] = 506;
                transitions[13][20] = 416;
                transitions[13][21] = 415;

                transitions[14][12] = 350;
                transitions[14][13] = 78;
                transitions[14][16] = 389;

                transitions[15][13] = 434;
                transitions[15][16] = 28;
                transitions[15][17] = 536;
                transitions[15][24] = 0; // 439;

                transitions[16][13] = 232;
                transitions[16][14] = 536;
                transitions[15][23] = 0; // 247;

                transitions[17][14] = 28;
                transitions[17][15] = 389;
                transitions[17][24] = 0; // 419;

                transitions[18][12] = 506;
                transitions[18][23] = 0; // 107;

                transitions[19][12] = 381;
                transitions[19][23] = 0; // 267;

                transitions[20][12] = 415;
                transitions[20][13] = 102;
                transitions[20][23] = 0; // 86;

                transitions[21][12] = 416;
                transitions[21][13] = 19;
                
                transitions[22][16] = 25;
                transitions[22][17] = 25;
                transitions[22][18] = 25;
                transitions[22][19] = 25;

                transitions[23][13] = 463;
                transitions[23][17] = 247;
                transitions[23][18] = 267;
                transitions[23][19] = 107;
                transitions[23][21] = 86;

                transitions[24][14] = 439;
                transitions[24][16] = 419;
                transitions[0][22] = 0;

                return transitions[from][to];
            },
            speed: 0.05,
            annotation: {
                type: "function",
                text: function annotation(part, preview) {
                    if (!preview && part < 22) {
                        return "[white background]<br>FM noise<br><br>[black lines]<br>disturbances<br><br>[straight thick vertical lines]<br>rapid movement of tuning wheel";
                    } else if (preview && (part < 16 || (part > 19 && part < 22))) {
                        return "FM noise, disturbances";
                    } else if (preview && part >= 16 && part <= 19) {
                        return "FM noise, disturbances, rapid movement of tuning wheel";
                    } else {
                        let annotations = [
                            "FM noise, moving tuning wheel",
                            "FM noise, very intense disturbances",
                            "AM noise, disturbances"
                        ];
                        
                        return annotations[part - 22];
                    }
                }
            }
        };
    }
    
    // iS1
    if (score === 13) {
        return {
            type: "text",
            text: [
                "muted agitation - some light"
            ],
            parts: [
                1
            ],
            annotation: {
                type: "array",
                text: [
                    "moving telephone pickup coils (\"muted agitation\"), hard drive chord (\"some light\")",
                    "touching circuit board (\"muted agitation\"), moving telephone pickup coils only around hard drive (\"some light\")",
                    "sleep mode, key A and/or caps lock"
                ]
            }
        };
    }
    
    // iS3x2
    if (score === 14) {
        return {
            type: "text",
            text: [
                "\"co",
                "    //",
                "    x y",
                "                                                                 \\\\\\      \\\\ \\\\",
                "                                                     1,",
                "           \\\\",
                "\\\\\\\\\\ //// / //    \\\\\\                      \\\\\\\\\\\\\\\\\\\\",
                "         \\\\",
                "                   \\\\\\ \\\\\\ // \\\\\\\\\\/\\/\\\\\\\\\\\\\\",
                "       .",
                " /                                                 ****",
                "       \\                                                                      ******************",
                "  ********************",
                "                               |",
                " /        //  **",
                "     -",
                "                 /",
                "                                )",
                "             ////",
                "  /",
                "                                                                                                         *",
                " {",
                " / /        /",
                "",
                "                                                              **                           */ //",
                "                                                                                                             2:",
                "                                                                                                               ?",
                "["
            ],
            parts: [
                1,
                1,
                1,
                1,
                1,
                4,
                1,
                3,
                1,
                1,
                1,
                1,
                1,
                3,
                1,
                3,
                1,
                1,
                1
            ],
            annotation: {
                type: "array",
                text: [
                    "soft radio sound",
                    "noisy rustles",
                    "key T",
                    "noisy rustles",
                    "key 6, altered by touching circuit board",
                    "noisy rustles",
                    "trackpad, soft",
                    "noisy rustles (/ and \\), electric hum (*)",
                    "battery, disconnecting power cable",
                    "noisy rustles (/), electric hum (*)",
                    "between trackpad and hard drive",
                    "noisy rustles",
                    "very short radio sound",
                    "noisy rustles (/), electric hum (*)",
                    "opening and closing programs",
                    "noisy rustles (/), electric hum (*)",
                    "key 3",
                    "high radio feedback",
                    "switching between tabs"
                ]
            }
        };
    }
    
    // lnnsib
    if (score === 15) {
        audio = new Audio("ccloudlab1-2/audio/15851__laurent__natural-night-sounds-in-boquete.mp3");
        audio.loop = true;
        
        return {
            type: "audio",
            audio: audio,
            crossfade: true,
            annotation: {
                type: "array",
                text: [
                    "sleep mode, moving telephone pickup coils, altering sound by touching circuit board",
                    "FM noise, high feedback"
                ]
            }
        };
    }
        
    // diagram3x1
    if (score === 16) {
        return {
            type: "scroll-map",
            image: image,
            cursor: 200,
            speed: 0.025,
            annotation: {
                type: "fixed",
                text: ["[white background]<br>noise, low LPF res<br><br>[black lines]<br>noise, maximum LPF res, low LPF cutoff<br><br>[purple lines]<br>noise, maximum LPF res, mid LPF cutoff<br><br>[red lines]<br>noise, maximum LPF res, high LPF cutoff<br><br>[green lines]<br>sine waves<br><br>[green lines, black fill]<br>rattling coins"]
            }
        };
    }
    
    // polygon1
    if (score === 17) {
        return {
            type: "map",
            image: image,
            parts: [
                [246, 1084, 96, 82],
                [279, 773, 115, 98],
                [581, 977, 126, 134],
                [794, 1001, 93, 79],
                [1109, 893, 110, 87],
                [1314, 876, 115, 129],
                [1599, 1062, 59, 57],
                [1547, 1137, 70, 69],
                [1596, 1297, 75, 71],
                [1510, 1635, 103, 115],
                [1172, 1330, 760, 768]
            ],
            duration: [
                28064,
                31366,
                38744,
                25856,
                30072,
                34583,
                19260,
                22777,
                23004,
                33835,
                135000
            ],
            network: [
                [1, 2],
                [0, 2],
                [3, 1, 0],
                [2, 4, 10],
                [5, 3, 10],
                [4, 6, 7, 10],
                [7, 5],
                [6, 8, 5, 10],
                [7, 9, 10],
                [8, 10],
                [7, 8, 4, 9, 5, 3]
            ],
            transition: function transition(from, to) {
                let transitions = [];
                
                let i;
                
                for (i = 0; i < 11; i += 1) {
                    transitions.push([]);
                }
                
                transitions[0][1] = 20823;
                transitions[0][2] = 21834;
                
                transitions[1][0] = 20823;
                transitions[1][2] = 22156;
                
                transitions[2][0] = 21834;
                transitions[2][1] = 22156;
                transitions[2][3] = 17829;
                
                transitions[3][2] = 17829;
                transitions[3][4] = 21383;
                transitions[3][10] = 25312;
                
                transitions[4][3] = 21383;
                transitions[4][5] = 17549;
                transitions[4][10] = 24017;
                
                transitions[5][4] = 17549;
                transitions[5][6] = 21535;
                transitions[5][7] = 21804;
                transitions[5][10] = 24751;
                
                transitions[6][5] = 21535;
                transitions[6][7] = 12523;
                
                transitions[7][5] = 21804;
                transitions[7][6] = 12523;
                transitions[7][8] = 16088;
                transitions[7][10] = 23545;
                
                transitions[8][7] = 16088;
                transitions[8][9] = 21804;
                transitions[8][10] = 23624;
                
                transitions[9][8] = 21804;
                transitions[9][10] = 24324;
                
                transitions[10][3] = 25312;
                transitions[10][4] = 24017;
                transitions[10][5] = 24751;
                transitions[10][7] = 23545;
                transitions[10][8] = 23624;
                transitions[10][9] = 24324;
                
                return transitions[from][to];
            },
            speed: 1,
            annotation: {
                type: "fixed + array + fixed",
                text: [
                    "soft combination of sine waves and noise (a bit more sine waves than noise, high LPF res)",
                    "soft combination of sine waves and noise (more sine waves than noise, high LPF res)",
                    "soft combination of sine waves and noise (high LPF res)",
                    "soft combination of sine waves and noise (a bit more sine waves than noise, low LPF res)",
                    "very soft combination of sine waves and noise (more sine waves than noise, low LPF res)",
                    "sine waves, some rattling (may be shorter than the indicated duration)",
                    "soft combination of sine waves and noise (a bit more noise than sine waves, high LPF res)",
                    "soft combination of sine waves and noise (more noise than sine waves, high LPF res)",
                    "soft combination of sine waves and noise (a bit more noise than sine waves, high LPF res)",
                    "very soft combination of sine waves and noise (a bit more noise than sine waves, high LPF res)",
                    "sine waves, complex beating patterns, loud noisy rattling"
                ],
                fixed1: "<u>static image</u><br><br>",
                fixed2: "<br><br><br><u>moving image</u><br><br>[white background]<br>silence<br><br>[foggy background]<br>soft noise<br>medium LPF res<br><br>[light foggy background]<br>very soft noise<br>low LPF res"
            }
        };
    }
    
    //iS1v2iS2
    if (score === 18) {
        return {
            type: "text",
            text: [
                "muted aggregates of, -",
                "                                          {dark",
                ", long creaks",
                "creakingly crawling",
                "scattered",
                " \\ m",
                "0",
                "",
                "like a giant being [ tiny",
                "                                          IN {0"
            ],
            parts: [
                2,
                1,
                1,
                4,
                2
            ],
            annotation: {
                type: "array",
                text: [
                    "noise, medium LPF res, low volume, occasionally louder for a short duration",
                    "noise, high LPF cutoff, high to maximum LPF res",
                    "noise, downward glissando (by lowering LPF cutoff, high to maximum LPF res)",
                    "noise, low LPF res, ocassionally adding sine waves, some accents (volume, LPF res)",
                    "low soft sine wave"
                ]
            }
        };
    }
    
    // iS5
    if (score === 19) {
        return {
            type: "text",
            text: [
                "plenty, entangled",
                "many (are)",
                "   [trying to dissolve, . 1 ^^  ^",
                "but threads, a lot of them",
                "{an irritating hassle that will disappear when",
                "",
                "[",
                "        not without some dust left in a big closed box",
                "] 2& { }"
            ],
            parts: [
                2,
                1,
                1,
                3,
                1,
                1
            ],
            annotation: {
                type: "array",
                text: [
                    "noise, full modulation of LPF cutoff, high to maximum LPF res, very fast to maximum rLFO rate",
                    "reducing noise mix, modulation of LPF cutoff, and rLFO rate, but in the end accents (high values of all these parameters) (although not very often)",
                    "sine waves, full modulation of freq shift, very fast to maximum rLFO rate, low to medium rLFO glide, complex beating patterns",
                    "loud rattling, abrurpt silence",
                    "rattling aluminum foil, low volume",
                    "complex texture of the rattling aluminum foil, occasionally louder"
                ]
            }
        };
    }
    
    // zr1tS
    if (score === 20) {
        audio = new Audio("ccloudlab1-2/audio/zH5pB-rwf-1-666timesSlower.mp3");
        audio.loop = true;
        
        return {
            type: "audio",
            audio: audio,
            annotation: {
                type: "fixed",
                text: ["imitate what you hear"]
            }
        };
    }
}