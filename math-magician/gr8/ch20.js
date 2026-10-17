// Math Magician — Grade 8, Chapter 20
// Graphs

MathMagician.registerChapter(20, {
  topics: [
    {
      id: 2001,
      name: "Interpreting global graphs",
      fullName: "Interpreting global graphs: increasing, decreasing, constant, maximum, minimum, discrete and continuous",
      lesson: {
        heading: "Interpreting global graphs",
        sub: "Chapter 20 · Topic 1",
        body: `
<p>A <strong>global graph</strong> shows the overall shape of a relationship: how one quantity changes as another changes. You read its <em>shape</em> first, then the numbers.</p>
<div class="def-box">
  <div class="def-box-title">📖 Features of a graph</div>
  <p><strong>Increasing</strong>: the graph goes up from left to right.<br><strong>Decreasing</strong>: it goes down from left to right.<br><strong>Constant</strong>: a horizontal (flat) section, nothing changes.<br><strong>Maximum / minimum</strong>: the highest / lowest point.<br><strong>Linear</strong>: a straight line. <strong>Non-linear</strong>: a curve.<br><strong>Continuous</strong>: the points are joined, because every in-between value makes sense (time, temperature). <strong>Discrete</strong>: separate points, because only whole values make sense (number of people).</p>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: Sipho walks to school</div>
  <div class="mf-fig" data-fig='{"t":"geo","free":true,"w":300,"h":190,"view":[0,0,28,1600],"pad":26,"axes":{"x":"time (min)","y":"distance (m)","o":false,"tx":5,"ty":400},"pts":{"P0":[0,0],"P1":[10,800],"P2":[15,800],"P3":[25,1400]},"nolab":["P0","P1","P2","P3"],"seg":[["P0","P1","ac"],["P1","P2","ac"],["P2","P3","ac"]]}'></div>
  <div class="example-step"><span class="step-num">1</span><span>0 to 10 min: the graph increases. Sipho walks 800 m.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>10 to 15 min: the graph is constant. Sipho stands still (he waits for a friend).</span></div>
  <div class="example-step"><span class="step-num">3</span><span>15 to 25 min: increasing again, but less steeply: they walk 600 m in 10 min, slower than before.</span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: temperature during a day</div>
  <div class="mf-fig" data-fig='{"t":"geo","free":true,"w":300,"h":190,"view":[0,-4,28,21],"pad":26,"axes":{"x":"time (h)","y":"°C","o":false,"tx":6,"ty":5},"fn":[{"f":"8+10*Math.sin((x-8)*Math.PI/12)","c":"ac","dom":[0,24]}],"pts":{"M":[14,18],"m":[2,-2]},"dots":true,"names":{"M":"max","m":"min"},"lab":{"M":"n","m":"s"}}'></div>
  <p>The curve is <strong>non-linear</strong> and <strong>continuous</strong>. It decreases to a minimum of −2 °C at 02:00, increases to a maximum of 18 °C at 14:00, then decreases again.</p>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Steeper means faster change. A flat section always means “no change”, never “stopped drawing”.</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "Sipho's walk:<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":300,\"h\":190,\"view\":[0,0,28,1600],\"pad\":26,\"axes\":{\"x\":\"time (min)\",\"y\":\"distance (m)\",\"o\":false,\"tx\":5,\"ty\":400},\"pts\":{\"P0\":[0,0],\"P1\":[10,800],\"P2\":[15,800],\"P3\":[25,1400]},\"nolab\":[\"P0\",\"P1\",\"P2\",\"P3\"],\"seg\":[[\"P0\",\"P1\",\"ac\"],[\"P1\",\"P2\",\"ac\"],[\"P2\",\"P3\",\"ac\"]]}'></div>Between which times was Sipho standing still?", "options": ["0 and 10 min", "10 and 15 min", "15 and 25 min", "He never stood still"], "answer": 1, "topic": "Interpreting global graphs"},
        {"type": "input", "text": "Use the same graph of Sipho's walk.<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":300,\"h\":190,\"view\":[0,0,28,1600],\"pad\":26,\"axes\":{\"x\":\"time (min)\",\"y\":\"distance (m)\",\"o\":false,\"tx\":5,\"ty\":400},\"pts\":{\"P0\":[0,0],\"P1\":[10,800],\"P2\":[15,800],\"P3\":[25,1400]},\"nolab\":[\"P0\",\"P1\",\"P2\",\"P3\"],\"seg\":[[\"P0\",\"P1\",\"ac\"],[\"P1\",\"P2\",\"ac\"],[\"P2\",\"P3\",\"ac\"]]}'></div>How far had Sipho walked after 10 minutes? (m)", "answer": "800", "topic": "Interpreting global graphs"},
        {"type": "mc", "text": "A graph that goes up from left to right is:", "options": ["increasing", "decreasing", "constant", "discrete"], "answer": 0, "topic": "Interpreting global graphs"},
        {"type": "mc", "text": "A horizontal section of a graph shows that the quantity is:", "options": ["increasing quickly", "decreasing", "constant", "at a minimum"], "answer": 2, "topic": "Interpreting global graphs"},
        {"type": "mc", "text": "A graph shows the number of learners in a class on each school day. Should the points be joined?", "options": ["Yes, the data is continuous", "No, the data is discrete", "Yes, because it is linear", "No, because it is decreasing"], "answer": 1, "topic": "Interpreting global graphs"},
        {"type": "mc", "text": "The highest point on a graph is called the:", "options": ["origin", "minimum", "intercept", "maximum"], "answer": 3, "topic": "Interpreting global graphs"},
        {"type": "mc", "text": "Which of these graphs is non-linear?", "options": ["A straight line going up", "A straight line going down", "A curve", "A horizontal line"], "answer": 2, "topic": "Interpreting global graphs"},
      ]
    },
    {
      id: 2002,
      name: "Drawing global graphs",
      fullName: "Drawing global graphs from descriptions of situations",
      lesson: {
        heading: "Drawing global graphs",
        sub: "Chapter 20 · Topic 2",
        body: `
<p>To draw a global graph from a description, you do not need exact numbers. Decide what goes on each axis, then sketch each part of the story in order.</p>
<div class="def-box">
  <div class="def-box-title">📖 Four steps</div>
  <p>1. Put the variable that changes by itself (usually time) on the horizontal axis.<br>2. Put the quantity you measure on the vertical axis.<br>3. Split the story into parts: is the quantity increasing, decreasing or constant in each part? Fast or slow?<br>4. Sketch each part: steep for fast change, gentle for slow change, flat for no change.</p>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: filling and draining a bath</div>
  <div class="example-step"><span class="step-num">1</span><span>Story: a bath is filled at a steady rate, left full while someone bathes, then drained quickly.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>Axes: time across, water level up.</span></div>
  <div class="example-step"><span class="step-num">3</span><span>Parts: steady increase (straight line up), constant (flat), fast decrease (steep line down).</span></div>
  <div class="mf-fig" data-fig='{"t":"geo","free":true,"w":300,"h":170,"pad":26,"view":[0,0,10,10],"axes":{"x":"time","y":"level","o":false},"pts":{"A":[0,0],"B":[4,8],"C":[7,8],"D":[8.5,0]},"nolab":["A","B","C","D"],"seg":[["A","B","ac"],["B","C","ac"],["C","D","ac"]],"txt":[[2,6.5,"filling","mu"],[5.5,9,"full","mu"],[9.2,4.5,"draining","mu"]]}'></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Check your sketch by telling the story back from the graph. If the story does not match, change the graph.</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "A bath is filled at a steady rate, left full for a while, then drained quickly. Which graph shows the water level?", "options": ["<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":120,\"h\":80,\"pad\":10,\"view\":[0,0,10,10],\"axes\":{\"x\":\" \",\"y\":\" \",\"o\":false},\"pts\":{\"P0\":[0,0],\"P1\":[4,8],\"P2\":[7,8],\"P3\":[8.5,0]},\"nolab\":[\"P0\",\"P1\",\"P2\",\"P3\"],\"seg\":[[\"P0\",\"P1\",\"ac\"],[\"P1\",\"P2\",\"ac\"],[\"P2\",\"P3\",\"ac\"]]}'></div>", "<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":120,\"h\":80,\"pad\":10,\"view\":[0,0,10,10],\"axes\":{\"x\":\" \",\"y\":\" \",\"o\":false},\"pts\":{\"P0\":[0,8],\"P1\":[3,0],\"P2\":[6,0],\"P3\":[9,8]},\"nolab\":[\"P0\",\"P1\",\"P2\",\"P3\"],\"seg\":[[\"P0\",\"P1\",\"ac\"],[\"P1\",\"P2\",\"ac\"],[\"P2\",\"P3\",\"ac\"]]}'></div>", "<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":120,\"h\":80,\"pad\":10,\"view\":[0,0,10,10],\"axes\":{\"x\":\" \",\"y\":\" \",\"o\":false},\"pts\":{\"P0\":[0,0],\"P1\":[9,9]},\"nolab\":[\"P0\",\"P1\"],\"seg\":[[\"P0\",\"P1\",\"ac\"]]}'></div>", "<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":120,\"h\":80,\"pad\":10,\"view\":[0,0,10,10],\"axes\":{\"x\":\" \",\"y\":\" \",\"o\":false},\"pts\":{\"P0\":[0,0],\"P1\":[2,8],\"P2\":[9,8]},\"nolab\":[\"P0\",\"P1\",\"P2\"],\"seg\":[[\"P0\",\"P1\",\"ac\"],[\"P1\",\"P2\",\"ac\"]]}'></div>"], "answer": 0, "topic": "Drawing global graphs"},
        {"type": "mc", "text": "A car speeds up from rest, drives at a steady speed, then slows down to stop. On a speed–time graph, the middle part is:", "options": ["increasing", "decreasing", "constant (horizontal)", "a maximum point only"], "answer": 2, "topic": "Drawing global graphs"},
        {"type": "mc", "text": "A candle burns down at a steady rate. Its height against time is:", "options": ["increasing and linear", "decreasing and linear", "constant", "increasing and non-linear"], "answer": 1, "topic": "Drawing global graphs"},
        {"type": "mc", "text": "When you sketch a global graph of a story, time usually goes on the:", "options": ["horizontal axis", "vertical axis", "both axes", "neither axis"], "answer": 0, "topic": "Drawing global graphs"},
        {"type": "mc", "text": "A learner cycles up a hill slowly, then down the other side quickly. On a distance–time graph, the downhill part is:", "options": ["less steep than the uphill part", "steeper than the uphill part", "horizontal", "going down"], "answer": 1, "topic": "Drawing global graphs"},
        {"type": "mc", "text": "A plant grows quickly at first, then more and more slowly. Its height against time is:", "options": ["a straight line going up", "a horizontal line", "decreasing", "a curve that rises steeply, then flattens"], "answer": 3, "topic": "Drawing global graphs"},
      ]
    },
    {
      id: 2003,
      name: "Plotting points and drawing graphs",
      fullName: "The Cartesian plane, ordered pairs, and drawing graphs from tables",
      lesson: {
        heading: "Plotting points and drawing graphs",
        sub: "Chapter 20 · Topic 3",
        body: `
<p>The <strong>Cartesian plane</strong> has a horizontal x-axis and a vertical y-axis that cross at the <strong>origin</strong> O(0 ; 0). Every point is named by an <strong>ordered pair</strong> (x ; y): first go across, then up or down.</p>
<div class="mf-fig" data-fig='{"t":"geo","w":260,"h":260,"view":[-5,-5,5,5],"grid":1,"axes":{"ticks":1},"pts":{"A":[3,2],"B":[-2,4],"C":[-4,-1],"D":[2,-3]},"dots":true,"lab":{"A":"ne","B":"ne","C":"nw","D":"se"}}'></div>
<div class="def-box">
  <div class="def-box-title">📖 Reading the points</div>
  <p>A(3 ; 2), B(−2 ; 4), C(−4 ; −1), D(2 ; −3).<br>The axes split the plane into four <strong>quadrants</strong>, numbered anticlockwise from the top right: I (+ ; +), II (− ; +), III (− ; −), IV (+ ; −).</p>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: from a table to a graph</div>
  <div class="example-step"><span class="step-num">1</span><span>Rule: y = 2x + 1. Make a table:</span></div>
  <div class="math-block">x  │ 0   1   2   3
y  │ 1   3   5   7</div>
  <div class="example-step"><span class="step-num">2</span><span>Plot each pair (x ; y) as a point.</span></div>
  <div class="example-step"><span class="step-num">3</span><span>The points lie on a straight line, so the graph is <strong>linear</strong>. Join them with a ruler.</span></div>
  <div class="mf-fig" data-fig='{"t":"geo","w":260,"h":260,"view":[-1,-1,4,8],"grid":1,"axes":{"ticks":1},"fn":[{"f":"2*x+1","c":"ac","dom":[-0.5,3.4]}],"pts":{"(0;1)":[0,1],"(1;3)":[1,3],"(2;5)":[2,5],"(3;7)":[3,7]},"dots":true,"lab":{"(0;1)":"nw","(1;3)":"nw","(2;5)":"nw","(3;7)":"nw"}}'></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>x comes first, like the alphabet: walk along the corridor (x) before you go up the stairs (y).</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "In which quadrant is the point (3 ; −2)?", "options": ["I", "II", "III", "IV"], "answer": 3, "topic": "Plotting points and drawing graphs"},
        {"type": "input", "text": "Point P is 4 units to the right of the origin and 3 units down. Write its coordinates as (x ; y).", "answer": "(4 ; -3)", "topic": "Plotting points and drawing graphs"},
        {"type": "mc", "text": "Which point lies on the y-axis?", "options": ["(5 ; 0)", "(0 ; 5)", "(5 ; 5)", "(−5 ; 5)"], "answer": 1, "topic": "Plotting points and drawing graphs"},
        {"type": "mc", "text": "Points on a grid:<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"w\":260,\"h\":260,\"view\":[-5,-5,5,5],\"grid\":1,\"axes\":{\"ticks\":1},\"pts\":{\"A\":[3,2],\"B\":[-2,4],\"C\":[-4,-1],\"D\":[2,-3]},\"dots\":true,\"lab\":{\"A\":\"ne\",\"B\":\"ne\",\"C\":\"nw\",\"D\":\"se\"}}'></div>Which point is (−2 ; 4)?", "options": ["A", "B", "C", "D"], "answer": 1, "topic": "Plotting points and drawing graphs"},
        {"type": "input", "text": "For y = 2x + 1, complete the table: when x = 3, y = ?", "answer": "7", "topic": "Plotting points and drawing graphs"},
        {"type": "input", "text": "For y = 3x − 2, what is y when x = −1?", "answer": "-5", "topic": "Plotting points and drawing graphs"},
        {"type": "mc", "text": "The points (0 ; 1), (1 ; 3), (2 ; 5) and (3 ; 7) all lie on:", "options": ["a straight line", "a curve", "the x-axis", "a circle"], "answer": 0, "topic": "Plotting points and drawing graphs"},
      ]
    },
    {
      id: 2004,
      name: "Ch 20 Exam focus",
      fullName: "Exam practice: interpreting, drawing and plotting graphs",
      lesson: {
        heading: "Chapter 20 exam focus",
        sub: "Chapter 20 · Topic 4",
        body: `
<p>Exam questions on graphs usually ask you to <strong>describe</strong> a graph in words, <strong>match</strong> a graph to a story, <strong>read</strong> values off a graph, or <strong>plot</strong> points from a table.</p>
<div class="def-box">
  <div class="def-box-title">📖 Words to use when you describe a graph</div>
  <p>increasing · decreasing · constant · maximum · minimum · linear · non-linear · continuous · discrete · steep (fast) · gentle (slow)</p>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Always give the interval: “the temperature increases <em>from 02:00 to 14:00</em>” earns more marks than “the temperature increases”.</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "A taxi's distance from the rank against time is flat for 5 minutes. During those 5 minutes the taxi is:", "options": ["driving fast", "driving back to the rank", "standing still", "speeding up"], "answer": 2, "topic": "Ch 20 Exam focus"},
        {"type": "input", "text": "Use Sipho's walk.<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":300,\"h\":190,\"view\":[0,0,28,1600],\"pad\":26,\"axes\":{\"x\":\"time (min)\",\"y\":\"distance (m)\",\"o\":false,\"tx\":5,\"ty\":400},\"pts\":{\"P0\":[0,0],\"P1\":[10,800],\"P2\":[15,800],\"P3\":[25,1400]},\"nolab\":[\"P0\",\"P1\",\"P2\",\"P3\"],\"seg\":[[\"P0\",\"P1\",\"ac\"],[\"P1\",\"P2\",\"ac\"],[\"P2\",\"P3\",\"ac\"]]}'></div>How many metres did Sipho walk between 15 and 25 minutes?", "answer": "600", "topic": "Ch 20 Exam focus"},
        {"type": "mc", "text": "In which quadrant are both coordinates negative?", "options": ["I", "II", "III", "IV"], "answer": 2, "topic": "Ch 20 Exam focus"},
        {"type": "mc", "text": "The cost of buying 1, 2, 3 … tickets is plotted. The graph is:", "options": ["continuous", "discrete", "non-linear and continuous", "constant"], "answer": 1, "topic": "Ch 20 Exam focus"},
        {"type": "input", "text": "For y = 5 − x, what is y when x = 2?", "answer": "3", "topic": "Ch 20 Exam focus"},
        {"type": "mc", "text": "A ball is thrown up and falls back down. Its height against time has a:", "options": ["maximum", "minimum", "constant section only", "straight-line shape"], "answer": 0, "topic": "Ch 20 Exam focus"},
      ]
    },
  ],
  workbook: {
    "chapter": 20,
    "chapterName": "Graphs",
    "topics": [
      {
        "name": "Interpreting global graphs",
        "questions": [
          {
            "num": "1",
            "text": "Nomsa cycles to the shop. The graph of her distance from home: 0–8 min rises to 2 km, 8–20 min stays at 2 km, 20–30 min falls back to 0 km.",
            "parts": [
              {
                "label": "a)",
                "text": "Describe what Nomsa does in each of the three parts.",
                "marks": 3
              },
              {
                "label": "b)",
                "text": "Was she faster going to the shop or coming home? Explain using the graph.",
                "marks": 2
              },
              {
                "label": "c)",
                "text": "Is the graph discrete or continuous? Why?",
                "marks": 2
              }
            ]
          }
        ]
      },
      {
        "name": "Drawing global graphs",
        "questions": [
          {
            "num": "2",
            "text": "Sketch a global graph for each story. Label the axes.",
            "parts": [
              {
                "label": "a)",
                "text": "A kettle heats water from 20 °C to 100 °C, then switches off and the water slowly cools.",
                "marks": 3
              },
              {
                "label": "b)",
                "text": "A plane climbs to its cruising height, flies level for two hours, then descends to land.",
                "marks": 3
              }
            ]
          }
        ]
      },
      {
        "name": "Plotting points and drawing graphs",
        "questions": [
          {
            "num": "3",
            "text": "y = 3 − x",
            "parts": [
              {
                "label": "a)",
                "text": "Complete a table of values for x = −1, 0, 1, 2, 3.",
                "marks": 3
              },
              {
                "label": "b)",
                "text": "Plot the points on a Cartesian plane and draw the graph.",
                "marks": 3
              },
              {
                "label": "c)",
                "text": "Where does the graph cut the y-axis?",
                "marks": 1
              }
            ]
          }
        ]
      }
    ]
  },
  answerKey: {
    "chapter": 20,
    "chapterName": "Chapter 20 — Graphs",
    "topics": [
      {
        "name": "Interpreting global graphs",
        "answers": [
          {
            "num": "Q1a",
            "ans": "0–8 min: she cycles 2 km to the shop (increasing). 8–20 min: she is at the shop (constant). 20–30 min: she cycles home (decreasing).",
            "note": "One mark per part, with the time interval."
          },
          {
            "num": "Q1b",
            "ans": "Faster going to the shop: 2 km in 8 min, against 2 km in 10 min coming home.",
            "note": "The steeper part of the graph is the faster part."
          },
          {
            "num": "Q1c",
            "ans": "Continuous: time and distance can take any in-between value.",
            "note": ""
          }
        ]
      },
      {
        "name": "Drawing global graphs",
        "answers": [
          {
            "num": "Q2a",
            "ans": "Time across, temperature up: starts at 20, rises (linear or slightly curved) to 100, then a curve that decreases more and more slowly.",
            "note": "Award marks for axes, increase, maximum at 100, slow decrease."
          },
          {
            "num": "Q2b",
            "ans": "Time across, height up: increases, constant (flat) for two hours, then decreases to 0.",
            "note": ""
          }
        ]
      },
      {
        "name": "Plotting points and drawing graphs",
        "answers": [
          {
            "num": "Q3a",
            "ans": "x: −1, 0, 1, 2, 3 → y: 4, 3, 2, 1, 0",
            "note": "Substitute each x into y = 3 − x."
          },
          {
            "num": "Q3b",
            "ans": "A straight line through (−1 ; 4), (0 ; 3), (1 ; 2), (2 ; 1) and (3 ; 0).",
            "note": "Decreasing and linear."
          },
          {
            "num": "Q3c",
            "ans": "At (0 ; 3).",
            "note": "Put x = 0."
          }
        ]
      }
    ]
  }
});
