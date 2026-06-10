import { useLocalStorage } from '@/hooks/use-local-storage';

export const useDarkMode = () => {
    // const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const [theme, setTheme] = useLocalStorage('settings:theme', 'light');
    const toggle = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
    return [theme, toggle];
};
