# Weather App

This application uses a nextjs client served by a go gin web server which retrieves hourly forecasts from the national weather service API based on provided US ZipCode.  

On the backend the google maps api is used to retrieve the latitude and longitude of the provided zipcode in order to be able to retrieve the weather data from the national weather service api via the NOAA go library.  

Nextjs was selected for comfortable static rendering of the application which can easily be served as a static asset from the gin web server.  FontAwesome for icons, and Tailwindcss to speed up styling of application and add some semblance of responsive design but needs refinement. SWR is a great little hook library that I used to handling retrieving data from the API, this is not the best showcase of it's capabilities because weather data doesn't change very frequently so I plan to try it elsewhere with more dynamic data.

## Configuration

### Requires

- go v1.18
- Node v16.13.0

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
- Reactjs / Nextjs (<https://github.com/vercel/next.js>)
- Tailwindcss (<https://github.com/tailwindlabs/tailwindcss>)
- useSWR (<https://github.com/vercel/swr>)
- FontAwesome Icons (<https://github.com/FortAwesome/Font-Awesome>)

### Backend

- Go
- Gin Web Framework (<https://github.com/gin-gonic/gin>)
- Noaa Go Library (<https://github.com/icodealot/noaa>)
- Google Maps API Library (<https://github.com/googlemaps/google-maps-services-go>)

## Todos

- Unit / Integrations Tests
- Consult a designer for my horrific layout
- Animate the forecast timeline screen in order to make the current forecast more visually appealing
- Set up docker / docker compose for easier deployment
