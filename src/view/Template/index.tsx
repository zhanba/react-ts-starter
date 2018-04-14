import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { bindActionCreators } from 'redux'
import { IGlobalState } from '../../rootReducer'
import { actions as templateActions } from './actions'

interface IStateProps {
  testProp: string
}

interface IDispatchProps {
  actions: typeof templateActions
}

class Template extends React.Component<
  IStateProps & IDispatchProps & RouteComponentProps<any>,
  {}
> {
  componentDidMount() {
    const { actions } = this.props
    actions.componentMounted()
  }

  render() {
    return <div> demo page </div>
  }
}

export default connect(
  (state: IGlobalState) => {
    return {
      testProp: 'test prop',
    }
  },
  dispatch => {
    return {
      actions: bindActionCreators(templateActions, dispatch),
    }
  }
)(Template)
