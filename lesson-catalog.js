// ============================================================
// THE MAGIC LAB — lesson-catalog.js
// Static catalog of every assignable lesson/topic per tool, used by the
// teacher "Assignments" tab's lesson picker. Each entry's `value` is the
// EXACT string that tool passes as `topic` when it records a
// lesson_complete progress_event — assignment completion in
// assignments.js matches against it verbatim (case/whitespace-insensitive),
// so if a tool's lesson data changes, this file needs regenerating too.
//
// java-genie and web-wizard are single continuous walkthroughs rather
// than discrete lessons, so each has exactly one selectable entry
// representing the whole tutorial; completion fires when a learner
// reaches and closes the last slide (see the lesson_complete track()
// calls added to those two files).
//
// Not included: robot-realm, science-sage, model-mage, tech-tower,
// spike-spellcaster — these tools don't yet call progress.js's track()
// with lesson_complete events, so there is nothing here to pick from
// until that's added.
// ============================================================

window.ML_LESSON_CATALOG = {
  "computer-codex": [
    {
      "group": "Coding & Robotics (Gr 8-9)",
      "lessons": [
        {
          "value": "What is an Operating System?",
          "label": "What is an Operating System?"
        },
        {
          "value": "Navigating Windows",
          "label": "Navigating Windows"
        },
        {
          "value": "Working with Files and Folders",
          "label": "Working with Files and Folders"
        },
        {
          "value": "What is a File Extension?",
          "label": "What is a File Extension?"
        },
        {
          "value": "Understanding the Ribbon Interface",
          "label": "Understanding the Ribbon Interface"
        },
        {
          "value": "Creating and Saving Word Documents",
          "label": "Creating and Saving Word Documents"
        },
        {
          "value": "Text Formatting and Styles",
          "label": "Text Formatting and Styles"
        },
        {
          "value": "Introduction to Spreadsheets",
          "label": "Introduction to Spreadsheets"
        },
        {
          "value": "Excel Formulas and Functions",
          "label": "Excel Formulas and Functions"
        },
        {
          "value": "COUNTIF and SUMIF",
          "label": "COUNTIF and SUMIF"
        },
        {
          "value": "Relative vs Absolute Cell References",
          "label": "Relative vs Absolute Cell References"
        },
        {
          "value": "Creating Charts in Excel",
          "label": "Creating Charts in Excel"
        },
        {
          "value": "What is Computational Thinking?",
          "label": "What is Computational Thinking?"
        },
        {
          "value": "Decomposition",
          "label": "Decomposition"
        },
        {
          "value": "Pattern Recognition",
          "label": "Pattern Recognition"
        },
        {
          "value": "Abstraction",
          "label": "Abstraction"
        },
        {
          "value": "Algorithm Design",
          "label": "Algorithm Design"
        },
        {
          "value": "Practical Examples",
          "label": "Practical Examples"
        },
        {
          "value": "What is Pseudo Code?",
          "label": "What is Pseudo Code?"
        },
        {
          "value": "Pseudo Code — Practical Examples",
          "label": "Pseudo Code — Practical Examples"
        },
        {
          "value": "What is a Flow Diagram?",
          "label": "What is a Flow Diagram?"
        },
        {
          "value": "Flow Diagram Examples and Builder",
          "label": "Flow Diagram Examples and Builder"
        },
        {
          "value": "What is Artificial Intelligence?",
          "label": "What is Artificial Intelligence?"
        },
        {
          "value": "How Machine Learning Works",
          "label": "How Machine Learning Works"
        },
        {
          "value": "Large Language Models & GPT",
          "label": "Large Language Models & GPT"
        },
        {
          "value": "Generative AI — Images, Audio & Beyond",
          "label": "Generative AI — Images, Audio & Beyond"
        },
        {
          "value": "Using AI Ethically",
          "label": "Using AI Ethically"
        }
      ]
    },
    {
      "group": "CAT — CAPS (Gr 10-12)",
      "lessons": [
        {
          "value": "What Is a Computer System?",
          "label": "What Is a Computer System?"
        },
        {
          "value": "Hardware Essentials — Input, Output, Storage and Processing",
          "label": "Hardware Essentials — Input, Output, Storage and Processing"
        },
        {
          "value": "System Software vs Application Software",
          "label": "System Software vs Application Software"
        },
        {
          "value": "Organising Files and Folders",
          "label": "Organising Files and Folders"
        },
        {
          "value": "Networks — Connecting Computers Together",
          "label": "Networks — Connecting Computers Together"
        },
        {
          "value": "The Internet, the Web, and Search Engines",
          "label": "The Internet, the Web, and Search Engines"
        },
        {
          "value": "E-Communication, Netiquette and Online Safety",
          "label": "E-Communication, Netiquette and Online Safety"
        },
        {
          "value": "Word Processing, Spreadsheet and Presentation Theory",
          "label": "Word Processing, Spreadsheet and Presentation Theory"
        },
        {
          "value": "Finding, Evaluating and Presenting Information",
          "label": "Finding, Evaluating and Presenting Information"
        },
        {
          "value": "Ergonomics, Green Computing and Digital Citizenship",
          "label": "Ergonomics, Green Computing and Digital Citizenship"
        },
        {
          "value": "Extending Hardware Knowledge",
          "label": "Extending Hardware Knowledge"
        },
        {
          "value": "Inside the System Unit — Storage and Processing",
          "label": "Inside the System Unit — Storage and Processing"
        },
        {
          "value": "LANs, WLANs and Network Components",
          "label": "LANs, WLANs and Network Components"
        },
        {
          "value": "Software, Cloud Storage and Computer Management",
          "label": "Software, Cloud Storage and Computer Management"
        },
        {
          "value": "Spreadsheet Skills — Conditional Formatting, Functions and Charts",
          "label": "Spreadsheet Skills — Conditional Formatting, Functions and Charts"
        },
        {
          "value": "Introduction to Databases",
          "label": "Introduction to Databases"
        },
        {
          "value": "HTML and Web Design Basics",
          "label": "HTML and Web Design Basics"
        },
        {
          "value": "Digital Communication and Online Services",
          "label": "Digital Communication and Online Services"
        },
        {
          "value": "Evaluating Information Quality",
          "label": "Evaluating Information Quality"
        },
        {
          "value": "Security, Ethics and the Changing Workplace",
          "label": "Security, Ethics and the Changing Workplace"
        },
        {
          "value": "Choosing the Right System for Every User",
          "label": "Choosing the Right System for Every User"
        },
        {
          "value": "Software for Accessibility and Productivity",
          "label": "Software for Accessibility and Productivity"
        },
        {
          "value": "User-Centred Design and the Environment",
          "label": "User-Centred Design and the Environment"
        },
        {
          "value": "WANs, Internet Services and Getting Connected",
          "label": "WANs, Internet Services and Getting Connected"
        },
        {
          "value": "Cybercrime, Malware and Online Safety",
          "label": "Cybercrime, Malware and Online Safety"
        },
        {
          "value": "The Operating System and Computer Management",
          "label": "The Operating System and Computer Management"
        },
        {
          "value": "Browsers, Communication and Mobile Devices",
          "label": "Browsers, Communication and Mobile Devices"
        },
        {
          "value": "Social Networking, Privacy and Emerging Realities",
          "label": "Social Networking, Privacy and Emerging Realities"
        },
        {
          "value": "Advanced Spreadsheet and Database Concepts",
          "label": "Advanced Spreadsheet and Database Concepts"
        },
        {
          "value": "Professional Reports and Final Exam Readiness",
          "label": "Professional Reports and Final Exam Readiness"
        }
      ]
    },
    {
      "group": "CAT — IEB (Gr 10-12)",
      "lessons": [
        {
          "value": "Computer Systems and Computer Types",
          "label": "Computer Systems and Computer Types"
        },
        {
          "value": "Input, Output and Storage Devices",
          "label": "Input, Output and Storage Devices"
        },
        {
          "value": "Software, Licensing and the Operating System",
          "label": "Software, Licensing and the Operating System"
        },
        {
          "value": "Windows Basics and File Organisation",
          "label": "Windows Basics and File Organisation"
        },
        {
          "value": "Types of Networks",
          "label": "Types of Networks"
        },
        {
          "value": "The Web, Browsers and Online Services",
          "label": "The Web, Browsers and Online Services"
        },
        {
          "value": "E-Communication and Netiquette",
          "label": "E-Communication and Netiquette"
        },
        {
          "value": "Finding, Sifting and Presenting Information",
          "label": "Finding, Sifting and Presenting Information"
        },
        {
          "value": "Digital Citizenship — Society, Ethics and Safety",
          "label": "Digital Citizenship — Society, Ethics and Safety"
        },
        {
          "value": "Devices for Every User",
          "label": "Devices for Every User"
        },
        {
          "value": "Storage, the System Unit and Troubleshooting",
          "label": "Storage, the System Unit and Troubleshooting"
        },
        {
          "value": "Software Installation and Management",
          "label": "Software Installation and Management"
        },
        {
          "value": "Windows Features and File Sharing",
          "label": "Windows Features and File Sharing"
        },
        {
          "value": "Network Security and Topologies",
          "label": "Network Security and Topologies"
        },
        {
          "value": "Mobile Internet and Digital Communication",
          "label": "Mobile Internet and Digital Communication"
        },
        {
          "value": "Cloud, IoT and Web Applications",
          "label": "Cloud, IoT and Web Applications"
        },
        {
          "value": "Browser Privacy and Effective Searching",
          "label": "Browser Privacy and Effective Searching"
        },
        {
          "value": "Preparing for the PAT",
          "label": "Preparing for the PAT"
        },
        {
          "value": "Economy, Security and Data Integrity",
          "label": "Economy, Security and Data Integrity"
        },
        {
          "value": "Recommending Systems for Real Scenarios",
          "label": "Recommending Systems for Real Scenarios"
        },
        {
          "value": "Performance, Troubleshooting and the Task Manager",
          "label": "Performance, Troubleshooting and the Task Manager"
        },
        {
          "value": "File Mastery and Choosing the Right Application",
          "label": "File Mastery and Choosing the Right Application"
        },
        {
          "value": "Getting Connected and Buying Decisions",
          "label": "Getting Connected and Buying Decisions"
        },
        {
          "value": "Cloud Computing and the Internet of Things",
          "label": "Cloud Computing and the Internet of Things"
        },
        {
          "value": "Security, Privacy and the Deep Web",
          "label": "Security, Privacy and the Deep Web"
        },
        {
          "value": "Databases, Reports and the PAT",
          "label": "Databases, Reports and the PAT"
        },
        {
          "value": "Society, Social Media and Emerging Tech",
          "label": "Society, Social Media and Emerging Tech"
        },
        {
          "value": "Ethics, Law and the Information Age",
          "label": "Ethics, Law and the Information Age"
        },
        {
          "value": "Staying Safe Online",
          "label": "Staying Safe Online"
        }
      ]
    },
    {
      "group": "IT — CAPS (Gr 10-12)",
      "lessons": [
        {
          "value": "What Is Information Technology?",
          "label": "What Is Information Technology?"
        },
        {
          "value": "Bits, Bytes and Number Systems",
          "label": "Bits, Bytes and Number Systems"
        },
        {
          "value": "File Management and Data Storage",
          "label": "File Management and Data Storage"
        },
        {
          "value": "Licensing, Piracy and the Digital Divide",
          "label": "Licensing, Piracy and the Digital Divide"
        },
        {
          "value": "What Is an Algorithm?",
          "label": "What Is an Algorithm?"
        },
        {
          "value": "Variables, Data Types and Operators",
          "label": "Variables, Data Types and Operators"
        },
        {
          "value": "Conditionals, Loops and Events",
          "label": "Conditionals, Loops and Events"
        },
        {
          "value": "Hardware In Depth and Computer Management",
          "label": "Hardware In Depth and Computer Management"
        },
        {
          "value": "Software Engineering Principles — Solving Real Problems",
          "label": "Software Engineering Principles — Solving Real Problems"
        },
        {
          "value": "Networks and Electronic Communication",
          "label": "Networks and Electronic Communication"
        },
        {
          "value": "The Web, Search, and Evaluating Sources",
          "label": "The Web, Search, and Evaluating Sources"
        },
        {
          "value": "Introduction to HTML",
          "label": "Introduction to HTML"
        },
        {
          "value": "Inside the Motherboard",
          "label": "Inside the Motherboard"
        },
        {
          "value": "Operating Systems and Virtualisation",
          "label": "Operating Systems and Virtualisation"
        },
        {
          "value": "Networks, Topology and Innovation",
          "label": "Networks, Topology and Innovation"
        },
        {
          "value": "Mobile, Wireless and Secure Communication",
          "label": "Mobile, Wireless and Secure Communication"
        },
        {
          "value": "Computer Management and Security Threats",
          "label": "Computer Management and Security Threats"
        },
        {
          "value": "Introduction to OOP and GUI Programming",
          "label": "Introduction to OOP and GUI Programming"
        },
        {
          "value": "Variables, Decisions and Debugging",
          "label": "Variables, Decisions and Debugging"
        },
        {
          "value": "Software Engineering and Problem-Solving Tools",
          "label": "Software Engineering and Problem-Solving Tools"
        },
        {
          "value": "Arrays, Loops and File Handling",
          "label": "Arrays, Loops and File Handling"
        },
        {
          "value": "Databases — From Concepts to Programming",
          "label": "Databases — From Concepts to Programming"
        },
        {
          "value": "Relational Database Design",
          "label": "Relational Database Design"
        },
        {
          "value": "The Web, Careers and Ethics",
          "label": "The Web, Careers and Ethics"
        },
        {
          "value": "Relational Database Design",
          "label": "Relational Database Design"
        },
        {
          "value": "Managing and Protecting Data",
          "label": "Managing and Protecting Data"
        },
        {
          "value": "Mobile Technology and Performance",
          "label": "Mobile Technology and Performance"
        },
        {
          "value": "Setting Up a Network and Staying Secure",
          "label": "Setting Up a Network and Staying Secure"
        },
        {
          "value": "OOP — Classes, Objects and Method Types",
          "label": "OOP — Classes, Objects and Method Types"
        },
        {
          "value": "Programming with Relational Databases",
          "label": "Programming with Relational Databases"
        },
        {
          "value": "Software Engineering Methodologies",
          "label": "Software Engineering Methodologies"
        },
        {
          "value": "Cloud Computing and Virtualisation",
          "label": "Cloud Computing and Virtualisation"
        },
        {
          "value": "2D Arrays and Advanced SQL",
          "label": "2D Arrays and Advanced SQL"
        },
        {
          "value": "Cybercriminals and Cybercrime",
          "label": "Cybercriminals and Cybercrime"
        },
        {
          "value": "Big Data, Data Mining and the Semantic Web",
          "label": "Big Data, Data Mining and the Semantic Web"
        },
        {
          "value": "How the Web Actually Works",
          "label": "How the Web Actually Works"
        }
      ]
    },
    {
      "group": "IT — IEB (Gr 10-12)",
      "lessons": [
        {
          "value": "Hardware, Software and Computer Types",
          "label": "Hardware, Software and Computer Types"
        },
        {
          "value": "Inside the System Unit",
          "label": "Inside the System Unit"
        },
        {
          "value": "Operating Systems and System Software",
          "label": "Operating Systems and System Software"
        },
        {
          "value": "Managing and Securing Your Computer",
          "label": "Managing and Securing Your Computer"
        },
        {
          "value": "Networking Fundamentals",
          "label": "Networking Fundamentals"
        },
        {
          "value": "Getting Online and Communicating Responsibly",
          "label": "Getting Online and Communicating Responsibly"
        },
        {
          "value": "Website Design and Effective Searching",
          "label": "Website Design and Effective Searching"
        },
        {
          "value": "Using Computers Responsibly",
          "label": "Using Computers Responsibly"
        },
        {
          "value": "Computational Thinking",
          "label": "Computational Thinking"
        },
        {
          "value": "Data Types, Operators and Boolean Logic",
          "label": "Data Types, Operators and Boolean Logic"
        },
        {
          "value": "Methods, Objects and Passing Data",
          "label": "Methods, Objects and Passing Data"
        },
        {
          "value": "Selection and Looping Algorithms",
          "label": "Selection and Looping Algorithms"
        },
        {
          "value": "Introduction to Databases and SQL",
          "label": "Introduction to Databases and SQL"
        },
        {
          "value": "User Interface Design and Testing",
          "label": "User Interface Design and Testing"
        },
        {
          "value": "CPU Design and the Machine Cycle",
          "label": "CPU Design and the Machine Cycle"
        },
        {
          "value": "Storage Compared and Programming Tools",
          "label": "Storage Compared and Programming Tools"
        },
        {
          "value": "LAN and WAN Configuration",
          "label": "LAN and WAN Configuration"
        },
        {
          "value": "Multimedia and the Evolving Web",
          "label": "Multimedia and the Evolving Web"
        },
        {
          "value": "Search, Errors and Data Validation",
          "label": "Search, Errors and Data Validation"
        },
        {
          "value": "Threats to Data Integrity and Security",
          "label": "Threats to Data Integrity and Security"
        },
        {
          "value": "Cybercrime and the Changing Workplace",
          "label": "Cybercrime and the Changing Workplace"
        },
        {
          "value": "Computational Thinking with Objects",
          "label": "Computational Thinking with Objects"
        },
        {
          "value": "Representing Data and Data Structures",
          "label": "Representing Data and Data Structures"
        },
        {
          "value": "Boolean Logic and Designing Classes",
          "label": "Boolean Logic and Designing Classes"
        },
        {
          "value": "Passing Data, Persistence and Algorithms",
          "label": "Passing Data, Persistence and Algorithms"
        },
        {
          "value": "Databases, SQL and Software Quality",
          "label": "Databases, SQL and Software Quality"
        },
        {
          "value": "Making Informed Hardware Decisions",
          "label": "Making Informed Hardware Decisions"
        },
        {
          "value": "Distributed Processing and Cloud Extension",
          "label": "Distributed Processing and Cloud Extension"
        },
        {
          "value": "The Deep Web and Anonymous Browsing",
          "label": "The Deep Web and Anonymous Browsing"
        },
        {
          "value": "Cloud Services, Security and Digital Currency",
          "label": "Cloud Services, Security and Digital Currency"
        },
        {
          "value": "Identifying and Solving Security Risks",
          "label": "Identifying and Solving Security Risks"
        },
        {
          "value": "Global Challenges and Green Computing",
          "label": "Global Challenges and Green Computing"
        },
        {
          "value": "Law, Privacy and Digital Responsibility",
          "label": "Law, Privacy and Digital Responsibility"
        },
        {
          "value": "Complex Problem Solving with Inheritance",
          "label": "Complex Problem Solving with Inheritance"
        },
        {
          "value": "Advanced Data Structures and Inheritance",
          "label": "Advanced Data Structures and Inheritance"
        },
        {
          "value": "Persistence with JSON, and Array Algorithms",
          "label": "Persistence with JSON, and Array Algorithms"
        },
        {
          "value": "Data Strategy — Warehousing, Mining and NoSQL",
          "label": "Data Strategy — Warehousing, Mining and NoSQL"
        },
        {
          "value": "Designing and Querying Multi-Table Databases",
          "label": "Designing and Querying Multi-Table Databases"
        }
      ]
    }
  ],
  "code-conjurer": [
    {
      "group": "Unit 1 — Introduction to Java",
      "lessons": [
        {
          "value": "What is Java?",
          "label": "What is Java?"
        },
        {
          "value": "Variables and Data Types",
          "label": "Variables and Data Types"
        },
        {
          "value": "Operators and Expressions",
          "label": "Operators and Expressions"
        }
      ]
    },
    {
      "group": "Unit 2 — Control Structures",
      "lessons": [
        {
          "value": "if / else if / else",
          "label": "if / else if / else"
        },
        {
          "value": "switch Statement",
          "label": "switch Statement"
        },
        {
          "value": "for Loop",
          "label": "for Loop"
        },
        {
          "value": "while and do-while Loops",
          "label": "while and do-while Loops"
        }
      ]
    },
    {
      "group": "Unit 3 — Arrays and Strings",
      "lessons": [
        {
          "value": "1D Arrays",
          "label": "1D Arrays"
        },
        {
          "value": "String Methods",
          "label": "String Methods"
        }
      ]
    },
    {
      "group": "Unit 4 — Methods",
      "lessons": [
        {
          "value": "Writing and Calling Methods",
          "label": "Writing and Calling Methods"
        }
      ]
    },
    {
      "group": "Unit 1 — Advanced Arrays",
      "lessons": [
        {
          "value": "2D Arrays",
          "label": "2D Arrays"
        },
        {
          "value": "Bubble Sort",
          "label": "Bubble Sort"
        },
        {
          "value": "Linear and Binary Search",
          "label": "Linear and Binary Search"
        }
      ]
    },
    {
      "group": "Unit 2 — Classes and OOP",
      "lessons": [
        {
          "value": "Classes and Objects",
          "label": "Classes and Objects"
        },
        {
          "value": "Arrays of Objects",
          "label": "Arrays of Objects"
        }
      ]
    },
    {
      "group": "Unit 3 — Encapsulation",
      "lessons": [
        {
          "value": "private Fields and Getters / Setters",
          "label": "private Fields and Getters / Setters"
        }
      ]
    },
    {
      "group": "Unit 1 — Advanced OOP",
      "lessons": [
        {
          "value": "Inheritance",
          "label": "Inheritance"
        },
        {
          "value": "Polymorphism and @Override",
          "label": "Polymorphism and @Override"
        }
      ]
    },
    {
      "group": "Unit 2 — Exception Handling",
      "lessons": [
        {
          "value": "try / catch / finally",
          "label": "try / catch / finally"
        },
        {
          "value": "Recursion",
          "label": "Recursion"
        }
      ]
    },
    {
      "group": "Unit 3 — Exam Preparation",
      "lessons": [
        {
          "value": "IEB Exam Patterns and Tips",
          "label": "IEB Exam Patterns and Tips"
        }
      ]
    }
  ],
  "ai-oracle": [
    {
      "group": "Unit 1 · How AI Works",
      "lessons": [
        {
          "value": "What is AI?",
          "label": "What is AI?"
        },
        {
          "value": "Neural Networks & Training",
          "label": "Neural Networks & Training"
        },
        {
          "value": "Large Language Models",
          "label": "Large Language Models"
        }
      ]
    },
    {
      "group": "Unit 2 · The Art of Prompting",
      "lessons": [
        {
          "value": "Anatomy of a Good Prompt",
          "label": "Anatomy of a Good Prompt"
        },
        {
          "value": "Prompt Techniques",
          "label": "Prompt Techniques"
        },
        {
          "value": "Build Your Own Prompt",
          "label": "Build Your Own Prompt"
        }
      ]
    },
    {
      "group": "Unit 3 · AI Ethics in Education",
      "lessons": [
        {
          "value": "AI & Academic Integrity",
          "label": "AI & Academic Integrity"
        },
        {
          "value": "Verify, Question, Think",
          "label": "Verify, Question, Think"
        },
        {
          "value": "AI as Your Study Partner",
          "label": "AI as Your Study Partner"
        }
      ]
    }
  ],
  "drawing-druid": [
    {
      "group": "Civil Drawing",
      "lessons": [
        {
          "value": "floor-plan",
          "label": "Simple Floor Plan"
        },
        {
          "value": "foundation-section",
          "label": "Foundation-to-Slab Section"
        }
      ]
    },
    {
      "group": "Descriptive Geometry",
      "lessons": [
        {
          "value": "oblique-true-length",
          "label": "Oblique Line: True Length"
        },
        {
          "value": "line-classification",
          "label": "Line Classification"
        }
      ]
    },
    {
      "group": "Electrical Drawing",
      "lessons": [
        {
          "value": "series-circuit",
          "label": "Simple Series Circuit"
        },
        {
          "value": "symbol-reference",
          "label": "Component Symbol Reference"
        }
      ]
    },
    {
      "group": "Freehand Drawing",
      "lessons": [
        {
          "value": "lettering",
          "label": "Lettering Practice"
        },
        {
          "value": "line-types",
          "label": "Line Types Practice"
        },
        {
          "value": "raster-grid",
          "label": "Raster Grid — Multi-View Sketching"
        },
        {
          "value": "isometric-grid",
          "label": "Isometric Grid — Pictorial Sketching"
        }
      ]
    },
    {
      "group": "Geometric Constructions",
      "lessons": [
        {
          "value": "bisect-line",
          "label": "Bisect a Straight Line"
        },
        {
          "value": "bisect-angle",
          "label": "Bisect an Angle"
        },
        {
          "value": "tangent-external",
          "label": "Tangent to a Circle from an External Point"
        },
        {
          "value": "hexagon-in-circle",
          "label": "Regular Hexagon Inscribed in a Circle"
        },
        {
          "value": "pentagon-in-circle",
          "label": "Regular Pentagon Inscribed in a Circle"
        },
        {
          "value": "helix-spring",
          "label": "Helix / Spring Curve"
        }
      ]
    },
    {
      "group": "Isometric Drawing",
      "lessons": [
        {
          "value": "isometric-wedge",
          "label": "Isometric Wedge"
        },
        {
          "value": "isometric-circle",
          "label": "Isometric Circle"
        }
      ]
    },
    {
      "group": "Orthographic Projection",
      "lessons": [
        {
          "value": "l-bracket-views",
          "label": "L-Bracket: Three Views"
        },
        {
          "value": "sectional-view",
          "label": "Stepped Block: Sectional View"
        }
      ]
    },
    {
      "group": "Perspective Drawing",
      "lessons": [
        {
          "value": "one-point-building",
          "label": "One-Point Perspective: A Building"
        },
        {
          "value": "viewpoint-comparison",
          "label": "Bird’s-Eye, Natural & Worm’s-Eye"
        }
      ]
    },
    {
      "group": "Practical Assessment Task",
      "lessons": [
        {
          "value": "design-process",
          "label": "The Design Process"
        },
        {
          "value": "pat-phases",
          "label": "PAT: Three Phases"
        }
      ]
    },
    {
      "group": "Solid Geometry",
      "lessons": [
        {
          "value": "hex-prism-first-angle",
          "label": "Hexagonal Prism (1st Angle)"
        },
        {
          "value": "inclined-cut-true-shape",
          "label": "Inclined Cut: True Shape"
        }
      ]
    }
  ],
  "math-magician": [
    {
      "group": "Grade 8 — Ch 2 — Integers",
      "lessons": [
        {
          "value": "Counting in integers",
          "label": "Counting in integers"
        },
        {
          "value": "Ordering integers",
          "label": "Ordering integers"
        },
        {
          "value": "Addition of integers",
          "label": "Addition of integers"
        },
        {
          "value": "Subtraction of integers",
          "label": "Subtraction of integers"
        },
        {
          "value": "Multiplication of integers",
          "label": "Multiplication of integers"
        },
        {
          "value": "Division of integers",
          "label": "Division of integers"
        },
        {
          "value": "Commutative, associative & distributive",
          "label": "Commutative, associative & distributive"
        },
        {
          "value": "Squares, cubes & roots",
          "label": "Squares, cubes & roots"
        },
        {
          "value": "Mixed operations with integers",
          "label": "Mixed operations with integers"
        },
        {
          "value": "Ch 2 Exam focus",
          "label": "Ch 2 Exam focus"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 3 — Exponents",
      "lessons": [
        {
          "value": "Exponential form",
          "label": "Exponential form"
        },
        {
          "value": "Laws of exponents",
          "label": "Laws of exponents"
        },
        {
          "value": "Mixed operations — exponents",
          "label": "Mixed operations — exponents"
        },
        {
          "value": "Scientific notation",
          "label": "Scientific notation"
        },
        {
          "value": "Ch 3 Exam focus",
          "label": "Ch 3 Exam focus"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 4 — Numeric and Geometric Patterns",
      "lessons": [
        {
          "value": "Numeric number patterns",
          "label": "Numeric number patterns"
        },
        {
          "value": "Geometric number patterns",
          "label": "Geometric number patterns"
        },
        {
          "value": "Visual geometric patterns",
          "label": "Visual geometric patterns"
        },
        {
          "value": "Ch 4 Exam focus",
          "label": "Ch 4 Exam focus"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 5 — Functions and Relationships",
      "lessons": [
        {
          "value": "Input, output & flow diagrams",
          "label": "Input, output & flow diagrams"
        },
        {
          "value": "Tables of values",
          "label": "Tables of values"
        },
        {
          "value": "Word & symbolic formulae",
          "label": "Word & symbolic formulae"
        },
        {
          "value": "Equivalent forms",
          "label": "Equivalent forms"
        },
        {
          "value": "Ch 5 Exam focus",
          "label": "Ch 5 Exam focus"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 6 — Algebraic Expressions",
      "lessons": [
        {
          "value": "Algebraic language & terms",
          "label": "Algebraic language & terms"
        },
        {
          "value": "Like and unlike terms",
          "label": "Like and unlike terms"
        },
        {
          "value": "Adding & subtracting expressions",
          "label": "Adding & subtracting expressions"
        },
        {
          "value": "Multiplying expressions",
          "label": "Multiplying expressions"
        },
        {
          "value": "Dividing expressions",
          "label": "Dividing expressions"
        },
        {
          "value": "Substitution",
          "label": "Substitution"
        },
        {
          "value": "Ch 6 Exam focus",
          "label": "Ch 6 Exam focus"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 7 — Algebraic Equations",
      "lessons": [
        {
          "value": "What is an equation?",
          "label": "What is an equation?"
        },
        {
          "value": "Solving by inspection",
          "label": "Solving by inspection"
        },
        {
          "value": "Solving using inverses",
          "label": "Solving using inverses"
        },
        {
          "value": "Variables on both sides",
          "label": "Variables on both sides"
        },
        {
          "value": "Word problems",
          "label": "Word problems"
        },
        {
          "value": "Ch 7 Exam focus",
          "label": "Ch 7 Exam focus"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 8 — Constructions",
      "lessons": [
        {
          "value": "Notation and terminology",
          "label": "Notation and terminology"
        },
        {
          "value": "Perpendicular lines",
          "label": "Perpendicular lines"
        },
        {
          "value": "Constructing angles",
          "label": "Constructing angles"
        },
        {
          "value": "Constructing triangles",
          "label": "Constructing triangles"
        },
        {
          "value": "Constructing quadrilaterals",
          "label": "Constructing quadrilaterals"
        },
        {
          "value": "Ch 8 Exam focus",
          "label": "Ch 8 Exam focus"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 9 — Geometry of Straight Lines",
      "lessons": [
        {
          "value": "Lines and angles",
          "label": "Lines and angles"
        },
        {
          "value": "Angle relationships",
          "label": "Angle relationships"
        },
        {
          "value": "Parallel lines and angles",
          "label": "Parallel lines and angles"
        },
        {
          "value": "Ch 9 Exam focus",
          "label": "Ch 9 Exam focus"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 10 — Geometry of 2D Shapes",
      "lessons": [
        {
          "value": "Geometry of triangles",
          "label": "Geometry of triangles"
        },
        {
          "value": "Geometry of quadrilaterals",
          "label": "Geometry of quadrilaterals"
        },
        {
          "value": "Triangles and quadrilaterals",
          "label": "Triangles and quadrilaterals"
        },
        {
          "value": "Congruent shapes",
          "label": "Congruent shapes"
        },
        {
          "value": "Similar shapes",
          "label": "Similar shapes"
        },
        {
          "value": "Ch 10 Exam focus",
          "label": "Ch 10 Exam focus"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 11 — Common Fractions",
      "lessons": [
        {
          "value": "Revision of fractions",
          "label": "Revision of fractions"
        },
        {
          "value": "Adding and subtracting fractions",
          "label": "Adding and subtracting fractions"
        },
        {
          "value": "Multiplying fractions",
          "label": "Multiplying fractions"
        },
        {
          "value": "Dividing fractions",
          "label": "Dividing fractions"
        },
        {
          "value": "Squares, cubes, roots",
          "label": "Squares, cubes, roots"
        },
        {
          "value": "Mixed calculations",
          "label": "Mixed calculations"
        },
        {
          "value": "Numbers as fractions",
          "label": "Numbers as fractions"
        },
        {
          "value": "Fractions and percentages",
          "label": "Fractions and percentages"
        },
        {
          "value": "Percentage increase and decrease",
          "label": "Percentage increase and decrease"
        },
        {
          "value": "Ch 11 Exam focus",
          "label": "Ch 11 Exam focus"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 12 — Decimal Fractions",
      "lessons": [
        {
          "value": "The decimal system",
          "label": "The decimal system"
        },
        {
          "value": "Adding and subtracting decimals",
          "label": "Adding and subtracting decimals"
        },
        {
          "value": "Multiplying and dividing decimals",
          "label": "Multiplying and dividing decimals"
        },
        {
          "value": "Squares, cubes and roots of decimals",
          "label": "Squares, cubes and roots of decimals"
        },
        {
          "value": "Rounding and estimating",
          "label": "Rounding and estimating"
        },
        {
          "value": "Ch 12 Exam focus",
          "label": "Ch 12 Exam focus"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 13 — Theorem of Pythagoras",
      "lessons": [
        {
          "value": "Pythagoras in right-angled triangles",
          "label": "Pythagoras in right-angled triangles"
        },
        {
          "value": "Sides and angles not right-angled",
          "label": "Sides and angles not right-angled"
        },
        {
          "value": "Applications of Pythagoras",
          "label": "Applications of Pythagoras"
        },
        {
          "value": "Ch 13 Exam focus",
          "label": "Ch 13 Exam focus"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 14 — Area and Perimeter",
      "lessons": [
        {
          "value": "Perimeter of 2D shapes",
          "label": "Perimeter of 2D shapes"
        },
        {
          "value": "Areas of 2D shapes",
          "label": "Areas of 2D shapes"
        },
        {
          "value": "Equations using formulae",
          "label": "Equations using formulae"
        },
        {
          "value": "SI unit conversions",
          "label": "SI unit conversions"
        },
        {
          "value": "Ch 14 Exam focus",
          "label": "Ch 14 Exam focus"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 15 — Surface Area and Volume",
      "lessons": [
        {
          "value": "Surface area of cubes and prisms",
          "label": "Surface area of cubes and prisms"
        },
        {
          "value": "Surface area of triangular prisms",
          "label": "Surface area of triangular prisms"
        },
        {
          "value": "Volume of cubes and prisms",
          "label": "Volume of cubes and prisms"
        },
        {
          "value": "Volume of triangular prisms",
          "label": "Volume of triangular prisms"
        },
        {
          "value": "Effect of scale factors",
          "label": "Effect of scale factors"
        },
        {
          "value": "Ch 15 Exam focus",
          "label": "Ch 15 Exam focus"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 16 — Data Handling",
      "lessons": [
        {
          "value": "Collecting and organising data",
          "label": "Collecting and organising data"
        },
        {
          "value": "Measures of central tendency",
          "label": "Measures of central tendency"
        },
        {
          "value": "Representing data",
          "label": "Representing data"
        },
        {
          "value": "Interpreting data",
          "label": "Interpreting data"
        },
        {
          "value": "Ch 16 Exam focus",
          "label": "Ch 16 Exam focus"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 17 — Probability",
      "lessons": [
        {
          "value": "Probability concepts",
          "label": "Probability concepts"
        },
        {
          "value": "Listing outcomes",
          "label": "Listing outcomes"
        },
        {
          "value": "Relative frequency",
          "label": "Relative frequency"
        },
        {
          "value": "Tree diagrams",
          "label": "Tree diagrams"
        },
        {
          "value": "Ch 17 Exam focus",
          "label": "Ch 17 Exam focus"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 18 — Transformation Geometry",
      "lessons": [
        {
          "value": "Translations and reflections",
          "label": "Translations and reflections"
        },
        {
          "value": "Rotations and enlargements",
          "label": "Rotations and enlargements"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 19 — Geometry of 3D Shapes",
      "lessons": [
        {
          "value": "Classifying 3D objects",
          "label": "Classifying 3D objects"
        },
        {
          "value": "Nets of prisms and pyramids",
          "label": "Nets of prisms and pyramids"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 1 — Number Systems, Ratios, Rates and Financial Maths",
      "lessons": [
        {
          "value": "Number systems",
          "label": "Number systems"
        },
        {
          "value": "Ratios and rates",
          "label": "Ratios and rates"
        },
        {
          "value": "Financial mathematics",
          "label": "Financial mathematics"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 2 — Integers",
      "lessons": [
        {
          "value": "Operations with integers",
          "label": "Operations with integers"
        },
        {
          "value": "Properties of integers",
          "label": "Properties of integers"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 3 — Common and Decimal Fractions",
      "lessons": [
        {
          "value": "Common fractions",
          "label": "Common fractions"
        },
        {
          "value": "Decimal fractions",
          "label": "Decimal fractions"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 4 — Exponents",
      "lessons": [
        {
          "value": "Laws of exponents",
          "label": "Laws of exponents"
        },
        {
          "value": "Scientific notation",
          "label": "Scientific notation"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 5 — Numeric and Geometric Patterns",
      "lessons": [
        {
          "value": "Numeric patterns",
          "label": "Numeric patterns"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 6 — Functions and Relationships",
      "lessons": [
        {
          "value": "Functions and mappings",
          "label": "Functions and mappings"
        },
        {
          "value": "Linear and non-linear functions",
          "label": "Linear and non-linear functions"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 7 — Algebraic Expressions",
      "lessons": [
        {
          "value": "Expanding and simplifying",
          "label": "Expanding and simplifying"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 8 — Factorisation",
      "lessons": [
        {
          "value": "Common factors and grouping",
          "label": "Common factors and grouping"
        },
        {
          "value": "Difference of squares and trinomials",
          "label": "Difference of squares and trinomials"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 9 — Algebraic Equations",
      "lessons": [
        {
          "value": "Linear equations",
          "label": "Linear equations"
        },
        {
          "value": "Quadratic equations",
          "label": "Quadratic equations"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 10 — Geometric Constructions",
      "lessons": [
        {
          "value": "Bisectors and perpendiculars",
          "label": "Bisectors and perpendiculars"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 11 — Geometry of 2D Shapes",
      "lessons": [
        {
          "value": "Triangles and quadrilaterals",
          "label": "Triangles and quadrilaterals"
        },
        {
          "value": "Similar and congruent shapes",
          "label": "Similar and congruent shapes"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 12 — Geometry of Straight Lines",
      "lessons": [
        {
          "value": "Angle relationships",
          "label": "Angle relationships"
        },
        {
          "value": "Proving parallel lines",
          "label": "Proving parallel lines"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 13 — Pythagoras' Theorem",
      "lessons": [
        {
          "value": "Pythagoras' theorem",
          "label": "Pythagoras' theorem"
        },
        {
          "value": "Applications of Pythagoras",
          "label": "Applications of Pythagoras"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 14 — Area and Perimeter",
      "lessons": [
        {
          "value": "Perimeter",
          "label": "Perimeter"
        },
        {
          "value": "Area",
          "label": "Area"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 15 — Surface Area and Volume",
      "lessons": [
        {
          "value": "Surface area",
          "label": "Surface area"
        },
        {
          "value": "Volume",
          "label": "Volume"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 16 — Transformation Geometry",
      "lessons": [
        {
          "value": "Translations and reflections",
          "label": "Translations and reflections"
        },
        {
          "value": "Rotations and enlargements",
          "label": "Rotations and enlargements"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 17 — Geometry of 3D Shapes",
      "lessons": [
        {
          "value": "Polyhedra",
          "label": "Polyhedra"
        },
        {
          "value": "Nets and cross-sections",
          "label": "Nets and cross-sections"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 18 — Data Handling",
      "lessons": [
        {
          "value": "Collect, organise and summarise data",
          "label": "Collect, organise and summarise data"
        },
        {
          "value": "Represent data",
          "label": "Represent data"
        },
        {
          "value": "Interpret, analyse and report data",
          "label": "Interpret, analyse and report data"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 19 — Probability",
      "lessons": [
        {
          "value": "Probability of events, relative frequency",
          "label": "Probability of events, relative frequency"
        },
        {
          "value": "Probability models and two-way tables",
          "label": "Probability models and two-way tables"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 1 — Algebraic Expressions (Surds & Factorisation)",
      "lessons": [
        {
          "value": "Real numbers & surds",
          "label": "Real numbers & surds"
        },
        {
          "value": "Products & factorisation",
          "label": "Products & factorisation"
        },
        {
          "value": "Multiplying binomials by trinomials",
          "label": "Multiplying binomials by trinomials"
        },
        {
          "value": "Sum and difference of cubes",
          "label": "Sum and difference of cubes"
        },
        {
          "value": "Algebraic fractions with cube denominators",
          "label": "Algebraic fractions with cube denominators"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 2 — Exponents and Exponential Equations",
      "lessons": [
        {
          "value": "Exponent laws",
          "label": "Exponent laws"
        },
        {
          "value": "Exponential equations",
          "label": "Exponential equations"
        },
        {
          "value": "Simplifying complex exponential expressions",
          "label": "Simplifying complex exponential expressions"
        },
        {
          "value": "Advanced exponential equations",
          "label": "Advanced exponential equations"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 3 — Number Patterns (Linear Sequences)",
      "lessons": [
        {
          "value": "Linear sequences",
          "label": "Linear sequences"
        },
        {
          "value": "Patterns in context",
          "label": "Patterns in context"
        },
        {
          "value": "Non-obvious pattern problems",
          "label": "Non-obvious pattern problems"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 4 — Equations and Inequalities",
      "lessons": [
        {
          "value": "Linear & quadratic equations",
          "label": "Linear & quadratic equations"
        },
        {
          "value": "Word problems & inequalities",
          "label": "Word problems & inequalities"
        },
        {
          "value": "Simultaneous equations — deeper practice",
          "label": "Simultaneous equations — deeper practice"
        },
        {
          "value": "Word problems in context",
          "label": "Word problems in context"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 5 — Trigonometry Part 1",
      "lessons": [
        {
          "value": "Trig ratios & special angles",
          "label": "Trig ratios & special angles"
        },
        {
          "value": "Trig equations & Cartesian plane",
          "label": "Trig equations & Cartesian plane"
        },
        {
          "value": "Solving right-angled triangles",
          "label": "Solving right-angled triangles"
        },
        {
          "value": "Reciprocal ratios & trig identities",
          "label": "Reciprocal ratios & trig identities"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 6 — Functions",
      "lessons": [
        {
          "value": "Linear, quadratic & hyperbolic functions",
          "label": "Linear, quadratic & hyperbolic functions"
        },
        {
          "value": "Exponential & trig functions",
          "label": "Exponential & trig functions"
        },
        {
          "value": "The concept of a function",
          "label": "The concept of a function"
        },
        {
          "value": "Effect of parameters a and q",
          "label": "Effect of parameters a and q"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 7 — Euclidean Geometry Part 1",
      "lessons": [
        {
          "value": "Triangles",
          "label": "Triangles"
        },
        {
          "value": "Quadrilaterals & midpoint theorem",
          "label": "Quadrilaterals & midpoint theorem"
        },
        {
          "value": "Special quadrilaterals — kite & trapezium",
          "label": "Special quadrilaterals — kite & trapezium"
        },
        {
          "value": "Special quadrilaterals — parallelogram family",
          "label": "Special quadrilaterals — parallelogram family"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 8 — Analytical Geometry",
      "lessons": [
        {
          "value": "Distance & midpoint",
          "label": "Distance & midpoint"
        },
        {
          "value": "Gradient of a line",
          "label": "Gradient of a line"
        },
        {
          "value": "Equation of a line",
          "label": "Equation of a line"
        },
        {
          "value": "Analytical geometry of quadrilaterals",
          "label": "Analytical geometry of quadrilaterals"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 9 — Finance and Growth",
      "lessons": [
        {
          "value": "Simple & compound interest",
          "label": "Simple & compound interest"
        },
        {
          "value": "Exchange rates & hire purchase",
          "label": "Exchange rates & hire purchase"
        },
        {
          "value": "Inflation & population growth",
          "label": "Inflation & population growth"
        },
        {
          "value": "Solving for rate or time period",
          "label": "Solving for rate or time period"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 10 — Statistics",
      "lessons": [
        {
          "value": "Measures of central tendency",
          "label": "Measures of central tendency"
        },
        {
          "value": "Dispersion & five-number summary",
          "label": "Dispersion & five-number summary"
        },
        {
          "value": "Box-and-whisker diagrams",
          "label": "Box-and-whisker diagrams"
        },
        {
          "value": "Interpreting statistics in context",
          "label": "Interpreting statistics in context"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 11 — Trigonometry Part 2",
      "lessons": [
        {
          "value": "2D trig problems",
          "label": "2D trig problems"
        },
        {
          "value": "Multi-triangle problems",
          "label": "Multi-triangle problems"
        },
        {
          "value": "Bearings & navigation problems",
          "label": "Bearings & navigation problems"
        },
        {
          "value": "Mixed 2D trigonometry applications",
          "label": "Mixed 2D trigonometry applications"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 12 — Euclidean Geometry Part 2",
      "lessons": [
        {
          "value": "Proofs & conjectures",
          "label": "Proofs & conjectures"
        },
        {
          "value": "Proving parallelogram properties",
          "label": "Proving parallelogram properties"
        },
        {
          "value": "Congruency proofs",
          "label": "Congruency proofs"
        },
        {
          "value": "Mixed riders with quadrilaterals",
          "label": "Mixed riders with quadrilaterals"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 13 — Measurement",
      "lessons": [
        {
          "value": "Area & surface area",
          "label": "Area & surface area"
        },
        {
          "value": "Volume & scale factor",
          "label": "Volume & scale factor"
        },
        {
          "value": "Composite solids",
          "label": "Composite solids"
        },
        {
          "value": "Pyramids and cones in depth",
          "label": "Pyramids and cones in depth"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 14 — Probability",
      "lessons": [
        {
          "value": "Probability basics & Venn diagrams",
          "label": "Probability basics & Venn diagrams"
        },
        {
          "value": "Mutually exclusive & complementary events",
          "label": "Mutually exclusive & complementary events"
        },
        {
          "value": "Relative frequency vs theoretical probability",
          "label": "Relative frequency vs theoretical probability"
        },
        {
          "value": "Two-way tables",
          "label": "Two-way tables"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 1 — Exponents and Surds",
      "lessons": [
        {
          "value": "Rational exponents & surd operations",
          "label": "Rational exponents & surd operations"
        },
        {
          "value": "Surd equations & exponential applications",
          "label": "Surd equations & exponential applications"
        },
        {
          "value": "Laws of exponents & exponential equations",
          "label": "Laws of exponents & exponential equations"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 2 — Equations and Inequalities",
      "lessons": [
        {
          "value": "Completing the square, formula & nature of roots",
          "label": "Completing the square, formula & nature of roots"
        },
        {
          "value": "Quadratic inequalities & simultaneous equations",
          "label": "Quadratic inequalities & simultaneous equations"
        },
        {
          "value": "Quadratic formula & derivation",
          "label": "Quadratic formula & derivation"
        },
        {
          "value": "Solving problems with quadratic equations",
          "label": "Solving problems with quadratic equations"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 3 — Number Patterns (Quadratic Sequences)",
      "lessons": [
        {
          "value": "Quadratic sequences",
          "label": "Quadratic sequences"
        },
        {
          "value": "Working with quadratic sequences",
          "label": "Working with quadratic sequences"
        },
        {
          "value": "Quadratic patterns in context",
          "label": "Quadratic patterns in context"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 4 — Analytical Geometry",
      "lessons": [
        {
          "value": "Equation of a line & inclination",
          "label": "Equation of a line & inclination"
        },
        {
          "value": "Parallel, perpendicular & complex problems",
          "label": "Parallel, perpendicular & complex problems"
        },
        {
          "value": "Angle between two lines",
          "label": "Angle between two lines"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 5 — Functions",
      "lessons": [
        {
          "value": "Quadratic, hyperbolic & exponential functions",
          "label": "Quadratic, hyperbolic & exponential functions"
        },
        {
          "value": "Trigonometric functions — period, amplitude & phase shift",
          "label": "Trigonometric functions — period, amplitude & phase shift"
        },
        {
          "value": "Sketching functions: intercepts, domain & range",
          "label": "Sketching functions: intercepts, domain & range"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 6 — Trigonometry",
      "lessons": [
        {
          "value": "Trig identities & reduction formulae",
          "label": "Trig identities & reduction formulae"
        },
        {
          "value": "Sine rule, cosine rule & area rule",
          "label": "Sine rule, cosine rule & area rule"
        },
        {
          "value": "Solving trigonometric equations",
          "label": "Solving trigonometric equations"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 7 — Measurement",
      "lessons": [
        {
          "value": "Surface area of complex solids",
          "label": "Surface area of complex solids"
        },
        {
          "value": "Volume & the effect of scale factor k",
          "label": "Volume & the effect of scale factor k"
        },
        {
          "value": "Composite shapes in context",
          "label": "Composite shapes in context"
        },
        {
          "value": "Measurement with trigonometry",
          "label": "Measurement with trigonometry"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 8 — Euclidean Geometry — Circle Geometry",
      "lessons": [
        {
          "value": "Circle theorems",
          "label": "Circle theorems"
        },
        {
          "value": "Tangent theorems & chord proofs",
          "label": "Tangent theorems & chord proofs"
        },
        {
          "value": "Chord, radius & distance calculations",
          "label": "Chord, radius & distance calculations"
        },
        {
          "value": "Circle geometry riders",
          "label": "Circle geometry riders"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 9 — Finance, Growth and Decay",
      "lessons": [
        {
          "value": "Depreciation & timelines",
          "label": "Depreciation & timelines"
        },
        {
          "value": "Nominal & effective interest rates",
          "label": "Nominal & effective interest rates"
        },
        {
          "value": "Multi-stage investments with timelines",
          "label": "Multi-stage investments with timelines"
        },
        {
          "value": "Solving for n and i",
          "label": "Solving for n and i"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 10 — Probability",
      "lessons": [
        {
          "value": "Independent & dependent events",
          "label": "Independent & dependent events"
        },
        {
          "value": "Venn diagrams, tree diagrams & contingency tables",
          "label": "Venn diagrams, tree diagrams & contingency tables"
        },
        {
          "value": "Venn diagrams for three events",
          "label": "Venn diagrams for three events"
        },
        {
          "value": "Fundamental counting principle",
          "label": "Fundamental counting principle"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 11 — Statistics",
      "lessons": [
        {
          "value": "Histograms, ogives & standard deviation",
          "label": "Histograms, ogives & standard deviation"
        },
        {
          "value": "Skewness, outliers & data interpretation",
          "label": "Skewness, outliers & data interpretation"
        },
        {
          "value": "Comparing datasets with standard deviation",
          "label": "Comparing datasets with standard deviation"
        },
        {
          "value": "Standard deviation from a frequency table",
          "label": "Standard deviation from a frequency table"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 12 — Linear Programming",
      "lessons": [
        {
          "value": "Setting up linear programming problems",
          "label": "Setting up linear programming problems"
        },
        {
          "value": "Optimisation — solving LP problems",
          "label": "Optimisation — solving LP problems"
        }
      ]
    },
    {
      "group": "Grade 12 — Ch 1 — Sequences and Series",
      "lessons": [
        {
          "value": "Arithmetic & geometric sequences",
          "label": "Arithmetic & geometric sequences"
        },
        {
          "value": "Series — arithmetic, geometric & infinite",
          "label": "Series — arithmetic, geometric & infinite"
        },
        {
          "value": "Sigma notation & number patterns",
          "label": "Sigma notation & number patterns"
        },
        {
          "value": "Deriving series formulae & applications",
          "label": "Deriving series formulae & applications"
        }
      ]
    },
    {
      "group": "Grade 12 — Ch 2 — Functions and Logarithms",
      "lessons": [
        {
          "value": "Inverse functions",
          "label": "Inverse functions"
        },
        {
          "value": "Logarithmic functions & equations",
          "label": "Logarithmic functions & equations"
        },
        {
          "value": "Restricting domains for inverses",
          "label": "Restricting domains for inverses"
        },
        {
          "value": "Graphing exponential & logarithmic functions",
          "label": "Graphing exponential & logarithmic functions"
        }
      ]
    },
    {
      "group": "Grade 12 — Ch 3 — Finance — Annuities",
      "lessons": [
        {
          "value": "Future value annuities",
          "label": "Future value annuities"
        },
        {
          "value": "Present value annuities & loan repayments",
          "label": "Present value annuities & loan repayments"
        },
        {
          "value": "Simple & compound growth vs decay",
          "label": "Simple & compound growth vs decay"
        },
        {
          "value": "Comparing investment & loan options",
          "label": "Comparing investment & loan options"
        }
      ]
    },
    {
      "group": "Grade 12 — Ch 4 — Trigonometry",
      "lessons": [
        {
          "value": "Compound angle identities",
          "label": "Compound angle identities"
        },
        {
          "value": "Trig equations & 3D applications",
          "label": "Trig equations & 3D applications"
        },
        {
          "value": "Sine, cosine & area rules in 2D and 3D",
          "label": "Sine, cosine & area rules in 2D and 3D"
        },
        {
          "value": "Proving trigonometric identities",
          "label": "Proving trigonometric identities"
        }
      ]
    },
    {
      "group": "Grade 12 — Ch 5 — Polynomials",
      "lessons": [
        {
          "value": "Remainder & factor theorems",
          "label": "Remainder & factor theorems"
        },
        {
          "value": "Cubic polynomials — sketching & solving",
          "label": "Cubic polynomials — sketching & solving"
        },
        {
          "value": "Finding unknown coefficients",
          "label": "Finding unknown coefficients"
        },
        {
          "value": "Sketching cubic graphs from key features",
          "label": "Sketching cubic graphs from key features"
        }
      ]
    },
    {
      "group": "Grade 12 — Ch 6 — Differential Calculus",
      "lessons": [
        {
          "value": "Limits, first principles & rules",
          "label": "Limits, first principles & rules"
        },
        {
          "value": "Tangents, curve sketching & optimisation",
          "label": "Tangents, curve sketching & optimisation"
        },
        {
          "value": "Rates of change & calculus of motion",
          "label": "Rates of change & calculus of motion"
        },
        {
          "value": "Cubic graphs: full analysis & interpretation",
          "label": "Cubic graphs: full analysis & interpretation"
        }
      ]
    },
    {
      "group": "Grade 12 — Ch 7 — Analytical Geometry — Circles",
      "lessons": [
        {
          "value": "Equation of a circle",
          "label": "Equation of a circle"
        },
        {
          "value": "Tangent to a circle",
          "label": "Tangent to a circle"
        },
        {
          "value": "Lines, chords & circles",
          "label": "Lines, chords & circles"
        },
        {
          "value": "Tangents from an external point",
          "label": "Tangents from an external point"
        }
      ]
    },
    {
      "group": "Grade 12 — Ch 8 — Euclidean Geometry",
      "lessons": [
        {
          "value": "Proportion, polygons & triangle theorems",
          "label": "Proportion, polygons & triangle theorems"
        },
        {
          "value": "Similarity & Pythagorean theorem proofs",
          "label": "Similarity & Pythagorean theorem proofs"
        },
        {
          "value": "Similar polygons & scale factor problems",
          "label": "Similar polygons & scale factor problems"
        }
      ]
    },
    {
      "group": "Grade 12 — Ch 9 — Statistics",
      "lessons": [
        {
          "value": "Scatter plots & regression",
          "label": "Scatter plots & regression"
        },
        {
          "value": "Correlation coefficient",
          "label": "Correlation coefficient"
        },
        {
          "value": "Symmetric & skewed data",
          "label": "Symmetric & skewed data"
        }
      ]
    },
    {
      "group": "Grade 12 — Ch 10 — Probability — Counting Principles",
      "lessons": [
        {
          "value": "Fundamental counting principle & factorial notation",
          "label": "Fundamental counting principle & factorial notation"
        },
        {
          "value": "Combinations & probability applications",
          "label": "Combinations & probability applications"
        },
        {
          "value": "Revision: probability identities & Venn diagrams",
          "label": "Revision: probability identities & Venn diagrams"
        },
        {
          "value": "Tree diagrams, tables & dependent events",
          "label": "Tree diagrams, tables & dependent events"
        }
      ]
    }
  ],
  "java-genie": [
    {
      "group": "Tutorial",
      "lessons": [
        {
          "value": "Turtle Graphics Tutorial",
          "label": "Turtle Graphics Tutorial (whole walkthrough)"
        }
      ]
    }
  ],
  "web-wizard": [
    {
      "group": "Tutorial",
      "lessons": [
        {
          "value": "HTML & CSS Tutorial",
          "label": "HTML & CSS Tutorial (whole walkthrough)"
        }
      ]
    }
  ]
};
