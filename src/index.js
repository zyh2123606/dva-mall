import dva from 'dva'
import {createBrowserHistory as createHistory} from 'history'
import models from './models'
import './index.css'
import createLoading from 'dva-loading'

// 1. Initialize
const app = dva({ history: createHistory() })
app.use(createLoading())

// 2. Plugins
// app.use({});

// 3. Model
models.forEach((model) => {
  app.model(model.default)
})

// 4. Router
app.router(require('./router').default)

// 5. Start
app.start('#root')
