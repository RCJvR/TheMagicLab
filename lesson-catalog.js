// ============================================================
// THE MAGIC LAB — lesson-catalog.js
// Static catalog of every assignable lesson/topic per tool, used by the
// teacher "Assignments" tab's lesson picker. Each entry's `value` is the
// EXACT string that tool passes as `topic` when it records a
// lesson_complete progress_event — assignment completion in
// assignments.js matches against it verbatim (case/whitespace-insensitive),
// so if a tool's lesson data changes, this file needs regenerating too.
//
// Math Magician, Science Sage and Tech Tower entries also carry `ref`, the
// lesson's fixed id (mm:<grade>:<topic id>, ss:/tt:<grade>:<strand/file>).
// Assignments made with a ref are matched on it instead of the name, so a
// lesson done in Afrikaans counts, and they also get scores. Those sections
// are written by scripts/build-math-catalog.js and scripts/build-lesson-index.js.
//
// java-genie and web-wizard are single continuous walkthroughs rather
// than discrete lessons, so each has exactly one selectable entry
// representing the whole tutorial; completion fires when a learner
// reaches and closes the last slide (see the lesson_complete track()
// calls added to those two files).
//
// Not included: robot-realm, model-mage, spike-spellcaster — these tools
// don't yet call progress.js's track() with lesson_complete events, so
// there is nothing here to pick from until that's added.
// ============================================================

window.ML_LESSON_CATALOG = {
  "computer-codex": [
    {
      "group": "Coding & Robotics (Gr 8–9)",
      "lessons": [
        {
          "value": "What is an Operating System?",
          "label": "What is an Operating System?",
          "ref": "cc:8:coding/what-is-an-operating-system"
        },
        {
          "value": "Navigating Windows",
          "label": "Navigating Windows",
          "ref": "cc:8:coding/navigating-windows"
        },
        {
          "value": "Working with Files and Folders",
          "label": "Working with Files and Folders",
          "ref": "cc:8:coding/working-with-files-and-folders"
        },
        {
          "value": "What is a File Extension?",
          "label": "What is a File Extension?",
          "ref": "cc:8:coding/what-is-a-file-extension"
        },
        {
          "value": "Understanding the Ribbon Interface",
          "label": "Understanding the Ribbon Interface",
          "ref": "cc:8:coding/understanding-the-ribbon-interface"
        },
        {
          "value": "Creating and Saving Word Documents",
          "label": "Creating and Saving Word Documents",
          "ref": "cc:8:coding/creating-and-saving-word-documents"
        },
        {
          "value": "Text Formatting and Styles",
          "label": "Text Formatting and Styles",
          "ref": "cc:8:coding/text-formatting-and-styles"
        },
        {
          "value": "Introduction to Spreadsheets",
          "label": "Introduction to Spreadsheets",
          "ref": "cc:8:coding/introduction-to-spreadsheets"
        },
        {
          "value": "Excel Formulas and Functions",
          "label": "Excel Formulas and Functions",
          "ref": "cc:8:coding/excel-formulas-and-functions"
        },
        {
          "value": "COUNTIF and SUMIF",
          "label": "COUNTIF and SUMIF",
          "ref": "cc:8:coding/countif-and-sumif"
        },
        {
          "value": "Relative vs Absolute Cell References",
          "label": "Relative vs Absolute Cell References",
          "ref": "cc:8:coding/relative-vs-absolute-cell-references"
        },
        {
          "value": "Creating Charts in Excel",
          "label": "Creating Charts in Excel",
          "ref": "cc:8:coding/creating-charts-in-excel"
        },
        {
          "value": "What is Computational Thinking?",
          "label": "What is Computational Thinking?",
          "ref": "cc:8:coding/what-is-computational-thinking"
        },
        {
          "value": "Decomposition",
          "label": "Decomposition",
          "ref": "cc:8:coding/decomposition"
        },
        {
          "value": "Pattern Recognition",
          "label": "Pattern Recognition",
          "ref": "cc:8:coding/pattern-recognition"
        },
        {
          "value": "Abstraction",
          "label": "Abstraction",
          "ref": "cc:8:coding/abstraction"
        },
        {
          "value": "Algorithm Design",
          "label": "Algorithm Design",
          "ref": "cc:8:coding/algorithm-design"
        },
        {
          "value": "Practical Examples",
          "label": "Practical Examples",
          "ref": "cc:8:coding/practical-examples"
        },
        {
          "value": "What is Pseudo Code?",
          "label": "What is Pseudo Code?",
          "ref": "cc:8:coding/what-is-pseudo-code"
        },
        {
          "value": "Pseudo Code — Practical Examples",
          "label": "Pseudo Code — Practical Examples",
          "ref": "cc:8:coding/pseudo-code-practical-examples"
        },
        {
          "value": "What is a Flow Diagram?",
          "label": "What is a Flow Diagram?",
          "ref": "cc:8:coding/what-is-a-flow-diagram"
        },
        {
          "value": "Flow Diagram Examples and Builder",
          "label": "Flow Diagram Examples and Builder",
          "ref": "cc:8:coding/flow-diagram-examples-and-builder"
        },
        {
          "value": "What is Artificial Intelligence?",
          "label": "What is Artificial Intelligence?",
          "ref": "cc:8:coding/what-is-artificial-intelligence"
        },
        {
          "value": "How Machine Learning Works",
          "label": "How Machine Learning Works",
          "ref": "cc:8:coding/how-machine-learning-works"
        },
        {
          "value": "Large Language Models & GPT",
          "label": "Large Language Models & GPT",
          "ref": "cc:8:coding/large-language-models-and-gpt"
        },
        {
          "value": "Generative AI — Images, Audio & Beyond",
          "label": "Generative AI — Images, Audio & Beyond",
          "ref": "cc:8:coding/generative-ai-images-audio-and-beyond"
        },
        {
          "value": "Using AI Ethically",
          "label": "Using AI Ethically",
          "ref": "cc:8:coding/using-ai-ethically"
        }
      ]
    },
    {
      "group": "CAT — CAPS · Grade 10",
      "lessons": [
        {
          "value": "What Is a Computer System?",
          "label": "What Is a Computer System?",
          "ref": "cc:10:cat-caps/what-is-a-computer-system"
        },
        {
          "value": "Hardware Essentials — Input, Output, Storage and Processing",
          "label": "Hardware Essentials — Input, Output, Storage and Processing",
          "ref": "cc:10:cat-caps/hardware-essentials-input-output-storage-and-processing"
        },
        {
          "value": "System Software vs Application Software",
          "label": "System Software vs Application Software",
          "ref": "cc:10:cat-caps/system-software-vs-application-software"
        },
        {
          "value": "Organising Files and Folders",
          "label": "Organising Files and Folders",
          "ref": "cc:10:cat-caps/organising-files-and-folders"
        },
        {
          "value": "Networks — Connecting Computers Together",
          "label": "Networks — Connecting Computers Together",
          "ref": "cc:10:cat-caps/networks-connecting-computers-together"
        },
        {
          "value": "The Internet, the Web, and Search Engines",
          "label": "The Internet, the Web, and Search Engines",
          "ref": "cc:10:cat-caps/the-internet-the-web-and-search-engines"
        },
        {
          "value": "E-Communication, Netiquette and Online Safety",
          "label": "E-Communication, Netiquette and Online Safety",
          "ref": "cc:10:cat-caps/e-communication-netiquette-and-online-safety"
        },
        {
          "value": "Word Processing, Spreadsheet and Presentation Theory",
          "label": "Word Processing, Spreadsheet and Presentation Theory",
          "ref": "cc:10:cat-caps/word-processing-spreadsheet-and-presentation-theory"
        },
        {
          "value": "Finding, Evaluating and Presenting Information",
          "label": "Finding, Evaluating and Presenting Information",
          "ref": "cc:10:cat-caps/finding-evaluating-and-presenting-information"
        },
        {
          "value": "Ergonomics, Green Computing and Digital Citizenship",
          "label": "Ergonomics, Green Computing and Digital Citizenship",
          "ref": "cc:10:cat-caps/ergonomics-green-computing-and-digital-citizenship"
        }
      ]
    },
    {
      "group": "CAT — CAPS · Grade 11",
      "lessons": [
        {
          "value": "Extending Hardware Knowledge",
          "label": "Extending Hardware Knowledge",
          "ref": "cc:11:cat-caps/extending-hardware-knowledge"
        },
        {
          "value": "Inside the System Unit — Storage and Processing",
          "label": "Inside the System Unit — Storage and Processing",
          "ref": "cc:11:cat-caps/inside-the-system-unit-storage-and-processing"
        },
        {
          "value": "Software, Cloud Storage and Computer Management",
          "label": "Software, Cloud Storage and Computer Management",
          "ref": "cc:11:cat-caps/software-cloud-storage-and-computer-management"
        },
        {
          "value": "LANs, WLANs and Network Components",
          "label": "LANs, WLANs and Network Components",
          "ref": "cc:11:cat-caps/lans-wlans-and-network-components"
        },
        {
          "value": "Spreadsheet Skills — Conditional Formatting, Functions and Charts",
          "label": "Spreadsheet Skills — Conditional Formatting, Functions and Charts",
          "ref": "cc:11:cat-caps/spreadsheet-skills-conditional-formatting-functions-and-charts"
        },
        {
          "value": "Introduction to Databases",
          "label": "Introduction to Databases",
          "ref": "cc:11:cat-caps/introduction-to-databases"
        },
        {
          "value": "HTML and Web Design Basics",
          "label": "HTML and Web Design Basics",
          "ref": "cc:11:cat-caps/html-and-web-design-basics"
        },
        {
          "value": "Digital Communication and Online Services",
          "label": "Digital Communication and Online Services",
          "ref": "cc:11:cat-caps/digital-communication-and-online-services"
        },
        {
          "value": "Evaluating Information Quality",
          "label": "Evaluating Information Quality",
          "ref": "cc:11:cat-caps/evaluating-information-quality"
        },
        {
          "value": "Security, Ethics and the Changing Workplace",
          "label": "Security, Ethics and the Changing Workplace",
          "ref": "cc:11:cat-caps/security-ethics-and-the-changing-workplace"
        }
      ]
    },
    {
      "group": "CAT — CAPS · Grade 12",
      "lessons": [
        {
          "value": "Choosing the Right System for Every User",
          "label": "Choosing the Right System for Every User",
          "ref": "cc:12:cat-caps/choosing-the-right-system-for-every-user"
        },
        {
          "value": "Software for Accessibility and Productivity",
          "label": "Software for Accessibility and Productivity",
          "ref": "cc:12:cat-caps/software-for-accessibility-and-productivity"
        },
        {
          "value": "The Operating System and Computer Management",
          "label": "The Operating System and Computer Management",
          "ref": "cc:12:cat-caps/the-operating-system-and-computer-management"
        },
        {
          "value": "User-Centred Design and the Environment",
          "label": "User-Centred Design and the Environment",
          "ref": "cc:12:cat-caps/user-centred-design-and-the-environment"
        },
        {
          "value": "Cybercrime, Malware and Online Safety",
          "label": "Cybercrime, Malware and Online Safety",
          "ref": "cc:12:cat-caps/cybercrime-malware-and-online-safety"
        },
        {
          "value": "Social Networking, Privacy and Emerging Realities",
          "label": "Social Networking, Privacy and Emerging Realities",
          "ref": "cc:12:cat-caps/social-networking-privacy-and-emerging-realities"
        },
        {
          "value": "WANs, Internet Services and Getting Connected",
          "label": "WANs, Internet Services and Getting Connected",
          "ref": "cc:12:cat-caps/wans-internet-services-and-getting-connected"
        },
        {
          "value": "Browsers, Communication and Mobile Devices",
          "label": "Browsers, Communication and Mobile Devices",
          "ref": "cc:12:cat-caps/browsers-communication-and-mobile-devices"
        },
        {
          "value": "Advanced Spreadsheet and Database Concepts",
          "label": "Advanced Spreadsheet and Database Concepts",
          "ref": "cc:12:cat-caps/advanced-spreadsheet-and-database-concepts"
        },
        {
          "value": "Professional Reports and Final Exam Readiness",
          "label": "Professional Reports and Final Exam Readiness",
          "ref": "cc:12:cat-caps/professional-reports-and-final-exam-readiness"
        }
      ]
    },
    {
      "group": "CAT — IEB · Grade 10",
      "lessons": [
        {
          "value": "Computer Systems and Computer Types",
          "label": "Computer Systems and Computer Types",
          "ref": "cc:10:cat-ieb/computer-systems-and-computer-types"
        },
        {
          "value": "Input, Output and Storage Devices",
          "label": "Input, Output and Storage Devices",
          "ref": "cc:10:cat-ieb/input-output-and-storage-devices"
        },
        {
          "value": "Software, Licensing and the Operating System",
          "label": "Software, Licensing and the Operating System",
          "ref": "cc:10:cat-ieb/software-licensing-and-the-operating-system"
        },
        {
          "value": "Windows Basics and File Organisation",
          "label": "Windows Basics and File Organisation",
          "ref": "cc:10:cat-ieb/windows-basics-and-file-organisation"
        },
        {
          "value": "Types of Networks",
          "label": "Types of Networks",
          "ref": "cc:10:cat-ieb/types-of-networks"
        },
        {
          "value": "The Web, Browsers and Online Services",
          "label": "The Web, Browsers and Online Services",
          "ref": "cc:10:cat-ieb/the-web-browsers-and-online-services"
        },
        {
          "value": "E-Communication and Netiquette",
          "label": "E-Communication and Netiquette",
          "ref": "cc:10:cat-ieb/e-communication-and-netiquette"
        },
        {
          "value": "Finding, Sifting and Presenting Information",
          "label": "Finding, Sifting and Presenting Information",
          "ref": "cc:10:cat-ieb/finding-sifting-and-presenting-information"
        },
        {
          "value": "Digital Citizenship — Society, Ethics and Safety",
          "label": "Digital Citizenship — Society, Ethics and Safety",
          "ref": "cc:10:cat-ieb/digital-citizenship-society-ethics-and-safety"
        }
      ]
    },
    {
      "group": "CAT — IEB · Grade 11",
      "lessons": [
        {
          "value": "Devices for Every User",
          "label": "Devices for Every User",
          "ref": "cc:11:cat-ieb/devices-for-every-user"
        },
        {
          "value": "Storage, the System Unit and Troubleshooting",
          "label": "Storage, the System Unit and Troubleshooting",
          "ref": "cc:11:cat-ieb/storage-the-system-unit-and-troubleshooting"
        },
        {
          "value": "Software Installation and Management",
          "label": "Software Installation and Management",
          "ref": "cc:11:cat-ieb/software-installation-and-management"
        },
        {
          "value": "Windows Features and File Sharing",
          "label": "Windows Features and File Sharing",
          "ref": "cc:11:cat-ieb/windows-features-and-file-sharing"
        },
        {
          "value": "Network Security and Topologies",
          "label": "Network Security and Topologies",
          "ref": "cc:11:cat-ieb/network-security-and-topologies"
        },
        {
          "value": "Mobile Internet and Digital Communication",
          "label": "Mobile Internet and Digital Communication",
          "ref": "cc:11:cat-ieb/mobile-internet-and-digital-communication"
        },
        {
          "value": "Cloud, IoT and Web Applications",
          "label": "Cloud, IoT and Web Applications",
          "ref": "cc:11:cat-ieb/cloud-iot-and-web-applications"
        },
        {
          "value": "Browser Privacy and Effective Searching",
          "label": "Browser Privacy and Effective Searching",
          "ref": "cc:11:cat-ieb/browser-privacy-and-effective-searching"
        },
        {
          "value": "Preparing for the PAT",
          "label": "Preparing for the PAT",
          "ref": "cc:11:cat-ieb/preparing-for-the-pat"
        },
        {
          "value": "Economy, Security and Data Integrity",
          "label": "Economy, Security and Data Integrity",
          "ref": "cc:11:cat-ieb/economy-security-and-data-integrity"
        }
      ]
    },
    {
      "group": "CAT — IEB · Grade 12",
      "lessons": [
        {
          "value": "Recommending Systems for Real Scenarios",
          "label": "Recommending Systems for Real Scenarios",
          "ref": "cc:12:cat-ieb/recommending-systems-for-real-scenarios"
        },
        {
          "value": "Performance, Troubleshooting and the Task Manager",
          "label": "Performance, Troubleshooting and the Task Manager",
          "ref": "cc:12:cat-ieb/performance-troubleshooting-and-the-task-manager"
        },
        {
          "value": "File Mastery and Choosing the Right Application",
          "label": "File Mastery and Choosing the Right Application",
          "ref": "cc:12:cat-ieb/file-mastery-and-choosing-the-right-application"
        },
        {
          "value": "Getting Connected and Buying Decisions",
          "label": "Getting Connected and Buying Decisions",
          "ref": "cc:12:cat-ieb/getting-connected-and-buying-decisions"
        },
        {
          "value": "Cloud Computing and the Internet of Things",
          "label": "Cloud Computing and the Internet of Things",
          "ref": "cc:12:cat-ieb/cloud-computing-and-the-internet-of-things"
        },
        {
          "value": "Security, Privacy and the Deep Web",
          "label": "Security, Privacy and the Deep Web",
          "ref": "cc:12:cat-ieb/security-privacy-and-the-deep-web"
        },
        {
          "value": "Databases, Reports and the PAT",
          "label": "Databases, Reports and the PAT",
          "ref": "cc:12:cat-ieb/databases-reports-and-the-pat"
        },
        {
          "value": "Society, Social Media and Emerging Tech",
          "label": "Society, Social Media and Emerging Tech",
          "ref": "cc:12:cat-ieb/society-social-media-and-emerging-tech"
        },
        {
          "value": "Ethics, Law and the Information Age",
          "label": "Ethics, Law and the Information Age",
          "ref": "cc:12:cat-ieb/ethics-law-and-the-information-age"
        },
        {
          "value": "Staying Safe Online",
          "label": "Staying Safe Online",
          "ref": "cc:12:cat-ieb/staying-safe-online"
        }
      ]
    },
    {
      "group": "IT — CAPS · Grade 10",
      "lessons": [
        {
          "value": "What Is Information Technology?",
          "label": "What Is Information Technology?",
          "ref": "cc:10:it-caps/what-is-information-technology"
        },
        {
          "value": "Bits, Bytes and Number Systems",
          "label": "Bits, Bytes and Number Systems",
          "ref": "cc:10:it-caps/bits-bytes-and-number-systems"
        },
        {
          "value": "File Management and Data Storage",
          "label": "File Management and Data Storage",
          "ref": "cc:10:it-caps/file-management-and-data-storage"
        },
        {
          "value": "Licensing, Piracy and the Digital Divide",
          "label": "Licensing, Piracy and the Digital Divide",
          "ref": "cc:10:it-caps/licensing-piracy-and-the-digital-divide"
        },
        {
          "value": "What Is an Algorithm?",
          "label": "What Is an Algorithm?",
          "ref": "cc:10:it-caps/what-is-an-algorithm"
        },
        {
          "value": "Variables, Data Types and Operators",
          "label": "Variables, Data Types and Operators",
          "ref": "cc:10:it-caps/variables-data-types-and-operators"
        },
        {
          "value": "Conditionals, Loops and Events",
          "label": "Conditionals, Loops and Events",
          "ref": "cc:10:it-caps/conditionals-loops-and-events"
        },
        {
          "value": "Hardware In Depth and Computer Management",
          "label": "Hardware In Depth and Computer Management",
          "ref": "cc:10:it-caps/hardware-in-depth-and-computer-management"
        },
        {
          "value": "Software Engineering Principles — Solving Real Problems",
          "label": "Software Engineering Principles — Solving Real Problems",
          "ref": "cc:10:it-caps/software-engineering-principles-solving-real-problems"
        },
        {
          "value": "Networks and Electronic Communication",
          "label": "Networks and Electronic Communication",
          "ref": "cc:10:it-caps/networks-and-electronic-communication"
        },
        {
          "value": "The Web, Search, and Evaluating Sources",
          "label": "The Web, Search, and Evaluating Sources",
          "ref": "cc:10:it-caps/the-web-search-and-evaluating-sources"
        },
        {
          "value": "Introduction to HTML",
          "label": "Introduction to HTML",
          "ref": "cc:10:it-caps/introduction-to-html"
        }
      ]
    },
    {
      "group": "IT — CAPS · Grade 11",
      "lessons": [
        {
          "value": "Inside the Motherboard",
          "label": "Inside the Motherboard",
          "ref": "cc:11:it-caps/inside-the-motherboard"
        },
        {
          "value": "Operating Systems and Virtualisation",
          "label": "Operating Systems and Virtualisation",
          "ref": "cc:11:it-caps/operating-systems-and-virtualisation"
        },
        {
          "value": "Computer Management and Security Threats",
          "label": "Computer Management and Security Threats",
          "ref": "cc:11:it-caps/computer-management-and-security-threats"
        },
        {
          "value": "Networks, Topology and Innovation",
          "label": "Networks, Topology and Innovation",
          "ref": "cc:11:it-caps/networks-topology-and-innovation"
        },
        {
          "value": "Mobile, Wireless and Secure Communication",
          "label": "Mobile, Wireless and Secure Communication",
          "ref": "cc:11:it-caps/mobile-wireless-and-secure-communication"
        },
        {
          "value": "Introduction to OOP and GUI Programming",
          "label": "Introduction to OOP and GUI Programming",
          "ref": "cc:11:it-caps/introduction-to-oop-and-gui-programming"
        },
        {
          "value": "Variables, Decisions and Debugging",
          "label": "Variables, Decisions and Debugging",
          "ref": "cc:11:it-caps/variables-decisions-and-debugging"
        },
        {
          "value": "Software Engineering and Problem-Solving Tools",
          "label": "Software Engineering and Problem-Solving Tools",
          "ref": "cc:11:it-caps/software-engineering-and-problem-solving-tools"
        },
        {
          "value": "Arrays, Loops and File Handling",
          "label": "Arrays, Loops and File Handling",
          "ref": "cc:11:it-caps/arrays-loops-and-file-handling"
        },
        {
          "value": "Databases — From Concepts to Programming",
          "label": "Databases — From Concepts to Programming",
          "ref": "cc:11:it-caps/databases-from-concepts-to-programming"
        },
        {
          "value": "Relational Database Design",
          "label": "Relational Database Design",
          "ref": "cc:11:it-caps/relational-database-design"
        },
        {
          "value": "The Web, Careers and Ethics",
          "label": "The Web, Careers and Ethics",
          "ref": "cc:11:it-caps/the-web-careers-and-ethics"
        }
      ]
    },
    {
      "group": "IT — CAPS · Grade 12",
      "lessons": [
        {
          "value": "Relational Database Design",
          "label": "Relational Database Design",
          "ref": "cc:12:it-caps/relational-database-design-g12"
        },
        {
          "value": "Managing and Protecting Data",
          "label": "Managing and Protecting Data",
          "ref": "cc:12:it-caps/managing-and-protecting-data"
        },
        {
          "value": "Big Data, Data Mining and the Semantic Web",
          "label": "Big Data, Data Mining and the Semantic Web",
          "ref": "cc:12:it-caps/big-data-data-mining-and-the-semantic-web"
        },
        {
          "value": "Mobile Technology and Performance",
          "label": "Mobile Technology and Performance",
          "ref": "cc:12:it-caps/mobile-technology-and-performance"
        },
        {
          "value": "Cloud Computing and Virtualisation",
          "label": "Cloud Computing and Virtualisation",
          "ref": "cc:12:it-caps/cloud-computing-and-virtualisation"
        },
        {
          "value": "Setting Up a Network and Staying Secure",
          "label": "Setting Up a Network and Staying Secure",
          "ref": "cc:12:it-caps/setting-up-a-network-and-staying-secure"
        },
        {
          "value": "OOP — Classes, Objects and Method Types",
          "label": "OOP — Classes, Objects and Method Types",
          "ref": "cc:12:it-caps/oop-classes-objects-and-method-types"
        },
        {
          "value": "Programming with Relational Databases",
          "label": "Programming with Relational Databases",
          "ref": "cc:12:it-caps/programming-with-relational-databases"
        },
        {
          "value": "Software Engineering Methodologies",
          "label": "Software Engineering Methodologies",
          "ref": "cc:12:it-caps/software-engineering-methodologies"
        },
        {
          "value": "2D Arrays and Advanced SQL",
          "label": "2D Arrays and Advanced SQL",
          "ref": "cc:12:it-caps/2d-arrays-and-advanced-sql"
        },
        {
          "value": "Cybercriminals and Cybercrime",
          "label": "Cybercriminals and Cybercrime",
          "ref": "cc:12:it-caps/cybercriminals-and-cybercrime"
        },
        {
          "value": "How the Web Actually Works",
          "label": "How the Web Actually Works",
          "ref": "cc:12:it-caps/how-the-web-actually-works"
        }
      ]
    },
    {
      "group": "IT — IEB · Grade 10",
      "lessons": [
        {
          "value": "Hardware, Software and Computer Types",
          "label": "Hardware, Software and Computer Types",
          "ref": "cc:10:it-ieb/hardware-software-and-computer-types"
        },
        {
          "value": "Inside the System Unit",
          "label": "Inside the System Unit",
          "ref": "cc:10:it-ieb/inside-the-system-unit"
        },
        {
          "value": "Operating Systems and System Software",
          "label": "Operating Systems and System Software",
          "ref": "cc:10:it-ieb/operating-systems-and-system-software"
        },
        {
          "value": "Managing and Securing Your Computer",
          "label": "Managing and Securing Your Computer",
          "ref": "cc:10:it-ieb/managing-and-securing-your-computer"
        },
        {
          "value": "Networking Fundamentals",
          "label": "Networking Fundamentals",
          "ref": "cc:10:it-ieb/networking-fundamentals"
        },
        {
          "value": "Getting Online and Communicating Responsibly",
          "label": "Getting Online and Communicating Responsibly",
          "ref": "cc:10:it-ieb/getting-online-and-communicating-responsibly"
        },
        {
          "value": "Website Design and Effective Searching",
          "label": "Website Design and Effective Searching",
          "ref": "cc:10:it-ieb/website-design-and-effective-searching"
        },
        {
          "value": "Using Computers Responsibly",
          "label": "Using Computers Responsibly",
          "ref": "cc:10:it-ieb/using-computers-responsibly"
        },
        {
          "value": "Computational Thinking",
          "label": "Computational Thinking",
          "ref": "cc:10:it-ieb/computational-thinking"
        },
        {
          "value": "Data Types, Operators and Boolean Logic",
          "label": "Data Types, Operators and Boolean Logic",
          "ref": "cc:10:it-ieb/data-types-operators-and-boolean-logic"
        },
        {
          "value": "Methods, Objects and Passing Data",
          "label": "Methods, Objects and Passing Data",
          "ref": "cc:10:it-ieb/methods-objects-and-passing-data"
        },
        {
          "value": "Selection and Looping Algorithms",
          "label": "Selection and Looping Algorithms",
          "ref": "cc:10:it-ieb/selection-and-looping-algorithms"
        },
        {
          "value": "Introduction to Databases and SQL",
          "label": "Introduction to Databases and SQL",
          "ref": "cc:10:it-ieb/introduction-to-databases-and-sql"
        },
        {
          "value": "User Interface Design and Testing",
          "label": "User Interface Design and Testing",
          "ref": "cc:10:it-ieb/user-interface-design-and-testing"
        }
      ]
    },
    {
      "group": "IT — IEB · Grade 11",
      "lessons": [
        {
          "value": "CPU Design and the Machine Cycle",
          "label": "CPU Design and the Machine Cycle",
          "ref": "cc:11:it-ieb/cpu-design-and-the-machine-cycle"
        },
        {
          "value": "Storage Compared and Programming Tools",
          "label": "Storage Compared and Programming Tools",
          "ref": "cc:11:it-ieb/storage-compared-and-programming-tools"
        },
        {
          "value": "LAN and WAN Configuration",
          "label": "LAN and WAN Configuration",
          "ref": "cc:11:it-ieb/lan-and-wan-configuration"
        },
        {
          "value": "Multimedia and the Evolving Web",
          "label": "Multimedia and the Evolving Web",
          "ref": "cc:11:it-ieb/multimedia-and-the-evolving-web"
        },
        {
          "value": "Search, Errors and Data Validation",
          "label": "Search, Errors and Data Validation",
          "ref": "cc:11:it-ieb/search-errors-and-data-validation"
        },
        {
          "value": "Threats to Data Integrity and Security",
          "label": "Threats to Data Integrity and Security",
          "ref": "cc:11:it-ieb/threats-to-data-integrity-and-security"
        },
        {
          "value": "Cybercrime and the Changing Workplace",
          "label": "Cybercrime and the Changing Workplace",
          "ref": "cc:11:it-ieb/cybercrime-and-the-changing-workplace"
        },
        {
          "value": "Computational Thinking with Objects",
          "label": "Computational Thinking with Objects",
          "ref": "cc:11:it-ieb/computational-thinking-with-objects"
        },
        {
          "value": "Representing Data and Data Structures",
          "label": "Representing Data and Data Structures",
          "ref": "cc:11:it-ieb/representing-data-and-data-structures"
        },
        {
          "value": "Boolean Logic and Designing Classes",
          "label": "Boolean Logic and Designing Classes",
          "ref": "cc:11:it-ieb/boolean-logic-and-designing-classes"
        },
        {
          "value": "Passing Data, Persistence and Algorithms",
          "label": "Passing Data, Persistence and Algorithms",
          "ref": "cc:11:it-ieb/passing-data-persistence-and-algorithms"
        },
        {
          "value": "Databases, SQL and Software Quality",
          "label": "Databases, SQL and Software Quality",
          "ref": "cc:11:it-ieb/databases-sql-and-software-quality"
        }
      ]
    },
    {
      "group": "IT — IEB · Grade 12",
      "lessons": [
        {
          "value": "Making Informed Hardware Decisions",
          "label": "Making Informed Hardware Decisions",
          "ref": "cc:12:it-ieb/making-informed-hardware-decisions"
        },
        {
          "value": "Distributed Processing and Cloud Extension",
          "label": "Distributed Processing and Cloud Extension",
          "ref": "cc:12:it-ieb/distributed-processing-and-cloud-extension"
        },
        {
          "value": "The Deep Web and Anonymous Browsing",
          "label": "The Deep Web and Anonymous Browsing",
          "ref": "cc:12:it-ieb/the-deep-web-and-anonymous-browsing"
        },
        {
          "value": "Cloud Services, Security and Digital Currency",
          "label": "Cloud Services, Security and Digital Currency",
          "ref": "cc:12:it-ieb/cloud-services-security-and-digital-currency"
        },
        {
          "value": "Identifying and Solving Security Risks",
          "label": "Identifying and Solving Security Risks",
          "ref": "cc:12:it-ieb/identifying-and-solving-security-risks"
        },
        {
          "value": "Global Challenges and Green Computing",
          "label": "Global Challenges and Green Computing",
          "ref": "cc:12:it-ieb/global-challenges-and-green-computing"
        },
        {
          "value": "Law, Privacy and Digital Responsibility",
          "label": "Law, Privacy and Digital Responsibility",
          "ref": "cc:12:it-ieb/law-privacy-and-digital-responsibility"
        },
        {
          "value": "Complex Problem Solving with Inheritance",
          "label": "Complex Problem Solving with Inheritance",
          "ref": "cc:12:it-ieb/complex-problem-solving-with-inheritance"
        },
        {
          "value": "Advanced Data Structures and Inheritance",
          "label": "Advanced Data Structures and Inheritance",
          "ref": "cc:12:it-ieb/advanced-data-structures-and-inheritance"
        },
        {
          "value": "Persistence with JSON, and Array Algorithms",
          "label": "Persistence with JSON, and Array Algorithms",
          "ref": "cc:12:it-ieb/persistence-with-json-and-array-algorithms"
        },
        {
          "value": "Data Strategy — Warehousing, Mining and NoSQL",
          "label": "Data Strategy — Warehousing, Mining and NoSQL",
          "ref": "cc:12:it-ieb/data-strategy-warehousing-mining-and-nosql"
        },
        {
          "value": "Designing and Querying Multi-Table Databases",
          "label": "Designing and Querying Multi-Table Databases",
          "ref": "cc:12:it-ieb/designing-and-querying-multi-table-databases"
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
      "group": "Grade 8 — Ch 1 — Whole Numbers, Ratios, Rates & Finance",
      "lessons": [
        {
          "value": "The four operations",
          "label": "The four operations",
          "ref": "mm:8:101"
        },
        {
          "value": "Properties of whole numbers",
          "label": "Properties of whole numbers",
          "ref": "mm:8:102"
        },
        {
          "value": "Calculation techniques",
          "label": "Calculation techniques",
          "ref": "mm:8:103"
        },
        {
          "value": "Simplifying calculations",
          "label": "Simplifying calculations",
          "ref": "mm:8:104"
        },
        {
          "value": "Factors and multiples",
          "label": "Factors and multiples",
          "ref": "mm:8:105"
        },
        {
          "value": "Ratios",
          "label": "Ratios",
          "ref": "mm:8:106"
        },
        {
          "value": "Rates",
          "label": "Rates",
          "ref": "mm:8:107"
        },
        {
          "value": "Financial contexts",
          "label": "Financial contexts",
          "ref": "mm:8:108"
        },
        {
          "value": "Exam focus",
          "label": "Exam focus",
          "ref": "mm:8:109"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 2 — Integers",
      "lessons": [
        {
          "value": "Counting in integers",
          "label": "Counting in integers",
          "ref": "mm:8:201"
        },
        {
          "value": "Ordering integers",
          "label": "Ordering integers",
          "ref": "mm:8:202"
        },
        {
          "value": "Addition of integers",
          "label": "Addition of integers",
          "ref": "mm:8:203"
        },
        {
          "value": "Subtraction of integers",
          "label": "Subtraction of integers",
          "ref": "mm:8:204"
        },
        {
          "value": "Multiplication of integers",
          "label": "Multiplication of integers",
          "ref": "mm:8:205"
        },
        {
          "value": "Division of integers",
          "label": "Division of integers",
          "ref": "mm:8:206"
        },
        {
          "value": "Commutative, associative & distributive",
          "label": "Commutative, associative & distributive",
          "ref": "mm:8:207"
        },
        {
          "value": "Squares, cubes & roots",
          "label": "Squares, cubes & roots",
          "ref": "mm:8:208"
        },
        {
          "value": "Mixed operations with integers",
          "label": "Mixed operations with integers",
          "ref": "mm:8:209"
        },
        {
          "value": "Ch 2 Exam focus",
          "label": "Ch 2 Exam focus",
          "ref": "mm:8:210"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 3 — Exponents",
      "lessons": [
        {
          "value": "Exponential form",
          "label": "Exponential form",
          "ref": "mm:8:301"
        },
        {
          "value": "Laws of exponents",
          "label": "Laws of exponents",
          "ref": "mm:8:302"
        },
        {
          "value": "Mixed operations — exponents",
          "label": "Mixed operations — exponents",
          "ref": "mm:8:303"
        },
        {
          "value": "Scientific notation",
          "label": "Scientific notation",
          "ref": "mm:8:304"
        },
        {
          "value": "Ch 3 Exam focus",
          "label": "Ch 3 Exam focus",
          "ref": "mm:8:305"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 4 — Numeric and Geometric Patterns",
      "lessons": [
        {
          "value": "Numeric number patterns",
          "label": "Numeric number patterns",
          "ref": "mm:8:401"
        },
        {
          "value": "Geometric number patterns",
          "label": "Geometric number patterns",
          "ref": "mm:8:402"
        },
        {
          "value": "Visual geometric patterns",
          "label": "Visual geometric patterns",
          "ref": "mm:8:403"
        },
        {
          "value": "Ch 4 Exam focus",
          "label": "Ch 4 Exam focus",
          "ref": "mm:8:404"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 5 — Functions and Relationships",
      "lessons": [
        {
          "value": "Input, output & flow diagrams",
          "label": "Input, output & flow diagrams",
          "ref": "mm:8:501"
        },
        {
          "value": "Tables of values",
          "label": "Tables of values",
          "ref": "mm:8:502"
        },
        {
          "value": "Word & symbolic formulae",
          "label": "Word & symbolic formulae",
          "ref": "mm:8:503"
        },
        {
          "value": "Equivalent forms",
          "label": "Equivalent forms",
          "ref": "mm:8:504"
        },
        {
          "value": "Ch 5 Exam focus",
          "label": "Ch 5 Exam focus",
          "ref": "mm:8:505"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 6 — Algebraic Expressions",
      "lessons": [
        {
          "value": "Algebraic language & terms",
          "label": "Algebraic language & terms",
          "ref": "mm:8:601"
        },
        {
          "value": "Like and unlike terms",
          "label": "Like and unlike terms",
          "ref": "mm:8:602"
        },
        {
          "value": "Adding & subtracting expressions",
          "label": "Adding & subtracting expressions",
          "ref": "mm:8:603"
        },
        {
          "value": "Multiplying expressions",
          "label": "Multiplying expressions",
          "ref": "mm:8:604"
        },
        {
          "value": "Dividing expressions",
          "label": "Dividing expressions",
          "ref": "mm:8:605"
        },
        {
          "value": "Substitution",
          "label": "Substitution",
          "ref": "mm:8:606"
        },
        {
          "value": "Ch 6 Exam focus",
          "label": "Ch 6 Exam focus",
          "ref": "mm:8:607"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 7 — Algebraic Equations",
      "lessons": [
        {
          "value": "What is an equation?",
          "label": "What is an equation?",
          "ref": "mm:8:701"
        },
        {
          "value": "Solving by inspection",
          "label": "Solving by inspection",
          "ref": "mm:8:702"
        },
        {
          "value": "Solving using inverses",
          "label": "Solving using inverses",
          "ref": "mm:8:703"
        },
        {
          "value": "Variables on both sides",
          "label": "Variables on both sides",
          "ref": "mm:8:704"
        },
        {
          "value": "Word problems",
          "label": "Word problems",
          "ref": "mm:8:705"
        },
        {
          "value": "Ch 7 Exam focus",
          "label": "Ch 7 Exam focus",
          "ref": "mm:8:706"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 8 — Constructions",
      "lessons": [
        {
          "value": "Notation and terminology",
          "label": "Notation and terminology",
          "ref": "mm:8:801"
        },
        {
          "value": "Perpendicular lines",
          "label": "Perpendicular lines",
          "ref": "mm:8:802"
        },
        {
          "value": "Constructing angles",
          "label": "Constructing angles",
          "ref": "mm:8:803"
        },
        {
          "value": "Constructing triangles",
          "label": "Constructing triangles",
          "ref": "mm:8:804"
        },
        {
          "value": "Constructing quadrilaterals",
          "label": "Constructing quadrilaterals",
          "ref": "mm:8:805"
        },
        {
          "value": "Ch 8 Exam focus",
          "label": "Ch 8 Exam focus",
          "ref": "mm:8:806"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 9 — Geometry of Straight Lines",
      "lessons": [
        {
          "value": "Lines and angles",
          "label": "Lines and angles",
          "ref": "mm:8:901"
        },
        {
          "value": "Angle relationships",
          "label": "Angle relationships",
          "ref": "mm:8:902"
        },
        {
          "value": "Parallel lines and angles",
          "label": "Parallel lines and angles",
          "ref": "mm:8:903"
        },
        {
          "value": "Ch 9 Exam focus",
          "label": "Ch 9 Exam focus",
          "ref": "mm:8:904"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 10 — Geometry of 2D Shapes",
      "lessons": [
        {
          "value": "Geometry of triangles",
          "label": "Geometry of triangles",
          "ref": "mm:8:1001"
        },
        {
          "value": "Geometry of quadrilaterals",
          "label": "Geometry of quadrilaterals",
          "ref": "mm:8:1002"
        },
        {
          "value": "Triangles and quadrilaterals",
          "label": "Triangles and quadrilaterals",
          "ref": "mm:8:1003"
        },
        {
          "value": "Congruent shapes",
          "label": "Congruent shapes",
          "ref": "mm:8:1004"
        },
        {
          "value": "Similar shapes",
          "label": "Similar shapes",
          "ref": "mm:8:1005"
        },
        {
          "value": "Ch 10 Exam focus",
          "label": "Ch 10 Exam focus",
          "ref": "mm:8:1006"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 11 — Common Fractions",
      "lessons": [
        {
          "value": "Revision of fractions",
          "label": "Revision of fractions",
          "ref": "mm:8:1101"
        },
        {
          "value": "Adding and subtracting fractions",
          "label": "Adding and subtracting fractions",
          "ref": "mm:8:1102"
        },
        {
          "value": "Multiplying fractions",
          "label": "Multiplying fractions",
          "ref": "mm:8:1103"
        },
        {
          "value": "Dividing fractions",
          "label": "Dividing fractions",
          "ref": "mm:8:1104"
        },
        {
          "value": "Squares, cubes, roots",
          "label": "Squares, cubes, roots",
          "ref": "mm:8:1105"
        },
        {
          "value": "Mixed calculations",
          "label": "Mixed calculations",
          "ref": "mm:8:1106"
        },
        {
          "value": "Numbers as fractions",
          "label": "Numbers as fractions",
          "ref": "mm:8:1107"
        },
        {
          "value": "Fractions and percentages",
          "label": "Fractions and percentages",
          "ref": "mm:8:1108"
        },
        {
          "value": "Percentage increase and decrease",
          "label": "Percentage increase and decrease",
          "ref": "mm:8:1109"
        },
        {
          "value": "Ch 11 Exam focus",
          "label": "Ch 11 Exam focus",
          "ref": "mm:8:1110"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 12 — Decimal Fractions",
      "lessons": [
        {
          "value": "The decimal system",
          "label": "The decimal system",
          "ref": "mm:8:1201"
        },
        {
          "value": "Adding and subtracting decimals",
          "label": "Adding and subtracting decimals",
          "ref": "mm:8:1202"
        },
        {
          "value": "Multiplying and dividing decimals",
          "label": "Multiplying and dividing decimals",
          "ref": "mm:8:1203"
        },
        {
          "value": "Squares, cubes and roots of decimals",
          "label": "Squares, cubes and roots of decimals",
          "ref": "mm:8:1204"
        },
        {
          "value": "Rounding and estimating",
          "label": "Rounding and estimating",
          "ref": "mm:8:1205"
        },
        {
          "value": "Ch 12 Exam focus",
          "label": "Ch 12 Exam focus",
          "ref": "mm:8:1206"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 13 — Theorem of Pythagoras",
      "lessons": [
        {
          "value": "Pythagoras in right-angled triangles",
          "label": "Pythagoras in right-angled triangles",
          "ref": "mm:8:1301"
        },
        {
          "value": "Sides and angles not right-angled",
          "label": "Sides and angles not right-angled",
          "ref": "mm:8:1302"
        },
        {
          "value": "Applications of Pythagoras",
          "label": "Applications of Pythagoras",
          "ref": "mm:8:1303"
        },
        {
          "value": "Ch 13 Exam focus",
          "label": "Ch 13 Exam focus",
          "ref": "mm:8:1304"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 14 — Area and Perimeter",
      "lessons": [
        {
          "value": "Perimeter of 2D shapes",
          "label": "Perimeter of 2D shapes",
          "ref": "mm:8:1401"
        },
        {
          "value": "Areas of 2D shapes",
          "label": "Areas of 2D shapes",
          "ref": "mm:8:1402"
        },
        {
          "value": "Equations using formulae",
          "label": "Equations using formulae",
          "ref": "mm:8:1403"
        },
        {
          "value": "SI unit conversions",
          "label": "SI unit conversions",
          "ref": "mm:8:1404"
        },
        {
          "value": "Ch 14 Exam focus",
          "label": "Ch 14 Exam focus",
          "ref": "mm:8:1405"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 15 — Surface Area and Volume",
      "lessons": [
        {
          "value": "Surface area of cubes and prisms",
          "label": "Surface area of cubes and prisms",
          "ref": "mm:8:1501"
        },
        {
          "value": "Surface area of triangular prisms",
          "label": "Surface area of triangular prisms",
          "ref": "mm:8:1502"
        },
        {
          "value": "Volume of cubes and prisms",
          "label": "Volume of cubes and prisms",
          "ref": "mm:8:1503"
        },
        {
          "value": "Volume of triangular prisms",
          "label": "Volume of triangular prisms",
          "ref": "mm:8:1504"
        },
        {
          "value": "Effect of scale factors",
          "label": "Effect of scale factors",
          "ref": "mm:8:1505"
        },
        {
          "value": "Ch 15 Exam focus",
          "label": "Ch 15 Exam focus",
          "ref": "mm:8:1506"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 16 — Data Handling",
      "lessons": [
        {
          "value": "Collecting and organising data",
          "label": "Collecting and organising data",
          "ref": "mm:8:1601"
        },
        {
          "value": "Measures of central tendency",
          "label": "Measures of central tendency",
          "ref": "mm:8:1602"
        },
        {
          "value": "Representing data",
          "label": "Representing data",
          "ref": "mm:8:1603"
        },
        {
          "value": "Interpreting data",
          "label": "Interpreting data",
          "ref": "mm:8:1604"
        },
        {
          "value": "Ch 16 Exam focus",
          "label": "Ch 16 Exam focus",
          "ref": "mm:8:1605"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 17 — Probability",
      "lessons": [
        {
          "value": "Probability concepts",
          "label": "Probability concepts",
          "ref": "mm:8:1701"
        },
        {
          "value": "Listing outcomes",
          "label": "Listing outcomes",
          "ref": "mm:8:1702"
        },
        {
          "value": "Relative frequency",
          "label": "Relative frequency",
          "ref": "mm:8:1703"
        },
        {
          "value": "Tree diagrams",
          "label": "Tree diagrams",
          "ref": "mm:8:1704"
        },
        {
          "value": "Ch 17 Exam focus",
          "label": "Ch 17 Exam focus",
          "ref": "mm:8:1705"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 18 — Transformation Geometry",
      "lessons": [
        {
          "value": "Translations and reflections",
          "label": "Translations and reflections",
          "ref": "mm:8:1801"
        },
        {
          "value": "Rotations and enlargements",
          "label": "Rotations and enlargements",
          "ref": "mm:8:1802"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 19 — Geometry of 3D Shapes",
      "lessons": [
        {
          "value": "Classifying 3D objects",
          "label": "Classifying 3D objects",
          "ref": "mm:8:1901"
        },
        {
          "value": "Nets of prisms and pyramids",
          "label": "Nets of prisms and pyramids",
          "ref": "mm:8:1902"
        }
      ]
    },
    {
      "group": "Grade 8 — Ch 20 — Graphs",
      "lessons": [
        {
          "value": "Interpreting global graphs",
          "label": "Interpreting global graphs",
          "ref": "mm:8:2001"
        },
        {
          "value": "Drawing global graphs",
          "label": "Drawing global graphs",
          "ref": "mm:8:2002"
        },
        {
          "value": "Plotting points and drawing graphs",
          "label": "Plotting points and drawing graphs",
          "ref": "mm:8:2003"
        },
        {
          "value": "Ch 20 Exam focus",
          "label": "Ch 20 Exam focus",
          "ref": "mm:8:2004"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 1 — Number Systems, Ratios, Rates and Financial Maths",
      "lessons": [
        {
          "value": "Number systems",
          "label": "Number systems",
          "ref": "mm:9:0"
        },
        {
          "value": "Ratios and rates",
          "label": "Ratios and rates",
          "ref": "mm:9:1"
        },
        {
          "value": "Financial mathematics",
          "label": "Financial mathematics",
          "ref": "mm:9:2"
        },
        {
          "value": "Prime factors, HCF and LCM",
          "label": "Prime factors, HCF and LCM",
          "ref": "mm:9:101"
        },
        {
          "value": "Direct and indirect proportion",
          "label": "Direct and indirect proportion",
          "ref": "mm:9:102"
        },
        {
          "value": "Financial contexts",
          "label": "Financial contexts",
          "ref": "mm:9:103"
        },
        {
          "value": "Ch 1 Exam focus",
          "label": "Ch 1 Exam focus",
          "ref": "mm:9:104"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 2 — Integers",
      "lessons": [
        {
          "value": "Operations with integers",
          "label": "Operations with integers",
          "ref": "mm:9:3"
        },
        {
          "value": "Properties of integers",
          "label": "Properties of integers",
          "ref": "mm:9:4"
        },
        {
          "value": "Integers in context",
          "label": "Integers in context",
          "ref": "mm:9:201"
        },
        {
          "value": "Ch 2 Exam focus",
          "label": "Ch 2 Exam focus",
          "ref": "mm:9:202"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 3 — Common and Decimal Fractions",
      "lessons": [
        {
          "value": "Common fractions",
          "label": "Common fractions",
          "ref": "mm:9:5"
        },
        {
          "value": "Decimal fractions",
          "label": "Decimal fractions",
          "ref": "mm:9:6"
        },
        {
          "value": "Squares, cubes and roots of fractions",
          "label": "Squares, cubes and roots of fractions",
          "ref": "mm:9:301"
        },
        {
          "value": "Percentages",
          "label": "Percentages",
          "ref": "mm:9:302"
        },
        {
          "value": "Ch 3 Exam focus",
          "label": "Ch 3 Exam focus",
          "ref": "mm:9:303"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 4 — Exponents",
      "lessons": [
        {
          "value": "Laws of exponents",
          "label": "Laws of exponents",
          "ref": "mm:9:7"
        },
        {
          "value": "Scientific notation",
          "label": "Scientific notation",
          "ref": "mm:9:8"
        },
        {
          "value": "Simplifying with several laws",
          "label": "Simplifying with several laws",
          "ref": "mm:9:401"
        },
        {
          "value": "Problems with scientific notation",
          "label": "Problems with scientific notation",
          "ref": "mm:9:402"
        },
        {
          "value": "Ch 4 Exam focus",
          "label": "Ch 4 Exam focus",
          "ref": "mm:9:403"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 5 — Numeric and Geometric Patterns",
      "lessons": [
        {
          "value": "Numeric patterns",
          "label": "Numeric patterns",
          "ref": "mm:9:9"
        },
        {
          "value": "Geometric patterns",
          "label": "Geometric patterns",
          "ref": "mm:9:501"
        },
        {
          "value": "Patterns from pictures",
          "label": "Patterns from pictures",
          "ref": "mm:9:502"
        },
        {
          "value": "Ch 5 Exam focus",
          "label": "Ch 5 Exam focus",
          "ref": "mm:9:503"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 6 — Functions and Relationships",
      "lessons": [
        {
          "value": "Functions and mappings",
          "label": "Functions and mappings",
          "ref": "mm:9:11"
        },
        {
          "value": "Linear and non-linear functions",
          "label": "Linear and non-linear functions",
          "ref": "mm:9:12"
        },
        {
          "value": "One relationship, four descriptions",
          "label": "One relationship, four descriptions",
          "ref": "mm:9:601"
        },
        {
          "value": "Ch 6 Exam focus",
          "label": "Ch 6 Exam focus",
          "ref": "mm:9:602"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 7 — Algebraic Expressions",
      "lessons": [
        {
          "value": "Expanding and simplifying",
          "label": "Expanding and simplifying",
          "ref": "mm:9:13"
        },
        {
          "value": "Algebraic language",
          "label": "Algebraic language",
          "ref": "mm:9:701"
        },
        {
          "value": "Dividing, substituting and roots of terms",
          "label": "Dividing, substituting and roots of terms",
          "ref": "mm:9:702"
        },
        {
          "value": "Ch 7 Exam focus",
          "label": "Ch 7 Exam focus",
          "ref": "mm:9:703"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 8 — Factorisation",
      "lessons": [
        {
          "value": "Common factors and grouping",
          "label": "Common factors and grouping",
          "ref": "mm:9:15"
        },
        {
          "value": "Difference of squares and trinomials",
          "label": "Difference of squares and trinomials",
          "ref": "mm:9:16"
        },
        {
          "value": "Trinomials with a common factor",
          "label": "Trinomials with a common factor",
          "ref": "mm:9:801"
        },
        {
          "value": "Simplifying algebraic fractions",
          "label": "Simplifying algebraic fractions",
          "ref": "mm:9:802"
        },
        {
          "value": "Ch 8 Exam focus",
          "label": "Ch 8 Exam focus",
          "ref": "mm:9:803"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 9 — Algebraic Equations",
      "lessons": [
        {
          "value": "Linear equations",
          "label": "Linear equations",
          "ref": "mm:9:17"
        },
        {
          "value": "Quadratic equations",
          "label": "Quadratic equations",
          "ref": "mm:9:18"
        },
        {
          "value": "Equations with brackets and fractions",
          "label": "Equations with brackets and fractions",
          "ref": "mm:9:901"
        },
        {
          "value": "Word problems",
          "label": "Word problems",
          "ref": "mm:9:902"
        },
        {
          "value": "Ch 9 Exam focus",
          "label": "Ch 9 Exam focus",
          "ref": "mm:9:903"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 10 — Geometric Constructions",
      "lessons": [
        {
          "value": "Bisectors and perpendiculars",
          "label": "Bisectors and perpendiculars",
          "ref": "mm:9:19"
        },
        {
          "value": "Constructing special angles",
          "label": "Constructing special angles",
          "ref": "mm:9:1001"
        },
        {
          "value": "Constructing triangles",
          "label": "Constructing triangles",
          "ref": "mm:9:1002"
        },
        {
          "value": "Quadrilaterals and their diagonals",
          "label": "Quadrilaterals and their diagonals",
          "ref": "mm:9:1003"
        },
        {
          "value": "Ch 10 Exam focus",
          "label": "Ch 10 Exam focus",
          "ref": "mm:9:1004"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 11 — Geometry of 2D Shapes",
      "lessons": [
        {
          "value": "Triangles and quadrilaterals",
          "label": "Triangles and quadrilaterals",
          "ref": "mm:9:21"
        },
        {
          "value": "Similar and congruent shapes",
          "label": "Similar and congruent shapes",
          "ref": "mm:9:22"
        },
        {
          "value": "Angles of polygons",
          "label": "Angles of polygons",
          "ref": "mm:9:1101"
        },
        {
          "value": "Exterior angles of triangles",
          "label": "Exterior angles of triangles",
          "ref": "mm:9:1102"
        },
        {
          "value": "Problems with similar triangles",
          "label": "Problems with similar triangles",
          "ref": "mm:9:1103"
        },
        {
          "value": "Ch 11 Exam focus",
          "label": "Ch 11 Exam focus",
          "ref": "mm:9:1104"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 12 — Geometry of Straight Lines",
      "lessons": [
        {
          "value": "Angle relationships",
          "label": "Angle relationships",
          "ref": "mm:9:23"
        },
        {
          "value": "Proving parallel lines",
          "label": "Proving parallel lines",
          "ref": "mm:9:24"
        },
        {
          "value": "Solving angle problems with reasons",
          "label": "Solving angle problems with reasons",
          "ref": "mm:9:1201"
        },
        {
          "value": "Ch 12 Exam focus",
          "label": "Ch 12 Exam focus",
          "ref": "mm:9:1202"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 13 — Pythagoras' Theorem",
      "lessons": [
        {
          "value": "Pythagoras' theorem",
          "label": "Pythagoras' theorem",
          "ref": "mm:9:25"
        },
        {
          "value": "Applications of Pythagoras",
          "label": "Applications of Pythagoras",
          "ref": "mm:9:26"
        },
        {
          "value": "Pythagoras in shapes",
          "label": "Pythagoras in shapes",
          "ref": "mm:9:1301"
        },
        {
          "value": "Ch 13 Exam focus",
          "label": "Ch 13 Exam focus",
          "ref": "mm:9:1302"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 14 — Area and Perimeter",
      "lessons": [
        {
          "value": "Perimeter",
          "label": "Perimeter",
          "ref": "mm:9:27"
        },
        {
          "value": "Area",
          "label": "Area",
          "ref": "mm:9:28"
        },
        {
          "value": "Composite shapes",
          "label": "Composite shapes",
          "ref": "mm:9:1401"
        },
        {
          "value": "Changing dimensions and units",
          "label": "Changing dimensions and units",
          "ref": "mm:9:1402"
        },
        {
          "value": "Ch 14 Exam focus",
          "label": "Ch 14 Exam focus",
          "ref": "mm:9:1403"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 15 — Surface Area and Volume",
      "lessons": [
        {
          "value": "Surface area",
          "label": "Surface area",
          "ref": "mm:9:29"
        },
        {
          "value": "Volume",
          "label": "Volume",
          "ref": "mm:9:30"
        },
        {
          "value": "Capacity and units of volume",
          "label": "Capacity and units of volume",
          "ref": "mm:9:1501"
        },
        {
          "value": "Changing dimensions: volume and surface area",
          "label": "Changing dimensions: volume and surface area",
          "ref": "mm:9:1502"
        },
        {
          "value": "Ch 15 Exam focus",
          "label": "Ch 15 Exam focus",
          "ref": "mm:9:1503"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 16 — Transformation Geometry",
      "lessons": [
        {
          "value": "Translations and reflections",
          "label": "Translations and reflections",
          "ref": "mm:9:31"
        },
        {
          "value": "Rotations and enlargements",
          "label": "Rotations and enlargements",
          "ref": "mm:9:32"
        },
        {
          "value": "Describing transformations from coordinates",
          "label": "Describing transformations from coordinates",
          "ref": "mm:9:1601"
        },
        {
          "value": "Enlargements: perimeter and area",
          "label": "Enlargements: perimeter and area",
          "ref": "mm:9:1602"
        },
        {
          "value": "Ch 16 Exam focus",
          "label": "Ch 16 Exam focus",
          "ref": "mm:9:1603"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 17 — Geometry of 3D Shapes",
      "lessons": [
        {
          "value": "Polyhedra",
          "label": "Polyhedra",
          "ref": "mm:9:33"
        },
        {
          "value": "Nets and cross-sections",
          "label": "Nets and cross-sections",
          "ref": "mm:9:34"
        },
        {
          "value": "Platonic solids, spheres and cylinders",
          "label": "Platonic solids, spheres and cylinders",
          "ref": "mm:9:1701"
        },
        {
          "value": "Ch 17 Exam focus",
          "label": "Ch 17 Exam focus",
          "ref": "mm:9:1702"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 18 — Data Handling",
      "lessons": [
        {
          "value": "Collect, organise and summarise data",
          "label": "Collect, organise and summarise data",
          "ref": "mm:9:35"
        },
        {
          "value": "Represent data",
          "label": "Represent data",
          "ref": "mm:9:36"
        },
        {
          "value": "Interpret, analyse and report data",
          "label": "Interpret, analyse and report data",
          "ref": "mm:9:37"
        },
        {
          "value": "Choosing and drawing graphs",
          "label": "Choosing and drawing graphs",
          "ref": "mm:9:1801"
        },
        {
          "value": "Ch 18 Exam focus",
          "label": "Ch 18 Exam focus",
          "ref": "mm:9:1802"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 19 — Probability",
      "lessons": [
        {
          "value": "Probability of events, relative frequency",
          "label": "Probability of events, relative frequency",
          "ref": "mm:9:38"
        },
        {
          "value": "Probability models and two-way tables",
          "label": "Probability models and two-way tables",
          "ref": "mm:9:39"
        },
        {
          "value": "Tree diagrams",
          "label": "Tree diagrams",
          "ref": "mm:9:1901"
        },
        {
          "value": "Ch 19 Exam focus",
          "label": "Ch 19 Exam focus",
          "ref": "mm:9:1902"
        }
      ]
    },
    {
      "group": "Grade 9 — Ch 20 — Graphs",
      "lessons": [
        {
          "value": "Interpreting graphs",
          "label": "Interpreting graphs",
          "ref": "mm:9:2001"
        },
        {
          "value": "Drawing global graphs",
          "label": "Drawing global graphs",
          "ref": "mm:9:2002"
        },
        {
          "value": "Drawing straight-line graphs",
          "label": "Drawing straight-line graphs",
          "ref": "mm:9:2003"
        },
        {
          "value": "The equation of a straight line",
          "label": "The equation of a straight line",
          "ref": "mm:9:2004"
        },
        {
          "value": "Ch 20 Exam focus",
          "label": "Ch 20 Exam focus",
          "ref": "mm:9:2005"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 1 — Algebraic Expressions (Surds & Factorisation)",
      "lessons": [
        {
          "value": "Real numbers & surds",
          "label": "Real numbers & surds",
          "ref": "mm:10:100"
        },
        {
          "value": "Products & factorisation",
          "label": "Products & factorisation",
          "ref": "mm:10:101"
        },
        {
          "value": "Multiplying binomials by trinomials",
          "label": "Multiplying binomials by trinomials",
          "ref": "mm:10:102"
        },
        {
          "value": "Sum and difference of cubes",
          "label": "Sum and difference of cubes",
          "ref": "mm:10:103"
        },
        {
          "value": "Algebraic fractions with cube denominators",
          "label": "Algebraic fractions with cube denominators",
          "ref": "mm:10:104"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 2 — Exponents and Exponential Equations",
      "lessons": [
        {
          "value": "Exponent laws",
          "label": "Exponent laws",
          "ref": "mm:10:200"
        },
        {
          "value": "Exponential equations",
          "label": "Exponential equations",
          "ref": "mm:10:201"
        },
        {
          "value": "Simplifying complex exponential expressions",
          "label": "Simplifying complex exponential expressions",
          "ref": "mm:10:202"
        },
        {
          "value": "Advanced exponential equations",
          "label": "Advanced exponential equations",
          "ref": "mm:10:203"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 3 — Number Patterns (Linear Sequences)",
      "lessons": [
        {
          "value": "Linear sequences",
          "label": "Linear sequences",
          "ref": "mm:10:300"
        },
        {
          "value": "Patterns in context",
          "label": "Patterns in context",
          "ref": "mm:10:301"
        },
        {
          "value": "Non-obvious pattern problems",
          "label": "Non-obvious pattern problems",
          "ref": "mm:10:302"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 4 — Equations and Inequalities",
      "lessons": [
        {
          "value": "Linear & quadratic equations",
          "label": "Linear & quadratic equations",
          "ref": "mm:10:400"
        },
        {
          "value": "Word problems & inequalities",
          "label": "Word problems & inequalities",
          "ref": "mm:10:401"
        },
        {
          "value": "Simultaneous equations — deeper practice",
          "label": "Simultaneous equations — deeper practice",
          "ref": "mm:10:402"
        },
        {
          "value": "Word problems in context",
          "label": "Word problems in context",
          "ref": "mm:10:403"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 5 — Trigonometry Part 1",
      "lessons": [
        {
          "value": "Trig ratios & special angles",
          "label": "Trig ratios & special angles",
          "ref": "mm:10:500"
        },
        {
          "value": "Trig equations & Cartesian plane",
          "label": "Trig equations & Cartesian plane",
          "ref": "mm:10:501"
        },
        {
          "value": "Solving right-angled triangles",
          "label": "Solving right-angled triangles",
          "ref": "mm:10:502"
        },
        {
          "value": "Reciprocal ratios & trig identities",
          "label": "Reciprocal ratios & trig identities",
          "ref": "mm:10:503"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 6 — Functions",
      "lessons": [
        {
          "value": "Linear, quadratic & hyperbolic functions",
          "label": "Linear, quadratic & hyperbolic functions",
          "ref": "mm:10:600"
        },
        {
          "value": "Exponential & trig functions",
          "label": "Exponential & trig functions",
          "ref": "mm:10:601"
        },
        {
          "value": "The concept of a function",
          "label": "The concept of a function",
          "ref": "mm:10:602"
        },
        {
          "value": "Effect of parameters a and q",
          "label": "Effect of parameters a and q",
          "ref": "mm:10:603"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 7 — Euclidean Geometry Part 1",
      "lessons": [
        {
          "value": "Triangles",
          "label": "Triangles",
          "ref": "mm:10:700"
        },
        {
          "value": "Quadrilaterals & midpoint theorem",
          "label": "Quadrilaterals & midpoint theorem",
          "ref": "mm:10:701"
        },
        {
          "value": "Special quadrilaterals — kite & trapezium",
          "label": "Special quadrilaterals — kite & trapezium",
          "ref": "mm:10:702"
        },
        {
          "value": "Special quadrilaterals — parallelogram family",
          "label": "Special quadrilaterals — parallelogram family",
          "ref": "mm:10:703"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 8 — Analytical Geometry",
      "lessons": [
        {
          "value": "Distance & midpoint",
          "label": "Distance & midpoint",
          "ref": "mm:10:800"
        },
        {
          "value": "Gradient of a line",
          "label": "Gradient of a line",
          "ref": "mm:10:801"
        },
        {
          "value": "Equation of a line",
          "label": "Equation of a line",
          "ref": "mm:10:802"
        },
        {
          "value": "Analytical geometry of quadrilaterals",
          "label": "Analytical geometry of quadrilaterals",
          "ref": "mm:10:803"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 9 — Finance and Growth",
      "lessons": [
        {
          "value": "Simple & compound interest",
          "label": "Simple & compound interest",
          "ref": "mm:10:900"
        },
        {
          "value": "Exchange rates & hire purchase",
          "label": "Exchange rates & hire purchase",
          "ref": "mm:10:901"
        },
        {
          "value": "Inflation & population growth",
          "label": "Inflation & population growth",
          "ref": "mm:10:902"
        },
        {
          "value": "Solving for rate or time period",
          "label": "Solving for rate or time period",
          "ref": "mm:10:903"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 10 — Statistics",
      "lessons": [
        {
          "value": "Measures of central tendency",
          "label": "Measures of central tendency",
          "ref": "mm:10:1000"
        },
        {
          "value": "Dispersion & five-number summary",
          "label": "Dispersion & five-number summary",
          "ref": "mm:10:1001"
        },
        {
          "value": "Box-and-whisker diagrams",
          "label": "Box-and-whisker diagrams",
          "ref": "mm:10:1002"
        },
        {
          "value": "Interpreting statistics in context",
          "label": "Interpreting statistics in context",
          "ref": "mm:10:1003"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 11 — Trigonometry Part 2",
      "lessons": [
        {
          "value": "2D trig problems",
          "label": "2D trig problems",
          "ref": "mm:10:1100"
        },
        {
          "value": "Multi-triangle problems",
          "label": "Multi-triangle problems",
          "ref": "mm:10:1101"
        },
        {
          "value": "Bearings & navigation problems",
          "label": "Bearings & navigation problems",
          "ref": "mm:10:1102"
        },
        {
          "value": "Mixed 2D trigonometry applications",
          "label": "Mixed 2D trigonometry applications",
          "ref": "mm:10:1103"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 12 — Euclidean Geometry Part 2",
      "lessons": [
        {
          "value": "Proofs & conjectures",
          "label": "Proofs & conjectures",
          "ref": "mm:10:1200"
        },
        {
          "value": "Proving parallelogram properties",
          "label": "Proving parallelogram properties",
          "ref": "mm:10:1201"
        },
        {
          "value": "Congruency proofs",
          "label": "Congruency proofs",
          "ref": "mm:10:1202"
        },
        {
          "value": "Mixed riders with quadrilaterals",
          "label": "Mixed riders with quadrilaterals",
          "ref": "mm:10:1203"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 13 — Measurement",
      "lessons": [
        {
          "value": "Area & surface area",
          "label": "Area & surface area",
          "ref": "mm:10:1300"
        },
        {
          "value": "Volume & scale factor",
          "label": "Volume & scale factor",
          "ref": "mm:10:1301"
        },
        {
          "value": "Composite solids",
          "label": "Composite solids",
          "ref": "mm:10:1302"
        },
        {
          "value": "Pyramids and cones in depth",
          "label": "Pyramids and cones in depth",
          "ref": "mm:10:1303"
        }
      ]
    },
    {
      "group": "Grade 10 — Ch 14 — Probability",
      "lessons": [
        {
          "value": "Probability basics & Venn diagrams",
          "label": "Probability basics & Venn diagrams",
          "ref": "mm:10:1400"
        },
        {
          "value": "Mutually exclusive & complementary events",
          "label": "Mutually exclusive & complementary events",
          "ref": "mm:10:1401"
        },
        {
          "value": "Relative frequency vs theoretical probability",
          "label": "Relative frequency vs theoretical probability",
          "ref": "mm:10:1402"
        },
        {
          "value": "Two-way tables",
          "label": "Two-way tables",
          "ref": "mm:10:1403"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 1 — Exponents and Surds",
      "lessons": [
        {
          "value": "Rational exponents & surd operations",
          "label": "Rational exponents & surd operations",
          "ref": "mm:11:100"
        },
        {
          "value": "Surd equations & exponential applications",
          "label": "Surd equations & exponential applications",
          "ref": "mm:11:101"
        },
        {
          "value": "Laws of exponents & exponential equations",
          "label": "Laws of exponents & exponential equations",
          "ref": "mm:11:102"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 2 — Equations and Inequalities",
      "lessons": [
        {
          "value": "Completing the square, formula & nature of roots",
          "label": "Completing the square, formula & nature of roots",
          "ref": "mm:11:200"
        },
        {
          "value": "Quadratic inequalities & simultaneous equations",
          "label": "Quadratic inequalities & simultaneous equations",
          "ref": "mm:11:201"
        },
        {
          "value": "Quadratic formula & derivation",
          "label": "Quadratic formula & derivation",
          "ref": "mm:11:202"
        },
        {
          "value": "Solving problems with quadratic equations",
          "label": "Solving problems with quadratic equations",
          "ref": "mm:11:203"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 3 — Number Patterns (Quadratic Sequences)",
      "lessons": [
        {
          "value": "Quadratic sequences",
          "label": "Quadratic sequences",
          "ref": "mm:11:300"
        },
        {
          "value": "Working with quadratic sequences",
          "label": "Working with quadratic sequences",
          "ref": "mm:11:301"
        },
        {
          "value": "Quadratic patterns in context",
          "label": "Quadratic patterns in context",
          "ref": "mm:11:302"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 4 — Analytical Geometry",
      "lessons": [
        {
          "value": "Equation of a line & inclination",
          "label": "Equation of a line & inclination",
          "ref": "mm:11:400"
        },
        {
          "value": "Parallel, perpendicular & complex problems",
          "label": "Parallel, perpendicular & complex problems",
          "ref": "mm:11:401"
        },
        {
          "value": "Angle between two lines",
          "label": "Angle between two lines",
          "ref": "mm:11:402"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 5 — Functions",
      "lessons": [
        {
          "value": "Quadratic, hyperbolic & exponential functions",
          "label": "Quadratic, hyperbolic & exponential functions",
          "ref": "mm:11:500"
        },
        {
          "value": "Trigonometric functions — period, amplitude & phase shift",
          "label": "Trigonometric functions — period, amplitude & phase shift",
          "ref": "mm:11:501"
        },
        {
          "value": "Sketching functions: intercepts, domain & range",
          "label": "Sketching functions: intercepts, domain & range",
          "ref": "mm:11:502"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 6 — Trigonometry",
      "lessons": [
        {
          "value": "Trig identities & reduction formulae",
          "label": "Trig identities & reduction formulae",
          "ref": "mm:11:600"
        },
        {
          "value": "Sine rule, cosine rule & area rule",
          "label": "Sine rule, cosine rule & area rule",
          "ref": "mm:11:601"
        },
        {
          "value": "Solving trigonometric equations",
          "label": "Solving trigonometric equations",
          "ref": "mm:11:602"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 7 — Measurement",
      "lessons": [
        {
          "value": "Surface area of complex solids",
          "label": "Surface area of complex solids",
          "ref": "mm:11:700"
        },
        {
          "value": "Volume & the effect of scale factor k",
          "label": "Volume & the effect of scale factor k",
          "ref": "mm:11:701"
        },
        {
          "value": "Composite shapes in context",
          "label": "Composite shapes in context",
          "ref": "mm:11:702"
        },
        {
          "value": "Measurement with trigonometry",
          "label": "Measurement with trigonometry",
          "ref": "mm:11:703"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 8 — Euclidean Geometry — Circle Geometry",
      "lessons": [
        {
          "value": "Circle theorems",
          "label": "Circle theorems",
          "ref": "mm:11:800"
        },
        {
          "value": "Tangent theorems & chord proofs",
          "label": "Tangent theorems & chord proofs",
          "ref": "mm:11:801"
        },
        {
          "value": "Chord, radius & distance calculations",
          "label": "Chord, radius & distance calculations",
          "ref": "mm:11:802"
        },
        {
          "value": "Circle geometry riders",
          "label": "Circle geometry riders",
          "ref": "mm:11:803"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 9 — Finance, Growth and Decay",
      "lessons": [
        {
          "value": "Depreciation & timelines",
          "label": "Depreciation & timelines",
          "ref": "mm:11:900"
        },
        {
          "value": "Nominal & effective interest rates",
          "label": "Nominal & effective interest rates",
          "ref": "mm:11:901"
        },
        {
          "value": "Multi-stage investments with timelines",
          "label": "Multi-stage investments with timelines",
          "ref": "mm:11:902"
        },
        {
          "value": "Solving for n and i",
          "label": "Solving for n and i",
          "ref": "mm:11:903"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 10 — Probability",
      "lessons": [
        {
          "value": "Independent & dependent events",
          "label": "Independent & dependent events",
          "ref": "mm:11:1000"
        },
        {
          "value": "Venn diagrams, tree diagrams & contingency tables",
          "label": "Venn diagrams, tree diagrams & contingency tables",
          "ref": "mm:11:1001"
        },
        {
          "value": "Venn diagrams for three events",
          "label": "Venn diagrams for three events",
          "ref": "mm:11:1002"
        },
        {
          "value": "Fundamental counting principle",
          "label": "Fundamental counting principle",
          "ref": "mm:11:1003"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 11 — Statistics",
      "lessons": [
        {
          "value": "Histograms, ogives & standard deviation",
          "label": "Histograms, ogives & standard deviation",
          "ref": "mm:11:1100"
        },
        {
          "value": "Skewness, outliers & data interpretation",
          "label": "Skewness, outliers & data interpretation",
          "ref": "mm:11:1101"
        },
        {
          "value": "Comparing datasets with standard deviation",
          "label": "Comparing datasets with standard deviation",
          "ref": "mm:11:1102"
        },
        {
          "value": "Standard deviation from a frequency table",
          "label": "Standard deviation from a frequency table",
          "ref": "mm:11:1103"
        }
      ]
    },
    {
      "group": "Grade 11 — Ch 12 — Linear Programming (extension)",
      "lessons": [
        {
          "value": "Setting up linear programming problems",
          "label": "Setting up linear programming problems",
          "ref": "mm:11:1200"
        },
        {
          "value": "Optimisation — solving LP problems",
          "label": "Optimisation — solving LP problems",
          "ref": "mm:11:1201"
        }
      ]
    },
    {
      "group": "Grade 12 — Ch 1 — Sequences and Series",
      "lessons": [
        {
          "value": "Arithmetic & geometric sequences",
          "label": "Arithmetic & geometric sequences",
          "ref": "mm:12:100"
        },
        {
          "value": "Series — arithmetic, geometric & infinite",
          "label": "Series — arithmetic, geometric & infinite",
          "ref": "mm:12:101"
        },
        {
          "value": "Sigma notation & number patterns",
          "label": "Sigma notation & number patterns",
          "ref": "mm:12:102"
        },
        {
          "value": "Deriving series formulae & applications",
          "label": "Deriving series formulae & applications",
          "ref": "mm:12:103"
        }
      ]
    },
    {
      "group": "Grade 12 — Ch 2 — Functions and Logarithms",
      "lessons": [
        {
          "value": "Inverse functions",
          "label": "Inverse functions",
          "ref": "mm:12:200"
        },
        {
          "value": "Logarithmic functions & equations",
          "label": "Logarithmic functions & equations",
          "ref": "mm:12:201"
        },
        {
          "value": "Restricting domains for inverses",
          "label": "Restricting domains for inverses",
          "ref": "mm:12:202"
        },
        {
          "value": "Graphing exponential & logarithmic functions",
          "label": "Graphing exponential & logarithmic functions",
          "ref": "mm:12:203"
        }
      ]
    },
    {
      "group": "Grade 12 — Ch 3 — Finance — Annuities",
      "lessons": [
        {
          "value": "Future value annuities",
          "label": "Future value annuities",
          "ref": "mm:12:300"
        },
        {
          "value": "Present value annuities & loan repayments",
          "label": "Present value annuities & loan repayments",
          "ref": "mm:12:301"
        },
        {
          "value": "Simple & compound growth vs decay",
          "label": "Simple & compound growth vs decay",
          "ref": "mm:12:302"
        },
        {
          "value": "Comparing investment & loan options",
          "label": "Comparing investment & loan options",
          "ref": "mm:12:303"
        }
      ]
    },
    {
      "group": "Grade 12 — Ch 4 — Trigonometry",
      "lessons": [
        {
          "value": "Compound angle identities",
          "label": "Compound angle identities",
          "ref": "mm:12:400"
        },
        {
          "value": "Trig equations & 3D applications",
          "label": "Trig equations & 3D applications",
          "ref": "mm:12:401"
        },
        {
          "value": "Sine, cosine & area rules in 2D and 3D",
          "label": "Sine, cosine & area rules in 2D and 3D",
          "ref": "mm:12:402"
        },
        {
          "value": "Proving trigonometric identities",
          "label": "Proving trigonometric identities",
          "ref": "mm:12:403"
        }
      ]
    },
    {
      "group": "Grade 12 — Ch 5 — Polynomials",
      "lessons": [
        {
          "value": "Remainder & factor theorems",
          "label": "Remainder & factor theorems",
          "ref": "mm:12:500"
        },
        {
          "value": "Cubic polynomials — sketching & solving",
          "label": "Cubic polynomials — sketching & solving",
          "ref": "mm:12:501"
        },
        {
          "value": "Finding unknown coefficients",
          "label": "Finding unknown coefficients",
          "ref": "mm:12:502"
        },
        {
          "value": "Sketching cubic graphs from key features",
          "label": "Sketching cubic graphs from key features",
          "ref": "mm:12:503"
        }
      ]
    },
    {
      "group": "Grade 12 — Ch 6 — Differential Calculus",
      "lessons": [
        {
          "value": "Limits, first principles & rules",
          "label": "Limits, first principles & rules",
          "ref": "mm:12:600"
        },
        {
          "value": "Tangents, curve sketching & optimisation",
          "label": "Tangents, curve sketching & optimisation",
          "ref": "mm:12:601"
        },
        {
          "value": "Rates of change & calculus of motion",
          "label": "Rates of change & calculus of motion",
          "ref": "mm:12:602"
        },
        {
          "value": "Cubic graphs: full analysis & interpretation",
          "label": "Cubic graphs: full analysis & interpretation",
          "ref": "mm:12:603"
        }
      ]
    },
    {
      "group": "Grade 12 — Ch 7 — Analytical Geometry — Circles",
      "lessons": [
        {
          "value": "Equation of a circle",
          "label": "Equation of a circle",
          "ref": "mm:12:700"
        },
        {
          "value": "Tangent to a circle",
          "label": "Tangent to a circle",
          "ref": "mm:12:701"
        },
        {
          "value": "Lines, chords & circles",
          "label": "Lines, chords & circles",
          "ref": "mm:12:702"
        },
        {
          "value": "Tangents from an external point",
          "label": "Tangents from an external point",
          "ref": "mm:12:703"
        }
      ]
    },
    {
      "group": "Grade 12 — Ch 8 — Euclidean Geometry",
      "lessons": [
        {
          "value": "Proportion, polygons & triangle theorems",
          "label": "Proportion, polygons & triangle theorems",
          "ref": "mm:12:800"
        },
        {
          "value": "Similarity & Pythagorean theorem proofs",
          "label": "Similarity & Pythagorean theorem proofs",
          "ref": "mm:12:801"
        },
        {
          "value": "Similar polygons & scale factor problems",
          "label": "Similar polygons & scale factor problems",
          "ref": "mm:12:802"
        }
      ]
    },
    {
      "group": "Grade 12 — Ch 9 — Statistics",
      "lessons": [
        {
          "value": "Scatter plots & regression",
          "label": "Scatter plots & regression",
          "ref": "mm:12:900"
        },
        {
          "value": "Correlation coefficient",
          "label": "Correlation coefficient",
          "ref": "mm:12:901"
        },
        {
          "value": "Symmetric & skewed data",
          "label": "Symmetric & skewed data",
          "ref": "mm:12:902"
        }
      ]
    },
    {
      "group": "Grade 12 — Ch 10 — Probability — Counting Principles",
      "lessons": [
        {
          "value": "Fundamental counting principle & factorial notation",
          "label": "Fundamental counting principle & factorial notation",
          "ref": "mm:12:1000"
        },
        {
          "value": "Combinations & probability applications",
          "label": "Combinations & probability applications",
          "ref": "mm:12:1001"
        },
        {
          "value": "Revision: probability identities & Venn diagrams",
          "label": "Revision: probability identities & Venn diagrams",
          "ref": "mm:12:1002"
        },
        {
          "value": "Tree diagrams, tables & dependent events",
          "label": "Tree diagrams, tables & dependent events",
          "ref": "mm:12:1003"
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
  ],
  "science-sage": [
    {
      "group": "Grade 7 — Life & Living",
      "lessons": [
        {
          "value": "Biodiversity & classification",
          "label": "Biodiversity & classification",
          "ref": "ss:7:life/biodiversity"
        }
      ]
    },
    {
      "group": "Grade 7 — Matter & Materials",
      "lessons": [
        {
          "value": "Separating mixtures",
          "label": "Separating mixtures",
          "ref": "ss:7:matter/separating-mixtures"
        }
      ]
    },
    {
      "group": "Grade 7 — Energy & Change",
      "lessons": [
        {
          "value": "Forms of energy (KE & PE)",
          "label": "Forms of energy (KE & PE)",
          "ref": "ss:7:energy/energy-forms"
        }
      ]
    },
    {
      "group": "Grade 7 — Planet Earth & Beyond",
      "lessons": [
        {
          "value": "Seasons & Earth's tilt",
          "label": "Seasons & Earth's tilt",
          "ref": "ss:7:earth/seasons"
        },
        {
          "value": "Moon, gravity & tides",
          "label": "Moon, gravity & tides",
          "ref": "ss:7:earth/earth-moon"
        }
      ]
    },
    {
      "group": "Grade 8 — Life & Living",
      "lessons": [
        {
          "value": "Photosynthesis & respiration",
          "label": "Photosynthesis & respiration",
          "ref": "ss:8:life/photosynthesis"
        },
        {
          "value": "Ecosystems & food webs",
          "label": "Ecosystems & food webs",
          "ref": "ss:8:life/ecosystems"
        },
        {
          "value": "Micro-organisms",
          "label": "Micro-organisms",
          "ref": "ss:8:life/microorganisms"
        }
      ]
    },
    {
      "group": "Grade 8 — Matter & Materials",
      "lessons": [
        {
          "value": "The atom & atomic models",
          "label": "The atom & atomic models",
          "ref": "ss:8:matter/atoms"
        },
        {
          "value": "The periodic table",
          "label": "The periodic table",
          "ref": "ss:8:matter/periodic-table"
        },
        {
          "value": "Compounds & mixtures",
          "label": "Compounds & mixtures",
          "ref": "ss:8:matter/compounds-mixtures"
        },
        {
          "value": "Particle model of matter",
          "label": "Particle model of matter",
          "ref": "ss:8:matter/particle-model"
        },
        {
          "value": "Metals & non-metals",
          "label": "Metals & non-metals",
          "ref": "ss:8:matter/metals-non-metals"
        },
        {
          "value": "Chemical reactions",
          "label": "Chemical reactions",
          "ref": "ss:8:matter/chemical-reactions"
        }
      ]
    },
    {
      "group": "Grade 8 — Energy & Change",
      "lessons": [
        {
          "value": "Static electricity",
          "label": "Static electricity",
          "ref": "ss:8:energy/static-electricity"
        },
        {
          "value": "Electric circuits",
          "label": "Electric circuits",
          "ref": "ss:8:energy/electricity"
        },
        {
          "value": "Energy & the national electricity grid",
          "label": "Energy & the national electricity grid",
          "ref": "ss:8:energy/electricity-grid"
        },
        {
          "value": "Visible light",
          "label": "Visible light",
          "ref": "ss:8:energy/light"
        },
        {
          "value": "Sound as energy",
          "label": "Sound as energy",
          "ref": "ss:8:energy/sound"
        }
      ]
    },
    {
      "group": "Grade 8 — Planet Earth & Beyond",
      "lessons": [
        {
          "value": "The solar system",
          "label": "The solar system",
          "ref": "ss:8:earth/solar-system"
        },
        {
          "value": "Beyond the solar system",
          "label": "Beyond the solar system",
          "ref": "ss:8:earth/beyond-solar-system"
        },
        {
          "value": "Telescopes & constellations",
          "label": "Telescopes & constellations",
          "ref": "ss:8:earth/telescopes"
        }
      ]
    },
    {
      "group": "Grade 9 — Life & Living",
      "lessons": [
        {
          "value": "Cell structure & function",
          "label": "Cell structure & function",
          "ref": "ss:9:life/cells"
        },
        {
          "value": "Nutrients & digestion",
          "label": "Nutrients & digestion",
          "ref": "ss:9:life/nutrients"
        },
        {
          "value": "Systems in the human body",
          "label": "Systems in the human body",
          "ref": "ss:9:life/systems-human-body"
        },
        {
          "value": "Reproduction in plants",
          "label": "Reproduction in plants",
          "ref": "ss:9:life/reproduction-plants"
        },
        {
          "value": "Reproduction in animals",
          "label": "Reproduction in animals",
          "ref": "ss:9:life/reproduction-animals"
        },
        {
          "value": "Genetics & heredity",
          "label": "Genetics & heredity",
          "ref": "ss:9:life/genetics"
        }
      ]
    },
    {
      "group": "Grade 9 — Matter & Materials",
      "lessons": [
        {
          "value": "Atoms & electron arrangement",
          "label": "Atoms & electron arrangement",
          "ref": "ss:9:matter/atoms-electrons"
        },
        {
          "value": "Chemical bonding",
          "label": "Chemical bonding",
          "ref": "ss:9:matter/chemical-bonding"
        },
        {
          "value": "Acids, bases & pH scale",
          "label": "Acids, bases & pH scale",
          "ref": "ss:9:matter/acids-bases"
        },
        {
          "value": "Types of chemical reactions",
          "label": "Types of chemical reactions",
          "ref": "ss:9:matter/types-of-reactions"
        }
      ]
    },
    {
      "group": "Grade 9 — Energy & Change",
      "lessons": [
        {
          "value": "Forces",
          "label": "Forces",
          "ref": "ss:9:energy/forces"
        },
        {
          "value": "Magnetism & forces",
          "label": "Magnetism & forces",
          "ref": "ss:9:energy/magnetism"
        },
        {
          "value": "Waves & EM spectrum",
          "label": "Waves & EM spectrum",
          "ref": "ss:9:energy/waves"
        },
        {
          "value": "Electromagnetic induction",
          "label": "Electromagnetic induction",
          "ref": "ss:9:energy/electromagnetic-induction"
        },
        {
          "value": "Electric cells, resistance & circuits",
          "label": "Electric cells, resistance & circuits",
          "ref": "ss:9:energy/electric-circuits"
        },
        {
          "value": "National electricity supply system",
          "label": "National electricity supply system",
          "ref": "ss:9:energy/national-electricity-supply"
        }
      ]
    },
    {
      "group": "Grade 9 — Planet Earth & Beyond",
      "lessons": [
        {
          "value": "The Earth as a system",
          "label": "The Earth as a system",
          "ref": "ss:9:earth/earth-as-a-system"
        },
        {
          "value": "Earth's atmosphere",
          "label": "Earth's atmosphere",
          "ref": "ss:9:earth/atmosphere"
        },
        {
          "value": "Climate change & global warming",
          "label": "Climate change & global warming",
          "ref": "ss:9:earth/climate-change"
        },
        {
          "value": "Lithosphere & mining of mineral resources",
          "label": "Lithosphere & mining of mineral resources",
          "ref": "ss:9:earth/lithosphere-mining"
        },
        {
          "value": "Fossils & geological history",
          "label": "Fossils & geological history",
          "ref": "ss:9:earth/geological-history"
        },
        {
          "value": "Birth, life & death of a star",
          "label": "Birth, life & death of a star",
          "ref": "ss:9:earth/life-cycle-of-stars"
        }
      ]
    },
    {
      "group": "Grade 10 — Life Sciences",
      "lessons": [
        {
          "value": "Chemistry of life",
          "label": "Chemistry of life",
          "ref": "ss:10:life/chemistry-of-life"
        },
        {
          "value": "The cell — structure & function",
          "label": "The cell — structure & function",
          "ref": "ss:10:life/cell-structure"
        },
        {
          "value": "Cell division — mitosis",
          "label": "Cell division — mitosis",
          "ref": "ss:10:life/cell-division-mitosis"
        },
        {
          "value": "Plant & animal tissues",
          "label": "Plant & animal tissues",
          "ref": "ss:10:life/plant-animal-tissues"
        },
        {
          "value": "Support & transport in plants",
          "label": "Support & transport in plants",
          "ref": "ss:10:life/transport-in-plants"
        },
        {
          "value": "Support systems in animals",
          "label": "Support systems in animals",
          "ref": "ss:10:life/support-systems-animals"
        },
        {
          "value": "Transport system in mammals",
          "label": "Transport system in mammals",
          "ref": "ss:10:life/transport-in-mammals"
        },
        {
          "value": "Biosphere to ecosystems",
          "label": "Biosphere to ecosystems",
          "ref": "ss:10:life/biosphere-ecosystems"
        },
        {
          "value": "Biodiversity & classification",
          "label": "Biodiversity & classification",
          "ref": "ss:10:life/biodiversity-classification"
        },
        {
          "value": "History of life on Earth",
          "label": "History of life on Earth",
          "ref": "ss:10:life/history-of-life"
        }
      ]
    },
    {
      "group": "Grade 10 — Physics",
      "lessons": [
        {
          "value": "Vectors & scalars",
          "label": "Vectors & scalars",
          "ref": "ss:10:physics/vectors-scalars"
        },
        {
          "value": "Motion in one dimension",
          "label": "Motion in one dimension",
          "ref": "ss:10:physics/motion-1d"
        },
        {
          "value": "Energy & conservation",
          "label": "Energy & conservation",
          "ref": "ss:10:physics/energy"
        },
        {
          "value": "Waves, sound & light",
          "label": "Waves, sound & light",
          "ref": "ss:10:physics/waves-sound-light"
        },
        {
          "value": "Electrostatics",
          "label": "Electrostatics",
          "ref": "ss:10:physics/electrostatics"
        },
        {
          "value": "Electric circuits",
          "label": "Electric circuits",
          "ref": "ss:10:physics/circuits"
        }
      ]
    },
    {
      "group": "Grade 10 — Chemistry",
      "lessons": [
        {
          "value": "Classification of matter",
          "label": "Classification of matter",
          "ref": "ss:10:chemistry/classification-matter"
        },
        {
          "value": "Atomic structure",
          "label": "Atomic structure",
          "ref": "ss:10:chemistry/atomic-structure"
        },
        {
          "value": "The periodic table",
          "label": "The periodic table",
          "ref": "ss:10:chemistry/periodic-table"
        },
        {
          "value": "Chemical bonding",
          "label": "Chemical bonding",
          "ref": "ss:10:chemistry/chemical-bonding"
        },
        {
          "value": "Intermolecular forces",
          "label": "Intermolecular forces",
          "ref": "ss:10:chemistry/intermolecular-forces"
        },
        {
          "value": "Physical & chemical change",
          "label": "Physical & chemical change",
          "ref": "ss:10:chemistry/physical-chemical-change"
        },
        {
          "value": "Representing chemical change",
          "label": "Representing chemical change",
          "ref": "ss:10:chemistry/representing-chemical-change"
        },
        {
          "value": "Reactions in aqueous solution",
          "label": "Reactions in aqueous solution",
          "ref": "ss:10:chemistry/reactions-aqueous-solution"
        },
        {
          "value": "Stoichiometry",
          "label": "Stoichiometry",
          "ref": "ss:10:chemistry/stoichiometry"
        },
        {
          "value": "The hydrosphere",
          "label": "The hydrosphere",
          "ref": "ss:10:chemistry/hydrosphere"
        }
      ]
    },
    {
      "group": "Grade 11 — Life Sciences",
      "lessons": [
        {
          "value": "Classification of micro-organisms",
          "label": "Classification of micro-organisms",
          "ref": "ss:11:life/microorganisms-classification"
        },
        {
          "value": "Biodiversity of plants",
          "label": "Biodiversity of plants",
          "ref": "ss:11:life/biodiversity-plants"
        },
        {
          "value": "Reproduction in plants",
          "label": "Reproduction in plants",
          "ref": "ss:11:life/reproduction-plants"
        },
        {
          "value": "Biodiversity of animals",
          "label": "Biodiversity of animals",
          "ref": "ss:11:life/biodiversity-animals"
        },
        {
          "value": "Photosynthesis",
          "label": "Photosynthesis",
          "ref": "ss:11:life/photosynthesis"
        },
        {
          "value": "Animal nutrition",
          "label": "Animal nutrition",
          "ref": "ss:11:life/animal-nutrition"
        },
        {
          "value": "Respiration",
          "label": "Respiration",
          "ref": "ss:11:life/respiration"
        },
        {
          "value": "Gas exchange",
          "label": "Gas exchange",
          "ref": "ss:11:life/gas-exchange"
        },
        {
          "value": "Excretion",
          "label": "Excretion",
          "ref": "ss:11:life/excretion"
        },
        {
          "value": "Population ecology",
          "label": "Population ecology",
          "ref": "ss:11:life/population-ecology"
        },
        {
          "value": "Human impact on the environment",
          "label": "Human impact on the environment",
          "ref": "ss:11:life/human-impact-environment"
        }
      ]
    },
    {
      "group": "Grade 11 — Physics",
      "lessons": [
        {
          "value": "Vectors in 2D",
          "label": "Vectors in 2D",
          "ref": "ss:11:physics/vectors-2d"
        },
        {
          "value": "Newton's laws applied",
          "label": "Newton's laws applied",
          "ref": "ss:11:physics/newtons-laws"
        },
        {
          "value": "Momentum & impulse",
          "label": "Momentum & impulse",
          "ref": "ss:11:physics/momentum-impulse"
        },
        {
          "value": "Work, energy & power",
          "label": "Work, energy & power",
          "ref": "ss:11:physics/work-energy-power"
        },
        {
          "value": "Electrostatics",
          "label": "Electrostatics",
          "ref": "ss:11:physics/electrostatics"
        },
        {
          "value": "Electric circuits",
          "label": "Electric circuits",
          "ref": "ss:11:physics/electric-circuits"
        },
        {
          "value": "Electromagnetic induction",
          "label": "Electromagnetic induction",
          "ref": "ss:11:physics/electromagnetic-induction"
        },
        {
          "value": "Optical phenomena & EM radiation",
          "label": "Optical phenomena & EM radiation",
          "ref": "ss:11:physics/optical-phenomena"
        }
      ]
    },
    {
      "group": "Grade 11 — Chemistry",
      "lessons": [
        {
          "value": "Intermolecular forces & properties",
          "label": "Intermolecular forces & properties",
          "ref": "ss:11:chemistry/intermolecular-forces"
        },
        {
          "value": "Quantitative aspects",
          "label": "Quantitative aspects",
          "ref": "ss:11:chemistry/stoichiometry"
        },
        {
          "value": "Acids & bases",
          "label": "Acids & bases",
          "ref": "ss:11:chemistry/acids-bases"
        },
        {
          "value": "Redox reactions",
          "label": "Redox reactions",
          "ref": "ss:11:chemistry/redox"
        },
        {
          "value": "Energy & chemical change",
          "label": "Energy & chemical change",
          "ref": "ss:11:chemistry/energy-chemical-change"
        },
        {
          "value": "Rate of reaction",
          "label": "Rate of reaction",
          "ref": "ss:11:chemistry/rate-of-reaction"
        },
        {
          "value": "Chemical equilibrium",
          "label": "Chemical equilibrium",
          "ref": "ss:11:chemistry/chemical-equilibrium"
        }
      ]
    },
    {
      "group": "Grade 12 — Life Sciences",
      "lessons": [
        {
          "value": "DNA — the code of life",
          "label": "DNA — the code of life",
          "ref": "ss:12:life/dna-code-of-life"
        },
        {
          "value": "Genetic engineering & biotechnology",
          "label": "Genetic engineering & biotechnology",
          "ref": "ss:12:life/genetic-engineering"
        },
        {
          "value": "Meiosis",
          "label": "Meiosis",
          "ref": "ss:12:life/meiosis"
        },
        {
          "value": "Reproduction in vertebrates",
          "label": "Reproduction in vertebrates",
          "ref": "ss:12:life/reproduction-vertebrates"
        },
        {
          "value": "Human reproduction",
          "label": "Human reproduction",
          "ref": "ss:12:life/human-reproduction"
        },
        {
          "value": "Nervous system & senses",
          "label": "Nervous system & senses",
          "ref": "ss:12:life/nervous-system-senses"
        },
        {
          "value": "Human endocrine system",
          "label": "Human endocrine system",
          "ref": "ss:12:life/human-endocrine-system"
        },
        {
          "value": "Homeostasis",
          "label": "Homeostasis",
          "ref": "ss:12:life/homeostasis"
        },
        {
          "value": "Osmoregulation & excretion",
          "label": "Osmoregulation & excretion",
          "ref": "ss:12:life/osmoregulation-excretion"
        },
        {
          "value": "Responding to the environment — plants",
          "label": "Responding to the environment — plants",
          "ref": "ss:12:life/plant-responses"
        },
        {
          "value": "Darwinism & natural selection",
          "label": "Darwinism & natural selection",
          "ref": "ss:12:life/darwinism-natural-selection"
        },
        {
          "value": "Evolution — evidence & human evolution",
          "label": "Evolution — evidence & human evolution",
          "ref": "ss:12:life/evolution-human-evolution"
        },
        {
          "value": "Genetics & inheritance",
          "label": "Genetics & inheritance",
          "ref": "ss:12:life/genetics-inheritance"
        }
      ]
    },
    {
      "group": "Grade 12 — Physics",
      "lessons": [
        {
          "value": "Vertical projectile motion",
          "label": "Vertical projectile motion",
          "ref": "ss:12:physics/vertical-projectile"
        },
        {
          "value": "The Doppler effect",
          "label": "The Doppler effect",
          "ref": "ss:12:physics/doppler-effect"
        },
        {
          "value": "Electrodynamics",
          "label": "Electrodynamics",
          "ref": "ss:12:physics/electrodynamics"
        },
        {
          "value": "Electric circuits — internal resistance",
          "label": "Electric circuits — internal resistance",
          "ref": "ss:12:physics/electric-circuits-gr12"
        },
        {
          "value": "Optical phenomena & photoelectric effect",
          "label": "Optical phenomena & photoelectric effect",
          "ref": "ss:12:physics/photoelectric-effect"
        }
      ]
    },
    {
      "group": "Grade 12 — Chemistry",
      "lessons": [
        {
          "value": "Organic chemistry — structure & naming",
          "label": "Organic chemistry — structure & naming",
          "ref": "ss:12:chemistry/organic-chemistry"
        },
        {
          "value": "Organic reactions",
          "label": "Organic reactions",
          "ref": "ss:12:chemistry/organic-reactions"
        },
        {
          "value": "Electrochemistry",
          "label": "Electrochemistry",
          "ref": "ss:12:chemistry/electrochemistry"
        },
        {
          "value": "Acids & bases — quantitative",
          "label": "Acids & bases — quantitative",
          "ref": "ss:12:chemistry/acids-bases-gr12"
        },
        {
          "value": "The chemical industry",
          "label": "The chemical industry",
          "ref": "ss:12:chemistry/chemical-industry"
        }
      ]
    }
  ],
  "tech-tower": [
    {
      "group": "Grade 8 — Structures",
      "lessons": [
        {
          "value": "Frame structures & forces",
          "label": "Frame structures & forces",
          "ref": "tt:8:structures/frame-structures-and-forces"
        }
      ]
    },
    {
      "group": "Grade 8 — Mechanical Systems",
      "lessons": [
        {
          "value": "Simple machines & gears",
          "label": "Simple machines & gears",
          "ref": "tt:8:mechanical/simple-machines-and-gears"
        },
        {
          "value": "Mechanical advantage calculations",
          "label": "Mechanical advantage calculations",
          "ref": "tt:8:mechanical/mechanical-advantage-calculations"
        }
      ]
    },
    {
      "group": "Grade 8 — Processing",
      "lessons": [
        {
          "value": "The impact of technology",
          "label": "The impact of technology",
          "ref": "tt:8:processing/impact-of-technology"
        }
      ]
    },
    {
      "group": "Grade 8 — Electrical Systems",
      "lessons": [
        {
          "value": "Circuits & electrochemical cells",
          "label": "Circuits & electrochemical cells",
          "ref": "tt:8:electrical/circuits-and-cells"
        },
        {
          "value": "Generating electricity & logic gates",
          "label": "Generating electricity & logic gates",
          "ref": "tt:8:electrical/generating-electricity-and-logic-gates"
        }
      ]
    },
    {
      "group": "Grade 9 — Structures",
      "lessons": [
        {
          "value": "First-angle orthographic projection",
          "label": "First-angle orthographic projection",
          "ref": "tt:9:structures/orthographic-projection"
        },
        {
          "value": "Forces & material properties",
          "label": "Forces & material properties",
          "ref": "tt:9:structures/forces-and-materials"
        }
      ]
    },
    {
      "group": "Grade 9 — Mechanical Systems",
      "lessons": [
        {
          "value": "Hydraulics & pneumatics",
          "label": "Hydraulics & pneumatics",
          "ref": "tt:9:mechanical/hydraulics-and-pneumatics"
        },
        {
          "value": "Pulleys & control systems",
          "label": "Pulleys & control systems",
          "ref": "tt:9:mechanical/pulleys-and-control-systems"
        },
        {
          "value": "Advanced gear systems",
          "label": "Advanced gear systems",
          "ref": "tt:9:mechanical/advanced-gear-systems"
        }
      ]
    },
    {
      "group": "Grade 9 — Electrical Systems",
      "lessons": [
        {
          "value": "Ohm's Law & resistor colour codes",
          "label": "Ohm's Law & resistor colour codes",
          "ref": "tt:9:electrical/ohms-law-and-resistors"
        },
        {
          "value": "Electronic components & sensors",
          "label": "Electronic components & sensors",
          "ref": "tt:9:electrical/electronic-components-and-sensors"
        }
      ]
    },
    {
      "group": "Grade 9 — Processing",
      "lessons": [
        {
          "value": "Preserving materials & plastics",
          "label": "Preserving materials & plastics",
          "ref": "tt:9:processing/preserving-materials-and-plastics"
        }
      ]
    }
  ]
};
