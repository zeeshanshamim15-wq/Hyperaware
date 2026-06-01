// Temporary Phase 2 placeholder visuals.
// All URLs point to royalty-free Unsplash stock photography (no AI, no Canva, no Hyperaware branding).
// Replace these with final Hyperaware-approved assets when delivered.
// Each category has dedicated images. No image is reused across unrelated categories.

// Fixed 16:10 aspect ratio across every placeholder so containers reserve a
// stable height before the image loads — eliminates CLS on first paint.
export const PLACEHOLDER_WIDTH = 1400;
export const PLACEHOLDER_HEIGHT = 875;

const u = (id: string, w = PLACEHOLDER_WIDTH, h = PLACEHOLDER_HEIGHT) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const placeholderVisuals = {
  branding: {
    moodboards: [
      u("1561070791-2526d30994b8"),
      u("1558655146-9f40138edfeb"),
      u("1541462608143-67571c6738dd"),
    ],
    logoSystems: [
      u("1626785774573-4b799315345d"),
      u("1542038784456-1ea8e935640e"),
      u("1611532736597-de2d4265fba3"),
    ],
    identityBoards: [
      u("1583912267550-d5c5bd2cf2e3"),
      u("1559028012-481c04fa702d"),
      u("1611532736417-78f93e90c8c1"),
    ],
  },
  socialMedia: {
    instagramGrids: [
      u("1611162616305-c69b3fa7fbe0"),
      u("1611162617213-7d7a39e9b1d7"),
      u("1611605698335-8b1569810432"),
    ],
    contentCalendars: [
      u("1506784983877-45594efa4cbe"),
      u("1484480974693-6ca0a78fb36b"),
      u("1517245386807-bb43f82c33c4"),
    ],
    campaignPreviews: [
      u("1556157382-97eda2d62296"),
      u("1611162618071-b39a2ec055fb"),
      u("1611162619747-44c44e09e5b4"),
    ],
  },
  contentCreation: {
    fashionShoots: [
      u("1469334031218-e382a71b716b"),
      u("1483985988355-763728e1935b"),
      u("1554080353-a576cf803bda"),
    ],
    productShoots: [
      u("1523275335684-37898b6baf30"),
      u("1505740420928-5e560c06d30e"),
      u("1542291026-7eec264c27ff"),
    ],
    campaignVisuals: [
      u("1492707892479-7bc8d5a4ee93"),
      u("1539109136881-3be0616acf4b"),
      u("1487222477894-8943e31ef7b2"),
    ],
  },
  photography: {
    editorial: [
      u("1488161628813-04466f872be2"),
      u("1496217590455-aa63a8350eea"),
      u("1503342217505-b0a15ec3261c"),
    ],
    product: [
      u("1572635196237-14b3f281503f"),
      u("1546868871-7041f2a55e12"),
      u("1491637639811-60e2756cc1c7"),
    ],
    lifestyle: [
      u("1515886657613-9f3515b0c78f"),
      u("1469398715555-76331a6c7c9b"),
      u("1517457373958-b7bdd4587205"),
    ],
  },
  videography: {
    cameraSetups: [
      u("1502920917128-1aa500764cbd"),
      u("1574717024653-61fd2cf4d44d"),
      u("1452587925148-ce544e77e70d"),
    ],
    production: [
      u("1579952363873-27f3bade9f55"),
      u("1485846234645-a62644f84728"),
      u("1517604931442-7e0c8ed2963c"),
    ],
    editingWorkstations: [
      u("1574717025058-2f8737d2e2b7"),
      u("1573164574572-cb89e39749b4"),
      u("1606980625147-7b6a89c6fa8f"),
    ],
  },
  performanceMarketing: {
    analyticsDashboards: [
      u("1551288049-bebda4e38f71"),
      u("1460925895917-afdab827c52f"),
      u("1454165804606-c3d57bc86b40"),
    ],
    growthCharts: [
      u("1543286386-713bdd548da4"),
      u("1611224885990-ab7363d1f2a9"),
      u("1551836022-d5d88e9218df"),
    ],
    campaignReports: [
      u("1542744173-8e7e53415bb0"),
      u("1517336714731-489689fd1ca8"),
      u("1554224155-6726b3ff858f"),
    ],
  },
  bts: {
    studioSetup: [
      u("1559523182-a284c3fb7cff"),
      u("1574717024287-7c70fa5e8de2"),
      u("1542038784456-1ea8e935640e"),
    ],
    teamWorking: [
      u("1556761175-5973dc0f32e7"),
      u("1521737604893-d14cc237f11d"),
      u("1522202176988-66273c2fd55f"),
    ],
    cameraOperation: [
      u("1531497865144-0464ef8fb9a9"),
      u("1565008447742-97f6f38c985c"),
      u("1485846234645-a62644f84728"),
    ],
    editingProcess: [
      u("1611162619747-44c44e09e5b4"),
      u("1605647540924-852290f6b0d5"),
      u("1483546416237-76fd26bbcdd1"),
    ],
  },
} as const;

// Local fallback that loads if a remote Unsplash URL ever 404s.
// Keep simple: a single neutral SVG already shipped in /public.
export const placeholderFallback = "/placeholder.svg";

export const onImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
  const target = event.currentTarget;
  if (target.src.endsWith(placeholderFallback)) return;
  target.src = placeholderFallback;
};

// Helper: pick one visual deterministically by index (rotates within the bucket).
export const pickVisual = (bucket: readonly string[], index = 0) =>
  bucket[index % bucket.length];

// Pre-mapped per-service hero/gallery for Services and ServiceDetail pages.
export const serviceVisuals: Record<
  string,
  { hero: string; gallery: readonly string[]; label: string }
> = {
  branding: {
    hero: placeholderVisuals.branding.moodboards[0],
    gallery: [
      placeholderVisuals.branding.logoSystems[0],
      placeholderVisuals.branding.identityBoards[0],
      placeholderVisuals.branding.moodboards[1],
    ],
    label: "Brand system preview",
  },
  "social-media": {
    hero: placeholderVisuals.socialMedia.instagramGrids[0],
    gallery: [
      placeholderVisuals.socialMedia.contentCalendars[0],
      placeholderVisuals.socialMedia.campaignPreviews[0],
      placeholderVisuals.socialMedia.instagramGrids[1],
    ],
    label: "Social media grid preview",
  },
  "content-creation": {
    hero: placeholderVisuals.contentCreation.fashionShoots[0],
    gallery: [
      placeholderVisuals.contentCreation.productShoots[0],
      placeholderVisuals.contentCreation.campaignVisuals[0],
      placeholderVisuals.contentCreation.fashionShoots[1],
    ],
    label: "Campaign content preview",
  },
  "performance-marketing": {
    hero: placeholderVisuals.performanceMarketing.analyticsDashboards[0],
    gallery: [
      placeholderVisuals.performanceMarketing.growthCharts[0],
      placeholderVisuals.performanceMarketing.campaignReports[0],
      placeholderVisuals.performanceMarketing.analyticsDashboards[1],
    ],
    label: "Ads and reporting preview",
  },
  "seo-organic-growth": {
    hero: placeholderVisuals.performanceMarketing.campaignReports[1],
    gallery: [
      placeholderVisuals.performanceMarketing.analyticsDashboards[2],
      placeholderVisuals.performanceMarketing.growthCharts[1],
      placeholderVisuals.socialMedia.contentCalendars[1],
    ],
    label: "Organic growth preview",
  },
  "photo-videography": {
    hero: placeholderVisuals.photography.editorial[0],
    gallery: [
      placeholderVisuals.videography.cameraSetups[0],
      placeholderVisuals.videography.production[0],
      placeholderVisuals.photography.editorial[1],
    ],
    label: "Photo and video preview",
  },
  photography: {
    hero: placeholderVisuals.photography.editorial[1],
    gallery: [
      placeholderVisuals.photography.product[0],
      placeholderVisuals.photography.lifestyle[0],
      placeholderVisuals.photography.editorial[2],
    ],
    label: "Photography preview",
  },
  videography: {
    hero: placeholderVisuals.videography.cameraSetups[1],
    gallery: [
      placeholderVisuals.videography.production[1],
      placeholderVisuals.videography.editingWorkstations[0],
      placeholderVisuals.videography.cameraSetups[2],
    ],
    label: "Video preview",
  },
  "meta-ads": {
    hero: placeholderVisuals.performanceMarketing.analyticsDashboards[2],
    gallery: [
      placeholderVisuals.performanceMarketing.growthCharts[2],
      placeholderVisuals.performanceMarketing.campaignReports[2],
      placeholderVisuals.socialMedia.campaignPreviews[1],
    ],
    label: "Meta ads preview",
  },
  "google-ads": {
    hero: placeholderVisuals.performanceMarketing.growthCharts[1],
    gallery: [
      placeholderVisuals.performanceMarketing.campaignReports[0],
      placeholderVisuals.performanceMarketing.analyticsDashboards[0],
      placeholderVisuals.performanceMarketing.growthCharts[0],
    ],
    label: "Google ads preview",
  },
  "ecommerce-platform-management": {
    hero: placeholderVisuals.photography.product[1],
    gallery: [
      placeholderVisuals.contentCreation.productShoots[1],
      placeholderVisuals.photography.product[2],
      placeholderVisuals.contentCreation.productShoots[2],
    ],
    label: "Ecommerce preview",
  },
  "website-design-development": {
    hero: placeholderVisuals.branding.identityBoards[1],
    gallery: [
      placeholderVisuals.performanceMarketing.analyticsDashboards[1],
      placeholderVisuals.branding.moodboards[2],
      placeholderVisuals.branding.identityBoards[2],
    ],
    label: "Website preview",
  },
  "website-development": {
    hero: placeholderVisuals.branding.identityBoards[2],
    gallery: [
      placeholderVisuals.performanceMarketing.analyticsDashboards[1],
      placeholderVisuals.branding.identityBoards[0],
      placeholderVisuals.branding.moodboards[0],
    ],
    label: "Website development preview",
  },
  "brand-strategy-positioning": {
    hero: placeholderVisuals.branding.moodboards[2],
    gallery: [
      placeholderVisuals.branding.identityBoards[0],
      placeholderVisuals.branding.logoSystems[1],
      placeholderVisuals.branding.moodboards[1],
    ],
    label: "Brand strategy preview",
  },
  "ecommerce-photography": {
    hero: placeholderVisuals.photography.product[2],
    gallery: [
      placeholderVisuals.contentCreation.productShoots[0],
      placeholderVisuals.photography.product[0],
      placeholderVisuals.contentCreation.productShoots[2],
    ],
    label: "Ecommerce photography preview",
  },
  "video-editing": {
    hero: placeholderVisuals.videography.editingWorkstations[1],
    gallery: [
      placeholderVisuals.videography.editingWorkstations[2],
      placeholderVisuals.videography.production[2],
      placeholderVisuals.videography.cameraSetups[0],
    ],
    label: "Video editing preview",
  },
  "email-marketing": {
    hero: placeholderVisuals.socialMedia.contentCalendars[1],
    gallery: [
      placeholderVisuals.socialMedia.contentCalendars[2],
      placeholderVisuals.performanceMarketing.campaignReports[2],
      placeholderVisuals.socialMedia.campaignPreviews[2],
    ],
    label: "Email marketing preview",
  },
  "whatsapp-marketing": {
    hero: placeholderVisuals.socialMedia.campaignPreviews[2],
    gallery: [
      placeholderVisuals.socialMedia.instagramGrids[2],
      placeholderVisuals.socialMedia.contentCalendars[0],
      placeholderVisuals.socialMedia.campaignPreviews[1],
    ],
    label: "WhatsApp marketing preview",
  },
};

export const serviceVisualFallback = {
  hero: placeholderVisuals.branding.moodboards[0],
  gallery: [
    placeholderVisuals.socialMedia.instagramGrids[0],
    placeholderVisuals.contentCreation.fashionShoots[0],
    placeholderVisuals.performanceMarketing.analyticsDashboards[0],
  ],
  label: "Service visual preview",
} as const;
