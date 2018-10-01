import { take, put, call, fork, all } from 'redux-saga/effects'

import {
  LOAD_HOME_PAGE,
} from 'Actions/pages'



export function* fetchEntity(entity, apiFn, data) {
  yield put(entity.request(data))

  const { response, error } = yield call(apiFn, data)


  if(response) yield put(entity.success(data, response))
  else yield put(entity.failure(data, error))
}


// PAGES (Simple)
function* watchHomePage() {
  while(true) {
    yield take(LOAD_HOME_PAGE)
  }
}


// ///////
function* getRequiredDefaults() {

}

function* watchAllPages() {
  // PAGE WATCHERS
  yield fork(watchHomePage) // home
}


export default function* rootSaga() {
  yield all([
    call(getRequiredDefaults),
    fork(watchAllPages),
  ])
}
