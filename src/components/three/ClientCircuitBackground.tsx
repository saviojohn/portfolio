'use client';

import React, { useState, useEffect } from 'react';
import { CircuitBackground } from './CircuitBackground';

export function ClientCircuitBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <canvas
        id="bgCanvas"
        style={{ position: 'fixed', inset: 0, zIndex: 0, display: 'block' }}
      />
    );
  }

  return <CircuitBackground />;
}

export default ClientCircuitBackground;
