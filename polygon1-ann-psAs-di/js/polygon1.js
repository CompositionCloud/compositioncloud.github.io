/*jslint es6, for*/

const polygon1 = (function polygon1_() {
    "use strict";
    
    const annotations = [
        "soft combination of sine waves and noise (a bit more sine waves than noise, high LPF res)",
        "soft combination of sine waves and noise (more sine waves than noise, high LPF res)",
        "soft combination of sine waves and noise (high LPF res)",
        "soft combination of sine waves and noise (a bit more sine waves than noise, low LPF res)",
        "very soft combination of sine waves and noise (more sine waves than noise, low LPF res)",
        "rattling (may be shorter than the indicated duration)",
        "soft combination of sine waves and noise (a bit more noise than sine waves, high LPF res)",
        "soft combination of sine waves and noise (more noise than sine waves, high LPF res)",
        "soft combination of sine waves and noise (a bit more noise than sine waves, high LPF res)",
        "very soft combination of sine waves and noise (a bit more noise than sine waves, high LPF res)",
        "complex beating patterns, loud noisy rattling"
    ];

    return {
        parts: [
            [246, 1084, 96, 82],    // 0
            [279, 773, 115, 98],    // 1
            [581, 977, 126, 134],   // 2
            [794, 1001, 93, 79],    // 3
            [1109, 893, 110, 87],   // 4
            [1314, 876, 115, 129],  // 5
            [1599, 1062, 59, 57],   // 6
            [1547, 1137, 70, 69],   // 7
            [1596, 1297, 75, 71],   // 8
            [1510, 1635, 103, 115], // 9
            [1172, 1330, 760, 782]  // 10
        ],
        durations: [
            28,  // 0
            31,  // 1
            39,  // 2
            26,  // 3
            30,  // 4
            35,  // 5
            19,  // 6
            23,  // 7
            23,  // 8
            34,  // 9
            135  // 10
        ],
        network: [
            [1, 2],             // 0
            [0, 2],             // 1
            [3, 1, 0],          // 2
            [2, 4, 10],         // 3
            [5, 3, 10],         // 4
            [4, 6, 7, 10],      // 5
            [7, 5],             // 6
            [6, 8, 5, 10],      // 7
            [7, 9, 10],         // 8
            [8, 10],            // 9
            [7, 8, 4, 9, 5, 3]  // 10
        ],
        transition: function transition(from, to) {
            let transitions = [];

            let i;
            
            for (i = 0; i < 11; i += 1) {
                transitions.push([]);
            }

            transitions[0][1] = 21;
            transitions[0][2] = 22;

            transitions[1][0] = 21;
            transitions[1][2] = 22;

            transitions[2][0] = 22;
            transitions[2][1] = 22;
            transitions[2][3] = 18;

            transitions[3][2] = 18;
            transitions[3][4] = 21;
            transitions[3][10] = 25;

            transitions[4][3] = 21;
            transitions[4][5] = 18;
            transitions[4][10] = 24;

            transitions[5][4] = 18;
            transitions[5][6] = 22;
            transitions[5][7] = 22;
            transitions[5][10] = 25;

            transitions[6][5] = 22;
            transitions[6][7] = 12;

            transitions[7][5] = 22;
            transitions[7][6] = 12;
            transitions[7][8] = 16;
            transitions[7][10] = 24;

            transitions[8][7] = 16;
            transitions[8][9] = 22;
            transitions[8][10] = 24;

            transitions[9][8] = 22;
            transitions[9][10] = 24;

            transitions[10][3] = 25;
            transitions[10][4] = 24;
            transitions[10][5] = 25;
            transitions[10][7] = 24;
            transitions[10][8] = 24;
            transitions[10][9] = 24;
            
            if (from === -1) {
                return 0;
            }
            
            return transitions[from][to] || 0;
        },
        histogram: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ],
        annotations: {
            type: "function",
            text: function generateAnnotation(part) {
                return "<br><u>static image</u><br><br>" + annotations[part] + "<br><br><br><u>moving image</u><br><br>[white background]<br>silence<br><br>[foggy background]<br>soft noise<br>medium LPF res<br><br>[light foggy background]<br>very soft noise<br>low LPF res";
            },
            preview: {
                type: "function",
                text: function generateAnnotation(part) {
                    return annotations[part];
                }
            }
        }
    };
}());