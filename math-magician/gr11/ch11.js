// Math Magician — Grade 11, Chapter 11
// Statistics

MathMagician.registerChapter(11, {
  topics: [
    {
      id: 0,
      chapter: 11,
      name: "Histograms, ogives & standard deviation",
      fullName: "Histograms, frequency polygons, ogives, variance and standard deviation",
      lesson: {
        heading: "Histograms, ogives, and standard deviation",
        sub: "Chapter 11 · Topic 1",
        body: `
          <p>Grade 11 Statistics extends to new graphical representations and introduces <strong>standard deviation</strong> as a precise measure of spread.</p>

          <div class="def-box">
            <div class="def-box-title">📖 Histograms and ogives</div>
            <p>
              <strong>Histogram:</strong> bar chart for grouped data where bars touch. Width = class interval. Height = frequency.<br><br>
              <strong>Ogive (cumulative frequency curve):</strong> plots cumulative frequency against upper class boundary. S-shaped curve. Used to read off percentiles and the five-number summary.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Variance and standard deviation</div>
            <p>
              <strong>Variance (σ²):</strong> <span class="math">σ² = Σ(xᵢ − x̄)² / n</span><br>
              <strong>Standard deviation (σ):</strong> <span class="math">σ = √(Σ(xᵢ − x̄)² / n)</span><br><br>
              A larger σ means data is more spread out from the mean. σ is in the <em>same units</em> as the data.
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Standard deviation</div>
            <p>Data: 4, 6, 8, 10, 12. Mean = 8.<br>
            Deviations: −4, −2, 0, 2, 4<br>
            Squared: 16, 4, 0, 4, 16 → sum = 40<br>
            Variance = 40/5 = 8<br>
            σ = √8 = 2√2 ≈ 2.83</p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Standard deviation is always:",
          options: ["Negative", "Zero", "Non-negative", "Greater than the mean"],
          answer: 2,
          topic: "Histograms, ogives & standard deviation"
        },
        {
          type: "input",
          text: "Data: 2, 4, 4, 6. Find the mean.",
          answer: "4",
          topic: "Histograms, ogives & standard deviation"
        },
        {
          type: "mc",
          text: "An ogive is used to find:",
          options: ["Mode", "Median and percentiles", "Mean only", "Standard deviation directly"],
          answer: 1,
          topic: "Histograms, ogives & standard deviation"
        },
        {
          type: "mc",
          text: "Data: 3, 3, 3, 3, 3. The standard deviation is:",
          options: ["1", "3", "0", "Cannot determine"],
          answer: 2,
          topic: "Histograms, ogives & standard deviation"
        },
        {
          type: "mc",
          text: "If all data values increase by 5, the standard deviation:",
          options: ["Increases by 5", "Stays the same", "Decreases by 5", "Doubles"],
          answer: 1,
          topic: "Histograms, ogives & standard deviation"
        }
      ]
    },
    {
      id: 1,
      chapter: 11,
      name: "Skewness, outliers & data interpretation",
      fullName: "Symmetric and skewed data, outlier identification, and interpretation",
      lesson: {
        heading: "Skewness, outliers, and data interpretation",
        sub: "Chapter 11 · Topic 2",
        body: `
          <div class="def-box">
            <div class="def-box-title">📖 Symmetric vs skewed data</div>
            <p>
              <strong>Symmetric:</strong> Mean ≈ Median ≈ Mode. Bell-shaped distribution.<br>
              <strong>Positively skewed (right-skewed):</strong> Mean > Median > Mode. Tail to the right. Few very high values pull the mean up.<br>
              <strong>Negatively skewed (left-skewed):</strong> Mean &lt; Median &lt; Mode. Tail to the left.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">📖 Outlier identification</div>
            <p>
              <strong>IQR method:</strong> A value is an outlier if it falls outside:<br>
              <span class="math">Q1 − 1.5 × IQR</span> (lower fence) or <span class="math">Q3 + 1.5 × IQR</span> (upper fence)<br><br>
              <strong>Standard deviation method:</strong> A value is an outlier if it is more than 2σ (or sometimes 3σ) from the mean.
            </p>
          </div>

          <div class="def-box">
            <div class="def-box-title">💡 Choosing the right measure</div>
            <p>
              <strong>Skewed data or outliers present:</strong> Use median and IQR (more resistant).<br>
              <strong>Symmetric data, no outliers:</strong> Use mean and standard deviation (more informative).
            </p>
          </div>

          <div class="example-box">
            <div class="example-box-title">✏️ Example: Outlier check</div>
            <p>Q1 = 10, Q3 = 22, IQR = 12<br>
            Lower fence = 10 − 18 = −8; Upper fence = 22 + 18 = 40<br>
            Any value below −8 or above 40 is an outlier.</p>
          </div>
        `
      },
      questions: [
        {
          type: "mc",
          text: "Mean = 45, Median = 50, Mode = 55. The data is:",
          options: ["Symmetric", "Positively skewed", "Negatively skewed", "Cannot determine"],
          answer: 2,
          topic: "Skewness, outliers & data interpretation"
        },
        {
          type: "mc",
          text: "Q1 = 15, Q3 = 35. IQR = 20. Upper outlier fence =",
          options: ["65", "55", "45", "70"],
          answer: 0,
          topic: "Skewness, outliers & data interpretation"
        },
        {
          type: "mc",
          text: "For skewed data with outliers, the best measure of central tendency is:",
          options: ["Mean", "Mode", "Median", "Standard deviation"],
          answer: 2,
          topic: "Skewness, outliers & data interpretation"
        },
        {
          type: "input",
          text: "Mean = 20, σ = 4. How many standard deviations from the mean is the value 30?",
          answer: "2.5",
          altAnswers: ["2,5"],
          topic: "Skewness, outliers & data interpretation"
        },
        {
          type: "mc",
          text: "In a positively skewed distribution, which is typically largest?",
          options: ["Mode", "Median", "Mean", "All equal"],
          answer: 2,
          topic: "Skewness, outliers & data interpretation"
        }
      ]
    }
  ],
  workbook: {
    title: "Chapter 11 Workbook — Statistics",
    questions: [
      {
        number: 1,
        text: "Test scores: 12, 15, 18, 18, 20, 22, 24, 25, 28, 30, 34, 42.",
        parts: [
          { label: "a", text: "Calculate the mean and median.", marks: 3 },
          { label: "b", text: "Find the five-number summary.", marks: 4 },
          { label: "c", text: "Calculate the IQR and identify any outliers.", marks: 3 },
          { label: "d", text: "Describe the skewness. Justify using the relationship between mean and median.", marks: 2 }
        ]
      },
      {
        number: 2,
        text: "The following grouped data shows the time (minutes) learners spend on homework:",
        parts: [
          { label: "", text: "| Time | 0–20 | 20–40 | 40–60 | 60–80 | 80–100 |\n| Freq | 3 | 8 | 14 | 10 | 5 |", marks: 0 },
          { label: "a", text: "Draw a histogram.", marks: 3 },
          { label: "b", text: "Complete the cumulative frequency table.", marks: 2 },
          { label: "c", text: "Draw the ogive and estimate the median from it.", marks: 4 },
          { label: "d", text: "Estimate the percentage of learners who spend more than 70 minutes.", marks: 2 }
        ]
      }
    ],
    answers: {
      1: {
        a: "Mean=(12+15+18+18+20+22+24+25+28+30+34+42)/12=288/12=24; Median=(22+24)/2=23",
        b: "Min=12; Q1=18; Median=23; Q3=28; Max=42",
        c: "IQR=10; Lower fence=18−15=3; Upper fence=28+15=43; 42 is NOT an outlier (42<43)",
        d: "Mean(24)>Median(23) → slight positive skew (tail to the right, pulled by 42)"
      },
      2: {
        a: "Bars at heights 3,8,14,10,5 for intervals 0–20, 20–40, 40–60, 60–80, 80–100",
        b: "Cum freq: 3, 11, 25, 35, 40",
        c: "Plot (20,3),(40,11),(60,25),(80,35),(100,40); median at cum freq 20 → read off ≈ 53 min",
        d: "At 70 min: read cum freq ≈ 30; remaining = 40−30=10; 10/40=25%"
      }
    }
  }
});
