import html2pdf from 'html2pdf.js';

// Complete portfolio data from actual portfolio components
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
      items: ["Swift", "SwiftUI", "UIKit", "Core Data", "Core Animation", "Push Notifications", "In-App Purchases", "REST APIs", "AVFoundation"]
    },
    {
      category: "Cross-Platform",
      items: ["React Native", "Expo", "Redux", "React Navigation", "TypeScript"]
    },
    {
      category: "MERN Stack",
      items: ["MongoDB", "Express.js", "React.js", "Node.js", "Redux Toolkit", "TypeScript", "Next.js"]
    },
    {
      category: "Backend & APIs",
      items: ["RESTful APIs", "GraphQL", "Strapi CMS", "Firebase", "Cloud Functions", "WebSocket", "Socket.io", "Cron Jobs"]
    },
    {
      category: "AI & Innovation",
      items: ["OpenAI Integration", "AI-powered Features", "Content Generation", "Smart Automation"]
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "Xcode", "VS Code", "Figma", "Jira", "App Store Connect", "TestFlight", "Play Store Console"]
    }
  ],
  
  experience: [
    {
      title: "Freelancer",
      company: "Self-employed",
      location: "Remote",
      period: "Oct 2024 - Present",
      description: [
        "iOS development using Swift, SwiftUI, and UIKit for various clients",
        "MERN stack development and cross-platform React Native solutions",
        "Building scalable web applications and mobile apps"
      ]
    },
    {
      title: "Senior iOS Developer",
      company: "iParagons",
      location: "Gujrat, Pakistan",
      period: "Jul 2024 - Present",
      description: [
        "Built Leaf iOS app - AI-powered event planning app using Swift, SwiftUI, and Core Data with backend integrations",
        "Developed backend services including Node.js APIs, cron jobs, and cloud functions",
        "Integrated third-party APIs from Partiful, Luma, Eventbrite, SeatGeek, and Fandango",
        "Implemented AI-driven features using OpenAI APIs for event description generation and micro-planner assistant"
      ]
    },
    {
      title: "MERN Stack Developer",
      company: "iParagons",
      location: "Gujrat, Pakistan",
      period: "Nov 2022 - Present",
      description: [
        "Full-stack web development using MongoDB, Express.js, React.js, and Node.js",
        "Built admin dashboards with analytics, reporting tools, and real-time data management",
        "Developed REST APIs integrated with mobile applications",
        "Implemented user management systems and data visualization features"
      ]
    },
    {
      title: "Junior iOS Developer",
      company: "iParagons",
      location: "Gujrat, Pakistan",
      period: "Nov 2020 - Jun 2024",
      description: [
        "Designed Home Tab features including location views, people views, and multi-select 'Make Plans' flow",
        "Developed real-time In-App Notifications module and Collections module",
        "Built Explore Page with advanced filters and Custom Community Calendar",
        "Implemented Split the Bill functionality, Edit Profile module, and performance optimizations"
      ]
    },
    {
      title: "Freelance Developer",
      company: "Self-employed",
      location: "Remote",
      period: "Jul 2021 - May 2023",
      description: [
        "Delivered multiple iOS apps including Ombi, Creator Music Studio, and The Track App",
        "Built Vooconnect social platform with iOS frontend and Node.js backend",
        "Cross-platform React Native solutions and MERN stack development"
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
      name: "MPower Pro",
      description: "Cross-platform music creation app with multitrack DAW, AI guidance, daily mood check-ins, goal tracking, and social collaboration. Seven apps in one platform.",
      technologies: "iOS, Android, React Native, Strapi Backend, AI",
      contribution: "Full-Stack",
      link: "apps.apple.com/app/mpower-pro/id6443431786"
    },
    {
      name: "Leaf - Book Your Friends",
      description: "AI-powered event planner with smart checklists, group scheduler, and event import from Partiful, Luma, Eventbrite, SeatGeek, and Fandango.",
      technologies: "iOS, Swift, SwiftUI, Node.js, Cloud Functions, AI",
      contribution: "Full-Stack",
      link: "apps.apple.com/app/leaf-book-your-friends/id1040588046"
    },
    {
      name: "Vooconnect",
      description: "Social networking platform with full-screen posts, live streaming, chat with walkie-talkie, marketplace, and content creator subscriptions.",
      technologies: "iOS, Swift, SwiftUI, Node.js, MongoDB",
      contribution: "Full-Stack",
      link: "apps.apple.com/app/vooconnect/id1573637452"
    },
    {
      name: "Leaf Admin Dashboard",
      description: "Admin dashboard for Leaf iOS app with user management, analytics, event monitoring, and comprehensive reporting tools.",
      technologies: "React, Node.js, MongoDB, Express, Analytics",
      contribution: "Full-Stack",
      link: "admin.joinleaf.com"
    },
    {
      name: "Ombi - Preview Restaurants",
      description: "iOS app for previewing and booking restaurants through immersive video experiences showcasing atmosphere and cuisine.",
      technologies: "iOS, Swift, UIKit, Video Streaming",
      contribution: "Frontend",
      link: "apps.apple.com/app/ombi/id1598753264"
    },
    {
      name: "Creator Music Studio",
      description: "All-in-one music creation app with AI-powered lyrics, melody generation, Auto-Tune effects, and Creator Feed for sharing tracks.",
      technologies: "iOS, Swift, Audio Production, AI",
      contribution: "Frontend",
      link: "apps.apple.com/app/creator-music-studio/id6445974873"
    },
    {
      name: "The Track App",
      description: "Fast, minimalistic calendar and scheduling platform with real-time event syncing and intuitive user interface.",
      technologies: "Swift, SwiftUI, Event Planning",
      contribution: "Frontend",
      link: "thetrackapp.com"
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
    fontFamily: "'Segoe UI', Arial, sans-serif",
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
    fontFamily: "'Georgia', serif",
    previewBg: 'linear-gradient(135deg, #92400e 0%, #fbbf24 100%)'
  },
  {
    id: 'creative',
    name: 'Creative Timeline',
    description: 'Modern with visual timeline',
    primaryColor: '#7c3aed',
    secondaryColor: '#4c1d95',
    accentColor: '#a78bfa',
    fontFamily: "'Segoe UI', sans-serif",
    previewBg: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)'
  }
];

// Print-optimized common styles
const getPrintStyles = () => `
  @page { margin: 0; size: A4; }
  @media print {
    body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-size: 10pt; line-height: 1.4; color: #333; background: #fff; }
  .page { width: 210mm; min-height: 297mm; margin: 0 auto; }
`;

// Generate different HTML layouts based on theme
export const generateCVHTML = (theme: ThemeConfig): string => {
  const { id } = theme;
  const data = portfolioData;

  switch (id) {
    case 'modern':
      return generateModernSidebarLayout(data, theme);
    case 'classic':
      return generateClassicLayout(data, theme);
    case 'minimal':
      return generateMinimalLayout(data, theme);
    case 'executive':
      return generateExecutiveLayout(data, theme);
    case 'creative':
      return generateCreativeLayout(data, theme);
    default:
      return generateModernSidebarLayout(data, theme);
  }
};

// Modern Sidebar Layout - Two columns with left sidebar (TABLE-BASED for PDF)
function generateModernSidebarLayout(data: typeof portfolioData, theme: ThemeConfig): string {
  const { primaryColor, secondaryColor, accentColor } = theme;
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <style>
      ${getPrintStyles()}
      body { font-family: 'Segoe UI', Arial, sans-serif; }
      .page { padding: 0; }
      table.main-layout { width: 100%; border-collapse: collapse; }
      .sidebar { width: 220px; background: ${secondaryColor}; color: #fff; padding: 25px 18px; vertical-align: top; }
      .main-content { padding: 25px; vertical-align: top; background: #fff; }
      .photo-circle { width: 100px; height: 100px; border-radius: 50%; background: ${accentColor}; margin: 0 auto 15px; text-align: center; line-height: 100px; font-size: 32px; font-weight: 700; color: #fff; }
      .sidebar-name { font-size: 18px; text-align: center; font-weight: 700; margin-bottom: 3px; }
      .sidebar-title { text-align: center; color: ${accentColor}; font-size: 11px; margin-bottom: 20px; }
      .sidebar-section { margin-bottom: 18px; }
      .sidebar-section-title { font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 1px solid ${accentColor}; padding-bottom: 4px; margin-bottom: 10px; color: ${accentColor}; font-weight: 600; }
      .contact-item { margin-bottom: 6px; font-size: 9px; word-break: break-all; }
      .contact-icon { display: inline-block; width: 14px; height: 14px; background: ${accentColor}; border-radius: 2px; text-align: center; line-height: 14px; font-size: 8px; margin-right: 6px; vertical-align: middle; }
      .skill-category { margin-bottom: 10px; }
      .skill-category-title { font-size: 9px; font-weight: 600; margin-bottom: 3px; }
      .skill-tag { display: inline-block; background: rgba(255,255,255,0.15); padding: 2px 5px; border-radius: 2px; font-size: 8px; margin: 1px 2px 1px 0; }
      .lang-item { font-size: 9px; margin-bottom: 4px; }
      .main-section-title { font-size: 13px; color: ${secondaryColor}; text-transform: uppercase; letter-spacing: 1.5px; border-bottom: 2px solid ${primaryColor}; padding-bottom: 4px; margin-bottom: 12px; margin-top: 18px; font-weight: 600; }
      .main-section-title:first-child { margin-top: 0; }
      .summary { color: #444; line-height: 1.6; font-size: 10px; }
      .exp-item { margin-bottom: 14px; }
      .exp-header { margin-bottom: 2px; }
      .exp-title { font-weight: 700; font-size: 11px; color: ${secondaryColor}; display: inline; }
      .exp-period { font-size: 9px; color: ${primaryColor}; font-weight: 600; float: right; }
      .exp-company { color: #666; font-size: 10px; margin-bottom: 4px; }
      .exp-list { padding-left: 15px; margin: 0; }
      .exp-list li { margin-bottom: 2px; color: #555; font-size: 9px; }
      .project-item { margin-bottom: 10px; padding-bottom: 8px; border-bottom: 1px solid #eee; }
      .project-item:last-child { border-bottom: none; }
      .project-name { font-weight: 700; color: ${secondaryColor}; font-size: 10px; display: inline; }
      .project-badge { display: inline-block; background: ${primaryColor}; color: #fff; padding: 1px 5px; border-radius: 2px; font-size: 7px; margin-left: 6px; vertical-align: middle; }
      .project-desc { color: #555; font-size: 9px; margin: 2px 0; }
      .project-tech { font-size: 8px; color: ${primaryColor}; }
      .edu-degree { font-weight: 700; color: ${secondaryColor}; font-size: 10px; }
      .edu-school { color: #555; font-size: 9px; }
      .edu-period { color: ${primaryColor}; font-size: 9px; }
    </style>
  </head><body>
    <div class="page">
      <table class="main-layout">
        <tr>
          <td class="sidebar">
            <div class="photo-circle">${data.name.split(' ').map(n => n[0]).join('')}</div>
            <div class="sidebar-name">${data.name}</div>
            <div class="sidebar-title">${data.title}</div>
            
            <div class="sidebar-section">
              <div class="sidebar-section-title">Contact</div>
              <div class="contact-item"><span class="contact-icon">✉</span>${data.email}</div>
              <div class="contact-item"><span class="contact-icon">☎</span>${data.phone}</div>
              <div class="contact-item"><span class="contact-icon">📍</span>${data.location}</div>
              <div class="contact-item"><span class="contact-icon">in</span>${data.linkedin}</div>
              <div class="contact-item"><span class="contact-icon">⌨</span>${data.github}</div>
            </div>
            
            <div class="sidebar-section">
              <div class="sidebar-section-title">Skills</div>
              ${data.skills.map(skill => `
                <div class="skill-category">
                  <div class="skill-category-title">${skill.category}</div>
                  <div>${skill.items.slice(0, 5).map(item => `<span class="skill-tag">${item}</span>`).join('')}</div>
                </div>
              `).join('')}
            </div>
            
            <div class="sidebar-section">
              <div class="sidebar-section-title">Languages</div>
              ${data.languages.map(lang => `<div class="lang-item">${lang.name} - ${lang.level}</div>`).join('')}
            </div>
          </td>
          
          <td class="main-content">
            <div class="main-section-title">Professional Summary</div>
            <p class="summary">${data.summary}</p>
            
            <div class="main-section-title">Experience</div>
            ${data.experience.slice(0, 4).map(exp => `
              <div class="exp-item">
                <div class="exp-header">
                  <span class="exp-title">${exp.title}</span>
                  <span class="exp-period">${exp.period}</span>
                </div>
                <div class="exp-company">${exp.company} • ${exp.location}</div>
                <ul class="exp-list">${exp.description.slice(0, 3).map(d => `<li>${d}</li>`).join('')}</ul>
              </div>
            `).join('')}
            
            <div class="main-section-title">Key Projects</div>
            ${data.projects.slice(0, 5).map(proj => `
              <div class="project-item">
                <span class="project-name">${proj.name}</span>
                <span class="project-badge">${proj.contribution}</span>
                <div class="project-desc">${proj.description}</div>
                <div class="project-tech">${proj.technologies}</div>
              </div>
            `).join('')}
            
            <div class="main-section-title">Education</div>
            ${data.education.map(edu => `
              <div>
                <div class="edu-degree">${edu.degree}</div>
                <div class="edu-school">${edu.institution}</div>
                <div class="edu-period">${edu.period}</div>
              </div>
            `).join('')}
          </td>
        </tr>
      </table>
    </div>
  </body></html>`;
}

// Classic Professional Layout - Traditional single column
function generateClassicLayout(data: typeof portfolioData, theme: ThemeConfig): string {
  const { primaryColor, secondaryColor, accentColor } = theme;
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <style>
      ${getPrintStyles()}
      body { font-family: Georgia, 'Times New Roman', serif; }
      .page { padding: 35px 45px; }
      .header { text-align: center; border-bottom: 3px double ${secondaryColor}; padding-bottom: 18px; margin-bottom: 20px; }
      .name { font-size: 26px; font-weight: 700; color: ${secondaryColor}; letter-spacing: 2px; margin-bottom: 4px; }
      .title { font-size: 13px; color: ${primaryColor}; font-weight: 600; letter-spacing: 1px; margin-bottom: 10px; }
      .contact-row { font-size: 9px; color: #555; }
      .contact-row span { margin: 0 8px; }
      .section { margin-bottom: 18px; }
      .section-title { font-size: 12px; font-weight: 700; color: ${secondaryColor}; text-transform: uppercase; letter-spacing: 2px; border-bottom: 1px solid ${accentColor}; padding-bottom: 4px; margin-bottom: 10px; }
      .summary { text-align: justify; color: #444; line-height: 1.7; font-size: 10px; }
      .exp-item { margin-bottom: 14px; }
      .exp-row { margin-bottom: 2px; }
      .exp-title { font-weight: 700; font-size: 11px; color: ${secondaryColor}; }
      .exp-period { font-size: 9px; color: ${primaryColor}; font-style: italic; float: right; }
      .exp-company { color: #666; font-size: 10px; font-style: italic; margin-bottom: 4px; }
      .exp-list { list-style: disc; padding-left: 18px; color: #555; font-size: 9px; margin: 0; }
      .exp-list li { margin-bottom: 2px; }
      .skills-table { width: 100%; }
      .skills-table td { vertical-align: top; padding: 0 10px 10px 0; width: 33.33%; }
      .skill-group-title { font-weight: 700; font-size: 9px; color: ${secondaryColor}; margin-bottom: 3px; text-transform: uppercase; letter-spacing: 0.5px; }
      .skill-group-items { font-size: 9px; color: #555; line-height: 1.5; }
      .projects-table { width: 100%; }
      .projects-table td { vertical-align: top; padding: 8px; width: 50%; border: 1px solid #ddd; }
      .project-name { font-weight: 700; font-size: 10px; color: ${secondaryColor}; margin-bottom: 3px; }
      .project-type { font-size: 8px; color: ${primaryColor}; font-weight: 600; margin-bottom: 3px; }
      .project-desc { font-size: 8px; color: #555; line-height: 1.4; }
      .edu-degree { font-weight: 700; font-size: 10px; color: ${secondaryColor}; }
      .edu-details { font-size: 9px; color: #555; }
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
        ${data.experience.slice(0, 4).map(exp => `
          <div class="exp-item">
            <div class="exp-row">
              <span class="exp-title">${exp.title}</span>
              <span class="exp-period">${exp.period}</span>
            </div>
            <div class="exp-company">${exp.company}, ${exp.location}</div>
            <ul class="exp-list">${exp.description.slice(0, 3).map(d => `<li>${d}</li>`).join('')}</ul>
          </div>
        `).join('')}
      </div>
      
      <div class="section">
        <div class="section-title">Technical Skills</div>
        <table class="skills-table">
          <tr>
            ${data.skills.slice(0, 3).map(skill => `
              <td>
                <div class="skill-group-title">${skill.category}</div>
                <div class="skill-group-items">${skill.items.join(', ')}</div>
              </td>
            `).join('')}
          </tr>
          <tr>
            ${data.skills.slice(3, 6).map(skill => `
              <td>
                <div class="skill-group-title">${skill.category}</div>
                <div class="skill-group-items">${skill.items.join(', ')}</div>
              </td>
            `).join('')}
          </tr>
        </table>
      </div>
      
      <div class="section">
        <div class="section-title">Notable Projects</div>
        <table class="projects-table">
          <tr>
            ${data.projects.slice(0, 2).map(proj => `
              <td>
                <div class="project-name">${proj.name}</div>
                <div class="project-type">${proj.contribution} Development</div>
                <div class="project-desc">${proj.description}</div>
              </td>
            `).join('')}
          </tr>
          <tr>
            ${data.projects.slice(2, 4).map(proj => `
              <td>
                <div class="project-name">${proj.name}</div>
                <div class="project-type">${proj.contribution} Development</div>
                <div class="project-desc">${proj.description}</div>
              </td>
            `).join('')}
          </tr>
        </table>
      </div>
      
      <div class="section">
        <div class="section-title">Education</div>
        ${data.education.map(edu => `
          <div>
            <div class="edu-degree">${edu.degree}</div>
            <div class="edu-details">${edu.institution} | ${edu.period}</div>
          </div>
        `).join('')}
      </div>
    </div>
  </body></html>`;
}

// Minimal Clean Layout - Ultra clean with whitespace
function generateMinimalLayout(data: typeof portfolioData, theme: ThemeConfig): string {
  const { primaryColor, secondaryColor, accentColor } = theme;
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <style>
      ${getPrintStyles()}
      body { font-family: 'Helvetica Neue', Arial, sans-serif; }
      .page { padding: 45px 55px; }
      .header { margin-bottom: 25px; }
      .name { font-size: 28px; font-weight: 700; color: ${secondaryColor}; letter-spacing: -0.5px; margin-bottom: 3px; }
      .title { font-size: 13px; color: ${accentColor}; font-weight: 500; margin-bottom: 12px; }
      .contact-line { font-size: 9px; color: #666; }
      .contact-line span { margin-right: 15px; }
      .divider { width: 40px; height: 3px; background: ${primaryColor}; margin: 22px 0; }
      .section { margin-bottom: 22px; }
      .section-title { font-size: 9px; font-weight: 700; color: ${primaryColor}; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 12px; }
      .summary { font-size: 11px; color: #444; line-height: 1.7; font-weight: 300; }
      .exp-item { margin-bottom: 16px; padding-left: 12px; border-left: 3px solid ${primaryColor}; }
      .exp-title { font-size: 12px; font-weight: 600; color: ${secondaryColor}; margin-bottom: 2px; }
      .exp-meta { font-size: 9px; color: ${accentColor}; margin-bottom: 6px; }
      .exp-list { list-style: none; font-size: 9px; color: #555; padding: 0; margin: 0; }
      .exp-list li { margin-bottom: 3px; padding-left: 10px; position: relative; }
      .exp-list li:before { content: '—'; position: absolute; left: 0; color: ${accentColor}; }
      .skills-inline { font-size: 9px; color: #444; line-height: 1.8; }
      .skill-pill { display: inline-block; background: #f5f5f5; padding: 3px 10px; border-radius: 12px; margin: 2px 4px 2px 0; }
      .projects-table { width: 100%; }
      .projects-table td { vertical-align: top; padding: 0 15px 8px 0; }
      .project-name { font-weight: 600; font-size: 10px; color: ${secondaryColor}; }
      .project-tech { font-size: 8px; color: #666; }
      .edu-row { margin-bottom: 8px; }
      .edu-degree { font-weight: 600; font-size: 10px; color: ${secondaryColor}; display: inline; }
      .edu-details { font-size: 9px; color: #666; display: inline; margin-left: 8px; }
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
        ${data.experience.slice(0, 4).map(exp => `
          <div class="exp-item">
            <div class="exp-title">${exp.title}</div>
            <div class="exp-meta">${exp.company} · ${exp.location} · ${exp.period}</div>
            <ul class="exp-list">${exp.description.slice(0, 2).map(d => `<li>${d}</li>`).join('')}</ul>
          </div>
        `).join('')}
      </div>
      
      <div class="section">
        <div class="section-title">Skills</div>
        <div class="skills-inline">
          ${data.skills.flatMap(s => s.items.slice(0, 5)).map(skill => `<span class="skill-pill">${skill}</span>`).join('')}
        </div>
      </div>
      
      <div class="section">
        <div class="section-title">Projects</div>
        <table class="projects-table">
          ${[0, 2, 4].map(i => `
            <tr>
              ${data.projects.slice(i, i + 2).map(proj => `
                <td>
                  <div class="project-name">${proj.name}</div>
                  <div class="project-tech">${proj.technologies}</div>
                </td>
              `).join('')}
            </tr>
          `).join('')}
        </table>
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
function generateExecutiveLayout(data: typeof portfolioData, theme: ThemeConfig): string {
  const { primaryColor, secondaryColor, accentColor } = theme;
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <style>
      ${getPrintStyles()}
      body { font-family: Georgia, serif; }
      .page { padding: 0; }
      .header { background: ${secondaryColor}; color: #fff; padding: 30px 40px; text-align: center; }
      .name { font-size: 26px; font-weight: 700; letter-spacing: 3px; margin-bottom: 6px; }
      .title { font-size: 12px; color: ${accentColor}; font-weight: 400; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; }
      .contact-row { font-size: 9px; color: rgba(255,255,255,0.85); }
      .contact-row span { margin: 0 12px; }
      .main-content { padding: 30px 40px; }
      .section { margin-bottom: 22px; }
      .section-header { border-bottom: 2px solid ${accentColor}; padding-bottom: 6px; margin-bottom: 12px; }
      .section-icon { display: inline-block; width: 22px; height: 22px; background: ${accentColor}; color: ${secondaryColor}; text-align: center; line-height: 22px; font-size: 11px; margin-right: 8px; vertical-align: middle; }
      .section-title { font-size: 13px; font-weight: 600; color: ${secondaryColor}; letter-spacing: 1px; display: inline; vertical-align: middle; }
      .summary { font-size: 10px; color: #444; line-height: 1.8; padding: 15px; background: #faf8f5; border-left: 3px solid ${accentColor}; }
      .exp-item { margin-bottom: 16px; padding: 12px; background: #fff; border: 1px solid #eee; }
      .exp-row { margin-bottom: 4px; }
      .exp-title { font-weight: 700; font-size: 11px; color: ${secondaryColor}; display: inline; }
      .exp-period { background: ${accentColor}; color: ${secondaryColor}; padding: 2px 8px; font-size: 8px; font-weight: 700; float: right; }
      .exp-company { color: ${primaryColor}; font-size: 10px; font-weight: 600; margin-bottom: 6px; }
      .exp-list { list-style: none; font-size: 9px; color: #555; padding: 0; margin: 0; }
      .exp-list li { margin-bottom: 3px; padding-left: 12px; position: relative; }
      .exp-list li:before { content: '◆'; position: absolute; left: 0; color: ${accentColor}; font-size: 6px; top: 2px; }
      .skills-table { width: 100%; }
      .skills-table td { vertical-align: top; width: 50%; padding: 10px; background: #faf8f5; border-bottom: 2px solid ${accentColor}; }
      .skill-title { font-weight: 700; font-size: 9px; color: ${secondaryColor}; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px; }
      .skill-items { font-size: 9px; color: #555; line-height: 1.6; }
      .projects-table { width: 100%; }
      .projects-table td { vertical-align: top; width: 50%; padding: 10px; border: 1px solid #ddd; position: relative; }
      .project-accent { position: absolute; top: 0; left: 0; width: 3px; height: 100%; background: ${accentColor}; }
      .project-name { font-weight: 700; font-size: 10px; color: ${secondaryColor}; margin-bottom: 3px; }
      .project-badge { display: inline-block; background: ${secondaryColor}; color: ${accentColor}; padding: 1px 6px; font-size: 7px; font-weight: 700; margin-bottom: 5px; }
      .project-desc { font-size: 8px; color: #666; line-height: 1.5; }
      .edu-box { background: ${secondaryColor}; color: #fff; padding: 15px; text-align: center; }
      .edu-degree { font-size: 12px; font-weight: 600; margin-bottom: 3px; }
      .edu-school { font-size: 10px; color: ${accentColor}; }
      .edu-period { font-size: 9px; color: rgba(255,255,255,0.7); margin-top: 3px; }
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
            <span class="section-icon">★</span>
            <span class="section-title">Executive Summary</span>
          </div>
          <p class="summary">${data.summary}</p>
        </div>
        
        <div class="section">
          <div class="section-header">
            <span class="section-icon">◈</span>
            <span class="section-title">Professional Experience</span>
          </div>
          ${data.experience.slice(0, 3).map(exp => `
            <div class="exp-item">
              <div class="exp-row">
                <span class="exp-title">${exp.title}</span>
                <span class="exp-period">${exp.period}</span>
              </div>
              <div class="exp-company">${exp.company} | ${exp.location}</div>
              <ul class="exp-list">${exp.description.slice(0, 2).map(d => `<li>${d}</li>`).join('')}</ul>
            </div>
          `).join('')}
        </div>
        
        <div class="section">
          <div class="section-header">
            <span class="section-icon">⚡</span>
            <span class="section-title">Core Competencies</span>
          </div>
          <table class="skills-table">
            <tr>
              ${data.skills.slice(0, 2).map(skill => `
                <td>
                  <div class="skill-title">${skill.category}</div>
                  <div class="skill-items">${skill.items.join(' • ')}</div>
                </td>
              `).join('')}
            </tr>
            <tr>
              ${data.skills.slice(2, 4).map(skill => `
                <td>
                  <div class="skill-title">${skill.category}</div>
                  <div class="skill-items">${skill.items.join(' • ')}</div>
                </td>
              `).join('')}
            </tr>
          </table>
        </div>
        
        <div class="section">
          <div class="section-header">
            <span class="section-icon">◉</span>
            <span class="section-title">Key Projects</span>
          </div>
          <table class="projects-table">
            <tr>
              ${data.projects.slice(0, 2).map(proj => `
                <td>
                  <div class="project-accent"></div>
                  <div class="project-name">${proj.name}</div>
                  <div class="project-badge">${proj.contribution}</div>
                  <div class="project-desc">${proj.description}</div>
                </td>
              `).join('')}
            </tr>
            <tr>
              ${data.projects.slice(2, 4).map(proj => `
                <td>
                  <div class="project-accent"></div>
                  <div class="project-name">${proj.name}</div>
                  <div class="project-badge">${proj.contribution}</div>
                  <div class="project-desc">${proj.description}</div>
                </td>
              `).join('')}
            </tr>
          </table>
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
function generateCreativeLayout(data: typeof portfolioData, theme: ThemeConfig): string {
  const { primaryColor, secondaryColor, accentColor } = theme;
  
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
    <style>
      ${getPrintStyles()}
      body { font-family: 'Segoe UI', sans-serif; background: #fafafa; }
      .page { padding: 30px; }
      .header { background: linear-gradient(135deg, ${secondaryColor} 0%, ${primaryColor} 100%); border-radius: 10px; color: #fff; padding: 20px 25px; margin-bottom: 20px; }
      .header-table { width: 100%; }
      .header-table td { vertical-align: middle; }
      .avatar { width: 70px; height: 70px; background: ${accentColor}; border-radius: 50%; text-align: center; line-height: 70px; font-size: 24px; font-weight: 700; color: ${secondaryColor}; }
      .header-info { padding-left: 18px; }
      .name { font-size: 22px; font-weight: 700; margin-bottom: 2px; }
      .title { font-size: 11px; color: ${accentColor}; font-weight: 500; margin-bottom: 8px; }
      .contact-grid { font-size: 8px; color: rgba(255,255,255,0.85); line-height: 1.6; }
      .two-col-table { width: 100%; }
      .two-col-table td { vertical-align: top; }
      .left-col { width: 38%; padding-right: 20px; }
      .right-col { width: 62%; }
      .section { margin-bottom: 18px; }
      .section-title { display: inline-block; background: ${primaryColor}; color: #fff; padding: 4px 12px; border-radius: 12px; font-size: 10px; font-weight: 600; margin-bottom: 10px; }
      .section-title span { margin-right: 5px; }
      .summary { font-size: 10px; color: #555; line-height: 1.7; padding: 12px; background: #fff; border-radius: 8px; border: 1px solid #eee; }
      .timeline { padding-left: 15px; border-left: 2px solid ${primaryColor}; }
      .timeline-item { margin-bottom: 14px; padding: 10px 12px; background: #fff; border-radius: 8px; border: 1px solid #eee; position: relative; }
      .timeline-item:before { content: ''; position: absolute; left: -20px; top: 14px; width: 8px; height: 8px; background: ${primaryColor}; border-radius: 50%; border: 2px solid #fff; }
      .timeline-title { font-weight: 600; font-size: 11px; color: ${secondaryColor}; margin-bottom: 2px; }
      .timeline-meta { font-size: 8px; color: ${primaryColor}; margin-bottom: 5px; }
      .timeline-desc { font-size: 8px; color: #666; line-height: 1.5; }
      .skill-bubble { display: inline-block; background: linear-gradient(135deg, ${primaryColor}22, ${accentColor}22); border: 1px solid ${primaryColor}44; padding: 4px 10px; border-radius: 12px; font-size: 8px; color: ${secondaryColor}; font-weight: 500; margin: 2px 3px 2px 0; }
      .project-card { padding: 10px; background: #fff; border-radius: 6px; border-left: 3px solid ${primaryColor}; border: 1px solid #eee; margin-bottom: 8px; }
      .project-header { margin-bottom: 3px; }
      .project-name { font-weight: 600; font-size: 10px; color: ${secondaryColor}; display: inline; }
      .project-tag { display: inline-block; background: ${accentColor}; color: ${secondaryColor}; padding: 1px 6px; border-radius: 8px; font-size: 7px; font-weight: 600; margin-left: 6px; }
      .project-tech { font-size: 8px; color: #666; }
      .lang-item { display: inline-block; background: #fff; padding: 5px 10px; border-radius: 6px; border: 1px solid #eee; margin: 2px 4px 2px 0; }
      .lang-name { font-weight: 600; font-size: 9px; color: ${secondaryColor}; }
      .lang-level { font-size: 7px; color: #666; }
      .edu-card { background: linear-gradient(135deg, ${primaryColor}15, ${accentColor}15); padding: 12px; border-radius: 8px; text-align: center; }
      .edu-icon { font-size: 20px; margin-bottom: 5px; }
      .edu-degree { font-weight: 600; font-size: 10px; color: ${secondaryColor}; margin-bottom: 2px; }
      .edu-school { font-size: 9px; color: #666; }
      .edu-year { font-size: 8px; color: ${primaryColor}; font-weight: 600; margin-top: 3px; }
    </style>
  </head><body>
    <div class="page">
      <div class="header">
        <table class="header-table">
          <tr>
            <td style="width: 80px;"><div class="avatar">${data.name.split(' ').map(n => n[0]).join('')}</div></td>
            <td class="header-info">
              <div class="name">${data.name}</div>
              <div class="title">${data.title}</div>
              <div class="contact-grid">
                ✉ ${data.email} &nbsp;|&nbsp; ☎ ${data.phone} &nbsp;|&nbsp; 📍 ${data.location} &nbsp;|&nbsp; 🔗 ${data.linkedin}
              </div>
            </td>
          </tr>
        </table>
      </div>
      
      <table class="two-col-table">
        <tr>
          <td class="left-col">
            <div class="section">
              <div class="section-title"><span>🎯</span> Skills</div>
              <div>
                ${data.skills.flatMap(s => s.items.slice(0, 4)).map(skill => `<span class="skill-bubble">${skill}</span>`).join('')}
              </div>
            </div>
            
            <div class="section">
              <div class="section-title"><span>🚀</span> Projects</div>
              ${data.projects.slice(0, 5).map(proj => `
                <div class="project-card">
                  <div class="project-header">
                    <span class="project-name">${proj.name}</span>
                    <span class="project-tag">${proj.contribution}</span>
                  </div>
                  <div class="project-tech">${proj.technologies}</div>
                </div>
              `).join('')}
            </div>
            
            <div class="section">
              <div class="section-title"><span>🌍</span> Languages</div>
              <div>
                ${data.languages.map(lang => `
                  <div class="lang-item">
                    <div class="lang-name">${lang.name}</div>
                    <div class="lang-level">${lang.level}</div>
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
          </td>
          
          <td class="right-col">
            <div class="section">
              <div class="section-title"><span>💼</span> About Me</div>
              <div class="summary">${data.summary}</div>
            </div>
            
            <div class="section">
              <div class="section-title"><span>📈</span> Experience Timeline</div>
              <div class="timeline">
                ${data.experience.slice(0, 4).map(exp => `
                  <div class="timeline-item">
                    <div class="timeline-title">${exp.title}</div>
                    <div class="timeline-meta">${exp.company} • ${exp.period}</div>
                    <div class="timeline-desc">${exp.description.slice(0, 2).join('. ')}.</div>
                  </div>
                `).join('')}
              </div>
            </div>
          </td>
        </tr>
      </table>
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
      html2canvas: { 
        scale: 2, 
        useCORS: true,
        logging: false,
        letterRendering: true
      },
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
