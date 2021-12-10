import { useInput } from "../hooks/input.hook";
import { useMapContext } from "../hooks/mapcontext.hook";
import { useLocationContext } from '../hooks/location.hook';

export default function Form() {
  const { EE, placing } = useLocationContext()
  const { myMap } = useMapContext();
  const city = useInput();
  const street = useInput();
  const building = useInput();

  function Address(city, street, building) {
    this.city = city.value;
    this.street = street.value;
    this.building = building.value;
  }

  const getCoordinates = a => {
    let str =  a.city + ' ' + a.street + ' ' + a.building;
    let myGeocoder = myMap.map.geocode(str.toLowerCase());
    return myGeocoder.then(res => res?.geoObjects?.get(0)
                                    ? res.geoObjects.get(0).geometry.getCoordinates()
                                    : [52.96, 63.13]
    );
  }

  const formSubmit = async (e) => {
    e.preventDefault();
    if (city.value && street.value && building.value) {
      let addr = new Address(city, street, building);
      addr.coord = await getCoordinates(addr);
      EE.emit('set', [ ...placing, addr]);
      building.onFocus();
      street.onFocus();
      city.onFocus();
    }
  }

  const formReset = () => EE.emit('reset');

  return (
      <form onSubmit={formSubmit} onReset={formReset} >
        <input type="text" name="city" {...city} required placeholder="city name..." />
        <input type="text" name="street" {...street} required placeholder="street name..."/>
        <input type="text" name="building" {...building} required placeholder="building number..."/>

        <fieldset className="buttons">
          <input type="submit" value="OK" />
          <input type="reset" value="Reset" />
        </fieldset>
      </form>
  )
}