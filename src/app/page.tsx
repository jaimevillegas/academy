import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/home/hero";
import { MetricsStrip } from "@/components/home/metrics-strip";
import { PathsSection } from "@/components/home/paths-section";
import { FeaturedCatalog } from "@/components/home/featured-catalog";
import { RepositorySection } from "@/components/home/repository-section";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex w-full flex-col">
        <Hero />
        <MetricsStrip />
        <PathsSection />
        <FeaturedCatalog />
        <RepositorySection />
      </main>
      <Footer />
    </>
  );
}
