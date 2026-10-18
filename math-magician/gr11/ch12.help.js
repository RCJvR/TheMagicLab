/* Hints, worked solutions and CAPS cognitive levels for Grade 11, chapter 12 practice questions.
   Entry: [level, fingerprint, hint EN, hint AF, steps EN, steps AF]. Levels: K knowledge, R routine, C complex, P problem solving. */
MMHelp.add(11, 12, {
  "1200": [
    ["K","m4:1","\"Feasible\" = allowed by every rule.","\"Haalbaar\" = toegelaat deur elke reël.",["All constraints at the same time"],["Al die beperkings tegelyk"]],
    ["K","m4:1","Where does the objective line leave the region?","Waar verlaat die doelwitlyn die gebied?",["At a corner (vertex) of the feasible region"],["By 'n hoekpunt van die haalbare gebied"]],
    ["K","m4:0","Quantities can't be negative.","Hoeveelhede kan nie negatief wees nie.",["x ≥ 0 and y ≥ 0"],["x ≥ 0 en y ≥ 0"]],
    ["R","m4:0","Find the intercepts.","Vind die afsnitte.",["y = 0: 3x = 60 → x = 20","x = 0: 2y = 60 → y = 30 → (20 ; 0) and (0 ; 30)"],["y = 0: 3x = 60 → x = 20","x = 0: 2y = 60 → y = 30 → (20 ; 0) en (0 ; 30)"]],
    ["K","i:44","Substitute the point.","Vervang die punt.",["4(5) + 3(8) = 20 + 24 = 44"],["4(5) + 3(8) = 20 + 24 = 44"]],
    ["R","m4:0","Write one inequality per resource.","Skryf een ongelykheid per hulpbron.",["Wood: 3x + 5y ≤ 60","Labour: 2x + 4y ≤ 44"],["Hout: 3x + 5y ≤ 60","Arbeid: 2x + 4y ≤ 44"]],
    ["R","i:106","Solve simultaneously.","Los gelyktydig op.",["x = 22 − 2y → 3(22 − 2y) + 5y = 60 → 66 − y = 60 → y = 6","x = 22 − 12 = 10 → (10 ; 6)"],["x = 22 − 2y → 3(22 − 2y) + 5y = 60 → 66 − y = 60 → y = 6","x = 22 − 12 = 10 → (10 ; 6)"]],
    ["P","i:52000","Write the constraints, find the corners and test each.","Skryf die beperkings, vind die hoekpunte en toets elkeen.",["x + y ≤ 100 and 2x + y ≤ 160 (x maize, y wheat)","Corners: (0 ; 100) → R40 000; (60 ; 40) → R52 000; (80 ; 0) → R48 000","Maximum: R52 000"],["x + y ≤ 100 en 2x + y ≤ 160 (x mielies, y koring)","Hoekpunte: (0 ; 100) → R40 000; (60 ; 40) → R52 000; (80 ; 0) → R48 000","Maksimum: R52 000"]]
  ],
  "1201": [
    ["R","m4:2","Test every corner point.","Toets elke hoekpunt.",["(0,0): 0; (4,0): 4; (2,3): 8; (0,5): 10","Maximum at (0 ; 5)"],["(0,0): 0; (4,0): 4; (2,3): 8; (0,5): 10","Maksimum by (0 ; 5)"]],
    ["R","i:10","Test every corner point.","Toets elke hoekpunt.",["(0,6): 18; (3,4): 18; (5,0): 10","Minimum C = 10"],["(0,6): 18; (3,4): 18; (5,0): 10","Minimum C = 10"]],
    ["K","m4:1","The search line is parallel to the objective function.","Die soeklyn is ewewydig aan die doelwitfunksie.",["Same gradient"],["Dieselfde gradiënt"]],
    ["C","m4:3","Find the missing corner first.","Vind eers die ontbrekende hoekpunt.",["y = 1 and x + y = 7 meet at (6 ; 1)","P(6 ; 1) = 18 − 1 = 17 > 5 → maximum at (6 ; 1)"],["y = 1 en x + y = 7 sny by (6 ; 1)","P(6 ; 1) = 18 − 1 = 17 > 5 → maksimum by (6 ; 1)"]],
    ["K","m4:2","The region goes on forever.","Die gebied gaan vir ewig aan.",["P could keep increasing, so a maximum may not exist."],["P kan aanhou toeneem, dus bestaan 'n maksimum dalk nie."]],
    ["R","i:78","Test every corner point.","Toets elke hoekpunt.",["(0,10): 50; (8,6): 78; (12,0): 72","Maximum P = 78"],["(0,10): 50; (8,6): 78; (12,0): 72","Maksimum P = 78"]],
    ["R","i:590","P = 40x + 55y at each corner.","P = 40x + 55y by elke hoekpunt.",["(0;2): R110; (0;10): R550; (12;2): R590","Maximum profit R590"],["(0;2): R110; (0;10): R550; (12;2): R590","Maksimum wins R590"]],
    ["P","i:24","Find every corner of the region, including where the two lines cross.","Vind elke hoekpunt van die gebied, ook waar die twee lyne sny.",["x + 2y = 16 and 2x + y = 14 meet at (4 ; 6)","Corners: (0 ; 0) → 0, (7 ; 0) → 21, (4 ; 6) → 24, (0 ; 8) → 16","Maximum P = 24 at (4 ; 6)"],["x + 2y = 16 en 2x + y = 14 sny by (4 ; 6)","Hoekpunte: (0 ; 0) → 0, (7 ; 0) → 21, (4 ; 6) → 24, (0 ; 8) → 16","Maksimum P = 24 by (4 ; 6)"]],
    ["P","i:1","Both points lie on the edge x + y = 10.","Albei punte lê op die rand x + y = 10.",["The search line must be parallel to x + y = 10 (gradient −1)","P = kx + y → y = −kx + P → −k = −1 → k = 1"],["Die soeklyn moet ewewydig wees aan x + y = 10 (gradiënt −1)","P = kx + y → y = −kx + P → −k = −1 → k = 1"]]
  ]
});
