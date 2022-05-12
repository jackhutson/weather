import { faCompass, faLocationArrow, faWind } from '@fortawesome/free-solid-svg-icons';
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
    <FontAwesomeIcon icon={faWind} />
    <FontAwesomeIcon icon={faCompass} />
    {props.windDirection}
      {props.windSpeed}
    </div>
  );
};
