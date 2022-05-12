import { useRouter } from 'next/router';
import useSWR from 'swr';
import { ForecastTimeline } from '../components/forecastTimeline';
import Period from '../models/period';

async function fetcher(url: string): Promise<Period[]> {
  const resp = await fetch(url);

  return await resp.json();
}

function Forecast(): JSX.Element {
  const router = useRouter();
  const { zipcode } = router.query;
  const { data, error } = useSWR(`/api/forecast?zipcode=${zipcode}`, fetcher, {
    refreshInterval: 1000,
  });
  
  return (
    <div>
      <h2>Hourly Forecast for {zipcode}</h2>
      {error && (
        <p>
          Error fetching forecast: <strong>{error}</strong>
        </p>
      )}
      {!error && !data && <p>Loading ...</p>}
      {!error && data && <ForecastTimeline periods={data} />}
    </div>
  );
}

export default Forecast;
