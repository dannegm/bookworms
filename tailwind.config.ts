import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
            },
            zIndex: {
                max: `${Number.MAX_SAFE_INTEGER}`,
            },
        },
    },
    plugins: [
        plugin(function ({ addVariant }) {
            addVariant('child', '& > *');
            addVariant('childs', '& *');
        }),
    ],
};
export default config;
