// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// hooks
import useAuth from './hooks/useAuth';
// components
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';
import GoogleAnalytics from './components/GoogleAnalytics';
import LoadingScreen, { ProgressBarStyle } from './components/LoadingScreen';
import NotistackProvider from './components/NotistackProvider';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import Settings from './components/settings';
import ThemeLocalization from './components/ThemeLocalization';
import ThemePrimaryColor from './components/ThemePrimaryColor';


// ----------------------------------------------------------------------

export default function App() {
  const { isInitialized } = useAuth();

  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <ThemeLocalization>
          <RtlLayout>
            <NotistackProvider>
              <GlobalStyles />
              <ProgressBarStyle />
              <BaseOptionChartStyle />
              <Settings />
              <ScrollToTop />
              <GoogleAnalytics />
              {isInitialized ? <Router /> : <LoadingScreen />}
            </NotistackProvider>
          </RtlLayout>
        </ThemeLocalization>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
