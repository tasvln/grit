import React from 'react';

interface SliderProps {
  value: number;
  width: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
}

const Slider: React.FC<SliderProps> = ({ value, width, onChange, min = 0, max = 1, step = 0.01 }) => {
  return (
    <input
      type="range"
      value={value}
      onChange={onChange}
      className={`w-[${width}px] h-1 bg-stone-200 rounded-full`}
      min={min}
      max={max}
      step={step}
    />
  );
};

export default Slider;
