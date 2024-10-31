import React from "react";

function About() {
	return (
		<div className=" w-11/12 mx-auto mt-36 text-white p-5 rounded-md">
			<div>
				<h1 className="text-xl sm:text-2xl font-medium mt-5">
					<span className="border-b-4 border-red-400">What</span> is Pomodoro
					Technique?
				</h1>
				<p className="mt-5 tracking-wide opacity-70 text-lg">
					The Pomodoro Technique is created by Francesco Cirillo for a more
					productive way to work and study. The technique uses a timer to break
					down work into intervals, traditionally 25 minutes in length,
					separated by short breaks. Each interval is known as a pomodoro, from
					the Italian word for 'tomato', after the tomato-shaped kitchen timer
					that Cirillo used as a university student.
				</p>
			</div>
			
		</div>
	);
}

export default React.memo(About);