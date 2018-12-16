import React from 'react'

export default function Header(props) {
  return (
    <h1 style={{ color: 'gray', marginLeft: "20px"}}>{props.title}</h1>
  )
}
