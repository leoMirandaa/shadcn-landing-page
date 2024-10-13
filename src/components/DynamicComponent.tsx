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


  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <LiveProvider code={liveCode} scope={scope}>
        {scope.styles}
        <LivePreview />
        <LiveError />
      </LiveProvider>
    </div>
  );
};

export default DynamicComponent;