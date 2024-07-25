import React from 'react';

interface SliderProps {
  value: number;
  width: number | string;
  height?: number  | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  step?: number;
  vertical?: boolean;
}

const Slider: React.FC<SliderProps> = ({ 
  value, width, height, onChange, min = 0, max = 1, step = 0.01, vertical = false
}) => {
  return (
    <input
      type="range"
      value={value}
      onChange={onChange}
      className={`bg-stone-300`}
      style={{ width: width, height: height, rotate: vertical ? "-90deg" : "0deg" }}
      min={min}
      max={max}
      step={step}
    />
  );
};

export default Slider;
