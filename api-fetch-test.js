// Script to directly test the password generation functionality
// This simulates what the API would do without requiring a server

// Character sets for password generation
const charactersLib = {
  uppercaseChars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercaseChars: "abcdefghijklmnopqrstuvwxyz",
  numberChars: "0123456789",
  symbolChars: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  easyToSayChars: "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
  easyToReadChars: "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789"
};

// Generate a password based on options
const generatePassword = (options) => {
  let chars = "";

  // If easy to say is selected, it overrides other selections
  if (options.easyToSay) {
    chars = charactersLib.easyToSayChars;
  }
  // If easy to read is selected, it overrides other selections
  else if (options.easyToRead) {
    chars = charactersLib.easyToReadChars;
  }
  // Otherwise, use the selected character types
  else {
    if (options.uppercase) chars += charactersLib.uppercaseChars;
    if (options.lowercase) chars += charactersLib.lowercaseChars;
    if (options.numbers) chars += charactersLib.numberChars;
    if (options.symbols) chars += charactersLib.symbolChars;
  }

  // If no character types are selected, default to lowercase
  if (chars.length === 0) {
    chars = charactersLib.lowercaseChars;
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
const calculatePasswordStrength = (password, options) => {
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
const getStrengthInfo = (strength) => {
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

// Test function to generate a password and return all the data
const generatePasswordResponse = (params = {}) => {
  // Extract query parameters with defaults
  const length = parseInt(params.length || '12', 10);
  const characterMode = params.characterMode || 'all';
  
  // Set defaults based on character mode
  let uppercase = true;
  let lowercase = true;
  let numbers = true;
  let symbols = true;
  let easyToSay = false;
  let easyToRead = false;
  
  // Apply character mode settings
  if (characterMode === 'easyToSay') {
    easyToSay = true;
    easyToRead = false;
  } else if (characterMode === 'easyToRead') {
    easyToSay = false;
    easyToRead = true;
  } else {
    // For "all" mode or default, use individual parameters if provided
    uppercase = params.uppercase !== 'false';
    lowercase = params.lowercase !== 'false';
    numbers = params.numbers !== 'false';
    symbols = params.symbols !== 'false';
  }

  // Create password options
  const options = {
    length,
    uppercase,
    lowercase,
    numbers,
    symbols,
    easyToSay,
    easyToRead,
  };

  // Generate password
  const password = generatePassword(options);
  
  // Calculate strength
  const strength = calculatePasswordStrength(password, options);
  const strengthInfo = getStrengthInfo(strength);

  // Return the data
  return {
    password,
    strength: {
      score: strength,
      label: strengthInfo.label,
    },
    options
  };
};

// Run tests
console.log('1. Default password:');
console.log(JSON.stringify(generatePasswordResponse(), null, 2));

console.log('\n2. Password with length 20:');
console.log(JSON.stringify(generatePasswordResponse({ length: 20 }), null, 2));

console.log('\n3. Easy to say password:');
console.log(JSON.stringify(generatePasswordResponse({ characterMode: 'easyToSay' }), null, 2));

console.log('\n4. Only lowercase and numbers:');
console.log(JSON.stringify(generatePasswordResponse({ 
  uppercase: 'false', 
  lowercase: 'true',
  numbers: 'true',
  symbols: 'false'
}), null, 2)); 