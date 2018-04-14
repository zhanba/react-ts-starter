import * as React from 'react'
import * as styles from './MainLayout.less'

class MainLayout extends React.Component<any, any> {
  render() {
    return <div className={styles.content}>{this.props.children}</div>
  }
}

export default MainLayout
