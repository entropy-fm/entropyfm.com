import React from "react"

const Content = ({ children, onMeasure }) => {
  const refCallback = element => {
    if (element) {
      onMeasure(element.getBoundingClientRect())
    }
  }
  return <div ref={refCallback}>{children}</div>
}

export default Content
