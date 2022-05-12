import {
  faC,
  faCloud,
  faCloudBolt,
  faCloudMoon,
  faCloudMoonRain,
  faCloudShowersHeavy,
  faCloudSun,
  faCloudSunRain,
  faMoon,
  faSun,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC } from 'react';

export type ForecastIconProps = {
  shortForecast: string;
  isDaytime: boolean;
};

export const ForecastIcon: FC<ForecastIconProps> = (
  props: ForecastIconProps
) => {
  const { shortForecast, isDaytime } = props;
  return (
    <>
      <FontAwesomeIcon
        icon={getIcon(shortForecast, isDaytime)}
        style={{ fontSize: '80px' }}
      />
    </>
  );
};

const getIcon = (shortForecast: string, isDay: boolean): IconDefinition => {
  const isSunny = findIfSunny(shortForecast);
  const isRainy = ifRainy(shortForecast);
  const isShower = ifShower(shortForecast);
  const isCloudy = ifCloudy(shortForecast);
  const isClear = ifClear(shortForecast);
  const isThunderstorm = ifThunderstorm(shortForecast);
  const isMostly = ifMostly(shortForecast);

  if (isSunny || (isClear && !isRainy && !isCloudy && !isThunderstorm)) {
    if (isMostly) {
      return isDay ? faCloudSun : faCloudMoon;
    } else {
      return isDay ? faSun : faMoon;
    }
  } else if (isRainy || isShower) {
    if (isThunderstorm) {
      return faCloudBolt;
    } else if (isRainy) {
      return isDay ? faCloudSunRain : faCloudMoonRain;
    } else if (isShower) {
      return faCloudShowersHeavy;
    }
  }

  return faCloud;
};

const findIfSunny = (shortForecast: string): boolean =>
  new RegExp(/\bSunny/).test(shortForecast);

const ifRainy = (shortForecast: string): boolean =>
  new RegExp(/\bRain/).test(shortForecast);

const ifShower = (shortForecast: string): boolean =>
  new RegExp(/\bShower/).test(shortForecast);

const ifCloudy = (shortForecast: string): boolean =>
  new RegExp(/\bCloud/).test(shortForecast);

const ifClear = (shortForecast: string): boolean =>
  new RegExp(/\bClear/).test(shortForecast);

const ifThunderstorm = (shortForecast: string): boolean =>
  new RegExp(/\bThunderstorm/).test(shortForecast);

const ifMostly = (shortForecast: string): boolean =>
  new RegExp(/\bMostly|\bChance/).test(shortForecast);
