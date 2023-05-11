'use client'

import React from "react"
import { IconType } from "react-icons"


interface AuthSocialButtonProps {
  icon: IconType
  onClick: () => void
}

const styleClass = 'inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-gray-500 shadow-sm' +
  'ring-1 ring-inset ring-gray-300 hover:ring-gray-50 focus:outline-offset-0'

export const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
  icon: Icon,
  onClick
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={styleClass}
    >
      <Icon />
    </button>
  )
}
