package database

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

func InitDB(url string) *sql.DB {
	db, err := sql.Open("postgres", url)
	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}

	err = db.Ping()
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}

	log.Println("Database connection established")
	return db
}
