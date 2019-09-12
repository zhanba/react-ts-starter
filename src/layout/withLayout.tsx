import * as React from 'react';

export const withLayout = (
  Component: React.ComponentType<any>,
  Layout: React.ComponentType<any>,
): React.ComponentType<any> => {
  return class Comp extends React.Component {
    render() {
      return (
        <Layout>
          <Component {...this.props} />
        </Layout>
      );
    }
  };
};
