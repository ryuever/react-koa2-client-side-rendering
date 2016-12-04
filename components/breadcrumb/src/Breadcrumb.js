import { Link } from 'react-router';
import React, {
  Component,
  PropTypes,
  cloneElement,
} from 'react';

import BreadcrumbLink from './BreadcrumbLink';

const nameRender = (params, route) => {
  const nameRender = route.breadcrumbName;

  if (!nameRender) {
    throw new Error('Should be provided a necessary "breadcrumbName" prop');
  }

  const pathRender = route.path;

  // pathRender should be the last one to process.
  const [name, path] = [nameRender, pathRender].map((item) => {
    return item.replace(/:([^/]+)/g, (matched, key) => {
      return params[key];
    });
  });

  return [name, path];
};

export default class Breadcrumb extends Component {

  renderLinks() {
    const {
      routes,
      children,
      params,
    } = this.props;

    // integrated with react-router;
    if (routes && routes.length > 0) {
      const componentPaths = [];
      let parentComponentPath = '';

      // To avoid multiple path with same path param ( its value
      // will be pushed into this.props.params object with path params as key )
      routes.forEach(route => {
        const [name, path] = nameRender(params, route);
        if (route.path) {
          // If route's path is started with '/', setting current path as
          // root for its descendant component;
          if (/^\//.test(route.path)) {
            componentPaths.push({ name, path });
            parentComponentPath = path;
          } else {
            parentComponentPath = `${parentComponentPath}/${path}`;
            componentPaths.push({
              name,
              path: parentComponentPath,
            });
          }
        }
      });

      const lastPath = componentPaths.pop();

      const ret = componentPaths.map((componentPath) => {
        return (
          <BreadcrumbLink key={componentPath.name}>
            <Link to={componentPath.path}>
              {componentPath.name}
            </Link>
          </BreadcrumbLink>
        );
      });

      ret.push(
        <BreadcrumbLink key={lastPath.name}>
          <span>
            {lastPath.name}
          </span>
        </BreadcrumbLink>
      );

      return ret;
    }

    // For the situation app dont use react-router.
    // When multiple BreadcrumbLink components is provided;
    if (Array.isArray(children)) {
      return (
        children.map((child, key) => {
          return cloneElement(child, { key });
        })
      );
    }

    // When there is only one BreadcrumbLink component;
    return children;
  }

  render() {
    const { prefix } = this.props;
    const cx = `${prefix ? `${prefix}-` : ''}breadcrumb`;

    return (
      <ol className={cx}>
        {this.renderLinks()}
      </ol>
    );
  }
}

Breadcrumb.propTypes = {
  prefix: PropTypes.string,
};
