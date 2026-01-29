package users

import (
	"encoding/json"
	"net/http"
	"strings"

	"backend/internal/database"
)

type AuthUser struct {
	ID string `json:"id"`
}

func MeHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	authHeader := r.Header.Get("Authorization")
	if !strings.HasPrefix(authHeader, "Bearer ") {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(`{"error":"missing bearer token"}`))
		return
	}
	token := strings.TrimSpace(strings.TrimPrefix(authHeader, "Bearer "))

	//Get user id from Supabase
	rawUser, status, err := database.Do(
		"GET",
		database.URL()+"/auth/v1/user",
		token,
		nil,
	)
	if err != nil {
		w.WriteHeader(status)
		w.Write(rawUser)
		return
	}

	var u AuthUser
	_ = json.Unmarshal(rawUser, &u)

	if u.ID == "" {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(`{"error":"invalid token (no user id returned)"}`))
		return
	}

	//Query profile row
	url := database.URL() + "/rest/v1/users?select=*&id=eq." + u.ID
	rawProfile, status, err := database.Do("GET", url, token, nil)
	if err != nil {
		w.WriteHeader(status)
		w.Write(rawProfile)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(rawProfile)
}
