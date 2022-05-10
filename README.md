# Weather App

This application embeds a nextjs static website in a go web server which retrieves hourly forecasts from the national weather service API.

## Configuration

You'll need to create a `.env` file in the root directory of the project with the following variables:

- `'GOOGLE_API_KEY'`
  - if you don't have one you'll need to create one here <https://console.cloud.google.com/google/maps-apis/>

### Example .env contents

```text
GOOGLE_API_KEY="<your-google-api-key>"
```

## How to run
