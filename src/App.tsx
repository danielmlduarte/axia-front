import { RouterProvider } from 'react-router-dom';
import { UseTranslations } from './utils/useTranslations';
import { ArquivoProvider } from './context/ArquivoContext';
import router from './Router';
import './assets/css/main.scss';
import React, { useEffect, useState } from 'react';

function App() {
  const [language, setLanguage] = useState('pt');
  const [translations, setTranslations] = useState<any>()
  const [selectedFilters, setSelectedFilters] = useState<any>()
  const [protocoloIsValid, setProtocoloIsValid] = useState<boolean>(true)

  useEffect(() => {
    function fetchTranslations() {
      const translations = UseTranslations(language);
      setTranslations(translations);
    }
    fetchTranslations();
  }, [language]);

  return (
    <ArquivoProvider>
      <RouterProvider router={router} />      
    </ArquivoProvider>
  );
}

export default App;