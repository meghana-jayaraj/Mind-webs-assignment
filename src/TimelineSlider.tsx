import React, { useState } from 'react';
import { Slider } from 'antd';
import 'antd/dist/reset.css';

interface TimelineSliderProps {
  onRangeChange: (range: { start: string; end: string }) => void;
}

const TimelineSlider: React.FC<TimelineSliderProps> = ({ onRangeChange }) => {
  const [value, setValue] = useState<number[]>([0, 24]);

  const onChange = (val: number | number[]) => {
    if (Array.isArray(val)) {
      setValue(val);

      const baseDate = '2025-08-05'; // static date for now
      const formatHour = (h: number) => (h % 24).toString().padStart(2, '0');

      const start = `${baseDate}T${formatHour(val[0])}:00`;
      const end = `${baseDate}T${formatHour(val[1])}:00`;

      onRangeChange({ start, end });
    }
  };

  const tipFormatter = (val?: number) => {
    if (typeof val !== 'number') return '';
    const day = Math.floor(val / 24) + 1;
    const hour = val % 24;
    return `Day ${day}, Hour ${hour}:00`;
  };

  return (
    <div style={{ width: 400, margin: '40px auto' }}>
      <h3>Timeline Slider (30 days, hourly)</h3>
      <Slider
        min={0}
        max={720}
        tooltip={{ formatter: tipFormatter }}
        range
        value={Array.isArray(value) ? value : [value, value]}
        onChange={onChange}
        step={1}
      />
      <div style={{ marginTop: 20 }}>
        Selected: {Array.isArray(value) ? value.map(tipFormatter).join(' - ') : tipFormatter(value)}
      </div>
    </div>
  );
};

export default TimelineSlider;
