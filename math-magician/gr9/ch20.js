// Math Magician — Grade 9, Chapter 20
// Graphs

MathMagician.registerChapter(20, {
  topics: [
    {
      id: 2001,
      chapter: 20,
      name: "Interpreting graphs",
      fullName: "Interpreting global and linear graphs: trends, features, intercepts and gradient",
      lesson: {
        heading: "Interpreting graphs",
        sub: "Chapter 20 · Topic 1",
        body: `
<p>To interpret a graph, describe its <strong>trend</strong> (increasing, decreasing, constant), whether it is <strong>linear</strong> or <strong>non-linear</strong>, any <strong>maximum or minimum</strong>, whether it is <strong>discrete or continuous</strong>, and where it cuts the axes (the <strong>intercepts</strong>).</p>
<div class="mf-fig" data-fig='{"t":"geo","free":true,"w":300,"h":190,"view":[0,0,12,110],"pad":28,"axes":{"x":"time (h)","y":"litres","o":false,"tx":2,"ty":20},"pts":{"A":[0,100],"B":[4,60],"C":[6,60],"D":[11,0]},"nolab":["A","B","C","D"],"dots":["A","D"],"seg":[["A","B","ac"],["B","C","ac"],["C","D","ac"]]}'></div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: water in a tank</div>
  <div class="example-step"><span class="step-num">1</span><span>The y-intercept (0 ; 100): at the start the tank holds 100 litres.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>0–4 h: decreasing and linear: 40 litres used in 4 hours, 10 litres per hour.</span></div>
  <div class="example-step"><span class="step-num">3</span><span>4–6 h: constant: no water is used.</span></div>
  <div class="example-step"><span class="step-num">4</span><span>6–11 h: decreasing faster (the line is steeper): 60 litres in 5 hours, 12 litres per hour.</span></div>
  <div class="example-step"><span class="step-num">5</span><span>The x-intercept (11 ; 0): the tank is empty after 11 hours.</span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>The gradient (steepness) of a straight piece tells you the rate: change in y ÷ change in x, with units such as litres per hour.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "The water tank.<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":300,\"h\":190,\"view\":[0,0,12,110],\"pad\":28,\"axes\":{\"x\":\"time (h)\",\"y\":\"litres\",\"o\":false,\"tx\":2,\"ty\":20},\"pts\":{\"A\":[0,100],\"B\":[4,60],\"C\":[6,60],\"D\":[11,0]},\"nolab\":[\"A\",\"B\",\"C\",\"D\"],\"dots\":[\"A\",\"D\"],\"seg\":[[\"A\",\"B\",\"ac\"],[\"B\",\"C\",\"ac\"],[\"C\",\"D\",\"ac\"]]}'></div>How many litres does the tank hold at the start?", "answer": "100", "topic": "Interpreting graphs"},
        {"type": "mc", "text": "The water tank.<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":300,\"h\":190,\"view\":[0,0,12,110],\"pad\":28,\"axes\":{\"x\":\"time (h)\",\"y\":\"litres\",\"o\":false,\"tx\":2,\"ty\":20},\"pts\":{\"A\":[0,100],\"B\":[4,60],\"C\":[6,60],\"D\":[11,0]},\"nolab\":[\"A\",\"B\",\"C\",\"D\"],\"dots\":[\"A\",\"D\"],\"seg\":[[\"A\",\"B\",\"ac\"],[\"B\",\"C\",\"ac\"],[\"C\",\"D\",\"ac\"]]}'></div>Between 4 h and 6 h the graph is:", "options": ["increasing", "decreasing", "constant", "non-linear"], "answer": 2, "topic": "Interpreting graphs"},
        {"type": "input", "text": "The water tank.<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":300,\"h\":190,\"view\":[0,0,12,110],\"pad\":28,\"axes\":{\"x\":\"time (h)\",\"y\":\"litres\",\"o\":false,\"tx\":2,\"ty\":20},\"pts\":{\"A\":[0,100],\"B\":[4,60],\"C\":[6,60],\"D\":[11,0]},\"nolab\":[\"A\",\"B\",\"C\",\"D\"],\"dots\":[\"A\",\"D\"],\"seg\":[[\"A\",\"B\",\"ac\"],[\"B\",\"C\",\"ac\"],[\"C\",\"D\",\"ac\"]]}'></div>At what time is the tank empty? (h)", "answer": "11", "topic": "Interpreting graphs"},
        {"type": "mc", "text": "The water tank.<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":300,\"h\":190,\"view\":[0,0,12,110],\"pad\":28,\"axes\":{\"x\":\"time (h)\",\"y\":\"litres\",\"o\":false,\"tx\":2,\"ty\":20},\"pts\":{\"A\":[0,100],\"B\":[4,60],\"C\":[6,60],\"D\":[11,0]},\"nolab\":[\"A\",\"B\",\"C\",\"D\"],\"dots\":[\"A\",\"D\"],\"seg\":[[\"A\",\"B\",\"ac\"],[\"B\",\"C\",\"ac\"],[\"C\",\"D\",\"ac\"]]}'></div>Between 6 h and 11 h the water is used:", "options": ["faster than between 0 h and 4 h", "slower than between 0 h and 4 h", "at the same rate", "not at all"], "answer": 0, "topic": "Interpreting graphs"},
        {"type": "mc", "text": "The point where a graph cuts the y-axis is called the:", "options": ["x-intercept", "y-intercept", "maximum", "gradient"], "answer": 1, "topic": "Interpreting graphs"},
        {"type": "input", "text": "A graph goes from (0 ; 100) to (4 ; 60) in a straight line. What is the rate of change per hour? Give a negative number for a decrease.", "answer": "-10", "topic": "Interpreting graphs"},
      ]
    },
    {
      id: 2002,
      chapter: 20,
      name: "Drawing global graphs",
      fullName: "Drawing global graphs from descriptions of situations",
      lesson: {
        heading: "Drawing global graphs",
        sub: "Chapter 20 · Topic 2",
        body: `
<p>When you sketch a global graph from a story, you show the <em>shape</em>, not exact values. Put time (or the independent variable) on the horizontal axis and decide, part by part, how the other quantity changes.</p>
<div class="example-box">
  <div class="example-box-title">✏️ Example: a parachute jump</div>
  <div class="example-step"><span class="step-num">1</span><span>A skydiver jumps from 3 000 m. She falls faster and faster, opens her parachute, then drifts down slowly at a steady speed until she lands.</span></div>
  <div class="example-step"><span class="step-num">2</span><span>Height against time: a curve that gets steeper (falling faster), then a gentle straight line down to 0.</span></div>
</div>
<div class="mf-fig" data-fig='{"t":"geo","free":true,"w":300,"h":180,"view":[0,0,10,10],"pad":26,"axes":{"x":"time","y":"height","o":false},"fn":[{"f":"9.5-0.25*x*x","c":"ac","dom":[0,3]},{"f":"7.25-1.1*(x-3)","c":"gn","dom":[3,9.6]}],"txt":[[4.2,9.0,"free fall","ac"],[6.8,5.4,"parachute open","gn"]]}'></div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Decide first whether the graph should be joined: time, height and temperature are continuous; number of people or items is discrete.</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "A car waits at a red light, then speeds up, then drives at a steady speed. On a speed–time graph the first part is:", "options": ["constant at 0", "increasing", "decreasing", "a maximum"], "answer": 0, "topic": "Drawing global graphs"},
        {"type": "mc", "text": "Hot tea cools down quickly at first and then more slowly. Its temperature–time graph is:", "options": ["a straight line up", "a horizontal line", "a straight line down", "a curve going down that flattens out"], "answer": 3, "topic": "Drawing global graphs"},
        {"type": "mc", "text": "The number of tickets sold each day of a week should be drawn as a:", "options": ["continuous line", "set of separate (discrete) points or bars", "curve", "horizontal line"], "answer": 1, "topic": "Drawing global graphs"},
        {"type": "mc", "text": "A swimmer swims away from the edge, rests holding a rope, then swims back. Her distance from the edge against time:", "options": ["only increases", "only decreases", "increases, is constant, then decreases", "decreases, is constant, then increases"], "answer": 2, "topic": "Drawing global graphs"},
        {"type": "mc", "text": "A steeper part of a distance–time graph means:", "options": ["faster movement", "slower movement", "standing still", "moving backwards"], "answer": 0, "topic": "Drawing global graphs"},
      ]
    },
    {
      id: 2003,
      chapter: 20,
      name: "Drawing straight-line graphs",
      fullName: "Drawing straight-line graphs from equations using tables and intercepts",
      lesson: {
        heading: "Drawing straight-line graphs",
        sub: "Chapter 20 · Topic 3",
        body: `
<p>The graph of y = mx + c is a straight line. You can draw it from a table of values, or more quickly from its two intercepts.</p>
<div class="def-box">
  <div class="def-box-title">📖 The intercept method</div>
<p><strong>y-intercept:</strong> put x = 0. <strong>x-intercept:</strong> put y = 0. Plot both points and draw a straight line through them.</p>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: y = −2x + 4</div>
  <div class="example-step"><span class="step-num">1</span><span>x = 0: y = 4, so the y-intercept is (0 ; 4).</span></div>
  <div class="example-step"><span class="step-num">2</span><span>y = 0: 0 = −2x + 4, so x = 2 and the x-intercept is (2 ; 0).</span></div>
  <div class="example-step"><span class="step-num">3</span><span>Join the points. The line goes down from left to right because m = −2 is negative.</span></div>
</div>
<div class="mf-fig" data-fig='{"t":"geo","w":250,"h":250,"view":[-2,-3,4,6],"grid":1,"axes":{"ticks":1},"fn":[{"f":"-2*x+4","c":"ac","dom":[-1.2,3.4]}],"pts":{"(0;4)":[0,4],"(2;0)":[2,0]},"dots":true,"lab":{"(0;4)":"e","(2;0)":"ne"}}'></div>
<div class="def-box">
  <div class="def-box-title">📖 Special lines</div>
<p><strong>y = c</strong> is a horizontal line (gradient 0). <strong>x = k</strong> is a vertical line. <strong>y = mx</strong> passes through the origin.</p>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Check with a third point: for y = −2x + 4, x = 1 gives y = 2, and (1 ; 2) must lie on your line.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "What is the y-intercept of y = 3x − 6? Write it as (x ; y).", "answer": "(0 ; -6)", "topic": "Drawing straight-line graphs"},
        {"type": "input", "text": "What is the x-intercept of y = 3x − 6? Write it as (x ; y).", "answer": "(2 ; 0)", "topic": "Drawing straight-line graphs"},
        {"type": "mc", "text": "Which graph is a horizontal line?", "options": ["x = 3", "y = 3", "y = 3x", "y = x + 3"], "answer": 1, "topic": "Drawing straight-line graphs"},
        {"type": "input", "text": "For y = −x + 5, find y when x = −2.", "answer": "7", "topic": "Drawing straight-line graphs"},
        {"type": "mc", "text": "Which point lies on y = 2x − 1?", "options": ["(1 ; 2)", "(2 ; 2)", "(3 ; 5)", "(0 ; 1)"], "answer": 2, "topic": "Drawing straight-line graphs"},
        {"type": "input", "text": "What is the x-intercept of 2x + 4y = 8? Give the x-value.", "answer": "4", "topic": "Drawing straight-line graphs"},
      ]
    },
    {
      id: 2004,
      chapter: 20,
      name: "The equation of a straight line",
      fullName: "Finding the gradient and y-intercept, and the equation of a straight line from its graph",
      lesson: {
        heading: "The equation of a straight line",
        sub: "Chapter 20 · Topic 4",
        body: `
<p>In <span class="math">y = mx + c</span>, <strong>m</strong> is the gradient (how steep the line is) and <strong>c</strong> is the y-intercept (where it cuts the y-axis).</p>
<div class="mf-fig" data-fig='{"t":"geo","w":250,"h":250,"view":[-1,-1,4,7],"grid":1,"axes":{"ticks":1},"fn":[{"f":"2*x+1","c":"ac","dom":[-0.8,2.9]}],"pts":{"A":[0,1],"B":[2,5],"K":[2,1]},"dots":["A","B"],"nolab":["K"],"lab":{"A":"w","B":"w"},"seg":[["A","K","or dash",null,"run 2"],["K","B","or dash",null,"rise 4"]]}'></div>
<div class="def-box">
  <div class="def-box-title">📖 Gradient from two points</div>
<p><span class="math">m = (y₂ − y₁) ÷ (x₂ − x₁)</span> = rise ÷ run.<br>m &gt; 0: the line goes up; m &lt; 0: it goes down; m = 0: horizontal.</p>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: the line through A(0 ; 1) and B(2 ; 5)</div>
  <div class="example-step"><span class="step-num">1</span><span>m = (5 − 1) ÷ (2 − 0) = 4 ÷ 2 = 2</span></div>
  <div class="example-step"><span class="step-num">2</span><span>The line cuts the y-axis at 1, so c = 1.</span></div>
  <div class="example-step"><span class="step-num">3</span><span>The equation is <span class="math">y = 2x + 1</span>.</span></div>
</div>
<div class="example-box">
  <div class="example-box-title">✏️ Example: when the y-intercept is not given</div>
  <div class="example-step"><span class="step-num">1</span><span>A line has gradient 3 and passes through (2 ; 4). Put the point into y = 3x + c:</span></div>
  <div class="example-step"><span class="step-num">2</span><span>4 = 3(2) + c, so c = −2 and the equation is <strong>y = 3x − 2</strong>.</span></div>
</div>
<div class="tip-box"><span class="tip-icon">💡</span><span>Parallel lines have the same gradient: y = 2x + 1 and y = 2x − 5 never meet.</span></div>
        `
      },
      questions: [
        {"type": "input", "text": "Find the gradient of the line through (1 ; 2) and (3 ; 8).", "answer": "3", "topic": "The equation of a straight line"},
        {"type": "input", "text": "Find the gradient of the line through (−2 ; 5) and (2 ; −3).", "answer": "-2", "topic": "The equation of a straight line"},
        {"type": "mc", "text": "A line has gradient 4 and y-intercept −3. Its equation is:", "options": ["y = 4x − 3", "y = −3x + 4", "y = 4x + 3", "y = x − 3"], "answer": 0, "topic": "The equation of a straight line"},
        {"type": "mc", "text": "What is the gradient of y = 5 − 2x?", "options": ["5", "−2", "2", "−5"], "answer": 1, "topic": "The equation of a straight line"},
        {"type": "mc", "text": "A line through (0 ; 2) and (3 ; 8) has equation:", "options": ["y = 3x + 2", "y = 2x + 3", "y = 6x + 2", "y = 2x + 2"], "answer": 3, "topic": "The equation of a straight line"},
        {"type": "mc", "text": "A line with gradient 2 passes through (3 ; 1). Its equation is:", "options": ["y = 2x + 1", "y = 2x − 1", "y = 2x − 5", "y = 2x + 5"], "answer": 2, "topic": "The equation of a straight line"},
      ]
    },
    {
      id: 2005,
      chapter: 20,
      name: "Ch 20 Exam focus",
      fullName: "Exam practice: graphs",
      lesson: {
        heading: "Ch 20 Exam focus",
        sub: "Chapter 20 · Topic 5",
        body: `
<p>These questions mix the whole chapter, the way a test does. Give intercepts as coordinates and gradients as numbers, and describe graphs with the correct words.</p>
<div class="tip-box"><span class="tip-icon">💡</span><span>Write down the rule or formula you use, then substitute, then give the answer with units. Marks are given for each step.</span></div>
        `
      },
      questions: [
        {"type": "mc", "text": "Which line is parallel to y = −3x + 2?", "options": ["y = 3x + 2", "y = −3x − 7", "y = 2x − 3", "y = x/3"], "answer": 1, "topic": "Ch 20 Exam focus"},
        {"type": "input", "text": "Where do y = x + 1 and y = −x + 5 cross? Write the point as (x ; y).", "answer": "(2 ; 3)", "topic": "Ch 20 Exam focus"},
        {"type": "mc", "text": "A graph decreases, reaches a lowest point and then increases. The lowest point is a:", "options": ["maximum", "minimum", "y-intercept", "gradient"], "answer": 1, "topic": "Ch 20 Exam focus"},
        {"type": "input", "text": "What is the gradient of a horizontal line?", "answer": "0", "topic": "Ch 20 Exam focus"},
        {"type": "input", "text": "y = 2x + c passes through (1 ; 7). Find c.", "answer": "5", "topic": "Ch 20 Exam focus"},
        { type: "input", text: "Tom walks from home at 4 km/h. One hour later Sam leaves the same home on a bicycle at 12 km/h, along the same road.<div class=\"mf-fig\" data-fig='{\"t\":\"geo\",\"free\":true,\"w\":300,\"h\":200,\"view\":[0,0,3,12],\"pad\":28,\"axes\":{\"x\":\"h\",\"y\":\"km\",\"o\":false,\"tx\":0.5,\"ty\":2},\"fn\":[{\"f\":\"4*x\",\"dom\":[0,3],\"lab\":[2.6,9,\"Tom\"]},{\"f\":\"12*(x-1)\",\"c\":\"hl\",\"dom\":[1,2],\"lab\":[1.45,10,\"Sam\"]}]}'></div>How many hours after Tom left does Sam catch up with him?", answer: "1.5", altAnswers: ["1,5","3/2"], topic: "Ch 20 Exam focus" }
      ]
    },
  ],
  workbook: {
    "chapter": 20,
    "chapterName": "Graphs",
    "topics": [
      {
        "name": "Drawing straight-line graphs",
        "questions": [
          {
            "num": "1",
            "text": "y = −½x + 3",
            "parts": [
              {
                "label": "a)",
                "text": "Find the x- and y-intercepts.",
                "marks": 2
              },
              {
                "label": "b)",
                "text": "Draw the graph on a Cartesian plane.",
                "marks": 2
              },
              {
                "label": "c)",
                "text": "Does the point (4 ; 1) lie on the line? Show why.",
                "marks": 2
              }
            ]
          }
        ]
      },
      {
        "name": "The equation of a straight line",
        "questions": [
          {
            "num": "2",
            "text": "A line passes through A(−1 ; −1) and B(2 ; 5).",
            "parts": [
              {
                "label": "a)",
                "text": "Calculate the gradient of AB.",
                "marks": 2
              },
              {
                "label": "b)",
                "text": "Find the equation of AB.",
                "marks": 2
              },
              {
                "label": "c)",
                "text": "Write down the equation of the line parallel to AB through (0 ; −4).",
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
        "name": "Drawing straight-line graphs",
        "answers": [
          {
            "num": "Q1a",
            "ans": "y-intercept (0 ; 3); x-intercept (6 ; 0)",
            "note": "0 = −½x + 3 gives x = 6"
          },
          {
            "num": "Q1b",
            "ans": "A straight line through (0 ; 3) and (6 ; 0)",
            "note": ""
          },
          {
            "num": "Q1c",
            "ans": "Yes: −½(4) + 3 = 1",
            "note": ""
          }
        ]
      },
      {
        "name": "The equation of a straight line",
        "answers": [
          {
            "num": "Q2a",
            "ans": "m = 2",
            "note": "(5 − (−1)) ÷ (2 − (−1)) = 6 ÷ 3"
          },
          {
            "num": "Q2b",
            "ans": "y = 2x + 1",
            "note": "5 = 2(2) + c, c = 1"
          },
          {
            "num": "Q2c",
            "ans": "y = 2x − 4",
            "note": "Same gradient, c = −4"
          }
        ]
      }
    ]
  }
});
