import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import BrandLogoCard from "@/components/BrandLogoCard";
import RevealText from "@/components/RevealText";
import SectionFrame from "@/components/SectionFrame";
import { brandLogos, clientProfiles } from "@/content/hyperaware";

const Clients = () => {
  const featured = clientProfiles.slice(0, 6);

  return (
    <>
      <SectionFrame eyebrow="Clients" title="Brands We Have Worked With" contentClassName="mt-12">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {brandLogos.map((brand) => (
            <BrandLogoCard key={brand.name} brand={brand} />
          ))}
          <RevealText as="div" mode="heading" className="hyper-brand-tile text-3xl">
            + Many More
          </RevealText>
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="Client Previews" title="Growth-ready slots for every brand story." contentClassName="mt-12">
        <div className="mobile-rail grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((client) => (
            <Link key={client.slug} to={`/clients/${client.slug}`} className="hyper-panel block p-6" data-slot="client-story-preview" data-slot-id={client.slug}>
              <span className="hyper-logo-frame">
                <img src={client.logo} alt={`${client.name} logo`} loading="lazy" />
              </span>
              <RevealText as="p" mode="text" className="mt-5 hyper-eyebrow">
                {client.industry}
              </RevealText>
              <RevealText as="h2" mode="heading" className="mt-3 text-2xl font-black">
                {client.name}
              </RevealText>
              <RevealText as="p" mode="paragraph" className="mt-4 text-sm leading-relaxed text-[hsl(266_35%_24%)]/70">
                {client.description}
              </RevealText>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[hsl(266_70%_18%)]">
                Open client page <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="Growth Previews" title="Metrics placeholders ready for real reporting." contentClassName="mt-12">
        <div className="mobile-rail grid gap-4 md:grid-cols-3">
          {featured.slice(0, 3).map((client) => (
            <div key={client.slug} className="hyper-panel p-6" data-slot="growth-metrics-preview" data-slot-id={client.slug}>
              <p className="hyper-eyebrow">{client.name}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {client.metrics.slice(0, 4).map((metric) => (
                  <div key={metric.label}>
                    <p className="text-2xl font-black">{metric.value}</p>
                    <p className="mt-1 text-xs font-bold text-[hsl(266_35%_24%)]/62">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="Featured Transformations" title="Before and after previews from the client system." contentClassName="mt-12">
        <div className="mobile-rail grid gap-5 md:grid-cols-2">
          {featured.slice(0, 2).map((client) => (
            <BeforeAfterSlider
              key={client.slug}
              label={`${client.name} transformation`}
              before={client.transformations[0].before}
              after={client.transformations[0].after}
              slotId={`${client.slug}-featured`}
            />
          ))}
        </div>
      </SectionFrame>
    </>
  );
};

export default Clients;
