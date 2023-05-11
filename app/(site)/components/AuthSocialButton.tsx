'use client'

import React from "react"
import { IconType } from "react-icons"


interface AuthSocialButtonProps {
  icon: IconType
  onClick: () => void
  text?: string
}

export const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick,
  text
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
    flex
    items-center
    gap-2
    w-full
    justify-center
    rounded-md
    bg-white
    px-4
    py-2
    text-gray-500
    shadow-sm
    ring-1
    ring-inset
    ring-gray-300
    hover:ring-gray-50
    focus:outline-offset-0
    "
    >
      <Icon />
      {text}
    </button>
  )
}
