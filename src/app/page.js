'use client'
import { useState, useEffect } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const projects = [
    {
      title: "Domino's Cash Handling App",
      description: "A React-based web app that simplifies daily cash handling. Users enter the current bills on hand, and the app calculates the deposit while prioritizing larger bills—ensuring smaller bills are left for the next day’s operations.",
      tech: ["React", "Node.js"],
      github: "https://github.com/juliusg034/till-count-react",
      demo: "https://juliusg034.github.io/till-count-react/"
    },
    {
      title: "Weather App",
      description: "A web app that fetches and displays weekly weather data using a public API. Built with Node.js and JavaScript to practice API integration and frontend design.",
      tech: ["JavaScript", "API Integration", "CSS3", "HTML5", "Node.js"],
      github: "https://github.com/juliusg034/weatherpulse",
      demo: "https://weatherpulse.xyz"
    }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    console.log('Form submitted!', formData)
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      console.log('Missing form data')
      setSubmitStatus('error')
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      console.log('Sending to Formspree...')
      const response = await fetch('https://formspree.io/f/xkgvqjlb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      })

      console.log('Response status:', response.status)

      if (response.ok) {
        console.log('Success!')
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        console.log('Error response')
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Fetch error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <h2>Julius Gutierrez</h2>
          </div>
          
          <div className={`${styles.navMenu} ${isMenuOpen ? styles.navMenuActive : ''}`}>
            {['home', 'about', 'projects', 'contact'].map((section) => (
              <button
                key={section}
                className={`${styles.navLink} ${activeSection === section ? styles.navLinkActive : ''}`}
                onClick={() => scrollToSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>

          <div 
            className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerActive : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Hi, I`&apos;`m <span className={styles.gradient}>Julius Gutierrez</span>
          </h1>
          <p className={styles.heroSubtitle}>Computer Science Student</p>
          <p className={styles.heroDescription}>
            I’m a computer science student exploring web development and software projects
          </p>
          <div className={styles.heroButtons}>
            <button 
              className={styles.primaryBtn}
              onClick={() => scrollToSection('projects')}
            >
              View My Work
            </button>
            <button 
              className={styles.secondaryBtn}
              onClick={() => scrollToSection('contact')}
            >
              Get In Touch
            </button>
          </div>
        </div>
        <div className={styles.heroImage}>
          <div className={styles.profileImage}></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.about}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          <div className={styles.aboutContent}>
            <div className={styles.aboutText}>
              <p>
                Hi! I`&apos;`m Julius Gutierrez, a computer science student with a passion for coding, technology, and problem-
                solving. I enjoy exploring Python and Java, experimenting with web development, and working on personal
                projects like terminal tools and websites
              </p>
              <p>
                Technology has always fascinated me--from building my own PC to setting up home servers and networks. I 
                also love video games, which inspire me to think creatively and tackle challenges in new ways.
              </p>
              <p>
                I`&apos;`m constantly learning and eager to take on new projects that push my skills further. My goal is to combine 
                my curiosity and technical knowledge to create meaningful software and continue to grow as a developer.
              </p>
              
              <div className={styles.skills}>
                <h3>Technical Skills</h3>
                <div className={styles.skillsGrid}>
                  {["JavaScript", "React", "Next.js", "Node.js", "Python", "MongoDB", "PostgreSQL", "Git", "Java", "C++"].map((skill) => (
                    <span key={skill} className={styles.skillTag}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={styles.projects}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <div className={styles.projectsGrid}>
            {projects.map((project, index) => (
              <div key={index} className={styles.projectCard}>
                <div className={styles.projectImage}></div>
                <div className={styles.projectContent}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className={styles.projectTech}>
                    {project.tech.map((tech) => (
                      <span key={tech} className={styles.techTag}>{tech}</span>
                    ))}
                  </div>
                  <div className={styles.projectLinks}>
                    <a href={project.github} className={styles.projectLink} target='_blank'>GitHub</a>
                    <a href={project.demo} className={styles.projectLink} target='_blank'>Live Demo</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.contact}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Get In Touch</h2>
          <p className={styles.contactDescription}>
            I`&apos;`m always interested in new opportunities and interesting projects. 
            Let`&apos;`s create something amazing together!
          </p>
          
          <div className={styles.contactContent}>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <h4>Email</h4>
                <p>juliusg03@icloud.com</p>
              </div>
              <div className={styles.contactItem}>
                <h4>Phone</h4>
                <p>+1 (916) 513-5573</p>
              </div>
              <div className={styles.contactItem}>
                <h4>Social</h4>
                <div className={styles.socialLinks}>
                  <a href="https://github.com/juliusg034" target='_blank'>GitHub</a>
                  <a href="https://www.linkedin.com/in/julius-gutierrez/" target='_blank'>LinkedIn</a>
                </div>
              </div>
            </div>
            
            <div>
              <form className={styles.contactForm} onSubmit={handleSubmit}>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Your Name" 
                  className={styles.formInput}
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
                <input 
                  type="email" 
                  name="email"
                  placeholder="Your Email" 
                  className={styles.formInput}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
                <textarea 
                  name="message"
                  placeholder="Your Message" 
                  rows="5" 
                  className={styles.formTextarea}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
                <button 
                  type="submit" 
                  className={styles.primaryBtn}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>

              {submitStatus === 'success' && (
                <div className={styles.successMessage}>
                  ✅ Message sent successfully! I`&apos;`ll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className={styles.errorMessage}>
                  ❌ Failed to send message. Please try again or email me directly.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2024 Your Name. All rights reserved.</p>
      </footer>
    </div>
  )
}