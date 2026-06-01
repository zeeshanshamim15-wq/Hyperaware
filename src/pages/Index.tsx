import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import BrandLogoCard from "@/components/BrandLogoCard";
import PinnedServicesStory from "@/components/PinnedServicesStory";
import RevealText from "@/components/RevealText";
import SectionFrame from "@/components/SectionFrame";
import {
  brandLogos,
  contact,
  portfolioStories,
  resultsDashboard,
  whyHyperaware,
} from "@/content/hyperaware";

const Index = () => {
  const featuredWork = portfolioStories.slice(0, 3);
  const smallMetrics = resultsDashboard.slice(0, 4);

  return (
    <>
      <section
        id="home"
        className="relative flex min-h-[100svh] items-start justify-center overflow-hidden px-5 pt-36 text-[hsl(266_70%_18%)] sm:px-6 sm:pt-44 md:min-h-screen md:items-center md:pt-0"
      >
        <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
          <RevealText
            as="p"
            mode="text"
            className="mx-auto mb-5 max-w-[18rem] text-[0.62rem] uppercase leading-relaxed tracking-[0.22em] text-[hsl(266_65%_25%)]/55 sm:mb-6 sm:max-w-none sm:text-xs sm:tracking-[0.4em]"
          >
            Digital Marketing | Social Media | Content Creation
          </RevealText>
          <h1 className="text-balance text-[2.45rem] font-light leading-[1.04] tracking-tight min-[360px]:text-5xl md:text-7xl">
            <RevealText as="span" mode="heading" className="block">
              Build Your Brand.
            </RevealText>
            <RevealText as="span" mode="heading" className="block font-semibold" delay={0.26}>
              Make It Convert.
            </RevealText>
          </h1>
          <RevealText
            as="p"
            mode="paragraph"
            className="mx-auto mt-5 max-w-xl text-pretty text-[0.92rem] leading-relaxed text-[hsl(266_35%_24%)]/72 sm:mt-6 sm:text-base md:text-lg"
            delay={0.1}
          >
            From social media and content creation to performance marketing,
            shoots, websites, and brand strategy, we create work that looks
            premium and drives action.
          </RevealText>

          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:gap-4 md:flex-row md:items-center">
            <Link to="/services" className="hyper-button">
              Explore Services
            </Link>
            <Link to="/contact" className="hyper-button hyper-button--light">
              Talk to us
            </Link>
          </div>
        </div>

        <RevealText
          as="div"
          mode="text"
          delay={0.5}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[11px] uppercase tracking-[0.3em] text-[hsl(266_55%_24%)]/35"
        >
          Scroll
        </RevealText>
      </section>

      <PinnedServicesStory />

      <SectionFrame eyebrow="Why Hyperaware" title="Strategy, creative, and execution under one sharp system." contentClassName="mt-12">
        <div className="mobile-rail grid gap-4 md:grid-cols-3">
          {whyHyperaware.slice(0, 3).map((point, index) => (
            <div key={point} className="hyper-mini-card hyper-mini-card--visual">
              <span className="hyper-mini-orb">{index + 1}</span>
              <RevealText as="span" mode="text">{point}</RevealText>
            </div>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="Clients" title="Brands We Have Worked With">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-8">
          {brandLogos.slice(0, 10).map((brand) => (
            <BrandLogoCard key={brand.name} brand={brand} />
          ))}
        </div>
        <Link to="/clients" className="hyper-button mt-10">
          View All Clients <ArrowRight className="h-4 w-4" />
        </Link>
      </SectionFrame>

      <SectionFrame eyebrow="Featured Work" title="A quick look at campaign-ready creative." contentClassName="mt-12">
        <div className="mobile-rail grid gap-5 md:grid-cols-3">
          {featuredWork.map((story) => (
            <Link key={story.title} to="/work" className="hyper-panel min-h-64 p-7">
              <RevealText as="h2" mode="heading" className="text-2xl font-semibold">
                {story.title}
              </RevealText>
              <RevealText as="p" mode="paragraph" className="mt-4 text-[hsl(266_35%_24%)]/68">
                {story.summary}
              </RevealText>
            </Link>
          ))}
        </div>
        <Link to="/work" className="hyper-button mt-10">
          View All Work <ArrowRight className="h-4 w-4" />
        </Link>
      </SectionFrame>

      <SectionFrame eyebrow="Featured Transformation" title="A preview of what changes after Hyperaware." contentClassName="mt-12">
        <div className="max-w-3xl">
          <BeforeAfterSlider label="Creative transformation" before="Inconsistent brand presence" after="Premium conversion-ready system" slotId="homepage-creative-transformation" />
        </div>
        <Link to="/clients" className="hyper-button mt-10">
          See Results <ArrowRight className="h-4 w-4" />
        </Link>
      </SectionFrame>

      <SectionFrame eyebrow="Results" title="Small signals. Bigger systems behind them." contentClassName="mt-12">
        <div className="mosaic-grid mosaic-grid--results">
          {smallMetrics.map((metric) => (
            <div key={metric.label} className="hyper-panel mosaic-card p-6" data-slot="growth-metric" data-slot-id={`homepage-${metric.label.toLowerCase().replace(/\s+/g, "-")}`}>
              <RevealText as="p" mode="text" className="hyper-eyebrow">
                {metric.label}
              </RevealText>
              <RevealText as="p" mode="heading" className="mt-4 text-4xl font-black">
                {metric.value}
              </RevealText>
            </div>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="Get Started" title="Ready to build a sharper brand system?">
        <RevealText as="p" mode="paragraph" className="mt-6 max-w-2xl text-lg leading-relaxed text-[hsl(266_35%_24%)]/72">
          Start with a conversation, a rate card, or a custom quote.
        </RevealText>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link to="/contact" className="hyper-button">
            Get Started
          </Link>
          <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="hyper-button hyper-button--light">
            Contact
          </a>
        </div>
      </SectionFrame>
    </>
  );
};

export default Index;
