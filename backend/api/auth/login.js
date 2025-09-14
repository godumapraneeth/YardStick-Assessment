
import bcrypt from "bcryptjs";
import { connectDB } from "../../lib/db.js";
import User from "../../models/User.js";
import Tenant from "../../models/Tenant.js";
import { signToken } from "../../lib/auth.js";
import { withDB } from "../../lib/withDB.js";
import { enableCors } from "../../lib/cors.js";
import { withCors } from "../../lib/withCors.js";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }


  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate("tenantId");
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = signToken(user);

  res.status(200).json({
    token,
    user: {
      email: user.email,
      role: user.role,
      tenant: {
        slug:user.tenantId.slug,
        plan:user.tenantId.plan
      }
    },
  });
}

export default withCors(withDB(handler));
