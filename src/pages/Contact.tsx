import { useEffect, useState } from "react";
import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import RevealText from "@/components/RevealText";
import SectionFrame from "@/components/SectionFrame";
import { contact, processSteps } from "@/content/hyperaware";

const Contact = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <SectionFrame contentClassName="mt-8">
        {isMobile ? (
          <div className="flex flex-col gap-6 w-full">
            <div>
              <h1 className="text-2xl font-black text-[hsl(266_70%_18%)] leading-tight">
                Let&apos;s Build Your Brand Together
              </h1>
              <p className="mt-4 text-base font-bold leading-snug">
                Start your project, request a rate card, or ask for a custom quote.
              </p>
            </div>

            {/* Contact info first on mobile */}
            <aside className="hyper-panel p-5 border border-[hsl(266_65%_25%)]/10 bg-white/40 backdrop-blur-md">
              <h2 className="text-xl font-black uppercase text-[hsl(266_70%_18%)]">
                Contact Us
              </h2>
              <div className="mt-6 space-y-4 text-base font-semibold">
                <a className="hyper-contact-link justify-start flex items-center gap-3 text-purple-900/90" href={contact.emailHref}>
                  <Mail className="h-4.5 w-4.5" />
                  <span>{contact.email}</span>
                </a>
                <a className="hyper-contact-link justify-start flex items-center gap-3 text-purple-900/90" href={contact.phoneHref}>
                  <Phone className="h-4.5 w-4.5" />
                  <span>{contact.phone}</span>
                </a>
                <p className="hyper-contact-link items-start justify-start flex gap-3 text-purple-900/90">
                  <MapPin className="mt-1 h-4.5 w-4.5 shrink-0" />
                  <span>{contact.address}</span>
                </p>
                <a
                  className="hyper-contact-link justify-start underline flex items-center gap-3 text-purple-900/90"
                  href={contact.instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-4.5 w-4.5" />
                  <span>{contact.instagramLabel}</span>
                </a>
              </div>
              <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="hyper-button mt-6 w-full justify-center">
                <MessageCircle className="h-4 w-4 mr-1.5" />
                Talk on WhatsApp
              </a>
            </aside>

            {/* Inquiry form second */}
            <form action={contact.formAction} method="POST" className="hyper-panel grid gap-4 p-5 border border-[hsl(266_65%_25%)]/10 bg-white/40 backdrop-blur-md">
              <h2 className="text-xl font-black uppercase text-[hsl(266_70%_18%)]">
                Inquiry
              </h2>
              <input type="hidden" name="_subject" value="New Hyperaware website inquiry" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value={contact.formRedirect} />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
              <input className="hyper-input text-sm p-3" name="name" placeholder="Name" autoComplete="name" required />
              <input className="hyper-input text-sm p-3" name="email" type="email" placeholder="Email" autoComplete="email" required />
              <input className="hyper-input text-sm p-3" name="phone" type="tel" placeholder="Phone number" autoComplete="tel" />
              <input className="hyper-input text-sm p-3" name="service" placeholder="Service needed" autoComplete="off" />
              <textarea className="hyper-input text-sm p-3 min-h-24 resize-y" name="message" placeholder="Tell us about your brand" required />
              <button type="submit" className="hyper-button w-full justify-center mt-2">
                Send Message
              </button>
            </form>
          </div>
        ) : (
          <div className="grid min-h-[70svh] items-start gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.82fr)]">
            <div>
              <RevealText as="h1" mode="heading" className="hyper-display">
                Let&apos;s Build Your Brand Together
              </RevealText>
              <RevealText as="p" mode="heading" className="mt-8 max-w-xl text-2xl font-bold leading-snug">
                Start your project, request a rate card, or ask for a custom quote.
              </RevealText>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="hyper-button">
                  <MessageCircle className="h-4 w-4" />
                  Book Consultation
                </a>
                <a href={contact.emailHref} className="hyper-button hyper-button--light">
                  Email Us
                </a>
              </div>

              <form action={contact.formAction} method="POST" className="hyper-panel mt-8 grid gap-4 p-8">
                <RevealText as="h2" mode="heading" className="text-3xl font-black uppercase">
                  Inquiry
                </RevealText>
                <input type="hidden" name="_subject" value="New Hyperaware website inquiry" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value={contact.formRedirect} />
                <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
                <input className="hyper-input" name="name" placeholder="Name" autoComplete="name" required />
                <input className="hyper-input" name="email" type="email" placeholder="Email" autoComplete="email" required />
                <input className="hyper-input" name="phone" type="tel" placeholder="Phone number" autoComplete="tel" />
                <input className="hyper-input" name="service" placeholder="Service needed" autoComplete="off" />
                <textarea className="hyper-input min-h-32 resize-y" name="message" placeholder="Tell us about your brand" required />
                <button type="submit" className="hyper-button w-fit">
                  Send Message
                </button>
              </form>
            </div>

            <aside className="hyper-panel sticky top-32 p-8">
              <RevealText as="h2" mode="heading" className="text-3xl font-black uppercase">
                Contact Us
              </RevealText>
              <div className="mt-8 space-y-5 text-lg font-semibold">
                <a className="hyper-contact-link justify-start" href={contact.emailHref}>
                  <Mail className="h-5 w-5" />
                  <RevealText as="span" mode="text">{contact.email}</RevealText>
                </a>
                <a className="hyper-contact-link justify-start" href={contact.phoneHref}>
                  <Phone className="h-5 w-5" />
                  <RevealText as="span" mode="text">{contact.phone}</RevealText>
                </a>
                <p className="hyper-contact-link items-start justify-start">
                  <MapPin className="mt-1 h-5 w-5 shrink-0" />
                  <RevealText as="span" mode="text">{contact.address}</RevealText>
                </p>
                <a
                  className="hyper-contact-link justify-start underline"
                  href={contact.instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                  <RevealText as="span" mode="text">{contact.instagramLabel}</RevealText>
                </a>
              </div>
              <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="hyper-button mt-8 w-full">
                <MessageCircle className="h-4 w-4" />
                Talk on WhatsApp
              </a>
            </aside>
          </div>
        )}
      </SectionFrame>

      <SectionFrame eyebrow="Process" title="What happens after you get started." contentClassName="mt-12">
        <div className="mobile-rail grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <div key={step} className="hyper-panel p-6">
              <RevealText as="p" mode="text" className="text-xs font-bold uppercase tracking-[0.28em] text-[hsl(266_45%_25%)]/55">
                {`Step ${index + 1}`}
              </RevealText>
              <RevealText as="h2" mode="heading" className="mt-4 text-2xl font-semibold">
                {step}
              </RevealText>
            </div>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame eyebrow="Rate Card" title="Request the right package for your brand." contentClassName="mt-12">
        <div className="max-w-2xl mx-auto">
          <article className="hyper-panel p-6 text-center flex flex-col items-center gap-4 border border-[hsl(266_65%_25%)]/10 bg-white/40 backdrop-blur-md">
            <RevealText as="h2" mode="heading" className="text-2xl font-black text-[hsl(266_70%_18%)]">
              Creative & Growth Packages
            </RevealText>
            <RevealText as="p" mode="paragraph" className="leading-relaxed text-[hsl(266_35%_24%)]/80 max-w-lg">
              We design custom-tailored creative, strategy, and execution packages based on your brand's current phase and growth goals. Request our latest rate card or schedule a consultation for a custom quote.
            </RevealText>
            <a href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="hyper-button mt-4">
              Request Rate Card
            </a>
          </article>
        </div>
      </SectionFrame>
    </>
  );
};

export default Contact;
