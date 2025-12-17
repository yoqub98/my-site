import React, { useState, useEffect } from 'react';
import './Portfolio.css';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowDownTrayIcon,
  ChevronDownIcon,
  AcademicCapIcon,
  MapPinIcon,
  CalendarIcon,
  BookOpenIcon,
  BriefcaseIcon,
  CheckCircleIcon,
  LightBulbIcon,
  UserGroupIcon,
  SparklesIcon,
  RocketLaunchIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  BeakerIcon,
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon
} from '@heroicons/react/24/solid';
import { useTranslation } from './context/LanguageContext';

function Portfolio() {
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const [showFAB, setShowFAB] = useState(false);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const titles = ['UX Designer', 'Product Designer', 'Web Designer', 'UI/UX Designer'];
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isContactExpanded, setIsContactExpanded] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const bannerY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Rotating typewriter effect for job title
  useEffect(() => {
    const currentTitle = titles[titleIndex];

    const typingSpeed = isDeleting ? 50 : 100;
    const pauseAfterComplete = 3000;
    const pauseBeforeDelete = 500;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentTitle.length) {
        // Typing
        setDisplayedTitle(currentTitle.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (!isDeleting && charIndex === currentTitle.length) {
        // Pause after typing complete, then start deleting
        setTimeout(() => setIsDeleting(true), pauseAfterComplete);
      } else if (isDeleting && charIndex > 0) {
        // Deleting
        setDisplayedTitle(currentTitle.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (isDeleting && charIndex === 0) {
        // Move to next title
        setIsDeleting(false);
        setTitleIndex((titleIndex + 1) % titles.length);
      }
    }, isDeleting ? typingSpeed : (charIndex === currentTitle.length ? pauseAfterComplete : typingSpeed));

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, titleIndex]);

  // FAB visibility on scroll
  useEffect(() => {
    const handleScroll = () => {
      setShowFAB(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom cursor tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle email copy
  const handleEmailCopy = () => {
    navigator.clipboard.writeText('yoqub.xamidoff19@gmail.com');
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  // Contact options data
  const contactOptions = [
    {
      name: 'Telegram',
      prefix: t('contact.options.telegram.prefix'),
      service: t('contact.options.telegram.service'),
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.693-1.653-1.124-2.678-1.8-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.242-1.865-.442-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.831-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635.099-.002.321.023.465.14.121.099.155.232.171.326.016.094.037.308.02.475z"/>
        </svg>
      ),
      action: () => window.open('https://t.me/yoqub_610', '_blank'),
      color: '#0088cc'
    },
    {
      name: 'Email',
      prefix: t('contact.options.email.prefix'),
      service: t('contact.options.email.service'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      action: () => setShowEmailModal(true),
      color: '#EA4335'
    },
    {
      name: 'LinkedIn',
      prefix: t('contact.options.linkedin.prefix'),
      service: t('contact.options.linkedin.service'),
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      action: () => window.open('https://www.linkedin.com/in/jacobkh19/', '_blank'),
      color: '#0077b5'
    },
    {
      name: 'Phone',
      service: t('contact.options.phone.service'),
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      action: () => window.location.href = 'tel:+998935149808',
      color: '#34C759'
    },
    {
      name: 'Behance',
      prefix: t('contact.options.behance.prefix'),
      service: t('contact.options.behance.service'),
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.61.165-1.252.254-1.91.254H0V4.51h6.938v-.007zM16.94 16.665c.44.428 1.073.643 1.894.643.59 0 1.1-.148 1.53-.447.424-.29.68-.61.78-.94h2.588c-.403 1.28-1.048 2.2-1.9 2.75-.85.56-1.884.83-3.08.83-.837 0-1.584-.13-2.272-.4-.673-.27-1.24-.65-1.685-1.14-.43-.49-.77-1.073-.993-1.736-.23-.66-.345-1.37-.345-2.15 0-.754.116-1.46.347-2.13.232-.67.572-1.25 1.016-1.73.442-.48 1.01-.86 1.67-1.14.67-.28 1.45-.42 2.28-.42.86 0 1.61.16 2.25.48.627.32 1.14.74 1.55 1.26.403.52.71 1.13.904 1.82.193.69.29 1.403.29 2.14 0 .08-.007.19-.007.33 0 .14-.016.25-.016.37H15.38c.05.82.334 1.47.774 1.902zm-9.424-8.73v3.546h3.137c.455 0 .844-.05 1.16-.16.32-.11.58-.27.78-.48.196-.21.34-.46.43-.73.09-.27.135-.57.135-.89 0-.72-.203-1.25-.61-1.6-.4-.35-.99-.52-1.77-.52H7.516v-.166zm0 7.58h3.59c.27 0 .54-.03.82-.09.27-.06.52-.17.73-.31.21-.14.38-.33.51-.58.13-.24.19-.55.19-.92 0-.75-.25-1.3-.73-1.65-.48-.35-1.1-.53-1.87-.53H7.516v4.09zm13.74-2.806c-.06-.56-.25-1.02-.57-1.38-.32-.36-.79-.54-1.42-.54-.396 0-.74.07-1.03.22-.29.15-.53.33-.71.56-.18.23-.32.49-.41.78-.09.29-.15.58-.17.85h4.32v-.49zm-2.9-6.564h3.84V7.1h-3.84V5.145z"/>
        </svg>
      ),
      action: () => window.open('https://www.behance.net/yoqubxamidoff', '_blank'),
      color: '#1769ff'
    }
  ];

  // Animation variants for sections
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const iconFloat = {
    hover: {
      y: -8,
      scale: 1.1,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const galleryItemVariant = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  const galleryContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  return (
    <div className="portfolio-container">
      {/* Custom Cursor */}
      <div
        className="custom-cursor"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      >
        <svg width="24" height="26" viewBox="0 0 396 433" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M39.9743 31.8759C38.2182 23.4826 47.2033 16.9545 54.6432 21.2184L351.11 191.127C358.653 195.45 357.401 206.692 349.09 209.248L205.199 253.511C202.971 254.196 201.054 255.643 199.785 257.599L127.77 368.534C122.94 375.973 111.523 373.84 109.707 365.158L39.9743 31.8759Z" fill="#333333"/>
          <path d="M346.168 199.749L202.277 244.012C197.821 245.383 193.988 248.277 191.449 252.188L119.434 363.121L49.7012 29.8407L346.168 199.749Z" stroke="white" strokeWidth="19.8759"/>
        </svg>
      </div>
      {/* HERO SECTION with Parallax */}
      <motion.div
        className="hero-section"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <motion.div
          className="profile-photo"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          whileHover={{
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
        >
          <img alt="Profile" src="https://ik.imagekit.io/php1jcf0t/Personal/1680166269683.jpg" />
        </motion.div>

        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <div className="hero-text">
            <div className="name-title">
              <motion.div className="name" variants={fadeInUp}>
                <p>{t('hero.name')}</p>
              </motion.div>
              <motion.div className="title" variants={fadeInUp}>
                <p>{displayedTitle}<span className="typewriter-cursor">|</span></p>
              </motion.div>
            </div>
            <motion.div className="bio" variants={fadeInUp}>
              <p>
                <span>{t('hero.bio.part1')}</span>
                <span className="highlight">{t('hero.bio.highlight1')}</span>
                <span>{t('hero.bio.part2')}</span>
                <span className="highlight">{t('hero.bio.highlight2')}</span>
                <span>{t('hero.bio.part3')}</span>
              </p>
              <p>{t('hero.bioSecond')}</p>
            </motion.div>
          </div>

          <motion.div className="cta-section" variants={fadeInUp}>
            <div className="download-button-wrapper">
              <motion.div
                className="download-button"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="button-text">
                  <p>
                    <span className="uppercase">{t('hero.downloadCV.text')}</span>
                    <span>{t('hero.downloadCV.cv')}</span>
                  </p>
                </div>
                <motion.div
                  className="download-icon"
                  animate={{ y: [0, 3, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <ArrowDownTrayIcon />
                </motion.div>
              </motion.div>
            </div>
            <div className="scroll-section">
              <div className="scroll-text">
                <p>{t('hero.scrollText')}</p>
              </div>
              <div className="chevron-icon">
                <ChevronDownIcon />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* EDUCATION SECTION with Scroll Animation */}
      <motion.div
        className="education-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.div className="section-header" variants={fadeInUp}>
          <div className="section-subtitle">
            <p>{t('education.subtitle')}</p>
          </div>
          <div className="section-title-wrapper">
            <motion.div
              className="education-icon"
              variants={iconFloat}
              whileHover="hover"
            >
              <AcademicCapIcon />
            </motion.div>
            <div className="section-title gradient-text">
              <p>{t('education.title')}</p>
            </div>
          </div>
        </motion.div>
        <motion.div className="education-description" variants={fadeInUp}>
          <p>
            {t('education.description.text')}<span className="highlight">{t('education.description.highlight1')}</span>
            <span>{t('education.description.text2')}</span>
            <span className="highlight">{t('education.description.highlight2')}</span>{t('education.description.text3')}
          </p>
        </motion.div>
      </motion.div>

      {/* UNIVERSITY BANNER with Parallax */}
      <div className="university-banner-section">
        <motion.div
          className="university-banner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={fadeInScale}
        >
          <motion.div
            className="banner-background"
            style={{ y: bannerY }}
          >
            <img alt="University Campus" src="https://ik.imagekit.io/php1jcf0t/Personal/uni_image.jpg" />
          </motion.div>
          <div className="banner-overlay" />
          <motion.div
            className="banner-content"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="university-logo"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <img alt="Sejong University" src="/a4073d97a9c85c4819f14c7cca6c890ee79c0c25.png" />
            </motion.div>
            <motion.div
              className="banner-location"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
            >
              <MapPinIcon className="location-icon" />
              <span>{t('education.location')}</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Education Details Cards with Stagger Animation */}
        <motion.div
          className="education-details"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.div
            className="detail-card gradient-card"
            variants={cardVariant}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div
              className="detail-icon gradient-icon"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <MapPinIcon />
            </motion.div>
            <div className="detail-text">
              <p className="detail-title">{t('education.location').split(', ')[0]}</p>
              <p className="detail-subtitle">{t('education.location').split(', ')[1]}</p>
            </div>
          </motion.div>

          <motion.div
            className="detail-card gradient-card"
            variants={cardVariant}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div
              className="detail-icon gradient-icon"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <CalendarIcon />
            </motion.div>
            <div className="detail-text">
              <p className="detail-title">{t('education.period')}</p>
              <p className="detail-subtitle">{t('education.degree')}</p>
            </div>
          </motion.div>

          <motion.div
            className="detail-card gradient-card"
            variants={cardVariant}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div
              className="detail-icon gradient-icon"
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.3 }}
            >
              <AcademicCapIcon />
            </motion.div>
            <div className="detail-text">
              <p className="detail-title">{t('education.major1.title')}</p>
              <p className="detail-subtitle">{t('education.major1.subtitle')}</p>
            </div>
          </motion.div>

          <motion.div
            className="detail-card gradient-card"
            variants={cardVariant}
            whileHover={{
              y: -8,
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <motion.div
              className="detail-icon gradient-icon"
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.3 }}
            >
              <AcademicCapIcon />
            </motion.div>
            <div className="detail-text">
              <p className="detail-title">{t('education.major2.title')}</p>
              <p className="detail-subtitle">{t('education.major2.subtitle')}</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* WORK EXPERIENCE SECTION */}
      <motion.div
        className="work-experience-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.div className="section-header" variants={fadeInUp}>
          <div className="section-subtitle">
            <p>{t('workExperience.subtitle')}</p>
          </div>
          <div className="section-title-wrapper">
            <motion.div
              className="education-icon"
              variants={iconFloat}
              whileHover="hover"
            >
              <BriefcaseIcon />
            </motion.div>
            <div className="section-title-plain gradient-text">
              <p>{t('workExperience.title')}</p>
            </div>
          </div>
        </motion.div>

        {/* Photo Gallery with Stagger */}
        <motion.div
          className="photo-gallery"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={galleryContainer}
        >
          <motion.div
            className="gallery-item placeholder"
            variants={galleryItemVariant}
          />
          <motion.div
            className="gallery-item main-photo"
            variants={galleryItemVariant}
          >
            <img alt="Work Experience" src="/img2.jpg" />
          </motion.div>
          <motion.div
            className="gallery-item main-photo"
            variants={galleryItemVariant}
          >
            <img alt="Work Experience" src="/5a95dd08071c2ea4ce8be5685c96ae1c24c8c199.png" />
          </motion.div>
          <motion.div
            className="gallery-item placeholder"
            variants={galleryItemVariant}
          />
          <motion.div
            className="gallery-item placeholder"
            variants={galleryItemVariant}
          />
        </motion.div>

        {/* Experience Cards with Animation */}
        <motion.div
          className="experience-cards"
          variants={staggerContainer}
        >
          {/* UZINFOCOM Card */}
          <motion.div
            className="experience-card"
            variants={cardVariant}
            whileHover={{
              y: -8,
              boxShadow: "0 24px 48px rgba(4, 72, 200, 0.15)",
              borderColor: "rgba(4, 72, 200, 0.5)"
            }}
          >
            <div className="card-header">
              <motion.div
                className="company-logo uzinfocom-logo"
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <img alt="UZINFOCOM" src="https://uzinfocom.uz/_next/static/media/uzinfocom-logo.8612a388.svg" />
              </motion.div>
              <div className="company-info">
                <h3>{t('workExperience.uzinfocom.name')}</h3>
                <div className="company-location">
                  <MapPinIcon className="location-icon-small" />
                  <span>{t('workExperience.uzinfocom.location')}</span>
                </div>
              </div>
            </div>
            <div className="card-period">
              <div className="period-date-wrapper">
                <CalendarIcon className="calendar-icon-small" />
                <p className="period-date">{t('workExperience.uzinfocom.period')}</p>
              </div>
              <p className="position-title">{t('workExperience.uzinfocom.position')}</p>
            </div>
            <div className="card-description">
              <p>{t('workExperience.uzinfocom.description')}</p>
            </div>
            <div className="card-responsibilities">
              <p className="responsibilities-intro">{t('workExperience.uzinfocom.intro')}</p>
              <ul className="responsibilities-list">
                {t('workExperience.uzinfocom.responsibilities').map((responsibility, index) => (
                  <li key={index}>
                    <CheckCircleIcon className="checkmark-icon" />
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* STEK AUTOMOTIVE Card */}
          <motion.div
            className="experience-card"
            variants={cardVariant}
            whileHover={{
              y: -8,
              boxShadow: "0 24px 48px rgba(4, 72, 200, 0.15)",
              borderColor: "rgba(4, 72, 200, 0.5)"
            }}
          >
            <div className="card-header">
              <motion.div
                className="company-logo stek-logo"
                whileHover={{ scale: 1.05, rotate: -2 }}
              >
                <img alt="STEK AUTOMOTIVE" src="https://static.wixstatic.com/media/5d1532_6017681975414cdea008a1ea12a9252e~mv2.png/v1/fill/w_720,h_355,al_c,lg_1,q_85,enc_avif,quality_auto/5d1532_6017681975414cdea008a1ea12a9252e~mv2.png" />
              </motion.div>
              <div className="company-info">
                <h3>STEK AUTOMOTIVE</h3>
                <div className="company-location">
                  <MapPinIcon className="location-icon-small" />
                  <span>Сеул, Ю.Корея</span>
                </div>
              </div>
            </div>
            <div className="card-period">
              <div className="period-date-wrapper">
                <CalendarIcon className="calendar-icon-small" />
                <p className="period-date">Фев 2022 - Янв 2025</p>
              </div>
              <p className="position-title">UI/UX & Product Design</p>
            </div>
            <div className="card-description">
              <p>Крупнейшая международная компания в сфере тонировок и PPF плёнок для автомобилей. Более 1000+ установочных центров в 80+ странах мира с сетью дистрибютеров.</p>
            </div>
            <div className="card-responsibilities">
              <p className="responsibilities-intro">Принят на позицию UI/UX-дизайнера с дополнительной поддержкой в области проектного менеджмента для развития цифровых решений компании.</p>
              <ul className="responsibilities-list">
                <li>
                  <CheckCircleIcon className="checkmark-icon" />
                  <span>Полный редизайн корпоративного сайта, что привело к росту вовлечённости пользователей и количеству заявок.</span>
                </li>
                <li>
                  <CheckCircleIcon className="checkmark-icon" />
                  <span>Проектирование и запуск глобальной цифровой платформы, объединяющей установщиков, дистрибьюторов и штаб-квартиру STEK — автоматизация коммуникаций и повседневных операций компании с клиентами по всему миру.</span>
                </li>
                <li>
                  <CheckCircleIcon className="checkmark-icon" />
                  <span>Регулярные презентации и защита дизайн-решений перед стейкхолдерами, с акцентом на соответствие бизнес-целям и потребностям пользователей.</span>
                </li>
                <li>
                  <CheckCircleIcon className="checkmark-icon" />
                  <span>Активное участие в цифровизации бизнес-процессов, перевод оффлайн-операций в эффективные и масштабируемые онлайн-сервисы.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* DESIGN PROCESS SECTION */}
      <motion.div
        className="design-process-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.div className="section-header" variants={fadeInUp}>
          <div className="section-subtitle">
            <p>{t('designProcess.subtitle')}</p>
          </div>
          <div className="section-title-wrapper">
            <motion.div
              className="education-icon"
              variants={iconFloat}
              whileHover="hover"
            >
              <LightBulbIcon />
            </motion.div>
            <div className="section-title gradient-text">
              <p>{t('designProcess.title')}</p>
            </div>
          </div>
        </motion.div>

        {/* Design Principles */}
        <motion.div
          className="process-principles"
          variants={staggerContainer}
        >
          <motion.div className="principle-card" variants={cardVariant}>
            <div className="principle-icon">
              <UserGroupIcon />
            </div>
            <h3 className="principle-title">{t('designProcess.principles.userCentric.title')}</h3>
            <p className="principle-description">
              {t('designProcess.principles.userCentric.description')}
            </p>
          </motion.div>

          <motion.div className="principle-card" variants={cardVariant}>
            <div className="principle-icon">
              <SparklesIcon />
            </div>
            <h3 className="principle-title">{t('designProcess.principles.simplicity.title')}</h3>
            <p className="principle-description">
              {t('designProcess.principles.simplicity.description')}
            </p>
          </motion.div>

          <motion.div className="principle-card" variants={cardVariant}>
            <div className="principle-icon">
              <RocketLaunchIcon />
            </div>
            <h3 className="principle-title">{t('designProcess.principles.innovation.title')}</h3>
            <p className="principle-description">
              {t('designProcess.principles.innovation.description')}
            </p>
          </motion.div>

          <motion.div className="principle-card" variants={cardVariant}>
            <div className="principle-icon">
              <ChatBubbleLeftRightIcon />
            </div>
            <h3 className="principle-title">{t('designProcess.principles.collaboration.title')}</h3>
            <p className="principle-description">
              {t('designProcess.principles.collaboration.description')}
            </p>
          </motion.div>
        </motion.div>

        {/* Workflow Diagram */}
        <motion.div
          className="workflow-diagram"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.div className="workflow-step" variants={cardVariant}>
            <div className="workflow-card">
              <div className="workflow-card-front">
                <div className="workflow-step-icon">
                  <MagnifyingGlassIcon />
                </div>
                <p className="workflow-step-label">{t('designProcess.workflow.research.label')}</p>
              </div>
              <div className="workflow-card-back">
                <p className="workflow-step-description">
                  {t('designProcess.workflow.research.description')}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div className="workflow-arrow" variants={fadeInUp}>
            <ArrowRightIcon />
          </motion.div>

          <motion.div className="workflow-step" variants={cardVariant}>
            <div className="workflow-card">
              <div className="workflow-card-front">
                <div className="workflow-step-icon">
                  <PencilSquareIcon />
                </div>
                <p className="workflow-step-label">{t('designProcess.workflow.design.label')}</p>
              </div>
              <div className="workflow-card-back">
                <p className="workflow-step-description">
                  {t('designProcess.workflow.design.description')}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div className="workflow-arrow" variants={fadeInUp}>
            <ArrowRightIcon />
          </motion.div>

          <motion.div className="workflow-step" variants={cardVariant}>
            <div className="workflow-card">
              <div className="workflow-card-front">
                <div className="workflow-step-icon">
                  <BeakerIcon />
                </div>
                <p className="workflow-step-label">{t('designProcess.workflow.test.label')}</p>
              </div>
              <div className="workflow-card-back">
                <p className="workflow-step-description">
                  {t('designProcess.workflow.test.description')}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div className="workflow-arrow" variants={fadeInUp}>
            <ArrowRightIcon />
          </motion.div>

          <motion.div className="workflow-step" variants={cardVariant}>
            <div className="workflow-card">
              <div className="workflow-card-front">
                <div className="workflow-step-icon">
                  <ArrowPathIcon />
                </div>
                <p className="workflow-step-label">{t('designProcess.workflow.iterate.label')}</p>
              </div>
              <div className="workflow-card-back">
                <p className="workflow-step-description">
                  {t('designProcess.workflow.iterate.description')}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* TOOLS MARQUEE SECTION */}
      <motion.div
        className="tools-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.div className="section-header" variants={fadeInUp}>
          <div className="section-subtitle">
            <p>{t('skills.subtitle')}</p>
          </div>
          <div className="section-title-wrapper">
            <div className="section-title-tools gradient-text">
              <p>{t('skills.title')}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="tools-marquee-section">
        <div className="marquee-container">
          <div className="marquee-track">
            {/* First set of icons */}
            <div className="marquee-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" />
            </div>
            <div className="marquee-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" alt="Adobe Illustrator" />
            </div>
            <div className="marquee-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg" alt="Premiere Pro" />
            </div>
            <div className="marquee-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" alt="Adobe Photoshop" />
            </div>
            <div className="marquee-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" alt="Jira" />
            </div>
            <div className="marquee-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg" alt="Slack" />
            </div>
            <div className="marquee-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg" alt="Notion" />
            </div>

            {/* Duplicate set for seamless loop */}
            <div className="marquee-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" alt="Figma" />
            </div>
            <div className="marquee-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg" alt="Adobe Illustrator" />
            </div>
            <div className="marquee-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-original.svg" alt="Premiere Pro" />
            </div>
            <div className="marquee-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" alt="Adobe Photoshop" />
            </div>
            <div className="marquee-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg" alt="Jira" />
            </div>
            <div className="marquee-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg" alt="Slack" />
            </div>
            <div className="marquee-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/notion/notion-original.svg" alt="Notion" />
            </div>
          </div>
        </div>
      </div>

      {/* EXPANDABLE CONTACT MENU */}
      <div
        className={`contact-menu-container ${showFAB ? 'visible' : ''}`}
        onMouseEnter={() => setIsContactExpanded(true)}
        onMouseLeave={() => setIsContactExpanded(false)}
      >
        {/* Main Contact Button */}
        <motion.div
          className="contact-main-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="contact-icon">
            <ChatBubbleLeftRightIcon />
          </div>
          <span>{t('contact.mainButton')}</span>
        </motion.div>

        {/* Expanded Contact Options */}
        <motion.div
          className="contact-options"
          initial={{ opacity: 0, y: 20 }}
          animate={isContactExpanded ? {
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
              staggerChildren: 0.08,
              delayChildren: 0.1
            }
          } : {
            opacity: 0,
            y: 20,
            transition: { duration: 0.2 }
          }}
        >
          {contactOptions.map((option, index) => (
            <motion.button
              key={option.name}
              className="contact-option-item"
              onClick={option.action}
              initial={{ opacity: 0, x: 20, scale: 0.8 }}
              animate={isContactExpanded ? {
                opacity: 1,
                x: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  delay: index * 0.06
                }
              } : {
                opacity: 0,
                x: 20,
                scale: 0.8
              }}
              whileHover={{
                scale: 1.08,
                x: -8,
                transition: { type: "spring", stiffness: 400, damping: 15 }
              }}
              whileTap={{ scale: 0.95 }}
              style={{ '--option-color': option.color }}
            >
              <div className="contact-option-icon" style={{ color: option.color }}>
                {option.icon}
              </div>
              <span className="contact-option-label">
                {option.prefix && <span className="contact-prefix">{option.prefix} </span>}
                <span className="contact-service">{option.service}</span>
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* EMAIL MODAL */}
      {showEmailModal && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowEmailModal(false)}
        >
          <motion.div
            className="email-modal"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 25
              }
            }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="email-modal-header">
              <h3>{t('contact.emailModal.title')}</h3>
              <button
                className="modal-close"
                onClick={() => setShowEmailModal(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <div className="email-modal-content">
              <div className="email-display">
                <svg className="email-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <span className="email-text">yoqub.xamidoff19@gmail.com</span>
              </div>
              <motion.button
                className="copy-button"
                onClick={handleEmailCopy}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {emailCopied ? (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span>{t('contact.emailModal.copied')}</span>
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    <span>{t('contact.emailModal.copy')}</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default Portfolio;
