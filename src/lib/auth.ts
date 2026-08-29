import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
const cookieName="magnanimous_admin";
const secret=()=>new TextEncoder().encode(process.env.ADMIN_SESSION_SECRET || "change-this-development-secret-before-production-1234567890");
export async function hashPassword(password:string){return bcrypt.hash(password,12)}
export async function verifyPassword(password:string,hash:string){return bcrypt.compare(password,hash)}
export async function createAdminSession(user:{id:string,email:string}){const token=await new SignJWT({email:user.email,role:"admin"}).setProtectedHeader({alg:"HS256"}).setSubject(user.id).setIssuedAt().setExpirationTime("7d").sign(secret());(await cookies()).set(cookieName,token,{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:60*60*24*7});}
export async function destroyAdminSession(){(await cookies()).set(cookieName,"",{httpOnly:true,path:"/",maxAge:0});}
export async function getAdminSession(){const token=(await cookies()).get(cookieName)?.value;if(!token)return null;try{return await jwtVerify(token,secret())}catch{return null}}
export async function requireAdmin(){const s=await getAdminSession();if(!s)throw new Error("UNAUTHORIZED");return s;}
