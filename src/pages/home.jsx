import { Layout } from '@/components/layout/layout';
import { HomeDivider } from '@/components/home/home-primitives';
import { HomeHero } from '@/components/home/home-hero';
import { HomeCollection } from '@/components/home/home-collection';
import { HomeMood } from '@/components/home/home-mood';
import { HomeExplore } from '@/components/home/home-explore';
import { HomeFaqs } from '@/components/home/home-faqs';

export const Home = () => (
    <Layout>
        <HomeHero />
        <HomeDivider />
        <HomeCollection />
        <HomeDivider />
        <HomeMood />
        <HomeDivider />
        <HomeExplore />
        <HomeDivider />
        <HomeFaqs />
    </Layout>
);
