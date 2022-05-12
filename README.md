# Weather App

This application uses a nextjs client served by a go gin web server which retrieves hourly forecasts from the national weather service API based on ZipCode.

## Configuration

You'll need to create a `.env` file in the root directory of the project with the following variables:

- `'GOOGLE_API_KEY'`
  - if you don't have one you'll need to create one here <https://console.cloud.google.com/google/maps-apis/>

### Example .env contents

```text
GOOGLE_API_KEY="<your-google-api-key>"
```

## How to run

```bash
cd client && yarn
yarn export
cd .. && go build .
./weather 
```

Now navigate to localhost:8080 in your browser

### Develop locally

```bash
cd client && yarn start
// in separate terminal
go run main.go
```

Running like this nextjs will handling serving the dev server for localhost:3000 and the module will proxy requests to our API endpoint on localhost:8080.
Gin server will be running on localhost:8080.

## Libraries Used

### Frontend

- TypeScript
- Nextjs (<https://github.com/vercel/next.js>)
- Tailwindcss (<https://github.com/tailwindlabs/tailwindcss>)
- useSWR (<https://github.com/vercel/swr>)
- FontAwesome Icons (<https://github.com/FortAwesome/Font-Awesome>)

### Backend

- Go
- Gin Web Framework (<https://github.com/gin-gonic/gin>)
- Noaa Go Library (<https://github.com/icodealot/noaa>)
- Google Maps API Library (<https://github.com/googlemaps/google-maps-services-go>)