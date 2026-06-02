import {
  BarChart3,
  Camera,
  Globe2,
  Layers3,
  Mail,
  Megaphone,
  MessageCircle,
  Palette,
  PenTool,
  ShoppingBag,
  Sparkles,
  Search,
  Target,
  TrendingUp,
  Video,
} from "lucide-react";

export const contact = {
  email: "info@hyperaware.in",
  emailHref: "mailto:info@hyperaware.in",
  phone: "+91 85849 48902",
  phoneHref: "tel:+918584948902",
  whatsappHref: "https://wa.me/918584948902?text=Hi%20Hyperaware%2C%20I%20want%20to%20discuss%20a%20project.",
  website: "www.hyperaware.in",
  websiteHref: "https://www.hyperaware.in",
  instagramLabel: "@hyperaware.in",
  instagramHref: "https://www.instagram.com/hyperaware.in/",
  formAction: "https://formsubmit.co/info@hyperaware.in",
  formRedirect: "https://www.hyperaware.in/contact?submitted=true",
  address:
    "9/D, New Panchanantala Road, Police Station & Post Office - Belgharia, Kolkata - 700 056, West Bengal",
};

export const hero = {
  headline: "HYPERAWARE",
  subheadline: "Creative & Marketing Agency",
  supporting:
    "Helping brands grow through strategy, content, websites and performance marketing.",
  kicker: "Creative | Strategy | Performance",
};

export const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "Clients", to: "/clients" },
  { label: "Contact", to: "/contact" },
];

export const aboutParagraphs = [
  "Hyperaware is a digital agency built for clarity, performance, and creative that actually works.",
  "We partner with brands to identify growth gaps and build systems that solve them.",
  "Sometimes the solution is a better website. Sometimes it is stronger content. Sometimes it is performance marketing. Sometimes it is a complete digital ecosystem.",
  "Everything is strategy-led and built to convert.",
];

export const services = [
  {
    title: "Branding",
    slug: "branding",
    icon: PenTool,
    intro:
      "We shape brand systems that feel premium, clear, and ready for every digital touchpoint.",
    detail:
      "From visual direction to campaign-ready identity systems, we help brands look consistent before they scale.",
    deliverables: ["Identity direction", "Visual systems", "Brand guidelines", "Launch-ready assets"],
    pageTitle: "Branding That Gives Your Business A Premium, Recognizable System.",
    pageCopy:
      "We build visual direction, identity systems, and brand assets that make every post, campaign, website, and customer touchpoint feel connected.",
  },
  {
    title: "Social Media",
    slug: "social-media",
    icon: Megaphone,
    intro:
      "We help brands grow on social with content that is clear, consistent, and made to convert.",
    detail:
      "From strategy to execution, we handle it all so you can focus on the big picture.",
    deliverables: ["Content strategy", "Calendar planning", "Reels and carousels", "Community-ready brand voice"],
    pageTitle: "Social Media That Feels Clear, Consistent, And Made To Convert.",
    pageCopy:
      "We help brands show up with intent across Instagram and other social platforms through calendar planning, content direction, reels, carousels, captions, and campaign-ready visual systems.",
  },
  {
    title: "Content Creation",
    slug: "content-creation",
    icon: Palette,
    intro:
      "We create content that feels on-brand, speaks to your audience, and drives action.",
    detail:
      "From reels and carousels to product shoots and campaigns, every piece is crafted with purpose.",
    deliverables: ["Campaign concepts", "Product shoots", "Reels", "Carousel creatives"],
    pageTitle: "Content Creation With Brand Voice, Visual Taste, And Purpose.",
    pageCopy:
      "From product shoots and reels to carousel designs and campaign concepts, we create assets that look on-brand, speak to the right audience, and support measurable action.",
  },
  {
    title: "Performance Marketing",
    slug: "performance-marketing",
    icon: Target,
    intro:
      "From Meta to Google, we plan and manage campaigns built to convert, not just spend.",
    detail:
      "With constant testing, sharp targeting, and creative that sells, we make every rupee work harder.",
    deliverables: ["Meta ads", "Google ads", "Testing plans", "Conversion-led creative"],
    pageTitle: "Performance Marketing Built To Make Every Rupee Work Harder.",
    pageCopy:
      "We plan and manage campaigns across Meta and Google with sharp targeting, testing, creative iteration, and conversion-focused thinking instead of spending blindly.",
  },
  {
    title: "SEO / Organic Growth",
    slug: "seo-organic-growth",
    icon: Search,
    intro:
      "We improve discoverability with content, structure, and organic growth systems that compound over time.",
    detail:
      "From website hygiene to keyword-led content planning, we prepare brands to be found by people already searching.",
    deliverables: ["SEO audits", "Keyword planning", "On-page SEO", "Organic content direction"],
    pageTitle: "SEO And Organic Growth For Brands That Want To Be Found.",
    pageCopy:
      "We support organic growth through search-friendly website structure, keyword planning, content direction, and practical optimization that keeps building after campaigns end.",
  },
  {
    title: "Photo & Videography",
    slug: "photo-videography",
    icon: Camera,
    intro:
      "We create photo and video content built for impact, from campaign shoots to product showcases.",
    detail:
      "Styled, shot, and edited with strategy in mind for scroll-stopping reels and premium brand moments.",
    deliverables: ["Campaign shoots", "Product showcases", "Video edits", "Short-form reels"],
    pageTitle: "Photo And Video Content Styled, Shot, And Edited With Strategy.",
    pageCopy:
      "We create photo and video assets for campaign launches, product showcases, lookbooks, reels, and brand moments that need to feel polished and scroll-stopping.",
  },
];

export const moreServices = [
  {
    title: "Meta Ads",
    slug: "meta-ads",
    icon: Target,
    intro: "Conversion-led Meta campaigns for Instagram and Facebook.",
    detail:
      "We plan creative testing, audiences, funnels, and campaign optimization for brands that want performance without losing taste.",
    deliverables: ["Campaign setup", "Audience testing", "Creative testing", "Reporting"],
    pageTitle: "Meta Ads Planned Around Creative, Audience, And Conversion.",
    pageCopy:
      "We manage Meta campaigns with testing plans, creative iterations, audience structure, and performance reporting that keeps spend accountable.",
  },
  {
    title: "E-commerce Platform Management",
    slug: "ecommerce-platform-management",
    icon: ShoppingBag,
    intro: "Storefront, catalogue, and platform support for brands selling online.",
    detail:
      "We help ecommerce brands keep their digital store cleaner, sharper, and easier to manage across product presentation, content updates, and conversion flow.",
    deliverables: ["Catalogue hygiene", "Product presentation", "Store updates", "Conversion checks"],
    pageTitle: "E-commerce Platform Management For Cleaner Online Selling.",
    pageCopy:
      "From product listings and collection structure to storefront updates and conversion-led improvements, we support ecommerce brands that need their digital shop to feel organized and ready to sell.",
  },
  {
    title: "Website Design & Development",
    slug: "website-design-development",
    icon: Globe2,
    intro: "Websites that feel intentional, premium, and easy to navigate.",
    detail:
      "We design and develop websites that make the brand clearer, present services or products better, and guide visitors toward action.",
    deliverables: ["Website design", "Development", "Landing pages", "Responsive layouts"],
    pageTitle: "Website Design And Development That Makes The Brand Feel Intentional.",
    pageCopy:
      "We build modern websites and landing pages that hold the brand's visual identity, explain the offer clearly, and create a smoother path from visit to inquiry or purchase.",
  },
  {
    title: "Brand Strategy",
    slug: "brand-strategy-positioning",
    icon: Layers3,
    intro: "Brand clarity before creative execution.",
    detail:
      "We help brands define what they stand for, who they are speaking to, and how their content, visuals, and offers should be positioned.",
    deliverables: ["Brand direction", "Positioning", "Messaging", "Creative guidelines"],
    pageTitle: "Brand Strategy And Positioning Rooted In Clarity, Not Guesswork.",
    pageCopy:
      "We identify the gaps in how a brand is presented and shape the strategic direction behind its content, campaigns, website, and communication style.",
  },
  {
    title: "Ecommerce Photography",
    slug: "ecommerce-photography",
    icon: Camera,
    intro: "Clean product photography prepared for catalogues, marketplaces, and websites.",
    detail:
      "We create product visuals that make ecommerce pages easier to trust, compare, and buy from.",
    deliverables: ["Product photos", "Catalogue images", "White background shots", "Lifestyle product frames"],
    pageTitle: "Ecommerce Photography For Cleaner Catalogues And Better Product Pages.",
    pageCopy:
      "We prepare product photography for ecommerce listings, catalogues, website collections, and performance creatives.",
  },
  {
    title: "Video Editing",
    slug: "video-editing",
    icon: Video,
    intro: "Short-form edits, ads, reels, and brand videos shaped for digital platforms.",
    detail:
      "We turn raw footage into polished reels, ad creatives, product videos, and campaign edits.",
    deliverables: ["Reels editing", "Ad edits", "Brand films", "Product videos"],
    pageTitle: "Video Editing For Reels, Ads, Campaigns, And Brand Films.",
    pageCopy:
      "We edit footage into social-ready reels, ad variants, campaign films, and brand videos with pacing, polish, and platform fit.",
  },
  {
    title: "Email Marketing",
    slug: "email-marketing",
    icon: Mail,
    intro: "Email campaigns and retention flows for warm audiences.",
    detail:
      "We create email communication for launches, offers, product updates, and retention so interested customers keep moving toward purchase.",
    deliverables: ["Email campaigns", "Retention flows", "Launch communication", "Customer updates"],
    pageTitle: "Email Marketing That Keeps Customers Moving.",
    pageCopy:
      "We help brands build direct email communication for launches, offers, updates, and retention so interested customers do not disappear after the first interaction.",
  },
  {
    title: "WhatsApp Marketing",
    slug: "whatsapp-marketing",
    icon: MessageCircle,
    intro: "WhatsApp campaigns for direct, fast customer communication.",
    detail:
      "We shape WhatsApp communication that supports offers, launches, reminders, and customer updates without losing brand tone.",
    deliverables: ["WhatsApp campaigns", "Broadcast planning", "Offer communication", "Customer reminders"],
    pageTitle: "WhatsApp Marketing For Fast, Direct Brand Communication.",
    pageCopy:
      "We help brands use WhatsApp for campaign communication, reminders, launch updates, and conversion-focused customer touchpoints.",
  },
];

export const allServices = [...services, ...moreServices];

export const portfolioStories = [
  {
    title: "Social Media",
    image: "/portfolio/social-media.png",
    summary:
      "Instagram-first growth systems for kidswear, fashion, and lifestyle brands with consistent grids, campaign posts, reels, and engagement-focused formats.",
    points: ["Grid planning", "Consistent posting systems", "Trend-aware creative", "Conversion-minded captions"],
    icon: BarChart3,
  },
  {
    title: "Content Creation",
    image: "/portfolio/content-creation-fashion.png",
    summary:
      "Styled content for apparel and lifestyle labels, covering product-led visuals, campaign frames, model shoots, and reels-ready moments.",
    points: ["Brand styling", "Shoot direction", "Campaign imagery", "Creative edits"],
    icon: Sparkles,
  },
  {
    title: "Kidswear Campaigns",
    image: "/portfolio/content-creation-kids.png",
    summary:
      "Playful kidswear visuals that translate collection stories into social-ready assets, from lookbook shots to launch videos.",
    points: ["Kidswear storytelling", "Launch creative", "Photo and video assets", "Seasonal campaigns"],
    icon: Video,
  },
];

export const portfolioCategories = [
  {
    title: "Social Media",
    category: "social",
    items: ["Instagram grids", "Campaign posts", "Feed designs", "Brand pages", "Reels", "Carousel designs"],
  },
  {
    title: "Content Creation",
    category: "content",
    items: [
      "Fashion shoots",
      "Kidswear shoots",
      "Lifestyle photography",
      "Ethnic wear",
      "Studio photography",
      "Campaign visuals",
      "Product content",
      "Flatlays",
      "Outdoor shoots",
      "Video content",
    ],
  },
  {
    title: "Photography",
    category: "photo",
    items: ["Fashion", "Product", "Campaign", "Lifestyle", "Commercial"],
  },
  {
    title: "Videography",
    category: "video",
    items: ["Reels", "Brand films", "Product videos", "Campaign edits", "Social videos"],
  },
];

export const processSteps = [
  "Discover",
  "Strategy",
  "Create",
  "Shoot",
  "Edit",
  "Launch",
  "Scale",
];

export const whyHyperaware = [
  "Strategy first approach",
  "Creative built for conversion",
  "Performance focused execution",
  "Premium content production",
  "Multi-service ecosystem",
  "End-to-end growth support",
];

export const industries = [
  "Fashion",
  "Kidswear",
  "Lifestyle",
  "Furniture",
  "Ecommerce",
  "Retail",
  "Consumer brands",
];

export const brandNames = [
  "DTD",
  "House of Jaybee",
  "Maple",
  "LuvLap",
  "Sweet Cherry",
  "Tango",
  "Taeko Kids",
  "Mai Soli",
  "Tripti Kids Wear",
  "Twist Baby",
  "Sovira",
  "Simply",
  "Style Home Furniture",
  "MMGroup Kids",
];

export const brandLogos = [
  { name: "DTD", slug: "dtd", logo: "/brand-logos/dtd.png", industry: "Kidswear" },
  { name: "House of Jaybee", slug: "house-of-jaybee", logo: "/brand-logos/house-of-jaybee.png", industry: "Fashion" },
  { name: "Maple", slug: "maple", logo: "/brand-logos/maple.png", industry: "Lifestyle" },
  { name: "LuvLap", slug: "luvlap", logo: "/brand-logos/luvlap.png", industry: "Consumer brand" },
  { name: "Sweet Cherry", slug: "sweet-cherry", logo: "/brand-logos/sweet-cherry.png", industry: "Kidswear" },
  { name: "Tango", slug: "tango", logo: "/brand-logos/tango.png", industry: "Lifestyle" },
  { name: "Taeko Kids", slug: "taeko-kids", logo: "/brand-logos/taeko-kids.png", industry: "Kidswear" },
  { name: "Mai Soli", slug: "mai-soli", logo: "/brand-logos/mai-soli.png", industry: "Fashion" },
  { name: "Tripti Kids Wear", slug: "tripti-kids-wear", logo: "/brand-logos/tripti-kids-wear.png", industry: "Kidswear" },
  { name: "Twist Baby", slug: "twist-baby", logo: "/brand-logos/twist-baby.png", industry: "Kidswear" },
  { name: "Sovira", slug: "sovira", logo: "/brand-logos/sovira.png", industry: "Lifestyle" },
  { name: "Simply", slug: "simply", logo: "/brand-logos/simply.png", industry: "Kidswear" },
  { name: "Style Home Furniture", slug: "style-home-furniture", logo: "/brand-logos/style-home-furniture.png", industry: "Furniture" },
  { name: "MMGroup Kids", slug: "mmgroup-kids", logo: "/brand-logos/mmgroup-kids.png", industry: "Kidswear" },
];

export const resultsDashboard = [
  { label: "Brands worked with", value: "25+" },
  { label: "Campaigns", value: "140+" },
  { label: "Shoots", value: "90+" },
  { label: "Views", value: "12M+" },
  { label: "Creatives", value: "2.8K+" },
  { label: "Ads", value: "600+" },
  { label: "Traffic", value: "4.5L+" },
];

export const faqItems = [
  { question: "Do you run ads?", answer: "Yes. Hyperaware plans and manages Meta and Google campaigns with creative testing, conversion tracking, and performance reporting." },
  { question: "Do you provide shoots?", answer: "Yes. We handle campaign photography, product photography, lifestyle shoots, ecommerce photography, reels, ads, and brand video production." },
  { question: "Do you build websites?", answer: "Yes. We design and develop responsive, premium, SEO-ready websites and landing pages." },
  { question: "Do you do SEO?", answer: "Yes. We support SEO audits, keyword planning, on-page optimization, content structure, and organic growth systems." },
  { question: "Do you manage ecommerce?", answer: "Yes. We support ecommerce presentation, catalogue hygiene, product content, traffic, and conversion-focused improvements." },
  { question: "Do you provide branding?", answer: "Yes. We create brand direction, visual systems, positioning, messaging, and launch-ready brand assets." },
];

export const teamPlaceholders = [
  "Founder",
  "Creative Lead",
  "Production Head",
  "Marketing Team",
  "Photographers",
  "Videographers",
  "Editors",
  "Designers",
  "Account Managers",
];

export const futureAssetSlots = {
  teamMembers: {
    source: "teamPlaceholders / About.tsx",
    replaceWith: ["name", "role", "bio", "portrait"],
  },
  clientStories: {
    source: "clientProfiles / Clients.tsx / ClientDetail.tsx",
    replaceWith: ["client description", "problem", "goal", "change", "approved story"],
  },
  beforeAfterTransformations: {
    source: "clientProfiles[].transformations / BeforeAfterSlider",
    replaceWith: ["label", "before copy or image", "after copy or image"],
  },
  photography: {
    source: "photographyPlaceholders / Portfolio.tsx",
    replaceWith: ["campaign photos", "fashion photos", "lifestyle photos", "product photos", "ecommerce photos"],
  },
  videography: {
    source: "videographyPlaceholders / Portfolio.tsx",
    replaceWith: ["campaign videos", "reels", "ads", "brand films", "product videos"],
  },
  bts: {
    source: "btsPlaceholders / Portfolio.tsx",
    replaceWith: ["studio photos", "shoot setup", "camera work", "editing desk", "team moments", "raw clips"],
  },
  clientExperience: {
    source: "clientProfiles[].experience / ClientDetail.tsx",
    replaceWith: ["approved client name", "brand", "portrait", "approved quote/story"],
  },
  growthMetrics: {
    source: "clientProfiles[].metrics / Clients.tsx / ClientDetail.tsx",
    replaceWith: ["metric label", "metric value", "reporting note"],
  },
  caseStudies: {
    source: "clientProfiles[].caseStudy / ClientDetail.tsx",
    replaceWith: ["challenge", "strategy", "execution", "result", "timeline"],
  },
} as const;

export const photographyPlaceholders = [
  "Campaign photography",
  "Fashion",
  "Lifestyle",
  "Product",
  "Ecommerce",
  "Gallery",
];

export const videographyPlaceholders = [
  "Campaign videos",
  "Reels",
  "Ads",
  "Brand films",
  "Video wall",
];

export const btsPlaceholders = [
  "Studio",
  "Shoot setup",
  "Camera work",
  "Editing",
  "Production",
  "Raw clips",
  "Team moments",
];

export const clientProfiles = brandLogos.map((brand, index) => ({
  ...brand,
  description:
    "Client description placeholder. Replace this with the brand context, category, goals, and Hyperaware engagement summary.",
  joined: "Joined Hyperaware: placeholder",
  story: {
    problem: "Problem placeholder for the brand's digital growth, content, ads, website, or ecommerce challenge.",
    goal: "Goal placeholder for the measurable brand objective Hyperaware worked toward.",
    change: "What changed after Hyperaware placeholder for creative quality, consistency, reach, traffic, leads, and conversion.",
  },
  transformations: [
    { label: "Followers", before: "Baseline feed", after: "Growth-ready community" },
    { label: "Reach", before: "Limited discovery", after: "Stronger campaign reach" },
    { label: "Feed quality", before: "Inconsistent visuals", after: "Premium creative system" },
    { label: "Website redesign", before: "Basic journey", after: "Conversion-focused flow" },
  ],
  metrics: [
    { label: "Followers", value: `${8 + index}K+` },
    { label: "Reach", value: `${1.2 + index / 10}M+` },
    { label: "Views", value: `${240 + index * 12}K+` },
    { label: "Website traffic", value: `${18 + index}K+` },
    { label: "ROAS", value: `${2 + (index % 4)}.x` },
    { label: "Leads", value: `${320 + index * 18}+` },
    { label: "Clicks", value: `${4 + index}K+` },
    { label: "Conversions", value: `${90 + index * 7}+` },
    { label: "Sales", value: `${70 + index * 5}+` },
  ],
  gallery: ["Photos", "Videos", "Reels"],
  caseStudy: {
    challenge: "Challenge placeholder for the case study.",
    strategy: "Strategy placeholder for positioning, content, shoots, ads, SEO, website, or ecommerce improvements.",
    execution: "Execution placeholder for creative production, launch planning, and optimization.",
    result: "Result placeholder for growth, traffic, leads, sales, creative quality, and brand consistency.",
  },
  timeline: ["Joined", "Strategy", "Shoot", "Launch", "Growth"],
  experience: {
    photo: "Photo placeholder",
    name: "Name placeholder",
    brand: "Brand placeholder",
    story: "Client story placeholder. No public review system; this space is reserved for approved client stories shared after contacting Hyperaware.",
  },
}));

export const deckImages = [
  { title: "Portfolio Cover", src: "/portfolio/cover.png" },
  { title: "Table of Content", src: "/portfolio/table-of-content.png" },
  { title: "About Us", src: "/portfolio/about-us.png" },
  { title: "Services Overview", src: "/portfolio/services-overview.png" },
  { title: "Services Details", src: "/portfolio/services-details.png" },
  { title: "More Services", src: "/portfolio/more-services.png" },
  { title: "Our Portfolio", src: "/portfolio/portfolio-title.png" },
  { title: "Social Media", src: "/portfolio/social-media.png" },
  { title: "Content Creation Fashion", src: "/portfolio/content-creation-fashion.png" },
  { title: "Content Creation Kids", src: "/portfolio/content-creation-kids.png" },
  { title: "Brands Worked With", src: "/portfolio/brands-worked-with.png" },
  { title: "Contact", src: "/portfolio/contact.png" },
  { title: "Thank You", src: "/portfolio/thank-you.png" },
];
