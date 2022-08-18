// material
import { enUS } from '@mui/material/locale';

// ----------------------------------------------------------------------

const LANGS = [
  {
    label: 'English',
    value: 'en',
    systemValue: enUS,
    icon: '/static/icons/ic_flag_en.svg'
  }
];

export default function useLocales() {
  const currentLang = LANGS[0];

  return {
    currentLang,
    allLang: LANGS
  };
}
