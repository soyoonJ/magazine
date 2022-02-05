import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import User from "./modules/user";
import Post from "./modules/post";

export const history = createBrowserHistory();

// rootReducer 준비
const rootReducer = combineReducers({
  user: User,
  post: Post,
  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({history:history})];

// 지금이 어느 환경인 지 알려줘요. (개발환경, 프로덕션(배포)환경 ...)
const env = process.env.NODE_ENV;

// 개발환경에서는 로거라는 걸 하나만 더 써볼게요.
// 개발할 때만 필요하기 때문에 밑에 사용하는거! 다른 때는 굳이 두면 모듈 크기만 커짐
if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

// 안 써도 상관은 없지만 쓰면 엄청 편함!
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

    // 미들웨어 묶기
const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
    );

let store = (initialStore) => createStore(rootReducer, enhancer);

export default store();