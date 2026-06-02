import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import JourneyTimeline from "@/components/JourneyTimeline";
import RevealText from "@/components/RevealText";
import SectionFrame from "@/components/SectionFrame";
import { aboutParagraphs, processSteps, teamPlaceholders } from "@/content/hyperaware";
import { onImageError, placeholderVisuals } from "@/content/placeholderVisuals";

const teamCards = teamPlaceholders.map((role) => ({
  role,
  title:
    role === "Founder"
      ? "Strategy and direction"
      : role === "Creative Lead"
        ? "Creative systems"
        : role === "Production Head"
          ? "Shoot and production"
          : role,
  copy:
    role === "Founder"
      ? "The core planning layer behind brand clarity, positioning, and business-led creative decisions."
      : role === "Creative Lead"
        ? "Visual direction for campaigns, content systems, identity, and the overall brand presentation."
        : role === "Production Head"
          ? "Planning and execution for shoots, studio workflows, raw assets, and final production quality."
          : "Specialist support across content, campaigns, design, reporting, and day-to-day brand execution.",
}));

const About = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      {/* Hero: premium vertical Story Timeline */}
      <section className="about-journey-hero">
        <JourneyTimeline />
      </section>

      <SectionFrame eyebrow="About Us" title="A Sharper Way To Build Modern Brands" contentClassName="mt-12 max-w-5xl">
        <div className="about-intro">
          <span className="about-intro__accent" aria-hidden />
          <div className="about-intro__body">
            {aboutParagraphs.map((paragraph) => (
              <RevealText key={paragraph} as="p" mode="paragraph" className="about-intro__paragraph">
                {paragraph}
              </RevealText>
            ))}
          </div>
        </div>
        <div className="about-intro__divider" aria-hidden />
        <RevealText as="p" mode="heading" className="about-intro__pull">
          No marketing jargon. Just honest work, made to deliver results.
        </RevealText>
        <Link to="/services" className="hyper-button mt-10">
          Explore Services
        </Link>
      </SectionFrame>

      <SectionFrame eyebrow="Our Story" title="The People System Behind The Work" className="about-team-section" contentClassName="mt-12">
        {isMobile ? (
          <div
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 pb-4 w-full -mx-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {teamCards.map((item) => (
              <article
                key={item.role}
                data-slot="team-member"
                data-slot-id={item.role}
                className="team-card team-card--mobile w-[82vw] max-w-sm shrink-0 snap-center"
              >
                <div className="team-card__head">
                  <div className="team-card__avatar">HA</div>
                  <div className="team-card__id">
                    <h3 className="team-card__role">{item.role}</h3>
                    <p className="team-card__title">{item.title}</p>
                  </div>
                </div>
                <p className="team-card__copy">{item.copy}</p>
              </article>
            ))}
            <article
              className="team-bts team-bts--mobile w-[82vw] max-w-sm shrink-0 snap-center"
              data-slot="team-bts"
              data-slot-id="culture-office-bts"
            >
              <img
                src={placeholderVisuals.bts.teamWorking[2]}
                alt="Hyperaware culture and production preview"
                onError={onImageError}
              />
              <div className="team-bts__label">Culture / office / BTS</div>
            </article>
          </div>
        ) : (
          <div className="team-grid">
            {teamCards.map((item, index) => (
              <article
                key={item.role}
                data-slot="team-member"
                data-slot-id={item.role}
                className={cnTeam(index)}
              >
                <div className="team-card__avatar">HA</div>
                <RevealText as="h2" mode="heading" className="team-card__heading">
                  {item.title}
                </RevealText>
                <RevealText as="p" mode="text" className="team-card__role-strong">
                  {item.role}
                </RevealText>
                <RevealText as="p" mode="paragraph" className="team-card__copy">
                  {item.copy}
                </RevealText>
                <span className="team-card__hover-glow" aria-hidden />
              </article>
            ))}
            <article className="team-bts mosaic-card mosaic-card--wide" data-slot="team-bts" data-slot-id="culture-office-bts">
              <img src={placeholderVisuals.bts.teamWorking[2]} alt="Hyperaware culture and production preview" onError={onImageError} />
              <span className="team-bts__label">Culture / office / BTS</span>
            </article>
          </div>
        )}
      </SectionFrame>

      <SectionFrame eyebrow="Timeline" title="A Future-Ready Company Story Structure" contentClassName="mt-12">
        <div className="mobile-rail grid gap-4 md:grid-cols-4">
          {[
            {
              title: "Founded",
              copy: "Hyperaware started with a clear goal: make digital growth feel sharper, cleaner, and more accountable.",
            },
            {
              title: "First brands",
              copy: "Early projects shaped the agency's focus on content, campaign systems, and premium brand presentation.",
            },
            {
              title: "Production system",
              copy: "Shoot planning, editing, design, and social execution became a connected workflow instead of separate tasks.",
            },
            {
              title: "Growth ecosystem",
              copy: "Strategy, creative, websites, ads, SEO, and reporting now work together as one brand growth system.",
            },
          ].map((item, index) => (
            <div key={item.title} className="hyper-panel p-6">
              <RevealText as="p" mode="text" className="hyper-eyebrow">
                {`Phase ${index + 1}`}
              </RevealText>
              <RevealText as="h2" mode="heading" className="mt-4 text-2xl font-black">
                {item.title}
              </RevealText>
              <RevealText as="p" mode="paragraph" className="mt-4 text-sm leading-relaxed text-[hsl(266_35%_24%)]/68">
                {item.copy}
              </RevealText>
            </div>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="Culture" title="How The Hyperaware Team Is Designed To Work" contentClassName="mt-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {processSteps.slice(0, 6).map((step) => (
            <div key={step} className="hyper-mini-card">
              <RevealText as="span" mode="text">{step}</RevealText>
            </div>
          ))}
        </div>
      </SectionFrame>
    </>
  );
};

// Mosaic positioning helper for the desktop team grid.
const cnTeam = (index: number) => {
  const base = "team-card";
  if (index === 0) return `${base} team-card--featured`;
  if (index === 1) return `${base} team-card--wide`;
  return base;
};

export default About;
