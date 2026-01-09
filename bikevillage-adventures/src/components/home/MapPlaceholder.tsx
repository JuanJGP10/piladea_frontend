import { useEffect, useRef, useState } from 'react';
import { SidebarTrigger } from "@/components/ui/sidebar";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Map as MapIcon, Navigation, AlertCircle, Search, MapPin, Gauge, Timer, Ruler, LocateFixed, Play, Square, Footprints, Bike } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMapboxToken, useUserLocation } from '@/hooks/useMapbox';
import { useTheme } from '@/components/theme-provider';
import { useDebounce } from '@/hooks/useDebounce';

// Vega Baja bounding box for search restriction
const VEGA_BAJA_BBOX = '-0.92,37.83,-0.62,38.02';


const EARTH_RADIUS_KM = 6371;
const RAD = Math.PI / 180;
const GPS_DEADBAND_METERS = 0.005; // 5 meters tolerance to avoid jitter



// Custom Navigation Arrow Marker (Strava / Apple Maps Style)
const createNavMarkerElement = () => {
  const el = document.createElement('div');
  el.className = 'nav-marker';
  el.style.width = '28px'; // Slightly larger
  el.style.height = '28px';
  el.style.backgroundColor = '#2c6bfc'; // Strava-like Blue
  el.style.border = '4px solid white';
  el.style.borderRadius = '50%';
  el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
  el.style.display = 'flex';
  el.style.alignItems = 'center';
  el.style.justifyContent = 'center';
  el.style.zIndex = '10';

  // Add white chevron
  const chevron = document.createElement('div');
  chevron.style.width = '0';
  chevron.style.height = '0';
  chevron.style.borderLeft = '6px solid transparent';
  chevron.style.borderRight = '6px solid transparent';
  chevron.style.borderBottom = '10px solid white';
  chevron.style.marginBottom = '2px';
  el.appendChild(chevron);
  return el;
};


const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const dLat = (lat2 - lat1) * RAD;
  const dLon = (lon2 - lon1) * RAD;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * RAD) *
    Math.cos(lat2 * RAD) *
    Math.sin(dLon / 2) ** 2;

  return EARTH_RADIUS_KM * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const MapPlaceholder = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  // const marker = useRef<mapboxgl.Marker | null>(null); // Unused and potentially causing issues?
  const userMarker = useRef<mapboxgl.Marker | null>(null);
  const destinationMarker = useRef<mapboxgl.Marker | null>(null);

  const { theme } = useTheme();
  const { token } = useMapboxToken();
  const { location, error: locationError, loading: locationLoading } = useUserLocation();
  const [mapError, setMapError] = useState<string | null>(null);

  // Mode state: FREE, RECORDING, NAVIGATION
  const [mode, setModeState] = useState<'FREE' | 'RECORDING' | 'NAVIGATION'>('FREE');
  const modeRef = useRef<'FREE' | 'RECORDING' | 'NAVIGATION'>('FREE');

  // Helper to update both state and ref for mode
  const setMode = (newMode: 'FREE' | 'RECORDING' | 'NAVIGATION') => {
    setModeState(newMode);
    modeRef.current = newMode;
  };

  const [isTrackingUser, setIsTrackingUserState] = useState(false);
  const isTrackingUserRef = useRef(false);

  const setIsTrackingUser = (val: boolean) => {
    setIsTrackingUserState(val);
    isTrackingUserRef.current = val;
  };

  const prevLocation = useRef<{ lng: number, lat: number, heading?: number | null } | null>(null);

  // Stats
  const [stats, setStats] = useState({
    speed: 0, // km/h
    distance: 0, // km (Traveled or Remaining depending on mode)
    duration: 0, // min (Elapsed or Remaining)
    pace: 0 // min/km (Only for recording)
  });

  const startTimeRef = useRef<number | null>(null);
  const routeCoords = useRef<any[]>([]);
  const recordedPath = useRef<[number, number][]>([]); // For recording breadcrumbs

  // Search and Destination State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const [isSearching, setIsSearching] = useState(false);

  // Debounce search query to prevent API spam
  const debouncedSearchQuery = useDebounce(searchQuery, 400);
  const [destination, setDestination] = useState<{ lng: number, lat: number, name?: string } | null>(null);
  
  // Transport mode: walking or cycling
  const [transportMode, setTransportMode] = useState<'walking' | 'cycling'>('walking');

  // Helper to get correct map style based on theme
  const getMapStyle = () => {
    const isDark =
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    return isDark
      ? 'mapbox://styles/mapbox/dark-v11'
      : 'mapbox://styles/mapbox/outdoors-v12'; // Strava-like outdoors style for light mode
  };

  const searchPlaces = async (query: string) => {
    if (!query || !token) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      // Limit search to Vega Baja area using bbox parameter
      const proximityParam = location ? `&proximity=${location.lng},${location.lat}` : '';
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${token}&autocomplete=true&limit=5&bbox=${VEGA_BAJA_BBOX}${proximityParam}`
      );
      const data = await response.json();
      setSearchResults(data.features || []);
    } catch (error) {
      console.error('Error searching places:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Effect to handle search with debounce
  useEffect(() => {
    if (debouncedSearchQuery.length > 2) {
      searchPlaces(debouncedSearchQuery);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchQuery]);

  const handleSelectPlace = (place: any) => {
    const [lng, lat] = place.center;
    setDestination({ lng, lat, name: place.text });
    setSearchResults([]);
    setSearchQuery(place.text);

    if (map.current) {
      map.current.flyTo({ center: [lng, lat], zoom: 14 });
    }
  };

  const startRecording = () => {
    if (!map.current || !location) return;
    setMode('RECORDING');
    setIsTrackingUser(true);
    startTimeRef.current = Date.now();
    recordedPath.current = [[location.lng, location.lat]];
    setStats({ speed: 0, distance: 0, duration: 0, pace: 0 });

    // Add recording path layer if not exists
    if (map.current.getSource('user-path')) {
      (map.current.getSource('user-path') as mapboxgl.GeoJSONSource).setData({
        type: 'Feature', geometry: { type: 'LineString', coordinates: recordedPath.current }, properties: {}
      });
    } else {
      map.current.addLayer({
        id: 'user-path',
        type: 'line',
        source: {
          type: 'geojson',
          data: { type: 'Feature', geometry: { type: 'LineString', coordinates: recordedPath.current }, properties: {} }
        },
        layout: { 'line-join': 'round', 'line-cap': 'round' },
        paint: { 'line-color': '#ff4d4d', 'line-width': 4 } // Red line for recording
      });
    }

    map.current.easeTo({
      center: [location.lng, location.lat],
      pitch: 0, // Flat view for recording usually
      bearing: location.heading || 0,
      zoom: 16,
      duration: 1000
    });
  };

  const startNavigation = () => {
    if (!map.current || !location) return;

    setMode('NAVIGATION');
    // Assuming startNavigation implies we want to track the user
    setIsTrackingUser(true);

    // Switch to navigation view
    // Switch to navigation view - Strava Style: Course Up
    map.current.easeTo({
      center: [location.lng, location.lat],
      pitch: 50, // Slightly less tilted than 60
      bearing: location.heading || 0, // Align map with current Heading
      zoom: 17,
      duration: 1000
    });
  };



  const getRoute = async () => {
    if (!location || !token || !destination) return;

    // start is user location
    const start = [location.lng, location.lat];
    const end = [destination.lng, destination.lat];

    try {
      // Use walking or cycling profile based on transportMode
      const profile = transportMode === 'cycling' ? 'cycling' : 'walking';
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/${profile}/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${token}`
      );

      const json = await query.json();
      if (!json.routes || json.routes.length === 0) {
        console.error('No route found');
        return;
      }
      const data = json.routes[0];
      const route = data.geometry.coordinates;
      routeCoords.current = route;

      // Update stats based on route data
      setStats({
        speed: location.speed ? (location.speed * 3.6) : 0,
        distance: data.distance / 1000, // Total distance km
        duration: data.duration / 60, // Total duration min
        pace: 0
      });

      const geojson: GeoJSON.Feature<GeoJSON.LineString> = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route
        }
      };

      if (map.current) {
        if (map.current.getSource('route')) {
          (map.current.getSource('route') as mapboxgl.GeoJSONSource).setData(geojson);
        } else {
          map.current.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: geojson
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#3887be',
              'line-width': 5,
              'line-opacity': 0.75
            }
          });
        }

        // Fit bounds to show full route ONLY IF NOT already routing/navigating
        if (mode === 'FREE') {
          const bounds = new mapboxgl.LngLatBounds(start as [number, number], start as [number, number]);
          route.forEach((coord: [number, number]) => bounds.extend(coord));
          map.current.fitBounds(bounds, { padding: 50 });
        }
      }

      startNavigation();
    } catch (err) {
      console.error('Error fetching route:', err);
    }
  };

  const stopActivity = () => {
    setMode('FREE');
    setIsTrackingUser(false);
    routeCoords.current = [];
    recordedPath.current = [];
    startTimeRef.current = null;

    if (map.current) {
      if (map.current.getSource('user-path')) {
        (map.current.getSource('user-path') as mapboxgl.GeoJSONSource).setData({ type: 'FeatureCollection', features: [] });
      }
      // Reset view
      map.current.easeTo({
        pitch: 0,
        bearing: 0,
        zoom: 13,
        duration: 1000
      });

      if (map.current.getSource('route')) {
        (map.current.getSource('route') as mapboxgl.GeoJSONSource).setData({
          type: 'FeatureCollection',
          features: []
        });
      }
    }
    setDestination(null);
    setSearchQuery('');
    if (destinationMarker.current) {
      destinationMarker.current.remove();
      destinationMarker.current = null;
    }
  };

  // Effect to update navigation/recording metrics from real location
  useEffect(() => {
    if (mode === 'FREE' || !location) return;

    // Update speed (convert m/s to km/h)
    const currentSpeed = location.speed ? (location.speed * 3.6) : 0;

    // Distance calc
    let distInc = 0;
    if (prevLocation.current) {
      distInc = getDistanceFromLatLonInKm(
        prevLocation.current.lat, prevLocation.current.lng,
        location.lat, location.lng
      );
    }
    prevLocation.current = { lng: location.lng, lat: location.lat };

    if (mode === 'RECORDING') {
      const newTotalDist = stats.distance + distInc;
      // Update path visual
      recordedPath.current.push([location.lng, location.lat]);
      if (map.current && map.current.getSource('user-path')) {
        (map.current.getSource('user-path') as mapboxgl.GeoJSONSource).setData({
          type: 'Feature', geometry: { type: 'LineString', coordinates: recordedPath.current }, properties: {}
        });
      }

      const elapsedMin = startTimeRef.current ? (Date.now() - startTimeRef.current) / 60000 : 0;
      const pace = newTotalDist > 0 ? elapsedMin / newTotalDist : 0;

      setStats({
        speed: currentSpeed,
        distance: newTotalDist,
        duration: elapsedMin,
        pace: pace
      });
    } else if (mode === 'NAVIGATION') {
      // For nav, strictly we'd subtract distance to dest, but for simplicity we show distance remaining or traveled
      // Let's show distance remaining (approx)
      const remaining = Math.max(0, stats.distance - distInc);
      setStats(prev => ({
        ...prev,
        speed: currentSpeed,
        distance: remaining,
        // duration remaining would require re-calc or estimation, let's keep it simple or decrement
        duration: Math.max(0, prev.duration - (distInc / (currentSpeed / 60 || 1))) // crude estimate decrement
      }));
    }

  }, [location, mode]);

  // Timer effect for recording
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (mode === 'RECORDING' && startTimeRef.current) {
      interval = setInterval(() => {
        const elapsedMin = (Date.now() - startTimeRef.current!) / 60000;
        setStats(prev => ({ ...prev, duration: elapsedMin }));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [mode]);



  // Effect to update user marker position and rotation
  useEffect(() => {
    if (!map.current || !location) return;

    const { lng, lat, heading, compassHeading } = location as any; // Cast to avoid TS error until types sync

    // Logic: If moving fast (> 1 m/s approx 3.6km/h), use GPS heading.
    // If slow/stopped, use Compass Heading if available, else standard Heading.

    let rotation = 0;
    const speed = location.speed || 0;
    const isMoving = speed > 1;

    if (isMoving && heading !== null) {
      rotation = heading;
    } else if (compassHeading !== null && compassHeading !== undefined) {
      rotation = compassHeading;
    } else if (heading !== null) {
      rotation = heading;
    }

    // Strava-like: The Arrow should ALWAYS point to truthfully where the device is pointing/heading.
    // The MAP rotates to align the path with UP.

    // Update Camera bearing if Navigating to keep "Course Up"
    if (mode !== 'FREE' && map.current && isTrackingUser) {
      // Smoothly rotate map to follow heading ONLY if tracking user
      if (!map.current.isMoving()) {
        map.current.easeTo({
          center: [lng, lat], // Also keep centered
          bearing: rotation,
          pitch: mode === 'NAVIGATION' ? 50 : 0, // Pitch for nav, flat for recording
          duration: 500,
          easing: (t) => t
        });
      }
    }

    if (!userMarker.current) {
      const el = createNavMarkerElement();
      userMarker.current = new mapboxgl.Marker({ element: el, rotationAlignment: 'map', pitchAlignment: 'map' }) // pitchAlignment map makes it lie flat
        .setLngLat([lng, lat])
        .setRotation(rotation)
        .addTo(map.current);
    } else {
      userMarker.current.setLngLat([lng, lat]);
      userMarker.current.setRotation(rotation);
    }

  }, [location, mode]);

  useEffect(() => {
    if (!mapContainer.current || !token) return;

    try {
      mapboxgl.accessToken = token;

      // Límites Vega Baja: Pilar de la Horadada, Orihuela Costa, Campoamor
      const vegaBajaBounds: [[number, number], [number, number]] = [
        [-0.92, 37.83],  // Suroeste
        [-0.62, 38.02]   // Noreste
      ];

      const pilarCenter: [number, number] = [-0.79, 37.87]; // Pilar de la Horadada

      const defaultCenter: [number, number] = location
        ? [location.lng, location.lat]
        : pilarCenter;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: getMapStyle(),
        center: defaultCenter,
        zoom: 13,
        minZoom: 11,
        maxZoom: 18,
        maxBounds: vegaBajaBounds,
      });

      map.current.addControl(
        new mapboxgl.NavigationControl({ visualizePitch: true }),
        'top-right'
      );

      const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,

        showUserHeading: false, // We use custom marker
        showUserLocation: false // We use custom marker
      });

      map.current.addControl(
        geolocateControl,
        'top-right'
      );

      // Event listeners for tracking state
      geolocateControl.on('trackuserlocationstart', () => {
        setIsTrackingUser(true);
      });
      geolocateControl.on('trackuserlocationend', () => {
        setIsTrackingUser(false);
      });
      map.current.on('dragstart', () => {
        if (modeRef.current !== 'FREE') setIsTrackingUser(false);
      });
      map.current.on('touchstart', () => {
        if (modeRef.current !== 'FREE') setIsTrackingUser(false);
      });
      // Also pause on wheel zoom to allow free inspection
      map.current.on('wheel', () => {
        if (modeRef.current !== 'FREE') setIsTrackingUser(false);
      });


      // Click handler for destination selection
      map.current.on('click', (e) => {
        // Prevent setting new destination if already routing
        if (modeRef.current !== 'FREE') return;

        // If we are already routing, maybe we want to ignore or verify intent.
        // For now, allow changing destination if not routing, or if routing reset route.
        const { lng, lat } = e.lngLat;
        setDestination({ lng, lat, name: 'Ubicación seleccionada' });
        setSearchQuery(''); // clear explicit search if clicking map
        // setIsRouting(false); // Reset route if new point picked (Conceptually we are in FREE mode anyway)

        if (map.current?.getSource('route')) {
          (map.current.getSource('route') as mapboxgl.GeoJSONSource).setData({
            type: 'FeatureCollection',
            features: []
          });
          // Reset view
          map.current.easeTo({
            pitch: 0,
            bearing: 0,
            zoom: 13,
            duration: 1000
          });
        }
      });

      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        setMapError('Error al cargar el mapa. Verifica tu token.');
      });

    } catch (err) {
      console.error('Map initialization error:', err);
      setMapError('Error al inicializar el mapa');
    }

    return () => {
      map.current?.remove();
    };
  }, [token]); // Removed location from dependency to prevent map re-initialization on location update

  // separate effect for theme updates
  useEffect(() => {
    if (map.current) {
      map.current.setStyle(getMapStyle());
      // Restore route layer if it exists after style loads
      map.current.once('style.load', () => {
        if (routeCoords.current && routeCoords.current.length > 0 && map.current) {
          const geojson: GeoJSON.Feature<GeoJSON.LineString> = {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: routeCoords.current
            }
          };

          if (!map.current.getSource('route')) {
            map.current.addLayer({
              id: 'route',
              type: 'line',
              source: {
                type: 'geojson',
                data: geojson
              },
              layout: {
                'line-join': 'round',
                'line-cap': 'round'
              },
              paint: {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75
              }
            });
          }
        }
      });
    }
  }, [theme]);

  // Update destination marker
  useEffect(() => {
    if (map.current && destination) {
      if (!destinationMarker.current) {
        destinationMarker.current = new mapboxgl.Marker({ color: '#ef4444' }) // Red color for destination
          .setLngLat([destination.lng, destination.lat])
          .addTo(map.current);
      } else {
        destinationMarker.current.setLngLat([destination.lng, destination.lat]);
      }
    } else if (destinationMarker.current) {
      destinationMarker.current.remove();
      destinationMarker.current = null;
    }
  }, [destination]);

  // Show missing token message
  if (!token) {
    return (
      <div className="w-full h-full bg-muted/30 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 p-6">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
          <AlertCircle className="w-10 h-10 text-destructive" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Token de Mapbox no configurado
          </h3>
          <p className="text-muted-foreground text-sm max-w-xs">
            Añade <code className="bg-muted px-1 rounded">VITE_MAPBOX_TOKEN</code> a tu archivo <code className="bg-muted px-1 rounded">.env</code>
          </p>
        </div>
      </div>
    );
  }

  // Show error state
  if (mapError) {
    return (
      <div className="w-full h-full bg-destructive/10 rounded-xl border-2 border-dashed border-destructive flex flex-col items-center justify-center gap-4 p-6">
        <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center">
          <MapIcon className="w-10 h-10 text-destructive" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-1">
            Error en el mapa
          </h3>
          <p className="text-muted-foreground text-sm max-w-xs">
            {mapError}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[400px]">
      <div ref={mapContainer} className="absolute inset-0 rounded-xl overflow-hidden" />

      {/* Mode Specific HUD */}
      {mode !== 'FREE' && (
        <div className="absolute bottom-28 left-4 right-4 z-10 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {/* Speed */}
          <div className="bg-background/80 backdrop-blur-md p-3 rounded-xl border border-border shadow-lg flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-muted-foreground mb-1">
              <Gauge className="w-4 h-4" />
              <span className="text-xs font-medium">Velocidad</span>
            </div>
            <p className="text-xl font-bold font-mono">{stats.speed.toFixed(1)} <span className="text-xs font-normal text-muted-foreground">km/h</span></p>
          </div>

          {/* Duration */}
          <div className="bg-background/80 backdrop-blur-md p-3 rounded-xl border border-border shadow-lg flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-muted-foreground mb-1">
              <Timer className="w-4 h-4" />
              <span className="text-xs font-medium">{mode === 'NAVIGATION' ? 'Estimado' : 'Tiempo'}</span>
            </div>
            <p className="text-xl font-bold font-mono">
              {Math.floor(stats.duration)}:{Math.round((stats.duration % 1) * 60).toString().padStart(2, '0')}
              <span className="text-xs font-normal text-muted-foreground"> min</span>
            </p>
          </div>

          {/* Distance */}
          <div className="bg-background/80 backdrop-blur-md p-3 rounded-xl border border-border shadow-lg flex flex-col items-center justify-center">
            <div className="flex items-center gap-1 text-muted-foreground mb-1">
              <Ruler className="w-4 h-4" />
              <span className="text-xs font-medium">{mode === 'NAVIGATION' ? 'Restante' : 'Distancia'}</span>
            </div>
            <p className="text-xl font-bold font-mono">{stats.distance.toFixed(2)} <span className="text-xs font-normal text-muted-foreground">km</span></p>
          </div>

          {/* Pace - Recording Only */}
          {mode === 'RECORDING' && (
            <div className="bg-background/80 backdrop-blur-md p-3 rounded-xl border border-border shadow-lg flex flex-col items-center justify-center">
              <div className="flex items-center gap-1 text-muted-foreground mb-1">
                <Footprints className="w-4 h-4" />
                <span className="text-xs font-medium">Ritmo</span>
              </div>
              <p className="text-xl font-bold font-mono">{stats.pace.toFixed(2)} <span className="text-xs font-normal text-muted-foreground">min/km</span></p>
            </div>
          )}
        </div>
      )}

      {/* Top Controls Container: Sidebar Trigger + Search Bar */}
      <div className="absolute top-4 left-4 right-14 z-20 flex gap-2 items-start pointer-events-none">

        {/* Sidebar Trigger */}
        <div className="pointer-events-auto">
          <SidebarTrigger className="bg-card/95 backdrop-blur-sm shadow-md border-0 h-10 w-10 text-foreground" />
        </div>

        {/* Search Bar - Hide when active */}
        {mode === 'FREE' && (
          <div className="relative max-w-sm w-full sm:w-80 pointer-events-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9 bg-card/95 backdrop-blur-sm shadow-md border-0 h-10"
                placeholder="Buscar destino..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && searchQuery && !destination && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-sm rounded-lg shadow-lg border border-border overflow-hidden">
                {searchResults.map((place) => (
                  <button
                    key={place.id}
                    className="w-full text-left px-4 py-2 hover:bg-muted/50 text-sm transition-colors flex items-center gap-2"
                    onClick={() => handleSelectPlace(place)}
                  >
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="truncate">{place.place_name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Location status overlay */}
      {locationLoading && (
        <div className="absolute top-20 left-4 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md z-10 pointer-events-none opacity-0">
          {/* Hidden but kept layout stability */}
        </div>
      )}

      {locationError && (
        <div className="absolute top-20 left-4 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md z-10">
          <p className="text-sm text-destructive">Ubicación no disponible</p>
        </div>
      )}

      {/* Destination Prompt */}
      {!destination && !locationLoading && mode === 'FREE' && (
        <div className="absolute top-20 left-4 right-4 sm:right-auto bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md z-10 animate-in fade-in slide-in-from-top-2 pointer-events-none">
          <p className="text-xs font-medium text-foreground text-center sm:text-left">
            👆 Busca o haz click en el mapa para marcar el destino
          </p>
        </div>
      )}

      {/* Recenter Button - Only visible when routing and NOT tracking */}
      {mode !== 'FREE' && !isTrackingUser && (
        <div className="absolute bottom-48 right-4 z-20">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full shadow-lg w-12 h-12 bg-background/90 backdrop-blur"
            onClick={() => {
              setIsTrackingUser(true);
              if (location && map.current) {
                map.current.flyTo({
                  center: [location.lng, location.lat],
                  zoom: 17,
                  bearing: location.heading || 0,
                  pitch: 50,
                  duration: 1000
                });
              }
            }}
          >
            <LocateFixed className="w-6 h-6 text-primary" />
          </Button>
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black/75 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
            Recentrar
          </div>
        </div>
      )}

      {/* Main Action Buttons - Lifted significantly for iOS Safari */}
      <div className="absolute bottom-12 left-4 right-4 sm:bottom-6 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-10 flex gap-2 justify-center">
      {mode === 'FREE' ? (
          destination ? (
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              {/* Transport mode toggle */}
              <div className="flex bg-card/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden border border-border">
                <button
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${
                    transportMode === 'walking' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                  onClick={() => setTransportMode('walking')}
                >
                  <Footprints className="w-4 h-4" />
                  <span className="hidden sm:inline">Andar</span>
                </button>
                <button
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${
                    transportMode === 'cycling' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:bg-muted'
                  }`}
                  onClick={() => setTransportMode('cycling')}
                >
                  <Bike className="w-4 h-4" />
                  <span className="hidden sm:inline">Bici</span>
                </button>
              </div>
              <Button
                className="gap-2 shadow-lg flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white"
                onClick={getRoute}
              >
                <Navigation className="w-4 h-4" />
                Iniciar Ruta
              </Button>
            </div>
          ) : (
            <Button
              className="gap-2 shadow-lg w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white"
              onClick={startRecording}
            >
              <Play className="w-4 h-4" />
              Registrar Actividad
            </Button>
          )
        ) : (
          <Button
            className="gap-2 shadow-lg w-full sm:w-auto"
            variant="destructive"
            onClick={stopActivity}
          >
            <Square className="w-4 h-4 fill-current" />
            Terminar
          </Button>
        )}
      </div>
    </div>
  );
};

export default MapPlaceholder;