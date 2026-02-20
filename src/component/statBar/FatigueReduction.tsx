import React, { useEffect, useState } from 'react';

const FatigueValueEffect = ({ value }: { value: number }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <span className="absolute -top-4 right-0 text-green-500 font-mono font-black text-xs animate-out fade-out slide-out-to-top-4 duration-1000">
      -{value} FTG
    </span>
  );
};

export default FatigueValueEffect;