// eslint-disable-next-line
export function parseJwt(token) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace('-', '+').replace('_', '/')
  const parseObj = window ? window.atob(base64) : null
  return JSON.parse(parseObj)
}
