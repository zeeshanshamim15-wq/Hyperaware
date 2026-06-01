import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type BrandLogoCardProps = {
  brand: {
    name: string;
    logo: string;
    slug?: string;
  };
  className?: string;
};

const BrandLogoCard = ({ brand, className }: BrandLogoCardProps) => {
  const content = (
    <>
      <span className="hyper-logo-frame">
        <img src={brand.logo} alt={`${brand.name} logo`} loading="lazy" />
      </span>
      <span>{brand.name}</span>
    </>
  );

  return (
    <Link
      to={`/clients/${brand.slug ?? brand.name.toLowerCase().replace(/\s+/g, "-")}`}
      className={cn("hyper-logo-card", className)}
      aria-label={`Open ${brand.name} client page`}
    >
      {content}
    </Link>
  );
};

export default BrandLogoCard;
