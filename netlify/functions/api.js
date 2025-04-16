// Import the password generator utilities
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

// Calculate password strength
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

// Main handler for the Netlify function
exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json"
  };

  // Handle preflight request
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers,
      body: ""
    };
  }

  // Only handle GET requests
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" })
    };
  }

  try {
    console.log(`Processing ${event.httpMethod} request for path: ${event.path}`);
    console.log("Query parameters:", event.queryStringParameters);
    
    // Check if this is a password generation request
    // The path can be either /api/generate or /.netlify/functions/api/generate
    if (event.path.includes('generate')) {
      // Extract query parameters
      const queryParams = event.queryStringParameters || {};
      
      // Parse length parameter
      const length = parseInt(queryParams.length || "12", 10);
      
      // Validate length
      if (isNaN(length) || length < 1 || length > 100) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: "Invalid length. Must be between 1 and 100." })
        };
      }
      
      // Check for character mode parameter
      const characterMode = queryParams.characterMode || "all";
      
      // Set defaults based on character mode
      let uppercase = true;
      let lowercase = true;
      let numbers = true;
      let symbols = true;
      let easyToSay = false;
      let easyToRead = false;
      
      // Apply character mode settings
      if (characterMode === "easyToSay") {
        easyToSay = true;
        easyToRead = false;
      } else if (characterMode === "easyToRead") {
        easyToSay = false;
        easyToRead = true;
      } else {
        // For "all" mode or default, use individual parameters if provided
        uppercase = queryParams.uppercase !== "false";
        lowercase = queryParams.lowercase !== "false";
        numbers = queryParams.numbers !== "false";
        symbols = queryParams.symbols !== "false";
      }

      // Create password options
      const options = {
        length,
        uppercase,
        lowercase,
        numbers,
        symbols,
        easyToSay,
        easyToRead
      };

      // Generate password
      const password = generatePassword(options);
      
      // Calculate strength
      const strength = calculatePasswordStrength(password, options);
      const strengthInfo = getStrengthInfo(strength);

      // Return the password and related information
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          password,
          strength: {
            score: strength,
            label: strengthInfo.label
          },
          options
        })
      };
    }
    
    // Handle unknown routes
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: "Not found" })
    };
  } catch (error) {
    console.error("API error:", error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal Server Error" })
    };
  }
}; 