'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
   _inherits(App, _React$Component);

   function App(props) {
      _classCallCheck(this, App);

      var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

      _this.state = {
         running: false,
         startButton: 'inline-block',
         stopButton: 'none',
         times: {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
         },
         results: []
      };
      return _this;
   }

   _createClass(App, [{
      key: 'reset',
      value: function reset() {
         this.stop();
         this.setState({
            times: {
               minutes: 0,
               seconds: 0,
               miliseconds: 0
            }
         });
      }
   }, {
      key: 'format',
      value: function format(times) {
         return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds));
      }
   }, {
      key: 'start',
      value: function start() {
         var _this2 = this;

         if (!this.state.running) {
            this.setState({
               running: true,
               startButton: 'none',
               stopButton: 'inline-block'
            });
            this.watch = setInterval(function () {
               return _this2.step();
            }, 10);
         }
      }
   }, {
      key: 'step',
      value: function step() {
         if (!this.state.running) return;
         this.calculate();
      }
   }, {
      key: 'calculate',
      value: function calculate() {
         var _state$times = this.state.times,
             minutes = _state$times.minutes,
             seconds = _state$times.seconds,
             miliseconds = _state$times.miliseconds;

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
   }, {
      key: 'stop',
      value: function stop() {
         this.setState({
            running: false,
            startButton: 'inline-block',
            stopButton: 'none'
         });
         clearInterval(this.watch);
      }
   }, {
      key: 'cleanList',
      value: function cleanList() {
         document.querySelector('.results').innerHTML = "";
      }
   }, {
      key: 'render',
      value: function render() {
         return React.createElement(
            'div',
            null,
            React.createElement(
               'div',
               { className: 'stopWatch' },
               React.createElement(
                  'nav',
                  { className: 'controls' },
                  React.createElement(
                     'a',
                     { className: 'button', id: 'start', style: { display: this.state.startButton }, onClick: this.start.bind(this) },
                     React.createElement('i', { className: 'fas fa-play' })
                  ),
                  React.createElement(
                     'a',
                     { className: 'button', id: 'stop', style: { display: this.state.stopButton }, onClick: this.stop.bind(this) },
                     React.createElement('i', { className: 'fas fa-pause' })
                  ),
                  React.createElement(
                     'a',
                     { className: 'button', id: 'reset', onClick: this.reset.bind(this) },
                     React.createElement('i', { className: 'fas fa-redo' })
                  ),
                  React.createElement(
                     'ul',
                     { className: 'results' },
                     this.state.results
                  )
               )
            )
         );
      }
   }]);

   return App;
}(React.Component);

function pad0(value) {
   var result = value.toString();
   if (result.length < 2) {
      result = '0' + result;
   }
   return result;
}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
