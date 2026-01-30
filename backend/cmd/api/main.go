package main

import (
	"log"
	"net/http"
	"os"

	"backend/internal/auth"
	"backend/internal/users"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables (.env)
	_ = godotenv.Load()

	//Set port to 8080
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Setup Router
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	//Allow basic CORS for local frontend testing
	r.Use(middleware.SetHeader("Access-Control-Allow-Origin", "*"))
	r.Use(middleware.SetHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"))
	r.Use(middleware.SetHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"))

	//Handle preflight requests
	r.Options("/*", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusNoContent)
	})

	//Define Routes (Health Check for Cloud Native recoverability)
	r.Get("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	//API Routes
	r.Route("/api", func(r chi.Router) {
		r.Route("/auth", func(r chi.Router) {
			r.Post("/register", auth.RegisterHandler)
			r.Post("/login", auth.LoginHandler)
		})

		r.Route("/users", func(r chi.Router) {
			r.Get("/me", users.MeHandler)
		})
	})

	log.Printf("Server starting on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}
