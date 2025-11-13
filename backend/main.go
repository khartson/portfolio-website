package main

import (
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type HealthCheckResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

func healthHandler(c echo.Context) error {
	response := HealthCheckResponse{
		Status:  "ok",
		Message: "Backend API is running (Echo Framework)",
	}
	return c.JSON(http.StatusOK, response)
}

func main() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodPost},
	}))

	e.GET("/api/health", healthHandler)

	port := "8080"

	log.Printf("Starting Echo backend API server on http://localhost:%s", port)

	if err := e.Start(":" + port); err != nil && err != http.ErrServerClosed {
		log.Fatalf("Echo server failed to start: %v", err)
	}
}
