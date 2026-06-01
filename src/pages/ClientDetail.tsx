import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight, Camera } from "lucide-react";
import { cn } from "@/lib/utils";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import RevealText from "@/components/RevealText";
import SectionFrame from "@/components/SectionFrame";
import { clientProfiles } from "@/content/hyperaware";
import { onImageError, placeholderVisuals } from "@/content/placeholderVisuals";

const clientGalleryVisuals = [
  placeholderVisuals.contentCreation.fashionShoots[2],
  placeholderVisuals.videography.production[0],
  placeholderVisuals.socialMedia.instagramGrids[1],
];

const ClientDetail = () => {
  const { slug } = useParams();
  const client = clientProfiles.find((item) => item.slug === slug);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!client) return;
    document.title = `${client.name} Client Case Study | Hyperaware`;
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute(
      "content",
      `${client.name} client page for Hyperaware services, growth metrics, transformation, gallery, and case study placeholders.`,
    );
  }, [client]);

  if (!client) {
    return <Navigate to="/clients" replace />;
  }

  return (
    <>
      <SectionFrame eyebrow="Client" title={client.name} contentClassName="mt-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.42fr]">
          <div className="hyper-panel p-7 md:p-9">
            <span className="hyper-logo-frame max-w-xs">
              <img src={client.logo} alt={`${client.name} logo`} />
            </span>
            <RevealText as="p" mode="text" className="mt-8 hyper-eyebrow">
              {client.industry}
            </RevealText>
            <RevealText as="p" mode="paragraph" className="mt-5 max-w-3xl text-xl leading-relaxed text-[hsl(266_35%_24%)]/76">
              {client.description}
            </RevealText>
          </div>
          <aside className="hyper-panel flex flex-col justify-between p-7">
            <div>
              <p className="hyper-eyebrow">Engagement</p>
              <h2 className="mt-4 text-3xl font-black">{client.joined}</h2>
            </div>
            <Link to="/contact" className="hyper-button mt-8">
              Start Your Project <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="Spotlight" title="A visual snapshot of the client system." contentClassName="mt-12">
        {isMobile ? (
          <div className="flex flex-col gap-4">
            <article className="w-full rounded-2xl overflow-hidden border border-[hsl(266_65%_25%)]/10 aspect-[16/10] relative">
              <img src={placeholderVisuals.contentCreation.campaignVisuals[2]} alt={`${client.name} hero placeholder`} className="w-full h-full object-cover" onError={onImageError} />
              <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1.5 rounded-full font-bold">Hero image</span>
            </article>
            <article className="hyper-panel p-5 border border-[hsl(266_65%_25%)]/10">
              <p className="hyper-eyebrow">{client.metrics[0].label}</p>
              <p className="mt-3 text-3xl font-black text-[hsl(266_70%_18%)]">{client.metrics[0].value}</p>
            </article>
            <article className="hyper-panel p-5 border border-[hsl(266_65%_25%)]/10">
              <p className="hyper-eyebrow">Client story</p>
              <p className="mt-3 text-base font-black leading-snug text-[hsl(266_70%_18%)]">{client.experience.story}</p>
            </article>
            <div className="w-full">
              <BeforeAfterSlider label={`${client.name} preview`} before={client.transformations[0].before} after={client.transformations[0].after} />
            </div>
            <article className="w-full rounded-2xl overflow-hidden border border-[hsl(266_65%_25%)]/10 aspect-[16/10] relative">
              <img src={placeholderVisuals.socialMedia.instagramGrids[2]} alt={`${client.name} gallery placeholder`} className="w-full h-full object-cover" onError={onImageError} />
              <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1.5 rounded-full font-bold">Gallery</span>
            </article>
            <article className="hyper-panel p-5 border border-[hsl(266_65%_25%)]/10">
              <p className="hyper-eyebrow">Timeline</p>
              <p className="mt-3 text-xl font-black text-[hsl(266_70%_18%)]">{client.timeline.join(" / ")}</p>
            </article>
          </div>
        ) : (
          <div className="mosaic-grid mosaic-grid--client">
            <article className="mosaic-card mosaic-card--large hyper-panel">
              <img src={placeholderVisuals.contentCreation.campaignVisuals[2]} alt={`${client.name} hero placeholder`} onError={onImageError} />
              <span>Hero image</span>
            </article>
            <article className="mosaic-card hyper-panel p-6">
              <p className="hyper-eyebrow">{client.metrics[0].label}</p>
              <p className="mt-4 text-4xl font-black">{client.metrics[0].value}</p>
            </article>
            <article className="mosaic-card hyper-panel p-6">
              <p className="hyper-eyebrow">Client story</p>
              <p className="mt-4 text-lg font-black leading-snug">{client.experience.story}</p>
            </article>
            <div className="mosaic-card mosaic-card--wide">
              <BeforeAfterSlider label={`${client.name} preview`} before={client.transformations[0].before} after={client.transformations[0].after} />
            </div>
            <article className="mosaic-card hyper-panel">
              <img src={placeholderVisuals.socialMedia.instagramGrids[2]} alt={`${client.name} gallery placeholder`} onError={onImageError} />
              <span>Gallery</span>
            </article>
            <article className="mosaic-card hyper-panel p-6">
              <p className="hyper-eyebrow">Timeline</p>
              <p className="mt-4 text-2xl font-black">{client.timeline.join(" / ")}</p>
            </article>
          </div>
        )}
      </SectionFrame>

      <SectionFrame eyebrow="Client Story" title="Problem, goal, and what changed." contentClassName="mt-12">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Problem", client.story.problem],
            ["Goal", client.story.goal],
            ["What changed after Hyperaware", client.story.change],
          ].map(([title, copy]) => (
            <article key={title} className="hyper-panel p-6" data-slot="client-story" data-slot-id={`${client.slug}-${title.toLowerCase().replace(/\s+/g, "-")}`}>
              <RevealText as="h2" mode="heading" className="text-2xl font-black">
                {title}
              </RevealText>
              <RevealText as="p" mode="paragraph" className="mt-4 leading-relaxed text-[hsl(266_35%_24%)]/72">
                {copy}
              </RevealText>
            </article>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="Before / After" title="Transformation slots ready for real assets." contentClassName="mt-12">
        <div className="grid gap-5 md:grid-cols-2">
          {client.transformations.map((item) => (
            <BeforeAfterSlider key={item.label} {...item} slotId={`${client.slug}-${item.label.toLowerCase().replace(/\s+/g, "-")}`} />
          ))}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="Growth Metrics" title="Performance placeholders for future reporting." contentClassName="mt-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {client.metrics.map((metric) => (
            <div key={metric.label} className="hyper-panel p-6" data-slot="growth-metric" data-slot-id={`${client.slug}-${metric.label.toLowerCase().replace(/\s+/g, "-")}`}>
              <p className="hyper-eyebrow">{metric.label}</p>
              <p className="mt-4 text-4xl font-black">{metric.value}</p>
            </div>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="Gallery" title="Photos, videos, and reels placeholders." contentClassName="mt-12">
        <div className="grid gap-5 md:grid-cols-3">
          {client.gallery.map((item, index) => (
            <div key={item} className="hyper-media-placeholder" data-slot="client-gallery" data-slot-id={`${client.slug}-${item.toLowerCase()}`}>
              <img src={clientGalleryVisuals[index % clientGalleryVisuals.length]} alt={`${client.name} ${item} placeholder`} onError={onImageError} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="Case Study" title="Challenge, strategy, execution, and result." contentClassName="mt-12">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.45fr]">
          <div className="grid gap-5 md:grid-cols-2">
            {Object.entries(client.caseStudy).map(([label, copy]) => (
              <article key={label} className="hyper-panel p-6" data-slot="case-study" data-slot-id={`${client.slug}-${label}`}>
                <h2 className="text-2xl font-black capitalize">{label}</h2>
                <p className="mt-4 leading-relaxed text-[hsl(266_35%_24%)]/72">{copy}</p>
              </article>
            ))}
          </div>
          <aside className="hyper-panel p-6" data-slot="case-study-timeline" data-slot-id={`${client.slug}-timeline`}>
            <p className="hyper-eyebrow">Timeline</p>
            <div className="mt-6 space-y-4">
              {client.timeline.map((item, index) => (
                <div key={item} className="flex items-center gap-4">
                  <span className="hyper-icon h-9 w-9 text-sm">{index + 1}</span>
                  <span className="text-lg font-black">{item}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="Client Experience" title="Approved client story placeholder." contentClassName="mt-12">
        <article className="hyper-panel grid gap-6 p-7 md:grid-cols-[12rem_1fr]" data-slot="client-experience" data-slot-id={client.slug}>
          <div className="hyper-media-placeholder min-h-32 md:min-h-48 flex flex-col items-center justify-center bg-purple-50/40 border border-purple-100/10 rounded-xl p-4 gap-2">
            <Camera className="h-6 w-6 text-purple-700/60" />
            <span className="text-[10px] uppercase tracking-wider font-bold text-purple-800/70">Content Coming Soon</span>
          </div>
          <div>
            <p className="hyper-eyebrow">{client.experience.brand}</p>
            <h2 className="mt-3 text-3xl font-black">{client.experience.name}</h2>
            <p className="mt-5 text-xl leading-relaxed text-[hsl(266_35%_24%)]/74">{client.experience.story}</p>
          </div>
        </article>
      </SectionFrame>
    </>
  );
};

export default ClientDetail;
