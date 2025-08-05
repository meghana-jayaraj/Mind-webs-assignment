import React from 'react';

interface ThresholdRule {
  color: string;
  operator: '=' | '<' | '>' | '<=' | '>=';
  value: number;
}

interface SidebarProps {
  polygons: Array<{ id: number; source: string }>;
  dataSources: string[];
  thresholdRules: ThresholdRule[];
  onSourceChange: (id: number, source: string) => void;
  onThresholdChange: (index: number, rule: ThresholdRule) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  polygons,
  dataSources,
  thresholdRules,
  onSourceChange,
  onThresholdChange
}) => {
  return (
    <div style={{ width: 300, padding: 10, borderRight: '1px solid #ccc' }}>
      <h3>Polygons</h3>
      {polygons.map(({ id, source }) => (
        <div key={id} style={{ marginBottom: 12 }}>
          <div>Polygon {id}</div>
          <select value={source} onChange={e => onSourceChange(id, e.target.value)}>
            {dataSources.map(ds => (
              <option key={ds} value={ds}>{ds}</option>
            ))}
          </select>
        </div>
      ))}

      <h3>Threshold Rules</h3>
      {thresholdRules.map((rule, index) => (
        <div key={index} style={{ marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="color" value={rule.color}
            onChange={e => onThresholdChange(index, { ...rule, color: e.target.value })} />
          <select value={rule.operator}
            onChange={e => onThresholdChange(index, { ...rule, operator: e.target.value as any })}>
            <option value="=">=</option>
            <option value="<">&lt;</option>
            <option value=">">&gt;</option>
            <option value="<=">&lt;=</option>
            <option value=">=">&gt;=</option>
          </select>
          <input type="number" value={rule.value}
            onChange={e => onThresholdChange(index, { ...rule, value: parseFloat(e.target.value) })} />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
