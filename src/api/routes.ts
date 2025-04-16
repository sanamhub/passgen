import { handleGeneratePasswordRequest } from "./generatePassword";

// Handler for all API routes
export const handleApiRequest = (req: Request): Response | Promise<Response> => {
  const url = new URL(req.url);
  const path = url.pathname;

  // Handle OPTIONS requests for CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  // Route to appropriate handler based on the path
  if (path === "/api/generate" || path.startsWith("/.netlify/functions/api/generate")) {
    console.log("API Request received for /api/generate");
    return handleGeneratePasswordRequest(url);
  }

  // Handle 404 for unknown routes
  return new Response(
    JSON.stringify({ error: "Not found" }),
    {
      status: 404,
      headers: { "Content-Type": "application/json" },
    }
  );
}; 