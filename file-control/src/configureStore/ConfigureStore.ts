import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { createBrowserHistory } from "history";
import { routerMiddleware, connectRouter } from "connected-react-router";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
  });

export const history = createBrowserHistory();

const reactRouterMiddleware = routerMiddleware(history);

const middleWares = [reactRouterMiddleware];

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(applyMiddleware(...middleWares))
  );

  return store;
}
