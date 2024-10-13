import React, { useState, useEffect, useRef, useCallback } from "react";
import { LiveProvider, LiveError, LivePreview } from "react-live-runner";
import * as shadcn from "@/components/ui/index";
import { db } from "@/firebase";
import { collection, doc, addDoc } from "firebase/firestore";

interface DynamicComponentProps {
  key: string;
}

const scope = {
  React,
  ReactDOM: React,
  shadcn,
  useState,
  useEffect,
  useRef,
  useCallback,
  styles: (
    <style>{`
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
        :root {
          --background: 0 0% 100%;
          --foreground: 240 10% 3.9%;
          --card: 0 0% 100%;
          --card-foreground: 240 10% 3.9%;
          --popover: 0 0% 100%;
          --popover-foreground: 240 10% 3.9%;
          --primary: 240 5.9% 10%;
          --primary-foreground: 0 0% 98%;
          --secondary: 240 4.8% 95.9%;
          --secondary-foreground: 240 5.9% 10%;
          --muted: 240 4.8% 95.9%;
          --muted-foreground: 240 3.8% 46.1%;
          --accent: 240 4.8% 95.9%;
          --accent-foreground: 240 5.9% 10%;
          --destructive: 0 84.2% 60.2%;
          --destructive-foreground: 0 0% 98%;
          --border: 240 5.9% 90%;
          --input: 240 5.9% 90%;
          --ring: 240 10% 3.9%;
          --radius: 0.5rem;
        }
        .dark {
          --background: 240 10% 3.9%;
          --foreground: 0 0% 98%;
          --card: 240 10% 3.9%;
          --card-foreground: 0 0% 98%;
          --popover: 240 10% 3.9%;
          --popover-foreground: 0 0% 98%;
          --primary: 0 0% 98%;
          --primary-foreground: 240 5.9% 10%;
          --secondary: 240 3.7% 15.9%;
          --secondary-foreground: 0 0% 98%;
          --muted: 240 3.7% 15.9%;
          --muted-foreground: 240 5% 64.9%;
          --accent: 240 3.7% 15.9%;
          --accent-foreground: 0 0% 98%;
          --destructive: 0 62.8% 30.6%;
          --destructive-foreground: 0 0% 98%;
          --border: 240 3.7% 15.9%;
          --input: 240 3.7% 15.9%;
          --ring: 240 4.9% 83.9%;
        }
      `}</style>
  ),
};

const DynamicComponent: React.FC<DynamicComponentProps> = ({ key }) => {
  console.log(key);

  const liveCode = key; // TODO: get live code from db using key

  const todoListCode = `
export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');
  const [taskId, setTaskId] = useState(0);

  const addTask = () => {
    if (taskText.trim()) {
      setTasks([...tasks, { id: taskId, text: taskText, status: 'Pending' }]);
      setTaskText('');
      setTaskId(prevId => prevId + 1);
    }
  };

  const updateTaskStatus = (id, status) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, status } : task)));
  };

  return (
    <div className="p-4 rounded-lg" style={{ background: 'linear-gradient(to right, #add8e6, #ffcccb)' }}>
      <div className="mb-4">
        <shadcn.Input
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a new task"
          className="mr-2 text-gray-800"
        />
        <shadcn.Button onClick={addTask} className="text-gray-800">Add Task</shadcn.Button>
      </div>
      <ul className="space-y-2">
        {tasks.map(task => (
          <li key={task.id} className="flex items-center justify-between p-2 bg-white rounded shadow text-gray-800">
            <span className="flex-1">{task.text}</span>
            <shadcn.Select
              value={task.status}
              onValueChange={(value) => updateTaskStatus(task.id, value)}
            >
              <shadcn.SelectTrigger className="w-32">
                <shadcn.SelectValue />
              </shadcn.SelectTrigger>
              <shadcn.SelectContent>
                <shadcn.SelectGroup>
                  <shadcn.SelectItem value="Pending">Pending</shadcn.SelectItem>
                  <shadcn.SelectItem value="Working On">Working On</shadcn.SelectItem>
                  <shadcn.SelectItem value="Complete">Complete</shadcn.SelectItem>
                </shadcn.SelectGroup>
              </shadcn.SelectContent>
            </shadcn.Select>
          </li>
        ))}
      </ul>
    </div>
  );
}
`;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <LiveProvider code={todoListCode} scope={scope}>
        {scope.styles}
        <LivePreview />
        <LiveError />
      </LiveProvider>
    </div>
  );
};

export default DynamicComponent;
