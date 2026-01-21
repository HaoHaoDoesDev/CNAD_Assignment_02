package auth

import "net/http"

// User represents a flatmate or admin
type User struct {
	ID    int    `json:"id"`
	Email string `json:"email"`
	Role  string `json:"role"`
}

// LoginHandler handles user authentication
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"token": "dummy_jwt_token", "user": {"id": 1, "email": "dev@example.com", "role": "admin"}}`))
}

// RegisterHandler handles new user creation
func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(`{"message": "User registered successfully"}`))
}
