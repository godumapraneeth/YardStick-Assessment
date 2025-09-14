import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Tenant from "./models/Tenant.js";
import User from "./models/User.js";

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await Tenant.deleteMany({});
  await User.deleteMany({});

  const acme = await Tenant.create({ name: "Acme", slug: "acme", plan: "free" });
  const globex = await Tenant.create({ name: "Globex", slug: "globex", plan: "free" });

  const passwordHash = await bcrypt.hash("password", 10);

  await User.create([
    { email: "admin@acme.test", password: passwordHash, role: "admin", tenantId: acme._id },
    { email: "user@acme.test", password: passwordHash, role: "member", tenantId: acme._id },
    { email: "admin@globex.test", password: passwordHash, role: "admin", tenantId: globex._id },
    { email: "user@globex.test", password: passwordHash, role: "member", tenantId: globex._id },
  ]);

  console.log("✅ Seed data inserted");
  mongoose.disconnect();
}

seed();
