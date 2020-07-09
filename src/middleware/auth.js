/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) return res.status(401).send({ error: 'No token provided' })

  const parts = authorization.split(' ')

  if (!parts.length === 2) return res.status(401).send({ error: 'Token error' })

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: 'Token malformatted' })

  jwt.verify(token, 'projetoluispw3', (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token invalid!' })
    req.userId = decoded.id

    return next()
  })
}

export default auth