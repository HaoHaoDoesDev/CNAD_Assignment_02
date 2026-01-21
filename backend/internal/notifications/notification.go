package notifications

import "fmt"

// SendNotification triggers a push to the flatmates
func SendNotification(userID string, message string) error {
	fmt.Printf("Notification sent to %s: %s\n", userID, message)
	return nil
}
