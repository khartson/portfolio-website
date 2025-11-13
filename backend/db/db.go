package db

import (
	"fmt"
	"log"
	"os"

	"github.com/khartson/portfolio-website/backend/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Init() {
	source := os.Getenv("SQLITE_DB_PATH")
	if source == "" {
		source = "application.db"
	}

	var err error
	DB, err = gorm.Open(sqlite.Open(source), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database (%s): %v", source, err)
	}

	err = DB.AutoMigrate(&models.FileTreeEntry{})
	if err != nil {
		log.Fatalf("Failed to run database migrations: %v", err)
	}

	fmt.Printf("SQLite connection to '%s' and migration successful! \n", source)
}

func GetDB() *gorm.DB {
	return DB
}
