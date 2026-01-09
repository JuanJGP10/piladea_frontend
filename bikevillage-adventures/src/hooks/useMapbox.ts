import { useState, useEffect } from 'react';

// Mapbox token from environment variable
export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined;

export const useMapboxToken = () => {
  return {
    token: MAPBOX_TOKEN || null,
    hasToken: !!MAPBOX_TOKEN
  };
};

export const useUserLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number, speed: number | null, heading: number | null, compassHeading?: number | null } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocalización no soportada');
      setLoading(false);
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (position) => {
        setLocation(prev => ({
          ...prev,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          speed: position.coords.speed,
          heading: position.coords.heading, // GPS Heading
          // We keep the compass heading from the other event if available
          compassHeading: prev?.compassHeading || null
        }));
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    let lastOrientationUpdate = 0;
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const now = Date.now();
      if (now - lastOrientationUpdate < 100) return; // Limit to ~10fps
      lastOrientationUpdate = now;

      let compass = event.alpha;
      // iOS webkitCompassHeading support
      if ((event as any).webkitCompassHeading) {
        compass = (event as any).webkitCompassHeading;
      }

      if (compass !== null && compass !== undefined) {
        setLocation(prev => {
          if (!prev) return null;
          // Determine which heading to use is done in consumer, but here we store both
          return { ...prev, compassHeading: compass };
        });
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);

    return () => {
      navigator.geolocation.clearWatch(id);
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  return { location, error, loading };
};
