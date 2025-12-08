import html2pdf from 'html2pdf.js';

interface CVData {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  summary: string;
  skills: {
    category: string;
    items: string[];
  }[];
  experience: {
    title: string;
    company: string;
    period: string;
    description: string[];
  }[];
  education: {
    degree: string;
    institution: string;
    period: string;
  }[];
  projects: {
    name: string;
    description: string;
    technologies: string;
  }[];
}

const cvData: CVData = {
  name: "Muhammad Aqib Rafiqe",
  title: "Senior Software Engineer",
  email: "muhammadaqibrafiqe@gmail.com",
  phone: "+92 3094564404",
  linkedin: "linkedin.com/in/muhammadaqibrafiqe",
  github: "github.com/aqibrafiq",
  summary: "Experienced Senior Software Engineer with 4+ years of expertise in iOS development (Swift, SwiftUI, UIKit), React Native for cross-platform mobile apps, and MERN stack development. Proven track record of delivering high-quality mobile and web applications with a focus on clean code, performance optimization, and exceptional user experiences.",
  skills: [
    {
      category: "iOS Development",
      items: ["Swift", "SwiftUI", "UIKit", "Combine", "Core Data", "Core Animation", "Push Notifications", "In-App Purchases"]
    },
    {
      category: "Cross-Platform",
      items: ["React Native", "Expo", "Redux", "React Navigation"]
    },
    {
      category: "Frontend",
      items: ["React.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Framer Motion"]
    },
    {
      category: "Backend & APIs",
      items: ["Node.js", "Express.js", "MongoDB", "REST APIs", "GraphQL", "Strapi", "Firebase", "Cloud Functions"]
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "Xcode", "VS Code", "Figma", "Jira", "App Store Connect", "TestFlight"]
    }
  ],
  experience: [
    {
      title: "Senior iOS Developer",
      company: "Joinleaf Inc.",
      period: "Nov 2020 - Present",
      description: [
        "Led development of Leaf iOS app - AI-powered event planner with 50K+ downloads",
        "Built and maintained Node.js backend APIs, cron jobs, and cloud functions",
        "Developed React.js admin dashboard for user management and analytics",
        "Implemented real-time features using WebSockets and push notifications",
        "Collaborated with cross-functional teams to deliver features on schedule"
      ]
    },
    {
      title: "React Native Developer",
      company: "MPower Online",
      period: "2023 - Present",
      description: [
        "Developed MPower Pro - cross-platform music creation app for iOS and Android",
        "Contributed to Strapi CMS backend for content management",
        "Implemented audio recording, editing, and effects features",
        "Integrated AI-powered features for music generation and guidance"
      ]
    },
    {
      title: "iOS Developer",
      company: "Various Clients (Freelance)",
      period: "2020 - 2023",
      description: [
        "Developed multiple iOS apps including Ombi, Creator Music Studio, The Track App",
        "Built Vooconnect social networking platform with iOS frontend and Node.js backend",
        "Delivered high-quality apps with clean architecture and comprehensive testing",
        "Maintained excellent client communication and project documentation"
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
      description: "AI-powered event planner for organizing small group gatherings with smart checklists, group scheduler, and event import features.",
      technologies: "iOS, Swift, SwiftUI, Node.js, Cloud Functions"
    },
    {
      name: "MPower Pro",
      description: "Cross-platform music creation app with multitrack DAW, AI guidance, and social collaboration features.",
      technologies: "React Native, Strapi, iOS, Android"
    },
    {
      name: "Vooconnect",
      description: "Social networking platform with live streaming, chat, marketplace, and content subscription features.",
      technologies: "iOS, Swift, Node.js, MongoDB"
    }
  ]
};

const generateCVHTML = (): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 11px;
          line-height: 1.5;
          color: #1a1a2e;
          background: #ffffff;
        }
        .cv-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 3px solid #58a6ff;
        }
        .name {
          font-size: 32px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 8px;
          letter-spacing: 1px;
        }
        .title {
          font-size: 16px;
          color: #58a6ff;
          font-weight: 600;
          margin-bottom: 15px;
        }
        .contact-info {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 20px;
          font-size: 11px;
          color: #555;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .section {
          margin-bottom: 25px;
        }
        .section-title {
          font-size: 14px;
          font-weight: 700;
          color: #1a1a2e;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 2px solid #58a6ff;
        }
        .summary {
          color: #444;
          line-height: 1.7;
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
        }
        .skill-category {
          margin-bottom: 10px;
        }
        .skill-category-title {
          font-weight: 600;
          color: #1a1a2e;
          margin-bottom: 5px;
        }
        .skill-items {
          color: #555;
          font-size: 10px;
        }
        .experience-item {
          margin-bottom: 20px;
        }
        .experience-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 5px;
        }
        .experience-title {
          font-weight: 700;
          color: #1a1a2e;
          font-size: 13px;
        }
        .experience-period {
          color: #58a6ff;
          font-size: 10px;
          font-weight: 600;
        }
        .experience-company {
          color: #666;
          font-style: italic;
          margin-bottom: 8px;
        }
        .experience-description {
          list-style: none;
          padding-left: 0;
        }
        .experience-description li {
          position: relative;
          padding-left: 15px;
          margin-bottom: 4px;
          color: #444;
        }
        .experience-description li:before {
          content: "▸";
          position: absolute;
          left: 0;
          color: #58a6ff;
        }
        .education-item {
          margin-bottom: 15px;
        }
        .education-degree {
          font-weight: 700;
          color: #1a1a2e;
        }
        .education-institution {
          color: #555;
        }
        .education-period {
          color: #58a6ff;
          font-size: 10px;
        }
        .project-item {
          margin-bottom: 15px;
        }
        .project-name {
          font-weight: 700;
          color: #1a1a2e;
        }
        .project-description {
          color: #555;
          margin: 3px 0;
        }
        .project-tech {
          font-size: 10px;
          color: #58a6ff;
          font-weight: 500;
        }
      </style>
    </head>
    <body>
      <div class="cv-container">
        <div class="header">
          <div class="name">${cvData.name}</div>
          <div class="title">${cvData.title}</div>
          <div class="contact-info">
            <span class="contact-item">📧 ${cvData.email}</span>
            <span class="contact-item">📱 ${cvData.phone}</span>
            <span class="contact-item">💼 ${cvData.linkedin}</span>
            <span class="contact-item">💻 ${cvData.github}</span>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Professional Summary</div>
          <p class="summary">${cvData.summary}</p>
        </div>

        <div class="section">
          <div class="section-title">Technical Skills</div>
          <div class="skills-grid">
            ${cvData.skills.map(skill => `
              <div class="skill-category">
                <div class="skill-category-title">${skill.category}</div>
                <div class="skill-items">${skill.items.join(" • ")}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="section">
          <div class="section-title">Professional Experience</div>
          ${cvData.experience.map(exp => `
            <div class="experience-item">
              <div class="experience-header">
                <span class="experience-title">${exp.title}</span>
                <span class="experience-period">${exp.period}</span>
              </div>
              <div class="experience-company">${exp.company}</div>
              <ul class="experience-description">
                ${exp.description.map(desc => `<li>${desc}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <div class="section-title">Key Projects</div>
          ${cvData.projects.map(project => `
            <div class="project-item">
              <div class="project-name">${project.name}</div>
              <div class="project-description">${project.description}</div>
              <div class="project-tech">Technologies: ${project.technologies}</div>
            </div>
          `).join('')}
        </div>

        <div class="section">
          <div class="section-title">Education</div>
          ${cvData.education.map(edu => `
            <div class="education-item">
              <div class="education-degree">${edu.degree}</div>
              <div class="education-institution">${edu.institution}</div>
              <div class="education-period">${edu.period}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </body>
    </html>
  `;
};

export const generateCV = async (format: 'pdf' | 'docx'): Promise<void> => {
  const html = generateCVHTML();
  
  if (format === 'pdf') {
    const element = document.createElement('div');
    element.innerHTML = html;
    document.body.appendChild(element);
    
    const options = {
      margin: 0,
      filename: 'Muhammad_Aqib_Rafiqe_CV.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    await html2pdf().set(options).from(element).save();
    document.body.removeChild(element);
  } else if (format === 'docx') {
    // For DOCX, we create a downloadable HTML file that Word can open
    const blob = new Blob([html], { type: 'application/msword' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Muhammad_Aqib_Rafiqe_CV.doc';
    link.click();
    URL.revokeObjectURL(link.href);
  }
};