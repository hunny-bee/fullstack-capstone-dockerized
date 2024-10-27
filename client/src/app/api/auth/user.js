import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions); 
  res.status(200).json({ user: session?.user });
}