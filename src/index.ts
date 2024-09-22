import { authHandler, initAuthConfig, verifyAuth } from '@hono/auth-js'
import { Hono } from 'hono'
import getAuthConfig from './services/auth'
import ProtectedRoutes from './routes/protected.routes'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {CORS_ORIGIN:string}
}>()

// cors config
app.use('*', async (c, next) => {
  const corsMiddlewareHandler = cors({
    origin: c.env.CORS_ORIGIN,
  })
  return corsMiddlewareHandler(c, next)
})

// auth middleware
app.use("*", initAuthConfig(getAuthConfig))
app.use("/api/auth/*", authHandler())

// route protection for all api routes
app.use('/api/*', verifyAuth())
app.route('/api/protected', ProtectedRoutes)



app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
