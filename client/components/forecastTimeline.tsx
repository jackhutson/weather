import { FC, useCallback, useMemo } from 'react';
import Period from '../models/period';
import { ForecastPeriod } from './forecastPeriod';

export type ForecastTimelineProps = {
  periods: Period[];
}
export const ForecastTimeline: FC<ForecastTimelineProps> = (props: ForecastTimelineProps) => {
  const { periods } = props;

  return (
      <div>
        {periods && periods.length && (
          <>
          {periods.map((period, index) => (
            <ForecastPeriod key={index} period={period} />
          ))}
          </>
        )}
      </div>
  );
}