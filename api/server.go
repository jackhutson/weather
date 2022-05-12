package api

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/icodealot/noaa"
	"googlemaps.github.io/maps"
)

type WeatherQueryParams struct {
	ZipCode string `form:"zipcode"`
}

func Start() {
	// set port from env, if not set, use default
	var port string
	port = os.Getenv("PORT")

	if port == "" {
		port = "8080"
	}

	r := gin.Default()
	// handle api route group
	r.Use(static.Serve("/", static.LocalFile("./client/dist", true)))
	api := r.Group("/api")
	{
		api.GET("/forecast", getForecastApi)
	}
	r.NoRoute(func(c *gin.Context) { c.JSON(http.StatusNotFound, gin.H{}) })

	// listen and serve on port
	r.Run(port)
}

func getForecastApi(c *gin.Context) {
	var w WeatherQueryParams
	if c.Bind(&w) == nil {
		weather, err := getForecastByZip(w.ZipCode)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
		}
		c.JSON(http.StatusOK, weather)
	}
}

func getForecastByZip(zip string) (periods Period, err error) {
	// retrieve lat and lng from geocode API
	lat, lng, err := getGeocodeByZip(zip)
	if err != nil {
		log.Fatal(err)
	}
	// use noaa library to retrieve weather forecast from weather.gov
	f, err := noaa.Forecast(lat, lng)
	if err != nil {
		log.Printf("Error: Failed to retrieve forecast for lat: %s, long: %s, with error: %v", lat, lng, err)
	}

	return f.Periods, nil
}

func getGeocodeByZip(zip string) (lat, lng string, err error) {
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
	lat = fmt.Sprintf("%f", gr[0].Geometry.Location.Lat)
	lng = fmt.Sprintf("%f", gr[0].Geometry.Location.Lng)

	return lat, lng, nil
}

type Period []struct {
	ID              int32   `json:"number"`
	Name            string  `json:"name"`
	StartTime       string  `json:"startTime"`
	EndTime         string  `json:"endTime"`
	IsDaytime       bool    `json:"isDaytime"`
	Temperature     float64 `json:"temperature"`
	TemperatureUnit string  `json:"temperatureUnit"`
	WindSpeed       string  `json:"windSpeed"`
	WindDirection   string  `json:"windDirection"`
	Summary         string  `json:"shortForecast"`
	Details         string  `json:"detailedForecast"`
}
