// Source: Google Maps Platform Code Assist
import React, { useState, useEffect } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  InfoWindow,
  Pin,
} from '@vis.gl/react-google-maps';
import {
  X,
  MapPin,
  Compass,
  Navigation,
  Sparkles,
  Layers,
  Moon,
  Info,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import firebaseConfig from '../../firebase-applet-config.json';

interface HolyMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectHorizon?: (horizonName: string, lat: number, lng: number) => void;
}

interface ShrineLocation {
  id: string;
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  type: 'shrine' | 'observatory' | 'holy_site';
  description: string;
  isNajafHorizon?: boolean;
}

const SHRINES: ShrineLocation[] = [
  {
    id: 'najaf_ali',
    name: 'الروضة الحيدرية - مرقد أمير المؤمنين (ع)',
    city: 'النجف الأشرف',
    country: 'العراق',
    lat: 31.9961,
    lng: 44.3144,
    type: 'shrine',
    description: 'أفق الحسابات الفلكية المعتمد في هذا الكراس الصادر عن مكتب سماحة السيد السيستاني (دام ظله).',
    isNajafHorizon: true,
  },
  {
    id: 'karbala_hussein',
    name: 'الروضتان الحسينية والعباسية المقدسة',
    city: 'كربلاء المقدسة',
    country: 'العراق',
    lat: 32.6160,
    lng: 44.0324,
    type: 'shrine',
    description: 'مرقد سيد الشهداء الإمام الحسين وأخيه أبي الفضل العباس (عليهما السلام).',
  },
  {
    id: 'baghdad_kadhimain',
    name: 'الروضة الكاظمية المقدسة',
    city: 'بغداد (الكاظمية)',
    country: 'العراق',
    lat: 33.3802,
    lng: 44.3396,
    type: 'shrine',
    description: 'مرقد الإمامين موسى بن جعفر الكاظم ومحمد بن علي الجواد (عليهما السلام).',
  },
  {
    id: 'samarra_askari',
    name: 'الروضة العسكرية المقدسة',
    city: 'سامراء',
    country: 'العراق',
    lat: 34.1983,
    lng: 43.8742,
    type: 'shrine',
    description: 'مرقد الإمامين علي الهادي والحسن العسكري (عليهما السلام) وسرداب الغيبة.',
  },
  {
    id: 'najaf_observatory',
    name: 'مرصد تحري الأهلة الفلكي بأفق النجف',
    city: 'النجف الأشرف (بحر النجف)',
    country: 'العراق',
    lat: 31.9850,
    lng: 44.2900,
    type: 'observatory',
    description: 'موقع الرصد الفلكي والتلسكوبات الميدانية لتحري هلال أوائل الشهور القمرية.',
  },
  {
    id: 'makkah_kaaba',
    name: 'المسجد الحرام والكعبة المشرفة (القبلة)',
    city: 'مكة المكرمة',
    country: 'المملكة العربية السعودية',
    lat: 21.4225,
    lng: 39.8262,
    type: 'holy_site',
    description: 'قبلة المسلمين ومهبط الوحي، نقطة حساب اتجاه القبلة.',
  },
  {
    id: 'medina_nabawi',
    name: 'المسجد النبوي الشريف والبقيع الغرقد',
    city: 'المدينة المنورة',
    country: 'المملكة العربية السعودية',
    lat: 24.4672,
    lng: 39.6111,
    type: 'holy_site',
    description: 'مرقد النبي الأعظم محمد (ص) ومراقد أئمة البقيع الأطهار (عليهم السلام).',
  },
  {
    id: 'mashhad_reza',
    name: 'الروضة الرضوية المقدسة',
    city: 'مشهد المقدسة',
    country: 'إيران',
    lat: 36.2878,
    lng: 59.6158,
    type: 'shrine',
    description: 'مرقد ثامن الحجج الإمام علي بن موسى الرضا (ع) والسلطان الرؤوف.',
  },
];

// Calculate Qibla angle from any lat/lng to Kaaba
function calculateQiblaDirection(lat: number, lng: number): number {
  const kaabaLat = 21.4225;
  const kaabaLng = 39.8262;

  const φ1 = (lat * Math.PI) / 180;
  const φ2 = (kaabaLat * Math.PI) / 180;
  const Δλ = ((kaabaLng - lng) * Math.PI) / 180;

  const y = Math.sin(Δλ);
  const x = Math.cos(φ1) * Math.tan(φ2) - Math.sin(φ1) * Math.cos(Δλ);
  let qibla = (Math.atan2(y, x) * 180) / Math.PI;
  return (qibla + 360) % 360;
}

export const HolyMapModal: React.FC<HolyMapModalProps> = ({
  isOpen,
  onClose,
  onSelectHorizon,
}) => {
  const [selectedPlace, setSelectedPlace] = useState<ShrineLocation | null>(SHRINES[0]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [mapZoom, setMapZoom] = useState(7);
  const [mapCenter, setMapCenter] = useState({ lat: 31.9961, lng: 44.3144 });

  const [locError, setLocError] = useState<string | null>(null);

  // Get API key from env or fallback to project config
  const apiKey =
    ((import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY as string) ||
    (firebaseConfig as any).apiKey ||
    '';

  const handleLocateUser = () => {
    setLocError(null);
    if (!navigator.geolocation) {
      setLocError('المتصفح لا يدعم تحديد الموقع الجغرافي.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        setMapCenter(loc);
        setMapZoom(12);
      },
      (err) => {
        setIsLocating(false);
        console.warn('Geolocation error:', err);
        setLocError('تعذر جلب موقعك الجغرافي. يرجى التأكد من تفعيل إذن الموقع.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="bg-stone-950 border border-amber-600/40 rounded-3xl w-full max-w-5xl h-[92vh] flex flex-col overflow-hidden shadow-2xl relative text-stone-100">
        
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 bg-gradient-to-r from-stone-950 via-amber-950/50 to-stone-950 border-b border-amber-700/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-amber-200 font-amiri flex items-center gap-2">
                <span>خريطة العتبات المقدسة ومراصد رؤية الهلال</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950 border border-amber-500/30 text-amber-300 font-sans">
                  Google Maps Platform
                </span>
              </h2>
              <p className="text-xs text-stone-400 font-tajawal">
                استكشف أفق النجف الأشرف، العتبات المقدسة، اتجاه القبلة، ومواقع الرصد الفلكي
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLocateUser}
              disabled={isLocating}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 border border-amber-500/30 text-amber-300 hover:bg-amber-950/40 text-xs transition-all active:scale-95"
              title="تحديد موقعي لحساب القبلة والمسافة"
            >
              <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'جارٍ التحديد...' : 'موقعي الحالي'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {locError && (
          <div className="px-4 py-2 bg-amber-950/80 border-b border-amber-600/30 text-amber-200 text-xs flex items-center justify-between">
            <span>{locError}</span>
            <button onClick={() => setLocError(null)} className="text-amber-400 font-bold hover:text-white">✕</button>
          </div>
        )}

        {/* Content Body: Map + Sidebar */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative">
          
          {/* Map Canvas (70%) */}
          <div className="flex-1 h-[55vh] md:h-full relative bg-stone-900 overflow-hidden">
            {apiKey ? (
              <APIProvider apiKey={apiKey}>
                <div style={{ width: '100%', height: '100%' }}>
                  <Map
                    defaultCenter={mapCenter}
                    defaultZoom={mapZoom}
                    center={mapCenter}
                    zoom={mapZoom}
                    mapId="DEMO_MAP_ID"
                    internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                    gestureHandling="greedy"
                    disableDefaultUI={false}
                    className="w-full h-full"
                  >
                    {/* Render Shrine Markers */}
                    {SHRINES.map((shrine) => {
                      const isSelected = selectedPlace?.id === shrine.id;
                      return (
                        <AdvancedMarker
                          key={shrine.id}
                          position={{ lat: shrine.lat, lng: shrine.lng }}
                          onClick={() => {
                            setSelectedPlace(shrine);
                            setMapCenter({ lat: shrine.lat, lng: shrine.lng });
                          }}
                        >
                          <Pin
                            background={
                              shrine.isNajafHorizon
                                ? '#D97706'
                                : shrine.type === 'holy_site'
                                ? '#059669'
                                : shrine.type === 'observatory'
                                ? '#2563EB'
                                : '#DC2626'
                            }
                            borderColor="#FEF3C7"
                            glyphColor="#FFFFFF"
                            scale={isSelected ? 1.3 : 1.0}
                          />
                        </AdvancedMarker>
                      );
                    })}

                    {/* User Location Marker */}
                    {userLocation && (
                      <AdvancedMarker position={userLocation}>
                        <div className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-white ring-4 ring-cyan-500/40 animate-pulse" />
                      </AdvancedMarker>
                    )}

                    {/* Selected Place InfoWindow */}
                    {selectedPlace && (
                      <InfoWindow
                        position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                        onCloseClick={() => setSelectedPlace(null)}
                      >
                        <div className="p-1 text-stone-900 max-w-xs font-tajawal text-right" dir="rtl">
                          <h3 className="font-bold text-sm text-amber-900 font-amiri">
                            {selectedPlace.name}
                          </h3>
                          <p className="text-[11px] text-stone-600 mt-0.5">
                            {selectedPlace.city} • {selectedPlace.country}
                          </p>
                          <p className="text-xs text-stone-800 mt-1.5 leading-relaxed bg-amber-50 p-1.5 rounded-lg border border-amber-200">
                            {selectedPlace.description}
                          </p>
                          <div className="mt-2 pt-1 border-t border-stone-200 flex items-center justify-between text-[11px] text-amber-800 font-medium">
                            <span>اتجاه القبلة: {Math.round(calculateQiblaDirection(selectedPlace.lat, selectedPlace.lng))}°</span>
                            <span className="font-mono text-[10px] text-stone-500">
                              {selectedPlace.lat.toFixed(4)}, {selectedPlace.lng.toFixed(4)}
                            </span>
                          </div>
                        </div>
                      </InfoWindow>
                    )}
                  </Map>
                </div>
              </APIProvider>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-stone-400">
                <MapPin className="w-12 h-12 text-amber-500/40 mb-3" />
                <p className="text-sm font-bold text-stone-200">يرجى توفير مفتاح Google Maps API للتشغيل المباشر</p>
                <p className="text-xs text-stone-500 mt-1 max-w-md">
                  يمكن إضافة `VITE_GOOGLE_MAPS_API_KEY` أو استخدام مفتاح Maps Demo المجاني للتطوير.
                </p>
              </div>
            )}

            {/* Floating Quick Najaf Focus Button */}
            <button
              onClick={() => {
                const najaf = SHRINES.find((s) => s.id === 'najaf_ali')!;
                setSelectedPlace(najaf);
                setMapCenter({ lat: najaf.lat, lng: najaf.lng });
                setMapZoom(11);
              }}
              className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-950/90 hover:bg-stone-900 border border-amber-500/40 text-amber-300 text-xs shadow-lg backdrop-blur-md active:scale-95 transition-all"
            >
              <Moon className="w-3.5 h-3.5 text-amber-400" />
              <span>التركيز على أفق النجف (المعتمد)</span>
            </button>
          </div>

          {/* Places & Horizons Sidebar (30%) */}
          <div className="w-full md:w-80 bg-stone-950 border-t md:border-t-0 md:border-r border-amber-900/30 p-3 sm:p-4 overflow-y-auto flex flex-col gap-2.5">
            <div className="text-xs text-amber-300/90 font-bold flex items-center gap-1.5 border-b border-stone-800 pb-2">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>قائمة المواقع والمراصد الفلكية:</span>
            </div>

            <div className="space-y-1.5 flex-1">
              {SHRINES.map((shrine) => {
                const isSelected = selectedPlace?.id === shrine.id;
                const qiblaAngle = calculateQiblaDirection(shrine.lat, shrine.lng);

                return (
                  <button
                    key={shrine.id}
                    onClick={() => {
                      setSelectedPlace(shrine);
                      setMapCenter({ lat: shrine.lat, lng: shrine.lng });
                      setMapZoom(shrine.id === 'makkah_kaaba' ? 14 : 11);
                    }}
                    className={`w-full text-right p-2.5 rounded-xl border transition-all text-xs flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-amber-950/60 border-amber-500/80 text-amber-100 shadow-md ring-1 ring-amber-500/30'
                        : 'bg-stone-900/60 border-stone-800/80 text-stone-300 hover:bg-stone-850 hover:text-stone-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold font-amiri text-sm">{shrine.name}</span>
                      {shrine.isNajafHorizon && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          الأفق المعتمد
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-stone-400">
                      <span>{shrine.city}</span>
                      <span className="text-amber-400/90 flex items-center gap-1">
                        <Compass className="w-3 h-3 inline" />
                        القبلة: {Math.round(qiblaAngle)}°
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Location Card & Action */}
            {selectedPlace && (
              <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-600/30 text-xs space-y-2 mt-auto">
                <div className="font-bold text-amber-200">{selectedPlace.name}</div>
                <p className="text-[11px] text-stone-400 leading-relaxed">
                  {selectedPlace.description}
                </p>

                {onSelectHorizon && (
                  <button
                    onClick={() => {
                      onSelectHorizon(selectedPlace.name, selectedPlace.lat, selectedPlace.lng);
                      onClose();
                    }}
                    className="w-full py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>تطبيق كأفق الرصد الفلكي</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-stone-950 border-t border-stone-850 flex items-center justify-between text-[11px] text-stone-400">
          <span>البيانات الفلكية مطابقة لإحداثيات العتبة العلوية المقدسة (31.9961° N, 44.3144° E).</span>
          <span className="hidden sm:inline">Google Maps Platform • @vis.gl/react-google-maps</span>
        </div>
      </div>
    </div>
  );
};
