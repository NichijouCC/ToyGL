
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.head.appendChild(r) })(window.document);
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

    class EventHandler {
        constructor() {
            this.listener = [];
        }
        addEventListener(func) {
            this.listener.push(func);
        }
        removeEventListener(func) {
            let index = this.listener.indexOf(func);
            if (index >= 0) {
                this.listener.splice(index);
            }
        }
        removeAll() { this.listener = []; }
        raiseEvent(event) {
            this.listener.forEach(fuc => {
                fuc(event);
            });
        }
        destroy() {
            this.listener = undefined;
        }
    }
    //# sourceMappingURL=Event.js.map

    /**
     *
     * (0,0)-----|
     * |         |
     * |         |
     * |------(w,h)
     *
     */
    class Screen {
        constructor(canvas) {
            this.onresize = new EventHandler();
            this.canvas = canvas;
            canvas.onresize = () => { console.warn("canvas resize!"); };
            this.onresize.raiseEvent();
        }
        /**
         * 屏幕(canvas)高度
         */
        get width() {
            return this.canvas.width;
        }
        /**
         * 屏幕(canvas)宽度
         */
        get height() {
            return this.canvas.height;
        }
        /**
         * width/height
         */
        get aspect() {
            return this.width / this.height;
        }
    }
    //# sourceMappingURL=Screen.js.map

    class EventHandler$1 {
        constructor() {
            this._listener = {};
        }
        on(type, callback) {
            if (type instanceof Array)
                type = type.join();
            if (this._listener[type] == null)
                this._listener[type] = [];
            this._listener[type].push(callback);
        }
        fire(type, params) {
            var _a;
            if (type instanceof Array)
                type = type.join();
            (_a = this._listener[type]) === null || _a === void 0 ? void 0 : _a.forEach(func => func(params));
        }
        off(type, callback) {
            if (type instanceof Array)
                type = type.join();
            if (this._listener[type]) {
                let index = this._listener[type].indexOf(callback);
                if (index >= 0) {
                    this._listener[type].splice(index, 1);
                }
            }
        }
    }
    //# sourceMappingURL=Eventhandler.js.map

    const EPSILON = 0.000001;
    function clamp(v, min = 0, max = 1) {
        if (v <= min)
            return min;
        else if (v >= max)
            return max;
        else
            return v;
    }
    function isPowerOf2(value) {
        return (value & (value - 1)) === 0;
    }
    //# sourceMappingURL=common.js.map

    class Vec2 extends Float32Array {
        constructor(x = 0, y = 0) {
            super(2);
            this[0] = x;
            this[1] = y;
        }
        get x() {
            return this[0];
        }
        set x(value) {
            this[0] = value;
        }
        get y() {
            return this[1];
        }
        set y(value) {
            this[1] = value;
        }
        static create(x = 0, y = 0) {
            if (Vec2.Recycle && Vec2.Recycle.length > 0) {
                let item = Vec2.Recycle.pop();
                item[0] = x;
                item[1] = y;
                return item;
            }
            else {
                let item = new Vec2(x, y);
                // item[0]=x;
                // item[1]=y;
                return item;
            }
        }
        static clone(from) {
            if (Vec2.Recycle.length > 0) {
                let item = Vec2.Recycle.pop();
                Vec2.copy(from, item);
                return item;
            }
            else {
                let item = new Vec2(from[0], from[1]);
                // item[0]=from[0];
                // item[1]=from[1];
                return item;
            }
        }
        static recycle(item) {
            Vec2.Recycle.push(item);
        }
        static disposeRecycledItems() {
            Vec2.Recycle.length = 0;
        }
        /**
         * Copy the values from one vec2 to another
         *
         * @param out the receiving vector
         * @param a the source vector
         * @returns out
         */
        static copy(a, out = Vec2.create()) {
            out[0] = a[0];
            out[1] = a[1];
            return out;
        }
        /**
         * Adds two vec2's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static add(a, b, out = Vec2.create()) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            return out;
        }
        /**
         * Subtracts vector b from vector a
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static subtract(a, b, out = Vec2.create()) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            return out;
        }
        /**
         * Multiplies two vec2's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static multiply(a, b, out = Vec2.create()) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            return out;
        }
        /**
         * Multiplies two vec2's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        //public static mul(a: vec2, b: vec2,out: Vec2 = Vec2.create()): vec2 { return; }
        /**
         * Divides two vec2's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static divide(a, b, out = Vec2.create()) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            return out;
        }
        /**
         * Divides two vec2's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        //public static div(a: vec2, b: vec2,out: Vec2 = Vec2.create()): vec2 { return; }
        /**
         * Math.ceil the components of a vec2
         *
         * @param {Vec2} out the receiving vector
         * @param {Vec2} a vector to ceil
         * @returns {Vec2} out
         */
        static ceil(a, out = Vec2.create()) {
            out[0] = Math.ceil(a[0]);
            out[1] = Math.ceil(a[1]);
            return out;
        }
        /**
         * Math.floor the components of a vec2
         *
         * @param {Vec2} out the receiving vector
         * @param {Vec2} a vector to floor
         * @returns {Vec2} out
         */
        static floor(a, out = Vec2.create()) {
            out[0] = Math.floor(a[0]);
            out[1] = Math.floor(a[1]);
            return out;
        }
        /**
         * Returns the minimum of two vec2's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static min(a, b, out = Vec2.create()) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            return out;
        }
        /**
         * Returns the maximum of two vec2's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static max(a, b, out = Vec2.create()) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            return out;
        }
        /**
         * Math.round the components of a vec2
         *
         * @param {Vec2} out the receiving vector
         * @param {Vec2} a vector to round
         * @returns {Vec2} out
         */
        static round(a, out = Vec2.create()) {
            out[0] = Math.round(a[0]);
            out[1] = Math.round(a[1]);
            return out;
        }
        /**
         * Scales a vec2 by a scalar number
         *
         * @param out the receiving vector
         * @param a the vector to scale
         * @param b amount to scale the vector by
         * @returns out
         */
        static scale(a, b, out = Vec2.create()) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            return out;
        }
        static scaleByVec2(a, b, out = Vec2.create()) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            return out;
        }
        /**
         * Adds two vec2's after scaling the second operand by a scalar value
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @param scale the amount to scale b by before adding
         * @returns out
         */
        static scaleAndAdd(a, b, scale, out = Vec2.create()) {
            out[0] = a[0] + b[0] * scale;
            out[1] = a[1] + b[1] * scale;
            return out;
        }
        /**
         * Calculates the euclidian distance between two vec2's
         *
         * @param a the first operand
         * @param b the second operand
         * @returns distance between a and b
         */
        static distance(a, b) {
            let x = b[0] - a[0], y = b[1] - a[1];
            return Math.sqrt(x * x + y * y);
        }
        /**
         * Calculates the euclidian distance between two vec2's
         *
         * @param a the first operand
         * @param b the second operand
         * @returns distance between a and b
         */
        //public static dist(a: vec2, b: vec2): number { return; }
        /**
         * Calculates the squared euclidian distance between two vec2's
         *
         * @param a the first operand
         * @param b the second operand
         * @returns squared distance between a and b
         */
        static squaredDistance(a, b) {
            let x = b[0] - a[0], y = b[1] - a[1];
            return x * x + y * y;
        }
        /**
         * Calculates the squared euclidian distance between two vec2's
         *
         * @param a the first operand
         * @param b the second operand
         * @returns squared distance between a and b
         */
        //public static sqrDist(a: vec2, b: vec2): number { return; }
        /**
         * Calculates the length of a vec2
         *
         * @param a vector to calculate length of
         * @returns length of a
         */
        static length_(a) {
            let x = a[0], y = a[1];
            return Math.sqrt(x * x + y * y);
        }
        /**
         * Calculates the length of a vec2
         *
         * @param a vector to calculate length of
         * @returns length of a
         */
        //public static len(a: vec2): number { return; }
        /**
         * Calculates the squared length of a vec2
         *
         * @param a vector to calculate squared length of
         * @returns squared length of a
         */
        static squaredLength(a) {
            let x = a[0], y = a[1];
            return x * x + y * y;
        }
        /**
         * Calculates the squared length of a vec2
         *
         * @param a vector to calculate squared length of
         * @returns squared length of a
         */
        //public static sqrLen(a: vec2): number { return; }
        /**
         * Negates the components of a vec2
         *
         * @param out the receiving vector
         * @param a vector to negate
         * @returns out
         */
        static negate(a, out = Vec2.create()) {
            out[0] = -a[0];
            out[1] = -a[1];
            return out;
        }
        /**
         * Returns the inverse of the components of a vec2
         *
         * @param out the receiving vector
         * @param a vector to invert
         * @returns out
         */
        static inverse(a, out = Vec2.create()) {
            out[0] = 1.0 / a[0];
            out[1] = 1.0 / a[1];
            return out;
        }
        /**
         * Normalize a vec2
         *
         * @param out the receiving vector
         * @param a vector to normalize
         * @returns out
         */
        static normalize(a, out = Vec2.create()) {
            let x = a[0], y = a[1];
            let len = x * x + y * y;
            if (len > 0) {
                //TODO: evaluate use of glm_invsqrt here?
                len = 1 / Math.sqrt(len);
                out[0] = a[0] * len;
                out[1] = a[1] * len;
            }
            return out;
        }
        /**
         * Calculates the dot product of two vec2's
         *
         * @param a the first operand
         * @param b the second operand
         * @returns dot product of a and b
         */
        static dot(a, b) {
            return a[0] * b[0] + a[1] * b[1];
        }
        /**
         * Computes the cross product of two vec2's
         * Note that the cross product must by definition produce a 3D vector
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static cross(a, b, out) {
            let z = a[0] * b[1] - a[1] * b[0];
            out[0] = out[1] = 0;
            out[2] = z;
            return out;
        }
        /**
         * Performs a linear interpolation between two vec2's
         *
         * @param out the receiving vector
         * @param from the first operand
         * @param to the second operand
         * @param lerp interpolation amount between the two inputs
         * @returns out
         */
        static lerp(from, to, lerp$$1, out = Vec2.create()) {
            let ax = from[0], ay = from[1];
            out[0] = ax + lerp$$1 * (to[0] - ax);
            out[1] = ay + lerp$$1 * (to[1] - ay);
            return out;
        }
        /**
         * Generates a random vector with the given scale
         *
         * @param out the receiving vector
         * @param scale Length of the resulting vector. If ommitted, a unit vector will be returned
         * @returns out
         */
        static random(scale = 1, out = Vec2.create()) {
            scale = scale || 1.0;
            let r = Math.random() * 2.0 * Math.PI;
            out[0] = Math.cos(r) * scale;
            out[1] = Math.sin(r) * scale;
            return out;
        }
        // /**
        //  * Transforms the vec2 with a mat2
        //  *
        //  * @param out the receiving vector
        //  * @param a the vector to transform
        //  * @param m matrix to transform with
        //  * @returns out
        //  */
        // public static transformMat2(out: Vec2 = Vec2.create(), a: vec2, m: mat2): vec2 {
        //     let x = a[0],
        //     y = a[1];
        //     out[0] = m[0] * x + m[2] * y;
        //     out[1] = m[1] * x + m[3] * y;
        //     return out;
        // }
        /**
         * Transforms the vec2 with a Mat2d
         *
         * @param out the receiving vector
         * @param a the vector to transform
         * @param m matrix to transform with
         * @returns out
         */
        static transformMat2d(a, m, out = Vec2.create()) {
            let x = a[0], y = a[1];
            out[0] = m[0] * x + m[2] * y + m[4];
            out[1] = m[1] * x + m[3] * y + m[5];
            return out;
        }
        // /**
        //  * Transforms the vec2 with a mat3
        //  * 3rd vector component is implicitly '1'
        //  *
        //  * @param out the receiving vector
        //  * @param a the vector to transform
        //  * @param m matrix to transform with
        //  * @returns out
        //  */
        // public static transformMat3(out: Vec2 = Vec2.create(), a: vec2, m: mat3): vec2 {
        //     let x = a[0],
        //     y = a[1];
        //     out[0] = m[0] * x + m[3] * y + m[6];
        //     out[1] = m[1] * x + m[4] * y + m[7];
        //     return out;
        // }
        /**
         * Transforms the vec2 with a Mat4
         * 3rd vector component is implicitly '0'
         * 4th vector component is implicitly '1'
         *
         * @param out the receiving vector
         * @param a the vector to transform
         * @param m matrix to transform with
         * @returns out
         */
        static transformMat4(a, m, out = Vec2.create()) {
            let x = a[0];
            let y = a[1];
            out[0] = m[0] * x + m[4] * y + m[12];
            out[1] = m[1] * x + m[5] * y + m[13];
            return out;
        }
        // /**
        //  * Perform some operation over an array of vec2s.
        //  *
        //  * @param a the array of vectors to iterate over
        //  * @param stride Number of elements between the start of each vec2. If 0 assumes tightly packed
        //  * @param offset Number of elements to skip at the beginning of the array
        //  * @param count Number of vec2s to iterate over. If 0 iterates over entire array
        //  * @param fn Function to call for each vector in the array
        //  * @param arg additional argument to pass to fn
        //  * @returns a
        //  */
        // public static forEach(a: Float32Array, stride: number, offset: number, count: number,
        //     fn: (a: vec2, b: vec2, arg: any) => void, arg: any): Float32Array { return; }
        // /**
        //  * Perform some operation over an array of vec2s.
        //  *
        //  * @param a the array of vectors to iterate over
        //  * @param stride Number of elements between the start of each vec2. If 0 assumes tightly packed
        //  * @param offset Number of elements to skip at the beginning of the array
        //  * @param count Number of vec2s to iterate over. If 0 iterates over entire array
        //  * @param fn Function to call for each vector in the array
        //  * @returns a
        //  */
        // public static forEach(a: Float32Array, stride: number, offset: number, count: number,
        //     fn: (a: vec2, b: vec2) => void): Float32Array {
        // }
        /**
         * Returns a string representation of a vector
         *
         * @param a vector to represent as a string
         * @returns string representation of the vector
         */
        static str(a) {
            return "vec2(" + a[0] + ", " + a[1] + ")";
        }
        /**
         * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
         *
         * @param {Vec2} a The first vector.
         * @param {Vec2} b The second vector.
         * @returns {boolean} True if the vectors are equal, false otherwise.
         */
        static exactEquals(a, b) {
            return a[0] === b[0] && a[1] === b[1];
        }
        /**
         * Returns whether or not the vectors have approximately the same elements in the same position.
         *
         * @param {Vec2} a The first vector.
         * @param {Vec2} b The second vector.
         * @returns {boolean} True if the vectors are equal, false otherwise.
         */
        static equals(a, b) {
            let a0 = a[0], a1 = a[1];
            let b0 = b[0], b1 = b[1];
            return Math.abs(a0 - b0) <= EPSILON && Math.abs(a1 - b1) <= EPSILON;
        }
    }
    Vec2.Recycle = [];
    //# sourceMappingURL=vec2.js.map

    var MouseKeyEnum;
    (function (MouseKeyEnum) {
        MouseKeyEnum["Left"] = "MouseLeft";
        MouseKeyEnum["Middle"] = "MouseMiddle";
        MouseKeyEnum["Right"] = "MouseRight";
        MouseKeyEnum["None"] = "MouseNone";
    })(MouseKeyEnum || (MouseKeyEnum = {}));
    var MouseEventEnum;
    (function (MouseEventEnum) {
        MouseEventEnum["Up"] = "mouseUp";
        MouseEventEnum["Down"] = "mouseDown";
        MouseEventEnum["Move"] = "mouseMove";
        MouseEventEnum["Rotate"] = "mouseRotate";
    })(MouseEventEnum || (MouseEventEnum = {}));
    class ClickEvent {
    }
    var Private;
    (function (Private) {
        Private.keyDic = {
            0: MouseKeyEnum.Left,
            1: MouseKeyEnum.Middle,
            2: MouseKeyEnum.Right
        };
    })(Private || (Private = {}));
    class Mouse extends EventHandler$1 {
        constructor(canvas) {
            super();
            this._position = Vec2.create();
            /**
             * 屏蔽网页原生鼠标事件
             */
            document.oncontextmenu = e => {
                return false;
            };
            canvas.addEventListener("mousedown", (ev) => {
                let key = ev.button;
                let keyEnum = Private.keyDic[key];
                let event = this.getClickEventByMouseEvent(ev);
                this.fire(MouseEventEnum.Down, event);
                this.fire([keyEnum, MouseEventEnum.Down], event);
            });
            canvas.addEventListener("mouseup", (ev) => {
                let key = ev.button;
                let keyEnum = Private.keyDic[key];
                let event = this.getClickEventByMouseEvent(ev);
                this.fire(MouseEventEnum.Up, event);
                this.fire([keyEnum, MouseEventEnum.Down], event);
            });
            canvas.addEventListener("mousemove", (ev) => {
                let event = this.getClickEventByMouseEvent(ev);
                this.fire(MouseEventEnum.Move, event);
            });
            canvas.addEventListener("mousewheel", (ev) => {
                let event = this.getClickEventByMouseEvent(ev);
                this.fire(MouseEventEnum.Rotate, event);
            });
        }
        get position() { return this._position; }
        ;
        getClickEventByMouseEvent(ev) {
            let event = new ClickEvent();
            event.pointx = ev.offsetX; //鼠标指针相对于目标节点内边位置的X坐标
            event.pointy = ev.offsetY; //鼠标指针相对于目标节点内边位置的Y坐标
            this._position.x = ev.offsetX;
            this._position.y = ev.offsetY;
            event.movementX = ev.movementX;
            event.movementY = ev.movementY;
            event.rotateDelta = ev.detail | ev.wheelDelta;
            return event;
        }
    }
    //# sourceMappingURL=Mouse.js.map

    var KeyCodeEnum;
    (function (KeyCodeEnum) {
        KeyCodeEnum["A"] = "A";
        KeyCodeEnum["B"] = "B";
        KeyCodeEnum["C"] = "C";
        KeyCodeEnum["D"] = "D";
        KeyCodeEnum["E"] = "E";
        KeyCodeEnum["F"] = "F";
        KeyCodeEnum["G"] = "G";
        KeyCodeEnum["H"] = "H";
        KeyCodeEnum["I"] = "I";
        KeyCodeEnum["J"] = "J";
        KeyCodeEnum["K"] = "K";
        KeyCodeEnum["L"] = "L";
        KeyCodeEnum["M"] = "M";
        KeyCodeEnum["N"] = "N";
        KeyCodeEnum["O"] = "O";
        KeyCodeEnum["P"] = "P";
        KeyCodeEnum["Q"] = "Q";
        KeyCodeEnum["R"] = "R";
        KeyCodeEnum["S"] = "S";
        KeyCodeEnum["T"] = "T";
        KeyCodeEnum["U"] = "U";
        KeyCodeEnum["V"] = "V";
        KeyCodeEnum["W"] = "W";
        KeyCodeEnum["X"] = "X";
        KeyCodeEnum["Y"] = "Y";
        KeyCodeEnum["Z"] = "Z";
        KeyCodeEnum["SPACE"] = " ";
        KeyCodeEnum["ESC"] = "ESC";
    })(KeyCodeEnum || (KeyCodeEnum = {}));
    var KeyCodeEventEnum;
    (function (KeyCodeEventEnum) {
        KeyCodeEventEnum["Up"] = "KeyUp";
        KeyCodeEventEnum["Down"] = "KeyDown";
    })(KeyCodeEventEnum || (KeyCodeEventEnum = {}));
    class Keyboard extends EventHandler$1 {
        constructor() {
            super();
            document.onkeydown = (ev) => {
                let keystr = ev.key.toUpperCase(); //safari浏览器不支持keypress事件中的key属性
                this.fire(KeyCodeEventEnum.Down, ev);
                this.fire([keystr, KeyCodeEventEnum.Down], ev);
            };
            document.onkeyup = (ev) => {
                let keystr = ev.key.toUpperCase(); //safari浏览器不支持keypress事件中的key属性
                this.fire(KeyCodeEventEnum.Up, ev);
                this.fire([keystr, KeyCodeEventEnum.Up], ev);
            };
        }
    }
    //# sourceMappingURL=keyboard.js.map

    class Input {
        constructor(canvas) {
            this._mouse = new Mouse(canvas);
            this._keyBoard = new Keyboard();
        }
        get mouse() { return this._mouse; }
        ;
        get keyBoard() { return this._keyBoard; }
        get position() { return this._mouse.position; }
    }
    //# sourceMappingURL=Input.js.map

    /**
     * 执行需要进行清理的方法
     * @param action
     */
    function excuteDebuffAction(action) {
        let dispose = action();
        return {
            excuteAction: (debuffAction) => {
                if (dispose)
                    dispose();
                dispose = debuffAction();
            },
            dispose: () => { dispose(); dispose = undefined; }
        };
    }
    class DebuffAction {
        constructor() {
            this.excuteAction = (debuffAction) => {
                if (this.dispose)
                    this.dispose();
                this.dispose = debuffAction();
            };
        }
        static create(action) {
            let newAct = new DebuffAction();
            if (action) {
                newAct.dispose = action();
            }
            return newAct;
        }
    }
    //# sourceMappingURL=DebuffAction.js.map

    class Timer {
        constructor() {
            this.beActive = true;
            this.timeScale = 1.0;
            this._ontick = new EventHandler();
            this.FPS = 60;
            this.frameUpdate();
        }
        active() {
            this.beActive = true;
        }
        disActive() {
            this.beActive = false;
        }
        get deltaTime() {
            return this._deltaTime;
        }
        update() {
            let now = Date.now();
            this._deltaTime = this._lastTime ? (now - this._lastTime) * this.timeScale * 0.001 : 0;
            this._lastTime = now;
            if (this.beActive != null) {
                this._ontick.raiseEvent(this._deltaTime);
            }
        }
        get onTick() { return this._ontick; }
        frameUpdate() {
            this.update();
            if (this.FPS == 60) {
                requestAnimationFrame(this.frameUpdate.bind(this));
            }
            else if (this.FPS != this._lastFPS) {
                //----------帧率被修改
                this.FPS = Math.min(this.FPS, 60);
                this.FPS = Math.max(this.FPS, 0);
                this._lastFPS = this.FPS;
                if (this.intervalLoop) {
                    this.intervalLoop.dispose();
                }
                this.intervalLoop = excuteDebuffAction(() => {
                    let loop = setInterval(() => {
                        this.frameUpdate();
                    }, 1000 / this.FPS);
                    return () => { clearInterval(loop); };
                });
            }
        }
    }
    //# sourceMappingURL=Timer.js.map

    /**
     * 渲染的层级(从小到大绘制)
     */
    var RenderLayerEnum;
    (function (RenderLayerEnum) {
        RenderLayerEnum[RenderLayerEnum["Background"] = 1000] = "Background";
        RenderLayerEnum[RenderLayerEnum["Geometry"] = 2000] = "Geometry";
        RenderLayerEnum[RenderLayerEnum["AlphaTest"] = 2450] = "AlphaTest";
        RenderLayerEnum[RenderLayerEnum["Transparent"] = 3000] = "Transparent";
        RenderLayerEnum[RenderLayerEnum["Overlay"] = 4000] = "Overlay";
    })(RenderLayerEnum || (RenderLayerEnum = {}));
    //# sourceMappingURL=RenderLayer.js.map

    class Vec3 extends Float32Array {
        constructor(x = 0, y = 0, z = 0) {
            super(3);
            this[0] = x;
            this[1] = y;
            this[2] = z;
        }
        get x() {
            return this[0];
        }
        set x(value) {
            this[0] = value;
        }
        get y() {
            return this[1];
        }
        set y(value) {
            this[1] = value;
        }
        get z() {
            return this[2];
        }
        set z(value) {
            this[2] = value;
        }
        static create(x = 0, y = 0, z = 0) {
            if (Vec3.Recycle && Vec3.Recycle.length > 0) {
                let item = Vec3.Recycle.pop();
                item[0] = x;
                item[1] = y;
                item[2] = z;
                return item;
            }
            else {
                // let item=new Float32Array(3);
                // item[0]=x;
                // item[1]=y;
                // item[2]=z;
                let item = new Vec3(x, y, z);
                return item;
            }
        }
        static clone(from) {
            if (Vec3.Recycle.length > 0) {
                let item = Vec3.Recycle.pop();
                Vec3.copy(from, item);
                return item;
            }
            else {
                //let item=new Float32Array(3);
                let item = new Vec3(from[0], from[1], from[2]);
                // item[0]=from[0];
                // item[1]=from[1];
                // item[2]=from[2];
                return item;
            }
        }
        static recycle(item) {
            Vec3.Recycle.push(item);
        }
        static disposeRecycledItems() {
            Vec3.Recycle.length = 0;
        }
        /**
         * Copy the values from one vec3 to another
         *
         * @param out the receiving vector
         * @param src the source vector
         * @returns out
         */
        static copy(from, out = Vec3.create()) {
            out[0] = from[0];
            out[1] = from[1];
            out[2] = from[2];
            return out;
        }
        /**
         * Adds two vec3's
         *
         * @param out the receiving vector
         * @param lhs the first operand
         * @param rhs the second operand
         * @returns out
         */
        static add(lhs, rhs, out = Vec3.create()) {
            out[0] = lhs[0] + rhs[0];
            out[1] = lhs[1] + rhs[1];
            out[2] = lhs[2] + rhs[2];
            return out;
        }
        static toZero(a) {
            a[0] = a[1] = a[2] = 0;
        }
        /**
         * Subtracts vector b from vector a
         *
         * @param out the receiving vector
         * @param lhs the first operand
         * @param rhs the second operand
         * @returns out
         */
        static subtract(lhs, rhs, out = Vec3.create()) {
            out[0] = lhs[0] - rhs[0];
            out[1] = lhs[1] - rhs[1];
            out[2] = lhs[2] - rhs[2];
            return out;
        }
        /**
         * Multiplies two vec3's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static multiply(a, b, out = Vec3.create()) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            out[2] = a[2] * b[2];
            return out;
        }
        static center(a, b, out = Vec3.create()) {
            this.add(a, b, out);
            this.scale(out, 0.5, out);
            return out;
        }
        /**
         * Divides two vec3's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static divide(a, b, out = Vec3.create()) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            out[2] = a[2] / b[2];
            return out;
        }
        /**
         * Math.ceil the components of a vec3
         *
         * @param {Vec3} out the receiving vector
         * @param {Vec3} a vector to ceil
         * @returns {Vec3} out
         */
        static ceil(out = Vec3.create(), a) {
            out[0] = Math.ceil(a[0]);
            out[1] = Math.ceil(a[1]);
            out[2] = Math.ceil(a[2]);
            return out;
        }
        /**
         * Math.floor the components of a vec3
         *
         * @param {Vec3} out the receiving vector
         * @param {Vec3} a vector to floor
         * @returns {Vec3} out
         */
        static floor(out = Vec3.create(), a) {
            out[0] = Math.floor(a[0]);
            out[1] = Math.floor(a[1]);
            out[2] = Math.floor(a[2]);
            return out;
        }
        /**
         * Returns the minimum of two vec3's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static min(a, b, out = Vec3.create()) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            out[2] = Math.min(a[2], b[2]);
            return out;
        }
        /**
         * Returns the maximum of two vec3's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static max(out = Vec3.create(), a, b) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            out[2] = Math.max(a[2], b[2]);
            return out;
        }
        /**
         * Math.round the components of a vec3
         *
         * @param {Vec3} out the receiving vector
         * @param {Vec3} a vector to round
         * @returns {Vec3} out
         */
        static round(out = Vec3.create(), a) {
            out[0] = Math.round(a[0]);
            out[1] = Math.round(a[1]);
            out[2] = Math.round(a[2]);
            return out;
        }
        /**
         * Scales a vec3 by a scalar number
         *
         * @param out the receiving vector
         * @param a the vector to scale
         * @param b amount to scale the vector by
         * @returns out
         */
        static scale(a, b, out = Vec3.create()) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            return out;
        }
        /**
         * Adds two vec3's after scaling the second operand by a scalar value
         *
         * @param out the receiving vector
         * @param lhs the first operand
         * @param rhs the second operand
         * @param scale the amount to scale b by before adding
         * @returns out
         */
        static AddscaledVec(lhs, rhs, scale, out = Vec3.create()) {
            out[0] = lhs[0] + rhs[0] * scale;
            out[1] = lhs[1] + rhs[1] * scale;
            out[2] = lhs[2] + rhs[2] * scale;
            return out;
        }
        /**
         * Calculates the euclidian distance between two vec3's
         *
         * @param a the first operand
         * @param b the second operand
         * @returns distance between a and b
         */
        static distance(a, b) {
            let x = b[0] - a[0];
            let y = b[1] - a[1];
            let z = b[2] - a[2];
            return Math.sqrt(x * x + y * y + z * z);
        }
        /**
         * Calculates the squared euclidian distance between two vec3's
         *
         * @param a the first operand
         * @param b the second operand
         * @returns squared distance between a and b
         */
        static squaredDistance(a, b) {
            let x = b[0] - a[0];
            let y = b[1] - a[1];
            let z = b[2] - a[2];
            return x * x + y * y + z * z;
        }
        /**
         * Calculates the length of a vec3
         *
         * @param a vector to calculate length of
         * @returns length of a
         */
        static magnitude(a) {
            let x = a[0];
            let y = a[1];
            let z = a[2];
            return Math.sqrt(x * x + y * y + z * z);
        }
        /**
         * Calculates the squared length of a vec3
         *
         * @param a vector to calculate squared length of
         * @returns squared length of a
         */
        static squaredLength(a) {
            let x = a[0];
            let y = a[1];
            let z = a[2];
            return x * x + y * y + z * z;
        }
        /**
         * Negates the components of a vec3
         *
         * @param out the receiving vector
         * @param a vector to negate
         * @returns out
         */
        static negate(a, out = Vec3.create()) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            return out;
        }
        /**
         * Returns the inverse of the components of a vec3
         *
         * @param out the receiving vector
         * @param a vector to invert
         * @returns out
         */
        static inverse(a, out = Vec3.create()) {
            out[0] = 1.0 / a[0];
            out[1] = 1.0 / a[1];
            out[2] = 1.0 / a[2];
            return out;
        }
        /**
         * Normalize a vec3
         *
         * @param out the receiving vector
         * @param src vector to normalize
         * @returns out
         */
        static normalize(src, out = Vec3.create()) {
            let x = src[0];
            let y = src[1];
            let z = src[2];
            let len = x * x + y * y + z * z;
            if (len > 0) {
                //TODO: evaluate use of glm_invsqrt here?
                len = 1 / Math.sqrt(len);
                out[0] = src[0] * len;
                out[1] = src[1] * len;
                out[2] = src[2] * len;
            }
            return out;
        }
        /**
         * Calculates the dot product of two vec3's
         *
         * @param a the first operand
         * @param b the second operand
         * @returns dot product of a and b
         */
        static dot(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        }
        /**
         * Computes the cross product of two vec3's
         *
         * @param out the receiving vector
         * @param lhs the first operand
         * @param rhs the second operand
         * @returns out
         */
        static cross(lhs, rhs, out = Vec3.create()) {
            let ax = lhs[0], ay = lhs[1], az = lhs[2];
            let bx = rhs[0], by = rhs[1], bz = rhs[2];
            out[0] = ay * bz - az * by;
            out[1] = az * bx - ax * bz;
            out[2] = ax * by - ay * bx;
            return out;
        }
        /**
         * Performs a linear interpolation between two vec3's
         *
         * @param out the receiving vector
         * @param lhs the first operand
         * @param rhs the second operand
         * @param lerp interpolation amount between the two inputs
         * @returns out
         */
        static lerp(lhs, rhs, lerp$$1, out = Vec3.create()) {
            let ax = lhs[0];
            let ay = lhs[1];
            let az = lhs[2];
            out[0] = ax + lerp$$1 * (rhs[0] - ax);
            out[1] = ay + lerp$$1 * (rhs[1] - ay);
            out[2] = az + lerp$$1 * (rhs[2] - az);
            return out;
        }
        /**
         * Performs a hermite interpolation with two control points
         *
         * @param {Vec3} out the receiving vector
         * @param {Vec3} a the first operand
         * @param {Vec3} b the second operand
         * @param {Vec3} c the third operand
         * @param {Vec3} d the fourth operand
         * @param {number} t interpolation amount between the two inputs
         * @returns {Vec3} out
         */
        static hermite(a, b, c, d, t, out = Vec3.create()) {
            let factorTimes2 = t * t;
            let factor1 = factorTimes2 * (2 * t - 3) + 1;
            let factor2 = factorTimes2 * (t - 2) + t;
            let factor3 = factorTimes2 * (t - 1);
            let factor4 = factorTimes2 * (3 - 2 * t);
            out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
            out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
            out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
            return out;
        }
        /**
         * Performs a bezier interpolation with two control points
         *
         * @param {Vec3} out the receiving vector
         * @param {Vec3} a the first operand
         * @param {Vec3} b the second operand
         * @param {Vec3} c the third operand
         * @param {Vec3} d the fourth operand
         * @param {number} t interpolation amount between the two inputs
         * @returns {Vec3} out
         */
        static bezier(a, b, c, d, t, out = Vec3.create()) {
            let inverseFactor = 1 - t;
            let inverseFactorTimesTwo = inverseFactor * inverseFactor;
            let factorTimes2 = t * t;
            let factor1 = inverseFactorTimesTwo * inverseFactor;
            let factor2 = 3 * t * inverseFactorTimesTwo;
            let factor3 = 3 * factorTimes2 * inverseFactor;
            let factor4 = factorTimes2 * t;
            out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
            out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
            out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
            return out;
        }
        /**
         * Generates a random vector with the given scale
         *
         * @param out the receiving vector
         * @param [scale] Length of the resulting vector. If omitted, a unit vector will be returned
         * @returns out
         */
        static random(scale = 1, out = Vec3.create()) {
            scale = scale || 1.0;
            let r = Math.random() * 2.0 * Math.PI;
            let z = Math.random() * 2.0 - 1.0;
            let zScale = Math.sqrt(1.0 - z * z) * scale;
            out[0] = Math.cos(r) * zScale;
            out[1] = Math.sin(r) * zScale;
            out[2] = z * scale;
            return out;
        }
        // /**
        //  * Transforms the vec3 with a mat3.
        //  *
        //  * @param out the receiving vector
        //  * @param a the vector to transform
        //  * @param m the 3x3 matrix to transform with
        //  * @returns out
        //  */
        // public static transformMat3(out: Vec3 = Vec3.create(), a: vec3, m: mat3): vec3{
        //     let x = a[0],
        //     y = a[1],
        //     z = a[2];
        // out[0] = x * m[0] + y * m[3] + z * m[6];
        // out[1] = x * m[1] + y * m[4] + z * m[7];
        // out[2] = x * m[2] + y * m[5] + z * m[8];
        // return out;
        // }
        // /**
        //  * 转到mat4中
        //  * Transforms the vec3 with a mat4.
        //  * 4th vector component is implicitly '1'
        //  *
        //  * @param out the receiving vector
        //  * @param a the vector to transform
        //  * @param m matrix to transform with
        //  * @returns out
        //  */
        // public static transformMat4(out: Vec3 = Vec3.create(), a: vec3, m: mat4): vec3{
        //     let x = a[0],
        //         y = a[1],
        //         z = a[2];
        //     let w = m[3] * x + m[7] * y + m[11] * z + m[15];
        //     w = w || 1.0;
        //     out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
        //     out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
        //     out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
        //     return out;
        // }
        /**
         * Transforms the vec3 with a Quat
         *
         * @param out the receiving vector
         * @param a the vector to transform
         * @param q Quaternion to transform with
         * @returns out
         */
        static transformQuat(a, q, out = Vec3.create()) {
            // benchmarks: http://jsperf.com/Quaternion-transform-vec3-implementations
            let x = a[0], y = a[1], z = a[2];
            let qx = q[0], qy = q[1], qz = q[2], qw = q[3];
            // calculate Quat * vec
            let ix = qw * x + qy * z - qz * y;
            let iy = qw * y + qz * x - qx * z;
            let iz = qw * z + qx * y - qy * x;
            let iw = -qx * x - qy * y - qz * z;
            // calculate result * inverse Quat
            out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
            return out;
        }
        /**
         * Rotate a 3D vector around the x-axis
         * @param out The receiving vec3
         * @param a The vec3 point to rotate
         * @param b The origin of the rotation
         * @param c The angle of rotation
         * @returns out
         */
        static rotateX(a, b, c, out = Vec3.create()) {
            let p = [], r = [];
            //Translate point to the origin
            p[0] = a[0] - b[0];
            p[1] = a[1] - b[1];
            p[2] = a[2] - b[2];
            //perform rotation
            r[0] = p[0];
            r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
            r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);
            //translate to correct position
            out[0] = r[0] + b[0];
            out[1] = r[1] + b[1];
            out[2] = r[2] + b[2];
            return out;
        }
        /**
         * Rotate a 3D vector around the y-axis
         * @param out The receiving vec3
         * @param a The vec3 point to rotate
         * @param b The origin of the rotation
         * @param c The angle of rotation
         * @returns out
         */
        static rotateY(a, b, c, out = Vec3.create()) {
            let p = [], r = [];
            //Translate point to the origin
            p[0] = a[0] - b[0];
            p[1] = a[1] - b[1];
            p[2] = a[2] - b[2];
            //perform rotation
            r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
            r[1] = p[1];
            r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);
            //translate to correct position
            out[0] = r[0] + b[0];
            out[1] = r[1] + b[1];
            out[2] = r[2] + b[2];
            return out;
        }
        /**
         * Rotate a 3D vector around the z-axis
         * @param out The receiving vec3
         * @param a The vec3 point to rotate
         * @param b The origin of the rotation
         * @param c The angle of rotation
         * @returns out
         */
        static rotateZ(a, b, c, out = Vec3.create()) {
            let p = [], r = [];
            //Translate point to the origin
            p[0] = a[0] - b[0];
            p[1] = a[1] - b[1];
            p[2] = a[2] - b[2];
            //perform rotation
            r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
            r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
            r[2] = p[2];
            //translate to correct position
            out[0] = r[0] + b[0];
            out[1] = r[1] + b[1];
            out[2] = r[2] + b[2];
            return out;
        }
        // /**
        //  * Perform some operation over an array of vec3s.
        //  *
        //  * @param a the array of vectors to iterate over
        //  * @param stride Number of elements between the start of each vec3. If 0 assumes tightly packed
        //  * @param offset Number of elements to skip at the beginning of the array
        //  * @param count Number of vec3s to iterate over. If 0 iterates over entire array
        //  * @param fn Function to call for each vector in the array
        //  * @param arg additional argument to pass to fn
        //  * @returns a
        //  * @function
        //  */
        // public static forEach(a: Float32Array, stride: number, offset: number, count: number,
        //                       fn: (a: vec3, b: vec3, arg: any) => void, arg: any): Float32Array;
        // /**
        //  * Perform some operation over an array of vec3s.
        //  *
        //  * @param a the array of vectors to iterate over
        //  * @param stride Number of elements between the start of each vec3. If 0 assumes tightly packed
        //  * @param offset Number of elements to skip at the beginning of the array
        //  * @param count Number of vec3s to iterate over. If 0 iterates over entire array
        //  * @param fn Function to call for each vector in the array
        //  * @returns a
        //  * @function
        //  */
        // public static forEach(a: Float32Array, stride: number, offset: number, count: number,
        //                       fn: (a: vec3, b: vec3) => void): Float32Array;
        /**
         * Get the angle between two 3D vectors
         * @param a The first operand
         * @param b The second operand
         * @returns The angle in radians
         */
        static angle(a, b) {
            let tempA = Vec3.clone(a);
            let tempB = Vec3.clone(b);
            // let tempA = vec3.fromValues(a[0], a[1], a[2]);
            // let tempB = vec3.fromValues(b[0], b[1], b[2]);
            Vec3.normalize(tempA, tempA);
            Vec3.normalize(tempB, tempB);
            let cosine = Vec3.dot(tempA, tempB);
            if (cosine > 1.0) {
                return 0;
            }
            else if (cosine < -1.0) {
                return Math.PI;
            }
            else {
                return Math.acos(cosine);
            }
        }
        /**
         * Returns a string representation of a vector
         *
         * @param a vector to represent as a string
         * @returns string representation of the vector
         */
        static str(a) {
            return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
        }
        /**
         * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
         *
         * @param {Vec3} a The first vector.
         * @param {Vec3} b The second vector.
         * @returns {boolean} True if the vectors are equal, false otherwise.
         */
        static exactEquals(a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
        }
        /**
         * Returns whether or not the vectors have approximately the same elements in the same position.
         *
         * @param {Vec3} a The first vector.
         * @param {Vec3} b The second vector.
         * @returns {boolean} True if the vectors are equal, false otherwise.
         */
        static equals(a, b) {
            let a0 = a[0], a1 = a[1], a2 = a[2];
            let b0 = b[0], b1 = b[1], b2 = b[2];
            return Math.abs(a0 - b0) <= EPSILON && Math.abs(a1 - b1) <= EPSILON && Math.abs(a2 - b2) <= EPSILON;
        }
    }
    Vec3.UP = Vec3.create(0, 1, 0);
    Vec3.DOWN = Vec3.create(0, -1, 0);
    Vec3.RIGHT = Vec3.create(1, 0, 0);
    Vec3.LEFT = Vec3.create(-1, 0, 0);
    Vec3.FORWARD = Vec3.create(0, 0, 1);
    Vec3.BACKWARD = Vec3.create(0, 0, -1);
    Vec3.ONE = Vec3.create(1, 1, 1);
    Vec3.ZERO = Vec3.create(0, 0, 0);
    Vec3.Recycle = [];
    //# sourceMappingURL=vec3.js.map

    class Mat4 extends Float32Array {
        constructor() {
            super(16);
            this[0] = 1;
            // this[1] = 0;
            // this[2] = 0;
            // this[3] = 0;
            // this[4] = 0;
            this[5] = 1;
            // this[6] = 0;
            // this[7] = 0;
            // this[8] = 0;
            // this[9] = 0;
            this[10] = 1;
            // this[11] = 0;
            // this[12] = 0;
            // this[13] = 0;
            // this[14] = 0;
            this[15] = 1;
        }
        static create() {
            if (Mat4.Recycle && Mat4.Recycle.length > 0) {
                let item = Mat4.Recycle.pop();
                Mat4.identity(item);
                return item;
            }
            else {
                let item = new Float32Array(16);
                item[0] = 1;
                item[5] = 1;
                item[10] = 1;
                item[15] = 1;
                return item;
            }
        }
        static fromArray(array) {
            if (array.length != 16)
                return null;
            return new Float32Array(array);
        }
        static clone(from) {
            if (Mat4.Recycle.length > 0) {
                let item = Mat4.Recycle.pop();
                Mat4.copy(from, item);
                return item;
            }
            else {
                let out = new Float32Array(16);
                out[0] = from[0];
                out[1] = from[1];
                out[2] = from[2];
                out[3] = from[3];
                out[4] = from[4];
                out[5] = from[5];
                out[6] = from[6];
                out[7] = from[7];
                out[8] = from[8];
                out[9] = from[9];
                out[10] = from[10];
                out[11] = from[11];
                out[12] = from[12];
                out[13] = from[13];
                out[14] = from[14];
                out[15] = from[15];
                return out;
            }
        }
        static recycle(item) {
            Mat4.Recycle.push(item);
        }
        static disposeRecycledItems() {
            Mat4.Recycle.length = 0;
        }
        /**
         * Copy the values from one mat4 to another
         *
         * @param out the receiving matrix
         * @param src the source matrix
         * @returns out
         */
        static copy(src, out = Mat4.create()) {
            out[0] = src[0];
            out[1] = src[1];
            out[2] = src[2];
            out[3] = src[3];
            out[4] = src[4];
            out[5] = src[5];
            out[6] = src[6];
            out[7] = src[7];
            out[8] = src[8];
            out[9] = src[9];
            out[10] = src[10];
            out[11] = src[11];
            out[12] = src[12];
            out[13] = src[13];
            out[14] = src[14];
            out[15] = src[15];
            return out;
        }
        /**
         * Set a mat4 to the identity matrix
         *
         * @param out the receiving matrix
         * @returns out
         */
        static identity(out = Mat4.create()) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        }
        /**
         * Transpose the values of a mat4
         *
         * @param out the receiving matrix
         * @param a the source matrix
         * @returns out
         */
        static transpose(a, out = Mat4.create()) {
            // If we are transposing ourselves we can skip a few steps but have to cache some values
            if (out === a) {
                let a01 = a[1], a02 = a[2], a03 = a[3];
                let a12 = a[6], a13 = a[7];
                let a23 = a[11];
                out[1] = a[4];
                out[2] = a[8];
                out[3] = a[12];
                out[4] = a01;
                out[6] = a[9];
                out[7] = a[13];
                out[8] = a02;
                out[9] = a12;
                out[11] = a[14];
                out[12] = a03;
                out[13] = a13;
                out[14] = a23;
            }
            else {
                out[0] = a[0];
                out[1] = a[4];
                out[2] = a[8];
                out[3] = a[12];
                out[4] = a[1];
                out[5] = a[5];
                out[6] = a[9];
                out[7] = a[13];
                out[8] = a[2];
                out[9] = a[6];
                out[10] = a[10];
                out[11] = a[14];
                out[12] = a[3];
                out[13] = a[7];
                out[14] = a[11];
                out[15] = a[15];
            }
            return out;
        }
        /**
         * Inverts a mat4
         *
         * @param out the receiving matrix
         * @param a the source matrix
         * @returns out
         */
        static invert(a, out = Mat4.create()) {
            let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
            let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
            let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            let b00 = a00 * a11 - a01 * a10;
            let b01 = a00 * a12 - a02 * a10;
            let b02 = a00 * a13 - a03 * a10;
            let b03 = a01 * a12 - a02 * a11;
            let b04 = a01 * a13 - a03 * a11;
            let b05 = a02 * a13 - a03 * a12;
            let b06 = a20 * a31 - a21 * a30;
            let b07 = a20 * a32 - a22 * a30;
            let b08 = a20 * a33 - a23 * a30;
            let b09 = a21 * a32 - a22 * a31;
            let b10 = a21 * a33 - a23 * a31;
            let b11 = a22 * a33 - a23 * a32;
            // Calculate the determinant
            let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
            if (!det) {
                return null;
            }
            det = 1.0 / det;
            out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
            out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
            out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
            out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
            out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
            out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
            out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
            out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
            out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
            out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
            return out;
        }
        /**
         * Calculates the adjugate of a mat4
         *
         * @param out the receiving matrix
         * @param a the source matrix
         * @returns out
         */
        static adjoint(a, out = Mat4.create()) {
            let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
            let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
            let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
            out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
            out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
            out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
            out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
            out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
            out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
            out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
            out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
            out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
            out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
            out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
            out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
            out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
            out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
            out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
            return out;
        }
        /**
         * Calculates the determinant of a mat4
         *
         * @param a the source matrix
         * @returns determinant of a
         */
        static determinant(a) {
            let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
            let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
            let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            let b00 = a00 * a11 - a01 * a10;
            let b01 = a00 * a12 - a02 * a10;
            let b02 = a00 * a13 - a03 * a10;
            let b03 = a01 * a12 - a02 * a11;
            let b04 = a01 * a13 - a03 * a11;
            let b05 = a02 * a13 - a03 * a12;
            let b06 = a20 * a31 - a21 * a30;
            let b07 = a20 * a32 - a22 * a30;
            let b08 = a20 * a33 - a23 * a30;
            let b09 = a21 * a32 - a22 * a31;
            let b10 = a21 * a33 - a23 * a31;
            let b11 = a22 * a33 - a23 * a32;
            // Calculate the determinant
            return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        }
        /**
         * Multiplies two mat4's
         *
         * @param out the receiving matrix
         * @param lhs the first operand
         * @param rhs the second operand
         * @returns out
         */
        static multiply(lhs, rhs, out = Mat4.create()) {
            let a00 = lhs[0], a01 = lhs[1], a02 = lhs[2], a03 = lhs[3];
            let a10 = lhs[4], a11 = lhs[5], a12 = lhs[6], a13 = lhs[7];
            let a20 = lhs[8], a21 = lhs[9], a22 = lhs[10], a23 = lhs[11];
            let a30 = lhs[12], a31 = lhs[13], a32 = lhs[14], a33 = lhs[15];
            // Cache only the current line of the second matrix
            let b0 = rhs[0], b1 = rhs[1], b2 = rhs[2], b3 = rhs[3];
            out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = rhs[4];
            b1 = rhs[5];
            b2 = rhs[6];
            b3 = rhs[7];
            out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = rhs[8];
            b1 = rhs[9];
            b2 = rhs[10];
            b3 = rhs[11];
            out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = rhs[12];
            b1 = rhs[13];
            b2 = rhs[14];
            b3 = rhs[15];
            out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            return out;
        }
        /**
         * Translate a mat4 by the given vector
         *
         * @param out the receiving matrix
         * @param a the matrix to translate
         * @param v vector to translate by
         * @returns out
         */
        static translate(a, v, out = Mat4.create()) {
            let x = v[0], y = v[1], z = v[2];
            let a00 = void 0, a01 = void 0, a02 = void 0, a03 = void 0;
            let a10 = void 0, a11 = void 0, a12 = void 0, a13 = void 0;
            let a20 = void 0, a21 = void 0, a22 = void 0, a23 = void 0;
            if (a === out) {
                out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
                out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
                out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
                out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
            }
            else {
                a00 = a[0];
                a01 = a[1];
                a02 = a[2];
                a03 = a[3];
                a10 = a[4];
                a11 = a[5];
                a12 = a[6];
                a13 = a[7];
                a20 = a[8];
                a21 = a[9];
                a22 = a[10];
                a23 = a[11];
                out[0] = a00;
                out[1] = a01;
                out[2] = a02;
                out[3] = a03;
                out[4] = a10;
                out[5] = a11;
                out[6] = a12;
                out[7] = a13;
                out[8] = a20;
                out[9] = a21;
                out[10] = a22;
                out[11] = a23;
                out[12] = a00 * x + a10 * y + a20 * z + a[12];
                out[13] = a01 * x + a11 * y + a21 * z + a[13];
                out[14] = a02 * x + a12 * y + a22 * z + a[14];
                out[15] = a03 * x + a13 * y + a23 * z + a[15];
            }
            return out;
        }
        /**
         * Scales the mat4 by the dimensions in the given Vec3
         *
         * @param out the receiving matrix
         * @param a the matrix to scale
         * @param v the Vec3 to scale the matrix by
         * @returns out
         **/
        static scale(a, v, out = Mat4.create()) {
            let x = v[0], y = v[1], z = v[2];
            out[0] = a[0] * x;
            out[1] = a[1] * x;
            out[2] = a[2] * x;
            out[3] = a[3] * x;
            out[4] = a[4] * y;
            out[5] = a[5] * y;
            out[6] = a[6] * y;
            out[7] = a[7] * y;
            out[8] = a[8] * z;
            out[9] = a[9] * z;
            out[10] = a[10] * z;
            out[11] = a[11] * z;
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
            return out;
        }
        /**
         * Rotates a mat4 by the given angle
         *
         * @param out the receiving matrix
         * @param a the matrix to rotate
         * @param rad the angle to rotate the matrix by
         * @param axis the axis to rotate around
         * @returns out
         */
        static rotate(a, rad, axis, out = Mat4.create()) {
            let x = axis[0], y = axis[1], z = axis[2];
            let len = Math.sqrt(x * x + y * y + z * z);
            let s = void 0, c = void 0, t = void 0;
            let a00 = void 0, a01 = void 0, a02 = void 0, a03 = void 0;
            let a10 = void 0, a11 = void 0, a12 = void 0, a13 = void 0;
            let a20 = void 0, a21 = void 0, a22 = void 0, a23 = void 0;
            let b00 = void 0, b01 = void 0, b02 = void 0;
            let b10 = void 0, b11 = void 0, b12 = void 0;
            let b20 = void 0, b21 = void 0, b22 = void 0;
            if (Math.abs(len) < 0.000001) {
                return null;
            }
            len = 1 / len;
            x *= len;
            y *= len;
            z *= len;
            s = Math.sin(rad);
            c = Math.cos(rad);
            t = 1 - c;
            a00 = a[0];
            a01 = a[1];
            a02 = a[2];
            a03 = a[3];
            a10 = a[4];
            a11 = a[5];
            a12 = a[6];
            a13 = a[7];
            a20 = a[8];
            a21 = a[9];
            a22 = a[10];
            a23 = a[11];
            // Construct the elements of the rotation matrix
            b00 = x * x * t + c;
            b01 = y * x * t + z * s;
            b02 = z * x * t - y * s;
            b10 = x * y * t - z * s;
            b11 = y * y * t + c;
            b12 = z * y * t + x * s;
            b20 = x * z * t + y * s;
            b21 = y * z * t - x * s;
            b22 = z * z * t + c;
            // Perform rotation-specific matrix multiplication
            out[0] = a00 * b00 + a10 * b01 + a20 * b02;
            out[1] = a01 * b00 + a11 * b01 + a21 * b02;
            out[2] = a02 * b00 + a12 * b01 + a22 * b02;
            out[3] = a03 * b00 + a13 * b01 + a23 * b02;
            out[4] = a00 * b10 + a10 * b11 + a20 * b12;
            out[5] = a01 * b10 + a11 * b11 + a21 * b12;
            out[6] = a02 * b10 + a12 * b11 + a22 * b12;
            out[7] = a03 * b10 + a13 * b11 + a23 * b12;
            out[8] = a00 * b20 + a10 * b21 + a20 * b22;
            out[9] = a01 * b20 + a11 * b21 + a21 * b22;
            out[10] = a02 * b20 + a12 * b21 + a22 * b22;
            out[11] = a03 * b20 + a13 * b21 + a23 * b22;
            if (a !== out) {
                // If the source and destination differ, copy the unchanged last row
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            return out;
        }
        /**
         * Rotates a matrix by the given angle around the X axis
         *
         * @param out the receiving matrix
         * @param a the matrix to rotate
         * @param rad the angle to rotate the matrix by
         * @returns out
         */
        static rotateX(a, rad, out = Mat4.create()) {
            let s = Math.sin(rad);
            let c = Math.cos(rad);
            let a10 = a[4];
            let a11 = a[5];
            let a12 = a[6];
            let a13 = a[7];
            let a20 = a[8];
            let a21 = a[9];
            let a22 = a[10];
            let a23 = a[11];
            if (a !== out) {
                // If the source and destination differ, copy the unchanged rows
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            // Perform axis-specific matrix multiplication
            out[4] = a10 * c + a20 * s;
            out[5] = a11 * c + a21 * s;
            out[6] = a12 * c + a22 * s;
            out[7] = a13 * c + a23 * s;
            out[8] = a20 * c - a10 * s;
            out[9] = a21 * c - a11 * s;
            out[10] = a22 * c - a12 * s;
            out[11] = a23 * c - a13 * s;
            return out;
        }
        /**
         * Rotates a matrix by the given angle around the Y axis
         *
         * @param out the receiving matrix
         * @param a the matrix to rotate
         * @param rad the angle to rotate the matrix by
         * @returns out
         */
        static rotateY(a, rad, out = Mat4.create()) {
            let s = Math.sin(rad);
            let c = Math.cos(rad);
            let a00 = a[0];
            let a01 = a[1];
            let a02 = a[2];
            let a03 = a[3];
            let a20 = a[8];
            let a21 = a[9];
            let a22 = a[10];
            let a23 = a[11];
            if (a !== out) {
                // If the source and destination differ, copy the unchanged rows
                out[4] = a[4];
                out[5] = a[5];
                out[6] = a[6];
                out[7] = a[7];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            // Perform axis-specific matrix multiplication
            out[0] = a00 * c - a20 * s;
            out[1] = a01 * c - a21 * s;
            out[2] = a02 * c - a22 * s;
            out[3] = a03 * c - a23 * s;
            out[8] = a00 * s + a20 * c;
            out[9] = a01 * s + a21 * c;
            out[10] = a02 * s + a22 * c;
            out[11] = a03 * s + a23 * c;
            return out;
        }
        /**
         * Rotates a matrix by the given angle around the Z axis
         *
         * @param out the receiving matrix
         * @param a the matrix to rotate
         * @param rad the angle to rotate the matrix by
         * @returns out
         */
        static rotateZ(a, rad, out = Mat4.create()) {
            let s = Math.sin(rad);
            let c = Math.cos(rad);
            let a00 = a[0];
            let a01 = a[1];
            let a02 = a[2];
            let a03 = a[3];
            let a10 = a[4];
            let a11 = a[5];
            let a12 = a[6];
            let a13 = a[7];
            if (a !== out) {
                // If the source and destination differ, copy the unchanged last row
                out[8] = a[8];
                out[9] = a[9];
                out[10] = a[10];
                out[11] = a[11];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            // Perform axis-specific matrix multiplication
            out[0] = a00 * c + a10 * s;
            out[1] = a01 * c + a11 * s;
            out[2] = a02 * c + a12 * s;
            out[3] = a03 * c + a13 * s;
            out[4] = a10 * c - a00 * s;
            out[5] = a11 * c - a01 * s;
            out[6] = a12 * c - a02 * s;
            out[7] = a13 * c - a03 * s;
            return out;
        }
        /**
         * Creates a matrix from a vector translation
         * This is equivalent to (but much faster than):
         *
         *     mat4.identity(dest);
         *     mat4.translate(dest, dest, vec);
         *
         * @param {Mat4} out mat4 receiving operation result
         * @param {Vec3} v Translation vector
         * @returns {Mat4} out
         */
        static fromTranslation(v, out = Mat4.create()) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = v[0];
            out[13] = v[1];
            out[14] = v[2];
            out[15] = 1;
            return out;
        }
        /**
         * Creates a matrix from a vector scaling
         * This is equivalent to (but much faster than):
         *
         *     mat4.identity(dest);
         *     mat4.scale(dest, dest, vec);
         *
         * @param {Mat4} out mat4 receiving operation result
         * @param {Vec3} v Scaling vector
         * @returns {Mat4} out
         */
        static fromScaling(v, out = Mat4.create()) {
            out[0] = v[0];
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = v[1];
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = v[2];
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        }
        /**
         * Creates a matrix from a given angle around a given axis
         * This is equivalent to (but much faster than):
         *
         *     mat4.identity(dest);
         *     mat4.rotate(dest, dest, rad, axis);
         *
         * @param {Mat4} out mat4 receiving operation result
         * @param {number} rad the angle to rotate the matrix by
         * @param {Vec3} axis the axis to rotate around
         * @returns {Mat4} out
         */
        static fromRotation(rad, axis, out = Mat4.create()) {
            let x = axis[0], y = axis[1], z = axis[2];
            let len = Math.sqrt(x * x + y * y + z * z);
            let s = void 0, c = void 0, t = void 0;
            if (Math.abs(len) < 0.000001) {
                return null;
            }
            len = 1 / len;
            x *= len;
            y *= len;
            z *= len;
            s = Math.sin(rad);
            c = Math.cos(rad);
            t = 1 - c;
            // Perform rotation-specific matrix multiplication
            out[0] = x * x * t + c;
            out[1] = y * x * t + z * s;
            out[2] = z * x * t - y * s;
            out[3] = 0;
            out[4] = x * y * t - z * s;
            out[5] = y * y * t + c;
            out[6] = z * y * t + x * s;
            out[7] = 0;
            out[8] = x * z * t + y * s;
            out[9] = y * z * t - x * s;
            out[10] = z * z * t + c;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        }
        /**
         * Creates a matrix from the given angle around the X axis
         * This is equivalent to (but much faster than):
         *
         *     mat4.identity(dest);
         *     mat4.rotateX(dest, dest, rad);
         *
         * @param {Mat4} out mat4 receiving operation result
         * @param {number} rad the angle to rotate the matrix by
         * @returns {Mat4} out
         */
        static fromXRotation(rad, out = Mat4.create()) {
            let s = Math.sin(rad);
            let c = Math.cos(rad);
            // Perform axis-specific matrix multiplication
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = c;
            out[6] = s;
            out[7] = 0;
            out[8] = 0;
            out[9] = -s;
            out[10] = c;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        }
        /**
         * Creates a matrix from the given angle around the Y axis
         * This is equivalent to (but much faster than):
         *
         *     mat4.identity(dest);
         *     mat4.rotateY(dest, dest, rad);
         *
         * @param {Mat4} out mat4 receiving operation result
         * @param {number} rad the angle to rotate the matrix by
         * @returns {Mat4} out
         */
        static fromYRotation(rad, out = Mat4.create()) {
            let s = Math.sin(rad);
            let c = Math.cos(rad);
            // Perform axis-specific matrix multiplication
            out[0] = c;
            out[1] = 0;
            out[2] = -s;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = s;
            out[9] = 0;
            out[10] = c;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        }
        /**
         * Creates a matrix from the given angle around the Z axis
         * This is equivalent to (but much faster than):
         *
         *     mat4.identity(dest);
         *     mat4.rotateZ(dest, dest, rad);
         *
         * @param {Mat4} out mat4 receiving operation result
         * @param {number} rad the angle to rotate the matrix by
         * @returns {Mat4} out
         */
        static fromZRotation(rad, out = Mat4.create()) {
            let s = Math.sin(rad);
            let c = Math.cos(rad);
            // Perform axis-specific matrix multiplication
            out[0] = c;
            out[1] = s;
            out[2] = 0;
            out[3] = 0;
            out[4] = -s;
            out[5] = c;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        }
        /**
         * Returns the translation vector component of a transformation
         *  matrix. If a matrix is built with fromRotationTranslation,
         *  the returned vector will be the same as the translation vector
         *  originally supplied.
         * @param  {Vec3} out Vector to receive translation component
         * @param  {Mat4} mat Matrix to be decomposed (input)
         * @return {Vec3} out
         */
        static getTranslationing(mat, out) {
            out[0] = mat[12];
            out[1] = mat[13];
            out[2] = mat[14];
            return out;
        }
        /**
         * Returns the scaling factor component of a transformation matrix.
         * If a matrix is built with fromRotationTranslationScale with a
         * normalized Quaternion parameter, the returned vector will be
         * the same as the scaling vector originally supplied.
         * @param {Vec3} out Vector to receive scaling factor component
         * @param {Mat4} mat Matrix to be decomposed (input)
         * @return {Vec3} out
         */
        static getScaling(mat, out) {
            let m11 = mat[0];
            let m12 = mat[1];
            let m13 = mat[2];
            let m21 = mat[4];
            let m22 = mat[5];
            let m23 = mat[6];
            let m31 = mat[8];
            let m32 = mat[9];
            let m33 = mat[10];
            out[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
            out[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
            out[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
            return out;
        }
        static getMaxScaleOnAxis(mat) {
            let m11 = mat[0];
            let m12 = mat[1];
            let m13 = mat[2];
            let m21 = mat[4];
            let m22 = mat[5];
            let m23 = mat[6];
            let m31 = mat[8];
            let m32 = mat[9];
            let m33 = mat[10];
            let scaleX = m11 * m11 + m12 * m12 + m13 * m13;
            let scaleY = m21 * m21 + m22 * m22 + m23 * m23;
            let scaleZ = m31 * m31 + m32 * m32 + m33 * m33;
            return Math.sqrt(Math.max(scaleX, scaleY, scaleZ));
        }
        /**
         * Returns a Quaternion representing the rotational component
         *  of a transformation matrix. If a matrix is built with
         *  fromRotationTranslation, the returned Quaternion will be the
         *  same as the Quaternion originally supplied.
         * @param {Quat} out Quaternion to receive the rotation component
         * @param {Mat4} mat Matrix to be decomposed (input)
         * @return {Quat} out
         */
        static getRotation(mat, out) {
            // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
            let trace = mat[0] + mat[5] + mat[10];
            let S = 0;
            if (trace > 0) {
                S = Math.sqrt(trace + 1.0) * 2;
                out[3] = 0.25 * S;
                out[0] = (mat[6] - mat[9]) / S;
                out[1] = (mat[8] - mat[2]) / S;
                out[2] = (mat[1] - mat[4]) / S;
            }
            else if (mat[0] > mat[5] && mat[0] > mat[10]) {
                S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
                out[3] = (mat[6] - mat[9]) / S;
                out[0] = 0.25 * S;
                out[1] = (mat[1] + mat[4]) / S;
                out[2] = (mat[8] + mat[2]) / S;
            }
            else if (mat[5] > mat[10]) {
                S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
                out[3] = (mat[8] - mat[2]) / S;
                out[0] = (mat[1] + mat[4]) / S;
                out[1] = 0.25 * S;
                out[2] = (mat[6] + mat[9]) / S;
            }
            else {
                S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
                out[3] = (mat[1] - mat[4]) / S;
                out[0] = (mat[8] + mat[2]) / S;
                out[1] = (mat[6] + mat[9]) / S;
                out[2] = 0.25 * S;
            }
            return out;
        }
        /**
         * Creates a matrix from a Quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
         * This is equivalent to (but much faster than):
         *
         *     mat4.identity(dest);
         *     mat4.translate(dest, vec);
         *     mat4.translate(dest, origin);
         *     let QuatMat = mat4.create();
         *     Quat4.toMat4(Quat, QuatMat);
         *     mat4.multiply(dest, QuatMat);
         *     mat4.scale(dest, scale)
         *     mat4.translate(dest, negativeOrigin);
         *
         * @param {Mat4} out mat4 receiving operation result
         * @param {Quat} q Rotation Quaternion
         * @param {Vec3} v Translation vector
         * @param {Vec3} s Scaling vector
         * @param {Vec3} o The origin vector around which to scale and rotate
         * @returns {Mat4} out
         */
        static fromRotationTranslationScaleOrigin(q, v, s, o, out = Mat4.create()) {
            // Quaternion math
            let x = q[0], y = q[1], z = q[2], w = q[3];
            let x2 = x + x;
            let y2 = y + y;
            let z2 = z + z;
            let xx = x * x2;
            let xy = x * y2;
            let xz = x * z2;
            let yy = y * y2;
            let yz = y * z2;
            let zz = z * z2;
            let wx = w * x2;
            let wy = w * y2;
            let wz = w * z2;
            let sx = s[0];
            let sy = s[1];
            let sz = s[2];
            let ox = o[0];
            let oy = o[1];
            let oz = o[2];
            out[0] = (1 - (yy + zz)) * sx;
            out[1] = (xy + wz) * sx;
            out[2] = (xz - wy) * sx;
            out[3] = 0;
            out[4] = (xy - wz) * sy;
            out[5] = (1 - (xx + zz)) * sy;
            out[6] = (yz + wx) * sy;
            out[7] = 0;
            out[8] = (xz + wy) * sz;
            out[9] = (yz - wx) * sz;
            out[10] = (1 - (xx + yy)) * sz;
            out[11] = 0;
            out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
            out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
            out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
            out[15] = 1;
            return out;
        }
        /**
         * Calculates a 4x4 matrix from the given Quaternion
         *
         * @param {Mat4} out mat4 receiving operation result
         * @param {Quat} q Quaternion to create matrix from
         *
         * @returns {Mat4} out
         */
        static fromQuat(q, out = Mat4.create()) {
            let x = q[0], y = q[1], z = q[2], w = q[3];
            let x2 = x + x;
            let y2 = y + y;
            let z2 = z + z;
            let xx = x * x2;
            let yx = y * x2;
            let yy = y * y2;
            let zx = z * x2;
            let zy = z * y2;
            let zz = z * z2;
            let wx = w * x2;
            let wy = w * y2;
            let wz = w * z2;
            out[0] = 1 - yy - zz;
            out[1] = yx + wz;
            out[2] = zx - wy;
            out[3] = 0;
            out[4] = yx - wz;
            out[5] = 1 - xx - zz;
            out[6] = zy + wx;
            out[7] = 0;
            out[8] = zx + wy;
            out[9] = zy - wx;
            out[10] = 1 - xx - yy;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        }
        /**
         * Generates a frustum matrix with the given bounds
         *
         * @param out mat4 frustum matrix will be written into
         * @param left Left bound of the frustum
         * @param right Right bound of the frustum
         * @param bottom Bottom bound of the frustum
         * @param top Top bound of the frustum
         * @param near Near bound of the frustum
         * @param far Far bound of the frustum
         * @returns out
         */
        static frustum(left, right, bottom, top, near, far, out = Mat4.create()) {
            let rl = 1 / (right - left);
            let tb = 1 / (top - bottom);
            let nf = 1 / (near - far);
            out[0] = near * 2 * rl;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = near * 2 * tb;
            out[6] = 0;
            out[7] = 0;
            out[8] = (right + left) * rl;
            out[9] = (top + bottom) * tb;
            out[10] = (far + near) * nf;
            out[11] = -1;
            out[12] = 0;
            out[13] = 0;
            out[14] = far * near * 2 * nf;
            out[15] = 0;
            return out;
        }
        /**
         * Generates a look-at matrix with the given eye position, focal point, and up axis
         *
         * @param out mat4 frustum matrix will be written into
         * @param eye Position of the viewer
         * @param center Point the viewer is looking at
         * @param up Vec3 pointing up
         * @returns out
         */
        static lookAt(eye, center, up, out = Mat4.create()) {
            let x0 = void 0, x1 = void 0, x2 = void 0, y0 = void 0, y1 = void 0, y2 = void 0, z0 = void 0, z1 = void 0, z2 = void 0, len = void 0;
            let eyex = eye[0];
            let eyey = eye[1];
            let eyez = eye[2];
            let upx = up[0];
            let upy = up[1];
            let upz = up[2];
            let centerx = center[0];
            let centery = center[1];
            let centerz = center[2];
            if (Math.abs(eyex - centerx) < 0.000001 &&
                Math.abs(eyey - centery) < 0.000001 &&
                Math.abs(eyez - centerz) < 0.000001) {
                return Mat4.identity(out);
            }
            z0 = eyex - centerx;
            z1 = eyey - centery;
            z2 = eyez - centerz;
            len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
            z0 *= len;
            z1 *= len;
            z2 *= len;
            x0 = upy * z2 - upz * z1;
            x1 = upz * z0 - upx * z2;
            x2 = upx * z1 - upy * z0;
            len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
            if (!len) {
                x0 = 0;
                x1 = 0;
                x2 = 0;
            }
            else {
                len = 1 / len;
                x0 *= len;
                x1 *= len;
                x2 *= len;
            }
            y0 = z1 * x2 - z2 * x1;
            y1 = z2 * x0 - z0 * x2;
            y2 = z0 * x1 - z1 * x0;
            len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
            if (!len) {
                y0 = 0;
                y1 = 0;
                y2 = 0;
            }
            else {
                len = 1 / len;
                y0 *= len;
                y1 *= len;
                y2 *= len;
            }
            out[0] = x0;
            out[1] = y0;
            out[2] = z0;
            out[3] = 0;
            out[4] = x1;
            out[5] = y1;
            out[6] = z1;
            out[7] = 0;
            out[8] = x2;
            out[9] = y2;
            out[10] = z2;
            out[11] = 0;
            out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
            out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
            out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
            out[15] = 1;
            return out;
        }
        /**
         * Generates a matrix that makes something look at something else.
         *
         * @param {Mat4} out mat4 frustum matrix will be written into
         * @param {Vec3} eye Position of the viewer
         * @param {Vec3} center Point the viewer is looking at
         * @param {Vec3} up Vec3 pointing up
         * @returns {Mat4} out
         */
        static targetTo(eye, target, up, out) {
            let eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
            let z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
            let len = z0 * z0 + z1 * z1 + z2 * z2;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                z0 *= len;
                z1 *= len;
                z2 *= len;
            }
            let x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
            out[0] = x0;
            out[1] = x1;
            out[2] = x2;
            out[3] = 0;
            out[4] = z1 * x2 - z2 * x1;
            out[5] = z2 * x0 - z0 * x2;
            out[6] = z0 * x1 - z1 * x0;
            out[7] = 0;
            out[8] = z0;
            out[9] = z1;
            out[10] = z2;
            out[11] = 0;
            out[12] = eyex;
            out[13] = eyey;
            out[14] = eyez;
            out[15] = 1;
            return out;
        }
        /**
         * Returns a string representation of a mat4
         *
         * @param mat matrix to represent as a string
         * @returns string representation of the matrix
         */
        static str(a) {
            return ("mat4(" +
                a[0] +
                ", " +
                a[1] +
                ", " +
                a[2] +
                ", " +
                a[3] +
                ", " +
                a[4] +
                ", " +
                a[5] +
                ", " +
                a[6] +
                ", " +
                a[7] +
                ", " +
                a[8] +
                ", " +
                a[9] +
                ", " +
                a[10] +
                ", " +
                a[11] +
                ", " +
                a[12] +
                ", " +
                a[13] +
                ", " +
                a[14] +
                ", " +
                a[15] +
                ")");
        }
        /**
         * Returns Frobenius norm of a mat4
         *
         * @param a the matrix to calculate Frobenius norm of
         * @returns Frobenius norm
         */
        static frob(a) {
            return Math.sqrt(Math.pow(a[0], 2) +
                Math.pow(a[1], 2) +
                Math.pow(a[2], 2) +
                Math.pow(a[3], 2) +
                Math.pow(a[4], 2) +
                Math.pow(a[5], 2) +
                Math.pow(a[6], 2) +
                Math.pow(a[7], 2) +
                Math.pow(a[8], 2) +
                Math.pow(a[9], 2) +
                Math.pow(a[10], 2) +
                Math.pow(a[11], 2) +
                Math.pow(a[12], 2) +
                Math.pow(a[13], 2) +
                Math.pow(a[14], 2) +
                Math.pow(a[15], 2));
        }
        /**
         * Adds two mat4's
         *
         * @param {Mat4} out the receiving matrix
         * @param {Mat4} a the first operand
         * @param {Mat4} b the second operand
         * @returns {Mat4} out
         */
        static add(a, b, out = Mat4.create()) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            out[3] = a[3] + b[3];
            out[4] = a[4] + b[4];
            out[5] = a[5] + b[5];
            out[6] = a[6] + b[6];
            out[7] = a[7] + b[7];
            out[8] = a[8] + b[8];
            out[9] = a[9] + b[9];
            out[10] = a[10] + b[10];
            out[11] = a[11] + b[11];
            out[12] = a[12] + b[12];
            out[13] = a[13] + b[13];
            out[14] = a[14] + b[14];
            out[15] = a[15] + b[15];
            return out;
        }
        /**
         * Subtracts matrix b from matrix a
         *
         * @param {Mat4} out the receiving matrix
         * @param {Mat4} lhs the first operand
         * @param {Mat4} rhs the second operand
         * @returns {Mat4} out
         */
        static subtract(lhs, rhs, out = Mat4.create()) {
            out[0] = lhs[0] - rhs[0];
            out[1] = lhs[1] - rhs[1];
            out[2] = lhs[2] - rhs[2];
            out[3] = lhs[3] - rhs[3];
            out[4] = lhs[4] - rhs[4];
            out[5] = lhs[5] - rhs[5];
            out[6] = lhs[6] - rhs[6];
            out[7] = lhs[7] - rhs[7];
            out[8] = lhs[8] - rhs[8];
            out[9] = lhs[9] - rhs[9];
            out[10] = lhs[10] - rhs[10];
            out[11] = lhs[11] - rhs[11];
            out[12] = lhs[12] - rhs[12];
            out[13] = lhs[13] - rhs[13];
            out[14] = lhs[14] - rhs[14];
            out[15] = lhs[15] - rhs[15];
            return out;
        }
        /**
         * Subtracts matrix b from matrix a
         *
         * @param {Mat4} out the receiving matrix
         * @param {Mat4} a the first operand
         * @param {Mat4} b the second operand
         * @returns {Mat4} out
         */
        //public static sub(out: Mat4=Mat4.create(), a: mat4, b: mat4): mat4;
        /**
         * Multiply each element of the matrix by a scalar.
         *
         * @param {Mat4} out the receiving matrix
         * @param {Mat4} a the matrix to scale
         * @param {number} b amount to scale the matrix's elements by
         * @returns {Mat4} out
         */
        static multiplyScalar(a, b, out = Mat4.create()) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            out[3] = a[3] * b;
            out[4] = a[4] * b;
            out[5] = a[5] * b;
            out[6] = a[6] * b;
            out[7] = a[7] * b;
            out[8] = a[8] * b;
            out[9] = a[9] * b;
            out[10] = a[10] * b;
            out[11] = a[11] * b;
            out[12] = a[12] * b;
            out[13] = a[13] * b;
            out[14] = a[14] * b;
            out[15] = a[15] * b;
            return out;
        }
        /**
         * Adds two mat4's after multiplying each element of the second operand by a scalar value.
         *
         * @param {Mat4} out the receiving vector
         * @param {Mat4} a the first operand
         * @param {Mat4} b the second operand
         * @param {number} scale the amount to scale b's elements by before adding
         * @returns {Mat4} out
         */
        static multiplyScalarAndAdd(a, b, scale, out = Mat4.create()) {
            out[0] = a[0] + b[0] * scale;
            out[1] = a[1] + b[1] * scale;
            out[2] = a[2] + b[2] * scale;
            out[3] = a[3] + b[3] * scale;
            out[4] = a[4] + b[4] * scale;
            out[5] = a[5] + b[5] * scale;
            out[6] = a[6] + b[6] * scale;
            out[7] = a[7] + b[7] * scale;
            out[8] = a[8] + b[8] * scale;
            out[9] = a[9] + b[9] * scale;
            out[10] = a[10] + b[10] * scale;
            out[11] = a[11] + b[11] * scale;
            out[12] = a[12] + b[12] * scale;
            out[13] = a[13] + b[13] * scale;
            out[14] = a[14] + b[14] * scale;
            out[15] = a[15] + b[15] * scale;
            return out;
        }
        /**
         * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
         *
         * @param {Mat4} a The first matrix.
         * @param {Mat4} b The second matrix.
         * @returns {boolean} True if the matrices are equal, false otherwise.
         */
        static exactEquals(a, b) {
            return (a[0] === b[0] &&
                a[1] === b[1] &&
                a[2] === b[2] &&
                a[3] === b[3] &&
                a[4] === b[4] &&
                a[5] === b[5] &&
                a[6] === b[6] &&
                a[7] === b[7] &&
                a[8] === b[8] &&
                a[9] === b[9] &&
                a[10] === b[10] &&
                a[11] === b[11] &&
                a[12] === b[12] &&
                a[13] === b[13] &&
                a[14] === b[14] &&
                a[15] === b[15]);
        }
        /**
         * Returns whether or not the matrices have approximately the same elements in the same position.
         *
         * @param {Mat4} a The first matrix.
         * @param {Mat4} b The second matrix.
         * @returns {boolean} True if the matrices are equal, false otherwise.
         */
        static equals(a, b) {
            let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
            let a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
            let a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11];
            let a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
            let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
            let b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
            let b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
            let b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
            return (Math.abs(a0 - b0) <= EPSILON &&
                Math.abs(a1 - b1) <= EPSILON &&
                Math.abs(a2 - b2) <= EPSILON &&
                Math.abs(a3 - b3) <= EPSILON &&
                Math.abs(a4 - b4) <= EPSILON &&
                Math.abs(a5 - b5) <= EPSILON &&
                Math.abs(a6 - b6) <= EPSILON &&
                Math.abs(a7 - b7) <= EPSILON &&
                Math.abs(a8 - b8) <= EPSILON &&
                Math.abs(a9 - b9) <= EPSILON &&
                Math.abs(a10 - b10) <= EPSILON &&
                Math.abs(a11 - b11) <= EPSILON &&
                Math.abs(a12 - b12) <= EPSILON &&
                Math.abs(a13 - b13) <= EPSILON &&
                Math.abs(a14 - b14) <= EPSILON &&
                Math.abs(a15 - b15) <= EPSILON);
        }
        /**
         * 变换顶点
         * Transforms the point with a mat4.
         * 4th vector component is implicitly '1'
         *
         * @param out the receiving vector
         * @param a the vector to transform
         * @param m matrix to transform with
         * @returns out
         */
        static transformPoint(vector, mat, out) {
            let x = vector[0], y = vector[1], z = vector[2];
            let w = mat[3] * x + mat[7] * y + mat[11] * z + mat[15];
            w = w || 1.0;
            out[0] = (mat[0] * x + mat[4] * y + mat[8] * z + mat[12]) / w;
            out[1] = (mat[1] * x + mat[5] * y + mat[9] * z + mat[13]) / w;
            out[2] = (mat[2] * x + mat[6] * y + mat[10] * z + mat[14]) / w;
            return out;
        }
        /**
         * 变换向量
         * Transforms the Vec3 with a mat4.
         * 4th vector component is implicitly '1'
         *
         * @param out the receiving vector
         * @param a the vector to transform
         * @param m matrix to transform with
         * @returns out
         */
        static transformVector3(vector, mat, out) {
            let x = vector[0], y = vector[1], z = vector[2];
            out[0] = mat[0] * x + mat[4] * y + mat[8] * z;
            out[1] = mat[1] * x + mat[5] * y + mat[9] * z;
            out[2] = mat[2] * x + mat[6] * y + mat[10] * z;
            return out;
        }
        // /**
        //  * Generates a perspective projection matrix with the given bounds
        //  *
        //  * @param out mat4 frustum matrix will be written into
        //  * @param fovy Vertical field of view in radians
        //  * @param aspect Aspect rat typically viewport width/height
        //  * @param near Near bound of the frustum
        //  * @param far Far bound of the frustum
        //  * @returns out
        //  */
        static projectPerspectiveLH(fovy, aspect, near, far, out = Mat4.create()) {
            let f = 1.0 / Math.tan(fovy / 2);
            let nf = 1 / (near - far);
            out[0] = f / aspect;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = f;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = (far + near) * nf;
            out[11] = -1;
            out[12] = 0;
            out[13] = 0;
            out[14] = 2 * far * near * nf;
            out[15] = 0;
            return out;
        }
        /**
         * Generates a perspective projection matrix with the given bounds
         * @param fov 上下夹角
         * @param aspect 左右夹角
         * @param znear 近视点距离
         * @param zfar 远视点距离
         * @returns {Mat4} out
         */
        // static project_PerspectiveLH(fov: number, aspect: number, znear: number, zfar: number, out: Mat4=Mat4.create())
        // {
        //     let tan = 1.0 / (Math.tan(fov * 0.5));
        //     let nf=zfar / (znear - zfar);
        //     out[0] = tan / aspect;
        //     out[1] = out[2] = out[3] =out[4]=0;
        //     out[5] = tan;
        //     out[6] = out[7] = out[8] = out[9]=0;
        //     out[10] = -nf;
        //     out[11] = 1.0;
        //     out[12] = out[13] = out[15] = 0.0;
        //     out[14] = znear * nf;
        // }
        // /**
        //  * Generates a orthogonal projection matrix with the given bounds
        //  *
        //  * @param out mat4 frustum matrix will be written into
        //  * @param left Left bound of the frustum
        //  * @param right Right bound of the frustum
        //  * @param bottom Bottom bound of the frustum
        //  * @param top Top bound of the frustum
        //  * @param near Near bound of the frustum
        //  * @param far Far bound of the frustum
        //  * @returns out
        //  */
        // public static ortho(out: Mat4=Mat4.create(), left: number, right: number,
        //     bottom: number, top: number, near: number, far: number): mat4{
        //         let lr = 1 / (left - right);
        //         let bt = 1 / (bottom - top);
        //         let nf = 1 / (near - far);
        //         out[0] = -2 * lr;
        //         out[1] = 0;
        //         out[2] = 0;
        //         out[3] = 0;
        //         out[4] = 0;
        //         out[5] = -2 * bt;
        //         out[6] = 0;
        //         out[7] = 0;
        //         out[8] = 0;
        //         out[9] = 0;
        //         out[10] = 2 * nf;
        //         out[11] = 0;
        //         out[12] = (left + right) * lr;
        //         out[13] = (top + bottom) * bt;
        //         out[14] = (far + near) * nf;
        //         out[15] = 1;
        //         return out;
        //       }
        static projectOrthoLH(width, height, near, far, out = Mat4.create()) {
            let lr = -1 / width;
            let bt = -1 / height;
            let nf = 1 / (near - far);
            out[0] = -2 * lr;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = -2 * bt;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 2 * nf;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = (far + near) * nf;
            out[15] = 1;
            return out;
        }
        /**
         * Generates a orthogonal projection matrix with the given bounds
         * @param width 宽
         * @param height 高
         * @param znear 近视点
         * @param zfar 远视点
         * @param out
         */
        // static project_OrthoLH(width: number, height: number, znear: number, zfar: number, out: Mat4=Mat4.create())
        // {
        //     let hw = 2.0 / width;
        //     let hh = 2.0 / height;
        //     let id = 1.0 / (zfar - znear);
        //     let nid = znear / (znear - zfar);
        //     out[0]=hw;
        //     out[5]=hh;
        //     out[10]=id;
        //     out[11]=nid;
        //     out[15]=1;
        //     out[1]=out[2]=out[3]=out[4]=out[6]=out[7]=out[8]=out[8]=out[12]=out[13]=out[14]=0;
        // }
        /** ----------copy glmatrix
         * Creates a matrix from a Quaternion rotation, vector translation and vector scale
         *  This is equivalent to (but much faster than):
         * mat4.identity(dest);
         * mat4.translate(dest, vec);
         * let QuatMat = mat4.create();
         * Quat4.toMat4(Quat, QuatMat);
         * mat4.multiply(dest, QuatMat);
         * mat4.scale(dest, scale)
         *
         * @param pos Translation vector
         * @param scale Scaling vector
         * @param rot Rotation Quaternion
         * @param out
         */
        static RTS(pos, scale, rot, out = Mat4.create()) {
            let x = rot[0], y = rot[1], z = rot[2], w = rot[3];
            let x2 = x + x;
            let y2 = y + y;
            let z2 = z + z;
            let xx = x * x2;
            let xy = x * y2;
            let xz = x * z2;
            let yy = y * y2;
            let yz = y * z2;
            let zz = z * z2;
            let wx = w * x2;
            let wy = w * y2;
            let wz = w * z2;
            let sx = scale[0];
            let sy = scale[1];
            let sz = scale[2];
            out[0] = (1 - (yy + zz)) * sx;
            out[1] = (xy + wz) * sx;
            out[2] = (xz - wy) * sx;
            out[3] = 0;
            out[4] = (xy - wz) * sy;
            out[5] = (1 - (xx + zz)) * sy;
            out[6] = (yz + wx) * sy;
            out[7] = 0;
            out[8] = (xz + wy) * sz;
            out[9] = (yz - wx) * sz;
            out[10] = (1 - (xx + yy)) * sz;
            out[11] = 0;
            out[12] = pos[0];
            out[13] = pos[1];
            out[14] = pos[2];
            out[15] = 1;
            return out;
        }
        /**----copy glmatrix
         * Creates a matrix from a Quaternion rotation and vector translation
         * This is equivalent to (but much faster than):
         *
         *     mat4.identity(dest);
         *     mat4.translate(dest, vec);
         *     let QuatMat = mat4.create();
         *     Quat4.toMat4(Quat, QuatMat);
         *     mat4.multiply(dest, QuatMat);
         *
         * @param out mat4 receiving operation result
         * @param q Rotation Quaternion
         * @param v Translation vector
         * @returns out
         */
        static RT(q, v, out = Mat4.create()) {
            // Quaternion math
            let x = q[0], y = q[1], z = q[2], w = q[3];
            let x2 = x + x;
            let y2 = y + y;
            let z2 = z + z;
            let xx = x * x2;
            let xy = x * y2;
            let xz = x * z2;
            let yy = y * y2;
            let yz = y * z2;
            let zz = z * z2;
            let wx = w * x2;
            let wy = w * y2;
            let wz = w * z2;
            out[0] = 1 - (yy + zz);
            out[1] = xy + wz;
            out[2] = xz - wy;
            out[3] = 0;
            out[4] = xy - wz;
            out[5] = 1 - (xx + zz);
            out[6] = yz + wx;
            out[7] = 0;
            out[8] = xz + wy;
            out[9] = yz - wx;
            out[10] = 1 - (xx + yy);
            out[11] = 0;
            out[12] = v[0];
            out[13] = v[1];
            out[14] = v[2];
            out[15] = 1;
            return out;
        }
        /**use glmatrix separate function
         * Returns the translation、scale、rotation  component  of a transformation
         *
         * @param src
         * @param scale
         * @param rotation
         * @param translation
         */
        static decompose(src, scale, rotation, translation) {
            Mat4.getTranslationing(src, translation);
            Mat4.getScaling(src, scale);
            Mat4.getRotationing(src, rotation, scale);
        }
        /**
         * get normalize Quaternion with the given rotation matrix values
         * @param matrix defines the source matrix
         * @param result defines the target Quaternion
         */
        static getRotationing(matrix, result, scale = null) {
            let scalex = 1, scaley = 1, scalez = 1;
            if (scale == null) {
                scalex = Math.sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1] + matrix[2] * matrix[2]);
                scaley = Math.sqrt(matrix[4] * matrix[4] + matrix[5] * matrix[5] + matrix[6] * matrix[6]);
                scalez = Math.sqrt(matrix[8] * matrix[8] + matrix[9] * matrix[9] + matrix[10] * matrix[10]);
            }
            else {
                scalex = scale[0];
                scaley = scale[1];
                scalez = scale[2];
            }
            if (scale.x === 0 || scale.y === 0 || scale.z === 0) {
                result[0] = 0;
                result[1] = 0;
                result[2] = 0;
                result[3] = 1;
                return;
            }
            // var data = matrix.m;
            let m11 = matrix[0] / scalex, m12 = matrix[4] / scaley, m13 = matrix[8] / scalez;
            let m21 = matrix[1] / scalex, m22 = matrix[5] / scaley, m23 = matrix[9] / scalez;
            let m31 = matrix[2] / scalex, m32 = matrix[6] / scaley, m33 = matrix[10] / scalez;
            let trace = m11 + m22 + m33;
            let s;
            if (trace > 0) {
                s = 0.5 / Math.sqrt(trace + 1.0);
                result[3] = 0.25 / s;
                result[0] = (m32 - m23) * s;
                result[1] = (m13 - m31) * s;
                result[2] = (m21 - m12) * s;
            }
            else if (m11 > m22 && m11 > m33) {
                s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
                result[3] = (m32 - m23) / s;
                result[0] = 0.25 * s;
                result[1] = (m12 + m21) / s;
                result[2] = (m13 + m31) / s;
            }
            else if (m22 > m33) {
                s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
                result[3] = (m13 - m31) / s;
                result[0] = (m12 + m21) / s;
                result[1] = 0.25 * s;
                result[2] = (m23 + m32) / s;
            }
            else {
                s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
                result[3] = (m21 - m12) / s;
                result[0] = (m13 + m31) / s;
                result[1] = (m23 + m32) / s;
                result[2] = 0.25 * s;
            }
        }
    }
    Mat4.Recycle = [];
    Mat4.IDENTITY = Mat4.create();
    //# sourceMappingURL=mat4.js.map

    var VertexAttEnum;
    (function (VertexAttEnum) {
        VertexAttEnum["POSITION"] = "position";
        VertexAttEnum["TEXCOORD_0"] = "uv";
        VertexAttEnum["COLOR_0"] = "color";
        VertexAttEnum["NORMAL"] = "normal";
        VertexAttEnum["TANGENT"] = "tangent";
        VertexAttEnum["TEXCOORD_1"] = "uv1";
        VertexAttEnum["TEXCOORD_2"] = "uv2";
        VertexAttEnum["WEIGHTS_0"] = "skinWeight";
        VertexAttEnum["JOINTS_0"] = "skinIndex";
    })(VertexAttEnum || (VertexAttEnum = {}));
    (function (VertexAttEnum) {
        function fromShaderAttName(name) {
            //TODO
            return name;
        }
        VertexAttEnum.fromShaderAttName = fromShaderAttName;
        let locationId = 0;
        function regist(name) {
            attLocationMap[name] = locationId++;
        }
        VertexAttEnum.regist = regist;
        let attLocationMap = {};
        {
            regist(VertexAttEnum.POSITION);
            regist(VertexAttEnum.TEXCOORD_0);
            regist(VertexAttEnum.COLOR_0);
            regist(VertexAttEnum.NORMAL);
            regist(VertexAttEnum.TANGENT);
            regist(VertexAttEnum.JOINTS_0);
            regist(VertexAttEnum.WEIGHTS_0);
            regist(VertexAttEnum.TEXCOORD_1);
            regist(VertexAttEnum.TEXCOORD_2);
        }
        function toShaderLocation(type) {
            let location = attLocationMap[type];
            if (location == null) {
                console.warn(`regist new attribute Type: ${type}`);
                regist(type);
            }
            return attLocationMap[type];
        }
        VertexAttEnum.toShaderLocation = toShaderLocation;
    })(VertexAttEnum || (VertexAttEnum = {}));
    //# sourceMappingURL=VertexAttEnum.js.map

    var Private$1;
    (function (Private) {
        Private.min = Vec3.create(-999999, -999999, -999999);
        Private.max = Vec3.create(999999, 999999, 999999);
    })(Private$1 || (Private$1 = {}));
    class Bounds {
        constructor() {
            this.max = Vec3.create();
            this.min = Vec3.create();
            // centerPoint: Vec3 = Vec3.create();
            this._center = Vec3.create();
        }
        get centerPoint() {
            Vec3.center(this.min, this.max, this._center);
            return this._center;
        }
        setMaxPoint(pos) {
            Vec3.copy(pos, this.max);
        }
        setMinPoint(pos) {
            Vec3.copy(pos, this.min);
        }
        setFromPoints(pos) {
            for (let key in pos) {
                Vec3.min(this.min, pos[key], this.min);
                Vec3.max(this.max, pos[key], this.max);
            }
            // Vec3.center(this.minPoint, this.maxPoint, this.centerPoint);
            return this;
        }
        static fromVertexArray(vertexArr) {
            var _a;
            const { vertexAttributes } = vertexArr;
            return Bounds.fromTypedArray((_a = vertexAttributes[VertexAttEnum.POSITION]) === null || _a === void 0 ? void 0 : _a.vertexBuffer.typedArray);
        }
        static fromTypedArray(positions) {
            const bb = new Bounds();
            bb.setMinPoint(Private$1.max);
            bb.setMaxPoint(Private$1.min);
            for (let i = 0; i < positions.length; i += 3) {
                const x = positions[i];
                const y = positions[i + 1];
                const z = positions[i + 2];
                if (bb.min.x > x) {
                    bb.min.x = x;
                }
                if (bb.max.x < x) {
                    bb.max.x = x;
                }
                if (bb.min.y > y) {
                    bb.min.y = y;
                }
                if (bb.max.y < y) {
                    bb.max.y = y;
                }
                if (bb.min.z > z) {
                    bb.min.z = z;
                }
                if (bb.max.z < z) {
                    bb.max.z = z;
                }
            }
            return bb;
        }
        addAABB(box) {
            Vec3.min(this.min, box.min, this.min);
            Vec3.max(this.max, box.max, this.max);
            // Vec3.center(this.minPoint, this.maxPoint, this.centerPoint);
            return this;
        }
        beEmpty() {
            return (this.min[0] > this.max[0] ||
                this.min[1] > this.max[1] ||
                this.min[2] > this.max[2]);
        }
        containPoint(point) {
            return (point[0] >= this.min[0] &&
                point[0] <= this.max[0] &&
                point[1] >= this.min[1] &&
                point[1] <= this.max[1] &&
                point[2] >= this.min[2] &&
                point[2] <= this.max[2]);
        }
        intersect(box) {
            let interMin = box.min;
            let interMax = box.max;
            if (this.min[0] > interMax[0])
                return false;
            if (this.min[1] > interMax[1])
                return false;
            if (this.min[2] > interMax[2])
                return false;
            if (this.max[0] > interMin[0])
                return false;
            if (this.max[1] > interMin[1])
                return false;
            if (this.max[2] > interMin[2])
                return false;
            return true;
        }
        applyMatrix(mat) {
            if (this.beEmpty())
                return;
            let min = Vec3.create();
            let max = Vec3.create();
            min[0] += mat[12];
            max[0] += mat[12];
            min[1] += mat[13];
            max[1] += mat[13];
            min[2] += mat[14];
            max[2] += mat[14];
            for (let i = 0; i < 3; i++) {
                for (let k = 0; k < 3; k++) {
                    if (mat[k + i * 4] > 0) {
                        min[i] += mat[k + i * 4] * this.min[i];
                        max[i] += mat[k + i * 4] * this.max[i];
                    }
                    else {
                        min[i] += mat[k + i * 4] * this.max[i];
                        max[i] += mat[k + i * 4] * this.min[i];
                    }
                }
            }
            Vec3.recycle(this.min);
            Vec3.recycle(this.max);
            this.min = min;
            this.max = max;
        }
    }
    class BoundingSphere {
        constructor() {
            this.center = Vec3.create();
            this.radius = 0;
        }
        applyMatrix(mat) {
            Mat4.transformPoint(this.center, mat, this.center);
            this.radius = this.radius * Mat4.getMaxScaleOnAxis(mat);
        }
        setFromPoints(points, center = null) {
            if (center != null) {
                Vec3.copy(center, this.center);
            }
            else {
                let center = new Bounds().setFromPoints(points).centerPoint;
                Vec3.copy(center, this.center);
            }
            for (let i = 0; i < points.length; i++) {
                let dis = Vec3.distance(points[i], this.center);
                if (dis > this.radius) {
                    this.radius = dis;
                }
            }
        }
        static fromVertexArray(vertexArr, center = null) {
            var _a;
            const { vertexAttributes } = vertexArr;
            return BoundingSphere.fromTypedArray((_a = vertexAttributes[VertexAttEnum.POSITION]) === null || _a === void 0 ? void 0 : _a.vertexBuffer.typedArray);
        }
        static fromTypedArray(positions, center = null) {
            const bb = new BoundingSphere();
            if (center != null) {
                Vec3.copy(center, bb.center);
            }
            else {
                center = Bounds.fromTypedArray(positions).centerPoint;
                Vec3.copy(center, bb.center);
            }
            let x, y, z, xx, yy, zz, dis;
            for (let i = 0; i < positions.length; i += 3) {
                x = positions[i];
                y = positions[i + 1];
                z = positions[i + 2];
                xx = x - center.x;
                yy = y - center.y;
                zz = z - center.z;
                dis = Math.sqrt(x * x + y * y + z * z);
                if (dis > bb.radius) {
                    bb.radius = dis;
                }
            }
            return bb;
        }
        copyTo(to) {
            Vec3.copy(this.center, to.center);
            to.radius = this.radius;
        }
        clone() {
            let newSphere = BoundingSphere.create();
            this.copyTo(newSphere);
            return newSphere;
        }
        static create() {
            if (this.pool.length > 0) {
                return this.pool.pop();
            }
            else {
                return new BoundingSphere();
            }
        }
        static recycle(item) {
            this.pool.push(item);
        }
        static fromBoundingBox(box, result = new BoundingSphere()) {
            result.center = Vec3.clone(box.center);
            result.radius = Vec3.magnitude(box.halfSize);
            return result;
        }
    }
    BoundingSphere.pool = [];
    //# sourceMappingURL=Bounds.js.map

    class Rect extends Float32Array {
        constructor(x = 0, y = 0, w = 0, h = 0) {
            super(4);
            this[0] = x;
            this[1] = y;
            this[2] = w;
            this[3] = h;
        }
        get x() {
            return this[0];
        }
        set x(value) {
            this[0] = value;
        }
        get y() {
            return this[1];
        }
        set y(value) {
            this[1] = value;
        }
        get z() {
            return this[2];
        }
        set z(value) {
            this[2] = value;
        }
        get width() {
            return this[2] - this[0];
        }
        get height() {
            return this[3] - this[1];
        }
        get w() {
            return this[3];
        }
        set w(value) {
            this[3] = value;
        }
        static create(x = 0, y = 0, w = 0, h = 0) {
            if (Rect.Recycle && Rect.Recycle.length > 0) {
                let item = Rect.Recycle.pop();
                item[0] = x;
                item[1] = y;
                item[2] = w;
                item[3] = h;
                return item;
            }
            else {
                let item = new Rect(x, y, w, h);
                return item;
            }
        }
        static clone(from) {
            if (Rect.Recycle.length > 0) {
                let item = Rect.Recycle.pop();
                Rect.copy(from, item);
                return item;
            }
            else {
                let item = new Rect(from[0], from[1], from[2], from[3]);
                return item;
            }
        }
        static recycle(item) {
            Rect.Recycle.push(item);
        }
        static disposeRecycledItems() {
            Rect.Recycle.length = 0;
        }
        static copy(a, out) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        }
        static euqal(a, b) {
            if (a[0] != b[0])
                return false;
            if (a[1] != b[1])
                return false;
            if (a[2] != b[2])
                return false;
            if (a[3] != b[3])
                return false;
            return true;
        }
    }
    Rect.Recycle = [];
    Rect.Identity = new Rect(0, 0, 1, 1);
    //# sourceMappingURL=rect.js.map

    class UniformState {
        constructor() {
            this.viewPortPixel = new Rect(0, 0, 0, 0); //像素的viewport
            this._matrixNormalToworld = Mat4.create();
            this._matrixNormalToView = Mat4.create();
            this._matrixMV = Mat4.create();
            this._matMVP = Mat4.create();
            //matrixNormal: matrix = new matrix();
            //最多8灯，再多不管
            this.intLightCount = 0;
            this.vec4LightPos = new Float32Array(32);
            this.vec4LightDir = new Float32Array(32);
            this.floatLightSpotAngleCos = new Float32Array(8);
            this.lightmap = null;
            // lightShadowTex: RenderTexture[] = [];
        }
        get matrixNormalToworld() {
            Mat4.invert(this.matrixModel, this._matrixNormalToworld);
            Mat4.transpose(this._matrixNormalToworld, this._matrixNormalToworld);
            return this._matrixNormalToworld;
        }
        get matrixNormalToView() {
            Mat4.invert(this.matrixModelView, this._matrixNormalToView);
            Mat4.transpose(this._matrixNormalToView, this._matrixNormalToView);
            return this._matrixNormalToView;
        }
        get matrixModelView() {
            return Mat4.multiply(this.curCamera.viewMatrix, this.matrixModel, this._matrixMV);
        }
        get matrixModelViewProject() {
            return Mat4.multiply(this.curCamera.viewProjectMatrix, this.matrixModel, this._matMVP);
        }
        get matrixView() {
            return this.curCamera.viewMatrix;
        }
        get matrixProject() {
            return this.curCamera.projectMatrix;
        }
        get matrixViewProject() {
            return this.curCamera.viewProjectMatrix;
        }
        get fov() {
            return this.curCamera.fov;
        }
        get aspect() {
            return this.curCamera.aspect;
        }
    }
    //# sourceMappingURL=UniformState.js.map

    var SortTypeEnum;
    (function (SortTypeEnum) {
        SortTypeEnum[SortTypeEnum["MatLayerIndex"] = 16] = "MatLayerIndex";
        SortTypeEnum[SortTypeEnum["ShaderId"] = 8] = "ShaderId";
        SortTypeEnum[SortTypeEnum["Zdist_FrontToBack"] = 4] = "Zdist_FrontToBack";
    })(SortTypeEnum || (SortTypeEnum = {}));
    var Private$2;
    (function (Private) {
        Private.temptSphere = new BoundingSphere();
    })(Private$2 || (Private$2 = {}));
    class Render {
        constructor(device) {
            this.uniformState = new UniformState();
            this.device = device;
        }
        setCamera(camera) {
            this.uniformState.curCamera = camera;
            this.device.setClear(camera.enableClearDepth ? camera.dePthValue : null, camera.enableClearColor ? camera.backgroundColor : null, camera.enableClearStencil ? camera.stencilValue : null);
        }
        renderLayers(camera, layer) {
            if (layer.insCount == 0)
                return;
            var commands = layer.getSortedinsArr(camera);
            this.render(camera, commands);
        }
        render(camera, drawCalls, lights) {
            let culledDrawcalls = this.cull(camera, drawCalls);
            let drawcall, shader, uniforms, renderState;
            for (let i = 0; i < culledDrawcalls.length; i++) {
                drawcall = culledDrawcalls[i];
                this.uniformState.matrixModel = drawcall.worldMat;
                if (drawcall.material != Private$2.preMaterial || drawcall.material.beDirty) {
                    Private$2.preMaterial = drawcall.material;
                    drawcall.material.beDirty = false;
                    shader = drawcall.material.shader;
                    uniforms = drawcall.material.uniformParameters;
                    renderState = drawcall.material.renderState;
                    shader.bind(this.device);
                    shader.bindAutoUniforms(this.device, this.uniformState); //auto unfiorm
                    shader.bindManulUniforms(this.device, uniforms);
                    if (Private$2.preRenderState != renderState) {
                        this.device.setCullFaceState(renderState.cull.enabled, renderState.cull.cullBack);
                        this.device.setDepthState(renderState.depthWrite, renderState.depthTest.enabled, renderState.depthTest.depthFunc);
                        this.device.setColorMask(renderState.colorWrite.red, renderState.colorWrite.green, renderState.colorWrite.blue, renderState.colorWrite.alpha);
                        this.device.setBlendState(renderState.blend.enabled, renderState.blend.blendEquation, renderState.blend.blendSrc, renderState.blend.blendDst, renderState.blend.enableSeparateBlend, renderState.blend.blendAlphaEquation, renderState.blend.blendSrcAlpha, renderState.blend.blendDstAlpha);
                        this.device.setStencilState(renderState.stencilTest.enabled, renderState.stencilTest.stencilFunction, renderState.stencilTest.stencilRefValue, renderState.stencilTest.stencilMask, renderState.stencilTest.stencilFail, renderState.stencilTest.stencilFaileZpass, renderState.stencilTest.stencilPassZfail, renderState.stencilTest.enableSeparateStencil, renderState.stencilTest.stencilFunctionBack, renderState.stencilTest.stencilRefValueBack, renderState.stencilTest.stencilMaskBack, renderState.stencilTest.stencilFailBack, renderState.stencilTest.stencilFaileZpassBack, renderState.stencilTest.stencilPassZfailBack);
                    }
                }
                else {
                    shader = drawcall.material.shader;
                    shader.bindAutoUniforms(this.device, this.uniformState); //auto unfiorm
                }
                drawcall.geometry.bind(this.device);
                drawcall.geometry.draw(this.device, drawcall.instanceCount);
            }
        }
        /**
         * 使用camera cullingMask和frustum 剔除不可见物体
         * @param camera
         * @param drawCalls
         */
        cull(camera, drawCalls) {
            let visualArr = [];
            let { cullingMask, frustum } = camera;
            let drawcall;
            for (let i = 0; i < drawCalls.length; i++) {
                drawcall = drawCalls[i];
                if (!drawcall.bevisible || (drawcall.cullingMask != null && ((drawcall.cullingMask & cullingMask) == 0)))
                    continue;
                if (drawcall.enableCull) {
                    if (this.frustumCull(frustum, drawcall)) {
                        visualArr.push(drawcall);
                    }
                }
                else {
                    visualArr.push(drawcall);
                }
            }
            return visualArr;
        }
        frustumCull(frustum, drawcall) {
            // BoundingSphere.fromBoundingBox(drawcall.boundingBox, Private.temptSphere);
            return frustum.containSphere(drawcall.bounding, drawcall.worldMat);
        }
    }
    //# sourceMappingURL=Render.js.map

    var Private$3;
    (function (Private) {
        Private.sortByMatLayerIndex = (drawa, drawb) => {
            return drawa.material.layerIndex - drawb.material.layerIndex;
        };
        Private.sortByZdist_FrontToBack = (drawa, drawb) => {
            return drawa.zdist - drawb.zdist;
        };
        Private.sortByZdist_BackToFront = (drawa, drawb) => {
            return drawb.zdist - drawa.zdist;
        };
        Private.sortByMatSortId = (drawa, drawb) => {
            return drawb.material.sortId - drawb.material.sortId;
        };
        Private.sortTypeInfo = {};
        {
            Private.sortTypeInfo[SortTypeEnum.MatLayerIndex] = { sortFunc: Private.sortByMatLayerIndex };
            Private.sortTypeInfo[SortTypeEnum.ShaderId] = {
                sortFunc: Private.sortByMatSortId,
            };
            Private.sortTypeInfo[SortTypeEnum.Zdist_FrontToBack] = {
                sortFunc: Private.sortByZdist_FrontToBack,
                beforeSort: (ins, cam) => {
                    let camPos = cam.worldPos;
                    let camFwd = cam.forwardInword;
                    let i, drawCall, meshPos;
                    let tempx, tempy, tempz;
                    for (i = 0; i < ins.length; i++) {
                        drawCall = ins[i];
                        meshPos = drawCall.bounding.center;
                        tempx = meshPos.x - camPos.x;
                        tempy = meshPos.y - camPos.y;
                        tempz = meshPos.z - camPos.z;
                        drawCall.zdist = tempx * camFwd.x + tempy * camFwd.y + tempz * camFwd.z;
                    }
                }
            };
        }
    })(Private$3 || (Private$3 = {}));
    class LayerCollection {
        constructor(layer, sortType = 0) {
            this._insArr = [];
            // private onAdd: ((ins: MeshInstance) => void)[] = []
            // private onRemove: ((ins: MeshInstance) => void)[] = [];
            this.beforeSort = [];
            this.beDirty = true;
            this.markDirty = () => {
                this.beDirty = true;
            };
            this.layer = layer;
            // let func = () => { this.markDirty(); };
            let attch = (sortInfo) => {
                this.sortFunction = this.sortFunction != null ? this.sortFunction && sortInfo.sortFunc : sortInfo.sortFunc;
                // if (sortInfo?.eventFunc)
                // {
                //     this.onAdd.push((ins => { sortInfo?.eventFunc(ins).addEventListener(func) }))
                //     this.onRemove.push(ins => { sortInfo?.eventFunc(ins).removeEventListener(func) })
                // }
                if (sortInfo === null || sortInfo === void 0 ? void 0 : sortInfo.beforeSort) {
                    this.beforeSort.push((ins, cam) => { sortInfo === null || sortInfo === void 0 ? void 0 : sortInfo.beforeSort(ins, cam); this.markDirty(); });
                }
            };
            if (sortType & SortTypeEnum.MatLayerIndex) {
                let sortInfo = Private$3.sortTypeInfo[SortTypeEnum.MatLayerIndex];
                attch(sortInfo);
            }
            if (sortType & SortTypeEnum.ShaderId) {
                let sortInfo = Private$3.sortTypeInfo[SortTypeEnum.ShaderId];
                attch(sortInfo);
            }
        }
        getSortedinsArr(cam) {
            this.beforeSort.forEach(func => func(this._insArr, cam));
            if (this.beDirty && this.sortFunction) {
                this._insArr.sort(this.sortFunction);
            }
            return this._insArr;
        }
        get insCount() { return this._insArr.length; }
        ;
        add(newIns) {
            let index = this._insArr.indexOf(newIns);
            if (index == -1) {
                this._insArr.push(newIns);
                this.markDirty();
                // this.onAddMeshInstance.raiseEvent(newIns)
                // this.onAdd.forEach(func => func(newIns));
            }
        }
        remove(item) {
            let index = this._insArr.indexOf(item);
            if (index >= 0) {
                this._insArr.splice(index, 1);
                // this.onRemoveMeshInstance.raiseEvent(item);
                // this.onRemove.forEach(func => func(item));
            }
        }
    }
    //# sourceMappingURL=LayerCollection.js.map

    class LayerComposition {
        constructor() {
            this.layers = new Map();
            this.nolayers = new LayerCollection("nolayer");
            this.insMap = {};
            this.onInsDirty = (ins) => {
                var _a;
                let layer = (_a = ins.material) === null || _a === void 0 ? void 0 : _a.layer;
                let collection = this.insMap[ins.id];
                if (collection.layer != layer) {
                    collection.remove(ins);
                    if (layer != null) {
                        let layerCollection = this.layers.get(layer);
                        layerCollection.add(ins);
                        this.insMap[ins.id] = layerCollection;
                    }
                    else {
                        this.nolayers.add(ins);
                        this.insMap[ins.id] = this.nolayers;
                    }
                }
                this.insMap[ins.id].markDirty();
            };
            this.onInsDispose = (ins) => {
                this.removeMeshInstance(ins);
            };
            this._addLayer(RenderLayerEnum.Background);
            this._addLayer(RenderLayerEnum.Geometry, SortTypeEnum.MatLayerIndex | SortTypeEnum.ShaderId);
            this._addLayer(RenderLayerEnum.AlphaTest, SortTypeEnum.MatLayerIndex | SortTypeEnum.Zdist_FrontToBack);
            this._addLayer(RenderLayerEnum.Transparent, SortTypeEnum.MatLayerIndex | SortTypeEnum.Zdist_FrontToBack);
        }
        _addLayer(layer, sortType = 0) {
            if (!this.layers.has(layer)) {
                let collection = new LayerCollection(layer, sortType);
                this.layers.set(layer, collection);
            }
        }
        getlayers() {
            return Array.from(this.layers.values());
        }
        tryAddMeshInstance(ins) {
            var _a;
            if (this.insMap[ins.id] != null)
                return;
            let layer = (_a = ins.material) === null || _a === void 0 ? void 0 : _a.layer;
            if (layer == null) {
                this.nolayers.add(ins);
                this.insMap[ins.id] = this.nolayers;
            }
            else {
                let layerCollection = this.layers.get(layer);
                layerCollection.add(ins);
                this.insMap[ins.id] = layerCollection;
            }
            ins.onDirty.addEventListener(this.onInsDirty);
            ins.ondispose.addEventListener(this.onInsDispose);
        }
        removeMeshInstance(ins) {
            if (this.insMap[ins.id] == null)
                return;
            let layerCollection = this.insMap[ins.id];
            layerCollection.remove(ins);
            delete this.insMap[ins.id];
            ins.onDirty.removeEventListener(this.onInsDirty);
            ins.ondispose.removeEventListener(this.onInsDispose);
        }
    }
    //# sourceMappingURL=LayerComposition.js.map

    class Color extends Float32Array {
        constructor(r = 1, g, b = 1, a = 1) {
            super(4);
            this[0] = r;
            this[1] = g;
            this[2] = b;
            this[3] = a;
        }
        get r() {
            return this[0];
        }
        set r(value) {
            this[0] = value;
        }
        get g() {
            return this[1];
        }
        set g(value) {
            this[1] = value;
        }
        get b() {
            return this[2];
        }
        set b(value) {
            this[2] = value;
        }
        get a() {
            return this[3];
        }
        set a(value) {
            this[3] = value;
        }
        static create(r = 1, g = 1, b = 1, a = 1) {
            if (Color.Recycle && Color.Recycle.length > 0) {
                let item = Color.Recycle.pop();
                item[0] = r;
                item[1] = g;
                item[2] = b;
                item[3] = a;
                return item;
            }
            else {
                let item = new Color(r, g, b, a);
                return item;
            }
        }
        static random() {
            let item = new Color(Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, 1.0);
            return item;
        }
        static clone(from) {
            if (Color.Recycle.length > 0) {
                let item = Color.Recycle.pop();
                Color.copy(from, item);
                return item;
            }
            else {
                let item = new Color(from[0], from[1], from[2], from[3]);
                return item;
            }
        }
        static recycle(item) {
            Color.Recycle.push(item);
        }
        static disposeRecycledItems() {
            Color.Recycle.length = 0;
        }
        static setWhite(out) {
            out[0] = 1;
            out[1] = 1;
            out[2] = 1;
            out[3] = 1;
            return out;
        }
        static setBlack(out) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
        }
        static setGray(out) {
            out[0] = 0.5;
            out[1] = 0.5;
            out[2] = 0.5;
            out[3] = 1;
        }
        static multiply(srca, srcb, out) {
            out[0] = srca[0] * srcb[0];
            out[1] = srca[1] * srcb[1];
            out[2] = srca[2] * srcb[2];
            out[3] = srca[3] * srcb[3];
        }
        static scaleToRef(src, scale, out) {
            out[0] = src[0] * scale;
            out[1] = src[1] * scale;
            out[2] = src[2] * scale;
            out[3] = src[3] * scale;
        }
        static lerp(srca, srcb, t, out) {
            t = clamp(t);
            out[0] = t * (srcb[0] - srca[0]) + srca[0];
            out[1] = t * (srcb[1] - srca[1]) + srca[1];
            out[2] = t * (srcb[2] - srca[2]) + srca[2];
            out[3] = t * (srcb[3] - srca[3]) + srca[3];
        }
        /**
         * Copy the values from one color to another
         *
         * @param out the receiving vector
         * @param a the source vector
         * @returns out
         */
        static copy(a, out) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        }
        /**
         * Returns whether or not the vectors have approximately the same elements in the same color.
         *
         * @param {vec4} a The first vector.
         * @param {vec4} b The second vector.
         * @returns {boolean} True if the vectors are equal, false otherwise.
         */
        static equals(a, b) {
            let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
            let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
            return (Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
                Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
                Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
                Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)));
        }
    }
    Color.WHITE = new Color(1, 1, 1, 1);
    Color.Recycle = [];
    //# sourceMappingURL=color.js.map

    class Plane {
        constructor() {
            //ax+by+cz+d=0;
            this.normal = Vec3.create(0, 1, 0);
            this.constant = 0;
        }
        distanceToPoint(point) {
            return Vec3.dot(point, this.normal) + this.constant;
        }
        copy(to) {
            Vec3.copy(this.normal, to.normal);
            to.constant = this.constant;
        }
        setComponents(nx, ny, nz, ds) {
            this.normal[0] = nx;
            this.normal[1] = ny;
            this.normal[2] = nz;
            let inverseNormalLength = 1.0 / Vec3.magnitude(this.normal);
            Vec3.scale(this.normal, inverseNormalLength, this.normal);
            this.constant = ds * inverseNormalLength;
        }
    }
    //# sourceMappingURL=Plane.js.map

    class Frustum {
        constructor(p0 = null, p1 = null, p2 = null, p3 = null, p4 = null, p5 = null) {
            this.planes = [];
            this.planes[0] = p0 != null ? p0 : new Plane();
            this.planes[1] = p1 != null ? p1 : new Plane();
            this.planes[2] = p2 != null ? p2 : new Plane();
            this.planes[3] = p3 != null ? p3 : new Plane();
            this.planes[4] = p4 != null ? p4 : new Plane();
            this.planes[5] = p5 != null ? p5 : new Plane();
        }
        set(p0, p1, p2, p3, p4, p5) {
            this.planes[0].copy(p0);
            this.planes[1].copy(p1);
            this.planes[2].copy(p2);
            this.planes[3].copy(p3);
            this.planes[4].copy(p4);
            this.planes[5].copy(p5);
        }
        setFromMatrix(me) {
            let planes = this.planes;
            let me0 = me[0], me1 = me[1], me2 = me[2], me3 = me[3];
            let me4 = me[4], me5 = me[5], me6 = me[6], me7 = me[7];
            let me8 = me[8], me9 = me[9], me10 = me[10], me11 = me[11];
            let me12 = me[12], me13 = me[13], me14 = me[14], me15 = me[15];
            planes[0].setComponents(me3 - me0, me7 - me4, me11 - me8, me15 - me12);
            planes[1].setComponents(me3 + me0, me7 + me4, me11 + me8, me15 + me12);
            planes[2].setComponents(me3 + me1, me7 + me5, me11 + me9, me15 + me13);
            planes[3].setComponents(me3 - me1, me7 - me5, me11 - me9, me15 - me13);
            planes[4].setComponents(me3 - me2, me7 - me6, me11 - me10, me15 - me14);
            planes[5].setComponents(me3 + me2, me7 + me6, me11 + me10, me15 + me14);
            return this;
        }
        /**
         * 和包围球检测相交
         * @param sphere 包围球
         * @param mat 用于变换包围球
         */
        containSphere(sphere, mat = null) {
            let planes = this.planes;
            if (mat != null) {
                let clonesphere = sphere.clone();
                clonesphere.applyMatrix(mat);
                let center = clonesphere.center;
                let negRadius = -clonesphere.radius;
                for (let i = 0; i < 6; i++) {
                    let distance = planes[i].distanceToPoint(center);
                    if (distance < negRadius) {
                        return false;
                    }
                }
                BoundingSphere.recycle(sphere);
            }
            else {
                let center = sphere.center;
                let negRadius = -sphere.radius;
                for (let i = 0; i < 6; i++) {
                    let distance = planes[i].distanceToPoint(center);
                    if (distance < negRadius) {
                        return false;
                    }
                }
            }
            return true;
        }
    }
    //# sourceMappingURL=Frustum.js.map

    function createGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = (c == 'x') ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    //# sourceMappingURL=Utils.js.map

    class UniqueObject {
        constructor() {
            this.id = createGuid();
            this.ctorName = this.constructor.name;
        }
    }
    //# sourceMappingURL=UniqueObject.js.map

    var ProjectionEnum;
    (function (ProjectionEnum) {
        ProjectionEnum[ProjectionEnum["PERSPECTIVE"] = 0] = "PERSPECTIVE";
        ProjectionEnum[ProjectionEnum["ORTHOGRAPH"] = 1] = "ORTHOGRAPH";
    })(ProjectionEnum || (ProjectionEnum = {}));
    var ClearEnum;
    (function (ClearEnum) {
        ClearEnum[ClearEnum["COLOR"] = 1] = "COLOR";
        ClearEnum[ClearEnum["DEPTH"] = 2] = "DEPTH";
        ClearEnum[ClearEnum["STENCIL"] = 4] = "STENCIL";
        ClearEnum[ClearEnum["NONE"] = 0] = "NONE";
    })(ClearEnum || (ClearEnum = {}));
    class Camera extends UniqueObject {
        constructor() {
            super();
            this._projectionType = ProjectionEnum.PERSPECTIVE;
            //perspective 透视投影
            this._fov = Math.PI * 0.25; //透视投影的fov//verticle field of view
            /**
             * height
             */
            this._size = 2;
            this._near = 0.1;
            this._far = 1000;
            this._viewport = Rect.create(0, 0, 1, 1);
            this.backgroundColor = Color.create(0.3, 0.3, 0.3, 1);
            this.enableClearColor = true;
            this.dePthValue = 1.0;
            this.enableClearDepth = true;
            this.stencilValue = 0;
            this.enableClearStencil = false;
            this.priority = 0;
            this.cullingMask = CullingMask.default;
            this._aspect = 16 / 9;
            /**
             * 计算相机投影矩阵
             */
            this._Projectmatrix = Mat4.create();
            this._viewProjectMatrix = Mat4.create();
            this._viewMatrix = Mat4.create();
            this.projectMatBedirty = true;
            /**
             * this._frustum.setFromMatrix(this.viewProjectMatrix);
             */
            this._frustum = new Frustum();
            this.beActiveFrustum = true;
            this._forward = Vec3.create();
            Object.defineProperty(this._viewport, "x", {
                get: () => { return this._viewport[0]; },
                set: (value) => { this._viewport[0] = value; this.projectMatBedirty = true; }
            });
            Object.defineProperty(this._viewport, "y", {
                get: () => { return this._viewport[1]; },
                set: (value) => { this._viewport[1] = value; this.projectMatBedirty = true; }
            });
            Object.defineProperty(this._viewport, "z", {
                get: () => { return this._viewport[2]; },
                set: (value) => { this._viewport[2] = value; this.projectMatBedirty = true; }
            });
            Object.defineProperty(this._viewport, "w", {
                get: () => { return this._viewport[3]; },
                set: (value) => { this._viewport[3] = value; this.projectMatBedirty = true; }
            });
        }
        get projectionType() { return this._projectionType; }
        set projectionType(type) { this._projectionType = type; this.projectMatBedirty = true; }
        get fov() { return this._fov; }
        ;
        set fov(value) { this._fov = value; this.projectMatBedirty = true; }
        ;
        get size() { return this._size; }
        ;
        set size(value) { this._size = value; this.projectMatBedirty = true; }
        ;
        get near() { return this._near; }
        set near(val) {
            if (this._projectionType == ProjectionEnum.PERSPECTIVE && val < 0.01) {
                val = 0.01;
            }
            if (val >= this.far)
                val = this.far - 0.01;
            this._near = val;
            this.projectMatBedirty = true;
        }
        get far() { return this._far; }
        set far(val) {
            if (val <= this.near)
                val = this.near + 0.01;
            this._far = val;
            this.projectMatBedirty = true;
        }
        get viewport() { return this._viewport; }
        set viewport(value) { Rect.copy(value, this._viewport); this.projectMatBedirty = true; }
        get aspect() { return this._aspect; }
        set aspect(aspect) { this._aspect = aspect; this.projectMatBedirty = true; }
        get projectMatrix() {
            if (this.projectMatBedirty) {
                if (this._projectionType == ProjectionEnum.PERSPECTIVE) {
                    Mat4.projectPerspectiveLH(this._fov, (this._aspect * this._viewport.width) / this._viewport.height, this.near, this.far, this._Projectmatrix);
                }
                else {
                    Mat4.projectOrthoLH((this._size * (this._aspect * this._viewport.width)) / this._viewport.height, this._size, this.near, this.far, this._Projectmatrix);
                }
                this.projectMatBedirty = false;
            }
            return this._Projectmatrix;
        }
        get viewProjectMatrix() {
            if (this.projectMatBedirty || this.node.worldMatrixBedirty) {
                Mat4.multiply(this.projectMatrix, this.viewMatrix, this._viewProjectMatrix);
            }
            return this._viewProjectMatrix;
        }
        get viewMatrix() {
            if (this.node.worldMatrixBedirty) {
                let camworld = this.node.worldMatrix;
                //视矩阵刚好是摄像机世界矩阵的逆
                Mat4.invert(camworld, this._viewMatrix);
            }
            return this._viewMatrix;
        }
        get frustum() { return this._frustum; }
        get worldPos() { return this.node.worldPosition; }
        get forwardInword() {
            return this.node.getForwardInWorld(this._forward);
        }
    }
    /**
     * 渲染mask枚举
     */
    var CullingMask;
    (function (CullingMask) {
        CullingMask[CullingMask["ui"] = 1] = "ui";
        CullingMask[CullingMask["default"] = 2] = "default";
        CullingMask[CullingMask["editor"] = 4] = "editor";
        CullingMask[CullingMask["model"] = 8] = "model";
        CullingMask[CullingMask["everything"] = 4294967295] = "everything";
    })(CullingMask || (CullingMask = {}));
    //# sourceMappingURL=Camera.js.map

    //每个组件占据一个二级制位Bitkey, 每个system都有关联的component，组成一个UniteBitkey,每个entity的components同样会组成一个UniteBitkey;
    // 通过UniteBitkey 二进制比对来快速检验 entity是否含有system所关心的组件;
    //enity addcomponent时候将检查 相关system是否要管理此组件,关心的话就add到system中,这样就避免system的query过程.
    class Ecs {
        static addComp(entity, comp) {
            let compInfo = this.registedcomps[comp];
            if (compInfo == null)
                return;
            let newcomp = new compInfo.ctr();
            newcomp.entity = entity;
            entity[comp] = newcomp;
            let relatedSystem = compInfo.relatedSystem;
            relatedSystem.forEach(item => {
                if (entity._uniteBitkey.containe(item.uniteBitkey)) {
                    item.tryAddEntity(entity);
                }
            });
            entity._uniteBitkey.addBitKey(compInfo.bitKey);
            return newcomp;
        }
        static removeComp(entity, comp) {
            let component = entity[comp];
            if (component != null) {
                let relatedSystem = this.registedcomps[comp].relatedSystem;
                relatedSystem.forEach(item => {
                    item.tryRemoveEntity(entity);
                });
            }
        }
        static addSystem(system) {
            this.systems.push(system);
            system.caredComps.forEach(item => {
                this.registedcomps[item].relatedSystem.push(system);
            });
        }
    }
    Ecs.registedcomps = {};
    Ecs.registeComp = (comp) => {
        let target = comp.prototype;
        let compName = target.constructor.name;
        if (Ecs.registedcomps[compName] == null) {
            Ecs.registedcomps[compName] = { ctr: target.constructor, bitKey: Bitkey.create(), relatedSystem: [] };
        }
        else {
            throw new Error("重复注册组件: " + compName);
        }
    };
    Ecs.systems = [];
    // 每个组件占一个二进制位，50个二进制位作为一个group，如果component数量超过50的话。
    // Reference:https://stackoverflow.com/questions/2802957/number-of-bits-in-javascript-numbers
    class Bitkey {
        constructor(groupIndex, itemIndex) {
            this.groupIndex = groupIndex;
            this.itemIndex = itemIndex;
            this.value = 1 << itemIndex;
        }
        static create() {
            let newKey = this.currentItemIndex++;
            if (newKey > 50) {
                this.currentGroupIndex++;
                this.currentItemIndex = 0;
            }
            return new Bitkey(this.currentGroupIndex, this.currentItemIndex);
        }
    }
    Bitkey.currentGroupIndex = 0;
    Bitkey.currentItemIndex = 0;
    class UniteBitkey {
        constructor() {
            this.keysMap = {};
        }
        addBitKey(key) {
            let groupKey = key.groupIndex;
            if (this.keysMap[groupKey] == null) {
                this.keysMap[groupKey] = 0;
            }
            let currentValue = this.keysMap[groupKey];
            this.keysMap[groupKey] = currentValue | key.value;
        }
        removeBitKey(key) {
            let groupKey = key.groupIndex;
            let currentValue = this.keysMap[groupKey];
            this.keysMap[groupKey] = currentValue & ~key.value;
        }
        containe(otherKey) {
            let keys = Object.keys(otherKey.keysMap);
            let key, otherValue, thisValue, becontained;
            for (let i = 0; i < keys.length; i++) {
                key = keys[i];
                otherValue = otherKey.keysMap[key];
                thisValue = this.keysMap[key];
                becontained = thisValue != null && ((otherValue & thisValue) == otherValue);
                if (!becontained)
                    return false;
            }
            return true;
        }
    }
    //# sourceMappingURL=Ecs.js.map

    class Mat3 extends Float32Array {
        constructor() {
            super(9);
            this[0] = 1;
            this[4] = 1;
            this[8] = 1;
        }
        static create() {
            if (Mat3.Recycle && Mat3.Recycle.length > 0) {
                let item = Mat3.Recycle.pop();
                Mat3.identity(item);
                return item;
            }
            else {
                let item = new Float32Array(9);
                item[0] = 1;
                item[4] = 1;
                item[8] = 1;
                return item;
            }
        }
        static clone(from) {
            if (Mat3.Recycle.length > 0) {
                let item = Mat3.Recycle.pop();
                Mat3.copy(from, item);
                return item;
            }
            else {
                let out = new Float32Array(9);
                out[0] = from[0];
                out[1] = from[1];
                out[2] = from[2];
                out[3] = from[3];
                out[4] = from[4];
                out[5] = from[5];
                out[6] = from[6];
                out[7] = from[7];
                out[8] = from[8];
                return out;
            }
        }
        static recycle(item) {
            Mat3.Recycle.push(item);
        }
        static disposeRecycledItems() {
            Mat3.Recycle.length = 0;
        }
        /**
         * Copies the upper-left 3x3 values into the given mat3.
         *
         * @param {Mat3} out the receiving 3x3 matrix
         * @param {mat4} a   the source 4x4 matrix
         * @returns {Mat3} out
         */
        static fromMat4(a, out) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[4];
            out[4] = a[5];
            out[5] = a[6];
            out[6] = a[8];
            out[7] = a[9];
            out[8] = a[10];
            return out;
        }
        /**
         * Copy the values from one mat3 to another
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the source matrix
         * @returns {Mat3} out
         */
        static copy(a, out) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out;
        }
        /**
         * Set a mat3 to the identity matrix
         *
         * @param {Mat3} out the receiving matrix
         * @returns {Mat3} out
         */
        static identity(out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 1;
            out[5] = 0;
            out[6] = 0;
            out[7] = 0;
            out[8] = 1;
            return out;
        }
        /**
         * Transpose the values of a mat3
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the source matrix
         * @returns {Mat3} out
         */
        static transpose(a, out) {
            // If we are transposing ourselves we can skip a few steps but have to cache some values
            if (out === a) {
                let a01 = a[1], a02 = a[2], a12 = a[5];
                out[1] = a[3];
                out[2] = a[6];
                out[3] = a01;
                out[5] = a[7];
                out[6] = a02;
                out[7] = a12;
            }
            else {
                out[0] = a[0];
                out[1] = a[3];
                out[2] = a[6];
                out[3] = a[1];
                out[4] = a[4];
                out[5] = a[7];
                out[6] = a[2];
                out[7] = a[5];
                out[8] = a[8];
            }
            return out;
        }
        /**
         * Inverts a mat3
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the source matrix
         * @returns {Mat3} out
         */
        static invert(a, out) {
            let a00 = a[0], a01 = a[1], a02 = a[2];
            let a10 = a[3], a11 = a[4], a12 = a[5];
            let a20 = a[6], a21 = a[7], a22 = a[8];
            let b01 = a22 * a11 - a12 * a21;
            let b11 = -a22 * a10 + a12 * a20;
            let b21 = a21 * a10 - a11 * a20;
            // Calculate the determinant
            let det = a00 * b01 + a01 * b11 + a02 * b21;
            if (!det) {
                return null;
            }
            det = 1.0 / det;
            out[0] = b01 * det;
            out[1] = (-a22 * a01 + a02 * a21) * det;
            out[2] = (a12 * a01 - a02 * a11) * det;
            out[3] = b11 * det;
            out[4] = (a22 * a00 - a02 * a20) * det;
            out[5] = (-a12 * a00 + a02 * a10) * det;
            out[6] = b21 * det;
            out[7] = (-a21 * a00 + a01 * a20) * det;
            out[8] = (a11 * a00 - a01 * a10) * det;
            return out;
        }
        /**
         * Calculates the adjugate of a mat3
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the source matrix
         * @returns {Mat3} out
         */
        static adjoint(a, out) {
            let a00 = a[0], a01 = a[1], a02 = a[2];
            let a10 = a[3], a11 = a[4], a12 = a[5];
            let a20 = a[6], a21 = a[7], a22 = a[8];
            out[0] = a11 * a22 - a12 * a21;
            out[1] = a02 * a21 - a01 * a22;
            out[2] = a01 * a12 - a02 * a11;
            out[3] = a12 * a20 - a10 * a22;
            out[4] = a00 * a22 - a02 * a20;
            out[5] = a02 * a10 - a00 * a12;
            out[6] = a10 * a21 - a11 * a20;
            out[7] = a01 * a20 - a00 * a21;
            out[8] = a00 * a11 - a01 * a10;
            return out;
        }
        /**
         * Calculates the determinant of a mat3
         *
         * @param {Mat3} a the source matrix
         * @returns {Number} determinant of a
         */
        static determinant(a) {
            let a00 = a[0], a01 = a[1], a02 = a[2];
            let a10 = a[3], a11 = a[4], a12 = a[5];
            let a20 = a[6], a21 = a[7], a22 = a[8];
            return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
        }
        /**
         * Multiplies two mat3's
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the first operand
         * @param {Mat3} b the second operand
         * @returns {Mat3} out
         */
        static multiply(a, b, out) {
            let a00 = a[0], a01 = a[1], a02 = a[2];
            let a10 = a[3], a11 = a[4], a12 = a[5];
            let a20 = a[6], a21 = a[7], a22 = a[8];
            let b00 = b[0], b01 = b[1], b02 = b[2];
            let b10 = b[3], b11 = b[4], b12 = b[5];
            let b20 = b[6], b21 = b[7], b22 = b[8];
            out[0] = b00 * a00 + b01 * a10 + b02 * a20;
            out[1] = b00 * a01 + b01 * a11 + b02 * a21;
            out[2] = b00 * a02 + b01 * a12 + b02 * a22;
            out[3] = b10 * a00 + b11 * a10 + b12 * a20;
            out[4] = b10 * a01 + b11 * a11 + b12 * a21;
            out[5] = b10 * a02 + b11 * a12 + b12 * a22;
            out[6] = b20 * a00 + b21 * a10 + b22 * a20;
            out[7] = b20 * a01 + b21 * a11 + b22 * a21;
            out[8] = b20 * a02 + b21 * a12 + b22 * a22;
            return out;
        }
        /**
         * Translate a mat3 by the given vector
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the matrix to translate
         * @param {vec2} v vector to translate by
         * @returns {Mat3} out
         */
        static translate(a, v, out) {
            let a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], x = v[0], y = v[1];
            out[0] = a00;
            out[1] = a01;
            out[2] = a02;
            out[3] = a10;
            out[4] = a11;
            out[5] = a12;
            out[6] = x * a00 + y * a10 + a20;
            out[7] = x * a01 + y * a11 + a21;
            out[8] = x * a02 + y * a12 + a22;
            return out;
        }
        /**
         * Rotates a mat3 by the given angle
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {Mat3} out
         */
        static rotate(a, rad, out) {
            let a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], s = Math.sin(rad), c = Math.cos(rad);
            out[0] = c * a00 + s * a10;
            out[1] = c * a01 + s * a11;
            out[2] = c * a02 + s * a12;
            out[3] = c * a10 - s * a00;
            out[4] = c * a11 - s * a01;
            out[5] = c * a12 - s * a02;
            out[6] = a20;
            out[7] = a21;
            out[8] = a22;
            return out;
        }
        /**
         * Scales the mat3 by the dimensions in the given vec2
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the matrix to rotate
         * @param {vec2} v the vec2 to scale the matrix by
         * @returns {Mat3} out
         **/
        static scale(a, v, out) {
            let x = v[0], y = v[1];
            out[0] = x * a[0];
            out[1] = x * a[1];
            out[2] = x * a[2];
            out[3] = y * a[3];
            out[4] = y * a[4];
            out[5] = y * a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out;
        }
        /**
         * Creates a matrix from a vector translation
         * This is equivalent to (but much faster than):
         *
         *     mat3.identity(dest);
         *     mat3.translate(dest, dest, vec);
         *
         * @param {Mat3} out mat3 receiving operation result
         * @param {vec2} v Translation vector
         * @returns {Mat3} out
         */
        static fromTranslation(v, out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 1;
            out[5] = 0;
            out[6] = v[0];
            out[7] = v[1];
            out[8] = 1;
            return out;
        }
        /**
         * Creates a matrix from a given angle
         * This is equivalent to (but much faster than):
         *
         *     mat3.identity(dest);
         *     mat3.rotate(dest, dest, rad);
         *
         * @param {Mat3} out mat3 receiving operation result
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {Mat3} out
         */
        static fromRotation(rad, out) {
            let s = Math.sin(rad), c = Math.cos(rad);
            out[0] = c;
            out[1] = s;
            out[2] = 0;
            out[3] = -s;
            out[4] = c;
            out[5] = 0;
            out[6] = 0;
            out[7] = 0;
            out[8] = 1;
            return out;
        }
        /**
         * Creates a matrix from a vector scaling
         * This is equivalent to (but much faster than):
         *
         *     mat3.identity(dest);
         *     mat3.scale(dest, dest, vec);
         *
         * @param {Mat3} out mat3 receiving operation result
         * @param {vec2} v Scaling vector
         * @returns {Mat3} out
         */
        static fromScaling(v, out) {
            out[0] = v[0];
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = v[1];
            out[5] = 0;
            out[6] = 0;
            out[7] = 0;
            out[8] = 1;
            return out;
        }
        /**
         * Copies the values from a mat2d into a mat3
         *
         * @param {Mat3} out the receiving matrix
         * @param {mat2d} a the matrix to copy
         * @returns {Mat3} out
         **/
        static fromMat2d(a, out) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = 0;
            out[3] = a[2];
            out[4] = a[3];
            out[5] = 0;
            out[6] = a[4];
            out[7] = a[5];
            out[8] = 1;
            return out;
        }
        /**
         * Calculates a 3x3 matrix from the given quaternion
         *
         * @param {Mat3} out mat3 receiving operation result
         * @param {quat} q Quaternion to create matrix from
         *
         * @returns {Mat3} out
         */
        static fromQuat(q, out) {
            let x = q[0], y = q[1], z = q[2], w = q[3];
            let x2 = x + x;
            let y2 = y + y;
            let z2 = z + z;
            let xx = x * x2;
            let yx = y * x2;
            let yy = y * y2;
            let zx = z * x2;
            let zy = z * y2;
            let zz = z * z2;
            let wx = w * x2;
            let wy = w * y2;
            let wz = w * z2;
            out[0] = 1 - yy - zz;
            out[3] = yx - wz;
            out[6] = zx + wy;
            out[1] = yx + wz;
            out[4] = 1 - xx - zz;
            out[7] = zy - wx;
            out[2] = zx - wy;
            out[5] = zy + wx;
            out[8] = 1 - xx - yy;
            return out;
        }
        /**
         * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
         *
         * @param {Mat3} out mat3 receiving operation result
         * @param {mat4} a Mat4 to derive the normal matrix from
         *
         * @returns {Mat3} out
         */
        static normalFromMat4(a, out) {
            let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
            let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
            let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            let b00 = a00 * a11 - a01 * a10;
            let b01 = a00 * a12 - a02 * a10;
            let b02 = a00 * a13 - a03 * a10;
            let b03 = a01 * a12 - a02 * a11;
            let b04 = a01 * a13 - a03 * a11;
            let b05 = a02 * a13 - a03 * a12;
            let b06 = a20 * a31 - a21 * a30;
            let b07 = a20 * a32 - a22 * a30;
            let b08 = a20 * a33 - a23 * a30;
            let b09 = a21 * a32 - a22 * a31;
            let b10 = a21 * a33 - a23 * a31;
            let b11 = a22 * a33 - a23 * a32;
            // Calculate the determinant
            let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
            if (!det) {
                return null;
            }
            det = 1.0 / det;
            out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
            out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
            out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
            return out;
        }
        /**
         * Generates a 2D projection matrix with the given bounds
         *
         * @param {Mat3} out mat3 frustum matrix will be written into
         * @param {number} width Width of your gl context
         * @param {number} height Height of gl context
         * @returns {Mat3} out
         */
        static projection(width, height, out) {
            out[0] = 2 / width;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = -2 / height;
            out[5] = 0;
            out[6] = -1;
            out[7] = 1;
            out[8] = 1;
            return out;
        }
        /**
         * Returns a string representation of a mat3
         *
         * @param {Mat3} a matrix to represent as a string
         * @returns {String} string representation of the matrix
         */
        static str(a) {
            return ("mat3(" +
                a[0] +
                ", " +
                a[1] +
                ", " +
                a[2] +
                ", " +
                a[3] +
                ", " +
                a[4] +
                ", " +
                a[5] +
                ", " +
                a[6] +
                ", " +
                a[7] +
                ", " +
                a[8] +
                ")");
        }
        /**
         * Returns Frobenius norm of a mat3
         *
         * @param {Mat3} a the matrix to calculate Frobenius norm of
         * @returns {Number} Frobenius norm
         */
        static frob(a) {
            return Math.sqrt(Math.pow(a[0], 2) +
                Math.pow(a[1], 2) +
                Math.pow(a[2], 2) +
                Math.pow(a[3], 2) +
                Math.pow(a[4], 2) +
                Math.pow(a[5], 2) +
                Math.pow(a[6], 2) +
                Math.pow(a[7], 2) +
                Math.pow(a[8], 2));
        }
        /**
         * Adds two mat3's
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the first operand
         * @param {Mat3} b the second operand
         * @returns {Mat3} out
         */
        static add(a, b, out) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            out[3] = a[3] + b[3];
            out[4] = a[4] + b[4];
            out[5] = a[5] + b[5];
            out[6] = a[6] + b[6];
            out[7] = a[7] + b[7];
            out[8] = a[8] + b[8];
            return out;
        }
        /**
         * Subtracts matrix b from matrix a
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the first operand
         * @param {Mat3} b the second operand
         * @returns {Mat3} out
         */
        static subtract(a, b, out) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
            out[3] = a[3] - b[3];
            out[4] = a[4] - b[4];
            out[5] = a[5] - b[5];
            out[6] = a[6] - b[6];
            out[7] = a[7] - b[7];
            out[8] = a[8] - b[8];
            return out;
        }
        /**
         * Multiply each element of the matrix by a scalar.
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the matrix to scale
         * @param {Number} b amount to scale the matrix's elements by
         * @returns {Mat3} out
         */
        static multiplyScalar(a, b, out) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            out[3] = a[3] * b;
            out[4] = a[4] * b;
            out[5] = a[5] * b;
            out[6] = a[6] * b;
            out[7] = a[7] * b;
            out[8] = a[8] * b;
            return out;
        }
        /**
         * Adds two mat3's after multiplying each element of the second operand by a scalar value.
         *
         * @param {Mat3} out the receiving vector
         * @param {Mat3} a the first operand
         * @param {Mat3} b the second operand
         * @param {Number} scale the amount to scale b's elements by before adding
         * @returns {Mat3} out
         */
        static multiplyScalarAndAdd(a, b, scale, out) {
            out[0] = a[0] + b[0] * scale;
            out[1] = a[1] + b[1] * scale;
            out[2] = a[2] + b[2] * scale;
            out[3] = a[3] + b[3] * scale;
            out[4] = a[4] + b[4] * scale;
            out[5] = a[5] + b[5] * scale;
            out[6] = a[6] + b[6] * scale;
            out[7] = a[7] + b[7] * scale;
            out[8] = a[8] + b[8] * scale;
            return out;
        }
        /**
         * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
         *
         * @param {Mat3} a The first matrix.
         * @param {Mat3} b The second matrix.
         * @returns {Boolean} True if the matrices are equal, false otherwise.
         */
        static exactEquals(a, b) {
            return (a[0] === b[0] &&
                a[1] === b[1] &&
                a[2] === b[2] &&
                a[3] === b[3] &&
                a[4] === b[4] &&
                a[5] === b[5] &&
                a[6] === b[6] &&
                a[7] === b[7] &&
                a[8] === b[8]);
        }
        /**
         * Returns whether or not the matrices have approximately the same elements in the same position.
         *
         * @param {Mat3} a The first matrix.
         * @param {Mat3} b The second matrix.
         * @returns {Boolean} True if the matrices are equal, false otherwise.
         */
        static equals(a, b) {
            let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
            let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8];
            return (Math.abs(a0 - b0) <= EPSILON &&
                Math.abs(a1 - b1) <= EPSILON &&
                Math.abs(a2 - b2) <= EPSILON &&
                Math.abs(a3 - b3) <= EPSILON &&
                Math.abs(a4 - b4) <= EPSILON &&
                Math.abs(a5 - b5) <= EPSILON &&
                Math.abs(a6 - b6) <= EPSILON &&
                Math.abs(a7 - b7) <= EPSILON &&
                Math.abs(a8 - b8) <= EPSILON);
        }
    }
    Mat3.Recycle = [];
    //# sourceMappingURL=Mat3.js.map

    class Quat extends Float32Array {
        constructor() {
            super(4);
            // this[0]=0;
            // this[1]=0;
            // this[2]=0;
            this[3] = 1;
        }
        get x() {
            return this[0];
        }
        set x(value) {
            this[0] = value;
        }
        get y() {
            return this[1];
        }
        set y(value) {
            this[1] = value;
        }
        get z() {
            return this[2];
        }
        set z(value) {
            this[2] = value;
        }
        get w() {
            return this[3];
        }
        set w(value) {
            this[3] = value;
        }
        static create() {
            if (Quat.Recycle && Quat.Recycle.length > 0) {
                let item = Quat.Recycle.pop();
                Quat.identity(item);
                return item;
            }
            else {
                let item = new Quat();
                return item;
            }
        }
        static clone(from) {
            if (Quat.Recycle.length > 0) {
                let item = Quat.Recycle.pop();
                Quat.copy(from, item);
                return item;
            }
            else {
                let item = new Quat();
                item[0] = from[0];
                item[1] = from[1];
                item[2] = from[2];
                item[3] = from[3];
                return item;
            }
        }
        static recycle(item) {
            Quat.Recycle.push(item);
        }
        static disposeRecycledItems() {
            Quat.Recycle.length = 0;
        }
        /**
         * Copy the values from one Quat to another
         *
         * @param out the receiving Quaternion
         * @param a the source Quaternion
         * @returns out
         * @function
         */
        static copy(a, out = Quat.create()) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        }
        /**
         * Set a Quat to the identity Quaternion
         *
         * @param out the receiving Quaternion
         * @returns out
         */
        static identity(out = Quat.create()) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        }
        /**
         * Gets the rotation axis and angle for a given
         *  Quaternion. If a Quaternion is created with
         *  setAxisAngle, this method will return the same
         *  values as providied in the original parameter list
         *  OR functionally equivalent values.
         * Example: The Quaternion formed by axis [0, 0, 1] and
         *  angle -90 is the same as the Quaternion formed by
         *  [0, 0, 1] and 270. This method favors the latter.
         * @param  {Vec3} axis  Vector receiving the axis of rotation
         * @param  {Quat} q     Quaternion to be decomposed
         * @return {number}     Angle, in radians, of the rotation
         */
        static getAxisAngle(axis, q) {
            let rad = Math.acos(q[3]) * 2.0;
            let s = Math.sin(rad / 2.0);
            if (s != 0.0) {
                axis[0] = q[0] / s;
                axis[1] = q[1] / s;
                axis[2] = q[2] / s;
            }
            else {
                // If s is zero, return any axis (no rotation - axis does not matter)
                axis[0] = 1;
                axis[1] = 0;
                axis[2] = 0;
            }
            return rad;
        }
        /**
         * Adds two Quat's
         *
         * @param out the receiving Quaternion
         * @param a the first operand
         * @param b the second operand
         * @returns out
         * @function
         */
        static add(a, b, out = Quat.create()) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            out[3] = a[3] + b[3];
            return out;
        }
        /**
         * Multiplies two Quat's
         *
         * @param out the receiving Quaternion
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static multiply(a, b, out = Quat.create()) {
            let ax = a[0], ay = a[1], az = a[2], aw = a[3];
            let bx = b[0], by = b[1], bz = b[2], bw = b[3];
            out[0] = ax * bw + aw * bx + ay * bz - az * by;
            out[1] = ay * bw + aw * by + az * bx - ax * bz;
            out[2] = az * bw + aw * bz + ax * by - ay * bx;
            out[3] = aw * bw - ax * bx - ay * by - az * bz;
            return out;
        }
        /**
         * Scales a Quat by a scalar number
         *
         * @param out the receiving vector
         * @param a the vector to scale
         * @param b amount to scale the vector by
         * @returns out
         * @function
         */
        static scale(a, b, out = Quat.create()) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            out[3] = a[3] * b;
            return out;
        }
        /**
         * Calculates the length of a Quat
         *
         * @param a vector to calculate length of
         * @returns length of a
         * @function
         */
        static length_(a) {
            let x = a[0];
            let y = a[1];
            let z = a[2];
            let w = a[3];
            return Math.sqrt(x * x + y * y + z * z + w * w);
        }
        /**
         * Calculates the squared length of a Quat
         *
         * @param a vector to calculate squared length of
         * @returns squared length of a
         * @function
         */
        static squaredLength(a) {
            let x = a[0];
            let y = a[1];
            let z = a[2];
            let w = a[3];
            return x * x + y * y + z * z + w * w;
        }
        /**
         * Normalize a Quat
         *
         * @param out the receiving Quaternion
         * @param src Quaternion to normalize
         * @returns out
         * @function
         */
        static normalize(src, out = Quat.create()) {
            let x = src[0];
            let y = src[1];
            let z = src[2];
            let w = src[3];
            let len = x * x + y * y + z * z + w * w;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                out[0] = x * len;
                out[1] = y * len;
                out[2] = z * len;
                out[3] = w * len;
            }
            return out;
        }
        /**
         * Calculates the dot product of two Quat's
         *
         * @param a the first operand
         * @param b the second operand
         * @returns dot product of a and b
         * @function
         */
        static dot(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
        }
        /**
         * Performs a linear interpolation between two Quat's
         *
         * @param out the receiving Quaternion
         * @param a the first operand
         * @param b the second operand
         * @param t interpolation amount between the two inputs
         * @returns out
         * @function
         */
        static lerp(a, b, t, out = Quat.create()) {
            let ax = a[0];
            let ay = a[1];
            let az = a[2];
            let aw = a[3];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            out[2] = az + t * (b[2] - az);
            out[3] = aw + t * (b[3] - aw);
            return out;
        }
        /**
         * Performs a spherical linear interpolation between two Quat
         *
         * @param out the receiving Quaternion
         * @param a the first operand
         * @param b the second operand
         * @param t interpolation amount between the two inputs
         * @returns out
         */
        static slerp(a, b, t, out = Quat.create()) {
            // benchmarks:
            //    http://jsperf.com/Quaternion-slerp-implementations
            let ax = a[0], ay = a[1], az = a[2], aw = a[3];
            let bx = b[0], by = b[1], bz = b[2], bw = b[3];
            let omega = void 0, cosom = void 0, sinom = void 0, scale0 = void 0, scale1 = void 0;
            // calc cosine
            cosom = ax * bx + ay * by + az * bz + aw * bw;
            // adjust signs (if necessary)
            if (cosom < 0.0) {
                cosom = -cosom;
                bx = -bx;
                by = -by;
                bz = -bz;
                bw = -bw;
            }
            // calculate coefficients
            if (1.0 - cosom > 0.000001) {
                // standard case (slerp)
                omega = Math.acos(cosom);
                sinom = Math.sin(omega);
                scale0 = Math.sin((1.0 - t) * omega) / sinom;
                scale1 = Math.sin(t * omega) / sinom;
            }
            else {
                // "from" and "to" Quaternions are very close
                //  ... so we can do a linear interpolation
                scale0 = 1.0 - t;
                scale1 = t;
            }
            // calculate final values
            out[0] = scale0 * ax + scale1 * bx;
            out[1] = scale0 * ay + scale1 * by;
            out[2] = scale0 * az + scale1 * bz;
            out[3] = scale0 * aw + scale1 * bw;
            return out;
        }
        /**
         * Performs a spherical linear interpolation with two control points
         *
         * @param {Quat} out the receiving Quaternion
         * @param {Quat} a the first operand
         * @param {Quat} b the second operand
         * @param {Quat} c the third operand
         * @param {Quat} d the fourth operand
         * @param {number} t interpolation amount
         * @returns {Quat} out
         */
        static sqlerp(a, b, c, d, t, out = Quat.create()) {
            let temp1 = Quat.create();
            let temp2 = Quat.create();
            Quat.slerp(a, d, t, temp1);
            Quat.slerp(b, c, t, temp2);
            Quat.slerp(temp1, temp2, 2 * t * (1 - t), out);
            return out;
        }
        /**
         * Calculates the inverse of a Quat
         *
         * @param out the receiving Quaternion
         * @param a Quat to calculate inverse of
         * @returns out
         */
        static inverse(a, out = Quat.create()) {
            let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
            let dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
            let invDot = dot ? 1.0 / dot : 0;
            // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0
            out[0] = -a0 * invDot;
            out[1] = -a1 * invDot;
            out[2] = -a2 * invDot;
            out[3] = a3 * invDot;
            return out;
        }
        /**
         * Calculates the conjugate of a Quat
         * If the Quaternion is normalized, this function is faster than Quat.inverse and produces the same result.
         *
         * @param out the receiving Quaternion
         * @param a Quat to calculate conjugate of
         * @returns out
         */
        static conjugate(a, out = Quat.create()) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = a[3];
            return out;
        }
        /**
         * Returns a string representation of a Quaternion
         *
         * @param a Quat to represent as a string
         * @returns string representation of the Quat
         */
        static str(a) {
            return "Quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
        }
        /**
         * Rotates a Quaternion by the given angle about the X axis
         *
         * @param out Quat receiving operation result
         * @param a Quat to rotate
         * @param rad angle (in radians) to rotate
         * @returns out
         */
        static rotateX(a, rad, out = Quat.create()) {
            rad *= 0.5;
            let ax = a[0], ay = a[1], az = a[2], aw = a[3];
            let bx = Math.sin(rad), bw = Math.cos(rad);
            out[0] = ax * bw + aw * bx;
            out[1] = ay * bw + az * bx;
            out[2] = az * bw - ay * bx;
            out[3] = aw * bw - ax * bx;
            return out;
        }
        /**
         * Rotates a Quaternion by the given angle about the Y axis
         *
         * @param out Quat receiving operation result
         * @param a Quat to rotate
         * @param rad angle (in radians) to rotate
         * @returns out
         */
        static rotateY(a, rad, out = Quat.create()) {
            rad *= 0.5;
            let ax = a[0], ay = a[1], az = a[2], aw = a[3];
            let by = Math.sin(rad), bw = Math.cos(rad);
            out[0] = ax * bw - az * by;
            out[1] = ay * bw + aw * by;
            out[2] = az * bw + ax * by;
            out[3] = aw * bw - ay * by;
            return out;
        }
        /**
         * Rotates a Quaternion by the given angle about the Z axis
         *
         * @param out Quat receiving operation result
         * @param a Quat to rotate
         * @param rad angle (in radians) to rotate
         * @returns out
         */
        static rotateZ(a, rad, out = Quat.create()) {
            rad *= 0.5;
            let ax = a[0], ay = a[1], az = a[2], aw = a[3];
            let bz = Math.sin(rad), bw = Math.cos(rad);
            out[0] = ax * bw + ay * bz;
            out[1] = ay * bw - ax * bz;
            out[2] = az * bw + aw * bz;
            out[3] = aw * bw - az * bz;
            return out;
        }
        /**
         * Creates a Quaternion from the given 3x3 rotation matrix.
         *
         * NOTE: The resultant Quaternion is not normalized, so you should be sure
         * to renormalize the Quaternion yourself where necessary.
         *
         * @param out the receiving Quaternion
         * @param m rotation matrix
         * @returns out
         * @function
         */
        static fromMat3(m, out = Quat.create()) {
            // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
            // article "Quaternion Calculus and Fast Animation".
            let fTrace = m[0] + m[4] + m[8];
            let fRoot = void 0;
            if (fTrace > 0.0) {
                // |w| > 1/2, may as well choose w > 1/2
                fRoot = Math.sqrt(fTrace + 1.0); // 2w
                out[3] = 0.5 * fRoot;
                fRoot = 0.5 / fRoot; // 1/(4w)
                out[0] = (m[5] - m[7]) * fRoot;
                out[1] = (m[6] - m[2]) * fRoot;
                out[2] = (m[1] - m[3]) * fRoot;
            }
            else {
                // |w| <= 1/2
                let i = 0;
                if (m[4] > m[0])
                    i = 1;
                if (m[8] > m[i * 3 + i])
                    i = 2;
                let j = (i + 1) % 3;
                let k = (i + 2) % 3;
                fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
                out[i] = 0.5 * fRoot;
                fRoot = 0.5 / fRoot;
                out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
                out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
                out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
            }
            return out;
        }
        /**
         * Sets the specified Quaternion with values corresponding to the given
         * axes. Each axis is a Vec3 and is expected to be unit length and
         * perpendicular to all other specified axes.
         *
         * @param out the receiving Quat
         * @param view  the vector representing the viewing direction
         * @param right the vector representing the local "right" direction
         * @param up    the vector representing the local "up" direction
         * @returns out
         */
        static setAxes(view, right, up, out = Quat.create()) {
            let matr = Mat3.create();
            matr[0] = right[0];
            matr[3] = right[1];
            matr[6] = right[2];
            matr[1] = up[0];
            matr[4] = up[1];
            matr[7] = up[2];
            matr[2] = -view[0];
            matr[5] = -view[1];
            matr[8] = -view[2];
            Quat.fromMat3(matr, out);
            matr = null;
            return Quat.normalize(out, out);
        }
        /**
         * Calculates the W component of a Quat from the X, Y, and Z components.
         * Assumes that Quaternion is 1 unit in length.
         * Any existing W component will be ignored.
         *
         * @param out the receiving Quaternion
         * @param a Quat to calculate W component of
         * @returns out
         */
        static calculateW(a, out = Quat.create()) {
            let x = a[0], y = a[1], z = a[2];
            out[0] = x;
            out[1] = y;
            out[2] = z;
            out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
            return out;
        }
        /**
         * Returns whether or not the Quaternions have exactly the same elements in the same position (when compared with ===)
         *
         * @param {Quat} a The first vector.
         * @param {Quat} b The second vector.
         * @returns {boolean} True if the Quaternions are equal, false otherwise.
         */
        static exactEquals(a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
        }
        // /**
        //  * Returns whether or not the Quaternions have approximately the same elements in the same position.
        //  *
        //  * @param {Quat} a The first vector.
        //  * @param {Quat} b The second vector.
        //  * @returns {boolean} True if the Quaternions are equal, false otherwise.
        //  */
        // public static equals (a: Quat, b: Quat): boolean{
        //     let a0 = a[0],
        //     a1 = a[1],
        //     a2 = a[2],
        //     a3 = a[3];
        // let b0 = b[0],
        //     b1 = b[1],
        //     b2 = b[2],
        //     b3 = b[3];
        // return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
        // }
        static fromYawPitchRoll(yaw, pitch, roll, result) {
            // Produces a Quaternion from Euler angles in the z-y-x orientation (Tait-Bryan angles)
            let halfRoll = roll * 0.5;
            let halfPitch = pitch * 0.5;
            let halfYaw = yaw * 0.5;
            let sinRoll = Math.sin(halfRoll);
            let cosRoll = Math.cos(halfRoll);
            let sinPitch = Math.sin(halfPitch);
            let cosPitch = Math.cos(halfPitch);
            let sinYaw = Math.sin(halfYaw);
            let cosYaw = Math.cos(halfYaw);
            result[0] = cosYaw * sinPitch * cosRoll + sinYaw * cosPitch * sinRoll;
            result[1] = sinYaw * cosPitch * cosRoll - cosYaw * sinPitch * sinRoll;
            result[2] = cosYaw * cosPitch * sinRoll - sinYaw * sinPitch * cosRoll;
            result[3] = cosYaw * cosPitch * cosRoll + sinYaw * sinPitch * sinRoll;
        }
        /**舍弃glmatrix 的fromeuler  （坐标系不同算法不同）
         * Creates a Quaternion from the given euler angle x, y, z.
         * rot order： z-y-x
         * @param {x} Angle to rotate around X axis in degrees.（角度）
         * @param {y} Angle to rotate around Y axis in degrees.
         * @param {z} Angle to rotate around Z axis in degrees.
         * @param {Quat} out the receiving Quaternion
         * @returns {Quat} out
         * @function
         */
        static FromEuler(x, y, z, out = Quat.create()) {
            x *= (0.5 * Math.PI) / 180;
            y *= (0.5 * Math.PI) / 180;
            z *= (0.5 * Math.PI) / 180;
            let cosX = Math.cos(x), sinX = Math.sin(x);
            let cosY = Math.cos(y), sinY = Math.sin(y);
            let cosZ = Math.cos(z), sinZ = Math.sin(z);
            out[0] = sinX * cosY * cosZ + cosX * sinY * sinZ;
            out[1] = cosX * sinY * cosZ - sinX * cosY * sinZ;
            out[2] = cosX * cosY * sinZ - sinX * sinY * cosZ;
            out[3] = cosX * cosY * cosZ + sinX * sinY * sinZ;
            this.normalize(out, out);
            return out;
        }
        static ToEuler(src, out) {
            let x = src[0], y = src[1], z = src[2], w = src[3];
            let temp = 2.0 * (w * x - y * z);
            temp = clamp(temp, -1.0, 1.0);
            out[0] = Math.asin(temp);
            out[1] = Math.atan2(2.0 * (w * y + z * x), 1.0 - 2.0 * (y * y + x * x));
            out[2] = Math.atan2(2.0 * (w * z + y * x), 1.0 - 2.0 * (x * x + z * z));
            out[0] /= Math.PI / 180;
            out[1] /= Math.PI / 180;
            out[2] /= Math.PI / 180;
        }
        /**
         * Sets a Quat from the given angle and rotation axis,
         * then returns it.
         *
         * @param out the receiving Quaternion
         * @param axis the axis around which to rotate
         * @param rad （弧度）the angle in radians
         * @returns out
         **/
        static AxisAngle(axis, rad, out = Quat.create()) {
            rad = rad * 0.5;
            let s = Math.sin(rad);
            out[0] = s * axis[0];
            out[1] = s * axis[1];
            out[2] = s * axis[2];
            out[3] = Math.cos(rad);
            return out;
        }
        /**
         * Sets a Quaternion to represent the shortest rotation from one
         * vector to another.
         *
         * Both vectors are assumed to be unit length.
         *
         * @param out the receiving Quaternion.
         * @param from the initial vector
         * @param to the destination vector
         * @returns out
         */
        static rotationTo(from, to, out = Quat.create()) {
            let tmpVec3 = Vec3.create();
            let xUnitVec3 = Vec3.RIGHT;
            let yUnitVec3 = Vec3.UP;
            let dot = Vec3.dot(from, to);
            if (dot < -0.999999) {
                Vec3.cross(tmpVec3, xUnitVec3, from);
                if (Vec3.magnitude(tmpVec3) < 0.000001)
                    Vec3.cross(tmpVec3, yUnitVec3, from);
                Vec3.normalize(tmpVec3, tmpVec3);
                Quat.AxisAngle(tmpVec3, Math.PI, out);
                return out;
            }
            else if (dot > 0.999999) {
                out[0] = 0;
                out[1] = 0;
                out[2] = 0;
                out[3] = 1;
                return out;
            }
            else {
                Vec3.cross(tmpVec3, from, to);
                out[0] = tmpVec3[0];
                out[1] = tmpVec3[1];
                out[2] = tmpVec3[2];
                out[3] = 1 + dot;
                return Quat.normalize(out, out);
            }
        }
        static myLookRotation(dir, out = Quat.create(), up = Vec3.UP) {
            if (Vec3.exactEquals(dir, Vec3.ZERO)) {
                console.log("Zero direction in MyLookRotation");
                return Quat.norot;
            }
            if (!Vec3.exactEquals(dir, up)) {
                let tempv = Vec3.create();
                Vec3.scale(up, Vec3.dot(up, dir), tempv);
                Vec3.subtract(dir, tempv, tempv);
                let qu = Quat.create();
                this.rotationTo(Vec3.FORWARD, tempv, qu);
                let qu2 = Quat.create();
                this.rotationTo(tempv, dir, qu2);
                Quat.multiply(qu, qu2, out);
            }
            else {
                this.rotationTo(Vec3.FORWARD, dir, out);
            }
        }
        // /**
        //  *
        //  * @param pos transform self pos
        //  * @param targetpos targetpos
        //  * @param out
        //  * @param up
        //  */
        // static lookat(pos: Vec3, targetpos: Vec3, out: Quat = Quat.create(),up:Vec3=Vec3.UP)
        // {
        //     let baseDir=Vec3.BACKWARD;
        //     let dir = Vec3.create();
        //     Vec3.subtract(targetpos, pos, dir);
        //     Vec3.normalize(dir, dir);
        //     let dot = Vec3.dot(baseDir, dir);
        //     if (Math.abs(dot - (-1.0)) < 0.000001)
        //     {
        //         this.AxisAngle(Vec3.UP, Math.PI, out);
        //     }else if(Math.abs(dot - 1.0) < 0.000001)
        //     {
        //         Quat.identity(out);
        //     }else
        //     {
        //         dot = clamp(dot, -1, 1);
        //         let rotangle = Math.acos(dot);
        //         let rotAxis = Vec3.create();
        //         Vec3.cross(baseDir, dir, rotAxis);
        //         Vec3.normalize(rotAxis,rotAxis);
        //         Quat.AxisAngle(rotAxis, rotangle, out);
        //     }
        //     let targetdirx:Vec3=Vec3.create();
        //     Vec3.cross(up,out,targetdirx);
        //     let dotx = Vec3.dot(targetdirx,Vec3.RIGHT);
        //     let rot2=Quat.create();
        //     if (Math.abs(dotx - 1.0) < 0.000001)
        //     {
        //     }else if(Math.abs(dotx - 1.0) < 0.000001)
        //     {
        //         this.AxisAngle(Vec3.FORWARD, Math.PI, rot2);
        //         Quat.multiply(out,rot2,out);
        //     }else
        //     {
        //         let rotAxis=Vec3.create();
        //         Vec3.cross(Vec3.RIGHT,targetdirx,rotAxis);
        //         dotx = clamp(dotx, -1, 1);
        //         let rotangle = Math.acos(dotx);
        //         Quat.AxisAngle(rotAxis, rotangle, rot2);
        //         Quat.multiply(out,rot2,out);
        //     }
        //     Vec3.recycle(dir);
        //     // Vec3.recycle(rotAxis);
        //     // let dir = Vec3.create();
        //     // Vec3.subtract(targetpos, pos, dir);
        //     // Vec3.normalize(dir, dir);
        //     // this.rotationTo(Vec3.BACKWARD,dir,out);
        // }
        static LookRotation(lookAt, up = Vec3.UP) {
            /*Vector forward = lookAt.Normalized();
                Vector right = Vector::Cross(up.Normalized(), forward);
                Vector up = Vector::Cross(forward, right);*/
            // Vector forward = lookAt.Normalized();
            // Vector::OrthoNormalize(&up, &forward); // Keeps up the same, make forward orthogonal to up
            // Vector right = Vector::Cross(up, forward);
            // Quaternion ret;
            // ret.w = sqrtf(1.0f + right.x + up.y + forward.z) * 0.5f;
            // float w4_recip = 1.0f / (4.0f * ret.w);
            // ret.x = (forward.y - up.z) * w4_recip;
            // ret.y = (right.z - forward.x) * w4_recip;
            // ret.z = (up.x - right.y) * w4_recip;
            // return ret;
            let forward = Vec3.create();
            Vec3.normalize(lookAt, forward);
            let right = Vec3.create();
            Vec3.cross(up, forward, right);
        }
        static transformVector(src, vector, out) {
            var x1, y1, z1, w1;
            var x2 = vector[0], y2 = vector[1], z2 = vector[2];
            w1 = -src[0] * x2 - src[1] * y2 - src[2] * z2;
            x1 = src[3] * x2 + src[1] * z2 - src[2] * y2;
            y1 = src[3] * y2 - src[0] * z2 + src[2] * x2;
            z1 = src[3] * z2 + src[0] * y2 - src[1] * x2;
            out.x = -w1 * src[0] + x1 * src[3] - y1 * src[2] + z1 * src[1];
            out.y = -w1 * src[1] + x1 * src[2] + y1 * src[3] - z1 * src[0];
            out.z = -w1 * src[2] - x1 * src[1] + y1 * src[0] + z1 * src[3];
        }
        static fromUnitXYZ(xAxis, yAxis, zAxis, out = Quat.create()) {
            var m11 = xAxis[0], m12 = yAxis[0], m13 = zAxis[0];
            var m21 = xAxis[1], m22 = yAxis[1], m23 = zAxis[1];
            var m31 = xAxis[2], m32 = yAxis[2], m33 = zAxis[2];
            var trace = m11 + m22 + m33;
            var s;
            if (trace > 0) {
                s = 0.5 / Math.sqrt(trace + 1.0);
                out.w = 0.25 / s;
                out.x = (m32 - m23) * s;
                out.y = (m13 - m31) * s;
                out.z = (m21 - m12) * s;
            }
            else if (m11 > m22 && m11 > m33) {
                s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
                out.w = (m32 - m23) / s;
                out.x = 0.25 * s;
                out.y = (m12 + m21) / s;
                out.z = (m13 + m31) / s;
            }
            else if (m22 > m33) {
                s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
                out.w = (m13 - m31) / s;
                out.x = (m12 + m21) / s;
                out.y = 0.25 * s;
                out.z = (m23 + m32) / s;
            }
            else {
                s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
                out.w = (m21 - m12) / s;
                out.x = (m13 + m31) / s;
                out.y = (m23 + m32) / s;
                out.z = 0.25 * s;
            }
            return out;
        }
        static lookat(pos, targetpos, out = Quat.create(), up = Vec3.UP) {
            // let baseDir=Vec3.BACKWARD;
            let dirz = Vec3.create();
            Vec3.subtract(pos, targetpos, dirz);
            Vec3.normalize(dirz, dirz);
            let dirx = Vec3.create();
            Vec3.cross(up, dirz, dirx);
            Vec3.normalize(dirx, dirx);
            let diry = Vec3.create();
            Vec3.cross(dirz, dirx, diry);
            // Vec3.normalize(diry, diry);
            this.fromUnitXYZ(dirx, diry, dirz, out);
            Vec3.recycle(dirx);
            Vec3.recycle(diry);
            Vec3.recycle(dirz);
        }
        /**
         * Returns whether or not the vectors have approximately the same elements in the same Quat.
         *
         * @param {vec4} a The first vector.
         * @param {vec4} b The second vector.
         * @returns {boolean} True if the vectors are equal, false otherwise.
         */
        static equals(a, b) {
            let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
            let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
            return (Math.abs(a0 - b0) <= EPSILON &&
                Math.abs(a1 - b1) <= EPSILON &&
                Math.abs(a2 - b2) <= EPSILON &&
                Math.abs(a3 - b3) <= EPSILON);
        }
        /**
         *
         * @param from
         * @param to
         * @param out
         */
        static fromToRotation(from, to, out = Quat.create()) {
            let dir1 = Vec3.create();
            let dir2 = Vec3.create();
            Vec3.normalize(from, dir1);
            Vec3.normalize(to, dir2);
            let dir = Vec3.create();
            Vec3.cross(dir1, dir2, dir);
            if (Vec3.magnitude(dir) < 0.001) {
                Quat.identity(out);
            }
            else {
                Vec3.normalize(dir, dir);
                let dot = Vec3.dot(dir1, dir2);
                Quat.AxisAngle(dir, Math.acos(dot), out);
            }
            Vec3.recycle(dir);
            Vec3.recycle(dir1);
            Vec3.recycle(dir2);
            return out;
        }
    }
    Quat.Recycle = [];
    Quat.norot = Quat.create();
    //# sourceMappingURL=quat.js.map

    var DirtyFlagEnum;
    (function (DirtyFlagEnum) {
        DirtyFlagEnum[DirtyFlagEnum["WWORLD_POS"] = 4] = "WWORLD_POS";
        DirtyFlagEnum[DirtyFlagEnum["WORLD_ROTATION"] = 8] = "WORLD_ROTATION";
        DirtyFlagEnum[DirtyFlagEnum["WORLD_SCALE"] = 16] = "WORLD_SCALE";
        DirtyFlagEnum[DirtyFlagEnum["LOCALMAT"] = 1] = "LOCALMAT";
        DirtyFlagEnum[DirtyFlagEnum["WORLDMAT"] = 2] = "WORLDMAT";
    })(DirtyFlagEnum || (DirtyFlagEnum = {}));
    class Transform {
        constructor(name) {
            this.children = [];
            this.dirtyFlag = 0;
            this._localPosition = Vec3.create();
            this._localRotation = Quat.create();
            this._localScale = Vec3.create(1, 1, 1);
            this._localMatrix = Mat4.create();
            //-------------------------world属性--------------------------------------------------------------
            //------------------------------------------------------------------------------------------------
            //得到worldmatrix后，不会立刻decompse得到worldpos/worldscale/worldort,而是dirty标记起来.
            //setworld属性转换到setlocal属性
            //------------------------------------------------------------------------------------------------
            this._worldPosition = Vec3.create();
            this._worldRotation = Quat.create();
            this._worldScale = Vec3.create(1, 1, 1);
            this._worldMatrix = Mat4.create();
            this._worldTolocalMatrix = Mat4.create();
            this.name = name;
            //--------attach to dirty-------
            Object.defineProperty(this._localPosition, "x", {
                get: () => { return this._localPosition[0]; },
                set: value => { this._localPosition[0] = value; this.markDirty(); }
            });
            Object.defineProperty(this._localPosition, "y", {
                get: () => { return this._localPosition[1]; },
                set: value => { this._localPosition[1] = value; this.markDirty(); }
            });
            Object.defineProperty(this._localPosition, "z", {
                get: () => { return this._localPosition[2]; },
                set: value => { this._localPosition[2] = value; this.markDirty(); }
            });
            Object.defineProperty(this._localRotation, "x", {
                get: () => { return this._localRotation[0]; },
                set: value => { this._localRotation[0] = value; this.markDirty(); }
            });
            Object.defineProperty(this._localRotation, "y", {
                get: () => { return this._localRotation[1]; },
                set: value => { this._localRotation[1] = value; this.markDirty(); }
            });
            Object.defineProperty(this._localRotation, "z", {
                get: () => { return this._localRotation[2]; },
                set: value => { this._localRotation[2] = value; this.markDirty(); }
            });
            Object.defineProperty(this._localRotation, "w", {
                get: () => { return this._localRotation[3]; },
                set: value => { this._localRotation[3] = value; this.markDirty(); }
            });
            Object.defineProperty(this._localScale, "x", {
                get: () => { return this._localScale[0]; },
                set: value => { this._localScale[0] = value; this.markDirty(); }
            });
            Object.defineProperty(this._localScale, "y", {
                get: () => { return this._localScale[1]; },
                set: value => { this._localScale[1] = value; this.markDirty(); }
            });
            Object.defineProperty(this._localScale, "z", {
                get: () => { return this._localScale[2]; },
                set: value => { this._localScale[2] = value; this.markDirty(); }
            });
        }
        set localPosition(value) {
            Vec3.copy(value, this._localPosition);
            this.markDirty();
        }
        get localPosition() {
            return this._localPosition;
        }
        set localRotation(value) {
            Vec3.copy(value, this._localRotation);
            // this._localRotation = value;
            this.markDirty();
        }
        get localRotation() {
            return this._localRotation;
        }
        set localScale(value) {
            Vec3.copy(value, this._localScale);
            // this._localScale = value;
            this.markDirty();
        }
        get localScale() {
            return this._localScale;
        }
        set localMatrix(value) {
            this._localMatrix = value;
            Mat4.decompose(this._localMatrix, this._localScale, this._localRotation, this._localPosition);
            this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.LOCALMAT;
            this.dirtyFlag = this.dirtyFlag | DirtyFlagEnum.WORLDMAT;
            Transform.NotifyChildSelfDirty(this);
        }
        get localMatrix() {
            if (this.dirtyFlag & DirtyFlagEnum.LOCALMAT) {
                Mat4.RTS(this._localPosition, this._localScale, this._localRotation, this._localMatrix);
                this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.LOCALMAT;
            }
            return this._localMatrix;
        }
        get worldPosition() {
            if (this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.WWORLD_POS)) {
                Mat4.getTranslationing(this.worldMatrix, this._worldPosition);
                this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WWORLD_POS;
            }
            return this._worldPosition;
        }
        set worldPosition(value) {
            if (this.parent == null) {
                return;
            }
            if (this.parent.parent == null) {
                this._localPosition = value;
            }
            else {
                let invparentworld = Mat4.create();
                Mat4.invert(this.parent.worldMatrix, invparentworld);
                Mat4.transformPoint(value, invparentworld, this._localPosition);
                Mat4.recycle(invparentworld);
            }
            this.markDirty();
        }
        get worldRotation() {
            if (this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.WORLD_ROTATION)) {
                Mat4.getRotationing(this.worldMatrix, this._worldRotation, this.worldScale);
                this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLD_ROTATION;
            }
            return this._worldRotation;
        }
        set worldRotation(value) {
            if (this.parent == null) {
                return;
            }
            if (this.parent.parent == null) {
                this._localRotation = value;
            }
            else {
                let invparentworldrot = Quat.create();
                Quat.inverse(this.parent.worldRotation, invparentworldrot);
                Quat.multiply(invparentworldrot, value, this._localRotation);
                Quat.recycle(invparentworldrot);
            }
            this.markDirty();
        }
        get worldScale() {
            if (this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.WORLD_SCALE)) {
                Mat4.getScaling(this.worldMatrix, this._worldScale);
                this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLD_SCALE;
            }
            return this._worldScale;
        }
        set worldScale(value) {
            if (this.parent == null) {
                return;
            }
            if (this.parent.parent == null) {
                this._localScale = value;
            }
            else {
                Vec3.divide(value, this.parent.worldScale, this._localScale);
            }
            this.markDirty();
        }
        get worldMatrix() {
            if (this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.LOCALMAT)) {
                Mat4.multiply(this.parent.worldMatrix, this.localMatrix, this._worldMatrix);
                this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLDMAT;
                this.dirtyFlag =
                    this.dirtyFlag | DirtyFlagEnum.WORLD_ROTATION | DirtyFlagEnum.WORLD_SCALE | DirtyFlagEnum.WWORLD_POS;
            }
            return this._worldMatrix;
        }
        get worldMatrixBedirty() {
            return this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.LOCALMAT);
        }
        set worldMatrix(value) {
            if (this.parent == null) {
                return;
            }
            Mat4.copy(value, this._worldMatrix);
            if (this.parent.parent == null) {
                Mat4.copy(value, this.localMatrix);
                // this.localMatrix = this._localMatrix;
            }
            else {
                let invparentworld = Mat4.create();
                Mat4.invert(this.parent.worldMatrix, invparentworld);
                Mat4.multiply(invparentworld, value, this.localMatrix);
                // this.setlocalMatrix(this._localMatrix);
                Mat4.recycle(invparentworld);
            }
            this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLDMAT;
            this.dirtyFlag =
                this.dirtyFlag | DirtyFlagEnum.WORLD_ROTATION | DirtyFlagEnum.WORLD_SCALE | DirtyFlagEnum.WWORLD_POS;
        }
        get worldTolocalMatrix() {
            Mat4.invert(this.worldMatrix, this._worldTolocalMatrix);
            return this._worldTolocalMatrix;
        }
        /**
         * 通知子节点需要计算worldmatrix
         * @param node
         */
        static NotifyChildSelfDirty(node) {
            for (let child of node.children) {
                if (!(child.dirtyFlag & DirtyFlagEnum.WORLDMAT)) {
                    child.dirtyFlag = child.dirtyFlag | DirtyFlagEnum.WORLDMAT;
                    this.NotifyChildSelfDirty(child);
                }
            }
        }
        // private static linkRefScene(node: Transform, scene: Scene)
        // {
        //     if (node.refScene != scene)
        //     {
        //         node.refScene = scene;
        //         for (let child of node.children)
        //         {
        //             this.linkRefScene(child, scene);
        //         }
        //     }
        // }
        /**
         * 修改local属性后，标记dirty
         */
        markDirty() {
            this.dirtyFlag = this.dirtyFlag | DirtyFlagEnum.LOCALMAT | DirtyFlagEnum.WORLDMAT;
            Transform.NotifyChildSelfDirty(this);
        }
        ///------------------------------------------父子结构
        /**
         * 添加子物体实例
         */
        addChild(node) {
            if (node.parent != null) {
                node.parent.removeChild(node);
            }
            this.children.push(node);
            node.parent = this;
            node.markDirty();
            // Transform.linkRefScene(node, this.refScene);
        }
        /**
         * 移除所有子物体
         */
        removeAllChild() {
            //if(this.children==undefined||this.children.length==0) return;
            if (this.children.length == 0)
                return;
            for (let i = 0, len = this.children.length; i < len; i++) {
                this.children[i].parent = null;
            }
            this.children.length = 0;
        }
        /**
         * 移除指定子物体
         */
        removeChild(node) {
            if (node.parent != this || this.children.length == 0) {
                throw new Error("not my child.");
            }
            let i = this.children.indexOf(node);
            if (i >= 0) {
                this.children.splice(i, 1);
                node.parent = null;
            }
        }
        //-------易用性拓展
        /**
         * 获取世界坐标系下当前z轴的朝向
         */
        getForwardInWorld(out) {
            Mat4.transformVector3(Vec3.FORWARD, this.worldMatrix, out);
            Vec3.normalize(out, out);
            return out;
        }
        getRightInWorld(out) {
            Mat4.transformVector3(Vec3.RIGHT, this.worldMatrix, out);
            Vec3.normalize(out, out);
            return out;
        }
        getUpInWorld(out) {
            Mat4.transformVector3(Vec3.UP, this.worldMatrix, out);
            Vec3.normalize(out, out);
            return out;
        }
        moveInWorld(dir, amount) {
            let dirInLocal = Vec3.create();
            Mat4.transformVector3(dir, this.worldTolocalMatrix, dirInLocal);
            Vec3.AddscaledVec(this._localPosition, dirInLocal, amount, this._localPosition);
            this.markDirty();
            return this;
        }
        moveInlocal(dir, amount) {
            Vec3.AddscaledVec(this._localPosition, dir, amount, this._localPosition);
            this.markDirty();
            return this;
        }
        lookAtPoint(pos, up) {
            let dirz = Vec3.subtract(this.worldPosition, pos);
            Vec3.normalize(dirz, dirz);
            let dirx = Vec3.cross(up || Vec3.UP, dirz);
            if (Vec3.magnitude(dirx) == 0) {
                let dot = Vec3.dot(up || Vec3.UP, dirz);
                if (dot == 1) {
                    let currentDir = this.getForwardInWorld(Vec3.create());
                    this.worldRotation = Quat.fromToRotation(currentDir, dirz, this.worldRotation);
                }
            }
            else {
                Vec3.normalize(dirx, dirx);
                let diry = Vec3.cross(dirz, dirx);
                this.worldRotation = Quat.fromUnitXYZ(dirx, diry, dirz, this.worldRotation);
                Vec3.recycle(diry);
            }
            Vec3.recycle(dirz);
            Vec3.recycle(dirx);
        }
        lookAt(tran, up) {
            this.lookAtPoint(tran.worldPosition, up);
        }
        dispose() {
            this.parent = null;
            this.children = null;
        }
    }
    //# sourceMappingURL=Transform.js.map

    class RefData {
        constructor(data) {
            this.onDataChange = new EventHandler();
            this._data = data;
        }
        set data(value) {
            if (this._data != value) {
                let oldData = this._data;
                this._data = value;
                this.onDataChange.raiseEvent(value);
            }
        }
        ;
        get data() { return this._data; }
        ;
        destroy() {
            this._data = undefined;
            this.onDataChange.destroy();
            this.onDataChange = undefined;
        }
    }
    //# sourceMappingURL=RefData.js.map

    var Private$4;
    (function (Private) {
        Private.id = 0;
    })(Private$4 || (Private$4 = {}));
    class Entity extends Transform {
        constructor(name) {
            super();
            this.ref_beActive = new RefData(true);
            this._uniteBitkey = new UniteBitkey();
            this.name = name;
            this.id = Private$4.id++;
        }
        get beActive() { return this.ref_beActive.data; }
        ;
        set beActive(value) {
            this.ref_beActive.data = value;
        }
        addComponent(comp) {
            let newComp = Ecs.addComp(this, comp);
            return newComp;
        }
        getComponent(comp) { return this[comp]; }
        removeComponent(comp) {
            Ecs.removeComp(this, comp);
        }
        traverse(handler, includeSelf = true) {
            let _continue = true;
            if (includeSelf) {
                _continue = handler(this);
            }
            if (_continue !== false) {
                let child;
                for (let i = 0; i < this.children.length; i++) {
                    child = this.children[i];
                    child.traverse(handler, true);
                }
            }
        }
        clone() {
            //TODO
            return new Entity();
        }
    }
    //# sourceMappingURL=Entity.js.map

    class InterScene {
        constructor(render) {
            this.layers = new LayerComposition();
            this.cameras = new Map();
            this.preUpdate = new EventHandler();
            this.root = new Entity();
            this.render = render;
        }
        tryAddMeshInstance(ins) {
            this.layers.tryAddMeshInstance(ins);
        }
        removeMeshInstance(ins) {
            this.layers.removeMeshInstance(ins);
        }
        tryAddCamera(cam) {
            if (!this.cameras.has(cam.id)) {
                this.cameras.set(cam.id, cam);
            }
        }
        frameUpdate(delta) {
            this.preUpdate.raiseEvent(delta);
            this.cameras.forEach(cam => {
                this.render.setCamera(cam);
                this.layers.getlayers().forEach(layer => {
                    this.render.renderLayers(cam, layer);
                });
            });
        }
        createChild() {
            let trans = new Entity();
            this.root.addChild(trans);
            return trans;
        }
        addChild(item) {
            this.root.addChild(item);
        }
        createCamera() {
            let cam = new Camera();
            cam.node = this.createChild();
            this.tryAddCamera(cam);
            return cam;
        }
    }
    //# sourceMappingURL=Scene.js.map

    /**
     * Enum containing WebGL Constant values by name.
     * for use without an active WebGL context, or in cases where certain constants are unavailable using the WebGL context
     * (For example, in [Safari 9]{@link https://github.com/AnalyticalGraphicsInc/cesium/issues/2989}).
     *
     * These match the constants from the [WebGL 1.0]{@link https://www.khronos.org/registry/webgl/specs/latest/1.0/}
     * and [WebGL 2.0]{@link https://www.khronos.org/registry/webgl/specs/latest/2.0/}
     * specifications.
     */
    var GlConstants;
    (function (GlConstants) {
        GlConstants[GlConstants["DEPTH_BUFFER_BIT"] = 256] = "DEPTH_BUFFER_BIT";
        GlConstants[GlConstants["STENCIL_BUFFER_BIT"] = 1024] = "STENCIL_BUFFER_BIT";
        GlConstants[GlConstants["COLOR_BUFFER_BIT"] = 16384] = "COLOR_BUFFER_BIT";
        GlConstants[GlConstants["POINTS"] = 0] = "POINTS";
        GlConstants[GlConstants["LINES"] = 1] = "LINES";
        GlConstants[GlConstants["LINE_LOOP"] = 2] = "LINE_LOOP";
        GlConstants[GlConstants["LINE_STRIP"] = 3] = "LINE_STRIP";
        GlConstants[GlConstants["TRIANGLES"] = 4] = "TRIANGLES";
        GlConstants[GlConstants["TRIANGLE_STRIP"] = 5] = "TRIANGLE_STRIP";
        GlConstants[GlConstants["TRIANGLE_FAN"] = 6] = "TRIANGLE_FAN";
        GlConstants[GlConstants["ZERO"] = 0] = "ZERO";
        GlConstants[GlConstants["ONE"] = 1] = "ONE";
        GlConstants[GlConstants["SRC_COLOR"] = 768] = "SRC_COLOR";
        GlConstants[GlConstants["ONE_MINUS_SRC_COLOR"] = 769] = "ONE_MINUS_SRC_COLOR";
        GlConstants[GlConstants["SRC_ALPHA"] = 770] = "SRC_ALPHA";
        GlConstants[GlConstants["ONE_MINUS_SRC_ALPHA"] = 771] = "ONE_MINUS_SRC_ALPHA";
        GlConstants[GlConstants["DST_ALPHA"] = 772] = "DST_ALPHA";
        GlConstants[GlConstants["ONE_MINUS_DST_ALPHA"] = 773] = "ONE_MINUS_DST_ALPHA";
        GlConstants[GlConstants["DST_COLOR"] = 774] = "DST_COLOR";
        GlConstants[GlConstants["ONE_MINUS_DST_COLOR"] = 775] = "ONE_MINUS_DST_COLOR";
        GlConstants[GlConstants["SRC_ALPHA_SATURATE"] = 776] = "SRC_ALPHA_SATURATE";
        GlConstants[GlConstants["FUNC_ADD"] = 32774] = "FUNC_ADD";
        GlConstants[GlConstants["BLEND_EQUATION"] = 32777] = "BLEND_EQUATION";
        GlConstants[GlConstants["BLEND_EQUATION_RGB"] = 32777] = "BLEND_EQUATION_RGB";
        GlConstants[GlConstants["BLEND_EQUATION_ALPHA"] = 34877] = "BLEND_EQUATION_ALPHA";
        GlConstants[GlConstants["FUNC_SUBTRACT"] = 32778] = "FUNC_SUBTRACT";
        GlConstants[GlConstants["FUNC_REVERSE_SUBTRACT"] = 32779] = "FUNC_REVERSE_SUBTRACT";
        GlConstants[GlConstants["BLEND_DST_RGB"] = 32968] = "BLEND_DST_RGB";
        GlConstants[GlConstants["BLEND_SRC_RGB"] = 32969] = "BLEND_SRC_RGB";
        GlConstants[GlConstants["BLEND_DST_ALPHA"] = 32970] = "BLEND_DST_ALPHA";
        GlConstants[GlConstants["BLEND_SRC_ALPHA"] = 32971] = "BLEND_SRC_ALPHA";
        GlConstants[GlConstants["CONSTANT_COLOR"] = 32769] = "CONSTANT_COLOR";
        GlConstants[GlConstants["ONE_MINUS_CONSTANT_COLOR"] = 32770] = "ONE_MINUS_CONSTANT_COLOR";
        GlConstants[GlConstants["CONSTANT_ALPHA"] = 32771] = "CONSTANT_ALPHA";
        GlConstants[GlConstants["ONE_MINUS_CONSTANT_ALPHA"] = 32772] = "ONE_MINUS_CONSTANT_ALPHA";
        GlConstants[GlConstants["BLEND_COLOR"] = 32773] = "BLEND_COLOR";
        GlConstants[GlConstants["ARRAY_BUFFER"] = 34962] = "ARRAY_BUFFER";
        GlConstants[GlConstants["ELEMENT_ARRAY_BUFFER"] = 34963] = "ELEMENT_ARRAY_BUFFER";
        GlConstants[GlConstants["ARRAY_BUFFER_BINDING"] = 34964] = "ARRAY_BUFFER_BINDING";
        GlConstants[GlConstants["ELEMENT_ARRAY_BUFFER_BINDING"] = 34965] = "ELEMENT_ARRAY_BUFFER_BINDING";
        GlConstants[GlConstants["STREAM_DRAW"] = 35040] = "STREAM_DRAW";
        GlConstants[GlConstants["STATIC_DRAW"] = 35044] = "STATIC_DRAW";
        GlConstants[GlConstants["DYNAMIC_DRAW"] = 35048] = "DYNAMIC_DRAW";
        GlConstants[GlConstants["BUFFER_SIZE"] = 34660] = "BUFFER_SIZE";
        GlConstants[GlConstants["BUFFER_USAGE"] = 34661] = "BUFFER_USAGE";
        GlConstants[GlConstants["CURRENT_VERTEX_ATTRIB"] = 34342] = "CURRENT_VERTEX_ATTRIB";
        GlConstants[GlConstants["FRONT"] = 1028] = "FRONT";
        GlConstants[GlConstants["BACK"] = 1029] = "BACK";
        GlConstants[GlConstants["FRONT_AND_BACK"] = 1032] = "FRONT_AND_BACK";
        GlConstants[GlConstants["CULL_FACE"] = 2884] = "CULL_FACE";
        GlConstants[GlConstants["BLEND"] = 3042] = "BLEND";
        GlConstants[GlConstants["DITHER"] = 3024] = "DITHER";
        GlConstants[GlConstants["STENCIL_TEST"] = 2960] = "STENCIL_TEST";
        GlConstants[GlConstants["DEPTH_TEST"] = 2929] = "DEPTH_TEST";
        GlConstants[GlConstants["SCISSOR_TEST"] = 3089] = "SCISSOR_TEST";
        GlConstants[GlConstants["POLYGON_OFFSET_FILL"] = 32823] = "POLYGON_OFFSET_FILL";
        GlConstants[GlConstants["SAMPLE_ALPHA_TO_COVERAGE"] = 32926] = "SAMPLE_ALPHA_TO_COVERAGE";
        GlConstants[GlConstants["SAMPLE_COVERAGE"] = 32928] = "SAMPLE_COVERAGE";
        GlConstants[GlConstants["NO_ERROR"] = 0] = "NO_ERROR";
        GlConstants[GlConstants["INVALID_ENUM"] = 1280] = "INVALID_ENUM";
        GlConstants[GlConstants["INVALID_VALUE"] = 1281] = "INVALID_VALUE";
        GlConstants[GlConstants["INVALID_OPERATION"] = 1282] = "INVALID_OPERATION";
        GlConstants[GlConstants["OUT_OF_MEMORY"] = 1285] = "OUT_OF_MEMORY";
        GlConstants[GlConstants["CW"] = 2304] = "CW";
        GlConstants[GlConstants["CCW"] = 2305] = "CCW";
        GlConstants[GlConstants["LINE_WIDTH"] = 2849] = "LINE_WIDTH";
        GlConstants[GlConstants["ALIASED_POINT_SIZE_RANGE"] = 33901] = "ALIASED_POINT_SIZE_RANGE";
        GlConstants[GlConstants["ALIASED_LINE_WIDTH_RANGE"] = 33902] = "ALIASED_LINE_WIDTH_RANGE";
        GlConstants[GlConstants["CULL_FACE_MODE"] = 2885] = "CULL_FACE_MODE";
        GlConstants[GlConstants["FRONT_FACE"] = 2886] = "FRONT_FACE";
        GlConstants[GlConstants["DEPTH_RANGE"] = 2928] = "DEPTH_RANGE";
        GlConstants[GlConstants["DEPTH_WRITEMASK"] = 2930] = "DEPTH_WRITEMASK";
        GlConstants[GlConstants["DEPTH_CLEAR_VALUE"] = 2931] = "DEPTH_CLEAR_VALUE";
        GlConstants[GlConstants["DEPTH_FUNC"] = 2932] = "DEPTH_FUNC";
        GlConstants[GlConstants["STENCIL_CLEAR_VALUE"] = 2961] = "STENCIL_CLEAR_VALUE";
        GlConstants[GlConstants["STENCIL_FUNC"] = 2962] = "STENCIL_FUNC";
        GlConstants[GlConstants["STENCIL_FAIL"] = 2964] = "STENCIL_FAIL";
        GlConstants[GlConstants["STENCIL_PASS_DEPTH_FAIL"] = 2965] = "STENCIL_PASS_DEPTH_FAIL";
        GlConstants[GlConstants["STENCIL_PASS_DEPTH_PASS"] = 2966] = "STENCIL_PASS_DEPTH_PASS";
        GlConstants[GlConstants["STENCIL_REF"] = 2967] = "STENCIL_REF";
        GlConstants[GlConstants["STENCIL_VALUE_MASK"] = 2963] = "STENCIL_VALUE_MASK";
        GlConstants[GlConstants["STENCIL_WRITEMASK"] = 2968] = "STENCIL_WRITEMASK";
        GlConstants[GlConstants["STENCIL_BACK_FUNC"] = 34816] = "STENCIL_BACK_FUNC";
        GlConstants[GlConstants["STENCIL_BACK_FAIL"] = 34817] = "STENCIL_BACK_FAIL";
        GlConstants[GlConstants["STENCIL_BACK_PASS_DEPTH_FAIL"] = 34818] = "STENCIL_BACK_PASS_DEPTH_FAIL";
        GlConstants[GlConstants["STENCIL_BACK_PASS_DEPTH_PASS"] = 34819] = "STENCIL_BACK_PASS_DEPTH_PASS";
        GlConstants[GlConstants["STENCIL_BACK_REF"] = 36003] = "STENCIL_BACK_REF";
        GlConstants[GlConstants["STENCIL_BACK_VALUE_MASK"] = 36004] = "STENCIL_BACK_VALUE_MASK";
        GlConstants[GlConstants["STENCIL_BACK_WRITEMASK"] = 36005] = "STENCIL_BACK_WRITEMASK";
        GlConstants[GlConstants["VIEWPORT"] = 2978] = "VIEWPORT";
        GlConstants[GlConstants["SCISSOR_BOX"] = 3088] = "SCISSOR_BOX";
        GlConstants[GlConstants["COLOR_CLEAR_VALUE"] = 3106] = "COLOR_CLEAR_VALUE";
        GlConstants[GlConstants["COLOR_WRITEMASK"] = 3107] = "COLOR_WRITEMASK";
        GlConstants[GlConstants["UNPACK_ALIGNMENT"] = 3317] = "UNPACK_ALIGNMENT";
        GlConstants[GlConstants["PACK_ALIGNMENT"] = 3333] = "PACK_ALIGNMENT";
        GlConstants[GlConstants["MAX_TEXTURE_SIZE"] = 3379] = "MAX_TEXTURE_SIZE";
        GlConstants[GlConstants["MAX_VIEWPORT_DIMS"] = 3386] = "MAX_VIEWPORT_DIMS";
        GlConstants[GlConstants["SUBPIXEL_BITS"] = 3408] = "SUBPIXEL_BITS";
        GlConstants[GlConstants["RED_BITS"] = 3410] = "RED_BITS";
        GlConstants[GlConstants["GREEN_BITS"] = 3411] = "GREEN_BITS";
        GlConstants[GlConstants["BLUE_BITS"] = 3412] = "BLUE_BITS";
        GlConstants[GlConstants["ALPHA_BITS"] = 3413] = "ALPHA_BITS";
        GlConstants[GlConstants["DEPTH_BITS"] = 3414] = "DEPTH_BITS";
        GlConstants[GlConstants["STENCIL_BITS"] = 3415] = "STENCIL_BITS";
        GlConstants[GlConstants["POLYGON_OFFSET_UNITS"] = 10752] = "POLYGON_OFFSET_UNITS";
        GlConstants[GlConstants["POLYGON_OFFSET_FACTOR"] = 32824] = "POLYGON_OFFSET_FACTOR";
        GlConstants[GlConstants["TEXTURE_BINDING_2D"] = 32873] = "TEXTURE_BINDING_2D";
        GlConstants[GlConstants["SAMPLE_BUFFERS"] = 32936] = "SAMPLE_BUFFERS";
        GlConstants[GlConstants["SAMPLES"] = 32937] = "SAMPLES";
        GlConstants[GlConstants["SAMPLE_COVERAGE_VALUE"] = 32938] = "SAMPLE_COVERAGE_VALUE";
        GlConstants[GlConstants["SAMPLE_COVERAGE_INVERT"] = 32939] = "SAMPLE_COVERAGE_INVERT";
        GlConstants[GlConstants["COMPRESSED_TEXTURE_FORMATS"] = 34467] = "COMPRESSED_TEXTURE_FORMATS";
        GlConstants[GlConstants["DONT_CARE"] = 4352] = "DONT_CARE";
        GlConstants[GlConstants["FASTEST"] = 4353] = "FASTEST";
        GlConstants[GlConstants["NICEST"] = 4354] = "NICEST";
        GlConstants[GlConstants["GENERATE_MIPMAP_HINT"] = 33170] = "GENERATE_MIPMAP_HINT";
        GlConstants[GlConstants["BYTE"] = 5120] = "BYTE";
        GlConstants[GlConstants["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
        GlConstants[GlConstants["SHORT"] = 5122] = "SHORT";
        GlConstants[GlConstants["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
        GlConstants[GlConstants["INT"] = 5124] = "INT";
        GlConstants[GlConstants["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
        GlConstants[GlConstants["FLOAT"] = 5126] = "FLOAT";
        GlConstants[GlConstants["DEPTH_COMPONENT"] = 6402] = "DEPTH_COMPONENT";
        GlConstants[GlConstants["ALPHA"] = 6406] = "ALPHA";
        GlConstants[GlConstants["RGB"] = 6407] = "RGB";
        GlConstants[GlConstants["RGBA"] = 6408] = "RGBA";
        GlConstants[GlConstants["LUMINANCE"] = 6409] = "LUMINANCE";
        GlConstants[GlConstants["LUMINANCE_ALPHA"] = 6410] = "LUMINANCE_ALPHA";
        GlConstants[GlConstants["UNSIGNED_SHORT_4_4_4_4"] = 32819] = "UNSIGNED_SHORT_4_4_4_4";
        GlConstants[GlConstants["UNSIGNED_SHORT_5_5_5_1"] = 32820] = "UNSIGNED_SHORT_5_5_5_1";
        GlConstants[GlConstants["UNSIGNED_SHORT_5_6_5"] = 33635] = "UNSIGNED_SHORT_5_6_5";
        GlConstants[GlConstants["FRAGMENT_SHADER"] = 35632] = "FRAGMENT_SHADER";
        GlConstants[GlConstants["VERTEX_SHADER"] = 35633] = "VERTEX_SHADER";
        GlConstants[GlConstants["MAX_VERTEX_ATTRIBS"] = 34921] = "MAX_VERTEX_ATTRIBS";
        GlConstants[GlConstants["MAX_VERTEX_UNIFORM_VECTORS"] = 36347] = "MAX_VERTEX_UNIFORM_VECTORS";
        GlConstants[GlConstants["MAX_VARYING_VECTORS"] = 36348] = "MAX_VARYING_VECTORS";
        GlConstants[GlConstants["MAX_COMBINED_TEXTURE_IMAGE_UNITS"] = 35661] = "MAX_COMBINED_TEXTURE_IMAGE_UNITS";
        GlConstants[GlConstants["MAX_VERTEX_TEXTURE_IMAGE_UNITS"] = 35660] = "MAX_VERTEX_TEXTURE_IMAGE_UNITS";
        GlConstants[GlConstants["MAX_TEXTURE_IMAGE_UNITS"] = 34930] = "MAX_TEXTURE_IMAGE_UNITS";
        GlConstants[GlConstants["MAX_FRAGMENT_UNIFORM_VECTORS"] = 36349] = "MAX_FRAGMENT_UNIFORM_VECTORS";
        GlConstants[GlConstants["SHADER_TYPE"] = 35663] = "SHADER_TYPE";
        GlConstants[GlConstants["DELETE_STATUS"] = 35712] = "DELETE_STATUS";
        GlConstants[GlConstants["LINK_STATUS"] = 35714] = "LINK_STATUS";
        GlConstants[GlConstants["VALIDATE_STATUS"] = 35715] = "VALIDATE_STATUS";
        GlConstants[GlConstants["ATTACHED_SHADERS"] = 35717] = "ATTACHED_SHADERS";
        GlConstants[GlConstants["ACTIVE_UNIFORMS"] = 35718] = "ACTIVE_UNIFORMS";
        GlConstants[GlConstants["ACTIVE_ATTRIBUTES"] = 35721] = "ACTIVE_ATTRIBUTES";
        GlConstants[GlConstants["SHADING_LANGUAGE_VERSION"] = 35724] = "SHADING_LANGUAGE_VERSION";
        GlConstants[GlConstants["CURRENT_PROGRAM"] = 35725] = "CURRENT_PROGRAM";
        GlConstants[GlConstants["NEVER"] = 512] = "NEVER";
        GlConstants[GlConstants["LESS"] = 513] = "LESS";
        GlConstants[GlConstants["EQUAL"] = 514] = "EQUAL";
        GlConstants[GlConstants["LEQUAL"] = 515] = "LEQUAL";
        GlConstants[GlConstants["GREATER"] = 516] = "GREATER";
        GlConstants[GlConstants["NOTEQUAL"] = 517] = "NOTEQUAL";
        GlConstants[GlConstants["GEQUAL"] = 518] = "GEQUAL";
        GlConstants[GlConstants["ALWAYS"] = 519] = "ALWAYS";
        GlConstants[GlConstants["KEEP"] = 7680] = "KEEP";
        GlConstants[GlConstants["REPLACE"] = 7681] = "REPLACE";
        GlConstants[GlConstants["INCR"] = 7682] = "INCR";
        GlConstants[GlConstants["DECR"] = 7683] = "DECR";
        GlConstants[GlConstants["INVERT"] = 5386] = "INVERT";
        GlConstants[GlConstants["INCR_WRAP"] = 34055] = "INCR_WRAP";
        GlConstants[GlConstants["DECR_WRAP"] = 34056] = "DECR_WRAP";
        GlConstants[GlConstants["VENDOR"] = 7936] = "VENDOR";
        GlConstants[GlConstants["RENDERER"] = 7937] = "RENDERER";
        GlConstants[GlConstants["VERSION"] = 7938] = "VERSION";
        GlConstants[GlConstants["NEAREST"] = 9728] = "NEAREST";
        GlConstants[GlConstants["LINEAR"] = 9729] = "LINEAR";
        GlConstants[GlConstants["NEAREST_MIPMAP_NEAREST"] = 9984] = "NEAREST_MIPMAP_NEAREST";
        GlConstants[GlConstants["LINEAR_MIPMAP_NEAREST"] = 9985] = "LINEAR_MIPMAP_NEAREST";
        GlConstants[GlConstants["NEAREST_MIPMAP_LINEAR"] = 9986] = "NEAREST_MIPMAP_LINEAR";
        GlConstants[GlConstants["LINEAR_MIPMAP_LINEAR"] = 9987] = "LINEAR_MIPMAP_LINEAR";
        GlConstants[GlConstants["TEXTURE_MAG_FILTER"] = 10240] = "TEXTURE_MAG_FILTER";
        GlConstants[GlConstants["TEXTURE_MIN_FILTER"] = 10241] = "TEXTURE_MIN_FILTER";
        GlConstants[GlConstants["TEXTURE_WRAP_S"] = 10242] = "TEXTURE_WRAP_S";
        GlConstants[GlConstants["TEXTURE_WRAP_T"] = 10243] = "TEXTURE_WRAP_T";
        GlConstants[GlConstants["TEXTURE_2D"] = 3553] = "TEXTURE_2D";
        GlConstants[GlConstants["TEXTURE"] = 5890] = "TEXTURE";
        GlConstants[GlConstants["TEXTURE_CUBE_MAP"] = 34067] = "TEXTURE_CUBE_MAP";
        GlConstants[GlConstants["TEXTURE_BINDING_CUBE_MAP"] = 34068] = "TEXTURE_BINDING_CUBE_MAP";
        GlConstants[GlConstants["TEXTURE_CUBE_MAP_POSITIVE_X"] = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X";
        GlConstants[GlConstants["TEXTURE_CUBE_MAP_NEGATIVE_X"] = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X";
        GlConstants[GlConstants["TEXTURE_CUBE_MAP_POSITIVE_Y"] = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y";
        GlConstants[GlConstants["TEXTURE_CUBE_MAP_NEGATIVE_Y"] = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y";
        GlConstants[GlConstants["TEXTURE_CUBE_MAP_POSITIVE_Z"] = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z";
        GlConstants[GlConstants["TEXTURE_CUBE_MAP_NEGATIVE_Z"] = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
        GlConstants[GlConstants["MAX_CUBE_MAP_TEXTURE_SIZE"] = 34076] = "MAX_CUBE_MAP_TEXTURE_SIZE";
        GlConstants[GlConstants["TEXTURE0"] = 33984] = "TEXTURE0";
        GlConstants[GlConstants["TEXTURE1"] = 33985] = "TEXTURE1";
        GlConstants[GlConstants["TEXTURE2"] = 33986] = "TEXTURE2";
        GlConstants[GlConstants["TEXTURE3"] = 33987] = "TEXTURE3";
        GlConstants[GlConstants["TEXTURE4"] = 33988] = "TEXTURE4";
        GlConstants[GlConstants["TEXTURE5"] = 33989] = "TEXTURE5";
        GlConstants[GlConstants["TEXTURE6"] = 33990] = "TEXTURE6";
        GlConstants[GlConstants["TEXTURE7"] = 33991] = "TEXTURE7";
        GlConstants[GlConstants["TEXTURE8"] = 33992] = "TEXTURE8";
        GlConstants[GlConstants["TEXTURE9"] = 33993] = "TEXTURE9";
        GlConstants[GlConstants["TEXTURE10"] = 33994] = "TEXTURE10";
        GlConstants[GlConstants["TEXTURE11"] = 33995] = "TEXTURE11";
        GlConstants[GlConstants["TEXTURE12"] = 33996] = "TEXTURE12";
        GlConstants[GlConstants["TEXTURE13"] = 33997] = "TEXTURE13";
        GlConstants[GlConstants["TEXTURE14"] = 33998] = "TEXTURE14";
        GlConstants[GlConstants["TEXTURE15"] = 33999] = "TEXTURE15";
        GlConstants[GlConstants["TEXTURE16"] = 34000] = "TEXTURE16";
        GlConstants[GlConstants["TEXTURE17"] = 34001] = "TEXTURE17";
        GlConstants[GlConstants["TEXTURE18"] = 34002] = "TEXTURE18";
        GlConstants[GlConstants["TEXTURE19"] = 34003] = "TEXTURE19";
        GlConstants[GlConstants["TEXTURE20"] = 34004] = "TEXTURE20";
        GlConstants[GlConstants["TEXTURE21"] = 34005] = "TEXTURE21";
        GlConstants[GlConstants["TEXTURE22"] = 34006] = "TEXTURE22";
        GlConstants[GlConstants["TEXTURE23"] = 34007] = "TEXTURE23";
        GlConstants[GlConstants["TEXTURE24"] = 34008] = "TEXTURE24";
        GlConstants[GlConstants["TEXTURE25"] = 34009] = "TEXTURE25";
        GlConstants[GlConstants["TEXTURE26"] = 34010] = "TEXTURE26";
        GlConstants[GlConstants["TEXTURE27"] = 34011] = "TEXTURE27";
        GlConstants[GlConstants["TEXTURE28"] = 34012] = "TEXTURE28";
        GlConstants[GlConstants["TEXTURE29"] = 34013] = "TEXTURE29";
        GlConstants[GlConstants["TEXTURE30"] = 34014] = "TEXTURE30";
        GlConstants[GlConstants["TEXTURE31"] = 34015] = "TEXTURE31";
        GlConstants[GlConstants["ACTIVE_TEXTURE"] = 34016] = "ACTIVE_TEXTURE";
        GlConstants[GlConstants["REPEAT"] = 10497] = "REPEAT";
        GlConstants[GlConstants["CLAMP_TO_EDGE"] = 33071] = "CLAMP_TO_EDGE";
        GlConstants[GlConstants["MIRRORED_REPEAT"] = 33648] = "MIRRORED_REPEAT";
        GlConstants[GlConstants["FLOAT_VEC2"] = 35664] = "FLOAT_VEC2";
        GlConstants[GlConstants["FLOAT_VEC3"] = 35665] = "FLOAT_VEC3";
        GlConstants[GlConstants["FLOAT_VEC4"] = 35666] = "FLOAT_VEC4";
        GlConstants[GlConstants["INT_VEC2"] = 35667] = "INT_VEC2";
        GlConstants[GlConstants["INT_VEC3"] = 35668] = "INT_VEC3";
        GlConstants[GlConstants["INT_VEC4"] = 35669] = "INT_VEC4";
        GlConstants[GlConstants["BOOL"] = 35670] = "BOOL";
        GlConstants[GlConstants["BOOL_VEC2"] = 35671] = "BOOL_VEC2";
        GlConstants[GlConstants["BOOL_VEC3"] = 35672] = "BOOL_VEC3";
        GlConstants[GlConstants["BOOL_VEC4"] = 35673] = "BOOL_VEC4";
        GlConstants[GlConstants["FLOAT_MAT2"] = 35674] = "FLOAT_MAT2";
        GlConstants[GlConstants["FLOAT_MAT3"] = 35675] = "FLOAT_MAT3";
        GlConstants[GlConstants["FLOAT_MAT4"] = 35676] = "FLOAT_MAT4";
        GlConstants[GlConstants["SAMPLER_2D"] = 35678] = "SAMPLER_2D";
        GlConstants[GlConstants["SAMPLER_CUBE"] = 35680] = "SAMPLER_CUBE";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_ENABLED"] = 34338] = "VERTEX_ATTRIB_ARRAY_ENABLED";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_SIZE"] = 34339] = "VERTEX_ATTRIB_ARRAY_SIZE";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_STRIDE"] = 34340] = "VERTEX_ATTRIB_ARRAY_STRIDE";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_TYPE"] = 34341] = "VERTEX_ATTRIB_ARRAY_TYPE";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_NORMALIZED"] = 34922] = "VERTEX_ATTRIB_ARRAY_NORMALIZED";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_POINTER"] = 34373] = "VERTEX_ATTRIB_ARRAY_POINTER";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_BUFFER_BINDING"] = 34975] = "VERTEX_ATTRIB_ARRAY_BUFFER_BINDING";
        GlConstants[GlConstants["IMPLEMENTATION_COLOR_READ_TYPE"] = 35738] = "IMPLEMENTATION_COLOR_READ_TYPE";
        GlConstants[GlConstants["IMPLEMENTATION_COLOR_READ_FORMAT"] = 35739] = "IMPLEMENTATION_COLOR_READ_FORMAT";
        GlConstants[GlConstants["COMPILE_STATUS"] = 35713] = "COMPILE_STATUS";
        GlConstants[GlConstants["LOW_FLOAT"] = 36336] = "LOW_FLOAT";
        GlConstants[GlConstants["MEDIUM_FLOAT"] = 36337] = "MEDIUM_FLOAT";
        GlConstants[GlConstants["HIGH_FLOAT"] = 36338] = "HIGH_FLOAT";
        GlConstants[GlConstants["LOW_INT"] = 36339] = "LOW_INT";
        GlConstants[GlConstants["MEDIUM_INT"] = 36340] = "MEDIUM_INT";
        GlConstants[GlConstants["HIGH_INT"] = 36341] = "HIGH_INT";
        GlConstants[GlConstants["FRAMEBUFFER"] = 36160] = "FRAMEBUFFER";
        GlConstants[GlConstants["RENDERBUFFER"] = 36161] = "RENDERBUFFER";
        GlConstants[GlConstants["RGBA4"] = 32854] = "RGBA4";
        GlConstants[GlConstants["RGB5_A1"] = 32855] = "RGB5_A1";
        GlConstants[GlConstants["RGB565"] = 36194] = "RGB565";
        GlConstants[GlConstants["DEPTH_COMPONENT16"] = 33189] = "DEPTH_COMPONENT16";
        GlConstants[GlConstants["STENCIL_INDEX"] = 6401] = "STENCIL_INDEX";
        GlConstants[GlConstants["STENCIL_INDEX8"] = 36168] = "STENCIL_INDEX8";
        GlConstants[GlConstants["DEPTH_STENCIL"] = 34041] = "DEPTH_STENCIL";
        GlConstants[GlConstants["RENDERBUFFER_WIDTH"] = 36162] = "RENDERBUFFER_WIDTH";
        GlConstants[GlConstants["RENDERBUFFER_HEIGHT"] = 36163] = "RENDERBUFFER_HEIGHT";
        GlConstants[GlConstants["RENDERBUFFER_INTERNAL_FORMAT"] = 36164] = "RENDERBUFFER_INTERNAL_FORMAT";
        GlConstants[GlConstants["RENDERBUFFER_RED_SIZE"] = 36176] = "RENDERBUFFER_RED_SIZE";
        GlConstants[GlConstants["RENDERBUFFER_GREEN_SIZE"] = 36177] = "RENDERBUFFER_GREEN_SIZE";
        GlConstants[GlConstants["RENDERBUFFER_BLUE_SIZE"] = 36178] = "RENDERBUFFER_BLUE_SIZE";
        GlConstants[GlConstants["RENDERBUFFER_ALPHA_SIZE"] = 36179] = "RENDERBUFFER_ALPHA_SIZE";
        GlConstants[GlConstants["RENDERBUFFER_DEPTH_SIZE"] = 36180] = "RENDERBUFFER_DEPTH_SIZE";
        GlConstants[GlConstants["RENDERBUFFER_STENCIL_SIZE"] = 36181] = "RENDERBUFFER_STENCIL_SIZE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE"] = 36048] = "FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_OBJECT_NAME"] = 36049] = "FRAMEBUFFER_ATTACHMENT_OBJECT_NAME";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL"] = 36050] = "FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE"] = 36051] = "FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE";
        GlConstants[GlConstants["COLOR_ATTACHMENT0"] = 36064] = "COLOR_ATTACHMENT0";
        GlConstants[GlConstants["DEPTH_ATTACHMENT"] = 36096] = "DEPTH_ATTACHMENT";
        GlConstants[GlConstants["STENCIL_ATTACHMENT"] = 36128] = "STENCIL_ATTACHMENT";
        GlConstants[GlConstants["DEPTH_STENCIL_ATTACHMENT"] = 33306] = "DEPTH_STENCIL_ATTACHMENT";
        GlConstants[GlConstants["NONE"] = 0] = "NONE";
        GlConstants[GlConstants["FRAMEBUFFER_COMPLETE"] = 36053] = "FRAMEBUFFER_COMPLETE";
        GlConstants[GlConstants["FRAMEBUFFER_INCOMPLETE_ATTACHMENT"] = 36054] = "FRAMEBUFFER_INCOMPLETE_ATTACHMENT";
        GlConstants[GlConstants["FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT"] = 36055] = "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";
        GlConstants[GlConstants["FRAMEBUFFER_INCOMPLETE_DIMENSIONS"] = 36057] = "FRAMEBUFFER_INCOMPLETE_DIMENSIONS";
        GlConstants[GlConstants["FRAMEBUFFER_UNSUPPORTED"] = 36061] = "FRAMEBUFFER_UNSUPPORTED";
        GlConstants[GlConstants["FRAMEBUFFER_BINDING"] = 36006] = "FRAMEBUFFER_BINDING";
        GlConstants[GlConstants["RENDERBUFFER_BINDING"] = 36007] = "RENDERBUFFER_BINDING";
        GlConstants[GlConstants["MAX_RENDERBUFFER_SIZE"] = 34024] = "MAX_RENDERBUFFER_SIZE";
        GlConstants[GlConstants["INVALID_FRAMEBUFFER_OPERATION"] = 1286] = "INVALID_FRAMEBUFFER_OPERATION";
        GlConstants[GlConstants["UNPACK_FLIP_Y_WEBGL"] = 37440] = "UNPACK_FLIP_Y_WEBGL";
        GlConstants[GlConstants["UNPACK_PREMULTIPLY_ALPHA_WEBGL"] = 37441] = "UNPACK_PREMULTIPLY_ALPHA_WEBGL";
        GlConstants[GlConstants["CONTEXT_LOST_WEBGL"] = 37442] = "CONTEXT_LOST_WEBGL";
        GlConstants[GlConstants["UNPACK_COLORSPACE_CONVERSION_WEBGL"] = 37443] = "UNPACK_COLORSPACE_CONVERSION_WEBGL";
        GlConstants[GlConstants["BROWSER_DEFAULT_WEBGL"] = 37444] = "BROWSER_DEFAULT_WEBGL";
        // WEBGL_compressed_texture_s3tc
        GlConstants[GlConstants["COMPRESSED_RGB_S3TC_DXT1_EXT"] = 33776] = "COMPRESSED_RGB_S3TC_DXT1_EXT";
        GlConstants[GlConstants["COMPRESSED_RGBA_S3TC_DXT1_EXT"] = 33777] = "COMPRESSED_RGBA_S3TC_DXT1_EXT";
        GlConstants[GlConstants["COMPRESSED_RGBA_S3TC_DXT3_EXT"] = 33778] = "COMPRESSED_RGBA_S3TC_DXT3_EXT";
        GlConstants[GlConstants["COMPRESSED_RGBA_S3TC_DXT5_EXT"] = 33779] = "COMPRESSED_RGBA_S3TC_DXT5_EXT";
        // WEBGL_compressed_texture_pvrtc
        GlConstants[GlConstants["COMPRESSED_RGB_PVRTC_4BPPV1_IMG"] = 35840] = "COMPRESSED_RGB_PVRTC_4BPPV1_IMG";
        GlConstants[GlConstants["COMPRESSED_RGB_PVRTC_2BPPV1_IMG"] = 35841] = "COMPRESSED_RGB_PVRTC_2BPPV1_IMG";
        GlConstants[GlConstants["COMPRESSED_RGBA_PVRTC_4BPPV1_IMG"] = 35842] = "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG";
        GlConstants[GlConstants["COMPRESSED_RGBA_PVRTC_2BPPV1_IMG"] = 35843] = "COMPRESSED_RGBA_PVRTC_2BPPV1_IMG";
        // WEBGL_compressed_texture_etc1
        GlConstants[GlConstants["COMPRESSED_RGB_ETC1_WEBGL"] = 36196] = "COMPRESSED_RGB_ETC1_WEBGL";
        // Desktop OpenGL
        GlConstants[GlConstants["DOUBLE"] = 5130] = "DOUBLE";
        // WebGL 2
        GlConstants[GlConstants["READ_BUFFER"] = 3074] = "READ_BUFFER";
        GlConstants[GlConstants["UNPACK_ROW_LENGTH"] = 3314] = "UNPACK_ROW_LENGTH";
        GlConstants[GlConstants["UNPACK_SKIP_ROWS"] = 3315] = "UNPACK_SKIP_ROWS";
        GlConstants[GlConstants["UNPACK_SKIP_PIXELS"] = 3316] = "UNPACK_SKIP_PIXELS";
        GlConstants[GlConstants["PACK_ROW_LENGTH"] = 3330] = "PACK_ROW_LENGTH";
        GlConstants[GlConstants["PACK_SKIP_ROWS"] = 3331] = "PACK_SKIP_ROWS";
        GlConstants[GlConstants["PACK_SKIP_PIXELS"] = 3332] = "PACK_SKIP_PIXELS";
        GlConstants[GlConstants["COLOR"] = 6144] = "COLOR";
        GlConstants[GlConstants["DEPTH"] = 6145] = "DEPTH";
        GlConstants[GlConstants["STENCIL"] = 6146] = "STENCIL";
        GlConstants[GlConstants["RED"] = 6403] = "RED";
        GlConstants[GlConstants["RGB8"] = 32849] = "RGB8";
        GlConstants[GlConstants["RGBA8"] = 32856] = "RGBA8";
        GlConstants[GlConstants["RGB10_A2"] = 32857] = "RGB10_A2";
        GlConstants[GlConstants["TEXTURE_BINDING_3D"] = 32874] = "TEXTURE_BINDING_3D";
        GlConstants[GlConstants["UNPACK_SKIP_IMAGES"] = 32877] = "UNPACK_SKIP_IMAGES";
        GlConstants[GlConstants["UNPACK_IMAGE_HEIGHT"] = 32878] = "UNPACK_IMAGE_HEIGHT";
        GlConstants[GlConstants["TEXTURE_3D"] = 32879] = "TEXTURE_3D";
        GlConstants[GlConstants["TEXTURE_WRAP_R"] = 32882] = "TEXTURE_WRAP_R";
        GlConstants[GlConstants["MAX_3D_TEXTURE_SIZE"] = 32883] = "MAX_3D_TEXTURE_SIZE";
        GlConstants[GlConstants["UNSIGNED_INT_2_10_10_10_REV"] = 33640] = "UNSIGNED_INT_2_10_10_10_REV";
        GlConstants[GlConstants["MAX_ELEMENTS_VERTICES"] = 33000] = "MAX_ELEMENTS_VERTICES";
        GlConstants[GlConstants["MAX_ELEMENTS_INDICES"] = 33001] = "MAX_ELEMENTS_INDICES";
        GlConstants[GlConstants["TEXTURE_MIN_LOD"] = 33082] = "TEXTURE_MIN_LOD";
        GlConstants[GlConstants["TEXTURE_MAX_LOD"] = 33083] = "TEXTURE_MAX_LOD";
        GlConstants[GlConstants["TEXTURE_BASE_LEVEL"] = 33084] = "TEXTURE_BASE_LEVEL";
        GlConstants[GlConstants["TEXTURE_MAX_LEVEL"] = 33085] = "TEXTURE_MAX_LEVEL";
        GlConstants[GlConstants["MIN"] = 32775] = "MIN";
        GlConstants[GlConstants["MAX"] = 32776] = "MAX";
        GlConstants[GlConstants["DEPTH_COMPONENT24"] = 33190] = "DEPTH_COMPONENT24";
        GlConstants[GlConstants["MAX_TEXTURE_LOD_BIAS"] = 34045] = "MAX_TEXTURE_LOD_BIAS";
        GlConstants[GlConstants["TEXTURE_COMPARE_MODE"] = 34892] = "TEXTURE_COMPARE_MODE";
        GlConstants[GlConstants["TEXTURE_COMPARE_FUNC"] = 34893] = "TEXTURE_COMPARE_FUNC";
        GlConstants[GlConstants["CURRENT_QUERY"] = 34917] = "CURRENT_QUERY";
        GlConstants[GlConstants["QUERY_RESULT"] = 34918] = "QUERY_RESULT";
        GlConstants[GlConstants["QUERY_RESULT_AVAILABLE"] = 34919] = "QUERY_RESULT_AVAILABLE";
        GlConstants[GlConstants["STREAM_READ"] = 35041] = "STREAM_READ";
        GlConstants[GlConstants["STREAM_COPY"] = 35042] = "STREAM_COPY";
        GlConstants[GlConstants["STATIC_READ"] = 35045] = "STATIC_READ";
        GlConstants[GlConstants["STATIC_COPY"] = 35046] = "STATIC_COPY";
        GlConstants[GlConstants["DYNAMIC_READ"] = 35049] = "DYNAMIC_READ";
        GlConstants[GlConstants["DYNAMIC_COPY"] = 35050] = "DYNAMIC_COPY";
        GlConstants[GlConstants["MAX_DRAW_BUFFERS"] = 34852] = "MAX_DRAW_BUFFERS";
        GlConstants[GlConstants["DRAW_BUFFER0"] = 34853] = "DRAW_BUFFER0";
        GlConstants[GlConstants["DRAW_BUFFER1"] = 34854] = "DRAW_BUFFER1";
        GlConstants[GlConstants["DRAW_BUFFER2"] = 34855] = "DRAW_BUFFER2";
        GlConstants[GlConstants["DRAW_BUFFER3"] = 34856] = "DRAW_BUFFER3";
        GlConstants[GlConstants["DRAW_BUFFER4"] = 34857] = "DRAW_BUFFER4";
        GlConstants[GlConstants["DRAW_BUFFER5"] = 34858] = "DRAW_BUFFER5";
        GlConstants[GlConstants["DRAW_BUFFER6"] = 34859] = "DRAW_BUFFER6";
        GlConstants[GlConstants["DRAW_BUFFER7"] = 34860] = "DRAW_BUFFER7";
        GlConstants[GlConstants["DRAW_BUFFER8"] = 34861] = "DRAW_BUFFER8";
        GlConstants[GlConstants["DRAW_BUFFER9"] = 34862] = "DRAW_BUFFER9";
        GlConstants[GlConstants["DRAW_BUFFER10"] = 34863] = "DRAW_BUFFER10";
        GlConstants[GlConstants["DRAW_BUFFER11"] = 34864] = "DRAW_BUFFER11";
        GlConstants[GlConstants["DRAW_BUFFER12"] = 34865] = "DRAW_BUFFER12";
        GlConstants[GlConstants["DRAW_BUFFER13"] = 34866] = "DRAW_BUFFER13";
        GlConstants[GlConstants["DRAW_BUFFER14"] = 34867] = "DRAW_BUFFER14";
        GlConstants[GlConstants["DRAW_BUFFER15"] = 34868] = "DRAW_BUFFER15";
        GlConstants[GlConstants["MAX_FRAGMENT_UNIFORM_COMPONENTS"] = 35657] = "MAX_FRAGMENT_UNIFORM_COMPONENTS";
        GlConstants[GlConstants["MAX_VERTEX_UNIFORM_COMPONENTS"] = 35658] = "MAX_VERTEX_UNIFORM_COMPONENTS";
        GlConstants[GlConstants["SAMPLER_3D"] = 35679] = "SAMPLER_3D";
        GlConstants[GlConstants["SAMPLER_2D_SHADOW"] = 35682] = "SAMPLER_2D_SHADOW";
        GlConstants[GlConstants["FRAGMENT_SHADER_DERIVATIVE_HINT"] = 35723] = "FRAGMENT_SHADER_DERIVATIVE_HINT";
        GlConstants[GlConstants["PIXEL_PACK_BUFFER"] = 35051] = "PIXEL_PACK_BUFFER";
        GlConstants[GlConstants["PIXEL_UNPACK_BUFFER"] = 35052] = "PIXEL_UNPACK_BUFFER";
        GlConstants[GlConstants["PIXEL_PACK_BUFFER_BINDING"] = 35053] = "PIXEL_PACK_BUFFER_BINDING";
        GlConstants[GlConstants["PIXEL_UNPACK_BUFFER_BINDING"] = 35055] = "PIXEL_UNPACK_BUFFER_BINDING";
        GlConstants[GlConstants["FLOAT_MAT2X3"] = 35685] = "FLOAT_MAT2X3";
        GlConstants[GlConstants["FLOAT_MAT2X4"] = 35686] = "FLOAT_MAT2X4";
        GlConstants[GlConstants["FLOAT_MAT3X2"] = 35687] = "FLOAT_MAT3X2";
        GlConstants[GlConstants["FLOAT_MAT3X4"] = 35688] = "FLOAT_MAT3X4";
        GlConstants[GlConstants["FLOAT_MAT4X2"] = 35689] = "FLOAT_MAT4X2";
        GlConstants[GlConstants["FLOAT_MAT4X3"] = 35690] = "FLOAT_MAT4X3";
        GlConstants[GlConstants["SRGB"] = 35904] = "SRGB";
        GlConstants[GlConstants["SRGB8"] = 35905] = "SRGB8";
        GlConstants[GlConstants["SRGB8_ALPHA8"] = 35907] = "SRGB8_ALPHA8";
        GlConstants[GlConstants["COMPARE_REF_TO_TEXTURE"] = 34894] = "COMPARE_REF_TO_TEXTURE";
        GlConstants[GlConstants["RGBA32F"] = 34836] = "RGBA32F";
        GlConstants[GlConstants["RGB32F"] = 34837] = "RGB32F";
        GlConstants[GlConstants["RGBA16F"] = 34842] = "RGBA16F";
        GlConstants[GlConstants["RGB16F"] = 34843] = "RGB16F";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_INTEGER"] = 35069] = "VERTEX_ATTRIB_ARRAY_INTEGER";
        GlConstants[GlConstants["MAX_ARRAY_TEXTURE_LAYERS"] = 35071] = "MAX_ARRAY_TEXTURE_LAYERS";
        GlConstants[GlConstants["MIN_PROGRAM_TEXEL_OFFSET"] = 35076] = "MIN_PROGRAM_TEXEL_OFFSET";
        GlConstants[GlConstants["MAX_PROGRAM_TEXEL_OFFSET"] = 35077] = "MAX_PROGRAM_TEXEL_OFFSET";
        GlConstants[GlConstants["MAX_VARYING_COMPONENTS"] = 35659] = "MAX_VARYING_COMPONENTS";
        GlConstants[GlConstants["TEXTURE_2D_ARRAY"] = 35866] = "TEXTURE_2D_ARRAY";
        GlConstants[GlConstants["TEXTURE_BINDING_2D_ARRAY"] = 35869] = "TEXTURE_BINDING_2D_ARRAY";
        GlConstants[GlConstants["R11F_G11F_B10F"] = 35898] = "R11F_G11F_B10F";
        GlConstants[GlConstants["UNSIGNED_INT_10F_11F_11F_REV"] = 35899] = "UNSIGNED_INT_10F_11F_11F_REV";
        GlConstants[GlConstants["RGB9_E5"] = 35901] = "RGB9_E5";
        GlConstants[GlConstants["UNSIGNED_INT_5_9_9_9_REV"] = 35902] = "UNSIGNED_INT_5_9_9_9_REV";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_BUFFER_MODE"] = 35967] = "TRANSFORM_FEEDBACK_BUFFER_MODE";
        GlConstants[GlConstants["MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS"] = 35968] = "MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_VARYINGS"] = 35971] = "TRANSFORM_FEEDBACK_VARYINGS";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_BUFFER_START"] = 35972] = "TRANSFORM_FEEDBACK_BUFFER_START";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_BUFFER_SIZE"] = 35973] = "TRANSFORM_FEEDBACK_BUFFER_SIZE";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN"] = 35976] = "TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN";
        GlConstants[GlConstants["RASTERIZER_DISCARD"] = 35977] = "RASTERIZER_DISCARD";
        GlConstants[GlConstants["MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS"] = 35978] = "MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS";
        GlConstants[GlConstants["MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS"] = 35979] = "MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS";
        GlConstants[GlConstants["INTERLEAVED_ATTRIBS"] = 35980] = "INTERLEAVED_ATTRIBS";
        GlConstants[GlConstants["SEPARATE_ATTRIBS"] = 35981] = "SEPARATE_ATTRIBS";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_BUFFER"] = 35982] = "TRANSFORM_FEEDBACK_BUFFER";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_BUFFER_BINDING"] = 35983] = "TRANSFORM_FEEDBACK_BUFFER_BINDING";
        GlConstants[GlConstants["RGBA32UI"] = 36208] = "RGBA32UI";
        GlConstants[GlConstants["RGB32UI"] = 36209] = "RGB32UI";
        GlConstants[GlConstants["RGBA16UI"] = 36214] = "RGBA16UI";
        GlConstants[GlConstants["RGB16UI"] = 36215] = "RGB16UI";
        GlConstants[GlConstants["RGBA8UI"] = 36220] = "RGBA8UI";
        GlConstants[GlConstants["RGB8UI"] = 36221] = "RGB8UI";
        GlConstants[GlConstants["RGBA32I"] = 36226] = "RGBA32I";
        GlConstants[GlConstants["RGB32I"] = 36227] = "RGB32I";
        GlConstants[GlConstants["RGBA16I"] = 36232] = "RGBA16I";
        GlConstants[GlConstants["RGB16I"] = 36233] = "RGB16I";
        GlConstants[GlConstants["RGBA8I"] = 36238] = "RGBA8I";
        GlConstants[GlConstants["RGB8I"] = 36239] = "RGB8I";
        GlConstants[GlConstants["RED_INTEGER"] = 36244] = "RED_INTEGER";
        GlConstants[GlConstants["RGB_INTEGER"] = 36248] = "RGB_INTEGER";
        GlConstants[GlConstants["RGBA_INTEGER"] = 36249] = "RGBA_INTEGER";
        GlConstants[GlConstants["SAMPLER_2D_ARRAY"] = 36289] = "SAMPLER_2D_ARRAY";
        GlConstants[GlConstants["SAMPLER_2D_ARRAY_SHADOW"] = 36292] = "SAMPLER_2D_ARRAY_SHADOW";
        GlConstants[GlConstants["SAMPLER_CUBE_SHADOW"] = 36293] = "SAMPLER_CUBE_SHADOW";
        GlConstants[GlConstants["UNSIGNED_INT_VEC2"] = 36294] = "UNSIGNED_INT_VEC2";
        GlConstants[GlConstants["UNSIGNED_INT_VEC3"] = 36295] = "UNSIGNED_INT_VEC3";
        GlConstants[GlConstants["UNSIGNED_INT_VEC4"] = 36296] = "UNSIGNED_INT_VEC4";
        GlConstants[GlConstants["INT_SAMPLER_2D"] = 36298] = "INT_SAMPLER_2D";
        GlConstants[GlConstants["INT_SAMPLER_3D"] = 36299] = "INT_SAMPLER_3D";
        GlConstants[GlConstants["INT_SAMPLER_CUBE"] = 36300] = "INT_SAMPLER_CUBE";
        GlConstants[GlConstants["INT_SAMPLER_2D_ARRAY"] = 36303] = "INT_SAMPLER_2D_ARRAY";
        GlConstants[GlConstants["UNSIGNED_INT_SAMPLER_2D"] = 36306] = "UNSIGNED_INT_SAMPLER_2D";
        GlConstants[GlConstants["UNSIGNED_INT_SAMPLER_3D"] = 36307] = "UNSIGNED_INT_SAMPLER_3D";
        GlConstants[GlConstants["UNSIGNED_INT_SAMPLER_CUBE"] = 36308] = "UNSIGNED_INT_SAMPLER_CUBE";
        GlConstants[GlConstants["UNSIGNED_INT_SAMPLER_2D_ARRAY"] = 36311] = "UNSIGNED_INT_SAMPLER_2D_ARRAY";
        GlConstants[GlConstants["DEPTH_COMPONENT32F"] = 36012] = "DEPTH_COMPONENT32F";
        GlConstants[GlConstants["DEPTH32F_STENCIL8"] = 36013] = "DEPTH32F_STENCIL8";
        GlConstants[GlConstants["FLOAT_32_UNSIGNED_INT_24_8_REV"] = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING"] = 33296] = "FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE"] = 33297] = "FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_RED_SIZE"] = 33298] = "FRAMEBUFFER_ATTACHMENT_RED_SIZE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_GREEN_SIZE"] = 33299] = "FRAMEBUFFER_ATTACHMENT_GREEN_SIZE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_BLUE_SIZE"] = 33300] = "FRAMEBUFFER_ATTACHMENT_BLUE_SIZE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE"] = 33301] = "FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE"] = 33302] = "FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE"] = 33303] = "FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE";
        GlConstants[GlConstants["FRAMEBUFFER_DEFAULT"] = 33304] = "FRAMEBUFFER_DEFAULT";
        GlConstants[GlConstants["UNSIGNED_INT_24_8"] = 34042] = "UNSIGNED_INT_24_8";
        GlConstants[GlConstants["DEPTH24_STENCIL8"] = 35056] = "DEPTH24_STENCIL8";
        GlConstants[GlConstants["UNSIGNED_NORMALIZED"] = 35863] = "UNSIGNED_NORMALIZED";
        GlConstants[GlConstants["DRAW_FRAMEBUFFER_BINDING"] = 36006] = "DRAW_FRAMEBUFFER_BINDING";
        GlConstants[GlConstants["READ_FRAMEBUFFER"] = 36008] = "READ_FRAMEBUFFER";
        GlConstants[GlConstants["DRAW_FRAMEBUFFER"] = 36009] = "DRAW_FRAMEBUFFER";
        GlConstants[GlConstants["READ_FRAMEBUFFER_BINDING"] = 36010] = "READ_FRAMEBUFFER_BINDING";
        GlConstants[GlConstants["RENDERBUFFER_SAMPLES"] = 36011] = "RENDERBUFFER_SAMPLES";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER"] = 36052] = "FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER";
        GlConstants[GlConstants["MAX_COLOR_ATTACHMENTS"] = 36063] = "MAX_COLOR_ATTACHMENTS";
        GlConstants[GlConstants["COLOR_ATTACHMENT1"] = 36065] = "COLOR_ATTACHMENT1";
        GlConstants[GlConstants["COLOR_ATTACHMENT2"] = 36066] = "COLOR_ATTACHMENT2";
        GlConstants[GlConstants["COLOR_ATTACHMENT3"] = 36067] = "COLOR_ATTACHMENT3";
        GlConstants[GlConstants["COLOR_ATTACHMENT4"] = 36068] = "COLOR_ATTACHMENT4";
        GlConstants[GlConstants["COLOR_ATTACHMENT5"] = 36069] = "COLOR_ATTACHMENT5";
        GlConstants[GlConstants["COLOR_ATTACHMENT6"] = 36070] = "COLOR_ATTACHMENT6";
        GlConstants[GlConstants["COLOR_ATTACHMENT7"] = 36071] = "COLOR_ATTACHMENT7";
        GlConstants[GlConstants["COLOR_ATTACHMENT8"] = 36072] = "COLOR_ATTACHMENT8";
        GlConstants[GlConstants["COLOR_ATTACHMENT9"] = 36073] = "COLOR_ATTACHMENT9";
        GlConstants[GlConstants["COLOR_ATTACHMENT10"] = 36074] = "COLOR_ATTACHMENT10";
        GlConstants[GlConstants["COLOR_ATTACHMENT11"] = 36075] = "COLOR_ATTACHMENT11";
        GlConstants[GlConstants["COLOR_ATTACHMENT12"] = 36076] = "COLOR_ATTACHMENT12";
        GlConstants[GlConstants["COLOR_ATTACHMENT13"] = 36077] = "COLOR_ATTACHMENT13";
        GlConstants[GlConstants["COLOR_ATTACHMENT14"] = 36078] = "COLOR_ATTACHMENT14";
        GlConstants[GlConstants["COLOR_ATTACHMENT15"] = 36079] = "COLOR_ATTACHMENT15";
        GlConstants[GlConstants["FRAMEBUFFER_INCOMPLETE_MULTISAMPLE"] = 36182] = "FRAMEBUFFER_INCOMPLETE_MULTISAMPLE";
        GlConstants[GlConstants["MAX_SAMPLES"] = 36183] = "MAX_SAMPLES";
        GlConstants[GlConstants["HALF_FLOAT"] = 5131] = "HALF_FLOAT";
        GlConstants[GlConstants["HALF_FLOAT_OES"] = 36193] = "HALF_FLOAT_OES";
        GlConstants[GlConstants["RG"] = 33319] = "RG";
        GlConstants[GlConstants["RG_INTEGER"] = 33320] = "RG_INTEGER";
        GlConstants[GlConstants["R8"] = 33321] = "R8";
        GlConstants[GlConstants["RG8"] = 33323] = "RG8";
        GlConstants[GlConstants["R16F"] = 33325] = "R16F";
        GlConstants[GlConstants["R32F"] = 33326] = "R32F";
        GlConstants[GlConstants["RG16F"] = 33327] = "RG16F";
        GlConstants[GlConstants["RG32F"] = 33328] = "RG32F";
        GlConstants[GlConstants["R8I"] = 33329] = "R8I";
        GlConstants[GlConstants["R8UI"] = 33330] = "R8UI";
        GlConstants[GlConstants["R16I"] = 33331] = "R16I";
        GlConstants[GlConstants["R16UI"] = 33332] = "R16UI";
        GlConstants[GlConstants["R32I"] = 33333] = "R32I";
        GlConstants[GlConstants["R32UI"] = 33334] = "R32UI";
        GlConstants[GlConstants["RG8I"] = 33335] = "RG8I";
        GlConstants[GlConstants["RG8UI"] = 33336] = "RG8UI";
        GlConstants[GlConstants["RG16I"] = 33337] = "RG16I";
        GlConstants[GlConstants["RG16UI"] = 33338] = "RG16UI";
        GlConstants[GlConstants["RG32I"] = 33339] = "RG32I";
        GlConstants[GlConstants["RG32UI"] = 33340] = "RG32UI";
        GlConstants[GlConstants["VERTEX_ARRAY_BINDING"] = 34229] = "VERTEX_ARRAY_BINDING";
        GlConstants[GlConstants["R8_SNORM"] = 36756] = "R8_SNORM";
        GlConstants[GlConstants["RG8_SNORM"] = 36757] = "RG8_SNORM";
        GlConstants[GlConstants["RGB8_SNORM"] = 36758] = "RGB8_SNORM";
        GlConstants[GlConstants["RGBA8_SNORM"] = 36759] = "RGBA8_SNORM";
        GlConstants[GlConstants["SIGNED_NORMALIZED"] = 36764] = "SIGNED_NORMALIZED";
        GlConstants[GlConstants["COPY_READ_BUFFER"] = 36662] = "COPY_READ_BUFFER";
        GlConstants[GlConstants["COPY_WRITE_BUFFER"] = 36663] = "COPY_WRITE_BUFFER";
        GlConstants[GlConstants["COPY_READ_BUFFER_BINDING"] = 36662] = "COPY_READ_BUFFER_BINDING";
        GlConstants[GlConstants["COPY_WRITE_BUFFER_BINDING"] = 36663] = "COPY_WRITE_BUFFER_BINDING";
        GlConstants[GlConstants["UNIFORM_BUFFER"] = 35345] = "UNIFORM_BUFFER";
        GlConstants[GlConstants["UNIFORM_BUFFER_BINDING"] = 35368] = "UNIFORM_BUFFER_BINDING";
        GlConstants[GlConstants["UNIFORM_BUFFER_START"] = 35369] = "UNIFORM_BUFFER_START";
        GlConstants[GlConstants["UNIFORM_BUFFER_SIZE"] = 35370] = "UNIFORM_BUFFER_SIZE";
        GlConstants[GlConstants["MAX_VERTEX_UNIFORM_BLOCKS"] = 35371] = "MAX_VERTEX_UNIFORM_BLOCKS";
        GlConstants[GlConstants["MAX_FRAGMENT_UNIFORM_BLOCKS"] = 35373] = "MAX_FRAGMENT_UNIFORM_BLOCKS";
        GlConstants[GlConstants["MAX_COMBINED_UNIFORM_BLOCKS"] = 35374] = "MAX_COMBINED_UNIFORM_BLOCKS";
        GlConstants[GlConstants["MAX_UNIFORM_BUFFER_BINDINGS"] = 35375] = "MAX_UNIFORM_BUFFER_BINDINGS";
        GlConstants[GlConstants["MAX_UNIFORM_BLOCK_SIZE"] = 35376] = "MAX_UNIFORM_BLOCK_SIZE";
        GlConstants[GlConstants["MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS"] = 35377] = "MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS";
        GlConstants[GlConstants["MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS"] = 35379] = "MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS";
        GlConstants[GlConstants["UNIFORM_BUFFER_OFFSET_ALIGNMENT"] = 35380] = "UNIFORM_BUFFER_OFFSET_ALIGNMENT";
        GlConstants[GlConstants["ACTIVE_UNIFORM_BLOCKS"] = 35382] = "ACTIVE_UNIFORM_BLOCKS";
        GlConstants[GlConstants["UNIFORM_TYPE"] = 35383] = "UNIFORM_TYPE";
        GlConstants[GlConstants["UNIFORM_SIZE"] = 35384] = "UNIFORM_SIZE";
        GlConstants[GlConstants["UNIFORM_BLOCK_INDEX"] = 35386] = "UNIFORM_BLOCK_INDEX";
        GlConstants[GlConstants["UNIFORM_OFFSET"] = 35387] = "UNIFORM_OFFSET";
        GlConstants[GlConstants["UNIFORM_ARRAY_STRIDE"] = 35388] = "UNIFORM_ARRAY_STRIDE";
        GlConstants[GlConstants["UNIFORM_MATRIX_STRIDE"] = 35389] = "UNIFORM_MATRIX_STRIDE";
        GlConstants[GlConstants["UNIFORM_IS_ROW_MAJOR"] = 35390] = "UNIFORM_IS_ROW_MAJOR";
        GlConstants[GlConstants["UNIFORM_BLOCK_BINDING"] = 35391] = "UNIFORM_BLOCK_BINDING";
        GlConstants[GlConstants["UNIFORM_BLOCK_DATA_SIZE"] = 35392] = "UNIFORM_BLOCK_DATA_SIZE";
        GlConstants[GlConstants["UNIFORM_BLOCK_ACTIVE_UNIFORMS"] = 35394] = "UNIFORM_BLOCK_ACTIVE_UNIFORMS";
        GlConstants[GlConstants["UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES"] = 35395] = "UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES";
        GlConstants[GlConstants["UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER"] = 35396] = "UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER";
        GlConstants[GlConstants["UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER"] = 35398] = "UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER";
        GlConstants[GlConstants["INVALID_INDEX"] = 4294967295] = "INVALID_INDEX";
        GlConstants[GlConstants["MAX_VERTEX_OUTPUT_COMPONENTS"] = 37154] = "MAX_VERTEX_OUTPUT_COMPONENTS";
        GlConstants[GlConstants["MAX_FRAGMENT_INPUT_COMPONENTS"] = 37157] = "MAX_FRAGMENT_INPUT_COMPONENTS";
        GlConstants[GlConstants["MAX_SERVER_WAIT_TIMEOUT"] = 37137] = "MAX_SERVER_WAIT_TIMEOUT";
        GlConstants[GlConstants["OBJECT_TYPE"] = 37138] = "OBJECT_TYPE";
        GlConstants[GlConstants["SYNC_CONDITION"] = 37139] = "SYNC_CONDITION";
        GlConstants[GlConstants["SYNC_STATUS"] = 37140] = "SYNC_STATUS";
        GlConstants[GlConstants["SYNC_FLAGS"] = 37141] = "SYNC_FLAGS";
        GlConstants[GlConstants["SYNC_FENCE"] = 37142] = "SYNC_FENCE";
        GlConstants[GlConstants["SYNC_GPU_COMMANDS_COMPLETE"] = 37143] = "SYNC_GPU_COMMANDS_COMPLETE";
        GlConstants[GlConstants["UNSIGNALED"] = 37144] = "UNSIGNALED";
        GlConstants[GlConstants["SIGNALED"] = 37145] = "SIGNALED";
        GlConstants[GlConstants["ALREADY_SIGNALED"] = 37146] = "ALREADY_SIGNALED";
        GlConstants[GlConstants["TIMEOUT_EXPIRED"] = 37147] = "TIMEOUT_EXPIRED";
        GlConstants[GlConstants["CONDITION_SATISFIED"] = 37148] = "CONDITION_SATISFIED";
        GlConstants[GlConstants["WAIT_FAILED"] = 37149] = "WAIT_FAILED";
        GlConstants[GlConstants["SYNC_FLUSH_COMMANDS_BIT"] = 1] = "SYNC_FLUSH_COMMANDS_BIT";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_DIVISOR"] = 35070] = "VERTEX_ATTRIB_ARRAY_DIVISOR";
        GlConstants[GlConstants["ANY_SAMPLES_PASSED"] = 35887] = "ANY_SAMPLES_PASSED";
        GlConstants[GlConstants["ANY_SAMPLES_PASSED_CONSERVATIVE"] = 36202] = "ANY_SAMPLES_PASSED_CONSERVATIVE";
        GlConstants[GlConstants["SAMPLER_BINDING"] = 35097] = "SAMPLER_BINDING";
        GlConstants[GlConstants["RGB10_A2UI"] = 36975] = "RGB10_A2UI";
        GlConstants[GlConstants["INT_2_10_10_10_REV"] = 36255] = "INT_2_10_10_10_REV";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK"] = 36386] = "TRANSFORM_FEEDBACK";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_PAUSED"] = 36387] = "TRANSFORM_FEEDBACK_PAUSED";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_ACTIVE"] = 36388] = "TRANSFORM_FEEDBACK_ACTIVE";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_BINDING"] = 36389] = "TRANSFORM_FEEDBACK_BINDING";
        GlConstants[GlConstants["COMPRESSED_R11_EAC"] = 37488] = "COMPRESSED_R11_EAC";
        GlConstants[GlConstants["COMPRESSED_SIGNED_R11_EAC"] = 37489] = "COMPRESSED_SIGNED_R11_EAC";
        GlConstants[GlConstants["COMPRESSED_RG11_EAC"] = 37490] = "COMPRESSED_RG11_EAC";
        GlConstants[GlConstants["COMPRESSED_SIGNED_RG11_EAC"] = 37491] = "COMPRESSED_SIGNED_RG11_EAC";
        GlConstants[GlConstants["COMPRESSED_RGB8_ETC2"] = 37492] = "COMPRESSED_RGB8_ETC2";
        GlConstants[GlConstants["COMPRESSED_SRGB8_ETC2"] = 37493] = "COMPRESSED_SRGB8_ETC2";
        GlConstants[GlConstants["COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2"] = 37494] = "COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2";
        GlConstants[GlConstants["COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2"] = 37495] = "COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2";
        GlConstants[GlConstants["COMPRESSED_RGBA8_ETC2_EAC"] = 37496] = "COMPRESSED_RGBA8_ETC2_EAC";
        GlConstants[GlConstants["COMPRESSED_SRGB8_ALPHA8_ETC2_EAC"] = 37497] = "COMPRESSED_SRGB8_ALPHA8_ETC2_EAC";
        GlConstants[GlConstants["TEXTURE_IMMUTABLE_FORMAT"] = 37167] = "TEXTURE_IMMUTABLE_FORMAT";
        GlConstants[GlConstants["MAX_ELEMENT_INDEX"] = 36203] = "MAX_ELEMENT_INDEX";
        GlConstants[GlConstants["TEXTURE_IMMUTABLE_LEVELS"] = 33503] = "TEXTURE_IMMUTABLE_LEVELS";
        // Extensions
        GlConstants[GlConstants["MAX_TEXTURE_MAX_ANISOTROPY_EXT"] = 34047] = "MAX_TEXTURE_MAX_ANISOTROPY_EXT";
    })(GlConstants || (GlConstants = {}));
    //# sourceMappingURL=GLconstant.js.map

    /* eslint-disable @typescript-eslint/class-name-casing */
    /* eslint-disable @typescript-eslint/camelcase */
    class DeviceCapability {
        constructor(context) {
            /** Max number of texture samples for MSAA */
            this.maxMSAASamples = 1;
            let _gl = context.gl;
            let _webGLVersion = context.webGLVersion;
            // Extensions
            this.standardDerivatives = _webGLVersion > 1 || _gl.getExtension("OES_standard_derivatives") !== null;
            this.astc =
                _gl.getExtension("WEBGL_compressed_texture_astc") ||
                    _gl.getExtension("WEBKIT_WEBGL_compressed_texture_astc");
            this.s3tc =
                _gl.getExtension("WEBGL_compressed_texture_s3tc") ||
                    _gl.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
            this.pvrtc =
                _gl.getExtension("WEBGL_compressed_texture_pvrtc") ||
                    _gl.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
            this.etc1 =
                _gl.getExtension("WEBGL_compressed_texture_etc1") ||
                    _gl.getExtension("WEBKIT_WEBGL_compressed_texture_etc1");
            this.etc2 =
                _gl.getExtension("WEBGL_compressed_texture_etc") ||
                    _gl.getExtension("WEBKIT_WEBGL_compressed_texture_etc") ||
                    _gl.getExtension("WEBGL_compressed_texture_es3_0"); // also a requirement of OpenGL ES 3
            this.textureAnisotropicFilterExtension =
                _gl.getExtension("EXT_texture_filter_anisotropic") ||
                    _gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
                    _gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
            this.maxAnisotropy = this.textureAnisotropicFilterExtension
                ? _gl.getParameter(this.textureAnisotropicFilterExtension.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
                : 0;
            this.uintIndices = _webGLVersion > 1 || _gl.getExtension("OES_element_index_uint") !== null;
            this.fragmentDepthSupported = _webGLVersion > 1 || _gl.getExtension("EXT_frag_depth") !== null;
            this.highPrecisionShaderSupported = false;
            this.timerQuery =
                _gl.getExtension("EXT_disjoint_timer_query_webgl2") || _gl.getExtension("EXT_disjoint_timer_query");
            if (this.timerQuery) {
                if (_webGLVersion === 1) {
                    _gl.getQuery = this.timerQuery.getQueryEXT.bind(this.timerQuery);
                }
                this.canUseTimestampForTimerQuery =
                    _gl.getQuery(this.timerQuery.TIMESTAMP_EXT, this.timerQuery.QUERY_COUNTER_BITS_EXT) > 0;
            }
            // Checks if some of the format renders first to allow the use of webgl inspector.
            this.colorBufferFloat = _webGLVersion > 1 && _gl.getExtension("EXT_color_buffer_float");
            this.textureFloat = _webGLVersion > 1 || _gl.getExtension("OES_texture_float") ? true : false;
            this.textureFloatLinearFiltering =
                this.textureFloat && _gl.getExtension("OES_texture_float_linear") ? true : false;
            this.textureFloatRender =
                this.textureFloat && this._canRenderToFloatFramebuffer(_gl, _webGLVersion) ? true : false;
            this.textureHalfFloat = _webGLVersion > 1 || _gl.getExtension("OES_texture_half_float") ? true : false;
            this.textureHalfFloatLinearFiltering =
                _webGLVersion > 1 || (this.textureHalfFloat && _gl.getExtension("OES_texture_half_float_linear"))
                    ? true
                    : false;
            this.textureHalfFloatRender =
                this.textureHalfFloat && this._canRenderToHalfFloatFramebuffer(_gl, _webGLVersion);
            this.textureLOD = _webGLVersion > 1 || _gl.getExtension("EXT_shader_texture_lod") ? true : false;
            this.multiview = _gl.getExtension("OVR_multiview2");
            // Shader compiler threads
            this.parallelShaderCompile = _gl.getExtension("KHR_parallel_shader_compile");
            // Depth Texture
            if (_webGLVersion > 1) {
                this.depthTexture = true;
            }
            else {
                var depthTextureExtension = _gl.getExtension("WEBGL_depth_texture");
                if (depthTextureExtension != null) {
                    this.depthTexture = true;
                    // _gl.UNSIGNED_INT_24_8 = depthTextureExtension.UNSIGNED_INT_24_8_WEBGL;
                }
            }
            // Vertex array object
            if (_webGLVersion > 1) {
                this.vertexArrayObject = true;
            }
            else {
                var vertexArrayObjectExtension = _gl.getExtension("OES_vertex_array_object");
                if (vertexArrayObjectExtension != null) {
                    this.vertexArrayObject = true;
                    _gl.createVertexArray = vertexArrayObjectExtension.createVertexArrayOES.bind(vertexArrayObjectExtension);
                    _gl.bindVertexArray = vertexArrayObjectExtension.bindVertexArrayOES.bind(vertexArrayObjectExtension);
                    _gl.deleteVertexArray = vertexArrayObjectExtension.deleteVertexArrayOES.bind(vertexArrayObjectExtension);
                }
                else {
                    this.vertexArrayObject = false;
                }
            }
            // Instances count
            if (_webGLVersion > 1) {
                this.instancedArrays = true;
            }
            else {
                var instanceExtension = _gl.getExtension("ANGLE_instanced_arrays");
                if (instanceExtension != null) {
                    this.instancedArrays = true;
                    _gl.drawArraysInstanced = instanceExtension.drawArraysInstancedANGLE.bind(instanceExtension);
                    _gl.drawElementsInstanced = instanceExtension.drawElementsInstancedANGLE.bind(instanceExtension);
                    _gl.vertexAttribDivisor = instanceExtension.vertexAttribDivisorANGLE.bind(instanceExtension);
                }
                else {
                    this.instancedArrays = false;
                }
            }
        }
        _canRenderToFloatFramebuffer(_gl, _webGLVersion) {
            if (_webGLVersion > 1) {
                return this.colorBufferFloat;
            }
            return CheckCanRenderToFrameBuffer(_gl, GlConstants.FLOAT);
        }
        _canRenderToHalfFloatFramebuffer(_gl, _webGLVersion) {
            if (_webGLVersion > 1) {
                return this.colorBufferFloat;
            }
            return CheckCanRenderToFrameBuffer(_gl, GlConstants.HALF_FLOAT);
        }
    }
    function CheckCanRenderToFrameBuffer(gl, texType) {
        while (gl.getError() !== gl.NO_ERROR) { }
        let successful = true;
        let texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        let interFromat = texType === GlConstants.FLOAT ? GlConstants.RGBA32F : GlConstants.RGBA16F;
        gl.texImage2D(gl.TEXTURE_2D, 0, interFromat, 1, 1, 0, gl.RGBA, texType, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        let fb = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        successful = successful && status === gl.FRAMEBUFFER_COMPLETE;
        successful = successful && gl.getError() === gl.NO_ERROR;
        //try render by clearing frame buffer's color buffer
        if (successful) {
            gl.clear(gl.COLOR_BUFFER_BIT);
            successful = successful && gl.getError() === gl.NO_ERROR;
        }
        //try reading from frame to ensure render occurs (just creating the FBO is not sufficient to determine if rendering is supported)
        if (successful) {
            //in practice it's sufficient to just read from the backbuffer rather than handle potentially issues reading from the texture
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            let readFormat = gl.RGBA;
            let readType = gl.UNSIGNED_BYTE;
            let buffer = new Uint8Array(4);
            gl.readPixels(0, 0, 1, 1, readFormat, readType, buffer);
            successful = successful && gl.getError() === gl.NO_ERROR;
        }
        //clean up
        gl.deleteTexture(texture);
        gl.deleteFramebuffer(fb);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        //clear accumulated errors
        while (!successful && gl.getError() !== gl.NO_ERROR) { }
        return successful;
    }
    //# sourceMappingURL=DeviceCapability.js.map

    var UniformTypeEnum;
    (function (UniformTypeEnum) {
        UniformTypeEnum["FLOAT"] = "FLOAT";
        UniformTypeEnum["FLOAT_VEC2"] = "FLOAT_VEC2";
        UniformTypeEnum["FLOAT_VEC3"] = "FLOAT_VEC3";
        UniformTypeEnum["FLOAT_VEC4"] = "FLOAT_VEC4";
        UniformTypeEnum["INT"] = "INT";
        UniformTypeEnum["BOOL"] = "BOOL";
        UniformTypeEnum["INT_VEC2"] = "INT_VEC2";
        UniformTypeEnum["BOOL_VEC2"] = "BOOL_VEC2";
        UniformTypeEnum["INT_VEC3"] = "INT_VEC3";
        UniformTypeEnum["BOOL_VEC3"] = "BOOL_VEC3";
        UniformTypeEnum["INT_VEC4"] = "INT_VEC4";
        UniformTypeEnum["BOOL_VEC4"] = "BOOL_VEC4";
        UniformTypeEnum["FLOAT_MAT2"] = "FLOAT_MAT2";
        UniformTypeEnum["FLOAT_MAT3"] = "FLOAT_MAT3";
        UniformTypeEnum["FLOAT_MAT4"] = "FLOAT_MAT4";
        UniformTypeEnum["FLOAT_ARRAY"] = "FLOAT_ARRAY";
        UniformTypeEnum["BOOL_ARRAY"] = "BOOL_ARRAY";
        UniformTypeEnum["INT_ARRAY"] = "INT_ARRAY";
        UniformTypeEnum["SAMPLER_2D"] = "SAMPLER_2D";
        UniformTypeEnum["SAMPLER_CUBE"] = "SAMPLER_CUBE";
    })(UniformTypeEnum || (UniformTypeEnum = {}));
    (function (UniformTypeEnum) {
        const gltypeToUniformType = {};
        {
            gltypeToUniformType[GlConstants.FLOAT] = UniformTypeEnum.FLOAT;
            gltypeToUniformType[GlConstants.FLOAT_VEC2] = UniformTypeEnum.FLOAT_VEC2;
            gltypeToUniformType[GlConstants.FLOAT_VEC3] = UniformTypeEnum.FLOAT_VEC3;
            gltypeToUniformType[GlConstants.FLOAT_VEC4] = UniformTypeEnum.FLOAT_VEC4;
            gltypeToUniformType[GlConstants.INT] = UniformTypeEnum.INT;
            gltypeToUniformType[GlConstants.INT_VEC2] = UniformTypeEnum.INT_VEC2;
            gltypeToUniformType[GlConstants.INT_VEC3] = UniformTypeEnum.INT_VEC3;
            gltypeToUniformType[GlConstants.INT_VEC4] = UniformTypeEnum.INT_VEC4;
            gltypeToUniformType[GlConstants.BOOL] = UniformTypeEnum.BOOL;
            gltypeToUniformType[GlConstants.BOOL_VEC2] = UniformTypeEnum.BOOL_VEC2;
            gltypeToUniformType[GlConstants.BOOL_VEC3] = UniformTypeEnum.BOOL_VEC3;
            gltypeToUniformType[GlConstants.BOOL_VEC4] = UniformTypeEnum.BOOL_VEC4;
            gltypeToUniformType[GlConstants.FLOAT_MAT2] = UniformTypeEnum.FLOAT_MAT2;
            gltypeToUniformType[GlConstants.FLOAT_MAT3] = UniformTypeEnum.FLOAT_MAT3;
            gltypeToUniformType[GlConstants.FLOAT_MAT4] = UniformTypeEnum.FLOAT_MAT4;
            gltypeToUniformType[GlConstants.SAMPLER_2D] = UniformTypeEnum.SAMPLER_2D;
            gltypeToUniformType[GlConstants.SAMPLER_CUBE] = UniformTypeEnum.SAMPLER_CUBE;
        }
        function fromGlType(type) {
            return gltypeToUniformType[type];
        }
        UniformTypeEnum.fromGlType = fromGlType;
    })(UniformTypeEnum || (UniformTypeEnum = {}));
    //# sourceMappingURL=UniformType.js.map

    class Buffer {
        constructor(options) {
            var _a, _b;
            this.device = options.context;
            this.target = options.target;
            this.usage = (_a = options.usage) !== null && _a !== void 0 ? _a : BufferUsageEnum.STATIC_DRAW;
            this._typedArray = options.typedArray;
            this._sizeInBytes = options.sizeInBytes;
            if (this._typedArray != null) {
                this._sizeInBytes = this._typedArray.byteLength;
            }
            let gl = options.context.gl;
            let buffer = gl.createBuffer();
            gl.bindBuffer(this.target, buffer);
            gl.bufferData(this.target, (_b = this._typedArray) !== null && _b !== void 0 ? _b : this._sizeInBytes, this.usage);
            gl.bindBuffer(this.target, null);
            this.bind = () => {
                gl.bindBuffer(this.target, buffer);
            };
            this.unbind = () => {
                gl.bindBuffer(this.target, null);
            };
            this.update = (sizeInBytesOrTypedArray) => {
                gl.bindBuffer(this.target, buffer);
                gl.bufferData(this.target, sizeInBytesOrTypedArray, this.usage);
                if (typeof sizeInBytesOrTypedArray == "number") {
                    this._sizeInBytes = sizeInBytesOrTypedArray;
                }
                else {
                    this._typedArray = sizeInBytesOrTypedArray;
                }
                // gl.bindBuffer(this.target, null);
            };
            this.destroy = () => {
                gl.deleteBuffer(buffer);
            };
        }
        get typedArray() { return this._typedArray; }
        ;
        get sizeInbytes() { return this._sizeInBytes; }
        ;
        bind() { }
        unbind() { }
        update(sizeInBytesOrTypedArray) { }
        destroy() { }
    }
    var BufferTargetEnum;
    (function (BufferTargetEnum) {
        BufferTargetEnum[BufferTargetEnum["ARRAY_BUFFER"] = 34962] = "ARRAY_BUFFER";
        BufferTargetEnum[BufferTargetEnum["ELEMENT_ARRAY_BUFFER"] = 34963] = "ELEMENT_ARRAY_BUFFER";
    })(BufferTargetEnum || (BufferTargetEnum = {}));
    var BufferUsageEnum;
    (function (BufferUsageEnum) {
        BufferUsageEnum[BufferUsageEnum["STATIC_DRAW"] = 35044] = "STATIC_DRAW";
        BufferUsageEnum[BufferUsageEnum["DYNAMIC_DRAW"] = 35048] = "DYNAMIC_DRAW";
    })(BufferUsageEnum || (BufferUsageEnum = {}));
    class BufferConfig {
        static init(context) {
            this.vertexAttributeSetter[1] = (index, value) => {
                context.gl.vertexAttrib1f(index, value);
            };
            this.vertexAttributeSetter[2] = (index, value) => {
                context.gl.vertexAttrib2fv(index, value);
            };
            this.vertexAttributeSetter[3] = (index, value) => {
                context.gl.vertexAttrib3fv(index, value);
            };
            this.vertexAttributeSetter[4] = (index, value) => {
                context.gl.vertexAttrib4fv(index, value);
            };
        }
    }
    BufferConfig.bufferUsageToGLNumber = {};
    BufferConfig.bufferTargetToGLNumber = {};
    BufferConfig.vertexAttributeSetter = {};
    //# sourceMappingURL=Buffer.js.map

    class DeviceLimit {
        constructor(context) {
            let gl = context.gl;
            this.maximumCombinedTextureImageUnits = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS); // min: 8
            this.maximumCubeMapSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE); // min: 16
            this.maximumFragmentUniformVectors = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS); // min: 16
            this.maximumTextureImageUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS); // min: 8
            this.maximumRenderbufferSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE); // min: 1
            this.maximumTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE); // min: 64
            this.maximumVaryingVectors = gl.getParameter(gl.MAX_VARYING_VECTORS); // min: 8
            this.maximumVertexAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS); // min: 8
            this.maximumVertexTextureImageUnits = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS); // min: 0
            this.maximumVertexUniformVectors = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS); // min: 128
            var aliasedLineWidthRange = gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE); // must include 1
            this.minimumAliasedLineWidth = aliasedLineWidthRange[0];
            this.maximumAliasedLineWidth = aliasedLineWidthRange[1];
            var aliasedPointSizeRange = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE); // must include 1
            this.minimumAliasedPointSize = aliasedPointSizeRange[0];
            this.maximumAliasedPointSize = aliasedPointSizeRange[1];
            var maximumViewportDimensions = gl.getParameter(gl.MAX_VIEWPORT_DIMS);
            this.maximumViewportWidth = maximumViewportDimensions[0];
            this.maximumViewportHeight = maximumViewportDimensions[1];
            var highpFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
            this.highpFloatSupported = highpFloat.precision !== 0;
            var highpInt = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT);
            this.highpIntSupported = highpInt.rangeMax !== 0;
        }
    }
    //# sourceMappingURL=DeviceLimit.js.map

    class GraphicsDevice {
        // beCreatingVao = false;
        constructor(canvasOrContext, option) {
            this.uniformSetter = {};
            this.uniformSamplerSetter = {};
            this.bufferUsageToGLNumber = {};
            this.bufferTargetToGLNumber = {};
            this.vertexAttributeSetter = {};
            this.bindingVao = null;
            this.handleContextLost = () => {
                throw new Error("Method not implemented.");
            };
            this.enableSeparateBlend = false;
            this.enableSeparateStencil = false;
            if (canvasOrContext == null)
                return;
            option = option || {};
            let gl;
            if (canvasOrContext instanceof HTMLCanvasElement) {
                if (!option.disableWebgl2) {
                    try {
                        gl = canvasOrContext.getContext("webgl2", option);
                    }
                    catch (e) { }
                }
                if (!gl) {
                    try {
                        gl = canvasOrContext.getContext("webgl", option);
                    }
                    catch (e) { }
                }
                if (!gl) {
                    throw new Error("webgl not supported");
                }
                canvasOrContext.addEventListener("webglcontextlost", this.handleContextLost, false);
            }
            else {
                gl = canvasOrContext;
            }
            if (gl.renderbufferStorageMultisample) {
                this.webGLVersion = 2.0;
            }
            this.gl = gl;
            this.caps = new DeviceCapability(this);
            this.limit = new DeviceLimit(this);
            //-------------config init
            BufferConfig.init(this);
            //------------------------uniform 
            var scopeX, scopeY, scopeZ, scopeW;
            var uniformValue;
            this.uniformSetter[UniformTypeEnum.BOOL] = (uniform, value) => {
                if (uniform.value !== value) {
                    gl.uniform1i(uniform.location, value);
                    uniform.value = value;
                }
            };
            this.uniformSetter[UniformTypeEnum.INT] = this.uniformSetter[UniformTypeEnum.BOOL];
            this.uniformSetter[UniformTypeEnum.FLOAT] = (uniform, value) => {
                if (uniform.value !== value) {
                    gl.uniform1f(uniform.location, value);
                    uniform.value = value;
                }
            };
            this.uniformSetter[UniformTypeEnum.FLOAT_VEC2] = (uniform, value) => {
                uniformValue = uniform.value;
                scopeX = value[0];
                scopeY = value[1];
                if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY) {
                    gl.uniform2fv(uniform.location, value);
                    uniformValue[0] = scopeX;
                    uniformValue[1] = scopeY;
                }
            };
            this.uniformSetter[UniformTypeEnum.FLOAT_VEC3] = (uniform, value) => {
                uniformValue = uniform.value;
                scopeX = value[0];
                scopeY = value[1];
                scopeZ = value[2];
                if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ) {
                    gl.uniform3fv(uniform.location, value);
                    uniformValue[0] = scopeX;
                    uniformValue[1] = scopeY;
                    uniformValue[2] = scopeZ;
                }
            };
            this.uniformSetter[UniformTypeEnum.FLOAT_VEC4] = (uniform, value) => {
                uniformValue = uniform.value;
                scopeX = value[0];
                scopeY = value[1];
                scopeZ = value[2];
                scopeW = value[3];
                if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ || uniformValue[3] !== scopeW) {
                    gl.uniform4fv(uniform.location, value);
                    uniformValue[0] = scopeX;
                    uniformValue[1] = scopeY;
                    uniformValue[2] = scopeZ;
                    uniformValue[3] = scopeW;
                }
            };
            this.uniformSetter[UniformTypeEnum.INT_VEC2] = (uniform, value) => {
                uniformValue = uniform.value;
                scopeX = value[0];
                scopeY = value[1];
                if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY) {
                    gl.uniform2iv(uniform.location, value);
                    uniformValue[0] = scopeX;
                    uniformValue[1] = scopeY;
                }
            };
            this.uniformSetter[UniformTypeEnum.BOOL_VEC2] = this.uniformSetter[UniformTypeEnum.INT_VEC2];
            this.uniformSetter[UniformTypeEnum.INT_VEC3] = (uniform, value) => {
                uniformValue = uniform.value;
                scopeX = value[0];
                scopeY = value[1];
                scopeZ = value[2];
                if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ) {
                    gl.uniform3iv(uniform.location, value);
                    uniformValue[0] = scopeX;
                    uniformValue[1] = scopeY;
                    uniformValue[2] = scopeZ;
                }
            };
            this.uniformSetter[UniformTypeEnum.BOOL_VEC3] = this.uniformSetter[UniformTypeEnum.INT_VEC3];
            this.uniformSetter[UniformTypeEnum.INT_VEC4] = (uniform, value) => {
                uniformValue = uniform.value;
                scopeX = value[0];
                scopeY = value[1];
                scopeZ = value[2];
                scopeW = value[3];
                if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ || uniformValue[3] !== scopeW) {
                    gl.uniform4iv(uniform.location, value);
                    uniformValue[0] = scopeX;
                    uniformValue[1] = scopeY;
                    uniformValue[2] = scopeZ;
                    uniformValue[3] = scopeW;
                }
            };
            this.uniformSetter[UniformTypeEnum.BOOL_VEC4] = this.uniformSetter[UniformTypeEnum.INT_VEC4];
            this.uniformSetter[UniformTypeEnum.FLOAT_MAT2] = (uniform, value) => {
                gl.uniformMatrix2fv(uniform.location, false, value);
            };
            this.uniformSetter[UniformTypeEnum.FLOAT_MAT3] = (uniform, value) => {
                gl.uniformMatrix3fv(uniform.location, false, value);
            };
            this.uniformSetter[UniformTypeEnum.FLOAT_MAT4] = (uniform, value) => {
                gl.uniformMatrix4fv(uniform.location, false, value);
            };
            this.uniformSetter[UniformTypeEnum.FLOAT_ARRAY] = (uniform, value) => {
                gl.uniform1fv(uniform.location, value);
            };
            this.uniformSamplerSetter[UniformTypeEnum.SAMPLER_2D] = (uniform, value, unit) => {
                value.bind(this, unit);
                gl.uniform1i(uniform.location, unit);
            };
            //------------------buffer
            this.bufferTargetToGLNumber[BufferTargetEnum.ARRAY_BUFFER] = gl.ARRAY_BUFFER;
            this.bufferTargetToGLNumber[BufferTargetEnum.ELEMENT_ARRAY_BUFFER] = gl.ELEMENT_ARRAY_BUFFER;
            this.bufferUsageToGLNumber[BufferUsageEnum.STATIC_DRAW] = gl.STATIC_DRAW;
            this.bufferUsageToGLNumber[BufferUsageEnum.DYNAMIC_DRAW] = gl.DYNAMIC_DRAW;
            //------------------attribute
            this.vertexAttributeSetter[1] = (index, value) => {
                this.gl.vertexAttrib1f(index, value);
            };
            this.vertexAttributeSetter[2] = (index, value) => {
                this.gl.vertexAttrib2fv(index, value);
            };
            this.vertexAttributeSetter[3] = (index, value) => {
                this.gl.vertexAttrib3fv(index, value);
            };
            this.vertexAttributeSetter[4] = (index, value) => {
                this.gl.vertexAttrib4fv(index, value);
            };
        }
        //--------------------------------------uniform
        getUniformTypeFromGLtype(gltype, beArray) {
            let gl = this.gl;
            if (beArray) {
                if (gltype == gl.FLOAT) {
                    return UniformTypeEnum.FLOAT_ARRAY;
                }
                else if (gltype == gl.BOOL) {
                    return UniformTypeEnum.BOOL_ARRAY;
                }
                else if (gltype == gl.INT) {
                    return UniformTypeEnum.INT;
                }
            }
            let type = UniformTypeEnum.fromGlType(gltype);
            if (type == null) {
                console.error("unhandle uniform GLtype:", gltype);
            }
            return type;
        }
        /**
         * 创建shader
         * @param definition
         */
        complileAndLinkShader(definition) {
            let gl = this.gl;
            let vsshader = this.compileShaderSource(gl, definition.vsStr, true);
            let fsshader = this.compileShaderSource(gl, definition.fsStr, false);
            if (vsshader && fsshader) {
                let shader = gl.createProgram();
                gl.attachShader(shader, vsshader);
                gl.attachShader(shader, fsshader);
                let attributes = this.preSetAttributeLocation(gl, shader, definition.attributes);
                gl.linkProgram(shader);
                let check = gl.getProgramParameter(shader, gl.LINK_STATUS);
                if (check == false) {
                    let debguInfo = "ERROR: compile program Error! \n" + gl.getProgramInfoLog(shader);
                    console.error(debguInfo);
                    gl.deleteProgram(shader);
                    return null;
                }
                else {
                    let uniformDic = this.getUniformsInfo(gl, shader);
                    return { shader, attributes, uniforms: uniformDic };
                }
            }
        }
        setUniform(uniform, value) {
            this.uniformSetter[uniform.type](uniform, value);
        }
        compileShaderSource(gl, source, beVertex) {
            let target = beVertex ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER;
            let item = gl.createShader(target);
            gl.shaderSource(item, source);
            gl.compileShader(item);
            let check = gl.getShaderParameter(item, gl.COMPILE_STATUS);
            if (check == false) {
                let debug = beVertex ? "ERROR: compile  VS Shader Error! VS:" : "ERROR: compile FS Shader Error! FS:";
                debug = debug + name + ".\n";
                console.error(debug + gl.getShaderInfoLog(item));
                gl.deleteShader(item);
            }
            else {
                return item;
            }
        }
        preSetAttributeLocation(gl, program, attInfo) {
            var _a;
            let attdic = {};
            let numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
            for (let i = 0; i < numAttribs; i++) {
                let attribInfo = gl.getActiveAttrib(program, i);
                if (!attribInfo)
                    break;
                let attName = attribInfo.name;
                let type = (_a = attInfo[attName]) !== null && _a !== void 0 ? _a : VertexAttEnum.fromShaderAttName(attName);
                if (type == null) {
                    console.error(`cannot get Vertex Attribute type from shader defination or deduced from shader attname! Info: attname In shader [${attName}]`);
                }
                else {
                    let location = VertexAttEnum.toShaderLocation(type);
                    gl.bindAttribLocation(program, location, attName);
                    // let attlocation = gl.getAttribLocation(program, attName);
                    attdic[type] = { name: attName, type, location: location };
                }
            }
            return attdic;
        }
        getUniformsInfo(gl, program) {
            let uniformDic = {};
            // let sampleDic: { [name: string]: IuniformInfo } = {};
            let numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
            let sampleArr = [];
            for (let i = 0; i < numUniforms; i++) {
                let uniformInfo = gl.getActiveUniform(program, i);
                if (!uniformInfo)
                    break;
                let name = uniformInfo.name;
                let type = uniformInfo.type;
                let location = gl.getUniformLocation(program, name);
                let beArray = false;
                // remove the array suffix.
                if (name.substr(-3) === "[0]") {
                    beArray = true;
                    name = name.substr(0, name.length - 3);
                }
                if (location == null)
                    continue;
                let uniformtype = this.getUniformTypeFromGLtype(type, beArray);
                let newUniformElemt = {
                    name: name,
                    location: location,
                    type: uniformtype,
                };
                uniformDic[name] = newUniformElemt;
                if (uniformtype == UniformTypeEnum.SAMPLER_2D || uniformtype == UniformTypeEnum.SAMPLER_CUBE) {
                    newUniformElemt.beTexture = true;
                    sampleArr.push(newUniformElemt);
                }
                else {
                    uniformDic[name] = newUniformElemt;
                    newUniformElemt.beTexture = false;
                    newUniformElemt.setter = this.uniformSetter[uniformtype];
                }
            }
            sampleArr.forEach((item, index) => {
                item.setter = (info, value) => { this.uniformSamplerSetter[item.type](info, value, index); };
            });
            return uniformDic;
        }
        //-----------------------------gl state
        setClear(clearDepth, clearColor, clearStencil) {
            let cleartag = 0;
            if (clearDepth != null) {
                this.gl.clearDepth(clearDepth);
                cleartag |= this.gl.DEPTH_BUFFER_BIT;
            }
            if (clearColor != null) {
                this.gl.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
                cleartag |= this.gl.COLOR_BUFFER_BIT;
            }
            if (clearStencil != null) {
                this.gl.clearStencil(0);
                cleartag |= this.gl.STENCIL_BUFFER_BIT;
            }
            if (cleartag != 0) {
                this.gl.clear(cleartag);
            }
        }
        setViewPort(x, y, width, height, force = false) {
            if (force ||
                x != this._cachedViewPortX ||
                y != this._cachedViewPortY ||
                width != this._cachedViewPortWidth ||
                height != this._cachedViewPortHeight) {
                this.gl.viewport(x, y, width, height);
                this._cachedViewPortX = x;
                this._cachedViewPortY = y;
                this._cachedViewPortWidth = width;
                this._cachedViewPortHeight = height;
            }
        }
        setColorMask(maskR, maskG, maskB, maskA, force = false) {
            if (force ||
                this._cacheColorMaskR != maskR ||
                this._cacheColorMaskG != maskG ||
                this._cacheColorMaskB != maskB ||
                this._cacheColorMaskA != maskA) {
                this.gl.colorMask(maskR, maskG, maskB, maskA);
                this._cacheColorMaskR = maskR;
                this._cacheColorMaskG = maskG;
                this._cacheColorMaskB = maskB;
                this._cacheColorMaskA = maskA;
            }
        }
        setCullFaceState(enableCullFace = true, cullBack = true, force = false) {
            if (force || this._cachedEnableCullFace != enableCullFace) {
                this._cachedEnableCullFace = enableCullFace;
                if (enableCullFace) {
                    this.gl.enable(this.gl.CULL_FACE);
                    if (force || this._cachedCullFace != cullBack) {
                        this._cachedCullFace = cullBack;
                        this.gl.cullFace(cullBack ? this.gl.BACK : this.gl.FRONT);
                    }
                }
                else {
                    this.gl.disable(this.gl.CULL_FACE);
                }
            }
            else {
                if (force || this._cachedCullFace != cullBack) {
                    this._cachedCullFace = cullBack;
                    this.gl.cullFace(cullBack ? this.gl.BACK : this.gl.FRONT);
                }
            }
        }
        setDepthState(depthWrite = true, depthTest = true, depthFunc, force = false) {
            if (force || this._cachedDepthWrite != depthWrite) {
                this._cachedDepthWrite = depthWrite;
                this.gl.depthMask(depthWrite);
            }
            if (force || this._cachedDepthTest != depthTest) {
                this._cachedDepthTest = depthTest;
                if (depthTest) {
                    this.gl.enable(this.gl.DEPTH_TEST);
                    if (depthFunc != null && this._cachedDepthFunction != depthFunc) {
                        this._cachedDepthFunction = depthFunc;
                        this.gl.depthFunc(depthFunc);
                    }
                }
                else {
                    this.gl.disable(this.gl.DEPTH_TEST);
                }
            }
        }
        setBlendState(enabled, blendEquation, blendSrc, blendDst, enableSeparateBlend, blendAlphaEquation, blendSrcAlpha, blendDstAlpha, force = false) {
            if (force || this._cachedEnableBlend != enabled) {
                this._cachedEnableBlend = enabled;
                if (enabled) {
                    this.gl.enable(this.gl.BLEND);
                    if (enableSeparateBlend) {
                        this.enableSeparateBlend = true;
                        if (force || this._cachedBlendEquation != blendEquation || this._cachedBlendEquationAlpha != blendAlphaEquation) {
                            this._cachedBlendEquation = blendEquation;
                            this._cachedBlendEquationAlpha = blendAlphaEquation;
                            this.gl.blendEquationSeparate(blendEquation, blendAlphaEquation);
                        }
                        if (force || this._cachedBlendFuncSrc != blendSrc || this._cachedBlendFuncDst != blendDst || this._cachedBlendFuncSrc_a != blendSrcAlpha || this._cachedBlendFuncDst_a != blendDstAlpha) {
                            this._cachedBlendFuncSrc = blendSrc;
                            this._cachedBlendFuncDst = blendDst;
                            this._cachedBlendFuncSrc_a = blendSrcAlpha;
                            this._cachedBlendFuncDst_a = blendDstAlpha;
                            this.gl.blendFuncSeparate(blendSrc, blendDst, blendSrcAlpha, blendDstAlpha);
                        }
                    }
                    else {
                        if (force || this.enableSeparateBlend || this._cachedBlendEquation != blendEquation) {
                            this._cachedBlendEquation = blendEquation;
                            this.gl.blendEquation(blendEquation);
                        }
                        if (force || this.enableSeparateBlend || this._cachedBlendFuncSrc != blendSrc || this._cachedBlendFuncDst != blendDst) {
                            this._cachedBlendFuncSrc = blendSrc;
                            this._cachedBlendFuncDst = blendDst;
                            this.gl.blendFunc(blendSrc, blendDst);
                        }
                        this.enableSeparateBlend = false;
                    }
                }
                else {
                    this.gl.disable(this.gl.BLEND);
                }
            }
        }
        setStencilState(enableStencilTest = false, stencilFunction = this.gl.ALWAYS, stencilRefValue = 1, stencilMask = 0xff, stencilFail = this.gl.KEEP, stencilFaileZpass = this.gl.KEEP, stencilPassZfail = this.gl.REPLACE, enableSeparateStencil = false, stencilFunctionBack = this.gl.ALWAYS, stencilRefValueBack = 1, stencilMaskBack = 0xff, stencilFailBack = this.gl.KEEP, stencilFaileZpassBack = this.gl.KEEP, stencilPassZfailBack = this.gl.REPLACE) {
            if (this._cachedEnableStencilTest != enableStencilTest) {
                this._cachedEnableStencilTest = enableStencilTest;
                if (enableStencilTest) {
                    this.gl.enable(this.gl.STENCIL_TEST);
                    if (enableSeparateStencil) {
                        this.enableSeparateStencil = true;
                        if (this._cachedStencilFunc != stencilFunction ||
                            this._cachedStencilRefValue != stencilRefValue ||
                            this._cachedStencilMask != stencilMask) {
                            this._cachedStencilFunc = stencilFunction;
                            this._cachedStencilRefValue = stencilRefValue;
                            this._cachedStencilMask = stencilMask;
                            this.gl.stencilFuncSeparate(this.gl.FRONT, stencilFunction, stencilRefValue, stencilMask);
                        }
                        if (this._cachedStencilFuncBack != stencilFunctionBack ||
                            this._cachedstencilRefValueBack != stencilRefValueBack ||
                            this._cachedStencilMaskBack != stencilMaskBack) {
                            this._cachedStencilFuncBack = stencilFunctionBack;
                            this._cachedstencilRefValueBack = stencilRefValueBack;
                            this._cachedStencilMaskBack = stencilMaskBack;
                            this.gl.stencilFuncSeparate(this.gl.BACK, stencilFunctionBack, stencilRefValueBack, stencilMaskBack);
                        }
                        if (this._cachedStencilFail != stencilFail ||
                            this._cachedStencilPassZfail != stencilPassZfail ||
                            this._cachedStencilFaileZpass != stencilFaileZpass) {
                            this._cachedStencilFail = stencilFail;
                            this._cachedStencilPassZfail = stencilPassZfail;
                            this._cachedStencilFaileZpass = stencilFaileZpass;
                            this.gl.stencilOpSeparate(this.gl.FRONT, stencilFail, stencilPassZfail, stencilFaileZpass);
                        }
                        if (this._cachedStencilFailBack != stencilFailBack ||
                            this._cachedStencilPassZfailBack != stencilPassZfailBack ||
                            this._cachedStencilFaileZpassBack != stencilFaileZpassBack) {
                            this._cachedStencilFailBack = stencilFailBack;
                            this._cachedStencilPassZfailBack = stencilPassZfailBack;
                            this._cachedStencilFaileZpassBack = stencilFaileZpassBack;
                            this.gl.stencilOpSeparate(this.gl.BACK, stencilFailBack, stencilPassZfailBack, stencilFaileZpassBack);
                        }
                    }
                    else {
                        if (this.enableSeparateStencil || this._cachedStencilFunc != stencilFunction ||
                            this._cachedStencilRefValue != stencilRefValue ||
                            this._cachedStencilMask != stencilMask) {
                            this._cachedStencilFunc = stencilFunction;
                            this._cachedStencilRefValue = stencilRefValue;
                            this._cachedStencilMask = stencilMask;
                            this.gl.stencilFunc(stencilFunction, stencilRefValue, stencilMask);
                        }
                        if (this.enableSeparateStencil || this._cachedStencilFail != stencilFail ||
                            this._cachedStencilPassZfail != stencilPassZfail ||
                            this._cachedStencilFaileZpass != stencilFaileZpass) {
                            this._cachedStencilFail = stencilFail;
                            this._cachedStencilPassZfail = stencilPassZfail;
                            this._cachedStencilFaileZpass = stencilFaileZpass;
                            this.gl.stencilOp(stencilFail, stencilPassZfail, stencilFaileZpass);
                        }
                        this.enableSeparateStencil = false;
                    }
                }
                else {
                    this.gl.disable(this.gl.STENCIL_TEST);
                }
            }
        }
        draw(vertexArray, instanceCount = 0) {
            let indexBuffer = vertexArray.indexBuffer;
            if (indexBuffer) {
                if (instanceCount != 0) {
                    this.gl.drawElementsInstanced(vertexArray.primitiveType, vertexArray.primitveCount, indexBuffer.indexDatatype, vertexArray.primitiveOffset, instanceCount);
                }
                else {
                    this.gl.drawElements(vertexArray.primitiveType, vertexArray.primitveCount, indexBuffer.indexDatatype, vertexArray.primitiveOffset);
                }
            }
            else {
                if (instanceCount != 0) {
                    this.gl.drawArraysInstanced(vertexArray.primitiveType, vertexArray.primitiveOffset, vertexArray.primitveCount, instanceCount);
                }
                else {
                    this.gl.drawArrays(vertexArray.primitiveType, vertexArray.primitiveOffset, vertexArray.primitveCount);
                }
            }
        }
    }
    //# sourceMappingURL=GraphicsDevice.js.map

    //通过url获取资源的名称(包含尾缀)
    // static getAssetExtralType(url: string): AssetExtralEnum {
    //     let index = url.lastIndexOf("/");
    //     let filename = url.substr(index + 1);
    //     index = filename.indexOf(".", 0);
    //     let extname = filename.substr(index);
    //     let type = this.ExtendNameDic[extname];
    //     if (type == null) {
    //         console.warn("Load Asset Failed.type:(" + type + ") not have loader yet");
    //     }
    //     return type;
    // }
    function getAssetExtralName(url) {
        let index = url.lastIndexOf("/");
        let filename = url.substr(index + 1);
        index = filename.indexOf(".", 0);
        let extname = filename.substr(index);
        return extname;
    }
    function getAssetDirectory(url) {
        let filei = url.lastIndexOf("/");
        let file = url.substr(0, filei);
        return file;
    }
    //# sourceMappingURL=Util.js.map

    class Resource {
        constructor() {
            this.resLoaderDic = {};
            /**
             * 调用load方法就会塞到这里面来
             */
            this.loadMap = {};
        }
        registerAssetLoader(extral, factory) {
            console.warn("loader type:", extral);
            this.resLoaderDic[extral] = factory;
        }
        getAssetLoader(url) {
            let extralType = getAssetExtralName(url);
            let factory = this.resLoaderDic[extralType];
            return factory;
        }
        /**
         * 加载资源
         * @param url 地址
         * @param onFinish  load回调]
         */
        load(url) {
            if (this.loadMap[url]) {
                return this.loadMap[url];
            }
            else {
                let loader = this.getAssetLoader(url);
                if (loader == null) {
                    let errorMsg = "ERROR: load Asset error. INfo: not have Load Func to handle (" + getAssetExtralName(url) + ") type File.  load URL:" + url;
                    return Promise.reject(errorMsg);
                }
                else {
                    this.loadMap[url] = loader.load(url);
                    return this.loadMap[url];
                }
            }
        }
    }
    //# sourceMappingURL=resource.js.map

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    var ResponseTypeEnum;
    (function (ResponseTypeEnum) {
        ResponseTypeEnum["text"] = "text";
        ResponseTypeEnum["json"] = "json";
        ResponseTypeEnum["blob"] = "blob";
        ResponseTypeEnum["arraybuffer"] = "arraybuffer";
    })(ResponseTypeEnum || (ResponseTypeEnum = {}));
    function httpRequeset(url, type, onProgress = null) {
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();
            req.open("GET", url);
            req.responseType = type;
            req.onprogress = e => {
                if (onProgress) {
                    onProgress({ loaded: e.loaded, total: e.total });
                }
            };
            req.onerror = e => {
                reject(e);
            };
            req.send();
            req.onreadystatechange = () => {
                if (req.readyState == 4) {
                    if (req.status == 404) {
                        reject(new Error("got a 404:" + url));
                        return;
                    }
                    resolve(req.response);
                }
            };
        });
    }
    function loadJson(url, onProgress = null) {
        return httpRequeset(url, ResponseTypeEnum.json, onProgress);
    }
    function loadArrayBuffer(url, onProgress = null) {
        return httpRequeset(url, ResponseTypeEnum.arraybuffer, onProgress);
    }
    function loadImg(url, onProgress = null) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = url;
            img.onerror = error => {
                reject(error);
            };
            img.onload = () => {
                resolve(img);
            };
            img.onprogress = e => {
                if (onProgress) {
                    onProgress({ loaded: e.loaded, total: e.total });
                }
            };
        });
    }
    //# sourceMappingURL=loadtool.js.map

    class BinReader {
        constructor(buf, seek = 0) {
            this._arrayBuffer = buf;
            this._byteOffset = seek;
            this._data = new DataView(buf, seek);
        }
        seek(seek) {
            this._byteOffset = seek;
        }
        peek() {
            return this._byteOffset;
        }
        getPosition() {
            return this._byteOffset;
        }
        getLength() {
            return this._data.byteLength;
        }
        canread() {
            //LogManager.Warn(this._buf.byteLength + "  &&&&&&&&&&&   " + this._seek + "    " + this._buf.buffer.byteLength);
            return this._data.byteLength - this._byteOffset;
        }
        skipBytes(len) {
            this._byteOffset += len;
        }
        readString() {
            let slen = this._data.getUint8(this._byteOffset);
            this._byteOffset++;
            let bs = "";
            for (let i = 0; i < slen; i++) {
                bs += String.fromCharCode(this._data.getUint8(this._byteOffset));
                this._byteOffset++;
            }
            return bs;
        }
        readStrLenAndContent() {
            let leng = this.readByte();
            return this.readUint8ArrToString(leng);
        }
        static _decodeBufferToText(buffer) {
            let result = "";
            const length = buffer.byteLength;
            for (let i = 0; i < length; i++) {
                result += String.fromCharCode(buffer[i]);
            }
            return result;
        }
        static utf8ArrayToString(array) {
            let ret = [];
            for (let i = 0; i < array.length; i++) {
                let cc = array[i];
                if (cc == 0)
                    break;
                let ct = 0;
                if (cc > 0xe0) {
                    ct = (cc & 0x0f) << 12;
                    cc = array[++i];
                    ct |= (cc & 0x3f) << 6;
                    cc = array[++i];
                    ct |= cc & 0x3f;
                    ret.push(String.fromCharCode(ct));
                }
                else if (cc > 0xc0) {
                    ct = (cc & 0x1f) << 6;
                    cc = array[++i];
                    ct |= (cc & 0x3f) << 6;
                    ret.push(String.fromCharCode(ct));
                }
                else if (cc > 0x80) {
                    throw new Error("InvalidCharacterError");
                }
                else {
                    ret.push(String.fromCharCode(array[i]));
                }
            }
            return ret.join("");
            //                let b = array[i];
            //    if (b > 0 && b < 16)
            //    {
            //        uri += '%0' + b.toString(16);
            //    }
            //    else if (b > 16)
            //    {
            //        uri += '%' + b.toString(16);
            //    }
            //}
            //return decodeURIComponent(uri);
        }
        // readStringUtf8(): string
        // {
        //     let length = this._data.getInt8(this._byteOffset);
        //     this._byteOffset++;
        //     let arr = new Uint8Array(length);
        //     this.readUint8Array(arr);
        //     return binReader.utf8ArrayToString(arr);
        // }
        readUint8ArrToString(length) {
            let arr = this.readUint8Array(length);
            return BinReader._decodeBufferToText(arr);
        }
        readSingle() {
            let num = this._data.getFloat32(this._byteOffset, true);
            this._byteOffset += 4;
            return num;
        }
        readDouble() {
            let num = this._data.getFloat64(this._byteOffset, true);
            this._byteOffset += 8;
            return num;
        }
        readInt8() {
            let num = this._data.getInt8(this._byteOffset);
            this._byteOffset += 1;
            return num;
        }
        readUInt8() {
            //LogManager.Warn(this._data.byteLength + "  @@@@@@@@@@@@@@@@@  " + this._seek);
            let num = this._data.getUint8(this._byteOffset);
            this._byteOffset += 1;
            return num;
        }
        readInt16() {
            //LogManager.Log(this._seek + "   " + this.length());
            let num = this._data.getInt16(this._byteOffset, true);
            this._byteOffset += 2;
            return num;
        }
        readUInt16() {
            let num = this._data.getUint16(this._byteOffset, true);
            this._byteOffset += 2;
            //LogManager.Warn("readUInt16 " + this._seek);
            return num;
        }
        readInt32() {
            let num = this._data.getInt32(this._byteOffset, true);
            this._byteOffset += 4;
            return num;
        }
        readUint32() {
            let num = this._data.getUint32(this._byteOffset, true);
            this._byteOffset += 4;
            return num;
        }
        readUint8Array(length) {
            const value = new Uint8Array(this._arrayBuffer, this._byteOffset, length);
            this._byteOffset += length;
            return value;
        }
        readUint8ArrayByOffset(target, offset, length = 0) {
            if (length < 0)
                length = target.length;
            for (let i = 0; i < length; i++) {
                target[i] = this._data.getUint8(offset);
                offset++;
            }
            return target;
        }
        set position(value) {
            this.seek(value);
        }
        get position() {
            return this.peek();
        }
        readBoolean() {
            return this.readUInt8() > 0;
        }
        readByte() {
            return this.readUInt8();
        }
        // readBytes(target: Uint8Array = null, length: number = -1): Uint8Array
        // {
        //     return this.readUint8Array(target, length);
        // }
        readUnsignedShort() {
            return this.readUInt16();
        }
        readUnsignedInt() {
            return this.readUint32();
        }
        readFloat() {
            return this.readSingle();
        }
        /// <summary>
        /// 有符号 Byte
        /// </summary>
        readSymbolByte() {
            return this.readInt8();
        }
        readShort() {
            return this.readInt16();
        }
        readInt() {
            return this.readInt32();
        }
    }
    //# sourceMappingURL=stream.js.map

    var AccessorComponentType;
    (function (AccessorComponentType) {
        /**
         * Byte
         */
        AccessorComponentType[AccessorComponentType["BYTE"] = 5120] = "BYTE";
        /**
         * Unsigned Byte
         */
        AccessorComponentType[AccessorComponentType["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
        /**
         * Short
         */
        AccessorComponentType[AccessorComponentType["SHORT"] = 5122] = "SHORT";
        /**
         * Unsigned Short
         */
        AccessorComponentType[AccessorComponentType["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
        /**
         * Unsigned Int
         */
        AccessorComponentType[AccessorComponentType["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
        /**
         * Float
         */
        AccessorComponentType[AccessorComponentType["FLOAT"] = 5126] = "FLOAT";
    })(AccessorComponentType || (AccessorComponentType = {}));
    /**
     * Specifies if the attirbute is a scalar, vector, or matrix
     */
    var AccessorType;
    (function (AccessorType) {
        /**
         * Scalar
         */
        AccessorType["SCALAR"] = "SCALAR";
        /**
         * Vector2
         */
        AccessorType["VEC2"] = "VEC2";
        /**
         * Vector3
         */
        AccessorType["VEC3"] = "VEC3";
        /**
         * Vector4
         */
        AccessorType["VEC4"] = "VEC4";
        /**
         * Matrix2x2
         */
        AccessorType["MAT2"] = "MAT2";
        /**
         * Matrix3x3
         */
        AccessorType["MAT3"] = "MAT3";
        /**
         * Matrix4x4
         */
        AccessorType["MAT4"] = "MAT4";
    })(AccessorType || (AccessorType = {}));
    /**
     * The name of the node's TRS property to modify, or the weights of the Morph Targets it instantiates
     */
    var AnimationChannelTargetPath;
    (function (AnimationChannelTargetPath) {
        /**
         * Translation
         */
        AnimationChannelTargetPath["TRANSLATION"] = "translation";
        /**
         * Rotation
         */
        AnimationChannelTargetPath["ROTATION"] = "rotation";
        /**
         * Scale
         */
        AnimationChannelTargetPath["SCALE"] = "scale";
        /**
         * Weights
         */
        AnimationChannelTargetPath["WEIGHTS"] = "weights";
    })(AnimationChannelTargetPath || (AnimationChannelTargetPath = {}));
    /**
     * Interpolation algorithm
     */
    var AnimationSamplerInterpolation;
    (function (AnimationSamplerInterpolation) {
        /**
         * The animated values are linearly interpolated between keyframes
         */
        AnimationSamplerInterpolation["LINEAR"] = "LINEAR";
        /**
         * The animated values remain constant to the output of the first keyframe, until the next keyframe
         */
        AnimationSamplerInterpolation["STEP"] = "STEP";
        /**
         * The animation's interpolation is computed using a cubic spline with specified tangents
         */
        AnimationSamplerInterpolation["CUBICSPLINE"] = "CUBICSPLINE";
    })(AnimationSamplerInterpolation || (AnimationSamplerInterpolation = {}));
    /**
     * A camera's projection.  A node can reference a camera to apply a transform to place the camera in the scene
     */
    var CameraType;
    (function (CameraType) {
        /**
         * A perspective camera containing properties to create a perspective projection matrix
         */
        CameraType["PERSPECTIVE"] = "perspective";
        /**
         * An orthographic camera containing properties to create an orthographic projection matrix
         */
        CameraType["ORTHOGRAPHIC"] = "orthographic";
    })(CameraType || (CameraType = {}));
    /**
     * The mime-type of the image
     */
    var ImageMimeType;
    (function (ImageMimeType) {
        /**
         * JPEG Mime-type
         */
        ImageMimeType["JPEG"] = "image/jpeg";
        /**
         * PNG Mime-type
         */
        ImageMimeType["PNG"] = "image/png";
    })(ImageMimeType || (ImageMimeType = {}));
    /**
     * The alpha rendering mode of the material
     */
    var MaterialAlphaMode;
    (function (MaterialAlphaMode) {
        /**
         * The alpha value is ignored and the rendered output is fully opaque
         */
        MaterialAlphaMode["OPAQUE"] = "OPAQUE";
        /**
         * The rendered output is either fully opaque or fully transparent depending on the alpha value and the specified alpha cutoff value
         */
        MaterialAlphaMode["MASK"] = "MASK";
        /**
         * The alpha value is used to composite the source and destination areas. The rendered output is combined with the background using the normal painting operation (i.e. the Porter and Duff over operator)
         */
        MaterialAlphaMode["BLEND"] = "BLEND";
    })(MaterialAlphaMode || (MaterialAlphaMode = {}));
    /**
     * The type of the primitives to render
     */
    var MeshPrimitiveMode;
    (function (MeshPrimitiveMode) {
        /**
         * Points
         */
        MeshPrimitiveMode[MeshPrimitiveMode["POINTS"] = 0] = "POINTS";
        /**
         * Lines
         */
        MeshPrimitiveMode[MeshPrimitiveMode["LINES"] = 1] = "LINES";
        /**
         * Line Loop
         */
        MeshPrimitiveMode[MeshPrimitiveMode["LINE_LOOP"] = 2] = "LINE_LOOP";
        /**
         * Line Strip
         */
        MeshPrimitiveMode[MeshPrimitiveMode["LINE_STRIP"] = 3] = "LINE_STRIP";
        /**
         * Triangles
         */
        MeshPrimitiveMode[MeshPrimitiveMode["TRIANGLES"] = 4] = "TRIANGLES";
        /**
         * Triangle Strip
         */
        MeshPrimitiveMode[MeshPrimitiveMode["TRIANGLE_STRIP"] = 5] = "TRIANGLE_STRIP";
        /**
         * Triangle Fan
         */
        MeshPrimitiveMode[MeshPrimitiveMode["TRIANGLE_FAN"] = 6] = "TRIANGLE_FAN";
    })(MeshPrimitiveMode || (MeshPrimitiveMode = {}));
    /**
     * Magnification filter.  Valid values correspond to WebGL enums: 9728 (NEAREST) and 9729 (LINEAR)
     */
    var TextureMagFilter;
    (function (TextureMagFilter) {
        /**
         * Nearest
         */
        TextureMagFilter[TextureMagFilter["NEAREST"] = 9728] = "NEAREST";
        /**
         * Linear
         */
        TextureMagFilter[TextureMagFilter["LINEAR"] = 9729] = "LINEAR";
    })(TextureMagFilter || (TextureMagFilter = {}));
    /**
     * Minification filter.  All valid values correspond to WebGL enums
     */
    var TextureMinFilter;
    (function (TextureMinFilter) {
        /**
         * Nearest
         */
        TextureMinFilter[TextureMinFilter["NEAREST"] = 9728] = "NEAREST";
        /**
         * Linear
         */
        TextureMinFilter[TextureMinFilter["LINEAR"] = 9729] = "LINEAR";
        /**
         * Nearest Mip-Map Nearest
         */
        TextureMinFilter[TextureMinFilter["NEAREST_MIPMAP_NEAREST"] = 9984] = "NEAREST_MIPMAP_NEAREST";
        /**
         * Linear Mipmap Nearest
         */
        TextureMinFilter[TextureMinFilter["LINEAR_MIPMAP_NEAREST"] = 9985] = "LINEAR_MIPMAP_NEAREST";
        /**
         * Nearest Mipmap Linear
         */
        TextureMinFilter[TextureMinFilter["NEAREST_MIPMAP_LINEAR"] = 9986] = "NEAREST_MIPMAP_LINEAR";
        /**
         * Linear Mipmap Linear
         */
        TextureMinFilter[TextureMinFilter["LINEAR_MIPMAP_LINEAR"] = 9987] = "LINEAR_MIPMAP_LINEAR";
    })(TextureMinFilter || (TextureMinFilter = {}));
    /**
     * S (U) wrapping mode.  All valid values correspond to WebGL enums
     */
    var TextureWrapMode;
    (function (TextureWrapMode) {
        /**
         * Clamp to Edge
         */
        TextureWrapMode[TextureWrapMode["CLAMP_TO_EDGE"] = 33071] = "CLAMP_TO_EDGE";
        /**
         * Mirrored Repeat
         */
        TextureWrapMode[TextureWrapMode["MIRRORED_REPEAT"] = 33648] = "MIRRORED_REPEAT";
        /**
         * Repeat
         */
        TextureWrapMode[TextureWrapMode["REPEAT"] = 10497] = "REPEAT";
    })(TextureWrapMode || (TextureWrapMode = {}));
    //# sourceMappingURL=GltfJsonStruct.js.map

    class ParseCameraNode {
        static parse(index, gltf) {
            let node = gltf.cameras[index];
            let cam = new Camera();
            switch (node.type) {
                case CameraType.PERSPECTIVE:
                    cam.projectionType = ProjectionEnum.PERSPECTIVE;
                    let data = node.perspective;
                    cam.fov = data.yfov;
                    cam.near = data.znear;
                    if (data.zfar) {
                        cam.far = data.zfar;
                    }
                    // if (data.aspectRatio) {
                    //     cam.aspest = data.aspectRatio;
                    // }
                    break;
                case CameraType.ORTHOGRAPHIC:
                    cam.projectionType = ProjectionEnum.ORTHOGRAPH;
                    let datao = node.orthographic;
                    cam.near = datao.znear;
                    cam.far = datao.zfar;
                    cam.size = datao.ymag;
                    // cam.aspest = datao.xmag / datao.ymag;
                    break;
            }
            return cam;
        }
    }
    //# sourceMappingURL=ParseCameraNode.js.map

    class ParseBufferNode {
        static parse(index, gltf) {
            if (gltf.cache.bufferNodeCache[index]) {
                return gltf.cache.bufferNodeCache[index];
            }
            else {
                let bufferNode = gltf.buffers[index];
                let url = gltf.rootURL + "/" + bufferNode.uri;
                let task = loadArrayBuffer(url).then(buffer => {
                    return buffer;
                });
                gltf.cache.bufferNodeCache[index] = task;
                return task;
            }
        }
    }
    //# sourceMappingURL=ParseBufferNode.js.map

    class ParseBufferViewNode {
        static parse(index, gltf) {
            if (gltf.cache.bufferviewNodeCache[index]) {
                return gltf.cache.bufferviewNodeCache[index];
            }
            else {
                let bufferview = gltf.bufferViews[index];
                let bufferindex = bufferview.buffer;
                let task = ParseBufferNode.parse(bufferindex, gltf).then(buffer => {
                    let viewbuffer = new Uint8Array(buffer, bufferview.byteOffset, bufferview.byteLength);
                    // let stride = bufferview.byteStride;
                    // let glbuffer = bufferview.target && GlRender.createBuffer(bufferview.target, viewbuffer);
                    // let glbuffer = bufferview.target && GlBuffer.fromViewData(bufferview.target, viewbuffer);
                    return { viewBuffer: viewbuffer, byteStride: bufferview.byteStride, target: bufferview.target };
                });
                gltf.cache.bufferviewNodeCache[index] = task;
                return task;
            }
        }
    }
    //# sourceMappingURL=ParseBufferViewNode.js.map

    var PixelDatatypeEnum;
    (function (PixelDatatypeEnum) {
        PixelDatatypeEnum[PixelDatatypeEnum["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
        PixelDatatypeEnum[PixelDatatypeEnum["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
        PixelDatatypeEnum[PixelDatatypeEnum["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
        PixelDatatypeEnum[PixelDatatypeEnum["FLOAT"] = 5126] = "FLOAT";
        PixelDatatypeEnum[PixelDatatypeEnum["HALF_FLOAT"] = 36193] = "HALF_FLOAT";
        PixelDatatypeEnum[PixelDatatypeEnum["UNSIGNED_INT_24_8"] = 34042] = "UNSIGNED_INT_24_8";
        PixelDatatypeEnum[PixelDatatypeEnum["UNSIGNED_SHORT_4_4_4_4"] = 32819] = "UNSIGNED_SHORT_4_4_4_4";
        PixelDatatypeEnum[PixelDatatypeEnum["UNSIGNED_SHORT_5_5_5_1"] = 32820] = "UNSIGNED_SHORT_5_5_5_1";
        PixelDatatypeEnum[PixelDatatypeEnum["UNSIGNED_SHORT_5_6_5"] = 33635] = "UNSIGNED_SHORT_5_6_5";
    })(PixelDatatypeEnum || (PixelDatatypeEnum = {}));
    (function (PixelDatatypeEnum) {
        function isPacked(pixelDatatype) {
            return pixelDatatype === PixelDatatypeEnum.UNSIGNED_INT_24_8 ||
                pixelDatatype === PixelDatatypeEnum.UNSIGNED_SHORT_4_4_4_4 ||
                pixelDatatype === PixelDatatypeEnum.UNSIGNED_SHORT_5_5_5_1 ||
                pixelDatatype === PixelDatatypeEnum.UNSIGNED_SHORT_5_6_5;
        }
        PixelDatatypeEnum.isPacked = isPacked;
        function sizeInBytes(pixelDatatype) {
            switch (pixelDatatype) {
                case PixelDatatypeEnum.UNSIGNED_BYTE:
                    return 1;
                case PixelDatatypeEnum.UNSIGNED_SHORT:
                case PixelDatatypeEnum.UNSIGNED_SHORT_4_4_4_4:
                case PixelDatatypeEnum.UNSIGNED_SHORT_5_5_5_1:
                case PixelDatatypeEnum.UNSIGNED_SHORT_5_6_5:
                case PixelDatatypeEnum.HALF_FLOAT:
                    return 2;
                case PixelDatatypeEnum.UNSIGNED_INT:
                case PixelDatatypeEnum.FLOAT:
                case PixelDatatypeEnum.UNSIGNED_INT_24_8:
                    return 4;
            }
        }
        PixelDatatypeEnum.sizeInBytes = sizeInBytes;
        function validate(pixelDatatype) {
            return ((pixelDatatype === PixelDatatypeEnum.UNSIGNED_BYTE) ||
                (pixelDatatype === PixelDatatypeEnum.UNSIGNED_SHORT) ||
                (pixelDatatype === PixelDatatypeEnum.UNSIGNED_INT) ||
                (pixelDatatype === PixelDatatypeEnum.FLOAT) ||
                (pixelDatatype === PixelDatatypeEnum.HALF_FLOAT) ||
                (pixelDatatype === PixelDatatypeEnum.UNSIGNED_INT_24_8) ||
                (pixelDatatype === PixelDatatypeEnum.UNSIGNED_SHORT_4_4_4_4) ||
                (pixelDatatype === PixelDatatypeEnum.UNSIGNED_SHORT_5_5_5_1) ||
                (pixelDatatype === PixelDatatypeEnum.UNSIGNED_SHORT_5_6_5));
        }
        PixelDatatypeEnum.validate = validate;
    })(PixelDatatypeEnum || (PixelDatatypeEnum = {}));
    //# sourceMappingURL=PixelDatatype.js.map

    var PixelFormatEnum;
    (function (PixelFormatEnum) {
        //----------------------------------------------------------
        //                 copy from cesium
        //------------------------------------------------------------
        /**
         * A pixel format containing a depth value.
         *
         * @type {Number}
         * @constant
         */
        PixelFormatEnum[PixelFormatEnum["DEPTH_COMPONENT"] = 6402] = "DEPTH_COMPONENT";
        /**
         * A pixel format containing a depth and stencil value, most often used with {@link PixelDatatype.UNSIGNED_INT_24_8}.
         *
         * @type {Number}
         * @constant
         */
        PixelFormatEnum[PixelFormatEnum["DEPTH_STENCIL"] = 34041] = "DEPTH_STENCIL";
        /**
         * A pixel format containing an alpha channel.
         *
         * @type {Number}
         * @constant
         */
        PixelFormatEnum[PixelFormatEnum["ALPHA"] = 6406] = "ALPHA";
        /**
         * A pixel format containing red, green, and blue channels.
         *
         * @type {Number}
         * @constant
         */
        PixelFormatEnum[PixelFormatEnum["RGB"] = 6407] = "RGB";
        /**
         * A pixel format containing red, green, blue, and alpha channels.
         *
         * @type {Number}
         * @constant
         */
        PixelFormatEnum[PixelFormatEnum["RGBA"] = 6408] = "RGBA";
        PixelFormatEnum[PixelFormatEnum["RG"] = 6409] = "RG";
        PixelFormatEnum[PixelFormatEnum["R"] = 6410] = "R";
        /**
         * A pixel format containing a luminance (intensity) channel.
         *
         * @type {Number}
         * @constant
         */
        PixelFormatEnum[PixelFormatEnum["LUMINANCE"] = 6409] = "LUMINANCE";
        /**
         * A pixel format containing luminance (intensity) and alpha channels.
         *
         * @type {Number}
         * @constant
         */
        PixelFormatEnum[PixelFormatEnum["LUMINANCE_ALPHA"] = 6410] = "LUMINANCE_ALPHA";
        /**
         * A pixel format containing red, green, and blue channels that is DXT1 compressed.
         *
         * @type {Number}
         * @constant
         */
        PixelFormatEnum[PixelFormatEnum["RGB_DXT1"] = 33776] = "RGB_DXT1";
        /**
         * A pixel format containing red, green, blue, and alpha channels that is DXT1 compressed.
         *
         * @type {Number}
         * @constant
         */
        PixelFormatEnum[PixelFormatEnum["RGBA_DXT1"] = 33777] = "RGBA_DXT1";
        /**
         * A pixel format containing red, green, blue, and alpha channels that is DXT3 compressed.
         *
         * @type {Number}
         * @constant
         */
        PixelFormatEnum[PixelFormatEnum["RGBA_DXT3"] = 33778] = "RGBA_DXT3";
        /**
         * A pixel format containing red, green, blue, and alpha channels that is DXT5 compressed.
         *
         * @type {Number}
         * @constant
         */
        PixelFormatEnum[PixelFormatEnum["RGBA_DXT5"] = 33779] = "RGBA_DXT5";
        /**
         * A pixel format containing red, green, and blue channels that is PVR 4bpp compressed.
         *
         * @type {Number}
         * @constant
         */
        PixelFormatEnum[PixelFormatEnum["RGB_PVRTC_4BPPV1"] = 35840] = "RGB_PVRTC_4BPPV1";
        /**
         * A pixel format containing red, green, and blue channels that is PVR 2bpp compressed.
         *
         * @type {Number}
         * @constant
         */
        PixelFormatEnum[PixelFormatEnum["RGB_PVRTC_2BPPV1"] = 35841] = "RGB_PVRTC_2BPPV1";
        /**
         * A pixel format containing red, green, blue, and alpha channels that is PVR 4bpp compressed.
         *
         * @type {Number}
         * @constant
         */
        PixelFormatEnum[PixelFormatEnum["RGBA_PVRTC_4BPPV1"] = 35842] = "RGBA_PVRTC_4BPPV1";
        /**
         * A pixel format containing red, green, blue, and alpha channels that is PVR 2bpp compressed.
         *
         * @type {Number}
         * @constant
         */
        PixelFormatEnum[PixelFormatEnum["RGBA_PVRTC_2BPPV1"] = 35843] = "RGBA_PVRTC_2BPPV1";
        /**
         * A pixel format containing red, green, and blue channels that is ETC1 compressed.
         *
         * @type {Number}
         * @constant
         */
        PixelFormatEnum[PixelFormatEnum["RGB_ETC1"] = 36196] = "RGB_ETC1";
    })(PixelFormatEnum || (PixelFormatEnum = {}));
    (function (PixelFormatEnum) {
        /**
         * @private
         */
        function componentsLength(pixelFormat) {
            switch (pixelFormat) {
                case PixelFormatEnum.RGB:
                    return 3;
                case PixelFormatEnum.RGBA:
                    return 4;
                case PixelFormatEnum.LUMINANCE_ALPHA:
                    return 2;
                case PixelFormatEnum.ALPHA:
                case PixelFormatEnum.LUMINANCE:
                    return 1;
                default:
                    return 1;
            }
        }
        PixelFormatEnum.componentsLength = componentsLength;
        function validate(pixelFormat) {
            return pixelFormat === PixelFormatEnum.DEPTH_COMPONENT ||
                pixelFormat === PixelFormatEnum.DEPTH_STENCIL ||
                pixelFormat === PixelFormatEnum.ALPHA ||
                pixelFormat === PixelFormatEnum.RGB ||
                pixelFormat === PixelFormatEnum.RGBA ||
                pixelFormat === PixelFormatEnum.LUMINANCE ||
                pixelFormat === PixelFormatEnum.LUMINANCE_ALPHA ||
                pixelFormat === PixelFormatEnum.RGB_DXT1 ||
                pixelFormat === PixelFormatEnum.RGBA_DXT1 ||
                pixelFormat === PixelFormatEnum.RGBA_DXT3 ||
                pixelFormat === PixelFormatEnum.RGBA_DXT5 ||
                pixelFormat === PixelFormatEnum.RGB_PVRTC_4BPPV1 ||
                pixelFormat === PixelFormatEnum.RGB_PVRTC_2BPPV1 ||
                pixelFormat === PixelFormatEnum.RGBA_PVRTC_4BPPV1 ||
                pixelFormat === PixelFormatEnum.RGBA_PVRTC_2BPPV1 ||
                pixelFormat === PixelFormatEnum.RGB_ETC1;
        }
        PixelFormatEnum.validate = validate;
        function isColorFormat(pixelFormat) {
            return pixelFormat === PixelFormatEnum.ALPHA ||
                pixelFormat === PixelFormatEnum.RGB ||
                pixelFormat === PixelFormatEnum.RGBA ||
                pixelFormat === PixelFormatEnum.LUMINANCE ||
                pixelFormat === PixelFormatEnum.LUMINANCE_ALPHA;
        }
        PixelFormatEnum.isColorFormat = isColorFormat;
        function isDepthFormat(pixelFormat) {
            return pixelFormat === PixelFormatEnum.DEPTH_COMPONENT ||
                pixelFormat === PixelFormatEnum.DEPTH_STENCIL;
        }
        PixelFormatEnum.isDepthFormat = isDepthFormat;
        function isCompressedFormat(pixelFormat) {
            return pixelFormat === PixelFormatEnum.RGB_DXT1 ||
                pixelFormat === PixelFormatEnum.RGBA_DXT1 ||
                pixelFormat === PixelFormatEnum.RGBA_DXT3 ||
                pixelFormat === PixelFormatEnum.RGBA_DXT5 ||
                pixelFormat === PixelFormatEnum.RGB_PVRTC_4BPPV1 ||
                pixelFormat === PixelFormatEnum.RGB_PVRTC_2BPPV1 ||
                pixelFormat === PixelFormatEnum.RGBA_PVRTC_4BPPV1 ||
                pixelFormat === PixelFormatEnum.RGBA_PVRTC_2BPPV1 ||
                pixelFormat === PixelFormatEnum.RGB_ETC1;
        }
        PixelFormatEnum.isCompressedFormat = isCompressedFormat;
        function isDXTFormat(pixelFormat) {
            return pixelFormat === PixelFormatEnum.RGB_DXT1 ||
                pixelFormat === PixelFormatEnum.RGBA_DXT1 ||
                pixelFormat === PixelFormatEnum.RGBA_DXT3 ||
                pixelFormat === PixelFormatEnum.RGBA_DXT5;
        }
        PixelFormatEnum.isDXTFormat = isDXTFormat;
        function isPVRTCFormat(pixelFormat) {
            return pixelFormat === PixelFormatEnum.RGB_PVRTC_4BPPV1 ||
                pixelFormat === PixelFormatEnum.RGB_PVRTC_2BPPV1 ||
                pixelFormat === PixelFormatEnum.RGBA_PVRTC_4BPPV1 ||
                pixelFormat === PixelFormatEnum.RGBA_PVRTC_2BPPV1;
        }
        PixelFormatEnum.isPVRTCFormat = isPVRTCFormat;
        function isETC1Format(pixelFormat) {
            return pixelFormat === PixelFormatEnum.RGB_ETC1;
        }
        PixelFormatEnum.isETC1Format = isETC1Format;
        function compressedTextureSizeInBytes(pixelFormat, width, height) {
            switch (pixelFormat) {
                case PixelFormatEnum.RGB_DXT1:
                case PixelFormatEnum.RGBA_DXT1:
                case PixelFormatEnum.RGB_ETC1:
                    return Math.floor((width + 3) / 4) * Math.floor((height + 3) / 4) * 8;
                case PixelFormatEnum.RGBA_DXT3:
                case PixelFormatEnum.RGBA_DXT5:
                    return Math.floor((width + 3) / 4) * Math.floor((height + 3) / 4) * 16;
                case PixelFormatEnum.RGB_PVRTC_4BPPV1:
                case PixelFormatEnum.RGBA_PVRTC_4BPPV1:
                    return Math.floor((Math.max(width, 8) * Math.max(height, 8) * 4 + 7) / 8);
                case PixelFormatEnum.RGB_PVRTC_2BPPV1:
                case PixelFormatEnum.RGBA_PVRTC_2BPPV1:
                    return Math.floor((Math.max(width, 16) * Math.max(height, 8) * 2 + 7) / 8);
                default:
                    return 0;
            }
        }
        PixelFormatEnum.compressedTextureSizeInBytes = compressedTextureSizeInBytes;
        function textureSizeInBytes(pixelFormat, pixelDatatype, width, height) {
            var componentsLength = PixelFormatEnum.componentsLength(pixelFormat);
            if (PixelDatatypeEnum.isPacked(pixelDatatype)) {
                componentsLength = 1;
            }
            return componentsLength * PixelDatatypeEnum.sizeInBytes(pixelDatatype) * width * height;
        }
        PixelFormatEnum.textureSizeInBytes = textureSizeInBytes;
        function alignmentInBytes(pixelFormat, pixelDatatype, width) {
            var mod = PixelFormatEnum.textureSizeInBytes(pixelFormat, pixelDatatype, width, 1) % 4;
            return mod === 0 ? 4 : (mod === 2 ? 2 : 1);
        }
        PixelFormatEnum.alignmentInBytes = alignmentInBytes;
        function createTypedArray(pixelFormat, pixelDatatype, width, height) {
            var constructor;
            var sizeInBytes = PixelDatatypeEnum.sizeInBytes(pixelDatatype);
            if (sizeInBytes === Uint8Array.BYTES_PER_ELEMENT) {
                constructor = Uint8Array;
            }
            else if (sizeInBytes === Uint16Array.BYTES_PER_ELEMENT) {
                constructor = Uint16Array;
            }
            else if (sizeInBytes === Float32Array.BYTES_PER_ELEMENT && pixelDatatype === PixelDatatypeEnum.FLOAT) {
                constructor = Float32Array;
            }
            else {
                constructor = Uint32Array;
            }
            var size = PixelFormatEnum.componentsLength(pixelFormat) * width * height;
            return new constructor(size);
        }
        PixelFormatEnum.createTypedArray = createTypedArray;
        function flipY(bufferView, pixelFormat, pixelDatatype, width, height) {
            if (height === 1) {
                return bufferView;
            }
            var flipped = PixelFormatEnum.createTypedArray(pixelFormat, pixelDatatype, width, height);
            var numberOfComponents = PixelFormatEnum.componentsLength(pixelFormat);
            var textureWidth = width * numberOfComponents;
            for (var i = 0; i < height; ++i) {
                var row = i * height * numberOfComponents;
                var flippedRow = (height - i - 1) * height * numberOfComponents;
                for (var j = 0; j < textureWidth; ++j) {
                    flipped[flippedRow + j] = bufferView[row + j];
                }
            }
            return flipped;
        }
        PixelFormatEnum.flipY = flipY;
    })(PixelFormatEnum || (PixelFormatEnum = {}));
    //# sourceMappingURL=PixelFormatEnum.js.map

    // export enum TextureFilterEnum
    // {
    //     /**
    //      * Samples the texture by returning the closest pixel.
    //      *
    //      * @type {Number}
    //      * @constant
    //      */
    //     NEAREST = GlConstants.NEAREST,
    //     /**
    //      * Samples the texture through bi-linear interpolation of the four nearest pixels. This produces smoother results than <code>NEAREST</code> filtering.
    //      *
    //      * @type {Number}
    //      * @constant
    //      */
    //     LINEAR = GlConstants.LINEAR,
    //     /**
    //      * Selects the nearest mip level and applies nearest sampling within that level.
    //      * <p>
    //      * Requires that the texture has a mipmap. The mip level is chosen by the view angle and screen-space size of the texture.
    //      * </p>
    //      *
    //      * @type {Number}
    //      * @constant
    //      */
    //     NEAREST_MIPMAP_NEAREST = GlConstants.NEAREST_MIPMAP_NEAREST,
    //     /**
    //      * Selects the nearest mip level and applies linear sampling within that level.
    //      * <p>
    //      * Requires that the texture has a mipmap. The mip level is chosen by the view angle and screen-space size of the texture.
    //      * </p>
    //      *
    //      * @type {Number}
    //      * @constant
    //      */
    //     LINEAR_MIPMAP_NEAREST = GlConstants.LINEAR_MIPMAP_NEAREST,
    //     /**
    //      * Read texture values with nearest sampling from two adjacent mip levels and linearly interpolate the results.
    //      * <p>
    //      * This option provides a good balance of visual quality and speed when sampling from a mipmapped texture.
    //      * </p>
    //      * <p>
    //      * Requires that the texture has a mipmap. The mip level is chosen by the view angle and screen-space size of the texture.
    //      * </p>
    //      *
    //      * @type {Number}
    //      * @constant
    //      */
    //     NEAREST_MIPMAP_LINEAR = GlConstants.NEAREST_MIPMAP_LINEAR,
    //     /**
    //      * Read texture values with linear sampling from two adjacent mip levels and linearly interpolate the results.
    //      * <p>
    //      * This option provides a good balance of visual quality and speed when sampling from a mipmapped texture.
    //      * </p>
    //      * <p>
    //      * Requires that the texture has a mipmap. The mip level is chosen by the view angle and screen-space size of the texture.
    //      * </p>
    //      * @type {Number}
    //      * @constant
    //      */
    //     LINEAR_MIPMAP_LINEAR = GlConstants.LINEAR_MIPMAP_LINEAR
    // }
    // export namespace TextureFilterEnum
    // {
    //     export function beMipmap(type: TextureFilterEnum)
    //     {
    //         return (type === TextureFilterEnum.NEAREST_MIPMAP_NEAREST) ||
    //             (type === TextureFilterEnum.NEAREST_MIPMAP_LINEAR) ||
    //             (type === TextureFilterEnum.LINEAR_MIPMAP_NEAREST) ||
    //             (type === TextureFilterEnum.LINEAR_MIPMAP_LINEAR);
    //     }
    // }
    /**
     * 由mipmap filter type 和 texture filter type 来决定最终的 filter ttype
     */
    var TextureFilterEnum;
    (function (TextureFilterEnum) {
        TextureFilterEnum[TextureFilterEnum["NEAREST"] = 9728] = "NEAREST";
        TextureFilterEnum[TextureFilterEnum["LINEAR"] = 9729] = "LINEAR";
    })(TextureFilterEnum || (TextureFilterEnum = {}));
    (function (TextureFilterEnum) {
        function realfilter(filter, enableMimap, mipmapFilter) {
            if (enableMimap) {
                if (mipmapFilter == TextureFilterEnum.LINEAR) {
                    if (filter == TextureFilterEnum.LINEAR) {
                        return GlConstants.LINEAR_MIPMAP_LINEAR;
                    }
                    else {
                        return GlConstants.NEAREST_MIPMAP_LINEAR;
                    }
                }
                else {
                    if (filter == TextureFilterEnum.LINEAR) {
                        return GlConstants.LINEAR_MIPMAP_NEAREST;
                    }
                    else {
                        return GlConstants.LINEAR_MIPMAP_NEAREST;
                    }
                }
            }
            else {
                return filter;
            }
        }
        TextureFilterEnum.realfilter = realfilter;
    })(TextureFilterEnum || (TextureFilterEnum = {}));
    //# sourceMappingURL=TextureFilterEnum.js.map

    var TextureWrapEnum;
    (function (TextureWrapEnum) {
        TextureWrapEnum[TextureWrapEnum["REPEAT"] = 10497] = "REPEAT";
        TextureWrapEnum[TextureWrapEnum["CLAMP_TO_EDGE"] = 33071] = "CLAMP_TO_EDGE";
        TextureWrapEnum[TextureWrapEnum["MIRRORED_REPEAT"] = 33648] = "MIRRORED_REPEAT";
    })(TextureWrapEnum || (TextureWrapEnum = {}));
    //# sourceMappingURL=TextureWrapEnum.js.map

    //tip:TEXTURE_MAG_FILTER 固定为LINEAR https://community.khronos.org/t/bilinear-and-trilinear-cant-see-a-difference/39405
    class Texture {
        constructor(options) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            let { context, width, height, source, pixelFormat = PixelFormatEnum.RGBA, pixelDatatype = PixelDatatypeEnum.UNSIGNED_BYTE } = options;
            if (source != null) {
                if (width == null) {
                    width = (_a = source.videoWidth) !== null && _a !== void 0 ? _a : source.width;
                }
                if (height == null) {
                    height = (_b = source.videoHeight) !== null && _b !== void 0 ? _b : source.height;
                }
            }
            let internalFormat = pixelFormat;
            let isCompressed = PixelFormatEnum.isCompressedFormat(internalFormat);
            if (context.webGLVersion == 2) {
                if (pixelFormat == PixelFormatEnum.DEPTH_STENCIL) {
                    internalFormat = GlConstants.DEPTH24_STENCIL8;
                }
                else if (pixelFormat == PixelFormatEnum.DEPTH_COMPONENT) {
                    if (pixelDatatype == PixelDatatypeEnum.UNSIGNED_SHORT) {
                        internalFormat = GlConstants.DEPTH_COMPONENT16;
                    }
                    else if (pixelDatatype == PixelDatatypeEnum.UNSIGNED_INT) {
                        internalFormat = GlConstants.DEPTH_COMPONENT24;
                    }
                }
                if (pixelDatatype === PixelDatatypeEnum.FLOAT) {
                    switch (pixelFormat) {
                        case PixelFormatEnum.RGBA:
                            internalFormat = GlConstants.RGBA32F;
                            break;
                        case PixelFormatEnum.RGB:
                            internalFormat = GlConstants.RGB32F;
                            break;
                        case PixelFormatEnum.RG:
                            internalFormat = GlConstants.RG32F;
                            break;
                        case PixelFormatEnum.R:
                            internalFormat = GlConstants.R32F;
                            break;
                    }
                }
                else if (pixelDatatype === PixelDatatypeEnum.HALF_FLOAT) {
                    switch (pixelFormat) {
                        case PixelFormatEnum.RGBA:
                            internalFormat = GlConstants.RGBA16F;
                            break;
                        case PixelFormatEnum.RGB:
                            internalFormat = GlConstants.RGB16F;
                            break;
                        case PixelFormatEnum.RG:
                            internalFormat = GlConstants.RG16F;
                            break;
                        case PixelFormatEnum.R:
                            internalFormat = GlConstants.R16F;
                            break;
                    }
                }
            }
            if ((pixelFormat === PixelFormatEnum.DEPTH_COMPONENT) &&
                ((pixelDatatype !== PixelDatatypeEnum.UNSIGNED_SHORT) && (pixelDatatype !== PixelDatatypeEnum.UNSIGNED_INT))) {
                throw new Error('When options.pixelFormat is DEPTH_COMPONENT, options.pixelDatatype must be UNSIGNED_SHORT or UNSIGNED_INT.');
            }
            if ((pixelFormat === PixelFormatEnum.DEPTH_STENCIL) && (pixelDatatype !== PixelDatatypeEnum.UNSIGNED_INT_24_8)) {
                throw new Error('When options.pixelFormat is DEPTH_STENCIL, options.pixelDatatype must be UNSIGNED_INT_24_8.');
            }
            if ((pixelDatatype === PixelDatatypeEnum.FLOAT) && !context.caps.textureFloat) {
                throw new Error('When options.pixelDatatype is FLOAT, this WebGL implementation must support the OES_texture_float extension.  Check context.floatingPointTexture.');
            }
            if ((pixelDatatype === PixelDatatypeEnum.HALF_FLOAT) && !context.caps.textureHalfFloat) {
                throw new Error('When options.pixelDatatype is HALF_FLOAT, this WebGL implementation must support the OES_texture_half_float extension. Check context.halfFloatingPointTexture.');
            }
            if (PixelFormatEnum.isDepthFormat(pixelFormat)) {
                if (source != null) {
                    throw new Error('When options.pixelFormat is DEPTH_COMPONENT or DEPTH_STENCIL, source cannot be provided.');
                }
                if (!context.caps.depthTexture) {
                    throw new Error('When options.pixelFormat is DEPTH_COMPONENT or DEPTH_STENCIL, this WebGL implementation must support WEBGL_depth_texture.  Check context.depthTexture.');
                }
            }
            if (isCompressed) {
                if (source == null || source.arrayBufferView == null) {
                    throw new Error('When options.pixelFormat is compressed, options.source.arrayBufferView must be defined.');
                }
                if (PixelFormatEnum.isDXTFormat(internalFormat) && !context.caps.s3tc) {
                    throw new Error('When options.pixelFormat is S3TC compressed, this WebGL implementation must support the WEBGL_texture_compression_s3tc extension. Check context.s3tc.');
                }
                else if (PixelFormatEnum.isPVRTCFormat(internalFormat) && !context.caps.pvrtc) {
                    throw new Error('When options.pixelFormat is PVRTC compressed, this WebGL implementation must support the WEBGL_texture_compression_pvrtc extension. Check context.pvrtc.');
                }
                else if (PixelFormatEnum.isETC1Format(internalFormat) && !context.caps.etc1) {
                    throw new Error('When options.pixelFormat is ETC1 compressed, this WebGL implementation must support the WEBGL_texture_compression_etc1 extension. Check context.etc1.');
                }
                if (PixelFormatEnum.compressedTextureSizeInBytes(internalFormat, width, height) !== source.arrayBufferView.byteLength) {
                    throw new Error('The byte length of the array buffer is invalid for the compressed texture with the given width and height.');
                }
            }
            let flipY = (_c = options.flipY) !== null && _c !== void 0 ? _c : false;
            let preMultiplyAlpha = options.preMultiplyAlpha || pixelFormat === PixelFormatEnum.RGB || pixelFormat === PixelFormatEnum.LUMINANCE;
            let gl = context.gl;
            let target = gl.TEXTURE_2D;
            let texture = gl.createTexture();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(target, texture);
            let unpackAlignment = 4;
            if (source && source.arrayBufferView && !isCompressed) {
                unpackAlignment = PixelFormatEnum.alignmentInBytes(pixelFormat, pixelDatatype, width);
            }
            gl.pixelStorei(gl.UNPACK_ALIGNMENT, unpackAlignment);
            let initialized = true;
            if (source) {
                if (source.arrayBufferView) // Source: typed array
                 {
                    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
                    var arrayBufferView = source.arrayBufferView;
                    if (isCompressed) {
                        gl.compressedTexImage2D(target, 0, internalFormat, width, height, 0, arrayBufferView);
                    }
                    else {
                        if (flipY) {
                            arrayBufferView = PixelFormatEnum.flipY(arrayBufferView, pixelFormat, pixelDatatype, width, height);
                        }
                        gl.texImage2D(target, 0, internalFormat, width, height, 0, pixelFormat, pixelDatatype, arrayBufferView);
                    }
                }
                else if (source.framebuffer != null) // Source: framebuffer
                 {
                    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
                    source.framebuffer.bind();
                    gl.copyTexImage2D(target, 0, internalFormat, source.xOffset, source.yOffset, width, height, 0);
                    source.framebuffer.unbind();
                }
                else // Source: ImageData, HTMLImageElement, HTMLCanvasElement, or HTMLVideoElement
                 {
                    // Only valid for DOM-Element uploads
                    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, preMultiplyAlpha);
                    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
                    gl.texImage2D(target, 0, internalFormat, pixelFormat, pixelDatatype, source);
                }
                initialized = true;
            }
            else {
                gl.texImage2D(target, 0, internalFormat, width, height, 0, pixelFormat, pixelDatatype, null);
                initialized = false;
            }
            // let sampler = new Sampler(options.sampler);
            this.filterMax = ((_d = options.sampler) === null || _d === void 0 ? void 0 : _d.filterMax) || TextureFilterEnum.LINEAR;
            this.filterMin = ((_e = options.sampler) === null || _e === void 0 ? void 0 : _e.filterMin) || TextureFilterEnum.LINEAR;
            this.wrapS = ((_f = options.sampler) === null || _f === void 0 ? void 0 : _f.wrapS) || TextureWrapEnum.REPEAT;
            this.wrapT = ((_g = options.sampler) === null || _g === void 0 ? void 0 : _g.wrapT) || TextureWrapEnum.REPEAT;
            this.maximumAnisotropy = ((_h = options.sampler) === null || _h === void 0 ? void 0 : _h.maximumAnisotropy) || 1.0;
            this.enableMimap = (_k = (_j = options.sampler) === null || _j === void 0 ? void 0 : _j.enableMimap) !== null && _k !== void 0 ? _k : true;
            this.mipmapFilter = (_m = (_l = options.sampler) === null || _l === void 0 ? void 0 : _l.mipmapFilter) !== null && _m !== void 0 ? _m : TextureFilterEnum.LINEAR;
            if (context.webGLVersion != 1) {
                if (PixelFormatEnum.isDepthFormat(this.pixelFormat)
                    || PixelFormatEnum.isCompressedFormat(this.pixelFormat)
                    || !isPowerOf2(this.width)
                    || !isPowerOf2(this.height)) {
                    // throw new Error('Cannot call generateMipmap when the texture pixel format is DEPTH_COMPONENT or DEPTH_STENCIL.');
                    // throw new Error('Cannot call generateMipmap with a compressed pixel format.');
                    // throw new Error('width must be a power of two to call generateMipmap().');
                    // throw new Error('height must be a power of two to call generateMipmap().');
                    this.enableMimap = false;
                }
                if (!isPowerOf2(this.width)
                    || !isPowerOf2(this.height)) {
                    //throw new Error("texture repeat need Img size be power of 2!");
                    this.wrapS = TextureWrapEnum.CLAMP_TO_EDGE;
                    this.wrapT = TextureWrapEnum.CLAMP_TO_EDGE;
                }
                // float textures only support nearest filtering unless the linear extensions are supported, so override the sampler's settings
                if ((pixelDatatype === PixelDatatypeEnum.FLOAT && !context.caps.textureFloat)
                    || (pixelDatatype === PixelDatatypeEnum.HALF_FLOAT && !context.caps.textureHalfFloat)) {
                    this.filterMax = TextureFilterEnum.NEAREST;
                    this.filterMin = TextureFilterEnum.NEAREST;
                    this.mipmapFilter = TextureFilterEnum.NEAREST;
                }
            }
            gl.texParameteri(target, gl.TEXTURE_WRAP_S, this.wrapS);
            gl.texParameteri(target, gl.TEXTURE_WRAP_T, this.wrapT);
            gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, TextureFilterEnum.realfilter(this.filterMin, this.enableMimap, this.mipmapFilter));
            gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, this.filterMax);
            if (this._textureFilterAnisotropic) {
                gl.texParameteri(target, this._textureFilterAnisotropic.TEXTURE_MAX_ANISOTROPY_EXT, this.maximumAnisotropy);
            }
            gl.bindTexture(target, null);
            let sizeInBytes = isCompressed ?
                PixelFormatEnum.compressedTextureSizeInBytes(pixelFormat, width, height)
                : PixelFormatEnum.textureSizeInBytes(pixelFormat, pixelDatatype, width, height);
            this.texture = texture;
            this.pixelFormat = pixelFormat;
            this.pixelDatatype = pixelDatatype;
            this.width = width;
            this.height = height;
            this.hasMipmap = false;
            this.sizeInBytes = sizeInBytes;
            this.preMultiplyAlpha = preMultiplyAlpha;
            this.flipY = flipY;
            this.initialized = initialized;
            this._context = context;
            this._textureFilterAnisotropic = context.caps.textureAnisotropicFilterExtension;
            this._gl = gl;
        }
        bind(unit = 0) {
            let gl = this._gl;
            gl.activeTexture(gl.TEXTURE0 + unit);
            gl.bindTexture(gl.TEXTURE_2D, this.texture);
        }
        unbind() {
            this._gl.bindTexture(this._gl.TEXTURE_2D, null);
        }
        destroy() {
            this._context.gl.deleteTexture(this.texture);
        }
        /**
         * // Source: typed array
         * @param options
         */
        static fromTypedArray(options) {
            return new Texture(Object.assign(Object.assign({}, options), { source: { arrayBufferView: options.arrayBufferView } }));
        }
        /**
         * // Source: ImageData, HTMLImageElement, HTMLCanvasElement, or HTMLVideoElement
         * @param options
         */
        static fromImageSource(options) {
            return new Texture(Object.assign(Object.assign({}, options), { source: options.image }));
        }
        static fromFrameBuffer(options) {
            return new Texture(Object.assign(Object.assign({}, options), { source: { framebuffer: options.framebuffer, xOffset: options.xOffset, yOffset: options.yOffset } }));
        }
    }
    class Sampler {
        constructor(options) {
            var _a, _b;
            this.filterMax = (options === null || options === void 0 ? void 0 : options.filterMax) || TextureFilterEnum.LINEAR;
            this.filterMin = (options === null || options === void 0 ? void 0 : options.filterMin) || TextureFilterEnum.LINEAR;
            this.wrapS = (options === null || options === void 0 ? void 0 : options.wrapS) || TextureWrapEnum.REPEAT;
            this.wrapT = (options === null || options === void 0 ? void 0 : options.wrapT) || TextureWrapEnum.REPEAT;
            this.maximumAnisotropy = (options === null || options === void 0 ? void 0 : options.maximumAnisotropy) || 1.0;
            this.enableMimap = (_a = options === null || options === void 0 ? void 0 : options.enableMimap) !== null && _a !== void 0 ? _a : false;
            this.mipmapFilter = (_b = options === null || options === void 0 ? void 0 : options.mipmapFilter) !== null && _b !== void 0 ? _b : TextureFilterEnum.LINEAR;
        }
    }
    var MipmapHintEnum;
    (function (MipmapHintEnum) {
        MipmapHintEnum[MipmapHintEnum["DONT_CARE"] = 4352] = "DONT_CARE";
        MipmapHintEnum[MipmapHintEnum["FASTEST"] = 4353] = "FASTEST";
        MipmapHintEnum[MipmapHintEnum["NICEST"] = 4354] = "NICEST";
    })(MipmapHintEnum || (MipmapHintEnum = {}));
    //# sourceMappingURL=Texture.js.map

    class Asset extends UniqueObject {
        constructor() {
            super(...arguments);
            this._becreated = true;
            this._becreating = false;
            this.onDirty = new EventHandler();
            this.onCreated = new EventHandler();
        }
        get becreated() { return this._becreated; }
        ;
        get becreating() { return this._becreating; }
        ;
        destroy() { }
    }
    //# sourceMappingURL=Asset.js.map

    class TextureAsset extends Asset {
        constructor() {
            super(...arguments);
            this.beNeedRefreshGraphicAsset = false;
        }
        bind(device, unit = 0) {
            var _a;
            if (this.graphicAsset == null) {
                this.graphicAsset = this.create(device);
                this.onCreated.raiseEvent();
                this.beNeedRefreshGraphicAsset = false;
            }
            if (this.beNeedRefreshGraphicAsset) {
                this.refresh(device);
                this.beNeedRefreshGraphicAsset = false;
            }
            (_a = this.graphicAsset) === null || _a === void 0 ? void 0 : _a.bind(unit);
        }
        unbind() {
            this.graphicAsset.unbind();
        }
        destroy() {
            var _a;
            (_a = this.graphicAsset) === null || _a === void 0 ? void 0 : _a.destroy();
            super.destroy();
        }
    }
    //# sourceMappingURL=TextureAsset.js.map

    class Texture2D extends TextureAsset {
        constructor(options) {
            var _a;
            super();
            this._source = options === null || options === void 0 ? void 0 : options.image;
            this._pixelFormat = (options === null || options === void 0 ? void 0 : options.pixelFormat) || PixelFormatEnum.RGBA;
            this._pixelDatatype = (options === null || options === void 0 ? void 0 : options.pixelDatatype) || PixelDatatypeEnum.UNSIGNED_BYTE;
            this._preMultiplyAlpha = (options === null || options === void 0 ? void 0 : options.preMultiplyAlpha) || this.pixelFormat === PixelFormatEnum.RGB || this.pixelFormat === PixelFormatEnum.LUMINANCE;
            this._flipY = (_a = options === null || options === void 0 ? void 0 : options.flipY) !== null && _a !== void 0 ? _a : true;
            this.sampler = new Sampler(options === null || options === void 0 ? void 0 : options.sampler);
        }
        create(device) {
            if (this._source) {
                return Texture.fromImageSource({
                    context: device,
                    image: this._source,
                    pixelFormat: this._pixelFormat,
                    pixelDatatype: this._pixelDatatype,
                    sampler: this.sampler
                });
            }
            return null;
        }
        refresh(device) {
            throw new Error("Method not implemented.");
        }
        set textureSource(source) { this._source = source; }
        set pixelFormat(format) { this._pixelFormat = format; }
        ;
        set pixelDatatype(type) { this._pixelDatatype = type; }
        ;
        set preMultiplyAlpha(value) { this._preMultiplyAlpha = value; }
        set flipY(value) { this._flipY = value; }
    }
    //# sourceMappingURL=Texture2d.js.map

    class ParseTextureNode {
        static parse(index, gltf) {
            if (gltf.cache.textrueNodeCache[index]) {
                return gltf.cache.textrueNodeCache[index];
            }
            else {
                if (gltf.textures == null)
                    return null;
                let node = gltf.textures[index];
                if (gltf.images == null)
                    return null;
                let imageNode = gltf.images[node.source];
                if (imageNode.uri != null) {
                    let imagUrl = gltf.rootURL + "/" + imageNode.uri;
                    let task = loadImg(imagUrl).then(img => {
                        let texOp = {};
                        if (node.sampler != null) {
                            let samplerinfo = gltf.samplers[node.sampler];
                            if (samplerinfo.wrapS != null) {
                                texOp.wrapS = samplerinfo.wrapS;
                            }
                            if (samplerinfo.wrapT) {
                                texOp.wrapT = samplerinfo.wrapT;
                            }
                            if (samplerinfo.magFilter) {
                                texOp.filterMax = samplerinfo.magFilter;
                            }
                            if (samplerinfo.minFilter) {
                                texOp.filterMin = samplerinfo.minFilter;
                            }
                        }
                        let texture = new Texture2D({ image: img });
                        return texture;
                    });
                    gltf.cache.textrueNodeCache[index] = task;
                    return task;
                }
                else {
                    let task = ParseBufferViewNode.parse(imageNode.bufferView, gltf)
                        .then(viewnode => {
                        let texOp = {}; //todo
                        if (node.sampler != null) {
                            let samplerinfo = gltf.samplers[node.sampler];
                            if (samplerinfo.wrapS != null) {
                                texOp.wrapS = samplerinfo.wrapS;
                            }
                            if (samplerinfo.wrapT) {
                                texOp.wrapT = samplerinfo.wrapT;
                            }
                            if (samplerinfo.magFilter) {
                                texOp.filterMax = samplerinfo.magFilter;
                            }
                            if (samplerinfo.minFilter) {
                                texOp.filterMin = samplerinfo.minFilter;
                            }
                        }
                        return new Promise((resolve, reject) => {
                            var blob = new Blob([viewnode.viewBuffer], { type: imageNode.mimeType });
                            var imageUrl = window.URL.createObjectURL(blob);
                            let img = new Image();
                            img.src = imageUrl;
                            img.onerror = error => {
                                reject(error);
                            };
                            img.onload = () => {
                                URL.revokeObjectURL(img.src);
                                resolve(img);
                            };
                        }).then((img) => {
                            let texture = new Texture2D({ image: img });
                            return texture;
                        });
                    });
                    gltf.cache.textrueNodeCache[index] = task;
                    return task;
                }
                // let asset=assetMgr.load(bundle.rootURL+"/"+uri.uri) as Texture;
            }
        }
    }
    //# sourceMappingURL=ParseTextureNode.js.map

    /***
     * @example usage
     * let shader=new ShaderProgam({
     *    context:context,
     *    attributes:{
     *      "apos":VertexAttEnum.POSITION
     *      },
     *    vsStr:`
     *          attribute vec4 apos;
     *          void main()
     *          {
     *              gl_Position =vec4(apos.xyz,1.0);
     *          }
     *      `,
     *     fsStr:`
     *          void main()
     *          {
     *                  gl_FragData[0] =vec4(1.0);
     *          }
     *      `,
     * });
     */
    class ShaderProgram {
        constructor(options) {
            /**
             * uniform value guid 缓存，用于更新修改的uniform
             */
            this._cachedUniform = {};
            let res = options.context.complileAndLinkShader(options);
            if (res) {
                this.program = res.shader;
                this.uniforms = res.uniforms;
                // this.samples = res.samples;
                this.attributes = res.attributes;
                //---------------------初始化 uniforms缓存值 为null
                let type;
                for (let key in this.uniforms) {
                    type = this.uniforms[key].type;
                    if (type == UniformTypeEnum.FLOAT || type === UniformTypeEnum.INT || type === UniformTypeEnum.BOOL) {
                        this.uniforms[key].value = null;
                    }
                    else {
                        this.uniforms[key].value = [null, null, null, null];
                    }
                }
            }
            let gl = options.context.gl;
            this.bind = () => {
                if (this.program != ShaderProgram._cachedProgram) {
                    gl.useProgram(this.program);
                    ShaderProgram._cachedProgram = this.program;
                }
            };
            this.unbind = () => {
                gl.useProgram(null);
                ShaderProgram._cachedProgram = null;
            };
            this.bindUniform = (name, value) => {
                // let _cahched = this._cachedUniform[name];
                // if (_cahched == null || _cahched != value.guid)
                // {
                //     this._cachedUniform[name] = value.guid;
                //     options.context.setUniform(this.uniforms[name], value);
                // }
                options.context.setUniform(this.uniforms[name], value);
            };
        }
        bindUniform(key, value) { }
        bindUniforms(device, values) {
            // for (let key in this.uniforms)
            // {
            //     if (value[key])
            //     {
            //         this.bindUniform(key, value[key]);
            //     }
            // }
            // let unit = 0;
            // for (let key in this.samples)
            // {
            //     if (value[key])
            //     {
            //         value[key].bind(device, unit++);
            //     }
            // }
            let uniformInfo;
            for (let key in values) {
                uniformInfo = this.uniforms[key];
                uniformInfo === null || uniformInfo === void 0 ? void 0 : uniformInfo.setter(uniformInfo, values[key]);
            }
        }
        bind() { }
        unbind() { }
        destroy() { }
    }
    //# sourceMappingURL=ShaderProgam.js.map

    /* eslint-disable @typescript-eslint/camelcase */
    var Private$5;
    (function (Private) {
        Private.datatypeToGlsl = {};
        {
            Private.datatypeToGlsl[UniformTypeEnum.FLOAT] = "float";
            Private.datatypeToGlsl[UniformTypeEnum.FLOAT_VEC2] = "vec2";
            Private.datatypeToGlsl[UniformTypeEnum.FLOAT_VEC3] = "vec3";
            Private.datatypeToGlsl[UniformTypeEnum.FLOAT_VEC4] = "vec4";
            Private.datatypeToGlsl[UniformTypeEnum.INT] = "int";
            Private.datatypeToGlsl[UniformTypeEnum.INT_VEC2] = "ivec2";
            Private.datatypeToGlsl[UniformTypeEnum.INT_VEC3] = "ivec3";
            Private.datatypeToGlsl[UniformTypeEnum.INT_VEC4] = "ivec4";
            Private.datatypeToGlsl[UniformTypeEnum.BOOL] = "bool";
            Private.datatypeToGlsl[UniformTypeEnum.BOOL_VEC2] = "bvec2";
            Private.datatypeToGlsl[UniformTypeEnum.BOOL_VEC3] = "bvec3";
            Private.datatypeToGlsl[UniformTypeEnum.BOOL_VEC4] = "bvec4";
            Private.datatypeToGlsl[UniformTypeEnum.FLOAT_MAT2] = "mat2";
            Private.datatypeToGlsl[UniformTypeEnum.FLOAT_MAT3] = "mat3";
            Private.datatypeToGlsl[UniformTypeEnum.FLOAT_MAT4] = "mat4";
            Private.datatypeToGlsl[UniformTypeEnum.SAMPLER_2D] = "sampler2D";
            Private.datatypeToGlsl[UniformTypeEnum.SAMPLER_CUBE] = "samplerCube";
        }
        Private.autoUniformDic = {};
    })(Private$5 || (Private$5 = {}));
    class AutoUniforms {
        static containAuto(unfiorm) {
            return this.autoUniformDic[unfiorm] != null;
        }
        static registAutomaticUniform(unfiorm, node) {
            this.autoUniformDic[unfiorm] = node;
        }
        static getUniformDeclaration(unfiorm) {
            let node = this.autoUniformDic[unfiorm];
            if (node == null) {
                return null;
            }
            let declaration = "uniform " + Private$5.datatypeToGlsl[node.datatype] + " " + name;
            if (node.size === 1) {
                declaration += ";";
            }
            else {
                declaration += "[" + node.size.toString() + "];";
            }
            return declaration;
        }
        static getAutoUniformValue(uniform, uniformState) {
            return this.autoUniformDic[uniform].getValue(uniformState);
        }
    }
    AutoUniforms.autoUniformDic = {
        czm_model: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT_MAT4,
            getValue: (uniformState) => {
                return uniformState.matrixModel;
            },
        },
        czm_view: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT_MAT4,
            getValue: (uniformState) => {
                return uniformState.matrixView;
            },
        },
        czm_projection: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT_MAT4,
            getValue: (uniformState) => {
                return uniformState.matrixProject;
            },
        },
        czm_modelView: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT_MAT4,
            getValue: (uniformState) => {
                return uniformState.matrixModelView;
            },
        },
        czm_viewP: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT_MAT4,
            getValue: (uniformState) => {
                return uniformState.matrixViewProject;
            },
        },
        czm_modelViewp: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT_MAT4,
            getValue: (uniformState) => {
                return uniformState.matrixModelViewProject;
            },
        },
        czm_normal: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT_MAT4,
            getValue: (uniformState) => {
                return uniformState.matrixNormalToView;
            },
        },
        czm_fov: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT,
            getValue: (uniformState) => {
                return uniformState.curCamera.fov;
            },
        },
        czm_aspect: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT,
            getValue: (uniformState) => {
                return uniformState.curCamera.aspect;
            },
        },
        czm_near: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT,
            getValue: (uniformState) => {
                return uniformState.curCamera.near;
            },
        },
        czm_far: {
            size: 1,
            datatype: UniformTypeEnum.FLOAT,
            getValue: (uniformState) => {
                return uniformState.curCamera.far;
            },
        },
    };
    //# sourceMappingURL=AutoUniform.js.map

    var Private$6;
    (function (Private) {
        Private.sortId = 0;
    })(Private$6 || (Private$6 = {}));
    class Shader extends Asset {
        constructor(options) {
            super();
            this._autoUniforms = [];
            this.sortId = Private$6.sortId++;
            this.vsStr = options.vsStr;
            this.fsStr = options.fsStr;
            this.attributes = options.attributes;
        }
        get autoUniforms() { return this._autoUniforms; }
        get glShader() { return this._shader; }
        ;
        set glShader(shader) {
            if (this._shader != shader) {
                if (this._shader) {
                    this._shader.destroy();
                }
                this._shader = shader;
                this.onDirty.raiseEvent();
            }
        }
        get layer() { return this._layer; }
        setLayerIndex(layer, queue = 0) {
            let layerIndex = layer + queue;
            if (this._layerIndex != layerIndex) {
                this._layer = layer;
                this._layerIndex = layerIndex;
                this.onDirty.raiseEvent();
            }
        }
        get layerIndex() { return this._layerIndex; }
        ;
        bind(device) {
            if (this._shader == null) {
                let newShader = new ShaderProgram({ context: device, attributes: this.attributes, vsStr: this.vsStr, fsStr: this.fsStr });
                this._shader = newShader;
                this._autoUniforms = [];
                Object.keys(newShader.uniforms).forEach(uniform => {
                    if (AutoUniforms.containAuto(uniform)) {
                        this._autoUniforms.push(uniform);
                    }
                });
            }
            this._shader.bind();
        }
        bindManulUniforms(device, uniforms) {
            this._shader.bindUniforms(device, uniforms);
        }
        bindAutoUniforms(device, uniformState) {
            let uniforms = {};
            this._autoUniforms.forEach(item => {
                uniforms[item] = AutoUniforms.getAutoUniformValue(item, uniformState);
            });
            this._shader.bindUniforms(device, uniforms);
        }
        unbind() {
            var _a;
            (_a = this._shader) === null || _a === void 0 ? void 0 : _a.unbind();
        }
        destroy() {
            var _a;
            (_a = this._shader) === null || _a === void 0 ? void 0 : _a.destroy();
        }
    }
    //# sourceMappingURL=Shader.js.map

    class RenderState {
        constructor() {
            this.cull = { enabled: true, cullBack: true };
            this.colorWrite = { red: true, green: true, blue: true, alpha: true };
            this.depthWrite = true;
            this.depthTest = { enabled: true, depthFunc: DepthFuncEnum.LEQUAL };
            this.blend = {
                enabled: false,
                blendSrc: BlendParamEnum.SRC_ALPHA,
                blendDst: BlendParamEnum.ONE,
                blendEquation: BlendEquationEnum.FUNC_ADD,
                enableSeparateBlend: false,
                blendSrcAlpha: BlendParamEnum.SRC_ALPHA,
                blendDstAlpha: BlendParamEnum.ONE,
                blendAlphaEquation: BlendEquationEnum.FUNC_ADD
            };
            this.stencilTest = {
                enabled: false,
                stencilFunction: StencilFuncEnum.ALWAYS,
                stencilRefValue: 1,
                stencilMask: 0xff,
                stencilFail: GlConstants.KEEP,
                stencilPassZfail: GlConstants.REPLACE,
                stencilFaileZpass: GlConstants.KEEP,
                enableSeparateStencil: false,
                stencilFunctionBack: StencilFuncEnum.ALWAYS,
                stencilRefValueBack: 1,
                stencilMaskBack: 0xff,
                stencilFailBack: GlConstants.KEEP,
                stencilPassZfailBack: GlConstants.REPLACE,
                stencilFaileZpassBack: GlConstants.KEEP,
            };
            this.scissorTest = {
                enabled: false,
                rectangle: Rect.create(),
            };
        }
    }
    var DepthFuncEnum;
    (function (DepthFuncEnum) {
        DepthFuncEnum[DepthFuncEnum["NEVER"] = 512] = "NEVER";
        DepthFuncEnum[DepthFuncEnum["LESS"] = 513] = "LESS";
        DepthFuncEnum[DepthFuncEnum["EQUAL"] = 514] = "EQUAL";
        DepthFuncEnum[DepthFuncEnum["LEQUAL"] = 515] = "LEQUAL";
        DepthFuncEnum[DepthFuncEnum["GREATER"] = 516] = "GREATER";
        DepthFuncEnum[DepthFuncEnum["NOTEQUAL"] = 517] = "NOTEQUAL";
        DepthFuncEnum[DepthFuncEnum["GEQUAL"] = 518] = "GEQUAL";
        DepthFuncEnum[DepthFuncEnum["ALWAYS"] = 519] = "ALWAYS";
    })(DepthFuncEnum || (DepthFuncEnum = {}));
    var BlendEquationEnum;
    (function (BlendEquationEnum) {
        /**
         * 源+目的地
         */
        BlendEquationEnum[BlendEquationEnum["FUNC_ADD"] = 32774] = "FUNC_ADD";
        /**
         * 源 - 目的地
         */
        BlendEquationEnum[BlendEquationEnum["FUNC_SUBTRACT"] = 32778] = "FUNC_SUBTRACT";
        /**
         * 目的地 - 源
         */
        BlendEquationEnum[BlendEquationEnum["FUNC_REVERSE_SUBTRACT"] = 32779] = "FUNC_REVERSE_SUBTRACT";
    })(BlendEquationEnum || (BlendEquationEnum = {}));
    var BlendParamEnum;
    (function (BlendParamEnum) {
        BlendParamEnum[BlendParamEnum["ONE"] = 1] = "ONE";
        BlendParamEnum[BlendParamEnum["SRC_ALPHA"] = 770] = "SRC_ALPHA";
        BlendParamEnum[BlendParamEnum["ONE_MINUS_SRC_ALPHA"] = 771] = "ONE_MINUS_SRC_ALPHA";
    })(BlendParamEnum || (BlendParamEnum = {}));
    var StencilFuncEnum;
    (function (StencilFuncEnum) {
        /**
         * Never pass
         */
        StencilFuncEnum[StencilFuncEnum["NEVER"] = 512] = "NEVER";
        /**
         * Pass if (ref & mask) <  (stencil & mask).
         */
        StencilFuncEnum[StencilFuncEnum["LESS"] = 513] = "LESS";
        /**
         * Pass if (ref & mask) =  (stencil & mask).
         */
        StencilFuncEnum[StencilFuncEnum["EQUAL"] = 514] = "EQUAL";
        /**
         * Pass if (ref & mask) <= (stencil & mask).
         */
        StencilFuncEnum[StencilFuncEnum["LEQUAL"] = 515] = "LEQUAL";
        /**
         * Pass if (ref & mask) >  (stencil & mask).
         */
        StencilFuncEnum[StencilFuncEnum["GREATER"] = 516] = "GREATER";
        /**
         * Pass if (ref & mask) != (stencil & mask).
         */
        StencilFuncEnum[StencilFuncEnum["NOTEQUAL"] = 517] = "NOTEQUAL";
        /**
         * Pass if (ref & mask) >= (stencil & mask).
         */
        StencilFuncEnum[StencilFuncEnum["GEQUAL"] = 518] = "GEQUAL";
        /**
         * Always pass.
         */
        StencilFuncEnum[StencilFuncEnum["ALWAYS"] = 519] = "ALWAYS";
    })(StencilFuncEnum || (StencilFuncEnum = {}));
    var StencilOperationEnum;
    (function (StencilOperationEnum) {
        StencilOperationEnum[StencilOperationEnum["KEEP"] = 7680] = "KEEP";
        StencilOperationEnum[StencilOperationEnum["REPLACE"] = 7681] = "REPLACE";
    })(StencilOperationEnum || (StencilOperationEnum = {}));
    //# sourceMappingURL=RenderState.js.map

    class AssetReference {
        constructor() {
            this.onAssetChange = new EventHandler();
            this.onDirty = new EventHandler();
            this.attachToDirtyAction = DebuffAction.create();
        }
        set asset(value) {
            if (this._asset != value) {
                let oldAsset = this._asset;
                this._asset = value;
                this.onAssetChange.raiseEvent({ newAsset: value, oldAsset });
                this.attachToDirtyAction.excuteAction(() => {
                    let func = () => { this.onDirty.raiseEvent(); };
                    value === null || value === void 0 ? void 0 : value.onDirty.addEventListener(func);
                    return () => {
                        value === null || value === void 0 ? void 0 : value.onDirty.removeEventListener(func);
                    };
                });
            }
        }
        ;
        get asset() { return this._asset; }
        ;
        destroy() {
            this._asset = undefined;
            this.attachToDirtyAction.dispose();
            this.attachToDirtyAction = undefined;
            this.onAssetChange.destroy();
            this.onAssetChange = undefined;
        }
    }
    //# sourceMappingURL=AssetReference.js.map

    var Private$7;
    (function (Private) {
        Private.id = 0;
    })(Private$7 || (Private$7 = {}));
    class Material extends Asset {
        constructor(options) {
            super();
            this.uniformParameters = {};
            this.beDirty = false;
            this.shaderRef = new AssetReference();
            this.renderState = new RenderState();
            this.name = options === null || options === void 0 ? void 0 : options.name;
            this._sortId = Private$7.id++;
            if ((options === null || options === void 0 ? void 0 : options.shaderOption) != null) {
                if ((options === null || options === void 0 ? void 0 : options.shaderOption) instanceof Shader) {
                    this.shader = options.shaderOption;
                }
                else {
                    this.shader = new Shader(options.shaderOption);
                }
            }
            if (options === null || options === void 0 ? void 0 : options.uniformParameters) {
                this.uniformParameters = Object.assign({}, options.uniformParameters);
            }
            this.onDirty.addEventListener(() => { this.beDirty = true; });
            this.shaderRef.onDirty.addEventListener(() => { this.onDirty.raiseEvent(); });
        }
        get shader() { return this.shaderRef.asset; }
        ;
        set shader(value) { this.shaderRef.asset = value; }
        ;
        get layer() { return this._layer || this.shader.layer || RenderLayerEnum.Geometry; }
        setLayerIndex(layer, queue = 0) {
            this._layer = layer;
            this._layerIndex = layer + queue;
            this.onDirty.raiseEvent();
        }
        get layerIndex() { var _a; return (_a = this._layerIndex) !== null && _a !== void 0 ? _a : this.shader.layerIndex; }
        ;
        get sortId() { var _a; return this._sortId + 1000 * ((_a = this.shader) === null || _a === void 0 ? void 0 : _a.sortId); }
        setUniformParameter(uniformKey, value) {
            this.uniformParameters[uniformKey] = value;
            this.beDirty = true;
        }
        dispose() { }
    }
    //# sourceMappingURL=Material.js.map

    var Private$8;
    (function (Private) {
        Private.defmat = new Material({
            uniformParameters: {
                MainColor: Color.create(1.0, 1.0, 1.0, 1.0)
            },
            shaderOption: {
                attributes: {
                    POSITION: VertexAttEnum.POSITION,
                    TEXCOORD_0: VertexAttEnum.TEXCOORD_0,
                },
                vsStr: `attribute vec3 POSITION;
            attribute vec3 TEXCOORD_0;
            uniform highp mat4 czm_modelViewp;
            varying mediump vec2 xlv_TEXCOORD0;
            void main()
            {
                highp vec4 tmplet_1=vec4(POSITION.xyz,1.0);
                xlv_TEXCOORD0 = TEXCOORD_0.xy;
                gl_Position = czm_modelViewp * tmplet_1;
            }`,
                fsStr: `uniform highp vec4 MainColor;
            varying mediump vec2 xlv_TEXCOORD0;
            uniform lowp sampler2D MainTex;
            void main()
            {
                gl_FragData[0] = texture2D(MainTex, xlv_TEXCOORD0)*MainColor;
            }`
            }
        });
    })(Private$8 || (Private$8 = {}));
    class ParseMaterialNode {
        static parse(index, gltf) {
            var _a, _b;
            if (gltf.cache.materialNodeCache[index]) {
                return gltf.cache.materialNodeCache[index];
            }
            else {
                // if (gltf.materials == null)
                // {
                //     return Promise.resolve(null);
                // }
                let node = gltf.materials[index];
                let mat = new Material();
                mat.setUniformParameter("MainColor", Color.create(1.0, 1.0, 1.0, 1));
                mat.shader = Private$8.defmat.shader;
                if (((_a = node.pbrMetallicRoughness) === null || _a === void 0 ? void 0 : _a.baseColorTexture) != null) {
                    return ParseTextureNode.parse((_b = node.pbrMetallicRoughness) === null || _b === void 0 ? void 0 : _b.baseColorTexture.index, gltf)
                        .then(tex => {
                        mat.setUniformParameter("MainTex", tex);
                        return mat;
                    });
                }
                else {
                    return Promise.resolve(mat);
                }
                //     let baseVs =
                //     "\
                //   attribute vec3 POSITION;\
                //   uniform highp mat4 czm_modelViewp;\
                //   void main()\
                //   {\
                //       highp vec4 tmplet_1=vec4(POSITION.xyz,1.0);\
                //       gl_Position = czm_modelViewp * tmplet_1;\
                //   }";
                // let baseFs =
                //     "\
                //     uniform highp vec4 MainColor;\
                //     void main()\
                //     {\
                //         gl_FragData[0] = MainColor;\
                //     }";
                // mat.setUniformParameter("MainColor", Color.create());
                // // mat.setUniformParameter("_MainTex", DefTextrue.GIRD);
                // //-------------loadshader
                // // let pbrShader = assetMgr.load("resource/shader/pbr_glTF.shader.json") as Shader;
                // // mat.setShader(pbrShader);
                // if (node.pbrMetallicRoughness)
                // {
                //     let nodeMR = node.pbrMetallicRoughness;
                //     if (nodeMR.baseColorFactor)
                //     {
                //         let baseColorFactor = Vec4.create();
                //         Vec4.copy(nodeMR.baseColorFactor, baseColorFactor);
                //         mat.setUniformParameter("u_BaseColorFactor", baseColorFactor);
                //     }
                //     if (nodeMR.metallicFactor != null)
                //     {
                //         mat.setUniformParameter("u_metalFactor", nodeMR.metallicFactor);
                //     }
                //     if (nodeMR.roughnessFactor != null)
                //     {
                //         mat.setUniformParameter("u_roughnessFactor", nodeMR.roughnessFactor);
                //     }
                //     if (nodeMR.baseColorTexture != null)
                //     {
                //         let tex = ParseTextureNode.parse(nodeMR.baseColorTexture.index, gltf).then(tex =>
                //         {
                //             mat.setUniformParameter("u_BaseColorSampler", tex);
                //             mat.setUniformParameter("_MainTex", tex);
                //             console.warn("@@@@@@@@@", mat);
                //         });
                //     }
                //     if (nodeMR.metallicRoughnessTexture)
                //     {
                //         let tex = ParseTextureNode.parse(nodeMR.metallicRoughnessTexture.index, gltf).then(tex =>
                //         {
                //             mat.setUniformParameter("u_MetallicRoughnessSampler", tex);
                //         });
                //     }
                // }
                // if (node.normalTexture)
                // {
                //     let nodet = node.normalTexture;
                //     let tex = ParseTextureNode.parse(nodet.index, gltf).then(tex =>
                //     {
                //         mat.setUniformParameter("u_NormalSampler", tex);
                //     });
                //     // mat.setTexture("u_NormalSampler",tex);
                //     if (nodet.scale)
                //     {
                //         mat.setUniformParameter("u_NormalScale", nodet.scale);
                //     }
                // }
                // if (node.emissiveTexture)
                // {
                //     let nodet = node.emissiveTexture;
                //     let tex = ParseTextureNode.parse(nodet.index, gltf).then(tex =>
                //     {
                //         mat.setUniformParameter("u_EmissiveSampler", tex);
                //     });
                // }
                // if (node.emissiveFactor)
                // {
                //     let ve3 = Vec3.create();
                //     Vec3.copy(node.emissiveFactor, ve3);
                //     mat.setUniformParameter("u_EmissiveFactor", ve3);
                // }
                // if (node.occlusionTexture)
                // {
                //     let nodet = node.occlusionTexture;
                //     if (nodet.strength)
                //     {
                //         mat.setUniformParameter("u_OcclusionStrength", nodet.strength);
                //     }
                // }
                // // let brdfTex = assetMgr.load("resource/texture/brdfLUT.imgdes.json") as Texture;
                // // mat.setTexture("u_brdfLUT", brdfTex);
                // // let e_cubeDiff: CubeTexture = new CubeTexture();
                // // let e_diffuseArr: string[] = [];
                // // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_right_0.jpg");
                // // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_left_0.jpg");
                // // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_top_0.jpg");
                // // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_bottom_0.jpg");
                // // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_front_0.jpg");
                // // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_back_0.jpg");
                // // e_cubeDiff.groupCubeTexture(e_diffuseArr);
                // // let env_speTex = new CubeTexture();
                // // for (let i = 0; i < 10; i++) {
                // //     let urlarr = [];
                // //     urlarr.push("resource/texture/papermill/specular/specular_right_" + i + ".jpg");
                // //     urlarr.push("resource/texture/papermill/specular/specular_left_" + i + ".jpg");
                // //     urlarr.push("resource/texture/papermill/specular/specular_top_" + i + ".jpg");
                // //     urlarr.push("resource/texture/papermill/specular/specular_bottom_" + i + ".jpg");
                // //     urlarr.push("resource/texture/papermill/specular/specular_front_" + i + ".jpg");
                // //     urlarr.push("resource/texture/papermill/specular/specular_back_" + i + ".jpg");
                // //     env_speTex.groupMipmapCubeTexture(urlarr, i, 9);
                // // }
                // // mat.setCubeTexture("u_DiffuseEnvSampler", e_cubeDiff);
                // // mat.setCubeTexture("u_SpecularEnvSampler", env_speTex);
                // return Promise.resolve(mat);
            }
        }
    }
    //# sourceMappingURL=ParseMaterialNode.js.map

    /* DataType */
    const BYTE = 0x1400;
    const UNSIGNED_BYTE = 0x1401;
    const SHORT = 0x1402;
    const UNSIGNED_SHORT = 0x1403;
    const INT = 0x1404;
    const UNSIGNED_INT = 0x1405;
    const FLOAT = 0x1406;
    const UNSIGNED_SHORT_4_4_4_4 = 0x8033;
    const UNSIGNED_SHORT_5_5_5_1 = 0x8034;
    const UNSIGNED_SHORT_5_6_5 = 0x8363;
    const HALF_FLOAT = 0x140b;
    const UNSIGNED_INT_2_10_10_10_REV = 0x8368;
    const UNSIGNED_INT_10F_11F_11F_REV = 0x8c3b;
    const UNSIGNED_INT_5_9_9_9_REV = 0x8c3e;
    const FLOAT_32_UNSIGNED_INT_24_8_REV = 0x8dad;
    const UNSIGNED_INT_24_8 = 0x84fa;
    const glTypeToTypedArrayCtor = {};
    {
        const tt = glTypeToTypedArrayCtor;
        tt[BYTE] = Int8Array;
        tt[UNSIGNED_BYTE] = Uint8Array;
        tt[SHORT] = Int16Array;
        tt[UNSIGNED_SHORT] = Uint16Array;
        tt[INT] = Int32Array;
        tt[UNSIGNED_INT] = Uint32Array;
        tt[FLOAT] = Float32Array;
        tt[UNSIGNED_SHORT_4_4_4_4] = Uint16Array;
        tt[UNSIGNED_SHORT_5_5_5_1] = Uint16Array;
        tt[UNSIGNED_SHORT_5_6_5] = Uint16Array;
        tt[HALF_FLOAT] = Uint16Array;
        tt[UNSIGNED_INT_2_10_10_10_REV] = Uint32Array;
        tt[UNSIGNED_INT_10F_11F_11F_REV] = Uint32Array;
        tt[UNSIGNED_INT_5_9_9_9_REV] = Uint32Array;
        tt[FLOAT_32_UNSIGNED_INT_24_8_REV] = Uint32Array;
        tt[UNSIGNED_INT_24_8] = Uint32Array;
    }
    /**
     * Get the GL type for a typedArray
     */
    function getGLTypeFromTypedArray(typedArray) {
        if (typedArray instanceof Int8Array) {
            return BYTE;
        }
        if (typedArray instanceof Uint8Array) {
            return UNSIGNED_BYTE;
        }
        if (typedArray instanceof Uint8ClampedArray) {
            return UNSIGNED_BYTE;
        }
        if (typedArray instanceof Int16Array) {
            return SHORT;
        }
        if (typedArray instanceof Uint16Array) {
            return UNSIGNED_SHORT;
        }
        if (typedArray instanceof Int32Array) {
            return INT;
        }
        if (typedArray instanceof Uint32Array) {
            return UNSIGNED_INT;
        }
        if (typedArray instanceof Float32Array) {
            return FLOAT;
        }
        throw "unsupported typed array to gl type";
    }
    function getTypeArrCtorFromGLtype(glType) {
        if (glTypeToTypedArrayCtor[glType] != null) {
            return glTypeToTypedArrayCtor[glType];
        }
        throw "unsupported gltype to array type";
    }
    function getByteSizeFromGLtype(glType) {
        if (glTypeToTypedArrayCtor[glType]) {
            return glTypeToTypedArrayCtor[glType].BYTES_PER_ELEMENT;
        }
        throw "unsupported gltype to bytesPerElement";
    }
    function getTypedArray(data, gltype, byteOffset = 0) {
        let typeArrayCtr = getTypeArrCtorFromGLtype(gltype);
        if (typeof data == "number") {
            return new typeArrayCtr(data);
        }
        else if (data instanceof Array) {
            return new typeArrayCtr(data);
        }
        else {
            let typedArray = data;
            return new typeArrayCtr(typedArray.buffer, typedArray.byteOffset + byteOffset, typedArray.byteLength / typeArrayCtr.BYTES_PER_ELEMENT);
        }
    }
    var TypedArray;
    (function (TypedArray) {
        function fromGlType(gltType, count) {
            let ctor = glTypeToTypedArrayCtor[gltType];
            return new ctor(count);
        }
        TypedArray.fromGlType = fromGlType;
        function bytesPerElement(type) {
            return type.BYTES_PER_ELEMENT;
        }
        TypedArray.bytesPerElement = bytesPerElement;
        function glType(data) {
            return getGLTypeFromTypedArray(data);
        }
        TypedArray.glType = glType;
    })(TypedArray || (TypedArray = {}));
    var GlType;
    (function (GlType) {
        function bytesPerElement() {
        }
        GlType.bytesPerElement = bytesPerElement;
    })(GlType || (GlType = {}));
    //# sourceMappingURL=TypedArray.js.map

    class IndexBuffer extends Buffer {
        constructor(options) {
            super(Object.assign(Object.assign({}, options), { target: BufferTargetEnum.ELEMENT_ARRAY_BUFFER }));
            this.indexDatatype = options.indexDatatype;
            let typedArray = options.typedArray;
            if (typedArray) {
                this.indexDatatype = TypedArray.glType(typedArray);
            }
            this.bytesPerIndex = getByteSizeFromGLtype(this.indexDatatype);
            this.numberOfIndices = this._sizeInBytes / this.bytesPerIndex;
        }
    }
    var IndexDatatypeEnum;
    (function (IndexDatatypeEnum) {
        IndexDatatypeEnum[IndexDatatypeEnum["Uint16Array"] = 5123] = "Uint16Array";
        IndexDatatypeEnum[IndexDatatypeEnum["Uint32Array"] = 5125] = "Uint32Array";
    })(IndexDatatypeEnum || (IndexDatatypeEnum = {}));
    //# sourceMappingURL=IndexBuffer.js.map

    class VertexBuffer extends Buffer {
        // componentSize: number;
        // componentDataType: number;
        // // size?: number;
        // normalize: boolean;
        // bytesStride: number;
        // bytesOffset: number;
        // divisor?: number;
        constructor(options) {
            super(Object.assign(Object.assign({}, options), { target: BufferTargetEnum.ARRAY_BUFFER }));
        }
    }
    //# sourceMappingURL=VertexBuffer.js.map

    class ParseAccessorNode {
        static parse(index, gltf, dataInfo) {
            let arrayInfo = {};
            // return new Promise<AccessorNode>((resolve,reject)=>{
            let accessor = gltf.accessors[index];
            arrayInfo.componentSize = this.getComponentSize(accessor.type);
            arrayInfo.componentDataType = accessor.componentType;
            arrayInfo.count = accessor.count;
            arrayInfo.normalize = accessor.normalized;
            if (accessor.bufferView != null) {
                let viewindex = accessor.bufferView;
                return ParseBufferViewNode.parse(viewindex, gltf)
                    .then(value => {
                    var _a;
                    let canUseCache = true;
                    let typedArray = getTypedArray(value.viewBuffer, accessor.componentType);
                    arrayInfo.bytesOffset = (_a = accessor.byteOffset) !== null && _a !== void 0 ? _a : 0;
                    arrayInfo.bytesStride = value.byteStride;
                    arrayInfo.target = value.target;
                    if (accessor.sparse != null) {
                        canUseCache = false;
                        typedArray = typedArray.slice(0);
                        let indicesInfo = accessor.sparse.indices;
                        let valuesInfo = accessor.sparse.values;
                        let count = accessor.sparse.count;
                        Promise.all([
                            ParseBufferViewNode.parse(indicesInfo.bufferView, gltf),
                            ParseBufferViewNode.parse(valuesInfo.bufferView, gltf),
                        ]).then(arr => {
                            let indicesArr = getTypedArray(arr[0].viewBuffer, indicesInfo.componentType, indicesInfo.byteOffset);
                            let sparseValueArr = getTypedArray(arr[1].viewBuffer, accessor.componentType, valuesInfo.byteOffset);
                            let componentNumber = this.getComponentSize(accessor.type);
                            for (let i = 0; i < count; i++) {
                                let index = indicesArr[i];
                                for (let k = 0; k < componentNumber; k++) {
                                    typedArray[index + k] = sparseValueArr[index + k];
                                }
                            }
                        });
                    }
                    arrayInfo.typedArray = typedArray;
                    if (dataInfo != null || value.target != null) {
                        let context = dataInfo.context;
                        let target = dataInfo.target || value.target;
                        switch (target) {
                            case BufferTargetEnum.ARRAY_BUFFER:
                                if (canUseCache) {
                                    var newVertexBuffer = gltf.cache.vertexBufferCache[viewindex];
                                    if (newVertexBuffer == null) {
                                        newVertexBuffer = new VertexBuffer({ context, typedArray });
                                        gltf.cache.vertexBufferCache[viewindex] = newVertexBuffer;
                                    }
                                    else {
                                        console.warn("命中！！");
                                    }
                                    arrayInfo.buffer = newVertexBuffer;
                                }
                                else {
                                    arrayInfo.buffer = new VertexBuffer({ context, typedArray });
                                }
                                break;
                            case BufferTargetEnum.ELEMENT_ARRAY_BUFFER:
                                if (canUseCache) {
                                    let newIndexBuffer = gltf.cache.indexBufferCache[viewindex];
                                    if (newIndexBuffer == null) {
                                        newIndexBuffer = new IndexBuffer({ context, typedArray });
                                        gltf.cache.indexBufferCache[viewindex] = newIndexBuffer;
                                    }
                                    else {
                                        console.warn("命中！！");
                                    }
                                    arrayInfo.buffer = newIndexBuffer;
                                }
                                else {
                                    arrayInfo.buffer = new IndexBuffer({ context, typedArray });
                                }
                                break;
                            default:
                                console.error("why ！！");
                                break;
                        }
                    }
                    return arrayInfo;
                });
            }
            else {
                throw new Error("accessor.bufferView is null");
            }
        }
        static getComponentSize(type) {
            switch (type) {
                case "SCALAR":
                    return 1;
                case "VEC2":
                    return 2;
                case "VEC3":
                    return 3;
                case "VEC4":
                case "MAT2":
                    return 4;
                case "MAT3":
                    return 9;
                case "MAT4":
                    return 16;
            }
        }
    }
    //# sourceMappingURL=ParseAccessorNode.js.map

    var ComponentDatatypeEnum;
    (function (ComponentDatatypeEnum) {
        /**
         * Int8Array
         */
        ComponentDatatypeEnum[ComponentDatatypeEnum["BYTE"] = 5120] = "BYTE";
        /**
         * Uint8Array
         */
        ComponentDatatypeEnum[ComponentDatatypeEnum["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
        /**
         * Int16Array
         */
        ComponentDatatypeEnum[ComponentDatatypeEnum["SHORT"] = 5122] = "SHORT";
        /**
         * Uint16Array
         */
        ComponentDatatypeEnum[ComponentDatatypeEnum["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
        /**
         * Int32Array
         */
        ComponentDatatypeEnum[ComponentDatatypeEnum["INT"] = 5124] = "INT";
        /**
         * Uint32Array
         */
        ComponentDatatypeEnum[ComponentDatatypeEnum["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
        /**
         * Float32Array
         */
        ComponentDatatypeEnum[ComponentDatatypeEnum["FLOAT"] = 5126] = "FLOAT";
        /**
         * Uint16Array
         */
        ComponentDatatypeEnum[ComponentDatatypeEnum["UNSIGNED_SHORT_4_4_4_4"] = 32819] = "UNSIGNED_SHORT_4_4_4_4";
        /**
         * Uint16Array
         */
        ComponentDatatypeEnum[ComponentDatatypeEnum["UNSIGNED_SHORT_5_5_5_1"] = 32820] = "UNSIGNED_SHORT_5_5_5_1";
        /**
         * Uint16Array
         */
        ComponentDatatypeEnum[ComponentDatatypeEnum["UNSIGNED_SHORT_5_6_5"] = 33635] = "UNSIGNED_SHORT_5_6_5";
        /**
         * Uint16Array
         */
        ComponentDatatypeEnum[ComponentDatatypeEnum["HALF_FLOAT"] = 5131] = "HALF_FLOAT";
        /**
         * Uint32Array
         */
        ComponentDatatypeEnum[ComponentDatatypeEnum["UNSIGNED_INT_2_10_10_10_REV"] = 33640] = "UNSIGNED_INT_2_10_10_10_REV";
        /**
         * Uint32Array
         */
        ComponentDatatypeEnum[ComponentDatatypeEnum["UNSIGNED_INT_10F_11F_11F_REV"] = 35899] = "UNSIGNED_INT_10F_11F_11F_REV";
        /**
         * Uint32Array
         */
        ComponentDatatypeEnum[ComponentDatatypeEnum["UNSIGNED_INT_5_9_9_9_REV"] = 35902] = "UNSIGNED_INT_5_9_9_9_REV";
        /**
         * Uint32Array
         */
        ComponentDatatypeEnum[ComponentDatatypeEnum["FLOAT_32_UNSIGNED_INT_24_8_REV"] = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV";
        /**
         * Uint32Array
         */
        ComponentDatatypeEnum[ComponentDatatypeEnum["UNSIGNED_INT_24_8"] = 34042] = "UNSIGNED_INT_24_8";
        /**
         * Float64Array
         */
        ComponentDatatypeEnum[ComponentDatatypeEnum["DOUBLE"] = 5130] = "DOUBLE";
    })(ComponentDatatypeEnum || (ComponentDatatypeEnum = {}));
    (function (ComponentDatatypeEnum) {
        function byteSize(type) {
            return getByteSizeFromGLtype(type);
        }
        ComponentDatatypeEnum.byteSize = byteSize;
    })(ComponentDatatypeEnum || (ComponentDatatypeEnum = {}));
    //# sourceMappingURL=ComponentDatatypeEnum.js.map

    class VertexAttribute {
        constructor(context, options) {
            var _a, _b, _c, _d, _e, _f;
            //todo  check 
            if (options.vertexBuffer == null && options.value == null) {
                throw new Error('attribute must have a vertexBuffer or a value.');
            }
            this._gl = context.gl;
            let att = options;
            this.type = att.type;
            this.index = VertexAttEnum.toShaderLocation(this.type);
            this.enabled = (_a = att.enabled) !== null && _a !== void 0 ? _a : true; // true;
            this.vertexBuffer = att.vertexBuffer; // positionBuffer;
            this.value = att.value;
            this.componentsPerAttribute = att.componentsPerAttribute; // 3;
            this.componentDatatype = (_b = att.componentDatatype) !== null && _b !== void 0 ? _b : ComponentDatatypeEnum.FLOAT; // ComponentDatatype.FLOAT;
            this.normalize = (_c = att.normalize) !== null && _c !== void 0 ? _c : false; // false;
            this.offsetInBytes = (_d = att.offsetInBytes) !== null && _d !== void 0 ? _d : 0; // 0;
            this.strideInBytes = (_e = att.strideInBytes) !== null && _e !== void 0 ? _e : 0; // 0; // tightly packed
            this.instanceDivisor = (_f = att.instanceDivisor) !== null && _f !== void 0 ? _f : 0; // 0; // not instanced
            if (this.vertexBuffer) {
                let bytes = this.vertexBuffer.sizeInbytes - this.offsetInBytes;
                if (this.strideInBytes == 0) {
                    this.count = bytes / (this.componentsPerAttribute * ComponentDatatypeEnum.byteSize(this.componentDatatype));
                }
                else {
                    this.count = bytes / this.strideInBytes;
                }
            }
            if (att.vertexBuffer) {
                this.bind = () => {
                    att.vertexBuffer.bind();
                    this._gl.enableVertexAttribArray(this.index);
                    this._gl.vertexAttribPointer(this.index, this.componentsPerAttribute, this.componentDatatype, this.normalize, this.strideInBytes, this.offsetInBytes);
                    if (this.instanceDivisor !== undefined) {
                        this._gl.vertexAttribDivisor(this.index, att.instanceDivisor);
                    }
                };
                this.unbind = () => {
                    this._gl.disableVertexAttribArray(this.index);
                    if (att.instanceDivisor !== undefined) {
                        this._gl.vertexAttribDivisor(this.index, 0);
                    }
                };
            }
            else {
                let bindFunc = BufferConfig.vertexAttributeSetter[att.componentsPerAttribute];
                this.bind = () => {
                    bindFunc(this.index, this.value);
                };
            }
        }
        bind() { }
        unbind() { }
    }
    //# sourceMappingURL=VertexAttribute.js.map

    var PrimitiveTypeEnum;
    (function (PrimitiveTypeEnum) {
        PrimitiveTypeEnum[PrimitiveTypeEnum["POINTS"] = 0] = "POINTS";
        PrimitiveTypeEnum[PrimitiveTypeEnum["LINES"] = 1] = "LINES";
        PrimitiveTypeEnum[PrimitiveTypeEnum["LINE_LOOP"] = 2] = "LINE_LOOP";
        PrimitiveTypeEnum[PrimitiveTypeEnum["LINE_STRIP"] = 3] = "LINE_STRIP";
        PrimitiveTypeEnum[PrimitiveTypeEnum["TRIANGLES"] = 4] = "TRIANGLES";
        PrimitiveTypeEnum[PrimitiveTypeEnum["TRIANGLE_FAN"] = 6] = "TRIANGLE_FAN";
    })(PrimitiveTypeEnum || (PrimitiveTypeEnum = {}));
    //# sourceMappingURL=PrimitiveTypeEnum.js.map

    /**
     * Creates a vertex array, which defines the attributes making up a vertex, and contains an optional index buffer
     * to select vertices for rendering.  Attributes are defined using object literals as shown in Example 1 below.
     *
     * @example
     * // Example 1. Create a vertex array with vertices made up of three floating point
     * // values, e.g., a position, from a single vertex buffer.  No index buffer is used.
     * var positionBuffer = Buffer.createVertexBuffer({
     *     context : context,
     *     sizeInBytes : 12,
     *     usage : BufferUsage.STATIC_DRAW
     * });
     * var attributes = [
     *     {
     *         index                  : 0,
     *         enabled                : true,
     *         vertexBuffer           : positionBuffer,
     *         componentsPerAttribute : 3,
     *         componentDatatype      : ComponentDatatype.FLOAT,
     *         normalize              : false,
     *         offsetInBytes          : 0,
     *         strideInBytes          : 0 // tightly packed
     *         instanceDivisor        : 0 // not instanced
     *     }
     * ];
     * var va = new VertexArray({
     *     context : context,
     *     attributes : attributes
     * });
     *
     * @example
     * // Example 2. Create a vertex array with vertices from two different vertex buffers.
     * // Each vertex has a three-component position and three-component normal.
     * var positionBuffer = Buffer.createVertexBuffer({
     *     context : context,
     *     sizeInBytes : 12,
     *     usage : BufferUsage.STATIC_DRAW
     * });
     * var normalBuffer = Buffer.createVertexBuffer({
     *     context : context,
     *     sizeInBytes : 12,
     *     usage : BufferUsage.STATIC_DRAW
     * });
     * var attributes = [
     *     {
     *         type                   : VertexAttEnum.POSITION
     *         vertexBuffer           : positionBuffer,
     *         componentsPerAttribute : 3,
     *         componentDatatype      : ComponentDatatype.FLOAT
     *     },
     *     {
     *         type                   : VertexAttEnum.TANGENT
     *         vertexBuffer           : normalBuffer,
     *         componentsPerAttribute : 3,
     *         componentDatatype      : ComponentDatatype.FLOAT
     *     }
     * ];
     * var va = new VertexArray({
     *     context : context,
     *     attributes : attributes
     * });
     *
     * @example
     * // Example 3. Creates the same vertex layout as Example 2 using a single
     * // vertex buffer, instead of two.
     * var buffer = Buffer.createVertexBuffer({
     *     context : context,
     *     sizeInBytes : 24,
     *     usage : BufferUsage.STATIC_DRAW
     * });
     * var attributes = [
     *     {
     *         type                   : VertexAttEnum.POSITION
     *         vertexBuffer           : buffer,
     *         componentsPerAttribute : 3,
     *         componentDatatype      : ComponentDatatype.FLOAT,
     *         offsetInBytes          : 0,
     *         strideInBytes          : 24
     *     },
     *     {
     *         type                   : VertexAttEnum.TANGENT
     *         vertexBuffer           : buffer,
     *         componentsPerAttribute : 3,
     *         componentDatatype      : ComponentDatatype.FLOAT,
     *         normalize              : true,
     *         offsetInBytes          : 12,
     *         strideInBytes          : 24
     *     }
     * ];
     * var va = new VertexArray({
     *     context : context,
     *     attributes : attributes
     * });
     *
     */
    class VertexArray {
        constructor(options) {
            var _a;
            this._vertexAttributes = {};
            this._primitiveOffset = 0;
            this._context = options.context;
            // this.vertexAttributes = options.vertexAttributes.map(item => new VertexAttribute(options.context, item));
            options.vertexAttributes.forEach(item => {
                this._vertexAttributes[item.type] = new VertexAttribute(options.context, item);
            });
            this._indexbuffer = options.indexBuffer;
            this._primitiveType = (_a = options.primitiveType) !== null && _a !== void 0 ? _a : PrimitiveTypeEnum.TRIANGLES;
            this._primitiveOffset = options.primitiveOffset;
            let gl = options.context.gl;
            if (options.context.caps.vertexArrayObject) {
                this._bind = () => {
                    this._context.bindingVao = this._vao;
                    gl.bindVertexArray(this._vao);
                };
                this._unbind = () => {
                    this._context.bindingVao = null;
                    gl.bindVertexArray(null);
                };
                let vao = gl.createVertexArray();
                gl.bindVertexArray(vao);
                this._context.bindingVao = vao;
                this.bindVertexAttributes(gl, this._vertexAttributes, this._indexbuffer);
                gl.bindVertexArray(null);
                this._context.bindingVao = null;
                this._vao = vao;
                this.destroy = () => {
                    gl.deleteVertexArray(this._vao);
                };
            }
            else {
                this._bind = () => {
                    this.bindVertexAttributes(gl, this._vertexAttributes, this._indexbuffer);
                };
                this._unbind = () => {
                    this.unbindAttributes(gl, this._vertexAttributes, this._indexbuffer);
                };
            }
        }
        get vertexAttributes() { return this._vertexAttributes; }
        get vertexcount() {
            return this._vertexAttributes[VertexAttEnum.POSITION].count;
        }
        get primitiveType() { return this._primitiveType; }
        set primitiveType(type) { this._primitiveType = type; }
        ;
        get primitveCount() { var _a, _b; return (_b = (_a = this._indexbuffer) === null || _a === void 0 ? void 0 : _a.numberOfIndices) !== null && _b !== void 0 ? _b : this.vertexcount; }
        get primitiveOffset() { return this._primitiveOffset; }
        set primitiveOffset(offset) { var _a, _b; this._primitiveOffset = ((_b = (_a = this._indexbuffer) === null || _a === void 0 ? void 0 : _a.bytesPerIndex) !== null && _b !== void 0 ? _b : 1) * offset; }
        getAttributeVertexBuffer(att) {
            return this._vertexAttributes[att].vertexBuffer;
        }
        updateVertexBuffer(att, sizeInBytesOrTypedArray) {
            this._vertexAttributes[att].vertexBuffer.update(sizeInBytesOrTypedArray);
        }
        updateIndexBuffer(sizeInBytesOrTypedArray) {
            this.indexBuffer.update(sizeInBytesOrTypedArray);
        }
        get indexBuffer() {
            return this._indexbuffer;
        }
        hasAttribute(att) {
            return this._vertexAttributes[att] != null;
        }
        update(vertexAttOption, forece = false) {
            if (forece || this._vertexAttributes[vertexAttOption.type] == null) {
                this._vertexAttributes[vertexAttOption.type] = new VertexAttribute(this._context, vertexAttOption);
            }
            else {
                let att = this._vertexAttributes[vertexAttOption.type];
                for (const key in vertexAttOption) {
                    if (att[key] != vertexAttOption[key]) {
                        att[key] = vertexAttOption[key];
                    }
                }
            }
            if (vertexAttOption.vertexBuffer != null && this._vao) {
                this._bind();
                this._vertexAttributes[vertexAttOption.type].bind();
                this._unbind();
            }
        }
        bindVertexAttributes(gl, vertexAtts, indexBuffer) {
            for (let key in vertexAtts) {
                vertexAtts[key].bind();
            }
            if (indexBuffer) {
                indexBuffer.bind();
            }
        }
        unbindAttributes(gl, vertexAtts, indexBuffer) {
            for (let key in vertexAtts) {
                vertexAtts[key].unbind();
            }
            if (indexBuffer) {
                indexBuffer.unbind();
            }
        }
        _bind() { }
        _unbind() { }
        bind() {
            if (VertexArray._cachedVertexArray != this || this._vao != this._context.bindingVao) {
                this._bind();
                VertexArray._cachedVertexArray = this;
            }
        }
        unbind() {
            this._unbind();
            VertexArray._cachedVertexArray = null;
        }
        destroy() { }
    }
    //# sourceMappingURL=VertextArray.js.map

    class GeometryAsset extends Asset {
        constructor() {
            super(...arguments);
            this.beNeedRefreshGraphicAsset = false;
        }
        get bounding() { return this._bounding; }
        set bounding(aabb) { this._bounding = aabb; }
        bind(device) {
            var _a;
            if (this.graphicAsset == null) {
                this.graphicAsset = this.create(device);
                this.onCreated.raiseEvent();
                this.beNeedRefreshGraphicAsset = false;
            }
            if (this.beNeedRefreshGraphicAsset) {
                this.refresh(device);
                this.beNeedRefreshGraphicAsset = false;
            }
            (_a = this.graphicAsset) === null || _a === void 0 ? void 0 : _a.bind();
        }
        unbind() {
            this.graphicAsset.unbind();
        }
        draw(device, instanceCount) {
            device.draw(this.graphicAsset, instanceCount);
        }
        destroy() {
            var _a;
            (_a = this.graphicAsset) === null || _a === void 0 ? void 0 : _a.destroy();
            super.destroy();
        }
    }
    //# sourceMappingURL=GeoemtryAsset.js.map

    class StaticMesh extends GeometryAsset {
        create(device) {
            throw new Error("Method not implemented.");
        }
        refresh(device) {
            throw new Error("Method not implemented.");
        }
        set vertexArray(value) { this.graphicAsset = value; }
    }
    //# sourceMappingURL=StaticMesh.js.map

    // import { Material } from "../assets/material";
    const MapGltfAttributeToToyAtt = {
        POSITION: VertexAttEnum.POSITION,
        NORMAL: VertexAttEnum.NORMAL,
        TANGENT: VertexAttEnum.TANGENT,
        TEXCOORD_0: VertexAttEnum.TEXCOORD_0,
        TEXCOORD_1: VertexAttEnum.TEXCOORD_1,
        COLOR_0: VertexAttEnum.COLOR_0,
        WEIGHTS_0: VertexAttEnum.WEIGHTS_0,
        JOINTS_0: VertexAttEnum.JOINTS_0,
    };
    class ParseMeshNode {
        static parse(index, gltf, context) {
            if (gltf.cache.meshNodeCache[index]) {
                return gltf.cache.meshNodeCache[index];
            }
            else {
                let node = gltf.meshes[index];
                let dataArr = [];
                if (node.primitives) {
                    for (let key in node.primitives) {
                        let primitive = node.primitives[key];
                        let data = this.parsePrimitive(primitive, gltf, context);
                        dataArr.push(data);
                    }
                }
                let task = Promise.all(dataArr);
                gltf.cache.meshNodeCache[index] = task;
                return task;
            }
        }
        static parsePrimitive(node, gltf, context) {
            return Promise.all([
                this.parseMesh(node, gltf, context),
                this.parseMaterial(node, gltf)
            ]).then(([mesh, material]) => {
                return { mesh: mesh, material: material };
            });
        }
        static parseMaterial(node, gltf) {
            let matindex = node.material;
            if (matindex != null) {
                return ParseMaterialNode.parse(matindex, gltf);
            }
            else {
                return Promise.resolve(null);
            }
        }
        static parseMesh(node, gltf, context) {
            let taskAtts = [];
            let vaoOptions = { vertexAttributes: [], context };
            let attributes = node.attributes;
            for (let attName in attributes) {
                let attIndex = attributes[attName];
                let attType = MapGltfAttributeToToyAtt[attName];
                let attTask = ParseAccessorNode.parse(attIndex, gltf, { target: BufferTargetEnum.ARRAY_BUFFER, context })
                    .then(arrayInfo => {
                    var _a;
                    vaoOptions.vertexAttributes.push({
                        type: attType,
                        vertexBuffer: (_a = arrayInfo.buffer) !== null && _a !== void 0 ? _a : new VertexBuffer({
                            context,
                            typedArray: arrayInfo.typedArray
                        }),
                        componentsPerAttribute: arrayInfo.componentSize,
                        componentDatatype: arrayInfo.componentDataType,
                        normalize: arrayInfo.normalize,
                        offsetInBytes: arrayInfo.bytesOffset,
                        strideInBytes: arrayInfo.bytesStride,
                    });
                });
                taskAtts.push(attTask);
            }
            let index = node.indices;
            if (index != null) {
                let indexTask = ParseAccessorNode.parse(index, gltf, { target: BufferTargetEnum.ELEMENT_ARRAY_BUFFER, context })
                    .then(arrayInfo => {
                    var _a;
                    if (!(arrayInfo.typedArray instanceof Uint8Array || arrayInfo.typedArray instanceof Uint16Array || arrayInfo.typedArray instanceof Uint32Array)) {
                        console.error("index data type not Uint16Array or Uint32Array!");
                    }
                    vaoOptions.indexBuffer = (_a = arrayInfo.buffer) !== null && _a !== void 0 ? _a : new IndexBuffer({ context, typedArray: arrayInfo.typedArray });
                    vaoOptions.primitiveOffset = arrayInfo.bytesOffset;
                });
                taskAtts.push(indexTask);
            }
            return Promise.all(taskAtts)
                .then(() => {
                let mesh = new StaticMesh();
                mesh.vertexArray = new VertexArray(vaoOptions);
                return mesh;
            });
        }
    }
    //# sourceMappingURL=ParseMeshNode.js.map

    class PrimiveAsset extends Asset {
        constructor(material, gemometry) {
            super();
            this.materialRef = new AssetReference();
            this.geometryRef = new AssetReference();
            this.material = material;
            this.geometry = gemometry;
        }
        get material() { return this.materialRef.asset; }
        set material(mat) { this.materialRef.asset = mat; }
        get geometry() { return this.geometryRef.asset; }
        set geometry(value) { this.geometryRef.asset = value; }
    }
    //# sourceMappingURL=PrimiveAsset.js.map

    class ParseNode {
        static parse(index, gltf, context) {
            let node = gltf.nodes[index];
            let name = node.name || "node" + index;
            let sceneNode = new Entity(name);
            if (node.matrix) {
                sceneNode.localMatrix = Mat4.fromArray(node.matrix);
            }
            if (node.translation) {
                Vec3.copy(node.translation, sceneNode.localPosition);
            }
            if (node.rotation) {
                Quat.copy(node.rotation, sceneNode.localRotation);
            }
            if (node.scale) {
                Vec3.copy(node.scale, sceneNode.localScale);
            }
            if (node.camera != null) {
                let cam = ParseCameraNode.parse(node.camera, gltf);
                cam.node = sceneNode;
            }
            let allTask = [];
            if (node.mesh != null) {
                let task = ParseMeshNode.parse(node.mesh, gltf, context)
                    .then(primitives => {
                    let modelcomp = sceneNode.addComponent("ModelComponent");
                    for (let i = 0; i < primitives.length; i++) {
                        modelcomp.primitives.setValue(new PrimiveAsset(primitives[i].material, primitives[i].mesh), i);
                    }
                });
                allTask.push(task);
            }
            if (node.children) {
                for (let i = 0; i < node.children.length; i++) {
                    let nodeindex = node.children[i];
                    let childTask = this.parse(nodeindex, gltf, context)
                        .then(child => {
                        sceneNode.addChild(child);
                    });
                    allTask.push(childTask);
                }
            }
            return Promise.all(allTask).then(() => {
                return sceneNode;
            });
            // if (node.skin != null && node.mesh != null) {
            //     let nodemeshdata: PrimitiveNode[] = bundle.meshNodeCache[node.mesh];
            //     let skindata = bundle.skinNodeCache[node.skin];
            //     for (let key in nodemeshdata) {
            //         let data = nodemeshdata[key];
            //         //-----------------------------
            //         let obj = new GameObject();
            //         trans.addChild(obj.transform);
            //         let meshr = obj.addComponent<SkinMeshRender>("SkinMeshRender");
            //         // let mat=assetMgr.load("resource/mat/diff.mat.json") as Material;
            //         // meshr.material=mat;
            //         meshr.mesh = data.mesh;
            //         meshr.material = data.mat;
            //         // meshr.joints=skindata.joints;
            //         for (let i = 0; i < skindata.jointIndexs.length; i++) {
            //             let trans = bundle.nodeDic[skindata.jointIndexs[i]];
            //             if (trans == null) {
            //                 console.error("解析gltf 异常！");
            //             }
            //             meshr.joints.push(trans);
            //         }
            //         meshr.bindPoses = skindata.inverseBindMat;
            //         meshr.bindPlayer = bundle.bundleAnimator;
            //     }
            // } else
        }
    }
    //# sourceMappingURL=ParseNode.js.map

    class ParseSceneNode {
        static parse(index, gltf, context) {
            let node = gltf.scenes[index];
            let root = new Entity(node.name);
            let rootNodes = node.nodes.map(item => {
                return ParseNode.parse(item, gltf, context);
            });
            return Promise.all(rootNodes).then(element => {
                element.forEach(item => {
                    root.addChild(item);
                });
                return root;
            });
        }
    }
    //# sourceMappingURL=ParseSceneNode.js.map

    class Prefab extends Asset {
        set root(root) { this._root = root; }
        ;
        static instance(prefab) {
            //TODO 先暂时直接返回root
            return prefab._root;
            // return prefab._root.clone();
        }
    }
    //# sourceMappingURL=Prefab.js.map

    class GltfNodeCache {
        constructor() {
            this.meshNodeCache = {};
            this.bufferviewNodeCache = {};
            this.bufferNodeCache = {};
            this.materialNodeCache = {};
            this.textrueNodeCache = {};
            this.vertexBufferCache = {};
            this.indexBufferCache = {};
            // beContainAnimation: boolean = false;
            // skinNodeCache: { [index: number]: SkinNode } = {};
            // animationNodeCache: { [index: number]: AnimationClip } = {};
        }
    }
    class LoadGlTF {
        constructor(device) {
            this.context = device;
        }
        load(url) {
            return this.loadAsync(url)
                .then(gltfJson => {
                let scene = gltfJson.scene != null ? gltfJson.scene : 0;
                return ParseSceneNode.parse(scene, gltfJson, this.context).then(scene => {
                    let rpefab = new Prefab();
                    rpefab.root = scene;
                    return rpefab;
                });
            });
        }
        static regExtension(type, extension) {
            this.ExtensionDic[type] = extension;
        }
        getExtensionData(node, extendname) {
            if (node.extensions == null)
                return null;
            let extension = LoadGlTF.ExtensionDic[extendname];
            if (extension == null)
                return null;
            let info = node.extensions[extendname];
            if (info == null)
                return null;
            return extension.load(info, this);
        }
        //------------------------------------load bundle asset
        loadAsync(url) {
            if (url.endsWith(".gltf")) {
                return loadJson(url).then(json => {
                    let gltfJson = json;
                    gltfJson.cache = new GltfNodeCache();
                    gltfJson.rootURL = getAssetDirectory(url);
                    return gltfJson;
                });
            }
            else {
                return this.loadglTFBin(url)
                    .then((value) => {
                    let gltfJson = value.json;
                    gltfJson.cache = new GltfNodeCache();
                    gltfJson.rootURL = getAssetDirectory(url);
                    for (let i = 0; i < value.chunkbin.length; i++) {
                        gltfJson.cache.bufferNodeCache[i] = Promise.resolve(value.chunkbin[i].buffer);
                    }
                    return gltfJson;
                });
            }
        }
        loadglTFBin(url) {
            return __awaiter(this, void 0, void 0, function* () {
                return loadArrayBuffer(url).then(bin => {
                    const Binary = {
                        Magic: 0x46546c67,
                    };
                    let breader = new BinReader(bin);
                    let magic = breader.readUint32();
                    if (magic !== Binary.Magic) {
                        throw new Error("Unexpected magic: " + magic);
                    }
                    let version = breader.readUint32();
                    if (version != 2) {
                        throw new Error("Unsupported version:" + version);
                    }
                    let length = breader.readUint32();
                    if (length !== breader.getLength()) {
                        throw new Error("Length in header does not match actual data length: " + length + " != " + breader.getLength());
                    }
                    let ChunkFormat = {
                        JSON: 0x4e4f534a,
                        BIN: 0x004e4942,
                    };
                    // JSON chunk
                    let chunkLength = breader.readUint32();
                    let chunkFormat = breader.readUint32();
                    if (chunkFormat !== ChunkFormat.JSON) {
                        throw new Error("First chunk format is not JSON");
                    }
                    let _json = JSON.parse(breader.readUint8ArrToString(chunkLength));
                    let _chunkbin = [];
                    while (breader.canread() > 0) {
                        const chunkLength = breader.readUint32();
                        const chunkFormat = breader.readUint32();
                        switch (chunkFormat) {
                            case ChunkFormat.JSON:
                                throw new Error("Unexpected JSON chunk");
                            case ChunkFormat.BIN:
                                _chunkbin.push(breader.readUint8Array(chunkLength));
                                break;
                            default:
                                // ignore unrecognized chunkFormat
                                breader.skipBytes(chunkLength);
                                break;
                        }
                    }
                    return { json: _json, chunkbin: _chunkbin };
                });
            });
        }
    }
    //------------------extensions
    LoadGlTF.ExtensionDic = {};
    //# sourceMappingURL=LoadglTF.js.map

    // instance ondirty 触发 layercomposition 对instance 重新分层，重新sort
    var Private$9;
    (function (Private) {
        Private.id = 0;
    })(Private$9 || (Private$9 = {}));
    class MeshInstance {
        constructor() {
            this.bevisible = true;
            this.enableCull = false;
            this.geometryRef = new AssetReference();
            this.materialRef = new AssetReference();
            this.onDirty = new EventHandler();
            this.ondispose = new EventHandler();
            this.id = Private$9.id++;
            this.geometryRef.onDirty.addEventListener(() => { this.onDirty.raiseEvent(this); });
            this.materialRef.onDirty.addEventListener(() => { this.onDirty.raiseEvent(this); });
        }
        get worldMat() { var _a; return (_a = this.node) === null || _a === void 0 ? void 0 : _a.worldMatrix; }
        get geometry() { return this.geometryRef.asset; }
        set geometry(value) { this.geometryRef.asset = value; this.onDirty.raiseEvent(this); }
        get bounding() { return this.geometryRef.asset.bounding; }
        get material() { return this.materialRef.asset; }
        set material(mat) { this.materialRef.asset = mat; this.onDirty.raiseEvent(this); }
        dispose() { this.ondispose.raiseEvent(this); }
        ;
    }
    //# sourceMappingURL=MeshInstance.js.map

    class AssetReferenceArray {
        constructor() {
            this.assets = [];
            this.attachToItemAssetChangeAction = [];
            this.onAssetChange = new EventHandler();
            this.onItemDelect = new EventHandler();
        }
        setValue(asset, index = 0) {
            if (this.assets[index] == null) {
                let newRef = new AssetReference();
                this.assets[index] = newRef;
                this.attachToItemAssetChangeAction[index] = DebuffAction.create(() => {
                    let func = (event) => {
                        this.onAssetChange.raiseEvent(Object.assign(Object.assign({}, event), { index: index }));
                    };
                    newRef.onAssetChange.addEventListener(func);
                    return () => {
                        newRef.onAssetChange.removeEventListener(func);
                    };
                });
            }
            this.assets[index].asset = asset;
        }
        getValue(index = 0) {
            return this.assets[index];
        }
        delectItem(index) {
            var _a;
            this.assets.splice(index, 1);
            (_a = this.attachToItemAssetChangeAction[index]) === null || _a === void 0 ? void 0 : _a.dispose();
            this.onItemDelect.raiseEvent(index);
        }
    }
    //# sourceMappingURL=AssetReferenceArray.js.map

    let ModelComponent = class ModelComponent {
        constructor() {
            this.primitives = new AssetReferenceArray();
            this.meshinstances = [];
            this.onDirty = new EventHandler();
            this.primitives.onAssetChange.addEventListener((event) => {
                let { newAsset, index } = event;
                let ins = this.meshinstances[index];
                if (ins == null) {
                    ins = this.meshinstances[index] = new MeshInstance();
                    ins.node = this.entity;
                    this.onDirty.raiseEvent(this);
                }
                ins.geometry = newAsset.geometry;
                ins.material = newAsset.material;
            });
            this.primitives.onItemDelect.addEventListener((index) => {
                this.meshinstances[index].dispose();
            });
        }
        get meshInstances() { return this.meshinstances; }
    };
    ModelComponent = __decorate([
        Ecs.registeComp,
        __metadata("design:paramtypes", [])
    ], ModelComponent);
    //# sourceMappingURL=ModelComponent.js.map

    class ModelSystem {
        constructor(scene) {
            this.caredComps = [ModelComponent.name];
            this.uniteBitkey = new UniteBitkey();
            this.comps = new Map();
            this.onCompDirty = (comp) => {
                comp.meshInstances.forEach(ins => {
                    this.scene.tryAddMeshInstance(ins);
                });
            };
            this.scene = scene;
        }
        tryAddEntity(entity) {
            if (!this.comps.has(entity.id)) {
                let comp = entity.getComponent(ModelComponent.name);
                this.comps.set(entity.id, {
                    comp,
                    debuffAction: DebuffAction.create(() => {
                        comp.meshInstances.forEach(ins => {
                            this.scene.tryAddMeshInstance(ins);
                        });
                        comp.onDirty.addEventListener(this.onCompDirty);
                        return () => {
                            comp.onDirty.removeEventListener(this.onCompDirty);
                            comp.meshInstances.forEach(ins => {
                                this.scene.tryAddMeshInstance(ins);
                            });
                        };
                    })
                });
            }
        }
        tryRemoveEntity(entity) {
            if (this.comps.has(entity.id)) {
                this.comps.delete(entity.id);
            }
        }
    }
    //# sourceMappingURL=ModelSystem.js.map

    class ToyGL {
        static create(element) {
            let canvas;
            if (element instanceof HTMLDivElement) {
                canvas = document.createElement("canvas");
                canvas.width = element.clientWidth;
                canvas.width = element.clientHeight;
                element.appendChild(canvas);
                element.onresize = () => {
                    canvas.width = element.clientWidth;
                    canvas.width = element.clientHeight;
                };
            }
            else {
                canvas = element;
            }
            let toy = new ToyGL();
            let timer = new Timer();
            let input = new Input(canvas);
            let screen = new Screen(canvas);
            let device = new GraphicsDevice(canvas);
            let render = new Render(device);
            let resource = new Resource();
            let scene = new InterScene(render);
            resource.registerAssetLoader(".gltf", new LoadGlTF(device));
            Ecs.addSystem(new ModelSystem(scene));
            timer.onTick.addEventListener((deltaTime) => {
                scene.frameUpdate(deltaTime);
            });
            toy._timer = timer;
            toy._input = input;
            toy._screen = screen;
            toy._scene = scene;
            toy._resource = resource;
            return toy;
        }
        get input() { return this._input; }
        get screen() { return this._screen; }
        get timer() { return this._timer; }
        get scene() { return this._scene; }
        get resource() { return this._resource; }
    }
    //# sourceMappingURL=toygl.js.map

    /**
     *
     * @example useage
     * ```
     * let pos= new GeometryAttribute({
     *       componentDatatype : ComponentDatatype.FLOAT,
     *       componentsPerAttribute : 3,
     *       values : new Float32Array([
     *         0.0, 0.0, 0.0,
     *         7500000.0, 0.0, 0.0,
     *         0.0, 7500000.0, 0.0
     *       ])
     *     })
     *
     */
    class GeometryAttribute {
        constructor(option) {
            var _a, _b;
            this.value = option.value;
            this.type = option.type;
            this.componentsPerAttribute = option.componentsPerAttribute;
            this.normalize = (_a = option.normalize) !== null && _a !== void 0 ? _a : false;
            this.beDynamic = (_b = option.beDynamic) !== null && _b !== void 0 ? _b : false;
            if (option.values instanceof Array) {
                this.componentDatatype = option.componentDatatype || ComponentDatatypeEnum.FLOAT;
                this.values = TypedArray.fromGlType(this.componentDatatype, option.values);
            }
            else {
                this.values = option.values;
                if (option.componentDatatype != null) {
                    if (option.values != null && TypedArray.glType(this.values) != option.componentDatatype) {
                        throw new Error("the componentDatatype is conflict with geometryAttributeOption's value (Typedarray)");
                    }
                    this.componentDatatype = option.componentDatatype;
                }
                else {
                    this.componentDatatype = this.values ? TypedArray.glType(this.values) : ComponentDatatypeEnum.FLOAT;
                }
            }
        }
    }
    //# sourceMappingURL=GeometryAttribute.js.map

    /**
     *
     * @example useage
     * ```
     * var geometry = new Geometry({
     *   attributes : [
     * ]{
     *    {
     *       componentDatatype : ComponentDatatype.FLOAT,
     *       componentsPerAttribute : 3,
     *       values : new Float32Array([
     *         0.0, 0.0, 0.0,
     *         7500000.0, 0.0, 0.0,
     *         0.0, 7500000.0, 0.0
     *       ])
     *     })
     *   },
     *   primitiveType : PrimitiveType.LINE_LOOP
     * });
     * ```
     */
    class Geometry extends GeometryAsset {
        constructor(option) {
            super();
            this.attributes = {};
            this.dirtyAtt = {};
            // this.attributes = option.attributes;
            option.attributes.forEach(item => {
                this.setAttribute(item.type, item);
            });
            this.indices = option.indices instanceof Array ? new Uint16Array(option.indices) : option.indices;
            this.primitiveType = option.primitiveType != null ? option.primitiveType : GlConstants.TRIANGLES;
            this.boundingSphere = option.boundingSphere;
        }
        get vertexCount() { return this._vertexCount; }
        ;
        setAttribute(attributeType, options) {
            let geAtt = new GeometryAttribute(Object.assign(Object.assign({}, options), { type: attributeType }));
            this.attributes[attributeType] = geAtt;
            if (attributeType === VertexAttEnum.POSITION) {
                this._vertexCount = geAtt.values.length / geAtt.componentsPerAttribute;
            }
            if (this.graphicAsset != null) {
                this.beNeedRefreshGraphicAsset = true;
                this.dirtyAtt[attributeType] = geAtt;
            }
        }
        updateAttributeData(attributeType, data) {
            this.beNeedRefreshGraphicAsset = true;
            this.attributes[attributeType].values = data;
            this.dirtyAtt[attributeType] = this.attributes[attributeType];
        }
        create(device) {
            return Geometry.createVertexArray(device, this);
        }
        refresh(device) {
            for (let key in this.dirtyAtt) {
                if (this.graphicAsset.hasAttribute(key)) {
                    this.graphicAsset.updateVertexBuffer(key, this.dirtyAtt[key].values);
                }
                else {
                    let geAtt = this.dirtyAtt[key];
                    let att = {
                        type: geAtt.type,
                        componentDatatype: geAtt.componentDatatype,
                        componentsPerAttribute: geAtt.componentsPerAttribute,
                        normalize: geAtt.normalize,
                    };
                    att.vertexBuffer = new VertexBuffer({
                        context: device,
                        usage: geAtt.beDynamic ? BufferUsageEnum.DYNAMIC_DRAW : BufferUsageEnum.STATIC_DRAW,
                        typedArray: geAtt.values
                    });
                    this.graphicAsset.update(att);
                }
            }
        }
        get bounding() {
            var _a;
            if (this.boundingSphere == null) {
                this.boundingSphere = BoundingSphere.fromTypedArray((_a = this.attributes[VertexAttEnum.POSITION]) === null || _a === void 0 ? void 0 : _a.values);
            }
            return this.boundingSphere;
        }
        static createVertexArray(context, geometry) {
            let geAtts = geometry.attributes;
            let vertexAtts = Object.keys(geAtts).map(attName => {
                let geAtt = geAtts[attName];
                let att = {
                    type: geAtt.type,
                    componentDatatype: geAtt.componentDatatype,
                    componentsPerAttribute: geAtt.componentsPerAttribute,
                    normalize: geAtt.normalize,
                };
                if (geAtt.values) {
                    att.vertexBuffer = new VertexBuffer({
                        context: context,
                        usage: geAtt.beDynamic ? BufferUsageEnum.DYNAMIC_DRAW : BufferUsageEnum.STATIC_DRAW,
                        typedArray: geAtt.values
                    });
                }
                else {
                    att.value = geAtt.value;
                }
                return att;
            });
            let indexBuffer;
            if (geometry.indices) {
                indexBuffer = new IndexBuffer({
                    context: context,
                    typedArray: geometry.indices,
                });
            }
            return new VertexArray({
                context: context,
                vertexAttributes: vertexAtts,
                indexBuffer: indexBuffer
            });
        }
    }
    //# sourceMappingURL=Geometry.js.map

    var Private$a;
    (function (Private) {
        Private.plan = new Geometry({
            attributes: [
                {
                    type: VertexAttEnum.POSITION,
                    componentsPerAttribute: 3,
                    values: [
                        -1.0, 0, 1.0,
                        1.0, 0, 1.0,
                        1.0, 0, -1.0,
                        -1.0, 0, -1.0,
                    ]
                },
                {
                    type: VertexAttEnum.TEXCOORD_0,
                    componentsPerAttribute: 2,
                    values: [
                        0.0, 0.0,
                        1.0, 0.0,
                        1.0, 1.0,
                        0.0, 1.0,
                    ]
                },
                {
                    type: VertexAttEnum.NORMAL,
                    componentsPerAttribute: 3,
                    values: [
                        0.0, 1.0, 0.0,
                        0.0, 1.0, 0.0,
                        0.0, 1.0, 0.0,
                        0.0, 1.0, 0.0
                    ]
                }
            ],
            indices: [0, 1, 2, 0, 2, 3],
        });
        Private.quad = new Geometry({
            attributes: [
                {
                    type: VertexAttEnum.POSITION,
                    componentsPerAttribute: 3,
                    values: [
                        -1.0, -1.0, 0,
                        1.0, -1.0, 0,
                        1.0, 1.0, 0,
                        -1.0, 1.0, 0,
                    ]
                },
                {
                    type: VertexAttEnum.TEXCOORD_0,
                    componentsPerAttribute: 2,
                    values: [
                        0.0, 0.0,
                        1.0, 0.0,
                        1.0, 1.0,
                        0.0, 1.0,
                    ]
                },
                {
                    type: VertexAttEnum.NORMAL,
                    componentsPerAttribute: 3,
                    values: [
                        0.0, 0.0, 1.0,
                        0.0, 0.0, 1.0,
                        0.0, 0.0, 1.0,
                        0.0, 0.0, 1.0
                    ]
                }
            ],
            indices: [0, 1, 2, 0, 2, 3],
        });
        Private.cube = new Geometry({
            attributes: [
                {
                    type: VertexAttEnum.POSITION,
                    componentsPerAttribute: 3,
                    values: [
                        // Front face
                        -1.0, -1.0, 1.0,
                        1.0, -1.0, 1.0,
                        1.0, 1.0, 1.0,
                        -1.0, 1.0, 1.0,
                        // Back face
                        -1.0, -1.0, -1.0,
                        -1.0, 1.0, -1.0,
                        1.0, 1.0, -1.0,
                        1.0, -1.0, -1.0,
                        // Top face
                        -1.0, 1.0, -1.0,
                        -1.0, 1.0, 1.0,
                        1.0, 1.0, 1.0,
                        1.0, 1.0, -1.0,
                        // Bottom face
                        -1.0, -1.0, -1.0,
                        1.0, -1.0, -1.0,
                        1.0, -1.0, 1.0,
                        -1.0, -1.0, 1.0,
                        // Right face
                        1.0, -1.0, -1.0,
                        1.0, 1.0, -1.0,
                        1.0, 1.0, 1.0,
                        1.0, -1.0, 1.0,
                        // Left face
                        -1.0, -1.0, -1.0,
                        -1.0, -1.0, 1.0,
                        -1.0, 1.0, 1.0,
                        -1.0, 1.0, -1.0
                    ]
                },
                {
                    type: VertexAttEnum.TEXCOORD_0,
                    componentsPerAttribute: 2,
                    values: [
                        // Front
                        0.0, 0.0,
                        1.0, 0.0,
                        1.0, 1.0,
                        0.0, 1.0,
                        // Back
                        0.0, 0.0,
                        1.0, 0.0,
                        1.0, 1.0,
                        0.0, 1.0,
                        // Top
                        0.0, 0.0,
                        1.0, 0.0,
                        1.0, 1.0,
                        0.0, 1.0,
                        // Bottom
                        0.0, 0.0,
                        1.0, 0.0,
                        1.0, 1.0,
                        0.0, 1.0,
                        // Right
                        0.0, 0.0,
                        1.0, 0.0,
                        1.0, 1.0,
                        0.0, 1.0,
                        // Left
                        0.0, 0.0,
                        1.0, 0.0,
                        1.0, 1.0,
                        0.0, 1.0
                    ]
                },
                {
                    type: VertexAttEnum.NORMAL,
                    componentsPerAttribute: 3,
                    values: [
                        // Front
                        0.0, 0.0, 1.0,
                        0.0, 0.0, 1.0,
                        0.0, 0.0, 1.0,
                        0.0, 0.0, 1.0,
                        // Back
                        0.0, 0.0, -1.0,
                        0.0, 0.0, -1.0,
                        0.0, 0.0, -1.0,
                        0.0, 0.0, -1.0,
                        // Top
                        0.0, 1.0, 0.0,
                        0.0, 1.0, 0.0,
                        0.0, 1.0, 0.0,
                        0.0, 1.0, 0.0,
                        // Bottom
                        0.0, -1.0, 0.0,
                        0.0, -1.0, 0.0,
                        0.0, -1.0, 0.0,
                        0.0, -1.0, 0.0,
                        // Right
                        1.0, 0.0, 0.0,
                        1.0, 0.0, 0.0,
                        1.0, 0.0, 0.0,
                        1.0, 0.0, 0.0,
                        // Left
                        -1.0, 0.0, 0.0,
                        -1.0, 0.0, 0.0,
                        -1.0, 0.0, 0.0,
                        -1.0, 0.0, 0.0
                    ]
                }
            ],
            indices: [
                0, 1, 2, 0, 2, 3,
                4, 5, 6, 4, 6, 7,
                8, 9, 10, 8, 10, 11,
                12, 13, 14, 12, 14, 15,
                16, 17, 18, 16, 18, 19,
                20, 21, 22, 20, 22, 23 // left
            ],
        });
    })(Private$a || (Private$a = {}));
    class DefaultGeometry {
        static get ins() { return new DefaultGeometry(); }
        get quad() { return Private$a.quad; }
        get cube() { return Private$a.cube; }
        get plan() { return Private$a.plan; }
    }
    //# sourceMappingURL=DefaultGeometry.js.map

    class MemoryTexture extends TextureAsset {
        constructor(options) {
            var _a;
            super();
            this.arrayBufferView = options.arrayBufferView;
            this.width = options.width;
            this.height = options.height;
            this._pixelFormat = options.pixelFormat || PixelFormatEnum.RGBA;
            this._pixelDatatype = options.pixelDatatype || PixelDatatypeEnum.UNSIGNED_BYTE;
            this._preMultiplyAlpha = options.preMultiplyAlpha || this.pixelFormat === PixelFormatEnum.RGB || this.pixelFormat === PixelFormatEnum.LUMINANCE;
            this._flipY = (_a = options.flipY) !== null && _a !== void 0 ? _a : true;
            this.sampler = new Sampler(options.sampler);
        }
        create(device) {
            if (this.arrayBufferView) {
                return Texture.fromTypedArray({
                    context: device,
                    width: this.width,
                    height: this.height,
                    arrayBufferView: this.arrayBufferView,
                    pixelFormat: this._pixelFormat,
                    pixelDatatype: this._pixelDatatype,
                    sampler: this.sampler
                });
            }
            return null;
        }
        refresh(device) {
            throw new Error("Method not implemented.");
        }
        set pixelFormat(format) { this._pixelFormat = format; }
        ;
        set pixelDatatype(type) { this._pixelDatatype = type; }
        ;
        set preMultiplyAlpha(value) { this._preMultiplyAlpha = value; }
        set flipY(value) { this._flipY = value; }
    }
    //# sourceMappingURL=MemoryTexture.js.map

    var Private$b;
    (function (Private) {
        Private.white = new MemoryTexture({
            width: 1,
            height: 1,
            arrayBufferView: new Uint8Array([255, 255, 255, 255])
        });
        Private.black = new MemoryTexture({
            width: 1,
            height: 1,
            arrayBufferView: new Uint8Array([0, 0, 0, 255])
        });
        Private.grid = new MemoryTexture({
            width: 256,
            height: 256,
            arrayBufferView: getGridTexData(256, 256),
        });
        function getGridTexData(width, height) {
            let data = new Uint8Array(width * width * 4);
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    let seek = (y * width + x) * 4;
                    if ((x - width * 0.5) * (y - height * 0.5) > 0) {
                        data[seek] = 0;
                        data[seek + 1] = 0;
                        data[seek + 2] = 0;
                        data[seek + 3] = 255;
                    }
                    else {
                        data[seek] = 255;
                        data[seek + 1] = 255;
                        data[seek + 2] = 255;
                        data[seek + 3] = 255;
                    }
                }
            }
            return data;
        }
    })(Private$b || (Private$b = {}));
    class DefaultTexture {
        static get white() { return Private$b.white; }
        ;
        static get black() { return Private$b.black; }
        ;
        static get grid() { return Private$b.grid; }
        ;
    }
    //# sourceMappingURL=DefaultTexture.js.map

    class Base {
        static start(toy) {
            let geometry = DefaultGeometry.ins.quad;
            let mat = new Material({
                uniformParameters: {
                    MainColor: Color.create(0, 1.0, 0.0, 1.0)
                },
                shaderOption: {
                    vsStr: `attribute vec3 POSITION;
                attribute vec3 TEXCOORD_0;
                uniform highp mat4 czm_modelViewp;
                uniform highp float timer;
                varying mediump vec2 xlv_TEXCOORD0;
                void main()
                {
                    xlv_TEXCOORD0 = vec2(TEXCOORD_0.x+timer,TEXCOORD_0.y);
                    highp vec4 tmplet_1=vec4(POSITION.xyz,1.0);
                    gl_Position = czm_modelViewp * tmplet_1;;
                }`,
                    fsStr: `uniform highp vec4 MainColor;
                uniform lowp sampler2D _MainTex;
                varying mediump vec2 xlv_TEXCOORD0;
                void main()
                {
                    gl_FragData[0] = texture2D(_MainTex, xlv_TEXCOORD0);
                }`,
                    attributes: {
                        POSITION: VertexAttEnum.POSITION,
                        MainColor: VertexAttEnum.COLOR_0,
                        TEXCOORD_0: VertexAttEnum.TEXCOORD_0,
                    }
                }
            });
            mat.setUniformParameter("_MainTex", DefaultTexture.grid);
            // mat.setUniformParameter("_MainTex", DefaultTexture.grid);
            let tex = new Texture2D();
            let image = new Image();
            image.src = "../resources/glTF/duck/DuckCM.png";
            image.onload = () => {
                tex.textureSource = image;
                mat.setUniformParameter("_MainTex", tex);
                console.log("tex loded!");
            };
            let ins = new MeshInstance();
            ins.geometry = geometry;
            ins.material = mat;
            let node = toy.scene.createChild();
            ins.node = node;
            toy.scene.tryAddMeshInstance(ins);
            let camNode = toy.scene.createChild();
            camNode.localPosition.z = 5;
            let cam = new Camera();
            cam.node = camNode;
            toy.scene.tryAddCamera(cam);
            let totalTime = 0;
            toy.scene.preUpdate.addEventListener((delta) => {
                totalTime += delta;
                // node.localRotation = Quat.FromEuler(0, roty, 0, node.localRotation);
                mat.setUniformParameter("timer", totalTime);
            });
            // let geometry = DefGeometry.fromType("quad");
            // ///------------def shader
            // let shader = DefShader.fromType("3dTex");
            // //-------------custom shader
            // let customeShader = Resource.load("../res/shader/base.shader.json") as Shader;
            // let material = new Material();
            // material.shader = customeShader;
            // material.setColor("_MainColor", Color.create(1, 0, 0, 1));
            // //-----------def tex
            // let defTex = DefTextrue.GIRD;
            // //-----------load tex
            // let tex = Resource.load("../res/imgs/tes.png") as Texture;
            // material.setTexture("_MainTex", tex);
            // let obj = new Entity();
            // let mesh = obj.addCompByName("Mesh") as Mesh;
            // mesh.geometry = geometry;
            // mesh.material = material;
            // toy.scene.addEntity(obj);
            // let camobj = new Entity("", ["Camera"]);
            // let trans = camobj.transform;
            // trans.localPosition = Vec3.create(0, 0, 5);
            // // trans.localRotation = Quat.FromEuler(-90, 0, 0);
            // toy.scene.addEntity(camobj);
            // let roty = 0;
            // toy.scene.preUpdate = delta =>
            // {
            //     roty += delta * 0.01;
            //     obj.transform.localRotation = Quat.FromEuler(0, roty, 0, obj.transform.localRotation);
            // };
        }
    }
    //# sourceMappingURL=bass.js.map

    window.onload = () => {
        let toy = ToyGL.create(document.getElementById("canvas"));
        Base.start(toy);
        // LoadGltf.start(toy);
        // AssetLoader.addLoader().then(()    // {
        //     // Base.done(toy);
        //     // LoadGltf.done(toy);
        //     // LookAt.done(toy);
        //     ShowCull.done(toy);
        //     // RenderTextureDome.done(toy);
        //     // DepthTexutreDemo.done(toy);
        //     // SSAO.done(toy);
        // });
    };
    //# sourceMappingURL=main.js.map

})));
//# sourceMappingURL=dome.js.map
