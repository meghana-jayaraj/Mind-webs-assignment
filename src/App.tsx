import React, { useState } from 'react';
import PolygonMap from './PolygonMap';

function App() {
  const [timelineRange, setTimelineRange] = useState<{ start: string; end: string }>({
    start: '2025-08-05T00:00',
    end: '2025-08-05T01:00'
  });

  return (
    <div className="App">
      <PolygonMap timelineRange={timelineRange} onTimelineChange={setTimelineRange} />
    </div>
  );
}

export default App;
