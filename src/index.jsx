import './img/favicon.ico'

import React from 'react'
import { render } from 'react-dom'
import { Provider, ReactReduxContext } from 'react-redux'
import configureStore, { history } from "./store"
import InstallFontAwesome from './lib/icon'
import rootSaga from "./sagas"
import App from './containers/App'

if (!Intl.PluralRules) {
    require('@formatjs/intl-pluralrules/polyfill')
    require('@formatjs/intl-pluralrules/dist/locale-data/en')
    require('@formatjs/intl-pluralrules/dist/locale-data/zh')
}

if (!Intl.RelativeTimeFormat) {
    require('@formatjs/intl-relativetimeformat/polyfill')
    require('@formatjs/intl-relativetimeformat/dist/locale-data/en')
    require('@formatjs/intl-relativetimeformat/dist/locale-data/zh')
}

const store = configureStore()
store.runSaga(rootSaga)
InstallFontAwesome()

render(
    <Provider store={store} context={ReactReduxContext}>
        <App history={history} />
    </Provider>
    , document.getElementById('root')
)

