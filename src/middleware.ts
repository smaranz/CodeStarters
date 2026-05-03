import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    const { data: { user } } = await supabase.auth.getUser()

    const pathname = request.nextUrl.pathname

    // Protect admin routes
    if (pathname.startsWith('/admin')) {
        // Allow access to login page
        if (pathname === '/admin/login' || pathname === '/admin/setup') {
            if (user) {
                return NextResponse.redirect(new URL('/admin', request.url))
            }
            return response
        }

        // Redirect to login if not authenticated
        if (!user) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    // Protect Fire Hacks participant portal
    if (pathname.startsWith('/firehacks/portal')) {
        if (pathname === '/firehacks/portal/login') {
            if (user) {
                return NextResponse.redirect(new URL('/firehacks/portal', request.url))
            }
            return response
        }

        if (!user) {
            return NextResponse.redirect(new URL('/firehacks/portal/login', request.url))
        }
    }

    // Protect Fire Hacks member scanner
    if (pathname.startsWith('/firehacks/member')) {
        if (pathname === '/firehacks/member/login') {
            if (user) {
                return NextResponse.redirect(new URL('/firehacks/member', request.url))
            }
            return response
        }

        if (!user) {
            return NextResponse.redirect(new URL('/firehacks/member/login', request.url))
        }
    }

    return response
}

export const config = {
    matcher: ['/admin/:path*', '/firehacks/portal/:path*', '/firehacks/member/:path*'],
}
