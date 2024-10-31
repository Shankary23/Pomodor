import React, {useEffect, useState, useRef} from "react";
import  Navi from "../components/Navi"
import  Timer from "/components/Timer"
import  About from "/components/About"
import  Alarm from "/components/Alarm"
import  ModalSetting from "/components/ModalSetting"



export default function Home() {
	const [pomodoro, setPomodoro] = useState(25);
	const [longBreak, setlongBreak] = useState(10);
	const [shortBreak, setshortBreak] = useState(5);
	const [stage, setStage] = useState(0);
	const [seconds, setSecond] = useState(0);
	const [ticking, setTicking] = useState(false);
	const [consumedSecond, setConsumedSecond] = useState(0);
	const [isTimeUp,setIsTimeUp] = useState(false);

	const [openSetting, setOpenSetting] = useState(false);
	const alarmRef = useRef();

	const pomodoroRef = useRef();
	const shortBreakRef = useRef();
	const longBreakRef = useRef();

	const updateTimeDefaultValue = () =>{
		setPomodoro(pomodoroRef.current.value);
		setshortBreak(shortBreakRef.current.value);
		setlongBreak(longBreakRef.current.value);
		setOpenSetting(false);
		setSecond(0);
		setConsumedSecond(0);
	}

	const switchStage = (index)=>{
		const isYes = 
			consumedSecond && stage!= index ? 
			confirm("Are you sure you want to switch"):false;
		if(isYes){
			reset();
			setStage(index);
		}else if(!consumedSecond){
			setStage(index);
		}
	}
	const getTickingTime = () =>{
		const timeStage = {
			0:pomodoro,
			1:shortBreak,
			2:longBreak,
		};
		return timeStage[stage];
	};
	const updateMinute = () =>{
		const updateStage = {
			0:setPomodoro,
			1:setshortBreak,
			2:setlongBreak,
		};
		return updateStage[stage];
	};

	const reset = () =>{
		setConsumedSecond(0);
		setTicking(false);
		setSecond(0);
		updateTimeDefaultValue();
	};

	const timeUp = () =>{
		reset();
		setIsTimeUp(true)
		alarmRef.current.play();

	}
	const clockTicking = () =>{
		const minutes = getTickingTime();
		const setMinutes = updateMinute();

		if (minutes == 0 && seconds == 0){
			timeUp();
		}else if(seconds == 0){
			setMinutes((minute)=> minute-1);
			setSecond(59);
		}else{
			setSecond((second)=> second-1)
		}
	};
	const muteAlarm = () =>{
		alarmRef.current.pause();
		alarmRef.current.currentTime = 0;
	};

	const startTimer = () =>{
		setIsTimeUp(false);
		muteAlarm();
		setTicking((ticking) => !ticking);
	}
	useEffect(()=>{
		window.onbeforeunload = () =>{
			return consumedSecond ? "Show warnings":null
		};
		const timer = setInterval(()=>{
			if(ticking){
				setConsumedSecond(value => value+1)
				clockTicking();
			}
		}, 1000)
		return()=>{
			clearInterval(timer);
		};
	},[seconds,pomodoro,shortBreak,longBreak,ticking])
	return(
		<div className="bg-gray-900 min-h-screen font-inter">
			<div className="max-w-2xl min-h-screen  mx-auto">
				<Navi setOpenSetting={setOpenSetting}/>
				<Timer stage = {stage} switchStage = {switchStage} getTickingTime = {getTickingTime}
					seconds={seconds}
					ticking = {ticking}
					startTimer = {startTimer}
					muteAlarm={muteAlarm}
					isTimeUp = {isTimeUp}
					reset={reset}
				/>
				<About/>
				<Alarm ref = {alarmRef}/>
				<ModalSetting openSetting={openSetting} 
				setOpenSetting={setOpenSetting}
				pomodoroRef={pomodoroRef}
				shortBreakRef={shortBreakRef}
				longBreakRef = {longBreakRef}
				updateTimeDefaultValue = {updateTimeDefaultValue}
				/>
			</div>
		</div>
	
	);
}
 