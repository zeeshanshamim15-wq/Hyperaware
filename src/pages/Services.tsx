import { Link } from "react-router-dom";
import { BarChart3, Camera, Palette, Rocket, Route, Search, Scissors } from "lucide-react";
import SectionFrame from "@/components/SectionFrame";
import ServiceOrbit from "@/components/ServiceOrbit";
import { faqItems, processSteps } from "@/content/hyperaware";

const processIcons = [Search, Route, Palette, Camera, Scissors, Rocket, BarChart3];

const Services = () => {
  return (
    <>
      <SectionFrame
        eyebrow="Services Ecosystem"
        title="One Connected Operating System For Brand Growth"
        contentClassName="mt-10"
      >
        <ServiceOrbit />
      </SectionFrame>

      <SectionFrame eyebrow="Process" title="How the service system moves from idea to scale." contentClassName="mt-12">
        <div className="mobile-rail grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <div key={step} className="hyper-panel p-6">
              <span className="hyper-icon mb-5">
                {(() => {
                  const Icon = processIcons[index] ?? Search;
                  return <Icon className="h-5 w-5" />;
                })()}
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[hsl(266_45%_25%)]/55">
                {`Step ${index + 1}`}
              </p>
              <h2 className="mt-4 text-2xl font-semibold">
                {step}
              </h2>
            </div>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="FAQ" title="Service questions brands ask before starting." contentClassName="mt-12">
        <div className="mobile-rail grid gap-4 md:grid-cols-2">
          {faqItems.map((item) => (
            <article key={item.question} className="hyper-panel p-6">
              <h2 className="text-xl font-black">
                {item.question}
              </h2>
              <p className="mt-4 leading-relaxed text-[hsl(266_35%_24%)]/72">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
        <Link to="/contact" className="hyper-button mt-10">
          Get a Rate Card
        </Link>
      </SectionFrame>
    </>
  );
};

export default Services;
