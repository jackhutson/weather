import {
  faCompass,
  faLocationArrow,
  faWind,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

export type ForecastWindProps = {
  windDirection: string;
  windSpeed: number;
};

export const ForecastWind: FC<ForecastWindProps> = (
  props: ForecastWindProps
) => {
  return (
    <div>
      <FontAwesomeIcon icon={faWind} fontSize="28" className='mr-4'/>
      Wind moving {getWindDirection(props.windDirection)} at around{' '}
      {props.windSpeed}
    </div>
  );
};

const getWindDirection = (windDirection: string): string => {
  if (windDirection === 'N') {
    return 'North';
  } else if (windDirection === 'NE') {
    return 'Northeast';
  } else if (windDirection === 'E') {
    return 'East';
  } else if (windDirection === 'SE') {
    return 'Southeast';
  } else if (windDirection === 'S') {
    return 'South';
  } else if (windDirection === 'SW') {
    return 'Southwest';
  } else if (windDirection === 'W') {
    return 'West';
  } else if (windDirection === 'NW') {
    return 'Northwest';
  } else {
    return 'Unknown';
  }
};
