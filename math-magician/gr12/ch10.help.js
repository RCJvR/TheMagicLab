/* Hints, worked solutions and CAPS cognitive levels for Grade 12, chapter 10 practice questions.
   Entry: [level, fingerprint, hint EN, hint AF, steps EN, steps AF]. Levels: K knowledge, R routine, C complex, P problem solving. */
MMHelp.add(12, 10, {
  "1000": [
    ["R","m4:1","9 choices for each position.","9 keuses vir elke posisie.",["9 × 9 × 9","= 729"],["9 × 9 × 9","= 729"]],
    ["R","i:30","Cancel 4!.","Kanselleer 4!.",["6 × 5 × 4!/4!","= 30"],["6 × 5 × 4!/4!","= 30"]],
    ["R","m4:1","5!","5!",["5 × 4 × 3 × 2 × 1","= 120"],["5 × 4 × 3 × 2 × 1","= 120"]],
    ["R","m4:1","ₙPᵣ = n!/(n − r)!.","ₙPᵣ = n!/(n − r)!.",["7 × 6","= 42"],["7 × 6","= 42"]],
    ["C","m4:0","Place A and B first, then the rest.","Plaas eers A en B, dan die res.",["A and B at the ends: 2 ways","Middle 4 people: 4! = 24 → 2 × 24 = 48"],["A en B aan die ente: 2 maniere","Middelste 4 mense: 4! = 24 → 2 × 24 = 48"]],
    ["C","i:36","Fill the restricted positions first.","Vul eers die beperkte posisies.",["First letter: 3 vowels; last letter: 2 consonants","Middle 3 letters: 3! = 6 → 3 × 2 × 6 = 36"],["Eerste letter: 3 vokale; laaste letter: 2 konsonante","Middelste 3 letters: 3! = 6 → 3 × 2 × 6 = 36"]],
    ["C","i:72","Total minus \"together\".","Totaal minus \"saam\".",["Total: 5! = 120","Together: treat as one block → 4! × 2 = 48","120 − 48 = 72"],["Totaal: 5! = 120","Saam: behandel as een blok → 4! × 2 = 48","120 − 48 = 72"]]
  ],
  "1001": [
    ["R","m4:1","ₙCᵣ = n!/(r!(n − r)!).","ₙCᵣ = n!/(r!(n − r)!).",["(8 × 7 × 6) ÷ 3!","= 336 ÷ 6 = 56"],["(8 × 7 × 6) ÷ 3!","= 336 ÷ 6 = 56"]],
    ["K","m4:1","Order doesn't matter → combination.","Volgorde maak nie saak nie → kombinasie.",["₁₂C₅"],["₁₂C₅"]],
    ["R","i:120","₁₀C₃.","₁₀C₃.",["(10 × 9 × 8) ÷ 6","= 120"],["(10 × 9 × 8) ÷ 6","= 120"]],
    ["R","m4:0","Favourable hands ÷ all hands.","Gunstige hande ÷ alle hande.",["Hearts hands: ₁₃C₅; all hands: ₅₂C₅","P = ₁₃C₅/₅₂C₅"],["Harte-hande: ₁₃C₅; alle hande: ₅₂C₅","P = ₁₃C₅/₅₂C₅"]],
    ["R","m4:0","Choose boys and girls separately.","Kies seuns en meisies apart.",["₅C₂ × ₃C₂ = 10 × 3 = 30","₈C₄ = 70 → P = 30/70 (not 10/70)"],["₅C₂ × ₃C₂ = 10 × 3 = 30","₈C₄ = 70 → P = 30/70 (nie 10/70 nie)"]],
    ["C","i:210","\"At least 3\" = exactly 3 or exactly 4.","\"Ten minste 3\" = presies 3 of presies 4.",["3 boys: ₇C₃ × ₅C₁ = 35 × 5 = 175","4 boys: ₇C₄ = 35","175 + 35 = 210"],["3 seuns: ₇C₃ × ₅C₁ = 35 × 5 = 175","4 seuns: ₇C₄ = 35","175 + 35 = 210"]],
    ["C","i:2/3","Exactly 2 red or exactly 3 red.","Presies 2 rooi of presies 3 rooi.",["₆C₂ × ₄C₁ = 60 and ₆C₃ = 20 → 80","₁₀C₃ = 120 → 80/120 = 2/3"],["₆C₂ × ₄C₁ = 60 en ₆C₃ = 20 → 80","₁₀C₃ = 120 → 80/120 = 2/3"]]
  ],
  "1002": [
    ["R","m4:1","P(A or B) = P(A) + P(B) − P(A and B).","P(A of B) = P(A) + P(B) − P(A en B).",["0.5 + 0.3 − 0.1","= 0.7"],["0,5 + 0,3 − 0,1","= 0,7"]],
    ["K","m4:1","Mutually exclusive: just add.","Onderling uitsluitend: tel net op.",["0.4 + 0.35 = 0.75"],["0,4 + 0,35 = 0,75"]],
    ["K","i:0.3","P(not A) = 1 − P(A).","P(nie A) = 1 − P(A).",["1 − 0.7 = 0.3"],["1 − 0,7 = 0,3"]],
    ["R","m4:0","Test P(A) × P(B).","Toets P(A) × P(B).",["0.5 × 0.4 = 0.2 = P(A and B)","→ independent"],["0,5 × 0,4 = 0,2 = P(A en B)","→ onafhanklik"]],
    ["R","m4:0","Find n(S or T) first.","Vind eers n(S of T).",["22 + 20 − 8 = 34","40 − 34 = 6"],["22 + 20 − 8 = 34","40 − 34 = 6"]],
    ["K","i:0.09","Independent: multiply.","Onafhanklik: vermenigvuldig.",["0.3 × 0.3 = 0.09"],["0,3 × 0,3 = 0,09"]],
    ["C","i:12","At least one subject: 50 − 10 = 40.","Ten minste een vak: 50 − 10 = 40.",["40 = 28 + 24 − n(M and P)","n(M and P) = 12"],["40 = 28 + 24 − n(W en N)","n(W en N) = 12"]],
    ["R","i:0.2","Mutually exclusive: P(A or B) = P(A) + P(B).","Onderling uitsluitend: P(A of B) = P(A) + P(B).",["x + 2x = 0.6","3x = 0.6 → x = 0.2"],["x + 2x = 0,6","3x = 0,6 → x = 0,2"]]
  ],
  "1003": [
    ["K","m4:1","Along a branch = \"and\".","Langs 'n tak = \"en\".",["Multiply"],["Vermenigvuldig"]],
    ["K","m4:1","The first draw changes the bag.","Die eerste trekking verander die sak.",["Without replacement → dependent"],["Sonder terugplasing → afhanklik"]],
    ["R","i:3/10","3/5, then 2/4.","3/5, dan 2/4.",["3/5 × 2/4 = 6/20","= 3/10"],["3/5 × 2/4 = 6/20","= 3/10"]],
    ["K","m4:1","Two categories at once.","Twee kategorieë tegelyk.",["Conditional probabilities from two categorical variables"],["Voorwaardelike waarskynlikhede uit twee kategoriese veranderlikes"]],
    ["K","m4:1","The bag is the same each time.","Die sak is elke keer dieselfde.",["With replacement → independent"],["Met terugplasing → onafhanklik"]],
    ["R","i:1/2","HT or TH.","KS of SK.",["½ × ½ + ½ × ½","= 1/2"],["½ × ½ + ½ × ½","= 1/2"]],
    ["R","i:1/30","4/10, then 3/9, then 2/8.","4/10, dan 3/9, dan 2/8.",["4/10 × 3/9 × 2/8 = 24/720","= 1/30"],["4/10 × 3/9 × 2/8 = 24/720","= 1/30"]],
    ["P","i:2/5","Glue the vowels together into one block.","Plak die vokale saam in een blok.",["All arrangements: 5! = 120","Block EA + X, M, S: 4! = 24 arrangements, × 2 for EA or AE = 48","P = 48/120 = 2/5"],["Alle rangskikkings: 5! = 120","Blok EA + X, M, S: 4! = 24 rangskikkings, × 2 vir EA of AE = 48","P = 48/120 = 2/5"]]
  ]
});
