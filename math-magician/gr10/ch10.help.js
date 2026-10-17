/* Hints, worked solutions and CAPS cognitive levels for Grade 10, chapter 10 practice questions.
   Entry: [level, fingerprint, hint EN, hint AF, steps EN, steps AF]. Levels: K knowledge, R routine, C complex, P problem solving. */
MMHelp.add(10, 10, {
  "1000": [
    ["K","m4:1","The mode is the value that occurs most often.","Die modus is die waarde wat die meeste voorkom.",["5 occurs twice; the others once → mode = 5"],["5 kom twee keer voor; die ander een keer → modus = 5"]],
    ["R","i:10","Order the data first.","Rangskik eers die data.",["5, 9, 10, 14, 17","The middle value is 10"],["5, 9, 10, 14, 17","Die middelste waarde is 10"]],
    ["K","m4:1","Add and divide by the number of values.","Tel op en deel deur die aantal waardes.",["30 ÷ 5 = 6"],["30 ÷ 5 = 6"]],
    ["K","m4:2","We don't know the exact values in each class.","Ons ken nie die presiese waardes in elke klas nie.",["Each class is represented by its midpoint."],["Elke klas word deur sy middelpunt verteenwoordig."]],
    ["R","i:11.5","Work with the total.","Werk met die totaal.",["Total = 5 × 12 = 60 → 60 − 14 = 46","46 ÷ 4 = 11.5"],["Totaal = 5 × 12 = 60 → 60 − 14 = 46","46 ÷ 4 = 11,5"]],
    ["R","i:17","Total = mean × number of values.","Totaal = gemiddeld × aantal waardes.",["6 × 15 = 90","12 + 18 + 9 + 20 + 14 = 73 → 90 − 73 = 17"],["6 × 15 = 90","12 + 18 + 9 + 20 + 14 = 73 → 90 − 73 = 17"]],
    ["C","i:21.5","Use the midpoints 4.5, 14.5, 24.5, 34.5.","Gebruik die middelpunte 4,5; 14,5; 24,5; 34,5.",["Σfx = 9 + 87 + 196 + 138 = 430","430 ÷ 20 = 21.5"],["Σfx = 9 + 87 + 196 + 138 = 430","430 ÷ 20 = 21,5"]],
    ["R","i:18","Midpoints 5, 15, 25.","Middelpunte 5, 15, 25.",["Σfx = 20 + 90 + 250 = 360","360 ÷ 20 = 18"],["Σfx = 20 + 90 + 250 = 360","360 ÷ 20 = 18"]],
    ["K","m4:2","The modal class has the highest frequency.","Die modale klas het die hoogste frekwensie.",["f = 10 is highest → 20 ≤ x < 30"],["f = 10 is die hoogste → 20 ≤ x < 30"]],
    ["K","m4:0","Grouped continuous data has no gaps.","Gegroepeerde kontinue data het geen gapings nie.",["One class ends where the next begins, so the bars touch."],["Een klas eindig waar die volgende begin, dus raak die stawe aan mekaar."]],
    ["R","m4:2","Find the 20th–21st value with cumulative frequency.","Vind die 20ste–21ste waarde met kumulatiewe frekwensie.",["Cumulative: 5, 17, 32, 40","The 20th and 21st values are in 20 ≤ t < 30"],["Kumulatief: 5, 17, 32, 40","Die 20ste en 21ste waardes is in 20 ≤ t < 30"]]
  ],
  "1001": [
    ["R","m4:1","Split the data into a lower and an upper half.","Verdeel die data in 'n onderste en boonste helfte.",["Lower: 3, 7, 9 → Q1 = 7; upper: 12, 15, 20 → Q3 = 15","IQR = 15 − 7 = 8"],["Onder: 3, 7, 9 → Q1 = 7; bo: 12, 15, 20 → Q3 = 15","IKO = 15 − 7 = 8"]],
    ["K","i:16","Range = max − min.","Omvang = maks − min.",["20 − 4 = 16"],["20 − 4 = 16"]],
    ["R","m4:1","Q1 is the median of the lower half.","Q1 is die mediaan van die onderste helfte.",["Lower half: 2, 5, 8, 11","Q1 = (5 + 8) ÷ 2 = 6.5"],["Onderste helfte: 2, 5, 8, 11","Q1 = (5 + 8) ÷ 2 = 6,5"]],
    ["K","m4:1","IQR = Q3 − Q1.","IKO = Q3 − Q1.",["22 − 10 = 12"],["22 − 10 = 12"]],
    ["K","m4:3","Which one is measured in \"squared units\"?","Watter een word in \"vierkantige eenhede\" gemeet?",["Variance is the mean of the squared deviations (σ is its square root)."],["Variansie is die gemiddeld van die gekwadreerde afwykings (σ is die vierkantswortel daarvan)."]],
    ["C","i:15.5","With n = 9 the median (14) is left out of both halves.","Met n = 9 word die mediaan (14) uit albei helftes gelaat.",["Q1 = (6 + 9) ÷ 2 = 7.5 and Q3 = (21 + 25) ÷ 2 = 23","IQR = 23 − 7.5 = 15.5"],["Q1 = (6 + 9) ÷ 2 = 7,5 en Q3 = (21 + 25) ÷ 2 = 23","IKO = 23 − 7,5 = 15,5"]],
    ["C","m4:0","Upper fence = Q3 + 1.5 × IQR.","Boonste grens = Q3 + 1,5 × IKO.",["IQR = 10 → fence = 20 + 15 = 35","50 > 35 → suspected outlier"],["IKO = 10 → grens = 20 + 15 = 35","50 > 35 → vermoedelike uitskieter"]],
    ["K","m4:0","A percentile is a position, not a mark.","'n Persentiel is 'n posisie, nie 'n punt nie.",["90th percentile → 90% of the data is below it."],["90ste persentiel → 90% van die data lê daaronder."]],
    ["K","m4:2","Quartiles split the data into quarters.","Kwartiele verdeel die data in kwarte.",["Q3 = 75th percentile"],["Q3 = 75ste persentiel"]],
    ["R","i:9","Semi-IQR = ½(Q3 − Q1).","Semi-IKO = ½(Q3 − Q1).",["½(30 − 12)","= 9"],["½(30 − 12)","= 9"]],
    ["C","i:4","Find Q1 and Q3 first.","Vind eers Q1 en Q3.",["Q1 = (5 + 6) ÷ 2 = 5.5 and Q3 = (12 + 15) ÷ 2 = 13.5","½(13.5 − 5.5) = 4"],["Q1 = (5 + 6) ÷ 2 = 5,5 en Q3 = (12 + 15) ÷ 2 = 13,5","½(13,5 − 5,5) = 4"]]
  ],
  "1002": [
    ["K","m4:1","From Q1 to Q3.","Van Q1 tot Q3.",["The box covers the middle 50% of the data."],["Die boks dek die middelste 50% van die data."]],
    ["K","m4:2","The tail points to the side with the long whisker.","Die stert wys na die kant met die lang snor.",["Long right whisker and median near Q1 → positively skewed"],["Lang regtersnor en mediaan naby Q1 → positief skeef"]],
    ["K","i:12","IQR = Q3 − Q1.","IKO = Q3 − Q1.",["22 − 10 = 12"],["22 − 10 = 12"]],
    ["K","m4:2","It splits the box.","Dit verdeel die boks.",["The line in the box is the median."],["Die lyn in die boks is die mediaan."]],
    ["K","m4:1","A narrow box means little spread.","'n Smal boks beteken min verspreiding.",["Class A's middle 50% is closer together → more consistent."],["Klas A se middelste 50% is nader aan mekaar → meer konsekwent."]],
    ["R","i:45","Upper fence = Q3 + 1.5 × IQR.","Boonste grens = Q3 + 1,5 × IKO.",["IQR = 27 − 15 = 12","27 + 1.5 × 12 = 45"],["IKO = 27 − 15 = 12","27 + 1,5 × 12 = 45"]],
    ["C","m4:0","Compare (median − Q1) with (Q3 − median).","Vergelyk (mediaan − Q1) met (Q3 − mediaan).",["33 − 30 = 3 but 50 − 33 = 17, and the right whisker (40) is longer than the left (10)","→ positively skewed"],["33 − 30 = 3 maar 50 − 33 = 17, en die regtersnor (40) is langer as die linker (10)","→ positief skeef"]]
  ],
  "1003": [
    ["K","m4:1","Which way does the mean get pulled?","In watter rigting word die gemiddeld getrek?",["Mean > median → a few high values pull the mean up (positive skew)."],["Gemiddeld > mediaan → 'n paar hoë waardes trek die gemiddeld op (positief skeef)."]],
    ["K","m4:1","Which measure only uses the middle position?","Watter maatstaf gebruik net die middelste posisie?",["The median"],["Die mediaan"]],
    ["K","m4:1","A smaller IQR means less spread.","'n Kleiner IKO beteken minder verspreiding.",["Team A's goals vary less → more consistent."],["Span A se doele wissel minder → meer konsekwent."]],
    ["K","i:","Look at the 90.","Kyk na die 90.",["90 is an outlier that pulls the mean to 25","The median (12.5) is more typical → median"],["90 is 'n uitskieter wat die gemiddeld na 25 trek","Die mediaan (12,5) is meer tipies → mediaan"]],
    ["K","m4:1","What pulls a mean up?","Wat trek 'n gemiddeld op?",["A few very high salaries are outliers that raise the mean."],["'n Paar baie hoë salarisse is uitskieters wat die gemiddeld verhoog."]],
    ["R","i:5","Find the mean and the median.","Vind die gemiddeld en die mediaan.",["Mean = 217 ÷ 7 = 31; median = 26","31 − 26 = 5"],["Gemiddeld = 217 ÷ 7 = 31; mediaan = 26","31 − 26 = 5"]],
    ["K","m4:0","A smaller range means less spread.","'n Kleiner omvang beteken minder verspreiding.",["Class X (range 12) is more tightly clustered."],["Klas X (omvang 12) is digter saamgegroepeer."]]
  ]
});
