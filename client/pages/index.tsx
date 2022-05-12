import { useRouter } from 'next/router';
import { useCallback, useMemo, useState } from 'react';

function Index(): JSX.Element {
  const router = useRouter();
  const [zipcode, setZipcode] = useState('');
  const [showValidation, setShowValidation] = useState(false);
  const regex = useMemo(() => /^\d{5}(?:[-\s]\d{4})?$/, []);

  const handleGetForecast = useCallback(() => {
    if (zipcode && regex.test(zipcode)) {
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
    [setZipcode, regex, showValidation],
  );

  return (
    <div>
      <h2>Forecast</h2>
      <h4>Enter your zipcode to begin</h4>
      <input id="zip" name="zip" type="text" onChange={onZipcodeChange} />
      {showValidation && (
        <div>Please enter a valid five digit numeric zicode</div>
      )}
      <button onClick={handleGetForecast}>Get Forecast</button>
    </div>
  );
}

export default Index;
