import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import RevealText from "@/components/RevealText";
import { allServices, contact, navItems } from "@/content/hyperaware";
import hyperawareLogo from "@/assets/hyperaware-logo.png";

export const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const footerServices = allServices.filter((service) =>
    ["branding", "social-media", "content-creation", "performance-marketing", "photography"].includes(service.slug),
  );

  if (isMobile) {
    return (
      <footer id="footer" className="relative z-10 px-4 py-8 bg-background border-t border-[hsl(266_35%_24%)]/10">
        <div className="flex flex-col gap-6">
          {/* Logo & Headline */}
          <div className="flex flex-col gap-3">
            <img src={hyperawareLogo} alt="Hyperaware" className="h-10 w-24 object-contain" draggable={false} />
            <h2 className="text-lg font-light leading-tight text-[hsl(266_70%_18%)]">
              Let's build your brand <span className="font-black">with purpose.</span>
            </h2>
          </div>

          {/* Accordion Layout */}
          <div className="flex flex-col border-t border-purple-100/10 mt-2">
            {/* Services Accordion */}
            <div className="border-b border-purple-100/10">
              <button 
                onClick={() => toggleAccordion("services")} 
                className="w-full py-3 flex justify-between items-center text-sm font-black uppercase text-[hsl(266_70%_18%)]"
              >
                <span>Services</span>
                {openAccordion === "services" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {openAccordion === "services" && (
                <ul className="pl-2 pb-3 space-y-2 text-xs">
                  {footerServices.map((service) => (
                    <li key={service.slug}>
                      <Link to={`/services/${service.slug}`} className="mars-footer-link block py-1">
                        {service.title}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link to="/services" className="mars-footer-link block py-1 font-black">
                      View all services
                    </Link>
                  </li>
                </ul>
              )}
            </div>

            {/* Company Accordion */}
            <div className="border-b border-purple-100/10">
              <button 
                onClick={() => toggleAccordion("company")} 
                className="w-full py-3 flex justify-between items-center text-sm font-black uppercase text-[hsl(266_70%_18%)]"
              >
                <span>Company</span>
                {openAccordion === "company" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {openAccordion === "company" && (
                <ul className="pl-2 pb-3 space-y-2 text-xs">
                  {navItems.map((item) => (
                    <li key={item.label}>
                      <Link to={item.to} className="mars-footer-link block py-1">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Contact Accordion */}
            <div className="border-b border-purple-100/10">
              <button 
                onClick={() => toggleAccordion("contact")} 
                className="w-full py-3 flex justify-between items-center text-sm font-black uppercase text-[hsl(266_70%_18%)]"
              >
                <span>Contact</span>
                {openAccordion === "contact" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              {openAccordion === "contact" && (
                <ul className="pl-2 pb-3 space-y-3 text-xs text-[hsl(266_55%_22%)]/90">
                  <li className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>{contact.address}</span>
                  </li>
                  <li>
                    <a href={contact.emailHref} className="mars-footer-link flex items-center gap-2.5">
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      <span>{contact.email}</span>
                    </a>
                  </li>
                  <li>
                    <a href={contact.phoneHref} className="mars-footer-link flex items-center gap-2.5">
                      <Phone className="h-3.5 w-3.5 shrink-0" />
                      <span>{contact.phone}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={contact.instagramHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mars-footer-link flex items-center gap-2.5"
                    >
                      <Instagram className="h-3.5 w-3.5 shrink-0" />
                      <span>{contact.instagramLabel}</span>
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>

          {/* Footer Copyright */}
          <div className="mt-4 flex flex-col gap-2 pt-4 border-t border-[hsl(266_35%_24%)]/14 text-[10px] text-[hsl(266_55%_22%)]/80">
            <p>Copyright 2026 Hyperaware. All rights reserved.</p>
            <a href={contact.websiteHref} target="_blank" rel="noopener noreferrer" className="mars-footer-link">
              {contact.website}
            </a>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer id="footer" className="relative z-10 px-4 pb-10 pt-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-[1240px] border-t border-[hsl(266_35%_24%)]/10 py-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <img src={hyperawareLogo} alt="Hyperaware" className="h-16 w-36 object-contain" draggable={false} />
            <RevealText
              as="h2"
              mode="heading"
              className="mt-5 max-w-md text-3xl font-light leading-tight"
              segments={[
                { text: "Let's build your brand" },
                { text: "with purpose.", className: "font-black" },
              ]}
            />
            <RevealText as="p" mode="paragraph" className="mt-4 max-w-md text-[hsl(266_55%_22%)]/90">
              Creative, content, marketing, and digital systems for brands that
              want clarity and measurable execution.
            </RevealText>
          </div>

          <div>
            <RevealText as="h3" mode="text" className="mars-footer-heading">Services</RevealText>
            <ul className="mt-5 space-y-3">
              {footerServices.map((service) => (
                <li key={service.slug}>
                  <Link to={`/services/${service.slug}`} className="mars-footer-link">
                    <RevealText as="span" mode="text">{service.title}</RevealText>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="mars-footer-link font-black">
                  <RevealText as="span" mode="text">View all services</RevealText>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <RevealText as="h3" mode="text" className="mars-footer-heading">Company</RevealText>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="mars-footer-link">
                    <RevealText as="span" mode="text">{item.label}</RevealText>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <RevealText as="h3" mode="text" className="mars-footer-heading">Contact</RevealText>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3 text-[hsl(266_55%_22%)]/90">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <RevealText as="span" mode="text" className="leading-relaxed">{contact.address}</RevealText>
              </li>
              <li>
                <a href={contact.emailHref} className="mars-footer-link inline-flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0" />
                  <RevealText as="span" mode="text">{contact.email}</RevealText>
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className="mars-footer-link inline-flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0" />
                  <RevealText as="span" mode="text">{contact.phone}</RevealText>
                </a>
              </li>
              <li>
                <a
                  href={contact.instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mars-footer-link inline-flex items-center gap-3"
                >
                  <Instagram className="h-4 w-4 shrink-0" />
                  <RevealText as="span" mode="text">{contact.instagramLabel}</RevealText>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-[hsl(266_35%_24%)]/14 pt-6 text-xs text-[hsl(266_55%_22%)]/80 sm:flex-row">
          <RevealText as="p" mode="text">Copyright 2026 Hyperaware. All rights reserved.</RevealText>
          <a href={contact.websiteHref} target="_blank" rel="noopener noreferrer" className="mars-footer-link text-xs">
            <RevealText as="span" mode="text">{contact.website}</RevealText>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
