import React, { Component } from 'react'
const CustomIcon = ({ type, className = '', size = 'md', ...restProps }) => {
  return(
     <svg
       className={`am-icon am-icon-${size} ${className}`}
       {...restProps}
     >
       <use xlinkHref={`#${type.id}`} />
     </svg>
  )
}

export default CustomIcon