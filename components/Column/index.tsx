import React, { ReactNode } from 'react'

type Props = {
  className?: string
  children: ReactNode
}

const Column: React.FC<Props> = (props) => {
  return (
    <div className={`flex flex-col ${props.className ?? ''}`}>
      {props.children}
    </div>
  )
}

export default Column
