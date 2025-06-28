"use client"

import type React from "react"

import { useState } from "react"
import { Search, X } from "lucide-react"

interface SearchHeaderProps {
  place?: string
  onSubmit?: (e: React.FormEvent) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SearchHeader({ place = "", onSubmit = () => {}, onChange = () => {} }: SearchHeaderProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputValue, setInputValue] = useState(place)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(e)
    setIsExpanded(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
    onChange(e)
  }

  const handleExpand = () => {
    setIsExpanded(true)
  }

  const handleCollapse = () => {
    setIsExpanded(false)
    setInputValue("")
  }

  return (
    <div className="header-search relative">
      <form onSubmit={handleSubmit} className="flex items-center">
        {/* Estado colapsado - Solo ícono */}
        {!isExpanded && (
          <button
            type="button"
            onClick={handleExpand}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 group"
          >
            <Search className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
          </button>
        )}

        {/* Estado expandido - Input completo */}
        {isExpanded && (
          <div className="flex items-center bg-white rounded-full shadow-lg border border-gray-200 overflow-hidden animate-in slide-in-from-right-5 duration-300">
            <div className="flex items-center pl-4 pr-2">
              <Search className="w-5 h-5 text-gray-400" />
            </div>

            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Where do you want to travel?"
              className="flex-1 py-3 px-2 text-sm text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none min-w-[280px]"
              autoFocus
            />

            <div className="flex items-center pr-2">
              {inputValue && (
                <button
                  type="button"
                  onClick={() => setInputValue("")}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}

              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full transition-colors duration-200"
              >
                Search
              </button>

              <button
                type="button"
                onClick={handleCollapse}
                className="ml-2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </form>
      {/* Overlay para cerrar al hacer clic fuera */}
      {isExpanded && <div className="fixed inset-0 z-[-1]" onClick={handleCollapse} />}
    </div>
  )
}
