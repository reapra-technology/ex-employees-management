import initializeBasicAuth from 'nextjs-basic-auth'
import type { IncomingMessage, ServerResponse } from 'http'

const users = [
  { user: process.env.NEXT_PUBLIC_BASIC_AUTH_USER_NAME!, password: process.env.NEXT_PUBLIC_BASIC_AUTH_PASSWORD! },
  { user: 'admin', password: 'admin' },// デプロイ時に削除
]

const basicAuthCheck = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
  await initializeBasicAuth({ users })(req, res)

  // Workaround for major bug: If you cancel, the page loads normally. - https://github.com/jchiatt/nextjs-basic-auth/issues/4
  if (res.statusCode === 401) {
    res.end('<html>Unauthorized</html>')
  }
}

export default initializeBasicAuth({ users })