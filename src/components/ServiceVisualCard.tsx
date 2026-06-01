import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ComponentType } from "react";
import RevealText from "@/components/RevealText";

type ServiceVisualCardProps = {
  service: {
    title: string;
    slug: string;
    intro: string;
    icon: ComponentType<{ className?: string }>;
  };
  visual: {
    image: string;
    label: string;
    chips: string[];
  };
};

const ServiceVisualCard = ({ service, visual }: ServiceVisualCardProps) => {
  const Icon = service.icon;

  return (
    <Link to={`/services/${service.slug}`} className="service-visual-card hyper-panel block overflow-hidden p-0">
      <div className="service-visual-card__media">
        <img src={visual.image} alt={`${service.title} visual placeholder`} loading="lazy" />
        <div className="service-visual-card__float">
          <span className="hyper-icon h-9 w-9">
            <Icon className="h-4 w-4" />
          </span>
          <span>{visual.label}</span>
        </div>
      </div>
      <div className="p-6">
        <RevealText as="h2" mode="text" className="text-xl font-black">
          {service.title}
        </RevealText>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[hsl(266_35%_24%)]/68">
          {service.intro}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {visual.chips.map((chip) => (
            <span key={chip} className="hyper-pill">
              {chip}
            </span>
          ))}
        </div>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-black">
          Explore <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
};

export default ServiceVisualCard;
