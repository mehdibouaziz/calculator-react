import React from "react";
import Toggle from "./components/Toggle";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display : '0',
      operation : '',
      formula : '= Hello World =',
      debugToggle: false
    };

    this.handleDigit = this.handleDigit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleNegative = this.handleNegative.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSign = this.handleSign.bind(this);

  }
  componentDidMount(){
    document.addEventListener('keydown',this.handleKeydown.bind(this))
  }

  handleKeydown(e) {
    let map = {
      48: 'zero',
      49: 'one',
      50: 'two',
      51: 'three',
      52: 'four',
      53: 'five',
      54: 'six',
      55: 'seven',
      56: 'eight',
      57: 'nine',
      96: 'zero',
      97: 'one',
      98: 'two',
      99: 'three',
      100: 'four',
      101: 'five',
      102: 'six',
      103: 'seven',
      104: 'eight',
      105: 'nine',
      13: 'equals',
      187: 'equals',
      107: 'add',
      109: 'subtract',
      189: 'subtract',
      106: 'multiply',
      88: 'multiply',
      111: 'divide',
      191: 'divide',
      110: 'decimal',
      190: 'decimal',
      8: 'clear',
      46: 'clear'
    };
    
    if (e.shiftKey && e.which === 56) {   /*if user press shfit+8 > * */
      document.getElementById('multiply').click();
    } else if (e.shiftKey && e.which === 187) { /*if user press shfit+= > + */
      document.getElementById('add').click();
    } else if (map.hasOwnProperty(e.which)) {
      document.getElementById(map[e.which.toString()]).click();
    }
  }

  handleDigit(e) {
    let formula = this.state.formula;
    let oldDisplay = this.state.display;

    if (/=/.test(this.state.formula)) {
      this.setState({
        display : e.target.value,
        formula : e.target.value
      });
    } else if (/[x+-/]-$/.test(this.state.formula)) {
      this.setState({
        display : oldDisplay.concat(e.target.value),
        formula : this.state.formula.concat(e.target.value)
      });
    } else if (this.state.formula === '-') {
      this.setState({
        display : oldDisplay.concat(e.target.value),
        formula : this.state.formula.concat(e.target.value)
      });
    } else if (/[x+-/]$/.test(this.state.formula)) {
      this.setState({
        display : e.target.value,
        formula : this.state.formula.concat(e.target.value)
      });
    } else if (this.state.display === '0') {
      this.setState({
        display : e.target.value,
        formula : formula.slice(0,-1).concat(e.target.value)
      });
    } else {
    this.setState({
      display : oldDisplay.concat(e.target.value),
      formula : this.state.formula.concat(e.target.value)
    });
    };
  }

  handleClear() {
    this.setState({
      display: '0',
      operation: '',
      formula: '0'
    });
  }

  handleEquals() {
    let result = '';
    let formula = this.state.formula;

    formula = formula.replace(/x/g, '*').replace(/--/g,'+');
    // eslint-disable-next-line
    result = Math.round(eval(formula).toString() * 100000000) / 100000000;

    this.setState({
      display: result,
      operation: '',
      formula : this.state.formula.concat('= ' + result)
    });

  }

  handleOperator(e) {
    let formula = this.state.formula;

    /* first test if there's not already an operator */
    if (/Hello/.test(this.state.formula)) {
      formula = '0' ;
    } else if (/^-[0-9]+$/.test(this.state.formula)){

    } else if (/[x+/-]$/.test(this.state.formula)) {
      formula = formula.slice(0,-2);
    } else if (/[x+/-]/.test(this.state.display)) {
      formula = formula.slice(0,-1);
    } else if (/=/.test(this.state.formula)) {
      formula = formula.split(" ")[1];
    };

    /* then apply operator */
    switch(e.target.id) {
      case 'add' :
        this.setState({
          display: '+',
          operation: 'add',
          formula : formula.concat('+')
        });
        break;
      case 'multiply' :
        this.setState({
          display: 'x',
          operation: 'multiply',
          formula : formula.concat('x')
        });
        break;
      case 'divide' :
        this.setState({
          display: '/',
          operation: 'divide',
          formula : formula.concat('/')
        });
        break;
      default :
        break;
    };
  }

  handleNegative() {
    let formula = this.state.formula;

    /* first test if there's not already an operator */
    if (/Hello/.test(this.state.formula)) {
      formula = '0' ;
    } else if (/[x+/-]$/.test(this.state.formula)){
      formula = formula.slice(0,-1);
    } else if (/=/.test(this.state.formula)) {
      formula = formula.split(" ")[1];
    };

    this.setState({
      display: '-',
      operation: 'subtract',
      formula : formula.concat('-')
    });
  }

  handleSign(){
    let formula = this.state.formula;
    let oldDisplay = this.state.display;


    if (/Hello/.test(this.state.formula)) {  /* first test if calc is in initial state = HELLO in formula*/
      this.setState({
        formula: '-',
        display: '-'
      });
    } else if (/=/.test(this.state.formula)) {
      this.setState({
        formula: '-',
        display: '-'
      });
    } else if (/[x+/-]/.test(this.state.formula)){  /* then test if an operator is already entered */
        if (/^-[0-9]+$/.test(this.state.formula)) {  /*  special case, this is only a negative digit in the formula */
          this.setState({
            formula: formula.slice(1),
            display: oldDisplay.slice(1)
          });
        } else if (/^[0-9]+$/.test(this.state.display)){   /* if operator then test for digit in display */
          let len = formula.length-oldDisplay.length
          let arr = formula.split('')
          arr.splice(len,0,'-')
          this.setState({
            display: '-'.concat(oldDisplay),
            formula: arr.join('')
          })
        } else {   /*if an operator has just been entered but no digit yet, start a new negative digit*/
          this.setState({
            display: '-',
            formula: formula.concat('-')
          })
        }
    } else if (this.state.formula === '0'){
      this.setState({
        formula: '-',
        display: '-'
      });
    } else if (/^[0-9]+$/.test(this.state.formula)){ /* if only digits*/
      this.setState({
        formula: '-'.concat(oldDisplay),
        display: '-'.concat(oldDisplay)
      });
    } 

  }

  handleDecimal() {

    /* first check if the number is not already decimal */
    if (!/\./.test(this.state.display)) {
      /* if the number is NOT already a decimal, add a . */
      this.setState({
        display: this.state.display.concat('.'),
        formula : this.state.formula.concat('.')
      });
    }
  }

  handleToggle() {
    let check = this.state.debugToggle;
    this.setState({
      debugToggle: !check
    })
  }
  
  render() {
    return (
      <div className='container'>
        <div className='display' id=''>
          <p id='display-formula'>{this.state.formula}</p>
          <p id='display'>{this.state.display}</p>
        </div>


        <div className='keyboard'>
          <button className='key clr' id='clear' onClick={this.handleClear}>AC</button>
          <button className='key opp' id='divide' onClick={this.handleOperator}>/</button>
          <button className='key opp' id='multiply' onClick={this.handleOperator}>x</button>

          <button className='key num' id='seven' value={7} onClick={this.handleDigit}>7</button>
          <button className='key num' id='eight' value={8} onClick={this.handleDigit}>8</button>
          <button className='key num' id='nine' value={9} onClick={this.handleDigit}>9</button>
          <button className='key opp' id='subtract' onClick={this.handleNegative}>-</button>

          <button className='key num' id='four' value={4} onClick={this.handleDigit}>4</button>
          <button className='key num' id='five' value={5} onClick={this.handleDigit}>5</button>
          <button className='key num' id='six' value={6} onClick={this.handleDigit}>6</button>
          <button className='key opp' id='add' onClick={this.handleOperator}>+</button>

          <button className='key num' id='one' value={1} onClick={this.handleDigit}>1</button>
          <button className='key num' id='two' value={2} onClick={this.handleDigit}>2</button>
          <button className='key num' id='three' value={3} onClick={this.handleDigit}>3</button>
          <button className='key equ' id='equals' onClick={this.handleEquals}>=</button>
          
          <button className='key num' id='sign' onClick={this.handleSign}>&#177;</button>
          <button className='key num' id='zero' value={0} onClick={this.handleDigit}>0</button>
          <button className='key num' id='decimal' onClick={this.handleDecimal}>.</button>
        </div>

        <div className="console-control"
              style={{
                borderRadius: this.state.debugToggle ? '15px 15px 0 0' : '15px'
              }}>
          <p className="console-label">Debug console</p>
          <Toggle id="debug-toggle" checked={this.state.debugToggle} onToggle={this.handleToggle} />
        </div>

        <div className='console' 
            style={{
              visibility: this.state.debugToggle ? 'visible' : 'hidden'
            }}>

          <p>formula : {this.state.formula}</p>
          <p>display : {this.state.display}</p>
          <p>operation : {this.state.operation}</p>
          
        </div>
      </div>
    );
  }
}



export default App;
