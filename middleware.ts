// Note: avoid importing server-side auth helpers that initialize Prisma
// because middleware runs in the Edge runtime. Instead, call the
// session endpoint to determine if the user is authenticated.

async function isAuthenticated(req: Request) {
  try {
    const url = new URL('/api/auth/session', req.url)
    // forward cookies so NextAuth can read session
    const cookie = req.headers.get('cookie') || ''
    const res = await fetch(url.toString(), { headers: { cookie }, next: { revalidate: 0 } })
    if (!res.ok) return false
    const data = await res.json()
    return !!data?.user
  } catch {
    return false
  }
}

export default async function middleware(req: Request) {
  const { pathname } = new URL(req.url)

  const auth = await isAuthenticated(req)

  // If user is not authenticated and is not already on /login, send to /login
  if (!auth && pathname !== '/login') {
    const newUrl = new URL('/login', req.url)
    return Response.redirect(newUrl)
  }

  // If user is authenticated and is trying to access /login, redirect to dashboard
  if (auth && pathname === '/login') {
    const newUrl = new URL('/dashboard', req.url)
    return Response.redirect(newUrl)
  }

  return undefined
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}