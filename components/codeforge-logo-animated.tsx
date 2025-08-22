"use client"

import React from 'react'

interface CodeForgeLogoAnimatedProps {
  size?: number
  className?: string
}

export const CodeForgeLogoAnimated = ({ 
  size = 64, 
  className = "" 
}: CodeForgeLogoAnimatedProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradiente radial para o fundo */}
        <radialGradient id="logoGradientAnimated" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
          <stop offset="30%" stopColor="#8b5cf6" stopOpacity="0.7" />
          <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1e293b" stopOpacity="0.3" />
        </radialGradient>
        
        {/* Gradiente para a engrenagem */}
        <linearGradient id="gearGradientAnimated" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#e0e7ff" />
          <stop offset="50%" stopColor="#c7d2fe" />
          <stop offset="75%" stopColor="#e0e7ff" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        
        {/* Gradiente para o texto */}
        <linearGradient id="textGradientAnimated" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="25%" stopColor="#6366f1" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="75%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        
        {/* Filtro de brilho avançado */}
        <filter id="glowAnimated">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        {/* Filtro de sombra */}
        <filter id="shadow">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.3"/>
        </filter>
      </defs>
      
      {/* Fundo circular com gradiente */}
      <circle
        cx="100"
        cy="100"
        r="90"
        fill="url(#logoGradientAnimated)"
        stroke="url(#textGradientAnimated)"
        strokeWidth="3"
        filter="url(#glowAnimated)"
        className="animate-pulse"
        style={{
          animation: 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}
      />
      
      {/* Engrenagem externa com rotação */}
      <g 
        transform="translate(100, 100)"
        className="animate-spin"
        style={{
          animation: 'spin 10s linear infinite'
        }}
      >
        <path
          d="M-30 -30 L-25 -30 L-22 -18 L-15 -18 L-12 -30 L-7 -30 L-7 -24 L-18 -21 L-18 -15 L-7 -12 L-7 -7 L-12 -7 L-15 -18 L-22 -18 L-25 -7 L-30 -7 L-30 -12 L-18 -15 L-18 -21 L-30 -24 Z"
          fill="url(#gearGradientAnimated)"
          stroke="#ffffff"
          strokeWidth="1.5"
          filter="url(#shadow)"
        />
      </g>
      
      {/* Engrenagem interna com rotação reversa */}
      <g 
        transform="translate(100, 100)"
        className="animate-spin"
        style={{
          animation: 'spin 8s linear infinite reverse'
        }}
      >
        <path
          d="M-18 -18 L-15 -18 L-12 -12 L-10 -18 L-7 -18 L-7 -15 L-12 -12 L-12 -9 L-7 -7 L-7 -4 L-10 -4 L-12 -9 L-15 -4 L-18 -4 L-18 -7 L-12 -9 L-12 -12 L-18 -15 Z"
          fill="url(#gearGradientAnimated)"
          stroke="#ffffff"
          strokeWidth="1"
          filter="url(#shadow)"
        />
      </g>
      
      {/* Símbolo < /> no centro */}
      <text
        x="100"
        y="105"
        textAnchor="middle"
        fill="url(#textGradientAnimated)"
        fontSize="14"
        fontWeight="bold"
        fontFamily="monospace"
        filter="url(#glowAnimated)"
        className="animate-pulse"
        style={{
          animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}
      >
        &lt; /&gt;
      </text>
      
      {/* Texto "CodeForge" */}
      <text
        x="100"
        y="165"
        textAnchor="middle"
        fill="url(#textGradientAnimated)"
        fontSize="16"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
        filter="url(#glowAnimated)"
        className="animate-pulse"
        style={{
          animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite'
        }}
      >
        CodeForge
      </text>
      
      {/* Efeito de partículas */}
      <circle
        cx="50"
        cy="50"
        r="2"
        fill="#ffffff"
        opacity="0.6"
        className="animate-ping"
        style={{
          animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite'
        }}
      />
      <circle
        cx="150"
        cy="50"
        r="1.5"
        fill="#06b6d4"
        opacity="0.7"
        className="animate-ping"
        style={{
          animation: 'ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite'
        }}
      />
      <circle
        cx="50"
        cy="150"
        r="1"
        fill="#8b5cf6"
        opacity="0.8"
        className="animate-ping"
        style={{
          animation: 'ping 3.5s cubic-bezier(0, 0, 0.2, 1) infinite'
        }}
      />
    </svg>
  )
}

export default CodeForgeLogoAnimated


