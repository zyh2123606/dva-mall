/**
 * 自定义icon
 * @param {CustomIcon} param0 
 */
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