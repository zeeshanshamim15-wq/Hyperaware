import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
      <SectionFrame title="About Us" contentClassName="mt-10 max-w-5xl">
        <div className="space-y-7 text-[1.35rem] leading-relaxed text-[hsl(266_70%_18%)] sm:text-[1.55rem]">
          {aboutParagraphs.map((paragraph) => (
            <RevealText key={paragraph} as="p" mode="paragraph">
              {paragraph}
            </RevealText>
          ))}
        </div>
        <RevealText as="p" mode="heading" className="mt-10 text-2xl font-bold">
          No marketing jargon. Just honest work, made to deliver results.
        </RevealText>
        <Link to="/services" className="hyper-button mt-10">
          Explore Services
        </Link>
      </SectionFrame>

      <SectionFrame eyebrow="Our Story" title="The people system behind the work." className="about-team-section" contentClassName="mt-12">
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
                className="w-[82vw] max-w-sm shrink-0 snap-center hyper-panel p-6 flex flex-col gap-4 border border-[hsl(266_65%_25%)]/10 bg-white/40 backdrop-blur-md"
              >
                <div className="flex items-center gap-4">
                  <div className="hyper-avatar-placeholder w-12 h-12 shrink-0 flex items-center justify-center rounded-full text-base font-black bg-purple-100/60 text-purple-900/80">HA</div>
                  <div>
                    <h3 className="text-base font-black text-[hsl(266_70%_18%)] leading-tight">{item.role}</h3>
                    <p className="text-xs font-bold text-muted-foreground mt-0.5">{item.title}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-[hsl(266_35%_24%)]/80">
                  {item.copy}
                </p>
              </article>
            ))}
            <article 
              className="w-[82vw] max-w-sm shrink-0 snap-center hyper-panel overflow-hidden p-0 relative aspect-[4/3] border border-[hsl(266_65%_25%)]/10" 
              data-slot="team-bts" 
              data-slot-id="culture-office-bts"
            >
              <img 
                src={placeholderVisuals.bts.teamWorking[2]} 
                alt="Hyperaware culture and production preview" 
                className="w-full h-full object-cover opacity-80" 
                onError={onImageError} 
              />
              <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1.5 rounded-full font-bold">
                Culture / office / BTS
              </div>
            </article>
          </div>
        ) : (
          <div className="mosaic-grid mosaic-grid--team">
            {teamCards.map((item, index) => (
              <article
                key={item.role}
                data-slot="team-member"
                data-slot-id={item.role}
                className={index === 0 ? "mosaic-card mosaic-card--large hyper-panel p-6" : index === 1 ? "mosaic-card mosaic-card--wide hyper-panel p-6" : "mosaic-card hyper-panel p-6"}
              >
                <div className="hyper-avatar-placeholder">HA</div>
                <RevealText as="h2" mode="heading" className="mt-5 text-2xl font-black">
                  {item.title}
                </RevealText>
                <RevealText as="p" mode="text" className="mt-2 font-bold text-[hsl(266_45%_25%)]/70">
                  {item.role}
                </RevealText>
                <RevealText as="p" mode="paragraph" className="mt-4 text-sm leading-relaxed text-[hsl(266_35%_24%)]/68">
                  {item.copy}
                </RevealText>
              </article>
            ))}
            <article className="mosaic-card mosaic-card--wide hyper-panel" data-slot="team-bts" data-slot-id="culture-office-bts">
              <img src={placeholderVisuals.bts.teamWorking[2]} alt="Hyperaware culture and production preview" onError={onImageError} />
              <span>Culture / office / BTS</span>
            </article>
          </div>
        )}
      </SectionFrame>

      <SectionFrame eyebrow="Timeline" title="A future-ready company story structure." contentClassName="mt-12">
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

      <SectionFrame eyebrow="Culture" title="How the Hyperaware team is designed to work." contentClassName="mt-12">
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

export default About;
