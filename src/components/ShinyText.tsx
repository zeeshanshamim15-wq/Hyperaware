import { useMemo } from "react";
import { motion } from "motion/react";
import "./ShinyText.css";

type ShinyTextProps = {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  color?: string;
  shineColor?: string;
  spread?: number;
  yoyo?: boolean;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  delay?: number;
};

const ShinyText = ({
  text,
  disabled = false,
  speed = 2,
  className = "",
  color = "#2b0b4f",
  shineColor = "#7cf4ff",
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = "left",
  delay = 0,
}: ShinyTextProps) => {
  const cycleDuration = speed + delay;
  const gradientStyle = useMemo(() => ({
    backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 36%, ${shineColor} 50%, ${color} 64%, ${color} 100%)`,
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animationDuration: `${Math.max(0.1, cycleDuration)}s`,
    animationDelay: `${delay}s`,
    animationDirection: yoyo ? "alternate" : "normal",
    animationIterationCount: "infinite",
  }), [color, cycleDuration, delay, shineColor, spread, yoyo]);

  return (
    <motion.span
      className={`shiny-text ${direction === "right" ? "shiny-text--right" : ""} ${
        disabled ? "shiny-text--disabled" : ""
      } ${pauseOnHover ? "shiny-text--pause-hover" : ""} ${className}`}
      style={gradientStyle}
    >
      {text}
    </motion.span>
  );
};

export default ShinyText;
