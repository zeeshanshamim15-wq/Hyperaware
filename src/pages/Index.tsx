import { Link } from "react-router-dom";
import { ArrowRight, Check, Layers3, Palette, Target, X } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import BrandLogoCard from "@/components/BrandLogoCard";
import MetricFlow from "@/components/MetricFlow";
import PinnedServicesStory from "@/components/PinnedServicesStory";
import ProcessFlow, { type ProcessFlowItem } from "@/components/ProcessFlow";
import RevealText from "@/components/RevealText";
import SectionFrame from "@/components/SectionFrame";
import {
  brandLogos,
  contact,
  portfolioStories,
  whyHyperaware,
} from "@/content/hyperaware";

const WHY_ICONS = [Target, Palette, Layers3];

const BEFORE_BENEFITS = [
  "Inconsistent content",
  "Weak positioning",
  "Disconnected marketing",
];

const AFTER_BENEFITS = [
  "Unified brand system",
  "Better creative execution",
  "Growth-focused ecosystem",
];

const Index = () => {
  const featuredWork = portfolioStories.slice(0, 3);

  const whyJourneyItems: ProcessFlowItem[] = whyHyperaware.slice(0, 3).map((point, i) => ({
    title: point,
    icon: WHY_ICONS[i] ?? Target,
  }));

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
          <h1 className="text-balance text-[2.45rem] font-light leading-[1.1] tracking-tight min-[360px]:text-5xl md:text-7xl pb-2">
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

      <SectionFrame eyebrow="Why Hyperaware" title="Strategy, Creative, And Execution Under One Sharp System" contentClassName="mt-12">
        <ProcessFlow items={whyJourneyItems} />
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

      <SectionFrame eyebrow="Featured Work" title="A Quick Look At Campaign-Ready Creative" contentClassName="mt-12">
        <div className="bento-work">
          {featuredWork.map((story, index) => (
            <Link
              key={story.title}
              to="/work"
              className={
                index === 0
                  ? "bento-work__card bento-work__card--feature"
                  : index === 1
                    ? "bento-work__card bento-work__card--top"
                    : "bento-work__card bento-work__card--bottom"
              }
            >
              <span className="bento-work__shine" aria-hidden />
              <span className="bento-work__index">{`0${index + 1}`}</span>
              <RevealText
                as="h2"
                mode="heading"
                className={
                  index === 0
                    ? "bento-work__title bento-work__title--feature"
                    : "bento-work__title"
                }
              >
                {story.title}
              </RevealText>
              <RevealText as="p" mode="paragraph" className="bento-work__copy">
                {story.summary}
              </RevealText>
              <span className="bento-work__cta">
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
        <Link to="/work" className="hyper-button mt-10">
          View All Work <ArrowRight className="h-4 w-4" />
        </Link>
      </SectionFrame>

      <SectionFrame eyebrow="Featured Transformation" title="A Preview Of What Changes After Hyperaware" contentClassName="mt-12">
        <div className="ba-section">
          <div className="ba-section__slider max-w-3xl">
            <BeforeAfterSlider label="Creative transformation" before="Inconsistent brand presence" after="Premium conversion-ready system" slotId="homepage-creative-transformation" />
          </div>
          <div className="ba-section__benefits">
            <div className="ba-section__column ba-section__column--before">
              <p className="ba-section__column-title">Before</p>
              {BEFORE_BENEFITS.map((label) => (
                <span key={label} className="ba-chip ba-chip--before">
                  <X className="h-3.5 w-3.5" aria-hidden />
                  {label}
                </span>
              ))}
            </div>
            <div className="ba-section__column ba-section__column--after">
              <p className="ba-section__column-title">After</p>
              {AFTER_BENEFITS.map((label) => (
                <span key={label} className="ba-chip ba-chip--after">
                  <Check className="h-3.5 w-3.5" aria-hidden />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Link to="/clients" className="hyper-button mt-10">
          See Results <ArrowRight className="h-4 w-4" />
        </Link>
      </SectionFrame>

      <SectionFrame eyebrow="Results" title="Small Signals, Bigger Systems Behind Them" contentClassName="mt-12">
        <MetricFlow />
      </SectionFrame>

      <SectionFrame eyebrow="Get Started" title="Ready To Build A Sharper Brand System?">
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
