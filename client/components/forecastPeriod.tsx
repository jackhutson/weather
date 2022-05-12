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
        <div className="my-6 p-6 bg-gradient-to-l from-blue-600 to-indigo-600 border-2 border-slate-200 rounded-sm grid grid-cols-6">
          <div className="self-start col-start-1 col-end-6 mb-4">
            <ForecastIcon
              shortForecast={period.shortForecast}
              isDaytime={period.isDaytime}
            />
            {period.shortForecast}
          </div>
          <div className="self-start justify-self-end mb-4">
            <TemperatureIcon temperature={period.temperature} />
            {period.temperature}
          </div>
          <div className="col-start-5 col-end-7 justify-self-end">
            <ForecastWind
              windDirection={period.windDirection}
              windSpeed={period.windSpeed}
            />
          </div>
          <div className="col-span-full text-sm">
            {getTimeFrame(period.startTime, period.endTime)}
          </div>
          <div className="col-span-full mt-4">{period.detailedForecast}</div>
        </div>
      )}
    </>
  );
}

const getTimeFrame = (startTime: string, endTime: string): string  => {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);

  const from = `${startDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} ${startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}`;
  const to = `${endDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} ${endDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' })}`;
  return `From ${from} until ${to}`;
}
