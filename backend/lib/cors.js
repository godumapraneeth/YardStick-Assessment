// lib/cors.js

export function enableCors(req,res) {
  // Use an environment variable for the client origin
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_ORIGIN || "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle the preflight request
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return true; // Indicates the request was handled
  }

  return false; // Indicates the request was not handled
}