import initializeBasicAuth from 'nextjs-basic-auth'
import type { IncomingMessage, ServerResponse } from 'http'

const users = [
  { user: 'user', password: 'password' },
  { user: 'admin', password: 'admin' },
]

const basicAuthCheck = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  await initializeBasicAuth({ users })(req, res)

  // Workaround for major bug: If you cancel, the page loads normally. - https://github.com/jchiatt/nextjs-basic-auth/issues/4
  if (res.statusCode === 401) {
    res.end('<html>Unauthorized</html>')
  }
}

export default initializeBasicAuth({ users })