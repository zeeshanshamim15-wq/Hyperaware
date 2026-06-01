import { useEffect, useMemo, useState } from "react";
import RevealText from "@/components/RevealText";
import SectionFrame from "@/components/SectionFrame";
import { cn } from "@/lib/utils";
import {
  btsPlaceholders,
  photographyPlaceholders,
  portfolioCategories,
  portfolioStories,
  videographyPlaceholders,
} from "@/content/hyperaware";
import { onImageError, placeholderVisuals } from "@/content/placeholderVisuals";

const photographyVisuals = [
  placeholderVisuals.photography.editorial[0],
  placeholderVisuals.photography.editorial[1],
  placeholderVisuals.photography.lifestyle[0],
  placeholderVisuals.photography.product[0],
  placeholderVisuals.photography.product[1],
  placeholderVisuals.photography.lifestyle[1],
];

const videographyVisuals = [
  placeholderVisuals.videography.cameraSetups[0],
  placeholderVisuals.videography.production[0],
  placeholderVisuals.videography.editingWorkstations[0],
  placeholderVisuals.videography.cameraSetups[1],
  placeholderVisuals.videography.production[1],
];

const btsVisuals = [
  placeholderVisuals.bts.studioSetup[0],
  placeholderVisuals.bts.teamWorking[0],
  placeholderVisuals.bts.cameraOperation[0],
  placeholderVisuals.bts.editingProcess[0],
  placeholderVisuals.bts.studioSetup[1],
  placeholderVisuals.bts.teamWorking[1],
  placeholderVisuals.bts.cameraOperation[1],
];

const portfolioStoryVisuals: Record<string, string> = {
  "Social Media": placeholderVisuals.socialMedia.instagramGrids[0],
  "Content Creation": placeholderVisuals.contentCreation.fashionShoots[0],
  "Kidswear Campaigns": placeholderVisuals.contentCreation.campaignVisuals[0],
};

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Social Media", value: "social" },
  { label: "Content Creation", value: "content" },
  { label: "Photography", value: "photo" },
  { label: "Videography", value: "video" },
];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("stories");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const visibleCategories = useMemo(
    () =>
      activeFilter === "all"
        ? portfolioCategories
        : portfolioCategories.filter((category) => category.category === activeFilter),
    [activeFilter],
  );

  return (
    <>
      <SectionFrame title="Work" contentClassName="mt-14">
        {/* Horizontally scrollable filters on mobile */}
        <div 
          className="mb-8 flex overflow-x-auto scrollbar-none flex-nowrap gap-2 pb-2 w-full -mx-4 px-4 snap-x snap-mandatory" 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              className={cn(
                "hyper-filter shrink-0 snap-start",
                activeFilter === filter.value && "hyper-filter--active"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Mobile Tab Navigation */}
        {isMobile && (
          <div className="flex border-b border-[hsl(266_35%_24%)]/10 mb-8 w-full -mx-4 px-4 gap-2">
            {[
              { id: "stories", label: "Stories" },
              { id: "categories", label: "Categories" },
              { id: "galleries", label: "Galleries" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 text-center py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-200 border-b-2",
                  activeTab === tab.id
                    ? "border-purple-800 text-purple-900"
                    : "border-transparent text-muted-foreground"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {/* Stories & Mosaic Block */}
        {(!isMobile || activeTab === "stories") && (
          <>
            <div className="mosaic-grid mosaic-grid--work mb-12">
              <article className="mosaic-card mosaic-card--large hyper-panel" data-slot="portfolio-hero-campaign" data-slot-id="hero-campaign">
                <img src={placeholderVisuals.contentCreation.campaignVisuals[1]} alt="Large campaign placeholder" onError={onImageError} />
                <span>Hero campaign</span>
              </article>
              <article className="mosaic-card mosaic-card--tall hyper-panel" data-slot="photography" data-slot-id="featured-photography">
                <img src={placeholderVisuals.photography.editorial[2]} alt="Tall photography placeholder" onError={onImageError} />
                <span>Photography</span>
              </article>
              <article className="mosaic-card hyper-panel" data-slot="videography" data-slot-id="reel-preview">
                <img src={placeholderVisuals.videography.production[2]} alt="Reel preview placeholder" onError={onImageError} />
                <span>Reels</span>
              </article>
              <article className="mosaic-card hyper-panel" data-slot="bts" data-slot-id="bts-preview">
                <img src={placeholderVisuals.bts.cameraOperation[2]} alt="BTS placeholder" onError={onImageError} />
                <span>BTS</span>
              </article>
              <article className="mosaic-card mosaic-card--wide hyper-panel" data-slot="client-story" data-slot-id="social-preview">
                <img src={placeholderVisuals.socialMedia.campaignPreviews[0]} alt="Wide social preview placeholder" onError={onImageError} />
                <span>Social preview</span>
              </article>
            </div>

            <div className="mobile-rail grid gap-6 lg:grid-cols-3">
              {portfolioStories.map((story) => {
                const Icon = story.icon;
                return (
                  <article key={story.title} className="hyper-panel overflow-hidden p-0" data-slot="portfolio-story" data-slot-id={story.title.toLowerCase().replace(/\s+/g, "-")}>
                    <div className="flex h-56 md:h-72 items-center justify-center overflow-hidden border-b border-[hsl(266_35%_24%)]/10 bg-white/70">
                      <img
                        src={portfolioStoryVisuals[story.title] ?? story.image}
                        alt={story.title}
                        className="h-full w-full object-cover object-center"
                        loading="lazy"
                        onError={onImageError}
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3">
                        <span className="hyper-icon">
                          <Icon className="h-5 w-5" />
                        </span>
                        <RevealText as="h2" mode="heading" className="text-2xl font-black">
                          {story.title}
                        </RevealText>
                      </div>
                      <RevealText as="p" mode="paragraph" className="mt-4 leading-relaxed text-[hsl(266_45%_25%)]/80">
                        {story.summary}
                      </RevealText>
                      <ul className="mt-5 space-y-2">
                        {story.points.map((point) => (
                          <li key={point} className="flex gap-3 text-sm font-semibold">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[hsl(266_70%_18%)]" />
                            <RevealText as="span" mode="text">{point}</RevealText>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </SectionFrame>

      {/* Categories Block */}
      {(!isMobile || activeTab === "categories") && (
        <SectionFrame title="Portfolio Categories" contentClassName="mt-12">
          <div className="mobile-rail grid gap-5 md:grid-cols-2">
            {visibleCategories.map((category) => (
              <article key={category.title} className="hyper-panel p-7" data-slot="portfolio-category" data-slot-id={category.category}>
                <RevealText as="h2" mode="heading" className="text-2xl font-semibold">
                  {category.title}
                </RevealText>
                <div className="mt-5 flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span key={item} className="hyper-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </SectionFrame>
      )}

      {/* Galleries Block */}
      {(!isMobile || activeTab === "galleries") && (
        <>
          <SectionFrame eyebrow="Photography" title="Photography galleries ready for campaign assets." contentClassName="mt-12">
            <div className="mosaic-grid mosaic-grid--media">
              {photographyPlaceholders.map((item, index) => (
                <div key={item} data-slot="photography" data-slot-id={item.toLowerCase().replace(/\s+/g, "-")} className={index === 0 ? "mosaic-card mosaic-card--large hyper-media-placeholder" : index === 1 ? "mosaic-card mosaic-card--tall hyper-media-placeholder" : "mosaic-card hyper-media-placeholder"}>
                  <img
                    src={photographyVisuals[index % photographyVisuals.length]}
                    alt={`${item} placeholder`}
                    loading="lazy"
                    onError={onImageError}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </SectionFrame>

          <SectionFrame eyebrow="Videography" title="Video wall placeholders for reels, ads, and films." contentClassName="mt-12">
            <div className="mosaic-grid mosaic-grid--media">
              {videographyPlaceholders.map((item, index) => (
                <div key={item} data-slot="videography" data-slot-id={item.toLowerCase().replace(/\s+/g, "-")} className={index === 0 ? "mosaic-card mosaic-card--wide hyper-media-placeholder" : index === 1 ? "mosaic-card mosaic-card--tall hyper-media-placeholder" : "mosaic-card hyper-media-placeholder"}>
                  <img
                    src={videographyVisuals[index % videographyVisuals.length]}
                    alt={`${item} placeholder`}
                    loading="lazy"
                    onError={onImageError}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </SectionFrame>

          <SectionFrame eyebrow="Behind The Scenes" title="Production placeholders for studio, shoots, and editing." contentClassName="mt-12">
            <div className="mobile-rail grid gap-5 md:grid-cols-3 lg:grid-cols-4">
              {btsPlaceholders.map((item, index) => (
                <div key={item} className="hyper-media-placeholder hyper-media-placeholder--compact" data-slot="bts" data-slot-id={item.toLowerCase().replace(/\s+/g, "-")}>
                  <img
                    src={btsVisuals[index % btsVisuals.length]}
                    alt={`${item} placeholder`}
                    loading="lazy"
                    onError={onImageError}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </SectionFrame>
        </>
      )}
    </>
  );
};

export default Portfolio;
