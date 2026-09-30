import React, { useState, useEffect } from 'react';

export const LocalTime: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Colombo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).format(now);
        setTimeString(formatted);
      } catch (e) {
        setTimeString('05:30 PM');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono text-xs tabular-nums text-[#a1a1b2] ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
      <span>Colombo, LK</span>
      <span className="text-[#717182]">·</span>
      <span className="text-[#f4f4f7] font-medium">{timeString || '12:00 PM'}</span>
      <span className="text-[#717182] text-[10px]">(UTC+5:30)</span>
    </span>
  );
};
