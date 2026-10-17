/* Hints, worked solutions and CAPS cognitive levels for Grade 12, chapter 3 practice questions.
   Entry: [level, fingerprint, hint EN, hint AF, steps EN, steps AF]. Levels: K knowledge, R routine, C complex, P problem solving. */
MMHelp.add(12, 3, {
  "300": [
    ["R","m4:0","Monthly: i = 0.12 ÷ 12 and n = 5 × 12.","Maandeliks: i = 0,12 ÷ 12 en n = 5 × 12.",["i = 0.01 and n = 60","F = 1 000[(1.01)⁶⁰ − 1]/0.01"],["i = 0,01 en n = 60","F = 1 000[(1,01)⁶⁰ − 1]/0,01"]],
    ["K","m4:1","\"Sinking\" money into a fund for a target.","Geld in 'n fonds \"sink\" vir 'n teiken.",["It finds the payment needed to reach a future value."],["Dit vind die betaling wat nodig is om 'n toekomstige waarde te bereik."]],
    ["K","m4:1","The usual (ordinary) type.","Die gewone tipe.",["Payments at the end of each period → ordinary annuity"],["Betalings aan die einde van elke periode → gewone annuïteit"]],
    ["R","i:1515.05","Substitute into the formula.","Vervang in die formule.",["500[(1.01)³ − 1] ÷ 0.01","= 500 × 3.0301 = R1 515.05"],["500[(1,01)³ − 1] ÷ 0,01","= 500 × 3,0301 = R1 515,05"]],
    ["K","m4:2","Rearrange the formula.","Herrangskik die formule.",["Both forms say the same thing: B is A with x made the subject."],["Albei vorms sê dieselfde: B is A met x as die onderwerp."]],
    ["R","i:204337","i = 0.084 ÷ 12 = 0.007, n = 96.","i = 0,084 ÷ 12 = 0,007, n = 96.",["F = 1 500[(1.007)⁹⁶ − 1] ÷ 0.007","≈ R204 337"],["F = 1 500[(1,007)⁹⁶ − 1] ÷ 0,007","≈ R204 337"]],
    ["C","i:68","Solve 1 000[(1.005)ⁿ − 1]/0.005 ≥ 80 000 with logs.","Los op: 1 000[(1,005)ⁿ − 1]/0,005 ≥ 80 000 met logs.",["(1.005)ⁿ ≥ 1 + 80 000 × 0.005/1 000 = 1.4","n ≥ log 1.4 ÷ log 1.005 ≈ 67.5 → 68 months"],["(1,005)ⁿ ≥ 1 + 80 000 × 0,005/1 000 = 1,4","n ≥ log 1,4 ÷ log 1,005 ≈ 67,5 → 68 maande"]]
  ],
  "301": [
    ["R","m4:0","x = Pi ÷ [1 − (1 + i)⁻ⁿ] with i = 0.085/12, n = 240.","x = Pi ÷ [1 − (1 + i)⁻ⁿ] met i = 0,085/12, n = 240.",["x = 1 000 000 × (0.085/12) ÷ [1 − (1 + 0.085/12)⁻²⁴⁰]"],["x = 1 000 000 × (0,085/12) ÷ [1 − (1 + 0,085/12)⁻²⁴⁰]"]],
    ["K","m4:1","Present value = value today.","Huidige waarde = waarde vandag.",["It finds the loan amount matching the repayments."],["Dit vind die leningsbedrag wat by die terugbetalings pas."]],
    ["K","m4:1","The balance is the PV of the payments still to come.","Die balans is die HW van die betalings wat nog kom.",["240 − 60 = 180 remaining payments"],["240 − 60 = 180 oorblywende betalings"]],
    ["R","i:888","Substitute into the formula.","Vervang in die formule.",["x = 10 000 × 0.01 ÷ [1 − 1.01⁻¹²]","≈ R888"],["x = 10 000 × 0,01 ÷ [1 − 1,01⁻¹²]","≈ R888"]],
    ["K","m4:1","What did you pay in total?","Wat het jy altesaam betaal?",["Total repayments − amount borrowed"],["Totale terugbetalings − bedrag geleen"]],
    ["P","i:296438","Find x, then the PV of the remaining 80 payments.","Vind x en dan die HW van die oorblywende 80 betalings.",["i = 0.01, n = 180 → x = 450 000 × 0.01 ÷ [1 − 1.01⁻¹⁸⁰] ≈ R5 400.76","Balance = x[1 − 1.01⁻⁸⁰] ÷ 0.01","≈ R296 438"],["i = 0,01, n = 180 → x = 450 000 × 0,01 ÷ [1 − 1,01⁻¹⁸⁰] ≈ R5 400,76","Balance = x[1 − 1,01⁻⁸⁰] ÷ 0,01","≈ R296 438"]],
    ["C","i:119","Solve PV = 200 000 for n with logs.","Los PV = 200 000 op vir n met logs.",["200 000 = 3 000[1 − (1 + 0.13/12)⁻ⁿ] ÷ (0.13/12)","(1.010833)⁻ⁿ = 1 − 0.7222 → n ≈ 118.9 → 119 payments"],["200 000 = 3 000[1 − (1 + 0,13/12)⁻ⁿ] ÷ (0,13/12)","(1,010833)⁻ⁿ = 1 − 0,7222 → n ≈ 118,9 → 119 betalings"]]
  ],
  "302": [
    ["K","m4:1","\"Simple\" = on the original only.","\"Enkelvoudig\" = net op die oorspronklike.",["The original principal only"],["Net die oorspronklike hoofsom"]],
    ["K","m4:1","Decay compounds: subtract the rate.","Verval word saamgestel: trek die koers af.",["A = P(1 − i)ⁿ"],["A = P(1 − i)ⁿ"]],
    ["R","i:62000","A = P(1 + in).","A = P(1 + in).",["50 000(1 + 0.08 × 3)","= 50 000 × 1.24 = R62 000"],["50 000(1 + 0,08 × 3)","= 50 000 × 1,24 = R62 000"]],
    ["K","m4:0","Compound growth: A = P(1 + i)ⁿ.","Saamgestelde groei: A = P(1 + i)ⁿ.",["65 000 = 50 000(1 + i)⁵"],["65 000 = 50 000(1 + i)⁵"]],
    ["K","m4:1","Single sums vs repeated payments.","Enkelbedrae teenoor herhaalde betalings.",["Annuities involve a series of equal regular payments."],["Annuïteite behels 'n reeks gelyke gereelde betalings."]],
    ["R","i:76800","A = P(1 − i)ⁿ.","A = P(1 − i)ⁿ.",["120 000 × 0.8²","= R76 800"],["120 000 × 0,8²","= R76 800"]],
    ["C","i:15.2","Solve (1 − i)⁵ = 140 000 ÷ 320 000.","Los op: (1 − i)⁵ = 140 000 ÷ 320 000.",["(1 − i)⁵ = 0.4375 → 1 − i = 0.4375^(1/5) ≈ 0.8476","i ≈ 15.2%"],["(1 − i)⁵ = 0,4375 → 1 − i = 0,4375^(1/5) ≈ 0,8476","i ≈ 15,2%"]],
    ["C","i:44818","Two stages: simple, then compound.","Twee fases: enkelvoudig, dan saamgestel.",["Stage 1: 25 000(1 + 0.09 × 3) = R31 750","Stage 2: 31 750 × 1.09⁴ ≈ R44 818"],["Fase 1: 25 000(1 + 0,09 × 3) = R31 750","Fase 2: 31 750 × 1,09⁴ ≈ R44 818"]]
  ],
  "303": [
    ["K","m4:0","Compound the period rate m times.","Stel die periodekoers m keer saam.",["i_eff = (1 + i_nom/m)^m − 1"],["i_eff = (1 + i_nom/m)^m − 1"]],
    ["R","m4:1","(1 + 0.09/12)¹² − 1.","(1 + 0,09/12)¹² − 1.",["1.0075¹² ≈ 1.0938","≈ 9.38%"],["1,0075¹² ≈ 1,0938","≈ 9,38%"]],
    ["K","m4:1","Compare like with like.","Vergelyk soortgelyke dinge.",["Convert both to effective annual rates first."],["Herlei albei eers na effektiewe jaarkoerse."]],
    ["K","m4:1","Where does the money come from?","Waar kom die geld vandaan?",["Returns are paid from new investors' money, not real profit."],["Opbrengste word uit nuwe beleggers se geld betaal, nie uit werklike wins nie."]],
    ["R","i:12.55","(1 + 0.12/4)⁴ − 1.","(1 + 0,12/4)⁴ − 1.",["1.03⁴ ≈ 1.1255","≈ 12.55%"],["1,03⁴ ≈ 1,1255","≈ 12,55%"]],
    ["C","m4:0","Work out both effective rates.","Bereken albei effektiewe koerse.",["A: (1 + 0.104/4)⁴ − 1 ≈ 10.81%","B: (1 + 0.103/12)¹² − 1 ≈ 10.80% → Bank A"],["A: (1 + 0,104/4)⁴ − 1 ≈ 10,81%","B: (1 + 0,103/12)¹² − 1 ≈ 10,80% → Bank A"]],
    ["R","i:10.81","(1 + 0.104/4)⁴ − 1.","(1 + 0,104/4)⁴ − 1.",["1.026⁴ ≈ 1.1081","≈ 10.81%"],["1,026⁴ ≈ 1,1081","≈ 10,81%"]]
  ]
});
