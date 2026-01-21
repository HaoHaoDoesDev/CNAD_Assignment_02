package tasks

import "net/http"

// Task represents the structure for a flatmate chore
type Task struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	AssignedTo  string `json:"assigned_to"`
	IsCompleted bool   `json:"is_completed"`
}

// GetTasksHandler returns placeholder tasks for the calendar
func GetTasksHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`[{"id": 1, "title": "Clean Kitchen", "assigned_to": "User1", "is_completed": false}]`))
}

// Dummy Data For File Initialisation
