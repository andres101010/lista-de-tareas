// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose'; // Usamos jose

const SECRET_KEY = process.env.SECRET_JWT_SEED;

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    if (!SECRET_KEY) {
      throw new Error('SECRET_JWT_SEED is not defined in environment variables');
    }

    const secret = new TextEncoder().encode(SECRET_KEY); // Edge necesita secret como Uint8Array

    await jwtVerify(token, secret); // Aquí se verifica el token con jose

    return NextResponse.next();
  } catch (error) {
    console.log(error)
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/home/:path*','/tasks/:path*'],
};
