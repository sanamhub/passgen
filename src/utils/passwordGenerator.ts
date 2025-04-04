// Character sets for password generation
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

// Pronounceable character sets
const easyToSayChars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const easyToReadChars =
  "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";

export type PasswordOptions = {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  easyToSay: boolean;
  easyToRead: boolean;
};

export const generatePassword = (options: PasswordOptions): string => {
  let chars = "";

  // If easy to say is selected, it overrides other selections
  if (options.easyToSay) {
    chars = easyToSayChars;
  }
  // If easy to read is selected, it overrides other selections
  else if (options.easyToRead) {
    chars = easyToReadChars;
  }
  // Otherwise, use the selected character types
  else {
    if (options.uppercase) chars += uppercaseChars;
    if (options.lowercase) chars += lowercaseChars;
    if (options.numbers) chars += numberChars;
    if (options.symbols) chars += symbolChars;
  }

  // If no character types are selected, default to lowercase
  if (chars.length === 0) {
    chars = lowercaseChars;
  }

  let password = "";
  const charactersLength = chars.length;

  // Generate the password
  for (let i = 0; i < options.length; i++) {
    password += chars.charAt(Math.floor(Math.random() * charactersLength));
  }

  return password;
};

// Calculate password strength from 0 to 100
export const calculatePasswordStrength = (
  password: string,
  options: PasswordOptions
): number => {
  if (!password) return 0;

  const length = password.length;
  let strength = 0;

  // Base strength from length (up to 40 points)
  strength += Math.min(40, length * 2);

  // Character variety (up to 60 points)
  let varietyScore = 0;

  if (/[A-Z]/.test(password)) varietyScore += 15;
  if (/[a-z]/.test(password)) varietyScore += 15;
  if (/[0-9]/.test(password)) varietyScore += 15;
  if (/[^A-Za-z0-9]/.test(password)) varietyScore += 15;

  strength += varietyScore;

  // Simplicity penalty
  if (options.easyToSay || options.easyToRead) {
    strength = Math.round(strength * 0.8);
  }

  return Math.min(100, Math.round(strength));
};

// Get strength classification and color
export const getStrengthInfo = (
  strength: number
): { label: string; color: string } => {
  if (strength < 30) {
    return { label: "Weak", color: "#E53935" }; // Red
  } else if (strength < 60) {
    return { label: "Fair", color: "#FFA726" }; // Orange
  } else if (strength < 80) {
    return { label: "Good", color: "#FDD835" }; // Yellow
  } else {
    return { label: "Strong", color: "#00A67E" }; // Green
  }
};
