package auth

import (
	"encoding/json"
	"net/http"
	"net/url"
	"strings"

	"backend/internal/database"
)

type RegisterRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Nric     string `json:"nric"`
	FullName string `json:"full_name"`
}

type SignUpResponse struct {
	AccessToken string `json:"access_token"`
	Session     *struct {
		AccessToken string `json:"access_token"`
	} `json:"session"`
	User struct {
		ID string `json:"id"`
	} `json:"user"`
}

type LoginRequest struct {
	Nric     string `json:"nric"`
	Password string `json:"password"`
}

func RegisterHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var req RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"error":"invalid json"}`))
		return
	}

	// Prevent whitespace
	req.Email = strings.TrimSpace(req.Email)
	req.Nric = strings.TrimSpace(req.Nric)
	req.FullName = strings.TrimSpace(req.FullName)

	if req.Email == "" || req.Password == "" || req.Nric == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"error":"email, password, and nric are required"}`))
		return
	}

	//Create auth user in Supabase Auth
	signUpBody := map[string]any{
		"email":    req.Email,
		"password": req.Password,
	}

	raw, status, err := database.Do(
		"POST",
		database.URL()+"/auth/v1/signup",
		"",
		signUpBody,
	)
	if err != nil {
		w.WriteHeader(status)
		w.Write(raw)
		return
	}

	var signup SignUpResponse
	_ = json.Unmarshal(raw, &signup)

	//Extract token
	token := signup.AccessToken
	if token == "" && signup.Session != nil {
		token = signup.Session.AccessToken
	}

	if token == "" || signup.User.ID == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"error":"signup succeeded but no session token returned (check email confirmation settings)"}`))
		return
	}

	//Insert profile row (store email to enable login via only NRIC and password)
	profile := map[string]any{
		"id":        signup.User.ID,
		"nric":      req.Nric,
		"full_name": req.FullName,
		"email":     req.Email,
	}

	raw2, status, err := database.Do(
		"POST",
		database.URL()+"/rest/v1/users",
		token,
		profile,
	)
	if err != nil {
		w.WriteHeader(status)
		w.Write(raw2)
		return
	}

	//Return signup response (token/session)
	w.WriteHeader(http.StatusCreated)
	w.Write(raw)
}

func LoginHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"error":"invalid json"}`))
		return
	}

	req.Nric = strings.TrimSpace(req.Nric)
	if req.Nric == "" || req.Password == "" {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(`{"error":"nric and password are required"}`))
		return
	}

	//Search email by NRIC using service role key
	lookupURL := database.URL() + "/rest/v1/users?select=email&nric=eq." + url.QueryEscape(req.Nric) + "&limit=1"

	rawEmail, status, err := database.DoService("GET", lookupURL, nil)
	if err != nil {
		w.WriteHeader(status)
		w.Write(rawEmail)
		return
	}

	var rows []struct {
		Email string `json:"email"`
	}
	_ = json.Unmarshal(rawEmail, &rows)

	if len(rows) == 0 || strings.TrimSpace(rows[0].Email) == "" {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte(`{"error":"nric not found"}`))
		return
	}

	email := strings.TrimSpace(rows[0].Email)

	//Login via Supabase Auth using email & password
	body := map[string]any{
		"email":    email,
		"password": req.Password,
	}

	raw, status, err := database.Do(
		"POST",
		database.URL()+"/auth/v1/token?grant_type=password",
		"",
		body,
	)
	if err != nil {
		w.WriteHeader(status)
		w.Write(raw)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(raw)
}
