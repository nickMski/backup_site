import { useState, useEffect } from 'react';

const projects = [
  {
    id: 1,
    title: "AI Liquid Detection Model and Webapp (Group Project)",
    description: 
    "• Served as the primary project communicator, presenting the AI club project to stakeholders and team members\n\n" +
    "• Aided in key aspects of model training and web application development, leveraging skills in .NET framework and Azure cloud technologies\n\n" +
    "• Implemented API integrations and containerization using Azure, demonstrating proficiency in cloud-based software deployment",
    videoUrl: "https://www.youtube.com/embed/UxzjRXbXRTk", //https://youtu.be/UxzjRXbXRTk
    codeUrl: "https://github.com/nickMski/Liquid-Detection-Model",
    tags: ["React", "PyTorch", ".NET", "Computer Vision"]
  },
  {
    id: 2,
    title: "Mandelbrot Fractal Explorer (Group Project)",
    description: 
      "• Developed mathematical algorithms to generate complex fractal imagery using OpenGL shading techniques\n\n" +
      "• Translated advanced mathematical concepts into precise computational graphics rendering\n\n" +
      "• Utilized shader programming to create sophisticated mathematical visualization techniques",
    videoUrl: "https://www.youtube.com/embed/AQyYwTJyVwE", //https://youtu.be/AQyYwTJyVwE
    codeUrl: "https://github.com/ChaseMcClellan/MandlebrotDemo.git",
    tags: ["C++", "OpenGL", "Shaders"]
  },
  {
    id: 3,
    title: "Procedural Tree Generator (Solo Project)",
    description: 
      "• Researched and designed an advanced L-system based tree generation tool\n\n" +
      "• Logically formulated organic, parametric tree structures using Python and VEX algorithms\n\n" +
      "• Leveraged algorithmic growth rules and spatial constraints to produce naturalistic, dynamically branching geometries",
    videoUrl: "https://youtube.com/embed/iFfz0iqc2LU",
    codeUrl: "https://github.com/nickMski/Houdini-lsystem-generator",
    tags: ["VEX", "Python", "Houdini", "Parameters"]
  },
  {
    id: 4,
    title: "Post Malone Music Quiz Game (Solo Project)",
    description: 
      "• Designed and developed an interactive web-based game using Adobe Animate and JavaScript\n\n" +
      "• Created an engaging gameplay mechanic centered on testing players' knowledge of Post Malone's song lyrics\n\n" +
      "• Utilized JavaScript to develop dynamic game interactions and scoring mechanisms",
    iframeUrl: "https://nickmski.github.io/intAniFinal/intAniPostGame.html",
    codeUrl: "https://github.com/nickMski/Post-Coast-to-Coast",
    tags: ["JavaScript", "Adobe Animate", "Animation", "Post Malone"]
  },
  {
    id: 5,
    title: "Music Video Production (Solo Project)",
    description: 
      "• Demonstrated proficiency in video production techniques and post-production editing\n\n" +
      "• Produced a professional-quality music video for a track by a family member (cousin)\n\n" +
      "• I tried to have fun with it, and – perhaps as a result – it turned out very well!",
    videoUrl: "https://www.youtube.com/embed/jkRDa4CtWos",
    codeUrl: "#",
    tags: ["Adobe", "Cinematography", "Editing"]
  }
];

function ProjectCard({ project, isDark }) {
  const [videoError, setVideoError] = useState(false);

  return (
    <div className="col-span-1">
      <div className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} rounded-xl shadow-lg overflow-hidden transition-transform hover:-translate-y-1 duration-300 border h-full`}>
        {project.media && (
          <div className="h-56 relative">
            {project.iframeUrl ? (
              <iframe 
                src={project.iframeUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                onLoad={(e) => {
                  const iframe = e.target;
                  iframe.focus();
                  const handleKeyDown = (event) => {
                    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                      event.preventDefault();
                      const keyEvent = new KeyboardEvent('keydown', {
                        key: event.key,
                        code: event.code,
                        keyCode: event.key === 'ArrowLeft' ? 37 : 39,
                        which: event.key === 'ArrowLeft' ? 37 : 39,
                        bubbles: true,
                        cancelable: true
                      });
                      if (iframe.contentWindow) {
                        iframe.contentWindow.dispatchEvent(keyEvent);
                      }
                    }
                  };
                  window.addEventListener('keydown', handleKeyDown);
                  return () => {
                    window.removeEventListener('keydown', handleKeyDown);
                  };
                }}
              />
            ) : project.videoUrl?.includes('youtube.com') ? (
              <iframe
                src={project.videoUrl}
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : !videoError ? (
              <video 
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                onError={(e) => {
                  console.error('Video loading error:', e);
                  setVideoError(true);
                }}
              >
                <source src={project.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
                Video failed to load
              </div>
            )}
          </div>
        )}
        <div className="p-6">
          <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
          <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-6 text-lg leading-relaxed whitespace-pre-line`}>{project.description}</p>
          {project.tags && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map(tag => (
                <span 
                  key={tag} 
                  className={`px-4 py-1.5 ${isDark ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'} rounded-full text-sm font-medium`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {project.actions}
        </div>
      </div>
    </div>
  );
}

function ContactCard({ isDark }) {
  return (
    <ProjectCard
      project={{
        title: "Get In Touch",
        description: " ",
        actions: (
          <div className="flex flex-col items-center justify-center w-full h-full mt-8">
            <p className="text-2xl mb-8 font-medium text-center">Let's collab - it'll be fun!</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
              <a 
                href="mailto:nickmski30@gmail.com"
                className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium text-center w-full sm:w-auto"
              >
                Email Me
              </a>
              <a 
                href="https://www.linkedin.com/in/nick-murawski-495980328"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium text-center w-full sm:w-auto"
              >
                LinkedIn Profile
              </a>
            </div>
          </div>
        )
      }}
      isDark={isDark}
    />
  );
}

function App() {
  const [isDark, setIsDark] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [heroVideoError, setHeroVideoError] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
      <div className="relative h-screen">
        <div 
          className="absolute inset-0 z-10" 
          aria-hidden="true"
        />
        {!heroVideoError ? (
          <video 
            className="absolute top-0 w-full h-full object-fill origin-top"
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={(e) => {
              console.error('Hero video loading error:', e);
              setHeroVideoError(true);
            }}
          >
            <source src="https://raw.githubusercontent.com/nickMski/backupSite/main/public/videos/houdiniFlip.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="absolute top-0 w-full h-full bg-gray-900" />
        )}
        <div className="relative h-full w-full px-8 z-20">
          <div className="h-full flex flex-col justify-center">
            <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 max-w-4xl">
              Nick Murawski
            </h1>
            <p className="text-2xl lg:text-3xl text-gray-200 mb-12 max-w-2xl leading-relaxed">
              Things I make!
            </p>
            <div className="flex gap-6">
              <a 
                href="#projects"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
              >
                View My Work
              </a>
              <a 
                href="#get-in-touch"
                className="px-8 py-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-lg font-medium"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>

      <main className="w-full px-8 py-24">
        <section id="projects" className="mb-24 relative">
          <div className="flex justify-between items-center mb-12">
            <h2 className={`text-3xl lg:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Featured Projects
            </h2>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
              }`}
            >
              {isDark ? 'Light' : 'Dark'}
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {projects.map(project => (
              <ProjectCard 
                key={project.id} 
                project={{
                  ...project,
                  media: true,
                  actions: project.codeUrl !== "#" ? (
                    <a 
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-lg font-medium"
                    >
                      View Code
                    </a>
                  ) : null
                }} 
                isDark={isDark} 
              />
            ))}
            <div id="get-in-touch">
              <ContactCard isDark={isDark} />
            </div>
          </div>
        </section>
      </main>

      <footer className={`${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-t mt-24`}>
        <div className="w-full px-8 py-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-lg`}>© 2025 Nick Murawski</p>
            <div className="flex gap-8">
              <a 
                href="https://github.com/nickMski" 
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} text-lg`}
              >
                GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/nick-murawski-495980328" 
                target="_blank"
                rel="noopener noreferrer"
                className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} text-lg`}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;