export function checkString(str) {
  // If the input string is empty, return false
  if (str.length === 0) return false;

  // Split the string by commas
  const parts = str.split(",");

  // Validate each part
  for (let part of parts) {
    // Check if the part is not empty and represents a positive integer
    if (!/^\d+$/.test(part)) {
      return false; // Return false if any part is invalid
    }
  }

  // If all parts are valid positive integers, return true
  return true;
}
