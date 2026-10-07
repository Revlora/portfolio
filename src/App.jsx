import { useState } from 'react'

const skills = {
  websiteDevelopment: ['HTML', 'PHP', 'CSS', 'Laravel', 'JavaScript', 'Tailwind'],
  programmingLanguages: ['C++', 'Python', 'Java'],
}

const certifications = [
  {
    title: 'IT SPECIALIST - Cybersecurity',
    issuer: 'CertiProf',
    date: 'November 24, 2025',
    endDate: 'November 24, 2030',
  },
  {
    title: 'PMI Project Manager Ready',
    issuer: 'Project Management Institute',
    date: 'March 13, 2025',
  },
  {
    title: 'IT SPECIALIST - Networking',
    issuer: 'Certiport',
    date: 'July 11, 2024',
  },
  {
    title: 'Introductions to Networks',
    issuer: 'Cisco Networking Academy',
    date: 'April 15, 2024',
  },
  {
    title: 'IT SPECIALIST - Python',
    issuer: 'Certiport',
    date: 'March 25, 2024',
  },
  {
    title: 'SMART Technopreneurship 101',
    issuer: 'Technical Education and Skills Development Authority',
    date: 'May 02, 2023',
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: 'May 18, 2022',
  },
  {
    title: 'Networking Essentials',
    issuer: 'Cisco Networking Academy',
    date: 'May 18, 2022',
  },
]

const highlights = [
  {
    title: 'BSIT Graduate',
    description: 'Built on a foundation of modern systems, practical problem solving, and digital workflow.',
  },
  {
    title: 'IT Professional',
    description: 'Focused on clean execution, reliable support, and polished user experiences.',
  },
  {
    title: 'Frontend Showcase',
    description: 'Designed to feel premium, animated, and presentation-ready for Vercel.',
  },
]

const projects = [
  {
    label: 'Portfolio Concept',
    title: 'Hero-led presentation',
    description: 'Strong name placement, a dedicated picture holder, and motion that draws the eye.',
  },
  {
    label: 'Design Direction',
    title: 'Elegant visual rhythm',
    description: 'Layered gradients, glass surfaces, and subtle floating movement for depth.',
  },
  {
    label: 'Deployment Ready',
    title: 'Built for Vercel',
    description: 'Simple React structure that keeps the codebase clean and easy to deploy.',
  },
]

function App() {
  const [photoLoaded, setPhotoLoaded] = useState(false)
  const [photoError, setPhotoError] = useState(false)
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })

  async function handleContactSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    setFormStatus({ type: 'sending', message: 'Sending your message...' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(formData)),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Unable to send your message.')
      }

      form.reset()
      setFormStatus({ type: 'success', message: 'Thank you. Your message has been sent.' })
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: error.message || 'Unable to send your message. Please try again later.',
      })
    }
  }

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="grid-overlay" />

      <section className="hero">
        <div className="hero-copy">
          <h1>
            Evan Andrei
            <span>Reblora</span>
          </h1>
          <p className="lead">
            BSIT graduate and IT professional with a modern, polished portfolio built to showcase
            strong frontend presence and clean visual storytelling.
          </p>

          <div className="hero-actions">
            <a className="primary-btn" href="#about">
              Explore Profile
            </a>
            <a className="secondary-btn" href="#contact">
              Contact Me
            </a>
          </div>

          <div className="stats">
            <div>
              <strong>React</strong>
              <span>Modern UI build</span>
            </div>
            <div>
              <strong>Vercel</strong>
              <span>Deployment friendly</span>
            </div>
            <div>
              <strong>Motion</strong>
              <span>Animated showcase</span>
            </div>
          </div>
        </div>

        <div className="portrait-card">
          <div className="portrait-frame">
            <div className="portrait-image-wrap">
              {!photoError && (
                <img
                  className="portrait-image"
                  src="/profile.png"
                  alt="Evan Andrei Reblora"
                  onLoad={() => setPhotoLoaded(true)}
                  onError={() => setPhotoError(true)}
                  style={{ opacity: photoLoaded ? 1 : 0 }}
                />
              )}
              {(!photoLoaded || photoError) && (
                <div className="portrait-placeholder">
                  <span>Picture Holder</span>
                  <p>
                    Place your photo at <code>public/profile.png</code>.
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="floating-badge badge-top">IT Professional</div>
          <div className="floating-badge badge-bottom">BSIT Graduate</div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="section-heading">
          <p className="eyebrow">About</p>
          <h2>Built to feel confident, clean, and memorable.</h2>
        </div>

        <div className="about-grid">
          {highlights.map((item) => (
            <article className="glass-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Skills</p>
          <h2>Focused on practical IT value and frontend presentation.</h2>
        </div>

        <div className="skills-group">
          <article className="glass-card skills-card">
            <h3>Website Development</h3>
            <div className="skill-row">
              {skills.websiteDevelopment.map((skill) => (
                <span className="skill-pill" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </article>

          <article className="glass-card skills-card">
            <h3>Programming Language</h3>
            <div className="skill-row">
              {skills.programmingLanguages.map((skill) => (
                <span className="skill-pill" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Certifications</p>
          <h2>Relevant credentials that support the technical foundation.</h2>
        </div>

        <div className="cert-grid">
          {certifications.map((cert) => (
            <article className="cert-card glass-card" key={cert.title}>
              <h3>{cert.title}</h3>
              <p>Issued by {cert.issuer} on {cert.date}{cert.endDate ? ` - ${cert.endDate}` : ''}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Showcase</p>
          <h2>Key details that make the portfolio feel premium.</h2>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.title}>
              <span className="project-label">{project.label}</span>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="contact-card glass-card">
          <p className="eyebrow">Contact</p>
          <h2>Let's discuss your next project.</h2>
          <p>
            Have an opportunity, collaboration, or project in mind? Send a message and I will get
            back to you as soon as I can.
          </p>

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="form-grid">
              <label>
                First name
                <input name="firstName" type="text" autoComplete="given-name" required maxLength="60" />
              </label>
              <label>
                Last name
                <input name="lastName" type="text" autoComplete="family-name" required maxLength="60" />
              </label>
            </div>

            <label>
              Email address
              <input name="email" type="email" autoComplete="email" required maxLength="120" />
            </label>

            <label>
              Topic you want to discuss
              <input name="topic" type="text" placeholder="Project inquiry, collaboration, or opportunity" required maxLength="120" />
            </label>

            <label>
              Your message
              <textarea name="message" rows="5" required maxLength="3000" />
            </label>

            <label className="honeypot" aria-hidden="true">
              Website
              <input name="website" type="text" tabIndex="-1" autoComplete="off" />
            </label>

            <div className="form-footer">
              <button className="primary-btn" type="submit" disabled={formStatus.type === 'sending'}>
                {formStatus.type === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {formStatus.message && (
                <p className={`form-status ${formStatus.type}`} role="status">
                  {formStatus.message}
                </p>
              )}
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}

export default App
