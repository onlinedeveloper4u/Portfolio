import html2pdf from 'html2pdf.js';

// Real portfolio data extracted from components
export const portfolioData = {
  name: "Muhammad Aqib Rafiqe",
  title: "Senior Software Engineer",
  email: "onlinedeveloper4u@gmail.com",
  phone: "+923227221032",
  linkedin: "linkedin.com/in/onlinedeveloper4u",
  github: "github.com/onlinedeveloper4u",
  location: "Gujrat, Pakistan",
  summary: "Senior Software Engineer with 4+ years of expertise in iOS development (Swift, SwiftUI, UIKit), React Native for cross-platform mobile apps, and MERN stack development. Proven track record delivering high-quality applications with clean code, performance optimization, and exceptional user experiences. Experienced in building AI-powered features, real-time systems, and scalable backend services.",
  
  skills: [
    {
      category: "iOS Development",
      items: ["Swift", "SwiftUI", "UIKit", "Core Data", "Core Animation", "Push Notifications", "In-App Purchases", "REST APIs"]
    },
    {
      category: "Cross-Platform",
      items: ["React Native", "Expo", "Redux", "React Navigation"]
    },
    {
      category: "MERN Stack",
      items: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux Toolkit", "TypeScript"]
    },
    {
      category: "Backend & APIs",
      items: ["RESTful APIs", "GraphQL", "Strapi CMS", "Firebase", "Cloud Functions", "WebSocket", "Socket.io"]
    },
    {
      category: "AI & Innovation",
      items: ["OpenAI Integration", "AI-powered Features", "Content Generation", "Smart Automation"]
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "Xcode", "VS Code", "Figma", "Jira", "App Store Connect", "TestFlight"]
    }
  ],
  
  experience: [
    {
      title: "Senior iOS Developer",
      company: "iParagons",
      location: "Gujrat, Pakistan",
      period: "Jul 2024 - Present",
      description: [
        "Built Leaf iOS app - AI-powered event planning app using Swift, SwiftUI, and Core Data",
        "Developed backend services including Node.js APIs, cron jobs, and cloud functions",
        "Integrated third-party APIs from Partiful, Luma, Eventbrite, SeatGeek, and Fandango",
        "Implemented AI-driven features using OpenAI APIs for event description generation"
      ]
    },
    {
      title: "MERN Stack Developer",
      company: "iParagons",
      location: "Gujrat, Pakistan",
      period: "Nov 2022 - Present",
      description: [
        "Full-stack web development using MongoDB, Express.js, React.js, and Node.js",
        "Built admin dashboards with analytics and real-time data management",
        "Developed REST APIs integrated with mobile applications",
        "Implemented user management, reporting tools, and data visualization"
      ]
    },
    {
      title: "Junior iOS Developer",
      company: "iParagons",
      location: "Gujrat, Pakistan",
      period: "Nov 2020 - Jun 2024",
      description: [
        "Designed Home Tab features including location views and multi-select 'Make Plans' flow",
        "Developed real-time In-App Notifications and Collections module",
        "Built Explore Page with advanced filters and Custom Community Calendar",
        "Implemented Split the Bill functionality and Edit Profile module"
      ]
    },
    {
      title: "Freelance Developer",
      company: "Self-employed",
      location: "Remote",
      period: "Jul 2021 - May 2023",
      description: [
        "iOS development using Swift, SwiftUI, and UIKit for various clients",
        "Full-stack MERN development and cross-platform React Native solutions",
        "Built Vooconnect social platform with iOS frontend and Node.js backend",
        "Delivered apps including Ombi, Creator Music Studio, and The Track App"
      ]
    }
  ],
  
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Engineering and Technology",
      period: "2016 - 2020"
    }
  ],
  
  projects: [
    {
      name: "Leaf - Book Your Friends",
      description: "AI-powered event planner for organizing group gatherings with smart checklists, group scheduler, and event import features",
      technologies: "iOS, Swift, SwiftUI, Node.js, Cloud Functions, AI",
      contribution: "Full-Stack",
      link: "apps.apple.com/app/leaf-book-your-friends/id1040588046"
    },
    {
      name: "MPower Pro",
      description: "Cross-platform music creation app with multitrack DAW, AI guidance, and social collaboration features",
      technologies: "React Native, Strapi, iOS, Android",
      contribution: "Full-Stack",
      link: "apps.apple.com/app/mpower-pro/id6443431786"
    },
    {
      name: "Vooconnect",
      description: "Social networking platform with live streaming, chat, marketplace, and content subscription features",
      technologies: "iOS, Swift, Node.js, MongoDB",
      contribution: "Full-Stack",
      link: "apps.apple.com/app/vooconnect/id1573637452"
    },
    {
      name: "Ombi - Preview Restaurants",
      description: "iOS app for previewing and booking restaurants through immersive video experiences",
      technologies: "iOS, Swift, UIKit, Video Streaming",
      contribution: "Frontend",
      link: "apps.apple.com/app/ombi/id1598753264"
    },
    {
      name: "Creator Music Studio",
      description: "All-in-one music creation app with AI-powered lyrics, melody generation, and Auto-Tune effects",
      technologies: "iOS, Swift, Audio Production, AI",
      contribution: "Frontend",
      link: "apps.apple.com/app/creator-music-studio/id6445974873"
    }
  ],
  
  languages: [
    { name: "English", level: "Professional" },
    { name: "Urdu", level: "Native" },
    { name: "Punjabi", level: "Native" }
  ]
};

export type CVTheme = 'modern' | 'classic' | 'minimal' | 'executive' | 'creative';

export interface ThemeConfig {
  id: CVTheme;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  previewBg: string;
}

export const cvThemes: ThemeConfig[] = [
  {
    id: 'modern',
    name: 'Modern Sidebar',
    description: 'Two-column layout with colored sidebar',
    primaryColor: '#2563eb',
    secondaryColor: '#1e3a5f',
    accentColor: '#60a5fa',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    previewBg: 'linear-gradient(135deg, #2563eb 0%, #60a5fa 100%)'
  },
  {
    id: 'classic',
    name: 'Classic Professional',
    description: 'Traditional single-column with elegant typography',
    primaryColor: '#374151',
    secondaryColor: '#111827',
    accentColor: '#6b7280',
    fontFamily: "'Georgia', 'Times New Roman', serif",
    previewBg: 'linear-gradient(135deg, #374151 0%, #6b7280 100%)'
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Ultra-clean with generous whitespace',
    primaryColor: '#0f172a',
    secondaryColor: '#1e293b',
    accentColor: '#64748b',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    previewBg: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)'
  },
  {
    id: 'executive',
    name: 'Executive Premium',
    description: 'Premium look with gold accents',
    primaryColor: '#92400e',
    secondaryColor: '#451a03',
    accentColor: '#d97706',
    fontFamily: "'Playfair Display', Georgia, serif",
    previewBg: 'linear-gradient(135deg, #92400e 0%, #fbbf24 100%)'
  },
  {
    id: 'creative',
    name: 'Creative Timeline',
    description: 'Modern with visual timeline',
    primaryColor: '#7c3aed',
    secondaryColor: '#4c1d95',
    accentColor: '#a78bfa',
    fontFamily: "'Poppins', 'Helvetica Neue', sans-serif",
    previewBg: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)'
  }
];

// Generate different HTML layouts based on theme
export const generateCVHTML = (theme: ThemeConfig): string => {
  const { id, primaryColor, secondaryColor, accentColor, fontFamily } = theme;
  const data = portfolioData;

  // Common styles
  const commonStyles = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: ${fontFamily}; font-size: 11px; line-height: 1.5; color: #333; background: #fff; }
    .page { max-width: 800px; margin: 0 auto; }
    a { color: ${primaryColor}; text-decoration: none; }
  `;

  switch (id) {
    case 'modern':
      return generateModernSidebarLayout(data, primaryColor, secondaryColor, accentColor, fontFamily, commonStyles);
    case 'classic':
      return generateClassicLayout(data, primaryColor, secondaryColor, accentColor, fontFamily, commonStyles);
    case 'minimal':
      return generateMinimalLayout(data, primaryColor, secondaryColor, accentColor, fontFamily, commonStyles);
    case 'executive':
      return generateExecutiveLayout(data, primaryColor, secondaryColor, accentColor, fontFamily, commonStyles);
    case 'creative':
      return generateCreativeLayout(data, primaryColor, secondaryColor, accentColor, fontFamily, commonStyles);
    default:
      return generateModernSidebarLayout(data, primaryColor, secondaryColor, accentColor, fontFamily, commonStyles);
  }
};

// Modern Sidebar Layout - Two columns with left sidebar
function generateModernSidebarLayout(data: typeof portfolioData, primary: string, secondary: string, accent: string, font: string, common: string): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
      ${common}
      .page { display: flex; min-height: 100%; }
      .sidebar { width: 280px; background: ${secondary}; color: #fff; padding: 30px 20px; }
      .main { flex: 1; padding: 30px; background: #fff; }
      .photo-placeholder { width: 120px; height: 120px; border-radius: 50%; background: ${accent}; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 40px; font-weight: 700; color: #fff; }
      .sidebar h1 { font-size: 22px; text-align: center; margin-bottom: 5px; font-weight: 700; }
      .sidebar .title { text-align: center; color: ${accent}; font-size: 12px; margin-bottom: 25px; font-weight: 500; }
      .sidebar-section { margin-bottom: 20px; }
      .sidebar-section h3 { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid ${accent}; padding-bottom: 5px; margin-bottom: 10px; color: ${accent}; }
      .contact-item { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-size: 10px; word-break: break-all; }
      .contact-icon { width: 16px; height: 16px; background: ${accent}; border-radius: 3px; display: flex; align-items: center; justify-content: center; font-size: 9px; flex-shrink: 0; }
      .skill-category { margin-bottom: 12px; }
      .skill-category-title { font-size: 10px; font-weight: 600; margin-bottom: 4px; color: #fff; }
      .skill-tags { display: flex; flex-wrap: wrap; gap: 4px; }
      .skill-tag { background: rgba(255,255,255,0.15); padding: 2px 6px; border-radius: 3px; font-size: 9px; }
      .lang-item { display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 5px; }
      .main h2 { font-size: 14px; color: ${secondary}; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid ${primary}; padding-bottom: 5px; margin-bottom: 15px; margin-top: 20px; }
      .main h2:first-child { margin-top: 0; }
      .summary { color: #555; line-height: 1.7; font-size: 11px; }
      .exp-item { margin-bottom: 18px; }
      .exp-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 3px; }
      .exp-title { font-weight: 700; font-size: 12px; color: ${secondary}; }
      .exp-period { font-size: 10px; color: ${primary}; font-weight: 600; }
      .exp-company { color: #666; font-size: 11px; margin-bottom: 6px; }
      .exp-list { list-style: none; padding-left: 0; }
      .exp-list li { position: relative; padding-left: 12px; margin-bottom: 3px; color: #555; font-size: 10px; }
      .exp-list li:before { content: "▸"; position: absolute; left: 0; color: ${primary}; }
      .project-item { margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1px solid #eee; }
      .project-item:last-child { border-bottom: none; }
      .project-name { font-weight: 700; color: ${secondary}; font-size: 11px; }
      .project-contribution { display: inline-block; background: ${primary}; color: #fff; padding: 1px 6px; border-radius: 3px; font-size: 8px; margin-left: 8px; }
      .project-desc { color: #555; font-size: 10px; margin: 3px 0; }
      .project-tech { font-size: 9px; color: ${primary}; }
      .edu-item { margin-bottom: 10px; }
      .edu-degree { font-weight: 700; color: ${secondary}; font-size: 11px; }
      .edu-school { color: #555; font-size: 10px; }
      .edu-period { color: ${primary}; font-size: 10px; }
    </style>
  </head><body>
    <div class="page">
      <div class="sidebar">
        <div class="photo-placeholder">${data.name.split(' ').map(n => n[0]).join('')}</div>
        <h1>${data.name}</h1>
        <div class="title">${data.title}</div>
        
        <div class="sidebar-section">
          <h3>Contact</h3>
          <div class="contact-item"><div class="contact-icon">✉</div>${data.email}</div>
          <div class="contact-item"><div class="contact-icon">☎</div>${data.phone}</div>
          <div class="contact-item"><div class="contact-icon">📍</div>${data.location}</div>
          <div class="contact-item"><div class="contact-icon">in</div>${data.linkedin}</div>
          <div class="contact-item"><div class="contact-icon">⌨</div>${data.github}</div>
        </div>
        
        <div class="sidebar-section">
          <h3>Skills</h3>
          ${data.skills.map(skill => `
            <div class="skill-category">
              <div class="skill-category-title">${skill.category}</div>
              <div class="skill-tags">${skill.items.slice(0, 5).map(item => `<span class="skill-tag">${item}</span>`).join('')}</div>
            </div>
          `).join('')}
        </div>
        
        <div class="sidebar-section">
          <h3>Languages</h3>
          ${data.languages.map(lang => `<div class="lang-item"><span>${lang.name}</span><span>${lang.level}</span></div>`).join('')}
        </div>
      </div>
      
      <div class="main">
        <h2>Professional Summary</h2>
        <p class="summary">${data.summary}</p>
        
        <h2>Experience</h2>
        ${data.experience.map(exp => `
          <div class="exp-item">
            <div class="exp-header">
              <span class="exp-title">${exp.title}</span>
              <span class="exp-period">${exp.period}</span>
            </div>
            <div class="exp-company">${exp.company} • ${exp.location}</div>
            <ul class="exp-list">${exp.description.map(d => `<li>${d}</li>`).join('')}</ul>
          </div>
        `).join('')}
        
        <h2>Key Projects</h2>
        ${data.projects.slice(0, 4).map(proj => `
          <div class="project-item">
            <span class="project-name">${proj.name}</span>
            <span class="project-contribution">${proj.contribution}</span>
            <div class="project-desc">${proj.description}</div>
            <div class="project-tech">${proj.technologies}</div>
          </div>
        `).join('')}
        
        <h2>Education</h2>
        ${data.education.map(edu => `
          <div class="edu-item">
            <div class="edu-degree">${edu.degree}</div>
            <div class="edu-school">${edu.institution}</div>
            <div class="edu-period">${edu.period}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </body></html>`;
}

// Classic Professional Layout - Traditional single column
function generateClassicLayout(data: typeof portfolioData, primary: string, secondary: string, accent: string, font: string, common: string): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&family=Source+Sans+3:wght@400;600&display=swap" rel="stylesheet">
    <style>
      ${common}
      body { font-family: 'Source Sans 3', sans-serif; }
      .page { padding: 40px 50px; }
      .header { text-align: center; border-bottom: 3px double ${secondary}; padding-bottom: 20px; margin-bottom: 25px; }
      .name { font-family: 'Libre Baskerville', serif; font-size: 28px; font-weight: 700; color: ${secondary}; letter-spacing: 3px; margin-bottom: 5px; }
      .title { font-size: 14px; color: ${primary}; font-weight: 600; letter-spacing: 1px; margin-bottom: 12px; }
      .contact-row { display: flex; justify-content: center; flex-wrap: wrap; gap: 15px; font-size: 10px; color: #555; }
      .contact-row span { display: flex; align-items: center; gap: 4px; }
      .section { margin-bottom: 22px; }
      .section-title { font-family: 'Libre Baskerville', serif; font-size: 13px; font-weight: 700; color: ${secondary}; text-transform: uppercase; letter-spacing: 3px; border-bottom: 1px solid ${accent}; padding-bottom: 6px; margin-bottom: 12px; }
      .summary { text-align: justify; color: #444; line-height: 1.8; font-size: 11px; }
      .exp-item { margin-bottom: 18px; }
      .exp-row { display: flex; justify-content: space-between; align-items: baseline; }
      .exp-title { font-weight: 700; font-size: 12px; color: ${secondary}; }
      .exp-period { font-size: 10px; color: ${primary}; font-style: italic; }
      .exp-company { color: #666; font-size: 11px; font-style: italic; margin-bottom: 6px; }
      .exp-list { list-style: disc; padding-left: 20px; color: #555; font-size: 10px; }
      .exp-list li { margin-bottom: 3px; }
      .skills-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; }
      .skill-group h4 { font-weight: 700; font-size: 10px; color: ${secondary}; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px; }
      .skill-group p { font-size: 10px; color: #555; line-height: 1.6; }
      .projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
      .project-card { border: 1px solid #ddd; padding: 12px; }
      .project-name { font-weight: 700; font-size: 11px; color: ${secondary}; margin-bottom: 4px; }
      .project-type { font-size: 9px; color: ${primary}; font-weight: 600; margin-bottom: 4px; }
      .project-desc { font-size: 9px; color: #555; line-height: 1.5; }
      .edu-item { margin-bottom: 10px; }
      .edu-degree { font-weight: 700; font-size: 11px; color: ${secondary}; }
      .edu-details { font-size: 10px; color: #555; }
    </style>
  </head><body>
    <div class="page">
      <div class="header">
        <div class="name">${data.name.toUpperCase()}</div>
        <div class="title">${data.title}</div>
        <div class="contact-row">
          <span>✉ ${data.email}</span>
          <span>☎ ${data.phone}</span>
          <span>📍 ${data.location}</span>
          <span>in ${data.linkedin}</span>
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Professional Summary</div>
        <p class="summary">${data.summary}</p>
      </div>
      
      <div class="section">
        <div class="section-title">Professional Experience</div>
        ${data.experience.map(exp => `
          <div class="exp-item">
            <div class="exp-row">
              <span class="exp-title">${exp.title}</span>
              <span class="exp-period">${exp.period}</span>
            </div>
            <div class="exp-company">${exp.company}, ${exp.location}</div>
            <ul class="exp-list">${exp.description.map(d => `<li>${d}</li>`).join('')}</ul>
          </div>
        `).join('')}
      </div>
      
      <div class="section">
        <div class="section-title">Technical Skills</div>
        <div class="skills-grid">
          ${data.skills.map(skill => `
            <div class="skill-group">
              <h4>${skill.category}</h4>
              <p>${skill.items.join(', ')}</p>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Notable Projects</div>
        <div class="projects-grid">
          ${data.projects.slice(0, 4).map(proj => `
            <div class="project-card">
              <div class="project-name">${proj.name}</div>
              <div class="project-type">${proj.contribution} Development</div>
              <div class="project-desc">${proj.description}</div>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Education</div>
        ${data.education.map(edu => `
          <div class="edu-item">
            <div class="edu-degree">${edu.degree}</div>
            <div class="edu-details">${edu.institution} | ${edu.period}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </body></html>`;
}

// Minimal Clean Layout - Ultra clean with whitespace
function generateMinimalLayout(data: typeof portfolioData, primary: string, secondary: string, accent: string, font: string, common: string): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
      ${common}
      body { font-family: 'Inter', -apple-system, sans-serif; background: #fff; }
      .page { padding: 50px 60px; max-width: 750px; }
      .header { margin-bottom: 35px; }
      .name { font-size: 32px; font-weight: 700; color: ${secondary}; letter-spacing: -0.5px; margin-bottom: 4px; }
      .title { font-size: 14px; color: ${accent}; font-weight: 500; margin-bottom: 15px; }
      .contact-line { display: flex; gap: 20px; font-size: 10px; color: #666; flex-wrap: wrap; }
      .divider { width: 50px; height: 3px; background: ${primary}; margin: 30px 0; }
      .section { margin-bottom: 28px; }
      .section-title { font-size: 10px; font-weight: 700; color: ${primary}; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; }
      .summary { font-size: 12px; color: #444; line-height: 1.8; font-weight: 300; }
      .exp-item { margin-bottom: 22px; position: relative; padding-left: 15px; }
      .exp-item:before { content: ''; position: absolute; left: 0; top: 6px; width: 5px; height: 5px; background: ${primary}; border-radius: 50%; }
      .exp-header { margin-bottom: 5px; }
      .exp-title { font-size: 13px; font-weight: 600; color: ${secondary}; }
      .exp-meta { font-size: 10px; color: ${accent}; margin-bottom: 8px; }
      .exp-list { list-style: none; font-size: 10px; color: #555; }
      .exp-list li { margin-bottom: 4px; padding-left: 12px; position: relative; }
      .exp-list li:before { content: '—'; position: absolute; left: 0; color: ${accent}; }
      .skills-row { display: flex; flex-wrap: wrap; gap: 8px; }
      .skill-pill { background: #f5f5f5; padding: 5px 12px; border-radius: 20px; font-size: 10px; color: #444; }
      .projects-list { display: flex; flex-direction: column; gap: 12px; }
      .project-row { display: flex; gap: 15px; align-items: baseline; }
      .project-name { font-weight: 600; font-size: 11px; color: ${secondary}; min-width: 180px; }
      .project-desc { font-size: 10px; color: #666; flex: 1; }
      .edu-row { display: flex; justify-content: space-between; align-items: baseline; }
      .edu-degree { font-weight: 600; font-size: 11px; color: ${secondary}; }
      .edu-details { font-size: 10px; color: #666; }
    </style>
  </head><body>
    <div class="page">
      <div class="header">
        <div class="name">${data.name}</div>
        <div class="title">${data.title}</div>
        <div class="contact-line">
          <span>${data.email}</span>
          <span>${data.phone}</span>
          <span>${data.location}</span>
          <span>${data.linkedin}</span>
        </div>
      </div>
      
      <div class="divider"></div>
      
      <div class="section">
        <p class="summary">${data.summary}</p>
      </div>
      
      <div class="section">
        <div class="section-title">Experience</div>
        ${data.experience.map(exp => `
          <div class="exp-item">
            <div class="exp-header">
              <div class="exp-title">${exp.title}</div>
            </div>
            <div class="exp-meta">${exp.company} · ${exp.location} · ${exp.period}</div>
            <ul class="exp-list">${exp.description.slice(0, 3).map(d => `<li>${d}</li>`).join('')}</ul>
          </div>
        `).join('')}
      </div>
      
      <div class="section">
        <div class="section-title">Skills</div>
        <div class="skills-row">
          ${data.skills.flatMap(s => s.items.slice(0, 4)).map(skill => `<span class="skill-pill">${skill}</span>`).join('')}
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Projects</div>
        <div class="projects-list">
          ${data.projects.slice(0, 4).map(proj => `
            <div class="project-row">
              <span class="project-name">${proj.name}</span>
              <span class="project-desc">${proj.technologies}</span>
            </div>
          `).join('')}
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Education</div>
        <div class="edu-row">
          <span class="edu-degree">${data.education[0].degree}</span>
          <span class="edu-details">${data.education[0].institution} · ${data.education[0].period}</span>
        </div>
      </div>
    </div>
  </body></html>`;
}

// Executive Premium Layout - Premium with gold accents
function generateExecutiveLayout(data: typeof portfolioData, primary: string, secondary: string, accent: string, font: string, common: string): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
      ${common}
      body { font-family: 'Lato', sans-serif; background: #fefefe; }
      .page { padding: 0; }
      .header { background: linear-gradient(135deg, ${secondary} 0%, #2a1a05 100%); color: #fff; padding: 40px 50px; text-align: center; position: relative; }
      .header:after { content: ''; position: absolute; bottom: -15px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 30px solid transparent; border-right: 30px solid transparent; border-top: 15px solid ${secondary}; }
      .name { font-family: 'Playfair Display', serif; font-size: 30px; font-weight: 700; letter-spacing: 4px; margin-bottom: 8px; }
      .title { font-size: 13px; color: ${accent}; font-weight: 300; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 15px; }
      .contact-row { display: flex; justify-content: center; gap: 25px; font-size: 10px; color: rgba(255,255,255,0.8); flex-wrap: wrap; }
      .main-content { padding: 50px; }
      .section { margin-bottom: 30px; }
      .section-header { display: flex; align-items: center; margin-bottom: 18px; }
      .section-icon { width: 35px; height: 35px; background: ${accent}; color: ${secondary}; display: flex; align-items: center; justify-content: center; font-size: 14px; margin-right: 12px; }
      .section-title { font-family: 'Playfair Display', serif; font-size: 16px; font-weight: 600; color: ${secondary}; letter-spacing: 1px; }
      .gold-line { flex: 1; height: 1px; background: linear-gradient(90deg, ${accent}, transparent); margin-left: 15px; }
      .summary { font-size: 12px; color: #444; line-height: 1.9; font-weight: 300; padding: 20px; background: #faf8f5; border-left: 3px solid ${accent}; }
      .exp-item { margin-bottom: 22px; padding: 18px; background: #fff; border: 1px solid #eee; box-shadow: 0 2px 8px rgba(0,0,0,0.04); }
      .exp-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
      .exp-title { font-weight: 700; font-size: 13px; color: ${secondary}; }
      .exp-period { background: ${accent}; color: ${secondary}; padding: 3px 10px; font-size: 9px; font-weight: 700; }
      .exp-company { color: ${primary}; font-size: 11px; font-weight: 600; margin-bottom: 10px; }
      .exp-list { list-style: none; font-size: 10px; color: #555; }
      .exp-list li { margin-bottom: 5px; padding-left: 15px; position: relative; }
      .exp-list li:before { content: '◆'; position: absolute; left: 0; color: ${accent}; font-size: 6px; top: 2px; }
      .skills-container { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
      .skill-box { background: #faf8f5; padding: 15px; border-bottom: 2px solid ${accent}; }
      .skill-title { font-weight: 700; font-size: 11px; color: ${secondary}; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px; }
      .skill-items { font-size: 10px; color: #555; line-height: 1.8; }
      .projects-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
      .project-card { padding: 15px; border: 1px solid #ddd; position: relative; overflow: hidden; }
      .project-card:before { content: ''; position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: ${accent}; }
      .project-name { font-weight: 700; font-size: 11px; color: ${secondary}; margin-bottom: 5px; }
      .project-badge { display: inline-block; background: ${secondary}; color: ${accent}; padding: 2px 8px; font-size: 8px; font-weight: 700; margin-bottom: 8px; }
      .project-desc { font-size: 9px; color: #666; line-height: 1.6; }
      .edu-box { background: linear-gradient(135deg, ${secondary} 0%, #2a1a05 100%); color: #fff; padding: 20px; text-align: center; }
      .edu-degree { font-family: 'Playfair Display', serif; font-size: 14px; font-weight: 600; margin-bottom: 5px; }
      .edu-school { font-size: 11px; color: ${accent}; }
      .edu-period { font-size: 10px; color: rgba(255,255,255,0.7); margin-top: 5px; }
    </style>
  </head><body>
    <div class="page">
      <div class="header">
        <div class="name">${data.name.toUpperCase()}</div>
        <div class="title">${data.title}</div>
        <div class="contact-row">
          <span>✉ ${data.email}</span>
          <span>☎ ${data.phone}</span>
          <span>📍 ${data.location}</span>
        </div>
      </div>
      
      <div class="main-content">
        <div class="section">
          <div class="section-header">
            <div class="section-icon">★</div>
            <div class="section-title">Executive Summary</div>
            <div class="gold-line"></div>
          </div>
          <p class="summary">${data.summary}</p>
        </div>
        
        <div class="section">
          <div class="section-header">
            <div class="section-icon">◈</div>
            <div class="section-title">Professional Experience</div>
            <div class="gold-line"></div>
          </div>
          ${data.experience.slice(0, 3).map(exp => `
            <div class="exp-item">
              <div class="exp-row">
                <span class="exp-title">${exp.title}</span>
                <span class="exp-period">${exp.period}</span>
              </div>
              <div class="exp-company">${exp.company} | ${exp.location}</div>
              <ul class="exp-list">${exp.description.slice(0, 3).map(d => `<li>${d}</li>`).join('')}</ul>
            </div>
          `).join('')}
        </div>
        
        <div class="section">
          <div class="section-header">
            <div class="section-icon">⚡</div>
            <div class="section-title">Core Competencies</div>
            <div class="gold-line"></div>
          </div>
          <div class="skills-container">
            ${data.skills.slice(0, 4).map(skill => `
              <div class="skill-box">
                <div class="skill-title">${skill.category}</div>
                <div class="skill-items">${skill.items.join(' • ')}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="section">
          <div class="section-header">
            <div class="section-icon">◉</div>
            <div class="section-title">Key Projects</div>
            <div class="gold-line"></div>
          </div>
          <div class="projects-grid">
            ${data.projects.slice(0, 4).map(proj => `
              <div class="project-card">
                <div class="project-name">${proj.name}</div>
                <div class="project-badge">${proj.contribution}</div>
                <div class="project-desc">${proj.description}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <div class="edu-box">
          <div class="edu-degree">${data.education[0].degree}</div>
          <div class="edu-school">${data.education[0].institution}</div>
          <div class="edu-period">${data.education[0].period}</div>
        </div>
      </div>
    </div>
  </body></html>`;
}

// Creative Timeline Layout - Visual timeline design
function generateCreativeLayout(data: typeof portfolioData, primary: string, secondary: string, accent: string, font: string, common: string): string {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
      ${common}
      body { font-family: 'Poppins', sans-serif; background: #fafafa; }
      .page { padding: 40px; }
      .header { display: flex; gap: 25px; margin-bottom: 30px; padding: 25px; background: linear-gradient(135deg, ${secondary} 0%, ${primary} 100%); border-radius: 15px; color: #fff; }
      .avatar { width: 90px; height: 90px; background: ${accent}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; font-weight: 700; flex-shrink: 0; color: ${secondary}; }
      .header-info { flex: 1; }
      .name { font-size: 24px; font-weight: 700; margin-bottom: 3px; }
      .title { font-size: 12px; color: ${accent}; font-weight: 500; margin-bottom: 10px; }
      .contact-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 5px; font-size: 9px; color: rgba(255,255,255,0.85); }
      .two-column { display: grid; grid-template-columns: 250px 1fr; gap: 30px; }
      .left-col, .right-col { }
      .section { margin-bottom: 25px; }
      .section-title { display: inline-flex; align-items: center; gap: 8px; background: ${primary}; color: #fff; padding: 6px 15px; border-radius: 20px; font-size: 11px; font-weight: 600; margin-bottom: 15px; }
      .section-title span { font-size: 14px; }
      .summary { font-size: 11px; color: #555; line-height: 1.8; padding: 15px; background: #fff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
      .timeline { position: relative; padding-left: 20px; }
      .timeline:before { content: ''; position: absolute; left: 5px; top: 5px; bottom: 5px; width: 2px; background: linear-gradient(180deg, ${primary}, ${accent}); border-radius: 2px; }
      .timeline-item { position: relative; margin-bottom: 20px; padding: 12px 15px; background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
      .timeline-item:before { content: ''; position: absolute; left: -19px; top: 15px; width: 10px; height: 10px; background: ${primary}; border-radius: 50%; border: 2px solid #fff; }
      .timeline-title { font-weight: 600; font-size: 12px; color: ${secondary}; margin-bottom: 3px; }
      .timeline-meta { font-size: 9px; color: ${primary}; margin-bottom: 8px; }
      .timeline-desc { font-size: 9px; color: #666; line-height: 1.6; }
      .skills-bubbles { display: flex; flex-wrap: wrap; gap: 8px; }
      .skill-bubble { background: linear-gradient(135deg, ${primary}22, ${accent}22); border: 1px solid ${primary}44; padding: 6px 12px; border-radius: 20px; font-size: 9px; color: ${secondary}; font-weight: 500; }
      .project-cards { display: flex; flex-direction: column; gap: 10px; }
      .project-card { padding: 12px; background: #fff; border-radius: 8px; border-left: 3px solid ${primary}; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
      .project-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
      .project-name { font-weight: 600; font-size: 11px; color: ${secondary}; }
      .project-tag { background: ${accent}; color: ${secondary}; padding: 2px 8px; border-radius: 10px; font-size: 8px; font-weight: 600; }
      .project-tech { font-size: 9px; color: #666; }
      .lang-list { display: flex; flex-wrap: wrap; gap: 10px; }
      .lang-item { background: #fff; padding: 8px 15px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); display: flex; align-items: center; gap: 8px; }
      .lang-flag { font-size: 16px; }
      .lang-info { }
      .lang-name { font-weight: 600; font-size: 10px; color: ${secondary}; }
      .lang-level { font-size: 8px; color: #666; }
      .edu-card { background: linear-gradient(135deg, ${primary}15, ${accent}15); padding: 15px; border-radius: 10px; text-align: center; }
      .edu-icon { font-size: 24px; margin-bottom: 8px; }
      .edu-degree { font-weight: 600; font-size: 11px; color: ${secondary}; margin-bottom: 3px; }
      .edu-school { font-size: 10px; color: #666; }
      .edu-year { font-size: 9px; color: ${primary}; font-weight: 600; margin-top: 5px; }
    </style>
  </head><body>
    <div class="page">
      <div class="header">
        <div class="avatar">${data.name.split(' ').map(n => n[0]).join('')}</div>
        <div class="header-info">
          <div class="name">${data.name}</div>
          <div class="title">${data.title}</div>
          <div class="contact-grid">
            <span>✉ ${data.email}</span>
            <span>☎ ${data.phone}</span>
            <span>📍 ${data.location}</span>
            <span>🔗 ${data.linkedin}</span>
          </div>
        </div>
      </div>
      
      <div class="two-column">
        <div class="left-col">
          <div class="section">
            <div class="section-title"><span>🎯</span> Skills</div>
            <div class="skills-bubbles">
              ${data.skills.flatMap(s => s.items.slice(0, 3)).map(skill => `<span class="skill-bubble">${skill}</span>`).join('')}
            </div>
          </div>
          
          <div class="section">
            <div class="section-title"><span>🚀</span> Projects</div>
            <div class="project-cards">
              ${data.projects.slice(0, 4).map(proj => `
                <div class="project-card">
                  <div class="project-header">
                    <span class="project-name">${proj.name}</span>
                    <span class="project-tag">${proj.contribution}</span>
                  </div>
                  <div class="project-tech">${proj.technologies}</div>
                </div>
              `).join('')}
            </div>
          </div>
          
          <div class="section">
            <div class="section-title"><span>🌍</span> Languages</div>
            <div class="lang-list">
              ${data.languages.map(lang => `
                <div class="lang-item">
                  <div class="lang-info">
                    <div class="lang-name">${lang.name}</div>
                    <div class="lang-level">${lang.level}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          
          <div class="section">
            <div class="section-title"><span>🎓</span> Education</div>
            <div class="edu-card">
              <div class="edu-icon">📚</div>
              <div class="edu-degree">${data.education[0].degree}</div>
              <div class="edu-school">${data.education[0].institution}</div>
              <div class="edu-year">${data.education[0].period}</div>
            </div>
          </div>
        </div>
        
        <div class="right-col">
          <div class="section">
            <div class="section-title"><span>💼</span> About Me</div>
            <div class="summary">${data.summary}</div>
          </div>
          
          <div class="section">
            <div class="section-title"><span>📈</span> Experience Timeline</div>
            <div class="timeline">
              ${data.experience.map(exp => `
                <div class="timeline-item">
                  <div class="timeline-title">${exp.title}</div>
                  <div class="timeline-meta">${exp.company} • ${exp.period}</div>
                  <div class="timeline-desc">${exp.description.slice(0, 2).join('. ')}.</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  </body></html>`;
}

export const generateCV = async (format: 'pdf' | 'docx', themeId: CVTheme = 'modern'): Promise<void> => {
  const theme = cvThemes.find(t => t.id === themeId) || cvThemes[0];
  const html = generateCVHTML(theme);
  
  if (format === 'pdf') {
    const element = document.createElement('div');
    element.innerHTML = html;
    document.body.appendChild(element);
    
    const options = {
      margin: 0,
      filename: `${portfolioData.name.replace(/\s+/g, '_')}_CV_${theme.name.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    await html2pdf().set(options).from(element).save();
    document.body.removeChild(element);
  } else if (format === 'docx') {
    const blob = new Blob([html], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${portfolioData.name.replace(/\s+/g, '_')}_CV_${theme.name.replace(/\s+/g, '_')}.doc`;
    link.click();
    URL.revokeObjectURL(link.href);
  }
};
