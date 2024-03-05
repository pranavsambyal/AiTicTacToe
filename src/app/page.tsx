"use client"
import Image from "next/image";
import Head from 'next/head';
import TicTacToe from './components/TicTacToe';
import React, { useState } from 'react';
import ToggleSwitch from "./components/ToggleSwitch";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <title>Tic Tac Toe</title>
        <meta name="description" content="Tic Tac Toe game using Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center p-24" >
        <h1 className="p-5 font-bold text-2xl" >
          Tic Tac Toe
        </h1>
        <TicTacToe/>
      </main>
    </main>
  );
}
