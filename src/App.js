import React from 'react';
//import logo from './logo.svg';
import './App.css';
//import { thisExpression } from '@babel/types';
import soundClip from './yisell_sound_2008030716560441118_88011.mp3'


//LAYOUT
const APP_LAYOUT = "well col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2 row App";
const PAD_LAYOUT = "row well col-xs-10 col-xs-offset-1 col-md-5 col-md-offset-1 col-lg-5 col-lg-offset-1";
const CONTROL_LAYOUT = "well row col-xs-10 col-xs-offset-1 col-md-4 col-md-offset-1 col-md-offset-1 col-lg-4 col-lg-offset-1";
const SINGLEBTN_LAYOUT = "col-xs-4 col-md-4";
const POWER_LAYOUT = "row col-xs-10 col-xs-offset-1 col-md-4 col-md-offset-4";
const POWER_LOGO = "col-xs-12 col-md-12";
const POWER_BTN = "col-xs-12 col-md-12";
const VOLUME_LAYOUT = "col-xs-12 col-md-12";
const DISPLAY_LAYOUT = "col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2";

//准备好电子鼓的按钮，确定对应的键盘按键、声音文件、标识符和描述
const PAD =[
  {padKey: 81, padSrc: soundClip, padText: "Q", padDescribe: "QClip"}, 
  {padKey: 87, padSrc: soundClip, padText: "W", padDescribe: "WClip"}, 
  {padKey: 69, padSrc: soundClip, padText: "E", padDescribe: "EClip"}, 
  {padKey: 65, padSrc: soundClip, padText: "A", padDescribe: "AClip"}, 
  {padKey: 83, padSrc: soundClip, padText: "S", padDescribe: "SClip"}, 
  {padKey: 68, padSrc: soundClip, padText: "D", padDescribe: "DClip"}, 
  {padKey: 90, padSrc: soundClip, padText: "Z", padDescribe: "ZClip"}, 
  {padKey: 88, padSrc: soundClip, padText: "X", padDescribe: "XClip"}, 
  {padKey: 67, padSrc: soundClip, padText: "C", padDescribe: "CClip"}
];

//单个案件的组件模板
class SingleBtn extends React.Component {
  constructor(props){
    super(props);
    this.drumPadHandle = this.drumPadHandle.bind(this);
    this.pressKey = this.pressKey.bind(this);
  }
  
  drumPadHandle() {
    //先检查电源开关
    if (this.props.powerState === "on") {
      //电源打开的情况下，触发该函数时，引用并播放对应的音频
      const sound = document.getElementById(this.props.padText);
      //设置播放的音量大小
      sound.volume = this.props.volume;
      sound.currentTime = 0;
      sound.play();
      //console.log(sound);
      //console.log(event.target.parentNode.firstChild);
      //调用自定义函数在显示屏上显示按下的按钮
      this.props.setDisplay(this.props.padText);
    }
  }
  //使用键盘时触发函数
  pressKey(event) {
    if (this.props.powerState === "on") {
      if (event.key === this.props.padText) {
        this.drumPadHandle();
      }
    }
  }
  //监听键盘按下事件
  componentDidMount() {
    document.addEventListener("keydown", this.pressKey);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.pressKey);
  }

  render() {
    return (
      <div id={this.props.padDescribe} className={SINGLEBTN_LAYOUT} onClick={this.drumPadHandle}>
        <audio id={this.props.padText} className="clip" src={this.props.padSrc} >
        </audio>
        <button className="play btn btn-default">{this.props.padText}</button>
      </div>
    );
  }
}

//由单个按键组合成的键盘组件
class DrumPad extends React.Component {
/*   constructor(props){
    super(props);
  } */

  render() {
    return (
      <div id="pad-panel" className={PAD_LAYOUT}>
        <p>Drum Pad</p>
        <SingleBtn powerState={this.props.powerState} volume={this.props.volume} setDisplay={this.props.setDisplay} padSrc={this.props.pad[0].padSrc} padText={this.props.pad[0].padText} padDescribe={this.props.pad[0].padDescribe} />
        <SingleBtn powerState={this.props.powerState} volume={this.props.volume} setDisplay={this.props.setDisplay} padSrc={this.props.pad[1].padSrc} padText={this.props.pad[1].padText} padDescribe={this.props.pad[1].padDescribe} />
        <SingleBtn powerState={this.props.powerState} volume={this.props.volume} setDisplay={this.props.setDisplay} padSrc={this.props.pad[2].padSrc} padText={this.props.pad[2].padText} padDescribe={this.props.pad[2].padDescribe} />
        <SingleBtn powerState={this.props.powerState} volume={this.props.volume} setDisplay={this.props.setDisplay} padSrc={this.props.pad[3].padSrc} padText={this.props.pad[3].padText} padDescribe={this.props.pad[3].padDescribe} />
        <SingleBtn powerState={this.props.powerState} volume={this.props.volume} setDisplay={this.props.setDisplay} padSrc={this.props.pad[4].padSrc} padText={this.props.pad[4].padText} padDescribe={this.props.pad[4].padDescribe} />
        <SingleBtn powerState={this.props.powerState} volume={this.props.volume} setDisplay={this.props.setDisplay} padSrc={this.props.pad[5].padSrc} padText={this.props.pad[5].padText} padDescribe={this.props.pad[5].padDescribe} />
        <SingleBtn powerState={this.props.powerState} volume={this.props.volume} setDisplay={this.props.setDisplay} padSrc={this.props.pad[6].padSrc} padText={this.props.pad[6].padText} padDescribe={this.props.pad[6].padDescribe} />
        <SingleBtn powerState={this.props.powerState} volume={this.props.volume} setDisplay={this.props.setDisplay} padSrc={this.props.pad[7].padSrc} padText={this.props.pad[7].padText} padDescribe={this.props.pad[7].padDescribe} />
        <SingleBtn powerState={this.props.powerState} volume={this.props.volume} setDisplay={this.props.setDisplay} padSrc={this.props.pad[8].padSrc} padText={this.props.pad[8].padText} padDescribe={this.props.pad[8].padDescribe} />
      </div>
    );
  }
}
//电源开关
class PowerBtn extends React.Component {
  render() {
    return (
      <div className={POWER_LAYOUT}>
        <p className={POWER_LOGO}>power</p>
        <div id="powerBtn-wrapper" className={POWER_BTN}>
          <div id="power-button" onClick={this.props.btn}></div>
        </div>
      </div>
    );
  }
}
//音量开关
class VolumeControl extends React.Component {
/*   constructor(props){
    super(props);
  } */

  render() {
    return (
      <div id="volume-bar" className={VOLUME_LAYOUT} onClick={this.props.handleChange}>
        <div id="volume-control"></div>
      </div>
    );
  }
}
//显示屏
class Display extends React.Component {
/*   constructor(props) {
    super(props);
  } */

  render() {
    return (
      <div className={DISPLAY_LAYOUT}>
        <p id="display">{this.props.text}</p>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      powerState: "on",
      volumeSet: 0,
      show: "",
      pad: PAD
    };
    this.volumeChange = this.volumeChange.bind(this);
    this.powerControl = this.powerControl.bind(this);
    this.setDisplay =this.setDisplay.bind(this);
  } 
  //处理电源开关
  powerControl(event) {
    var amountProp = event.target.parentNode.getBoundingClientRect();
    var length = amountProp.right - amountProp.left;
    if (this.state.powerState === "on"){
      this.setState({
        powerState: "off",
        show: ""
      });
      event.target.style.left = 0.5 * length + "px";
    }else {
      this.setState({
        powerState: "on"
      });
      event.target.style.left = 0;
    }
  }
  //处理音量调整
  volumeChange(event) {
    if (this.state.powerState === "on") {
      //获取对应元素的上下左右边的XY值
      var amountVolume = event.target.getBoundingClientRect();
      //计算音量条上鼠标点击的位置坐标所占长度的百分比
      var volume = (event.clientX - amountVolume.left) / (amountVolume.right - amountVolume.left);
      //使浮标的位置设置为用户点击的位置
      event.target.firstChild.style.left = event.clientX - amountVolume.left + "px";
      this.setState({
        volumeSet: volume
      });
    }
  }

  setDisplay(text) {
    this.setState({
      show: text
    });
  }

  render() {
    return (
      <div className="row">
        <div id="drum-machine" className={APP_LAYOUT}>
          <h1>Drum Machine</h1>
          <div id="drum-control-wrapper" className="row">
            <DrumPad setDisplay={this.setDisplay} pad={this.state.pad} powerState={this.state.powerState} volume={this.state.volumeSet} />
            <div id="control-panel" className={CONTROL_LAYOUT}>
              <PowerBtn btn={this.powerControl}/>
              <VolumeControl handleChange={this.volumeChange} />
              <Display text={this.state.show}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
