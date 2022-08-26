import { mat4, vec3, vec4 } from 'gl-matrix';

export class Tempt {
    private static temptVec3: vec3[] = [];
    static getVec3(i = 0) {
        let value = this.temptVec3[i];
        if (value == null) {
            value = vec3.create();
            this.temptVec3[i] = value;
        }
        return value;
    }

    private static temptMat4: mat4[] = [];
    static getMat4(i = 0) {
        let value = this.temptMat4[i];
        if (value == null) {
            value = mat4.create();
            this.temptMat4[i] = value;
        }
        return value;
    }

    private static temptVec4: vec4[] = [];
    static getVec4(i = 0) {
        let value = this.temptVec4[i];
        if (value == null) {
            value = vec4.create();
            this.temptVec4[i] = value;
        }
        return value;
    }
}
