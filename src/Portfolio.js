import React from 'react';
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
  CheckCircleIcon
} from '@heroicons/react/24/solid';

function Portfolio() {
  const { scrollYProgress } = useScroll();

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const bannerY = useTransform(scrollYProgress, [0.3, 0.5], [100, -100]);

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

  return (
    <div className="portfolio-container">
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
                <p>Yoqub Khamidov</p>
              </motion.div>
              <motion.div className="title" variants={fadeInUp}>
                <p>UI UX Designer</p>
              </motion.div>
            </div>
            <motion.div className="bio" variants={fadeInUp}>
              <p>
                <span>An experienced UI/UX designer with a strong foundation in graphic design and computer science, I specialize in </span>
                <span className="highlight">transforming complex</span>
                <span>, unstructured ideas </span>
                <span className="highlight">into seamless, intuitive digital experiences</span>
                <span>. </span>
              </p>
              <p>I thrive on solving challenging problems through aesthetic design, crafting interfaces that are not only visually striking but also logical, functional, and deeply user-focused.</p>
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
                    <span className="uppercase">Download my</span>
                    <span> CV</span>
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
                <p>or keep scrolling to learn more about me</p>
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
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.div className="section-header" variants={fadeInUp}>
          <div className="section-subtitle">
            <p>About me</p>
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
              <p>Education</p>
            </div>
          </div>
        </motion.div>
        <motion.div className="education-description" variants={fadeInUp}>
          <p>
            Sejong University is a prestigious<span className="highlight"> private university in Seoul, South Korea</span>
            <span>, renowned for its strong programs in engineering, design, and management. I spent 4.5 years there </span>
            <span className="highlight">earning a double degree</span>, gaining deep knowledge in computer science, technology, engineering, and business management.
          </p>
        </motion.div>
      </motion.div>

      {/* UNIVERSITY BANNER with Parallax */}
      <div className="university-banner-section">
        <motion.div
          className="university-banner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
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
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="university-logo"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <img alt="Sejong University" src="/a4073d97a9c85c4819f14c7cca6c890ee79c0c25.png" />
            </motion.div>
            <motion.div
              className="banner-location"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
            >
              <MapPinIcon className="location-icon" />
              <span>Seoul, South Korea</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Education Details Cards with Stagger Animation */}
        <motion.div
          className="education-details"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
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
              <p className="detail-title">Seoul</p>
              <p className="detail-subtitle">South Korea</p>
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
              <p className="detail-title">2018 - 2023</p>
              <p className="detail-subtitle">Bachelor's</p>
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
              <BookOpenIcon />
            </motion.div>
            <div className="detail-text">
              <p className="detail-title">Business Administration</p>
              <p className="detail-subtitle">Main Major</p>
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
              <BookOpenIcon />
            </motion.div>
            <div className="detail-text">
              <p className="detail-title">Computer Engineering</p>
              <p className="detail-subtitle">Double Major</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* WORK EXPERIENCE SECTION */}
      <motion.div
        className="work-experience-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.div className="section-header" variants={fadeInUp}>
          <div className="section-subtitle">
            <p>About me</p>
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
              <p>Work Experience</p>
            </div>
          </div>
        </motion.div>

        {/* Photo Gallery with Stagger */}
        <motion.div
          className="photo-gallery"
          variants={staggerContainer}
        >
          <motion.div
            className="gallery-item placeholder"
            variants={cardVariant}
            whileHover={{ scale: 1.05 }}
          />
          <motion.div
            className="gallery-item placeholder"
            variants={cardVariant}
            whileHover={{ scale: 1.05 }}
          />
          <motion.div
            className="gallery-item main-photo"
            variants={cardVariant}
            whileHover={{
              scale: 1.05,
              zIndex: 10,
              transition: { duration: 0.3 }
            }}
          >
            <img alt="Work Experience" src="/5a95dd08071c2ea4ce8be5685c96ae1c24c8c199.png" />
          </motion.div>
          <motion.div
            className="gallery-item placeholder"
            variants={cardVariant}
            whileHover={{ scale: 1.05 }}
          />
          <motion.div
            className="gallery-item placeholder"
            variants={cardVariant}
            whileHover={{ scale: 1.05 }}
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
                <h3>Единный Интегратор UZINFOCOM</h3>
                <div className="company-location">
                  <MapPinIcon className="location-icon-small" />
                  <span>IT Park, г.Ташкент Узбекистан</span>
                </div>
              </div>
            </div>
            <div className="card-period">
              <div className="period-date-wrapper">
                <CalendarIcon className="calendar-icon-small" />
                <p className="period-date">Фев 2025</p>
              </div>
              <p className="position-title">Ведущий специалист отдела Веб Дизайна</p>
            </div>
            <div className="card-description">
              <p>Крупнейшая государственная IT-компания Узбекистана, отвечающая за цифровую инфраструктуру страны и сервисы для миллионов граждан. Компания разрабатывает и внедряет платформы электронного правительства и цифровые сервисы, которыми ежедневно пользуются миллионы граждан и организаций.</p>
            </div>
            <div className="card-responsibilities">
              <p className="responsibilities-intro">Назначен ведущим UI/UX-дизайнером для разработки интерфейсов и пользовательских сценариев в рамках масштабных государственных платформ, систем управления, дешбордов и веб страниц министерств</p>
              <ul className="responsibilities-list">
                <li>
                  <CheckCircleIcon className="checkmark-icon" />
                  <span>Спроектировал интерфейсы для 20+ веб-сайтов и 10+ комплексных платформ, охватывающих государственные и коммерческие проекты.</span>
                </li>
                <li>
                  <CheckCircleIcon className="checkmark-icon" />
                  <span>Участвовал в цифровизации отраслевых процессов, переводя ключевые бизнес-операции в удобные цифровые решения.</span>
                </li>
                <li>
                  <CheckCircleIcon className="checkmark-icon" />
                  <span>Разработал интерфейсы и дашборды национального масштаба, которыми ежедневно пользуются миллионы граждан и сотни организаций.</span>
                </li>
                <li>
                  <CheckCircleIcon className="checkmark-icon" />
                  <span>Был вовлечен в проектирование бизнес-процессов и аналитики систем, обеспечив оптимизацию и повышение эффективности работы.</span>
                </li>
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

      {/* TOOLS MARQUEE SECTION */}
      <motion.div
        className="tools-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.div className="section-header" variants={fadeInUp}>
          <div className="section-subtitle">
            <p>Skills</p>
          </div>
          <div className="section-title-wrapper">
            <div className="section-title gradient-text">
              <p>Инструменты и технологии</p>
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
    </div>
  );
}

export default Portfolio;
