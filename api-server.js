// Simple API server for development
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4174;

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

// Enable CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

// Simple HTML for the root route to show server is running
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Password Generator API</title>
        <style>
          body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; }
          pre { background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow: auto; }
          code { background: #f5f5f5; padding: 0.2rem 0.4rem; border-radius: 3px; }
        </style>
      </head>
      <body>
        <h1>Password Generator API</h1>
        <p>The API server is running. Use the following endpoint to generate passwords:</p>
        <pre>GET /api/generate</pre>
        
        <h2>Examples</h2>
        <ul>
          <li>Default (12 characters, all types): <a href="/api/generate">/api/generate</a></li>
          <li>Custom length: <a href="/api/generate?length=20">/api/generate?length=20</a></li>
          <li>Easy to say: <a href="/api/generate?characterMode=easyToSay">/api/generate?characterMode=easyToSay</a></li>
          <li>Without symbols: <a href="/api/generate?symbols=false">/api/generate?symbols=false</a></li>
        </ul>
      </body>
    </html>
  `);
});

// API endpoint for password generation
app.get('/api/generate', (req, res) => {
  try {
    console.log('API request received:', req.query);
    
    // Extract query parameters
    const length = parseInt(req.query.length || '12', 10);
    
    // Check for character mode parameter
    const characterMode = req.query.characterMode || 'all';
    
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
      uppercase = req.query.uppercase !== 'false';
      lowercase = req.query.lowercase !== 'false';
      numbers = req.query.numbers !== 'false';
      symbols = req.query.symbols !== 'false';
    }

    // Validate length
    if (isNaN(length) || length < 1 || length > 100) {
      return res.status(400).json({ error: 'Invalid length. Must be between 1 and 100.' });
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

    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Return password and additional information
    res.json({
      password,
      strength: {
        score: strength,
        label: strengthInfo.label,
      },
      options
    });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Failed to generate password' });
  }
});

// Support for Netlify function path pattern
app.get('/.netlify/functions/api/generate', (req, res) => {
  // Forward to the main API endpoint
  req.url = '/api/generate';
  app._router.handle(req, res);
});

// Start the server
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
  console.log(`Password generation API available at http://localhost:${PORT}/api/generate`);
}); 