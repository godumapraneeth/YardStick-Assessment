export function enableCors(req, res) {
  const allowedOrigins = [
    "http://localhost:5173", // local dev
    "https://yard-stick-assessment-qh7f.vercel.app", // frontend on Vercel
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return true;
  }
  return false;
}
