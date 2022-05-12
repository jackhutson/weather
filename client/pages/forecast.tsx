import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { ForecastTimeline } from '../components/forecastTimeline';
import Period from '../models/period';

async function fetcher(url: string): Promise<Period[]> {
  const resp = await fetch(url);

  if (resp.status !== 200) {
    throw new Error(`Failed to fetch ${url}`);
  }

  return await resp.json();
}

function Forecast(): JSX.Element {
  const router = useRouter();
  const { zipcode } = router.query;
  const { data, error } = useSWR(`/api/forecast?zipcode=${zipcode}`, fetcher, {
    refreshInterval: 10000,
  });

  return (
    <div className="mt-8 p-10 bg-gradient-to-r from-sky-500 to-indigo-500 xl:col-start-5 xl:col-end-9 lg:col-start-4 lg:col-end-10 md:col-start-3 md:col-end-11 sm:col-span-full rounded-sm">
      <h2 className="col-span-full text-center mb-6 text-2xl">
        Hourly Forecast for {zipcode}
      </h2>
      <div className="col-start-3 col-end-5 rounded-sm p-6 backdrop-blur-md">
        <div className="cursor-pointer">
          <Link href="/">
            <FontAwesomeIcon icon={faCircleLeft} fontSize="36px" className="" />
          </Link>
        </div>
        {error && (
          <div className="mt-6 p-1 bg-red-200 text-red-900 rounded-sm col-span-full my-4">
            Error fetching forecast: <strong>{error.message}</strong> Try going
            back and searching again.
          </div>
        )}
        {!error && !data && <p>Loading ...</p>}
        {!error && data && <ForecastTimeline periods={data} />}
      </div>
    </div>
  );
}

export default Forecast;
