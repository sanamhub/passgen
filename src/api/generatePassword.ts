import { generatePassword, calculatePasswordStrength, getStrengthInfo } from "../utils/passwordGenerator";
import type { PasswordOptions } from "../utils/passwordGenerator";

export const handleGeneratePasswordRequest = (url: URL): Response => {
  try {
    // Extract query parameters
    const length = parseInt(url.searchParams.get("length") || "12", 10);
    
    // Check for character mode parameter
    const characterMode = url.searchParams.get("characterMode") || "all";
    
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
      uppercase = url.searchParams.get("uppercase") !== "false";
      lowercase = url.searchParams.get("lowercase") !== "false";
      numbers = url.searchParams.get("numbers") !== "false";
      symbols = url.searchParams.get("symbols") !== "false";
    }

    // Validate length
    if (isNaN(length) || length < 1 || length > 100) {
      return new Response(
        JSON.stringify({ error: "Invalid length. Must be between 1 and 100." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create password options
    const options: PasswordOptions = {
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

    // Return password and additional information
    return new Response(
      JSON.stringify({
        password,
        strength: {
          score: strength,
          label: strengthInfo.label,
        },
        options
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to generate password" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}; 