import React, { useState } from 'react';

function About() {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState('');

	const addTask = () => {
		if(newTask.trim()==="") return;
		setTasks([...tasks, { name: newTask, completedPomodoros: 0, requiredPomodoros: 4 }]);
		setNewTask('');
	};

	const completePomodoro = (taskIndex) => {
		const updatedTasks = [...tasks];
		updatedTasks[taskIndex].completedPomodoros += 1;
		setTasks(updatedTasks);
	};

	const deleteTask = (taskIndex) => {
		const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
		setTasks(updatedTasks);
	};

	return (
		<div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
			<h1 className="text-2xl font-bold text-gray-800 text-center">Task Tracker</h1>
			<div className="flex space-x-2 mb-4">
				<input
					type="text"
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
					placeholder="New Task"
					className="flex-grow border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
				<button
					onClick={addTask}
					className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
				>
					Add Task
				</button>
			</div>

			<ul className="space-y-2">
				{tasks.map((task, index) => (
					<li
						key={index}
						className="flex justify-between items-center p-3 bg-gray-100 rounded-md shadow-sm"
					>
						<div className="text-gray-700">
							<strong>{task.name}</strong> - {task.completedPomodoros}/{task.requiredPomodoros} Pomodoros
						</div>
						<div className="flex space-x-2">
							<button
								onClick={() => completePomodoro(index)}
								className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400"
							>
								+1 Pomodoro
							</button>
							<button
								onClick={() => deleteTask(index)}
								className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-400"
							>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default React.memo(About);
