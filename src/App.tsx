import React, { useState } from 'react';
import PolygonMap from './PolygonMap';
import TimelineSlider from './TimelineSlider'; // Make sure this is imported

function App() {
  const [timelineRange, setTimelineRange] = useState<{ start: string; end: string }>({
    start: "2022-01-01",
    end: "2022-12-31",
  });

  return (
    <div className="App">
      <TimelineSlider onRangeChange={setTimelineRange} />
      <PolygonMap
        timelineRange={timelineRange}
        onTimelineChange={setTimelineRange} // ✅ Added this line
      />
    </div>
  );
}


export default App;
