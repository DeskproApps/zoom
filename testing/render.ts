import {
  FC,
  ReactElement,
  createElement,
  PropsWithChildren,
} from "react";
import isString from "lodash/isString";
import {
  RenderResult,
  render as testingLibraryRender,
  RenderOptions as TestingLibraryRenderOptions,
} from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import {
  lightTheme,
  ThemeProvider,
  ThemeProviderProps,
} from "@deskpro/deskpro-ui";
import { DeskproAppProvider } from "@deskpro/app-sdk";

interface WrapperOptions {
  appSdk?: boolean;
  query?: boolean;
  theme?: boolean;
  router?: boolean|string;
}

interface RenderOptions extends TestingLibraryRenderOptions {
  wrappers: WrapperOptions;
}

const deskproAppProvider = {
  component: DeskproAppProvider,
};

const themeProvider = {
  component: ThemeProvider as FC<PropsWithChildren<unknown>>,
  props: {
    theme: lightTheme,
  } as ThemeProviderProps,
};

const routerProvider = {
  component: HashRouter,
};

const wrap = <P>(node: ReactElement<P>, options?: WrapperOptions): ReactElement<P> => {
  let children = node;

  if (options?.appSdk) {
    children = createElement(deskproAppProvider.component) as ReactElement;
  }

  if (options?.theme) {
    children = createElement(themeProvider.component, themeProvider.props, children) as ReactElement;
  }

  if (options?.router) {
    if (isString(options?.router)) {
      window.history.pushState({}, "", `#${options.router}`)
    }

    children = createElement(routerProvider.component, {}, children) as ReactElement;
  }

  return children;
}

const render = (node: ReactElement, options?: RenderOptions): RenderResult => {
  return testingLibraryRender(wrap(node, options?.wrappers), options);
};

export { render };
