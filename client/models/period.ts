type Period = {
  number: number;
  name: string;
  startTime: string;
  endTime: string;
  isDaytime: boolean;
  temperature: number;
  temperatureUnit: string;
  windSpeed: number;
  windDirection: string;
  detailedForecast: string;
  shortForecast: string;
  icon: string;
};

export default Period;