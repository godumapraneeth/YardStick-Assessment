// lib/withCors.js

import { enableCors } from "./cors.js";

export function withCors(handler) {
  return (req, res) => {
    // Run CORS check first. If it's an OPTIONS request,
    // it will be handled and the function will return.
    if (enableCors(req, res)) {
      return;
    }

    // If it's not an OPTIONS request, proceed to the next handler.
    return handler(req, res);
  };
}