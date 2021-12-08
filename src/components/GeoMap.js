import { YMaps, Map, Polyline, Placemark } from 'react-yandex-maps';
import { context } from '../hooks/service';
import { useContext } from 'react';
import myIcon from '../helpers/myIcon2.svg';

export default function GeoMap() {
  const { EE, placing, myMap, setMyMap } = useContext(context);
  const coordinates = placing.map(n => n.coord);
  const placemark = { modules: ['geoObject.addon.hint', 'geoObject.addon.balloon'],
                      options: {  iconLayout: 'default#image',
                                  iconImageHref: myIcon,
                                  iconImageSize: [20, 20],
                                  iconImageOffset: [-10, -10],
                                  draggable: true,
                                  openBalloonOnClick: true,
                                  openEmptyBalloon:true,
                                  hideIconOnBalloonOpen:false,}
                    };

  const handleDragend = async (e, i) => {
    let obj = {};
    let point = e.originalEvent.target.geometry._coordinates;
    const arr = [ ...placing ];
    let addr = await getGeoAddress(point);
    if (addr) {
      let elem = addr.split(',');
      let len = elem.length - 1;
      obj['building'] = elem[len];
      obj['street'] = elem[len - 1];
      obj['city'] = elem[len - 2];
    }
    obj['coord'] = point;
    arr[i] = obj;
    EE.emit('set', arr);
  }

  const getGeoAddress = (point) => {
    return myMap.map.geocode(point, { kind: 'house', results: 5 })
      .then(result => {
        let firstGeoObject = result.geoObjects.get(0);
        return (firstGeoObject)
          ? firstGeoObject.getAddressLine()
          : null;
      })
  }

  const listPlacemarks = placing.map((item, i) => {
    return (
      <Placemark {...placemark} key={`placemark-${i}`} geometry={item.coord}
                  onDragend={(e) => handleDragend(e, i)}
                  properties={{
                    balloonContent : `${placing[i]['city']} ,${placing[i]['street']} ,${placing[i]['building']}`,
                  }} />
    )
  });

  // console.log('GeoMap render...', address);

  return (
    <YMaps query={{ lang: 'ru_RU' , apikey: 'place your API-key here...' }}>
      <Map  className="map" 
            defaultState={{ center: [52.96, 63.13], zoom: 7 }}
            onLoad={(ymaps) => setMyMap({ 'map': ymaps})} 
            modules={['geocode']}>
        <Polyline geometry={coordinates} 
                  options={{  balloonCloseButton: false,
                              strokeColor: '#03a',
                              strokeWidth: 4,
                              strokeOpacity: 0.5, }} />
        {listPlacemarks}
      </Map>
    </YMaps>
  )
}