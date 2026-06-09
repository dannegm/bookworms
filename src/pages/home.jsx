import { Layout } from '@/components/layout/layout';
import { HomeDivider } from '@/components/home/home-primitives';
import { HomeHero } from '@/components/home/home-hero';
import { HomeCollection } from '@/components/home/home-collection';
import { HomeMood } from '@/components/home/home-mood';
import { HomeFaqs } from '@/components/home/home-faqs';

export const Home = () => {
    return (
        <Layout>
            <HomeHero />
            <HomeDivider />
            <HomeCollection />
            <HomeDivider />
            <HomeMood />
            <HomeDivider />
            <HomeFaqs />
        </Layout>
    );
};
