// Sidebar.tsx
import React, { useState } from 'react';

type Rule = {
  color: string;
  operator: string;
  value: number;
};

type Props = {
  onRulesChange: (field: string, rules: Rule[]) => void;
};

const Sidebar: React.FC<Props> = ({ onRulesChange }) => {
  const [field, setField] = useState('temperature_2m');
  const [rules, setRules] = useState<Rule[]>([
    { color: 'red', operator: '<', value: 10 }
  ]);

  const addRule = () => {
    setRules([...rules, { color: 'blue', operator: '>=', value: 10 }]);
  };

  const updateRule = (index: number, updated: Partial<Rule>) => {
    const newRules = [...rules];
    newRules[index] = { ...newRules[index], ...updated };
    setRules(newRules);
    onRulesChange(field, newRules);
  };

  const deleteRule = (index: number) => {
    const newRules = rules.filter((_, i) => i !== index);
    setRules(newRules);
    onRulesChange(field, newRules);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', width: '300px' }}>
      <h3>Data Source Sidebar</h3>

      <label>Field (e.g., temperature_2m): </label>
      <input
        value={field}
        onChange={(e) => {
          setField(e.target.value);
          onRulesChange(e.target.value, rules);
        }}
        style={{ width: '100%' }}
      />

      <hr />

      {rules.map((rule, index) => (
        <div key={index} style={{ marginBottom: 10 }}>
          <select
            value={rule.color}
            onChange={(e) => updateRule(index, { color: e.target.value })}
          >
            <option value="red">🔴 Red</option>
            <option value="yellow">🟡 Yellow</option>
            <option value="blue">🔵 Blue</option>
            <option value="green">🟢 Green</option>
          </select>

          <select
            value={rule.operator}
            onChange={(e) => updateRule(index, { operator: e.target.value })}
            style={{ marginLeft: 5 }}
          >
            <option value="<">{'<'}</option>
            <option value="<=">{'<='}</option>
            <option value="=">{'='}</option>
            <option value=">">{'>'}</option>
            <option value=">=">{'>='}</option>
          </select>

          <input
            type="number"
            value={rule.value}
            onChange={(e) => updateRule(index, { value: Number(e.target.value) })}
            style={{ width: 60, marginLeft: 5 }}
          />

          <button onClick={() => deleteRule(index)} style={{ marginLeft: 5 }}>
            🗑️
          </button>
        </div>
      ))}

      <button onClick={addRule}>Add Rule</button>
    </div>
  );
};

export default Sidebar;
