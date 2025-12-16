import './App.css';
import Portfolio from './Portfolio';
import { LanguageProvider } from './context/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
  return (
    <LanguageProvider>
      <div className="App">
        <LanguageSwitcher />
        <Portfolio />
      </div>
    </LanguageProvider>
  );
}

export default App;
