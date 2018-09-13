/**
 * 组件按需加载
 */
import Loadable from 'react-loadable'
export default component => Loadable({loader: () => component, loading: () => (<div></div>)})
