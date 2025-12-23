import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './Portfolio';
import ProjectCaseStudy from './components/ProjectCaseStudy';
import { LanguageProvider } from './context/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <LanguageSwitcher />
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/projects/:projectSlug" element={<ProjectCaseStudy />} />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
