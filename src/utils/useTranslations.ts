import messages_es from './messages_es.json';
import messages_pt from './messages_pt.json';

// function parsePropertiesFile(text) {
//   const translations = {};
//   const lines = text.split('\n');
//   for (const line of lines) {
//     const [key, value] = line.split('=');
//     translations[key] = value
//   }
//   return translations;
// }

export function UseTranslations(language: string):any {

  let languageSelector = {}

  switch (language) {
    case 'es':
      languageSelector = messages_es
      break;
  
    default:
      languageSelector = messages_pt
      break;
  }

  return languageSelector;
}
