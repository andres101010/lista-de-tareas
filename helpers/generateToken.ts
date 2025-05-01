import { SignJWT, type JWTPayload } from 'jose';

export async function generateToken(payload: JWTPayload) {
  const secret = process.env.SECRET_JWT_SEED;

  if (!secret) {
    throw new Error('SECRET_JWT_SEED is not defined in environment variables');
  }

  const encodedSecret = new TextEncoder().encode(secret); // Se convierte a Uint8Array

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' }) // Algoritmo que se usará (igual que antes)
    .setIssuedAt()                         // Fecha de creación
    .setExpirationTime('1h')               // Expira en 1 hora
    .sign(encodedSecret);                  // Firmar con el secreto

  return token;
}
