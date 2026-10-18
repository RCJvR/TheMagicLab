/* Hints, worked solutions and CAPS cognitive levels for Grade 11, chapter 10 practice questions.
   Entry: [level, fingerprint, hint EN, hint AF, steps EN, steps AF]. Levels: K knowledge, R routine, C complex, P problem solving. */
MMHelp.add(11, 10, {
  "1000": [
    ["R","m4:0","Independent if P(A ∩ B) = P(A) × P(B).","Onafhanklik as P(A ∩ B) = P(A) × P(B).",["0.4 × 0.3 = 0.12","= P(A ∩ B) → independent"],["0,4 × 0,3 = 0,12","= P(A ∩ B) → onafhanklik"]],
    ["R","m4:0","Without replacement, the second draw has one fewer of each.","Sonder terugplasing het die tweede trekking een minder van elk.",["1st green: 4/10","2nd green: 3/9 → 4/10 × 3/9"],["1ste groen: 4/10","2de groen: 3/9 → 4/10 × 3/9"]],
    ["K","i:0.3","Independent: multiply.","Onafhanklik: vermenigvuldig.",["0.5 × 0.6 = 0.3"],["0,5 × 0,6 = 0,3"]],
    ["K","m4:2","Does one affect the other?","Beïnvloed die een die ander?",["The coin cannot affect the card → independent"],["Die muntstuk kan nie die kaart beïnvloed nie → onafhanklik"]],
    ["K","m4:1","The first card changes what is left.","Die eerste kaart verander wat oorbly.",["Without replacement → dependent"],["Sonder terugplasing → afhanklik"]],
    ["C","i:25/28","1 − P(no red).","1 − P(geen rooi).",["P(both blue) = 3/8 × 2/7 = 6/56 = 3/28","1 − 3/28 = 25/28"],["P(albei blou) = 3/8 × 2/7 = 6/56 = 3/28","1 − 3/28 = 25/28"]]
  ],
  "1001": [
    ["K","m4:2","Something must happen at each node.","Iets moet by elke knoop gebeur.",["The branches from one node add up to 1."],["Die takke vanaf een knoop tel op tot 1."]],
    ["R","m4:0","Test the product rule.","Toets die produkreël.",["0.5 × 0.3 = 0.15 = P(A ∩ B)","→ independent"],["0,5 × 0,3 = 0,15 = P(A ∩ B)","→ onafhanklik"]],
    ["R","i:40","n(A ∪ B) = n(A) + n(B) − n(A ∩ B).","n(A ∪ B) = n(A) + n(B) − n(A ∩ B).",["120 + 90 − 50 = 160","200 − 160 = 40"],["120 + 90 − 50 = 160","200 − 160 = 40"]],
    ["R","m4:2","Two paths: RB and BR.","Twee paaie: RB en BR.",["5/8 × 3/8 = 15/64 for each order","2 × 15/64 = 30/64"],["5/8 × 3/8 = 15/64 vir elke volgorde","2 × 15/64 = 30/64"]],
    ["K","m4:1","The complement is easier.","Die komplement is makliker.",["P(at least one) = 1 − P(none)"],["P(ten minste een) = 1 − P(geeneen)"]],
    ["R","i:0.15","n(M ∩ S) = n(M) + n(S) − n(M ∪ S).","n(W ∩ N) = n(W) + n(N) − n(W ∪ N).",["90 + 70 − 130 = 30","30 ÷ 200 = 0.15"],["90 + 70 − 130 = 30","30 ÷ 200 = 0,15"]]
  ],
  "1002": [
    ["K","m4:0","Add singles, subtract pairs, add the triple back.","Tel enkels op, trek pare af, tel die drietal weer by.",["P(A)+P(B)+P(C) − P(A∩B) − P(A∩C) − P(B∩C) + P(A∩B∩C)"],["P(A)+P(B)+P(C) − P(A∩B) − P(A∩C) − P(B∩C) + P(A∩B∩C)"]],
    ["R","i:9","Remove the triple overlap.","Verwyder die drievoudige oorvleueling.",["15 − 6","= 9"],["15 − 6","= 9"]],
    ["K","m4:0","Work from the inside out.","Werk van binne na buite.",["Start with the centre region A ∩ B ∩ C."],["Begin met die middelste streek A ∩ B ∩ C."]],
    ["C","i:10","Use the three-event addition rule.","Gebruik die optelreël vir drie gebeurtenisse.",["n(S ∪ R ∪ C) = 60 + 50 + 45 − 20 − 15 − 18 + 8 = 110","None: 120 − 110 = 10"],["n(S ∪ R ∪ K) = 60 + 50 + 45 − 20 − 15 − 18 + 8 = 110","Geeneen: 120 − 110 = 10"]],
    ["K","m4:0","Every learner is in exactly one region.","Elke leerder is in presies een streek.",["All regions add up to n(S)."],["Al die streke tel op tot n(S)."]],
    ["P","i:43","Find the missing chess-and-checkers number first.","Vind eers die ontbrekende skaak-en-dambord-getal.",["At least one: 150 − 10 = 140 → 140 = 60 + 55 + 50 − x − 15 − 8 + 8 → x = 10","Chess only = 60 − (10 − 8) − (15 − 8) − 8 = 43"],["Ten minste een: 150 − 10 = 140 → 140 = 60 + 55 + 50 − x − 15 − 8 + 8 → x = 10","Net skaak = 60 − (10 − 8) − (15 − 8) − 8 = 43"]],
    ["P","i:12","Use the addition rule for three sets.","Gebruik die optelreël vir drie versamelings.",["At least one: 45 + 40 + 35 − 15 − 10 − 12 + 5 = 88","None: 100 − 88 = 12"],["Ten minste een: 45 + 40 + 35 − 15 − 10 − 12 + 5 = 88","Geeneen: 100 − 88 = 12"]]
  ],
  "1003": [
    ["R","m4:1","Multiply the choices.","Vermenigvuldig die keuses.",["4 × 5 × 3","= 60"],["4 × 5 × 3","= 60"]],
    ["R","i:1000","10 choices for each digit.","10 keuses vir elke syfer.",["10 × 10 × 10","= 1 000"],["10 × 10 × 10","= 1 000"]],
    ["R","m4:1","One fewer choice each time.","Elke keer een keuse minder.",["10 × 9 × 8","= 720"],["10 × 9 × 8","= 720"]],
    ["K","m4:0","Letters and digits are chosen independently.","Letters en syfers word onafhanklik gekies.",["26 × 26 × 26 × 10 × 10 × 10 = 26³ × 10³"],["26 × 26 × 26 × 10 × 10 × 10 = 26³ × 10³"]],
    ["R","i:5040","Count all the PINs.","Tel al die PIN'e.",["10 × 9 × 8 × 7 = 5 040","P('1234') = 1/5 040"],["10 × 9 × 8 × 7 = 5 040","P('1234') = 1/5 040"]],
    ["C","i:1560000","Count each part, then multiply.","Tel elke deel en vermenigvuldig dan.",["Letters: 26 × 25 × 24 = 15 600","Digits: 10 × 10 = 100","15 600 × 100 = 1 560 000"],["Letters: 26 × 25 × 24 = 15 600","Syfers: 10 × 10 = 100","15 600 × 100 = 1 560 000"]],
    ["P","i:360","Fill the restricted place (the last digit) first.","Vul eers die beperkte plek (die laaste syfer).",["Last digit: 2, 4 or 6 → 3 choices","The other three places: 6 × 5 × 4 = 120","3 × 120 = 360"],["Laaste syfer: 2, 4 of 6 → 3 keuses","Die ander drie plekke: 6 × 5 × 4 = 120","3 × 120 = 360"]],
    ["P","i:36","Count all codes, then subtract those without A.","Tel al die kodes en trek dan dié sonder A af.",["All codes: 5 × 4 × 3 = 60","Without A: 4 × 3 × 2 = 24","With A: 60 − 24 = 36"],["Alle kodes: 5 × 4 × 3 = 60","Sonder A: 4 × 3 × 2 = 24","Met A: 60 − 24 = 36"]]
  ]
});
