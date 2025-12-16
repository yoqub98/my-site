import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../context/LanguageContext';
import './LanguageSwitcher.css';

function LanguageSwitcher() {
  const { language, switchLanguage } = useTranslation();

  return (
    <motion.div
      className="language-switcher"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <motion.button
        className={`lang-button ${language === 'en' ? 'active' : ''}`}
        onClick={() => switchLanguage('en')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        EN
      </motion.button>
      <div className="lang-divider" />
      <motion.button
        className={`lang-button ${language === 'ru' ? 'active' : ''}`}
        onClick={() => switchLanguage('ru')}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        RU
      </motion.button>
    </motion.div>
  );
}

export default LanguageSwitcher;
