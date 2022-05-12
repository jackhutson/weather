import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="grid grid-cols-12 p-16">
      <div className="col-span-full text-center text-6xl">
        <h1>Weather by US ZipCode</h1>
      </div>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp
