import React, {Component} from 'react';

export default class Fuse extends Component {
  state = {error: null, errorInfo: null};

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>
            Упс..! Скорее всего сервер вернул кривой JSON или массив и я не могу
            его отрендерить. Повторите запрос.
          </h2>
          <details style={{whiteSpace: 'pre-wrap'}}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
