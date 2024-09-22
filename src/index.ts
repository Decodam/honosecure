import { authHandler, initAuthConfig, verifyAuth } from '@hono/auth-js'
import { Hono } from 'hono'
import getAuthConfig from './services/auth'
import ProtectedRoutes from './routes/protected.routes'

const app = new Hono()

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
