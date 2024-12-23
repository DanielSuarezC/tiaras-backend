import * as bcrypt from 'bcrypt';

/* Constants */
const saltOrRounds: number = 10;

/* Hashing Password */
export async function hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, saltOrRounds);
}

/* Comparing Password */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash); 
}