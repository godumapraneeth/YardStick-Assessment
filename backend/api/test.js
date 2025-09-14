// pages/api/test.js
import { withCors } from "../lib/withCors";

function handler(req, res) {
  res.status(200).json({ message: "CORS test successful!" });
}

export default withCors(handler);