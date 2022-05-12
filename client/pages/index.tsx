import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

function Index(): JSX.Element {
  const router = useRouter();

  const [zipcode, setZipcode] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  const regex = useMemo(() => /^\d{5}(?:[-\s]\d{4})?$/, []);

  const handleGetForecast = useCallback(() => {
    if (zipcode && regex.test(zipcode)) {
      localStorage.setItem('zipcode', zipcode);
      router.push(`/forecast?zipcode=${zipcode}`);
    } else {
      setShowValidation(true);
    }
  }, [router, zipcode, regex]);

  const onZipcodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setZipcode(e.target.value);
      if (showValidation && regex.test(e.target.value)) {
        setShowValidation(false);
      }
    },
    [setZipcode, regex, showValidation]
  );

  useEffect(() => {
    const zip = localStorage.getItem('zipcode');
    if (zip) {
          setZipcode(zip);  
    }
  }, [setZipcode]);

  return (
    <div className="mt-8 p-10 bg-gradient-to-r from-sky-500 to-indigo-500 xl:col-start-5 xl:col-end-9 lg:col-start-4 lg:col-end-10 md:col-start-3 md:col-end-11 sm:col-span-full rounded-sm">
      <div className="grid grid-cols-5 col-span-full">
        <input
          id="zip"
          name="zip"
          type="text"
          value={zipcode}
          onChange={onZipcodeChange}
          className="px-4 py-1 rounded-sm col-start-1 col-end-6 mt-4 text-black"
        />
        {showValidation && (
          <div className="p-1 bg-red-200 text-red-900 rounded-sm col-span-full my-4">
            Please enter a valid five digit zicode
          </div>
        )}
        <button
          onClick={handleGetForecast}
          className="col-start-4 col-end-7 mt-6 px-4 py-2 my-6 p-6 bg-gradient-to-l from-blue-600 to-indigo-600 border-2 border-slate-200 hover:from-blue-800 hover:to-indigo-800 rounded-md"
        >
          Get Forecast
        </button>
      </div>
    </div>
  );
}

export default Index;
