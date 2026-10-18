/* Hints, worked solutions and CAPS cognitive levels for Grade 10, chapter 14 practice questions.
   Entry: [level, fingerprint, hint EN, hint AF, steps EN, steps AF]. Levels: K knowledge, R routine, C complex, P problem solving. */
MMHelp.add(10, 14, {
  "1400": [
    ["K","m4:3","Favourable ÷ total, then simplify.","Gunstig ÷ totaal, vereenvoudig dan.",["4/10 = 2/5, so both are correct."],["4/10 = 2/5, dus is albei korrek."]],
    ["R","i:0.7","P(A or B) = P(A) + P(B) − P(A and B).","P(A of B) = P(A) + P(B) − P(A en B).",["0.4 + 0.5 − 0.2","= 0.7"],["0,4 + 0,5 − 0,2","= 0,7"]],
    ["K","m4:1","P(A') = 1 − P(A).","P(A') = 1 − P(A).",["1 − 0.3 = 0.7"],["1 − 0,3 = 0,7"]],
    ["R","m4:0","List the outcomes; don't count any twice.","Lys die uitkomste; moenie enige twee keer tel nie.",["Even: 2, 4, 6; greater than 4: 5, 6","Together: 2, 4, 5, 6 → 4/6"],["Ewe: 2, 4, 6; groter as 4: 5, 6","Saam: 2, 4, 5, 6 → 4/6"]],
    ["R","i:0.2","Rearrange the addition rule.","Herrangskik die optelreël.",["P(A∩B) = 0.6 + 0.4 − 0.8","= 0.2"],["P(A∩B) = 0,6 + 0,4 − 0,8","= 0,2"]],
    ["C","i:10","All the regions add up to 40.","Al die streke tel op tot 40.",["x + 2x + 6 + 4 = 40","3x = 30 → x = 10"],["x + 2x + 6 + 4 = 40","3x = 30 → x = 10"]],
    ["C","i:13","n(C ∪ T) = 60 − 10 = 50.","n(K ∪ T) = 60 − 10 = 50.",["50 = 35 + 28 − n(C ∩ T)","n(C ∩ T) = 13"],["50 = 35 + 28 − n(K ∩ T)","n(K ∩ T) = 13"]],
    ["P","i:13/60","Find how many own both first.","Vind eers hoeveel albei besit.",["At least one: 60 − 12 = 48 → both = 35 + 28 − 48 = 15","Dog only: 28 − 15 = 13","P = 13/60"],["Ten minste een: 60 − 12 = 48 → albei = 35 + 28 − 48 = 15","Net hond: 28 − 15 = 13","P = 13/60"]]
  ],
  "1401": [
    ["R","m4:1","Mutually exclusive: just add.","Onderling uitsluitend: tel net op.",["0.3 + 0.4","= 0.7"],["0,3 + 0,4","= 0,7"]],
    ["K","m4:1","They cannot happen together.","Hulle kan nie saam gebeur nie.",["P(A ∩ B) = 0 → mutually exclusive"],["P(A ∩ B) = 0 → onderling uitsluitend"]],
    ["K","i:0.65","Complement = 1 − P.","Komplement = 1 − P.",["1 − 0.35 = 0.65"],["1 − 0,35 = 0,65"]],
    ["C","m4:1","Use the complement: 1 − P(no heads).","Gebruik die komplement: 1 − P(geen kop).",["P(TTT) = (½)³ = ⅛","1 − ⅛ = ⅞"],["P(SSS) = (½)³ = ⅛","1 − ⅛ = ⅞"]],
    ["K","m4:3","Can both happen at the same time?","Kan albei op dieselfde tyd gebeur?",["One coin cannot land heads and tails at once → mutually exclusive."],["Een muntstuk kan nie gelyk kop en stert land nie → onderling uitsluitend."]],
    ["C","i:0.657","1 − P(no heads).","1 − P(geen kop).",["P(tails) = 0.7 → P(TTT) = 0.7³ = 0.343","1 − 0.343 = 0.657"],["P(stert) = 0,7 → P(SSS) = 0,7³ = 0,343","1 − 0,343 = 0,657"]],
    ["C","i:0.2","A' ∩ B' = neither A nor B.","A' ∩ B' = nie A nie en nie B nie.",["P(A ∪ B) = 0.45 + 0.35 = 0.8","P(neither) = 1 − 0.8 = 0.2"],["P(A ∪ B) = 0,45 + 0,35 = 0,8","P(geeneen) = 1 − 0,8 = 0,2"]]
  ],
  "1402": [
    ["K","m4:1","Times it happened ÷ number of trials.","Kere wat dit gebeur het ÷ aantal proewe.",["8/60"],["8/60"]],
    ["K","m4:1","The law of large numbers.","Die wet van groot getalle.",["More trials → closer to the theoretical probability."],["Meer proewe → nader aan die teoretiese waarskynlikheid."]],
    ["R","i:0.28","55 ÷ 200","55 ÷ 200",["0.275","≈ 0.28"],["0,275","≈ 0,28"]],
    ["K","m4:1","5 tosses is a tiny sample.","5 gooie is 'n baie klein steekproef.",["Large deviations are normal for few trials."],["Groot afwykings is normaal vir min proewe."]],
    ["K","m4:0","What is it based on?","Waarop is dit gebaseer?",["Counting equally likely outcomes."],["Om ewe waarskynlike uitkomste te tel."]],
    ["R","i:0.20","Combine all the trials.","Kombineer al die proewe.",["9 + 11 = 20 sixes in 40 + 60 = 100 rolls","20 ÷ 100 = 0.20"],["9 + 11 = 20 sesse in 40 + 60 = 100 gooie","20 ÷ 100 = 0,20"]],
    ["R","i:40","Expected number = P × trials.","Verwagte aantal = P × proewe.",["1/5 × 200","= 40"],["1/5 × 200","= 40"]],
    ["P","i:2/7","All six probabilities must add up to 1.","Al ses waarskynlikhede moet tot 1 optel.",["Let each of 1–5 have probability p; then P(6) = 2p","5p + 2p = 1 → p = 1/7 → P(6) = 2/7"],["Laat elk van 1–5 waarskynlikheid p hê; dan P(6) = 2p","5p + 2p = 1 → p = 1/7 → P(6) = 2/7"]]
  ],
  "1403": [
    ["K","m4:1","Where do the totals meet?","Waar ontmoet die totale?",["The bottom-right cell is the grand total n(S)."],["Die sel regs onder is die groottotaal n(S)."]],
    ["R","m4:0","Add all four groups.","Tel al vier groepe op.",["15 + 10 + 5 + 20","= 50"],["15 + 10 + 5 + 20","= 50"]],
    ["R","i:0.4","Dog owners include \"dog only\" and \"both\".","Hondeienaars sluit \"net hond\" en \"albei\" in.",["15 + 5 = 20","20 ÷ 50 = 0.4"],["15 + 5 = 20","20 ÷ 50 = 0,4"]],
    ["K","m4:1","Same data, different picture.","Dieselfde data, ander prentjie.",["They give the same probabilities."],["Hulle gee dieselfde waarskynlikhede."]],
    ["K","m4:2","\"AND\" is the overlap.","\"EN\" is die oorvleueling.",["Female AND Pass → the intersection of Female and Pass"],["Vroulik EN Slaag → die snyding van Vroulik en Slaag"]],
    ["R","i:16","All cells add up to 70.","Al die selle tel op tot 70.",["24 + x + 18 + 12 = 70","x = 16"],["24 + x + 18 + 12 = 70","x = 16"]],
    ["C","i:5/16","Sport but no instrument.","Sport maar geen instrument.",["45 − 20 = 25","25/80 = 5/16"],["45 − 20 = 25","25/80 = 5/16"]],
    ["P","i:27/40","Find how many like both first.","Vind eers hoeveel van albei hou.",["At least one: 40 − 5 = 35 → both = 25 + 18 − 35 = 8","Exactly one: 35 − 8 = 27","P = 27/40"],["Ten minste een: 40 − 5 = 35 → albei = 25 + 18 − 35 = 8","Presies een: 35 − 8 = 27","P = 27/40"]]
  ]
});
