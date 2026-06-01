import { useState } from "react";

type BeforeAfterSliderProps = {
  label: string;
  before?: string;
  after?: string;
  slotId?: string;
};

const BeforeAfterSlider = ({ label, before = "Placeholder", after = "Placeholder", slotId }: BeforeAfterSliderProps) => {
  const [position, setPosition] = useState(50);

  return (
    <div className="before-after hyper-panel overflow-hidden p-0 w-full" data-slot="before-after-transformation" data-slot-id={slotId ?? label}>
      <div className="before-after__stage relative aspect-[16/10] min-h-[12rem] md:min-h-[16rem] w-full overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-[hsl(270_100%_99%)] px-4 text-center">
          <div>
            <p className="hyper-eyebrow text-[10px] md:text-xs">After Hyperaware</p>
            <h3 className="mt-2 text-lg md:text-2xl font-black">{after}</h3>
          </div>
        </div>
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden bg-white px-4 text-center"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <div>
            <p className="hyper-eyebrow text-[10px] md:text-xs">Before Hyperaware</p>
            <h3 className="mt-2 text-lg md:text-2xl font-black">{before}</h3>
          </div>
        </div>
        <div className="before-after__handle" style={{ left: `${position}%` }} aria-hidden>
          <span />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          className="before-after__range"
          style={{ touchAction: 'none' }}
          aria-label={`${label} before and after comparison`}
        />
      </div>
      <div className="border-t border-[hsl(266_35%_24%)]/10 p-5">
        <p className="text-lg font-black">{label}</p>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
