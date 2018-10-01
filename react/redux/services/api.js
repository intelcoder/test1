import request from 'superagent-bluebird-promise'
import { API_URL } from 'Config/config.json'
import { browserStorage } from 'Redux/services/storage'

const API_ROOT = API_URL

const bs = browserStorage()

// eslint-disable-next-line
export function callApi(endpoint, reqData = { mode: 'GET', token: null, data: {}, contentType: null }) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? (API_ROOT + endpoint) : endpoint
  const reqMode = reqData.mode

  let requestPromise
  switch(reqMode) {
    case 'POST':
      requestPromise = request.post(fullUrl)
      if(reqData.token) requestPromise.set('Authorization', `Bearer ${reqData.token}`)
      requestPromise.set('Content-Type', reqData.contentType ? reqData.contentType : 'application/x-www-form-urlencoded') // eslint-disable-line
      requestPromise.send({ ...reqData.data })
      break
    case 'PATCH':
      requestPromise = request.patch(fullUrl)
      if(reqData.token) requestPromise.set('Authorization', `Bearer ${reqData.token}`)
      requestPromise.set('Content-Type', 'application/json')
      requestPromise.send({ ...reqData.data })
      break
    case 'DELETE':
      requestPromise = request.del(fullUrl)
      if(reqData.token) requestPromise.set('Authorization', `Bearer ${reqData.token}`)
      requestPromise.set('Content-Type', 'application/x-www-form-urlencoded')
      requestPromise.send({ ...reqData.data })
      break
    default: // GET
      requestPromise = request.get(fullUrl)
      if(reqData.token) requestPromise.withCredentials().set('Authorization', `Bearer ${reqData.token}`)
      requestPromise.query({ ...reqData.data })
  }

  requestPromise.withCredentials()

  return requestPromise.promise()
    .then((response) => {
      const json = response.body
      const resError = response.body.error

      if(resError) {
        switch(resError) {
          case 'non_refreshable':
          case 'token_invalid':
          case 'no_token':
            response.tokenError = true
            break
          case 'token_expired':
            bs.setItem('token', json.token)
            break
        }
      } else if(response.xhr) {
        let newToken = response.xhr.getResponseHeader('Authorization')
        if(newToken) {
          newToken = newToken.split(' ')[1]
          bs.setItem('token', newToken)
        }
      }
      return { response, json }
    })
    .then(({ response, json }) => {
      if(!response.ok || !json) { return Promise.reject(json) }
      return Object.assign({}, { data: json, tokenError: response.tokenError })
    })
    .then(
      response => ({ response }),
      error => ({ error: error || 'Something bad happened' }),
    )
}
