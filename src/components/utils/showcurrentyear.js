import React from "react"

export default function ShowCurrentYear() {
    return (
      <div>
          {new Date().getFullYear()}
      </div>
    )
}