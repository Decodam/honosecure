import { Hono } from "hono"

const ProtectedRoutes = new Hono()

ProtectedRoutes.get('/', (c) => c.text('List ProtectedRoutess'))

ProtectedRoutes.get('/:id', (c) => {
  const id = c.req.param('id')
  return c.text('Get ProtectedRoutes: ' + id)
})


export default ProtectedRoutes