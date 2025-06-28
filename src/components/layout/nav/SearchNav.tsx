"use client"
import type React from "react"
import { useState } from "react"
import { Search } from "lucide-react"

interface SearchNavProps {
  place?: string
  onSubmit?: (e: React.FormEvent) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function SearchNav({ place = "", onSubmit = () => {}, onChange = () => {} }: SearchNavProps) {
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
    <div className="header-search ">
      <form onSubmit={handleSubmit} className="flex items-center ">

        {!isExpanded && (
          <button
            type="button"
            onClick={handleExpand}
            className="flex items-center justify-center !w-10 h-10 rounded-full  transition-all duration-200 group border border-white hover:border-gray-200"
          >
            <Search className="w-5 h-5 text-white group-hover:text-gray-200" />
          </button>
        )}

        {isExpanded && (
          <div className="flex items-center bg-white rounded-4xl  border border-gray-200 overflow-hidden animate-in slide-in-from-right-5 duration-300">
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              className="flex-1 py-2 px-4 text-sm text-gray-700 placeholder-gray-400 bg-transparent border-none outline-none sm:min-w-[80px] w-[150px]"
              autoFocus
            />

            <div className="flex items-center pr-2">
              <button
                type="submit"
                className="ml-2 px-0 "
              >
                <Search className="w-5 h-5 text-gray-600 hover:text-gray-900" />
              </button>

              
            </div>
          </div>
        )}
      </form>

      {isExpanded && <div className="fixed inset-0 z-[-1]" onClick={handleCollapse} />}
    </div>
  )
}
