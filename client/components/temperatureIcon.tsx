import {
  faTemperatureEmpty,
  faTemperatureFull,
  faTemperatureHalf,
  faTemperatureHigh,
  faTemperatureLow,
  faTemperatureThreeQuarters,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

export type TemperatureIconProps = {
  temperature: number;
};

export const TemperatureIcon: FC<TemperatureIconProps> = (
  props: TemperatureIconProps
) => {
  const { temperature } = props;
  return (
    <div className="mr-2">
      <FontAwesomeIcon
        icon={getIcon(temperature)}
        style={{ fontSize: '34px' }}
      />
    </div>
  );
};

export const getIcon = (temperature: number): IconDefinition =>
  temperature >= 90
    ? faTemperatureFull
    : temperature >= 78
    ? faTemperatureHigh
    : temperature >= 65
    ? faTemperatureThreeQuarters
    : temperature >= 50
    ? faTemperatureHalf
    : temperature >= 37
    ? faTemperatureLow
    : faTemperatureEmpty;
