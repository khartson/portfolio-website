package tests

import (
	"encoding/json"
	"fmt"
	"testing"

	"github.com/google/uuid"
	// Assuming this is your correct import path for the models
	"github.com/khartson/portfolio-website/backend/models"
)

func TestUUIDSerialization(t *testing.T) {
	// 1. Setup: Create a deterministic UUID so we know exactly what to expect.
	// We use a known string to generate the UUID.
	const expectedUUIDString = "12345678-1234-5678-1234-567812345678"
	id, err := uuid.Parse(expectedUUIDString)
	if err != nil {
		t.Fatalf("Failed to parse static UUID: %v", err)
	}

	testEntry := models.FileTreeEntry{
		ID:       id,
		Name:     "test",
		Type:     models.File,
		Language: models.Markdown,
		Content:  "Testing content",
		// Note: You may need to initialize CreatedAt/UpdatedAt
		// if your model doesn't handle zero-value times well in JSON.
	}

	// 2. Action: Marshal the struct to JSON.
	jsonBytes, err := json.Marshal(testEntry)
	fmt.Println("JSON Output:", string(jsonBytes))
	if err != nil {
		// If marshaling fails, the test must fail immediately.
		t.Fatalf("Failed to marshal FileTreeEntry: %v", err)
	}

	// 3. Assertion: Unmarshal the JSON back into a map to check the ID's type and value.
	var result map[string]interface{}
	if err := json.Unmarshal(jsonBytes, &result); err != nil {
		t.Fatalf("Failed to unmarshal JSON back into map: %v", err)
	}

	// 4. Verification: Check the 'id' field in the resulting map.
	idValue, ok := result["id"]
	if !ok {
		t.Errorf("FAIL: JSON output is missing the 'id' field. JSON: %s", string(jsonBytes))
		return
	}

	// Check if the 'id' value is a string (which is how JSON strings are parsed in interface{})
	actualIDString, ok := idValue.(string)
	if !ok {
		t.Errorf("FAIL: ID field was not serialized as a string. Got type: %T", idValue)
		return
	}

	// Check if the string value matches the expected UUID string.
	if actualIDString != expectedUUIDString {
		t.Errorf("FAIL: ID value mismatch. Expected: %s, Got: %s", expectedUUIDString, actualIDString)
	}

	// Optional: Log the result on success (t.Log is helpful but not required for passing)
	t.Logf("PASS: Successfully serialized UUID to string. Result: %s", actualIDString)
}
