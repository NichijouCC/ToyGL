import { GraphicsDevice } from "./GraphicsDevice";

export type bufferOption =
    | {
          context: GraphicsDevice;
          bufferTarget: BufferTargetEnum;
          typedArray: ArrayBufferView;
          usage: BufferUsageEnum;
      }
    | {
          context: GraphicsDevice;
          bufferTarget: BufferTargetEnum;
          sizeInBytes: number;
          usage: BufferUsageEnum;
      };
export class Buffer {
    protected bufferTarget: BufferTargetEnum;
    protected usage: BufferUsageEnum;
    protected typedArray: ArrayBufferView;
    protected sizeInBytes: number;
    protected _buffer: WebGLBuffer;
    private device: GraphicsDevice;
    protected constructor(options: bufferOption) {
        this.device = options.context;
        this.bufferTarget = options.bufferTarget;
        this.usage = options.usage;
        this.typedArray = (options as any).typedArray;
        this.sizeInBytes = (options as any).sizeInBytes;

        let hasTypedArray = this.typedArray != null;
        if (hasTypedArray) {
            this.sizeInBytes = this.typedArray.byteLength;
        }
        if (hasTypedArray) {
            this._buffer=options.context.createBuffer(this.bufferTarget,this.typedArray,this.usage);
        } else {
            this._buffer=options.context.createBuffer(this.bufferTarget,this.sizeInBytes,this.usage);
        }
    }

    bind() {
        this.device.bindBuffer(this._buffer,this.bufferTarget);
    }
    unbind() {
        this.device.bindBuffer(null,this.bufferTarget);
    }

    dispose() {
        this.device.destroyBuffer(this._buffer);
    }
}


export enum BufferTargetEnum{
    ARRAY_BUFFER="ARRAY_BUFFER",
    ELEMENT_ARRAY_BUFFER="ARRAY_BUFFER"
}

export enum BufferUsageEnum{
    STATIC_DRAW="STATIC_DRAW",
    DYNAMIC_DRAW="DYNAMIC_DRAW"
}

