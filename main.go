package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/icodealot/noaa"
	"github.com/joho/godotenv"
	"googlemaps.github.io/maps"
)

type WeatherQueryParams struct {
	ZipCode string `form:"zipcode"`
}

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	r := gin.Default()
	r.Any("/weather", getWeather)
	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

func getWeather(c *gin.Context) {
	var w WeatherQueryParams
	if c.Bind(&w) == nil {
		weather, err := getWeatherByZip(w.ZipCode)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
		}
		c.JSON(http.StatusOK, weather)
	}
}

func getWeatherByZip(zip string) (weather *noaa.ForecastResponse, err error) {
	// retrieve lat and lng from geocode API
	lat, lng, err := getGeocodeByZip(zip)
	if err != nil {
		log.Fatal(err)
	}
	// use noaa library to retrieve weather forecast from weather.gov
	forecast, err := noaa.Forecast(fmt.Sprintf("%f", lat), fmt.Sprintf("%f", lng))
	if err != nil {
		log.Fatalf("Error: Failed to retrieve forecast for lat: %f, long: %f, with error: %v", lat, lng, err)
	}

	return forecast, nil
}

func getGeocodeByZip(zip string) (lat, lng float64, err error) {
	// create google maps client, api key from dot env file
	c, err := maps.NewClient(maps.WithAPIKey(os.Getenv("GOOGLE_API_KEY")))
	if err != nil {
		log.Fatalf("Error: Failed to create Google Maps client: %v", err)
	}

	// create geocoding request body with zip code
	r := &maps.GeocodingRequest{
		Address: zip,
	}
	gr, err := c.Geocode(context.Background(), r)
	if err != nil {
		log.Fatalf("Error: Failed to get geocode: %v", err)
	}
	// geocoding requests are returned in a slice, we only need the first
	lat = gr[0].Geometry.Location.Lat
	lng = gr[0].Geometry.Location.Lng

	return lat, lng, nil
}
