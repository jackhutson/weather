import { FC } from 'react';
import Period from '../models/period';
import { ForecastIcon } from './forecastIcon';
import { ForecastWind } from './forecastWind';
import { TemperatureIcon } from './temperatureIcon';

export type ForecastPeriodProps = {
  period: Period | null;
};

export const ForecastPeriod: FC<ForecastPeriodProps> = (props: ForecastPeriodProps) => {
  const { period } = props;
  return (
    <>
    {period && (
      <>
      <ForecastIcon
        shortForecast={period.shortForecast}
        isDaytime={period.isDaytime}
      />
      <TemperatureIcon temperature={period.temperature} />
      <ForecastWind windDirection={period.windDirection} windSpeed={period.windSpeed} />
      {period.detailedForecast}
    </>
    )}
</>
  );
}