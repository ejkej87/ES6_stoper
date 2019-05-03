class App extends React.Component {
   constructor() {
      super();
      this.state = {
         running: false,
         startButton: 'inline-block',
         stopButton: 'none',
         times: {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
         },
         results: []
      }
   }

   reset() {
      this.stop();
      this.setState({
         times: {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
         }
      })
   }
 
   format(times) {
      return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
   }

   start() {
      if (!this.state.running) {
         this.setState({
            running: true,
            startButton: 'none',
            stopButton: 'inline-block'
         })
         this.watch = setInterval(() => this.step(), 10)
      }
   }

   step() {
      if (!this.state.running) return;
      this.calculate();
   }

   calculate() {
      let {
         minutes,
         seconds,
         miliseconds
      } = this.state.times;
      miliseconds += 1;
      if (miliseconds >= 100) {
         seconds += 1;
         miliseconds = 0;
      }
      if (seconds >= 60) {
         minutes += 1;
         seconds = 0;
      }
      this.setState({
         times: {
            minutes: minutes,
            seconds: seconds,
            miliseconds: miliseconds
         }
      });
   }

   stop() {
      this.setState({
         running: false,
         startButton: 'inline-block',
         stopButton: 'none'
      })
      clearInterval(this.watch);
   }




   cleanList() {
      document.querySelector('.results').innerHTML = "";
   }



   render() {
      return ( 
         <div>
            <div className="stopWatch">
               <nav className="controls" >
                  <a className="button" id="start" onClick={this.start.bind(this)}>
                     <i className="fas fa-play"></i>
                  </a> 
                  <a className="button" id="stop" onClick={this.stop.bind(this)}>
                     <i className="fas fa-pause"></i>
                  </a>
                  <a className="button" id="reset" onClick={this.reset.bind(this)}>
                     <i className="fas fa-redo"></i>
                  </a>
                  <ul className="results">{this.state.results}</ul> 
               </nav>
               <div className="watch">
						{this.format(this.state.times)}
					</div>
            </div>
            <ul className="results">
					{this.state.results}
				</ul>
         </div>
      )
   }

}

function pad0(value) {
   let result = value.toString();
   if (result.length < 2) {
      result = '0' + result;
   }
   return result;
}

ReactDOM.render( < App / > , document.getElementById('root'))
