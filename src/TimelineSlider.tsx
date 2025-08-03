import React, { useState } from 'react';
import { Slider } from 'antd';
import 'antd/dist/reset.css'; // Ensure AntD styles load

const TimelineSlider: React.FC = () => {
  const [value, setValue] = useState<number | number[]>([0, 24]);

  const onChange = (val: number | number[]) => {
    setValue(val);
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
