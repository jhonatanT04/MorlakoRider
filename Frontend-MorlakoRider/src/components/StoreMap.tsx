import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup } from './ui/map'
import { LOCATION, mapDirections } from '../constants'

/* textos de MapLibre en español (el aviso de "usa dos dedos" y los botones) */
const locale = {
  'CooperativeGesturesHandler.WindowsHelpText': 'Usa Ctrl + rueda del mouse para acercar el mapa',
  'CooperativeGesturesHandler.MacHelpText': 'Usa ⌘ + rueda para acercar el mapa',
  'CooperativeGesturesHandler.MobileHelpText': 'Usa dos dedos para mover el mapa',
  'AttributionControl.ToggleAttribution': 'Mostrar créditos del mapa',
}

/**
 * El mapa del local con mapcn (MapLibre y el mapa oscuro de CARTO): el pin con la mascota y, al
 * tocarlo, la dirección y "Cómo llegar". Solo corre en el navegador (Home lo carga después de montar).
 */
export default function StoreMap() {
  const [lng, lat] = LOCATION.coords
  return (
    <Map
      theme="dark"
      center={[lng, lat]}
      zoom={15.6}
      minZoom={11}
      cooperativeGestures
      locale={locale}
      className="store-map"
    >
      <MapMarker longitude={lng} latitude={lat} anchor="bottom">
        <MarkerContent>
          <span className="store-pin">
            <span className="store-pin__badge">
              <img src="/assets/img/mascota-casco.webp" alt="" width={40} height={40} />
            </span>
            <span className="store-pin__name">Morlako Rider</span>
          </span>
        </MarkerContent>
        <MarkerPopup offset={70} closeButton>
          <div className="store-pop">
            <strong>Morlako Rider</strong>
            <span>{LOCATION.address}</span>
            <span className="store-pop__muted">{LOCATION.city}</span>
            <a href={mapDirections} target="_blank" rel="noopener noreferrer">Cómo llegar</a>
          </div>
        </MarkerPopup>
      </MapMarker>
      <MapControls position="bottom-right" showZoom showFullscreen />
    </Map>
  )
}
