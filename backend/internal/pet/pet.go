package pet

import "net/http"

// PetStatus represents the current health of the shared pet
type PetStatus struct {
	Name   string `json:"name"`
	Hunger int    `json:"hunger"`
	Health int    `json:"health"`
}

// GetPetStatus returns the current state of the flat's pet
func GetPetStatus(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"name": "Mochi", "hunger": 80, "health": 100}`))
}

// Dummy Data For File Initialisation
