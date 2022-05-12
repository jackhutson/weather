import { FC, useCallback, useMemo } from 'react';
import Period from '../models/period';
import { ForecastPeriod } from './forecastPeriod';

export type ForecastTimelineProps = {
  periods: Period[];
}
export const ForecastTimeline: FC<ForecastTimelineProps> = (props: ForecastTimelineProps) => {
  const { periods } = props;

  const currentForecast = useMemo(() => periods ? periods[0] : null , [periods]);

  const onNextClick = useCallback(() => { }, []);

  return (
    <ForecastPeriod period={currentForecast} />
  )
}