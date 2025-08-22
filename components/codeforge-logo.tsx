"use client"

import React from 'react'

interface CodeForgeLogoProps {
  size?: number
  className?: string
  animated?: boolean
}

export const CodeForgeLogo = ({ 
  size = 64, 
  className = "", 
  animated = true 
}: CodeForgeLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`${className} ${animated ? 'animate-pulse' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradiente para o fundo circular */}
        <radialGradient id="logoGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
        </radialGradient>
        
        {/* Gradiente para o ícone de engrenagem */}
        <linearGradient id="gearGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#e0e7ff" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        
        {/* Gradiente para o texto */}
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        
        {/* Filtro de brilho */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Fundo circular com gradiente */}
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="url(#logoGradient)"
        stroke="url(#textGradient)"
        strokeWidth="2"
        filter="url(#glow)"
      />
      
      {/* Ícone de engrenagem */}
      <g transform="translate(100, 100)">
        {/* Engrenagem externa */}
        <path
          d="M-25 -25 L-20 -25 L-18 -15 L-12 -15 L-10 -25 L-5 -25 L-5 -20 L-15 -18 L-15 -12 L-5 -10 L-5 -5 L-10 -5 L-12 -15 L-18 -15 L-20 -5 L-25 -5 L-25 -10 L-15 -12 L-15 -18 L-25 -20 Z"
          fill="url(#gearGradient)"
          stroke="#ffffff"
          strokeWidth="1"
        />
        
        {/* Engrenagem interna */}
        <path
          d="M-15 -15 L-12 -15 L-10 -10 L-8 -15 L-5 -15 L-5 -12 L-10 -10 L-10 -8 L-5 -6 L-5 -3 L-8 -3 L-10 -8 L-12 -3 L-15 -3 L-15 -6 L-10 -8 L-10 -10 L-15 -12 Z"
          fill="url(#gearGradient)"
          stroke="#ffffff"
          strokeWidth="0.5"
        />
        
        {/* Símbolo < /> no centro */}
        <text
          x="0"
          y="5"
          textAnchor="middle"
          fill="url(#textGradient)"
          fontSize="12"
          fontWeight="bold"
          fontFamily="monospace"
        >
          &lt; /&gt;
        </text>
      </g>
      
      {/* Texto "CodeForge" */}
      <text
        x="100"
        y="160"
        textAnchor="middle"
        fill="url(#textGradient)"
        fontSize="14"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
        filter="url(#glow)"
      >
        CodeForge
      </text>
    </svg>
  )
}

export default CodeForgeLogo


