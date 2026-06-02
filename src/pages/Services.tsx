import { Link } from "react-router-dom";
import ProcessFlow from "@/components/ProcessFlow";
import SectionFrame from "@/components/SectionFrame";
import ServiceOrbit from "@/components/ServiceOrbit";
import { faqItems } from "@/content/hyperaware";

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

      <SectionFrame eyebrow="Process" title="How The Service System Moves From Idea To Scale" contentClassName="mt-12">
        <ProcessFlow />
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
