import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftIcon, XMarkIcon, ArrowUpIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import './ProjectCaseStudy.css';
import { projectExists, getProjectConfig } from '../data/projectsData';
import { useTranslation } from '../context/LanguageContext';

function ProjectCaseStudy() {
  const { projectSlug } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [lightboxImage, setLightboxImage] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [activeSection, setActiveSection] = useState('overview');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState({});
  const [selectedHifiImage, setSelectedHifiImage] = useState(1);

  const sectionRefs = useRef({});

  // Get project config and translations (must be before early return)
  const projectExists_ = projectExists(projectSlug);
  const projectConfig = projectExists_ ? getProjectConfig(projectSlug) : null;
  const project = projectExists_ ? t(`projects.${projectSlug}`) : null;

  // Image loading helper
  const getImagePath = (imageName) => {
    try {
      return require(`../images/projects/${projectSlug}/${imageName}`);
    } catch (err) {
      return null;
    }
  };

  // Image component with fallback
  const ProjectImage = ({ imageName, alt, className, onClick }) => {
    const imagePath = getImagePath(imageName);
    const hasError = imageErrors[imageName];

    const handleImageError = () => {
      setImageErrors(prev => ({ ...prev, [imageName]: true }));
    };

    if (!imagePath || hasError) {
      return (
        <div className={`image-placeholder ${className || ''}`}>
          <span>Placeholder image</span>
        </div>
      );
    }

    return (
      <img
        src={imagePath}
        alt={alt}
        className={className}
        onClick={onClick}
        onError={handleImageError}
      />
    );
  };

  // Improved animations
  const fadeIn = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 80, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  // Section navigation
  const sections = projectExists_ ? [
    { id: 'overview', label: t('projects.sections.overview') },
    ...(project?.myRole ? [{ id: 'myRole', label: t('projects.sections.myRole') }] : []),
    { id: 'problem', label: t('projects.sections.problem') },
    { id: 'goals', label: t('projects.sections.goals') },
    { id: 'userFlow', label: t('projects.sections.userFlow') },
    { id: 'designSolutions', label: t('projects.sections.designSolutions') },
    { id: 'wireframes', label: t('projects.sections.wireframes') },
    { id: 'hifiDesigns', label: t('projects.sections.hifiDesigns') },
    { id: 'results', label: t('projects.sections.results') }
  ] : [];

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      // Show/hide scroll to top button
      setShowScrollTop(window.scrollY > 400);

      // Track active section - change when content is near center of screen
      const scrollPosition = window.scrollY + (window.innerHeight / 2);

      for (const section of sections) {
        const element = sectionRefs.current[section.id];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const element = sectionRefs.current[sectionId];
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Check if project exists (after all hooks)
  if (!projectExists_) {
    return (
      <div className="project-not-found">
        <h1>{t('projects.notFound.title') || 'Project not found'}</h1>
        <button onClick={() => navigate('/')}>
          {t('projects.notFound.backButton') || 'Back to Home'}
        </button>
      </div>
    );
  }

  return (
    <div className="project-case-study">
      {/* Floating Navigation */}
      <motion.div
        className="floating-nav"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        {sections.map((section) => (
          <button
            key={section.id}
            className={`floating-nav-item ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => scrollToSection(section.id)}
          >
            <div className="nav-indicator" />
            <span className="nav-label">{section.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Scroll to Top Button */}
      <motion.button
        className={`scroll-to-top ${!showScrollTop ? 'hidden' : ''}`}
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ChevronUpIcon />
      </motion.button>

      {/* Back Button */}
      <motion.button
        className="back-button"
        onClick={() => navigate('/')}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -5 }}
        style={{ position: 'fixed', top: 'var(--space-8)', zIndex: 101 }}
      >
        <ArrowLeftIcon />
        <span>{t('projects.backButton') || 'Back to Portfolio'}</span>
      </motion.button>

      {/* Hero Banner Section */}
      <motion.section
        className="case-study-hero"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        {/* Background Image with Gradient Overlay */}
        <div className="hero-image-wrapper">
          <ProjectImage imageName="img-cover.jpg" alt={project.title} className="hero-bg-image" />
          <div className="hero-gradient-overlay"></div>
        </div>

        {/* Hero Content Container */}
        <div className="hero-inner-content">
          {/* Title */}
          <motion.h1
            className="hero-main-title"
            variants={fadeInUp}
          >
            {project.title}
          </motion.h1>

          {/* Subheader */}
          <motion.h2
            className="hero-subheader"
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
          >
            {project.subtitle}
          </motion.h2>

          {/* Description Text */}
          <motion.p
            className="hero-description-text"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            {project.description}
          </motion.p>

          {/* 3 Metadata Cards */}
          <motion.div
            className="hero-metadata-cards"
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
          >
            <div className="metadata-card-item">
              <span className="card-label">PERIOD</span>
              <span className="card-value">{project.period}</span>
            </div>
            <div className="metadata-card-item">
              <span className="card-label">INDUSTRY</span>
              <span className="card-value">{project.industry}</span>
            </div>
            <div className="metadata-card-item">
              <span className="card-label">ROLE</span>
              <span className="card-value">{project.role}</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <div className="project-case-study-content">

      {/* SECTION 2: Project Overview */}
      <motion.section
        ref={(el) => (sectionRefs.current.overview = el)}
        className="section project-overview"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
      >
        <h2 className="section-heading">{t('projects.sections.overview')}</h2>
        <div className="section-text">
          {project.overview.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="image-row-two">
          <ProjectImage imageName="img-overview-1.jpg" alt="Overview 1" />
          <ProjectImage imageName="img-overview-2.jpg" alt="Overview 2" />
        </div>
      </motion.section>

      {/* SECTION 2.5: My Role & Approach (optional) */}
      {project.myRole && (
        <motion.section
          ref={(el) => (sectionRefs.current.myRole = el)}
          className="section my-role"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={fadeInUp}
        >
          <h2 className="section-heading">{t('projects.sections.myRole')}</h2>
          <div className="section-text">
            {project.myRole.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </motion.section>
      )}

      {/* SECTION 3: Problem */}
      <motion.section
        ref={(el) => (sectionRefs.current.problem = el)}
        className="section problem"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
      >
        <h2 className="section-heading">{t('projects.sections.problem')}</h2>
        <div className="section-text">
          {project.problem.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </motion.section>

      {/* SECTION 4: Goals & Success Metrics */}
      <motion.section
        ref={(el) => (sectionRefs.current.goals = el)}
        className="section goals"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
      >
        <h2 className="section-heading">{t('projects.sections.goals')}</h2>
        <div className="section-text">
          {project.goals.paragraphs && project.goals.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          {project.goals.bullets && (
            <ul>
              {project.goals.bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
          )}
        </div>
      </motion.section>

      {/* SECTION 5: User Flow & Information Architecture */}
      <motion.section
        ref={(el) => (sectionRefs.current.userFlow = el)}
        className="section user-flow"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
      >
        <h2 className="section-heading">{t('projects.sections.userFlow')}</h2>
        <div className="section-text">
          {project.userFlow.text.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="image-full">
          <ProjectImage imageName="img-userflow-1.jpg" alt="User Flow Diagram" />
        </div>
      </motion.section>

      {/* SECTION 6: Design Solutions */}
      <motion.section
        ref={(el) => (sectionRefs.current.designSolutions = el)}
        className="section design-solutions"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
      >
        <h2 className="section-heading">{t('projects.sections.designSolutions')}</h2>
        {project.designSolutions.subheading && (
          <h3 className="section-subheading">{project.designSolutions.subheading}</h3>
        )}
        <div className="section-text">
          {project.designSolutions.text.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        <div className="horizontal-scroll-gallery">
          {projectConfig?.designSolutionsImageCount && Array.from({ length: projectConfig.designSolutionsImageCount }).map((_, index) => (
            <ProjectImage
              key={index}
              imageName={`img-solutions-${index + 1}.jpg`}
              alt={`Design Solution ${index + 1}`}
            />
          ))}
        </div>
      </motion.section>

      {/* SECTION 7: Wireframes */}
      <motion.section
        ref={(el) => (sectionRefs.current.wireframes = el)}
        className="section wireframes"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
      >
        <h2 className="section-heading">{t('projects.sections.wireframes')}</h2>
        <div className="image-row-two">
          <ProjectImage imageName="img-wireframes-1.jpg" alt="Wireframe 1" />
          <ProjectImage imageName="img-wireframes-2.jpg" alt="Wireframe 2" />
        </div>
      </motion.section>

      {/* SECTION 8: High Fidelity UI Designs */}
      <motion.section
        ref={(el) => (sectionRefs.current.hifiDesigns = el)}
        className="section hifi-designs"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
      >
        <h2 className="section-heading">{t('projects.sections.hifiDesigns')}</h2>

        {/* Row 1: Large image - displays selected thumbnail */}
        <div className="image-full clickable">
          <ProjectImage
            imageName={`img-hifi-${selectedHifiImage}.jpg`}
            alt={`High Fidelity Design ${selectedHifiImage}`}
            onClick={() => setLightboxImage(getImagePath(`img-hifi-${selectedHifiImage}.jpg`))}
          />
        </div>

        {/* Row 2: 4 thumbnails grid - selector */}
        <div className="image-grid-four">
          {[1, 2, 3, 4].map(num => (
            <div
              key={num}
              className={selectedHifiImage === num ? 'active' : ''}
              onClick={() => setSelectedHifiImage(num)}
            >
              <ProjectImage
                imageName={`img-hifi-${num}.jpg`}
                alt={`High Fidelity Design ${num}`}
              />
            </div>
          ))}
        </div>

        {/* Row 3: Text */}
        <div className="section-text">
          {project.hifiDesigns.text1 && project.hifiDesigns.text1.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Row 4: Large image */}
        <div className="image-full clickable">
          <ProjectImage
            imageName="img-hifi-6.jpg"
            alt="High Fidelity Design 6"
            onClick={() => setLightboxImage(getImagePath('img-hifi-6.jpg'))}
          />
        </div>

        {/* Row 5: Horizontal scroll thumbnails */}
        <div className="horizontal-scroll-gallery">
          {[7, 8, 9, 10].map(num => (
            <ProjectImage
              key={num}
              imageName={`img-hifi-${num}.jpg`}
              alt={`High Fidelity Design ${num}`}
              className="clickable"
              onClick={() => setLightboxImage(getImagePath(`img-hifi-${num}.jpg`))}
            />
          ))}
        </div>

        {/* Row 6: Text */}
        <div className="section-text">
          {project.hifiDesigns.text2 && project.hifiDesigns.text2.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Row 7: Large image */}
        <div className="image-full clickable">
          <ProjectImage
            imageName="img-hifi-11.jpg"
            alt="High Fidelity Design 11"
            onClick={() => setLightboxImage(getImagePath('img-hifi-11.jpg'))}
          />
        </div>

        {/* Row 8: Text (optional) */}
        {project.hifiDesigns.text3 && (
          <div className="section-text">
            {project.hifiDesigns.text3.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}

        {/* Row 9: Large image (optional) */}
        {project.hifiDesigns.hasImage12 && (
          <div className="image-full clickable">
            <ProjectImage
              imageName="img-hifi-12.jpg"
              alt="High Fidelity Design 12"
              onClick={() => setLightboxImage(getImagePath('img-hifi-12.jpg'))}
            />
          </div>
        )}

        {/* Row 10: Text (optional) */}
        {project.hifiDesigns.text4 && (
          <div className="section-text">
            {project.hifiDesigns.text4.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        )}
      </motion.section>

      {/* SECTION 9: Results & Impact */}
      <motion.section
        ref={(el) => (sectionRefs.current.results = el)}
        className="section results"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={fadeInUp}
        onViewportEnter={() => {
          if (!hasAnimated && project?.results?.outcomes) {
            setHasAnimated(true);
            // Animate each number in the outcomes
            project.results.outcomes.forEach((outcome, index) => {
              const targetValue = parseFloat(outcome.number);
              const duration = 1200; // 1.2 seconds
              const startTime = Date.now();

              const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function for smooth animation (easeOutCubic)
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                const currentValue = targetValue * easeOutCubic;

                setAnimatedNumbers(prev => ({
                  ...prev,
                  [index]: currentValue
                }));

                if (progress < 1) {
                  requestAnimationFrame(animate);
                }
              };

              animate();
            });
          }
        }}
      >
        <h2 className="section-heading">{t('projects.sections.results')}</h2>

        <h3 className="section-subheading">{t('projects.sections.outcomes')}</h3>
        <ul className="outcomes-list">
          {project.results.outcomes.map((outcome, index) => {
            const animatedValue = animatedNumbers[index] || 0;
            const hasDecimal = outcome.number.toString().includes('.');
            const formattedValue = hasDecimal
              ? animatedValue.toFixed(1)
              : Math.round(animatedValue);

            return (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="outcome-number">
                  {formattedValue}{outcome.suffix}
                </div>
                <p className="outcome-description">{outcome.description}</p>
              </motion.li>
            );
          })}
        </ul>

        {project.results.impactHeading && (
          <h3 className="section-subheading">{project.results.impactHeading}</h3>
        )}
        <div className="section-text">
          {project.results.impact.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </motion.section>

      </div> {/* End project-case-study-content */}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <motion.button
              className="lightbox-close"
              onClick={() => setLightboxImage(null)}
              whileHover={{ scale: 1.1 }}
            >
              <XMarkIcon />
            </motion.button>
            <motion.img
              src={lightboxImage}
              alt="Expanded view"
              className="lightbox-image"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProjectCaseStudy;
