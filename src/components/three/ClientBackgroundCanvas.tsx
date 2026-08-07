'use client';

import React, { useState, useEffect, type ComponentType } from 'react';

export function ClientBackgroundCanvas() {
  const [CanvasComponent, setCanvasComponent] = useState<ComponentType | null>(null);

  useEffect(() => {
    import('./BackgroundCanvas')
      .then((mod) => {
        setCanvasComponent(() => mod.default || mod.BackgroundCanvas);
      })
      .catch((err) => {
        console.error('3D Background Canvas load error:', err);
      });
  }, []);

  if (!CanvasComponent) return null;

  return <CanvasComponent />;
}

export default ClientBackgroundCanvas;
