import React, { useState } from 'react';

interface ReportFormProps {
  onSubmit: (formData: any) => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ onSubmit }) => {
  const [customerId, setCustomerId] = useState('');
  const [initialStart, setInitialStart] = useState('');
  const [initialEnd, setInitialEnd] = useState('');
  const [endingStart, setEndingStart] = useState('');
  const [endingEnd, setEndingEnd] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ customerId, initialStart, initialEnd, endingStart, endingEnd });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Customer ID:</label>
        <input type="text" value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
      </div>
      <div>
        <label>Initial Start:</label>
        <input type="date" value={initialStart} onChange={(e) => setInitialStart(e.target.value)} />
      </div>
      <div>
        <label>Initial End:</label>
        <input type="date" value={initialEnd} onChange={(e) => setInitialEnd(e.target.value)} />
      </div>
      <div>
        <label>Ending Start:</label>
        <input type="date" value={endingStart} onChange={(e) => setEndingStart(e.target.value)} />
      </div>
      <div>
        <label>Ending End:</label>
        <input type="date" value={endingEnd} onChange={(e) => setEndingEnd(e.target.value)} />
      </div>
      <button type="submit">Generate Report</button>
    </form>
  );
};

export default ReportForm;

