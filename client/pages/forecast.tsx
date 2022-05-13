import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { ForecastPeriod } from '../components/forecastPeriod';
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
  const [isCelsius, setIsCelsius] = useState(false);
  const { data, error } = useSWR(`/api/forecast?zipcode=${zipcode}`, fetcher, {
    refreshInterval: 10000,
  });

  const handleChange = (): void => {
    setIsCelsius(!isCelsius);
    localStorage.setItem('isCelsius', JSON.stringify(!isCelsius));
  };

  useEffect(() => {
    let isC = localStorage.getItem('isCelsius');

    if (isC !== null) {
      setIsCelsius(isC === 'true');
    }
  }, [isCelsius]);

  return (
    <div className="mt-8 p-10 bg-gradient-to-r from-sky-500 to-indigo-500 xl:col-start-4 xl:col-end-10 lg:col-start-4 lg:col-end-10 md:col-start-3 md:col-end-11 sm:col-span-full rounded-sm">
      <h2 className="col-span-full text-center mb-6 text-2xl">
        Hourly Forecast for {zipcode}
      </h2>
      <div className="rounded-sm p-6 backdrop-blur-md">
        <div className="grid grid-cols-2">
          <div className="cursor-pointer col-span-1">
            <Link href="/">
              <a>
                <FontAwesomeIcon icon={faCircleLeft} fontSize="36px" />
              </a>
            </Link>
          </div>
          <label
            htmlFor="toggleB"
            className="flex items-center cursor-pointer col-span-1 justify-self-end"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="toggleB"
                className="sr-only"
                onChange={handleChange}
                checked={isCelsius}
              />
              <div className="block bg-white w-14 h-8 rounded-full"></div>
              <div className="dot absolute left-1 top-1 bg-gray-500 w-6 h-6 rounded-full transition"></div>
            </div>
            <div className="ml-3">&deg; C</div>
          </label>
        </div>
        {error && (
          <div className="mt-6 p-1 bg-red-200 text-red-900 rounded-sm col-span-full my-4">
            Error fetching forecast: <strong>{error.message}</strong> Try going
            back and searching again.
          </div>
        )}
        {!error && !data && <p>Loading ...</p>}
        {!error && data && (
          <>
            {data && data.length && (
              <>
                {data.map((period, index) => (
                  <ForecastPeriod
                    key={index}
                    period={period}
                    isCelsius={isCelsius}
                  />
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Forecast;
