import React, { useEffect, useState } from 'react';

const format = () =>
  new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Colombo',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date());

// Shows the time in Sri Lanka so visitors know when I'm likely to reply.
export const LocalTime: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={`text-sm text-muted ${className}`}>
      <span className="font-mono tabular-nums text-ink">{time}</span> in Sri Lanka
    </span>
  );
};
