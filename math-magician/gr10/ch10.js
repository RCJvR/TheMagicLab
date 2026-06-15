// Math Magician — Grade 10, Chapter 10
// Statistics

MathMagician.registerChapter(10, {
  topics: [
    {
      id: 0,
      chapter: 10,
      name: "Measures of central tendency",
      fullName: "Collecting data, measures of central tendency, and grouping data",
      lesson: {
        heading: "Central tendency and grouping data",
        sub: "Chapter 10 · Topic 1",
        body: `
          <p><strong>Statistics</strong> involves collecting, organising, displaying, and interpreting data.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Measures of central tendency</div>
            <p>
              <strong>Mean (x̄):</strong> sum of values ÷ number of values<br>
              <strong>Median:</strong> middle value when data is ordered (average of two middle values if even)<br>
              <strong>Mode:</strong> most frequently occurring value (may be none or multiple)
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Grouped data</div>
            <p>When data is grouped in class intervals, we use <strong>midpoints</strong> of each interval to estimate the mean.<br>
            Estimated mean = Σ(midpoint × frequency) / Σfrequency<br><br>
            The <strong>modal class</strong> is the class interval with the highest frequency.</p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example</div>
            <p>Data: 4, 7, 7, 9, 12, 15, 18<br>
            Mean = (4+7+7+9+12+15+18)/7 = 72/7 ≈ 10.3<br>
            Median = 9 (4th value of 7)<br>
            Mode = 7</p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Data: 3, 8, 5, 12, 7, 5. The mode is:",
          options: ["3", "5", "7", "8"],
          answer: 1,
          topic: "Measures of central tendency"
        },
        {
          type: "input",
          text: "Data: 10, 14, 9, 17, 5. Find the median.",
          answer: "10",
          topic: "Measures of central tendency"
        },
        {
          type: "mc",
          text: "Data: 2, 4, 6, 8, 10. The mean is:",
          options: ["5", "6", "7", "8"],
          answer: 1,
          topic: "Measures of central tendency"
        },
        {
          type: "mc",
          text: "For grouped data, the estimated mean uses:",
          options: ["Actual values", "Upper bounds", "Midpoints of intervals", "Lower bounds"],
          answer: 2,
          topic: "Measures of central tendency"
        },
        {
          type: "input",
          text: "The mean of 5 values is 12. One value of 14 is removed. Find the new mean.",
          answer: "11.5",
          altAnswers: ["11,5"],
          topic: "Measures of central tendency"
        }
      ]
    },
    {
      id: 1,
      chapter: 10,
      name: "Dispersion & five-number summary",
      fullName: "Measures of dispersion, five-number summary, and box-and-whisker plots",
      lesson: {
        heading: "Dispersion and the five-number summary",
        sub: "Chapter 10 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Measures of dispersion</div>
            <p>
              <strong>Range:</strong> maximum − minimum<br>
              <strong>Interquartile range (IQR):</strong> Q3 − Q1<br>
              <strong>Variance:</strong> average of squared deviations from the mean<br>
              <strong>Standard deviation (σ):</strong> √variance — most useful; same units as data
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Five-number summary</div>
            <p>
              1. Minimum (min)<br>
              2. First quartile (Q1) — median of lower half<br>
              3. Median (Q2)<br>
              4. Third quartile (Q3) — median of upper half<br>
              5. Maximum (max)<br><br>
              Used to draw a <strong>box-and-whisker plot</strong>.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Five-number summary</div>
            <p>Data (ordered): 2, 5, 7, 8, 11, 14, 16, 20<br>
            Min = 2, Max = 20<br>
            Median = (8+11)/2 = 9.5<br>
            Q1 = median of {2, 5, 7, 8} = (5+7)/2 = 6<br>
            Q3 = median of {11, 14, 16, 20} = (14+16)/2 = 15<br>
            IQR = 15 − 6 = 9</p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Outliers</div>
            <p>A data point is a suspected outlier if it is more than 1.5 × IQR below Q1 or above Q3.</p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Data: 3, 7, 9, 12, 15, 20. The IQR is:",
          options: ["11", "8", "9", "13"],
          answer: 1,
          topic: "Dispersion & five-number summary"
        },
        {
          type: "input",
          text: "Data: 4, 8, 12, 16, 20. Find the range.",
          answer: "16",
          topic: "Dispersion & five-number summary"
        },
        {
          type: "mc",
          text: "For data: 2, 5, 8, 11, 14, 17, 20, 23, what is Q1?",
          options: ["5", "6.5", "8", "5.5"],
          answer: 1,
          topic: "Dispersion & five-number summary"
        },
        {
          type: "mc",
          text: "A box-and-whisker plot shows: min=5, Q1=10, median=15, Q3=22, max=30. The IQR is:",
          options: ["25", "12", "20", "15"],
          answer: 1,
          topic: "Dispersion & five-number summary"
        },
        {
          type: "mc",
          text: "Which measure of dispersion uses squared deviations?",
          options: ["Range", "IQR", "Standard deviation", "Variance"],
          answer: 3,
          topic: "Dispersion & five-number summary"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 10 Workbook — Statistics",
    questions: [
      {
        number: 1,
        text: "The following marks (out of 50) were scored in a test: 34, 28, 41, 22, 34, 45, 37, 29, 41, 18, 34, 40.",
        parts: [
          { label: "a", text: "Find the mean, median, and mode.", marks: 5 },
          { label: "b", text: "Find the five-number summary.", marks: 5 },
          { label: "c", text: "Calculate the IQR.", marks: 1 },
          { label: "d", text: "Draw a box-and-whisker plot.", marks: 3 }
        ]
      },
      {
        number: 2,
        text: "The grouped frequency table shows ages of club members:",
        parts: [
          { label: "", text: "| Age | 10–19 | 20–29 | 30–39 | 40–49 | 50–59 |\n| Freq | 4 | 11 | 9 | 5 | 1 |", marks: 0 },
          { label: "a", text: "Estimate the mean age.", marks: 4 },
          { label: "b", text: "Identify the modal class.", marks: 1 },
          { label: "c", text: "How many members are there in total?", marks: 1 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Ordered: 18,22,28,29,34,34,34,37,40,41,41,45; Mean=37.75/12... recalc: sum=403, mean≈33.6; Median=(34+34)/2=34; Mode=34",
        b: "Min=18; Q1=(28+29)/2=28.5; Median=34; Q3=(40+41)/2=40.5; Max=45",
        c: "IQR=12",
        d: "Box from 28.5 to 40.5, median line at 34, whiskers to 18 and 45"
      },
      2: {
        a: "Midpoints: 14.5,24.5,34.5,44.5,54.5; Mean=(4×14.5+11×24.5+9×34.5+5×44.5+1×54.5)/30 = (58+269.5+310.5+222.5+54.5)/30 = 914.5/30 ≈ 30.5",
        b: "Modal class: 20–29",
        c: "30 members"
      }
    }
  }
});
