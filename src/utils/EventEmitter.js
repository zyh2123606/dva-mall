/**
 * 时间发布和订阅
 * 
 * @class EventEmitter
 */
class EventEmitter{
    constructor(){
        this._events = new Map()
        this._maxListeners = 10
    }
    /**
     * 发布事件
     * 
     * @param {any} type 事件类型
     * @param {any} args 参数
     * @memberof EventEmitter
     */
    emit(type, ...args){
        const handler = this._events.get(type)
        if(Array.isArray(handler)){
            for(let i in handler){
                if(args.length){
                    handler[i].apply(this, args)
                }else{
                    handler[i].call(this)
                }
            }
        }else{
            if(args){
                handler && handler.apply(this, args)
            }else{
                handler && handler.call(this)
            }
        }
    }
    /**
     * 订阅事件
     * 
     * @param {any} type 类型
     * @param {any} fn 订阅的事件函数
     * @memberof EventEmitter
     */
    listenerEmit(type, fn){
        const handler = this._events.get(type)
        if(handler)
            this.removeListeners(type, fn)
        if(!handler){
            this._events.set(type, fn)
        }else if(handler && typeof handler === 'function'){
            this._events.set(type, [handler, fn])
        }else{
            handler.push(fn)
        }
    }
    /**
     * 移除事件订阅
     * 
     * @param {any} type 事件类型
     * @param {any} fn 事件
     * @memberof EventEmitter
     */
    removeListeners(type, fn){
        const handler = this._events.get(type)
        if(handler && typeof handler === 'function'){
            this._events.delete(type, fn)
        }else{
            let idx = -1
            for(let i in handler){
                if(fn === handler[i]) idx = i
            }
            if(idx != -1) this._events.splice(idx, 1)
            if(handler.length == 1) this._events.set(type, handler[0])
        }
    }
}

export default new EventEmitter()