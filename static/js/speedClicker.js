function getRandomInt(limite) {
  return Math.floor(Math.random() * (limite - 40));
}
function getRandomInt2() {
  return Math.floor(Math.random() * 100);
}

class Cible extends React.Component {
  render() {
    const style = this.props.start
      ? {
          left: this.props.x + "px",
          top: this.props.y + "px",
        }
      : {};
    return (
      <button
        id="cible"
        style={style}
        onClick={this.props.onCibleCLick}
      ></button>
    );
  }
}

class Plateau extends React.Component {
  render() {
    return (
      <div id="plateau">
        {!this.props.start ? (
          <div>
            <p>CLIQUEZ-MOI !</p>
            <br />
            <br />
            <br />
          </div>
        ) : null}

        <Cible
          x={this.props.x}
          y={this.props.y}
          onCibleCLick={this.props.onCibleCLick}
          start={this.props.start}
        />
      </div>
    );
  }
}

class Menu extends React.Component {
  render() {
    return (
      <div id="menu">
        <h2>MENU</h2>

        <div id="onTarget">
          {this.props.start ? (
            this.props.toucher ? (
              <p id="touche" className="trMessage">
                touché
              </p>
            ) : (
              <p id="rate" className="trMessage">
                raté
              </p>
            )
          ) : (
            ""
          )}
        </div>
        <p>speed : {this.props.speed} ms</p>
        <p>Cible touché : {this.props.t}</p>
        <p>Cible raté : {this.props.r}</p>
        <div id="stopButton">
          <button onClick={this.props.onStop}>STOP</button>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      start: false,
      speed: 2000,
      timer: null,
      toucher: false,
      t: 0,
      r: 0,
    };
    this.handleCLickCible = this.handleCLickCible.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  handleCLickCible() {
    if (!this.state.start) {
      this.setState({ start: true });
    } else {
      this.setState({
        speed: this.state.speed - getRandomInt2(),
        t: this.state.t + 1,
      });
    }
    this.setTimer();
    this.setState({
      x: getRandomInt(800),
      y: getRandomInt(600),
      toucher: true,
    });
  }

  handleStop() {
    this.setState({ start: false });
    window.clearInterval(this.state.timer);
  }

  miss() {
    this.setState({ speed: this.state.speed + getRandomInt2() });
    this.setState({
      x: getRandomInt(800),
      y: getRandomInt(600),
      toucher: false,
      r: this.state.r + 1,
    });
    this.setTimer();
  }

  setTimer() {
    this.state.timer ? window.clearInterval(this.state.timer) : null;
    this.setState({
      timer: window.setInterval(this.miss.bind(this), this.state.speed),
    });
  }

  componentwillUnmount() {
    window.clearInterval(this.state.timer);
  }

  render() {
    return (
      <div id="game">
        <header>
          <h1>Speed Clicker !</h1>
        </header>
        <main>
          <Plateau
            x={this.state.x}
            y={this.state.y}
            onCibleCLick={this.handleCLickCible}
            start={this.state.start}
          />
          <Menu
            speed={this.state.speed}
            onStop={this.handleStop}
            toucher={this.state.toucher}
            start={this.state.start}
            t={this.state.t}
            r={this.state.r}
          />
        </main>
        <footer>
          <p>SpeedClicker@2022, Jason Teilliez</p>
        </footer>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("app"));
