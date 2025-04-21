
import MainLayout from "@/components/layout/MainLayout";
import HomeHero from "./HomeHero";
import HomeFeatures from "./HomeFeatures";
import HomeRecentResources from "./HomeRecentResources";
import HomeUpcomingEvents from "./HomeUpcomingEvents";
import HomeTrendingDiscussions from "./HomeTrendingDiscussions";
import HomeCallToAction from "./HomeCallToAction";

// This page is now organized as small components for clarity and maintainability:
const Index = () => (
  <MainLayout>
    <HomeHero />
    <HomeFeatures />
    <HomeRecentResources />
    <HomeUpcomingEvents />
    <HomeTrendingDiscussions />
    <HomeCallToAction />
  </MainLayout>
);

export default Index;
