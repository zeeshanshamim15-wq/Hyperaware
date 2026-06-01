import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import RevealText from "@/components/RevealText";
import SectionFrame from "@/components/SectionFrame";
import { allServices } from "@/content/hyperaware";
import {
  onImageError,
  serviceVisualFallback,
  serviceVisuals,
} from "@/content/placeholderVisuals";

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = allServices.find((item) => item.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const Icon = service.icon;
  const related = allServices.filter((item) => item.slug !== service.slug).slice(0, 4);
  const media = serviceVisuals[service.slug] ?? serviceVisualFallback;

  return (
    <>
      <SectionFrame eyebrow="Service" title={service.pageTitle} contentClassName="mt-10">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.78fr]">
          <div>
            <div className="hyper-icon mb-7">
              <Icon className="h-5 w-5" />
            </div>
            <RevealText as="p" mode="paragraph" className="max-w-3xl text-xl leading-relaxed text-[hsl(266_35%_24%)]/78 md:text-2xl">
              {service.pageCopy}
            </RevealText>
            <RevealText as="p" mode="paragraph" className="mt-6 max-w-3xl text-lg leading-relaxed text-[hsl(266_35%_24%)]/68">
              {service.detail}
            </RevealText>
            <Link to="/contact" className="hyper-button mt-9">
              Start This Service <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-5">
            <div className="service-page-showcase hyper-panel overflow-hidden p-0">
              <div className="service-page-showcase__hero">
                <img src={media.hero} alt={`${service.title} ${media.label}`} loading="eager" onError={onImageError} />
                <span>{media.label}</span>
              </div>
              <div className="service-page-showcase__gallery">
                {media.gallery.map((image, index) => (
                  <div key={image} className="service-page-showcase__thumb">
                    <img src={image} alt={`${service.title} visual slot ${index + 1}`} loading="lazy" onError={onImageError} />
                  </div>
                ))}
              </div>
            </div>

            <aside className="hyper-panel p-7">
              <RevealText as="h2" mode="heading" className="text-2xl font-semibold">
                What We Handle
              </RevealText>
              <ul className="mt-6 space-y-4">
                {service.deliverables.map((item) => (
                  <li key={item} className="flex gap-3 text-base font-semibold text-[hsl(266_55%_22%)]">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[hsl(266_70%_18%)]" />
                    <RevealText as="span" mode="text">{item}</RevealText>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="Explore" title="More ways Hyperaware can support your brand." contentClassName="mt-12">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => {
            const RelatedIcon = item.icon;
            return (
              <Link key={item.slug} to={`/services/${item.slug}`} className="hyper-panel p-6">
                <RelatedIcon className="mb-5 h-6 w-6" />
                <RevealText as="h3" mode="text" className="text-lg font-semibold">
                  {item.title}
                </RevealText>
                <RevealText as="p" mode="paragraph" className="mt-3 text-sm leading-relaxed text-[hsl(266_35%_24%)]/68">
                  {item.intro}
                </RevealText>
              </Link>
            );
          })}
        </div>
      </SectionFrame>
    </>
  );
};

export default ServiceDetail;
