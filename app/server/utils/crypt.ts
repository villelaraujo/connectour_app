import bcrypt from "bcryptjs";
import "dotenv/config";

const { compare, hash, genSalt } = bcrypt;

export async function genHash(pass: string){
    const salt=await genSalt(parseInt(process.env.PASS_SALT||"10"));
    const hashed=await hash(pass,salt);
    const passObj={hash:hashed,salt:salt};
    return passObj;
};

export async function compareHash(pass: string,hash: string){
  return await compare(pass,hash);
};