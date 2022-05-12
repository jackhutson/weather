package main

import (
	"log"
	"weather/api"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}
	api.Start()
}
