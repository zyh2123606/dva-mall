/**
 * 自定义icon
 * @param {CustomIcon} param 
 */
const CustomIcon = ({ type, className = '', size = 'md', ...restProps }) => {
  console.log(type)
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