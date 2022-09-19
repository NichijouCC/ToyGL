import { ObjectPool } from "@mtgoo/ctool";
import { mat4, vec3, vec4 } from "./extends";

export const mat4Pool = new ObjectPool({ create: () => mat4.create(), reInit: (obj: mat4) => mat4.identity(obj) });
export const vec3Pool = new ObjectPool({ create: () => vec3.create(), reInit: (obj: vec3) => vec3.identity(obj) });
export const vec4Pool = new ObjectPool({ create: () => vec4.create(), reInit: (obj: vec4) => vec4.identity(obj) });