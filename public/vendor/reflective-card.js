var ReflectiveLib=(()=>{var F=Object.defineProperty;var G=Object.getOwnPropertyDescriptor;var O=Object.getOwnPropertyNames;var X=Object.prototype.hasOwnProperty;var q=(o,e)=>{for(var a in e)F(o,a,{get:e[a],enumerable:!0})},k=(o,e,a,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of O(e))!X.call(o,i)&&i!==a&&F(o,i,{get:()=>e[i],enumerable:!(n=G(e,i))||n.enumerable});return o};var Y=o=>k(F({},"__esModule",{value:!0}),o);var te={};q(te,{createReflectiveDeck:()=>ee});var H=`#version 300 es
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`,$=`#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform sampler2D uVideo;
uniform sampler2D uCam;
uniform vec4 uVideoMap;
uniform vec4 uCamMap;
uniform vec2 uWeights;
uniform vec2 uLod;
float level(sampler2D source) {
  vec3 mean = pow(textureLod(source, vec2(0.5), 14.0).rgb, vec3(2.2));
  return pow(dot(mean, vec3(0.2126, 0.7152, 0.0722)), 1.0 / 2.2);
}
void main() {
  vec3 color = vec3(0.0);
  float mean = 0.0;
  if (uWeights.x > 0.0) {
    color += textureLod(uVideo, vUv * uVideoMap.xy + uVideoMap.zw, uLod.x).rgb * uWeights.x;
    mean += level(uVideo) * uWeights.x;
  }
  if (uWeights.y > 0.0) {
    color += textureLod(uCam, vUv * uCamMap.xy + uCamMap.zw, uLod.y).rgb * uWeights.y;
    mean += level(uCam) * uWeights.y;
  }
  fragColor = vec4(color, mean);
}`,K=`#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;
uniform sampler2D uTexture;
uniform vec2 uStep;
uniform float uSigma;
void main() {
  vec4 sum = texture(uTexture, vUv);
  if (uSigma < 0.35) {
    fragColor = sum;
    return;
  }
  float falloff = -0.5 / (uSigma * uSigma);
  int radius = int(min(ceil(uSigma * 2.8), 40.0));
  float total = 1.0;
  for (int i = 1; i <= 40; i++) {
    if (i > radius) break;
    float offset = float(i);
    float weight = exp(offset * offset * falloff);
    sum += (texture(uTexture, vUv + uStep * offset) + texture(uTexture, vUv - uStep * offset)) * weight;
    total += 2.0 * weight;
  }
  fragColor = sum / total;
}`,j=`#version 300 es
precision highp float;
in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uEnv;
uniform vec2 uEnvSize;
uniform vec2 uSize;
uniform float uRadius;
uniform float uScale;
uniform mat3 uRotate;
uniform float uCapture;
uniform float uBlur;
uniform float uRough;
uniform float uMetal;
uniform vec3 uTint;
uniform float uGray;
uniform float uWarp;
uniform float uWarpScale;
uniform float uShine;
uniform float uBevel;
uniform float uGlare;
uniform vec2 uPointer;
uniform float uTheme;

const float VIEW = ${900 .toFixed(1)};
const float OVERSCAN = ${1.2.toFixed(2)};
const float CONTENT = 46.0;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 hash2(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.103, 0.0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy) * 2.0 - 1.0;
}

vec3 gradientNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  vec2 du = 30.0 * f * f * (f * (f - 2.0) + 1.0);
  vec2 ga = hash2(i);
  vec2 gb = hash2(i + vec2(1.0, 0.0));
  vec2 gc = hash2(i + vec2(0.0, 1.0));
  vec2 gd = hash2(i + vec2(1.0, 1.0));
  float va = dot(ga, f);
  float vb = dot(gb, f - vec2(1.0, 0.0));
  float vc = dot(gc, f - vec2(0.0, 1.0));
  float vd = dot(gd, f - vec2(1.0, 1.0));
  float k = va - vb - vc + vd;
  float value = va + u.x * (vb - va) + u.y * (vc - va) + u.x * u.y * k;
  vec2 slope = ga + u.x * (gb - ga) + u.y * (gc - ga) + u.x * u.y * (ga - gb - gc + gd) + du * (u.yx * k + vec2(vb, vc) - va);
  return vec3(value, slope);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float erf(float x) {
  float x2 = x * x;
  return sign(x) * sqrt(1.0 - exp(-x2 * (1.2732395 + 0.147 * x2) / (1.0 + 0.147 * x2)));
}

float band(float x, float halfWidth, float sigma) {
  float s = 1.4142136 * max(sigma, 0.0001);
  return 0.5 * (erf((x + halfWidth) / s) - erf((x - halfWidth) / s));
}

float strip(vec2 q, vec2 center, vec2 dir, float halfWidth, vec2 sigma) {
  vec2 normal = vec2(-dir.y, dir.x);
  return band(dot(q - center, normal), halfWidth, length(sigma * normal));
}

const vec2 SWEEP = vec2(0.5, 0.86);
const vec3 LUMA = vec3(0.2126, 0.7152, 0.0722);

float softbox(vec2 q, vec2 sigma) {
  float key = strip(q, vec2(-0.1, -0.16), normalize(SWEEP), 0.022, sigma + 0.018);
  float top = band(q.y + 0.6, 0.12, sigma.y + 0.05);
  float side = band(q.x - 0.46, 0.05, sigma.x + 0.05);
  return key + top * 0.8 + side * 0.35;
}

float room(vec2 q, vec2 sigma) {
  float fall = smoothstep(-0.55, 0.5, q.y);
  float flag = strip(q, vec2(0.24, -0.02), normalize(SWEEP), 0.09, sigma + 0.08);
  return mix(0.85, 0.12, fall) * (1.0 - 0.6 * flag);
}

vec4 sampleEnv(vec2 uv) {
  vec2 st = uv * uEnvSize - 0.5;
  vec2 i = floor(st);
  vec2 f = st - i;
  vec2 f2 = f * f;
  vec2 f3 = f2 * f;
  vec2 w0 = (1.0 - 3.0 * f + 3.0 * f2 - f3) / 6.0;
  vec2 w1 = (4.0 - 6.0 * f2 + 3.0 * f3) / 6.0;
  vec2 w2 = (1.0 + 3.0 * f + 3.0 * f2 - 3.0 * f3) / 6.0;
  vec2 w3 = f3 / 6.0;
  vec2 g0 = w0 + w1;
  vec2 g1 = w2 + w3;
  vec2 c0 = (i + 0.5 + w1 / g0 - 1.0) / uEnvSize;
  vec2 c1 = (i + 0.5 + w3 / g1 + 1.0) / uEnvSize;
  vec4 a = texture(uEnv, c0) * g0.x + texture(uEnv, vec2(c1.x, c0.y)) * g1.x;
  vec4 b = texture(uEnv, vec2(c0.x, c1.y)) * g0.x + texture(uEnv, c1) * g1.x;
  return a * g0.y + b * g1.y;
}

vec3 toLinear(vec3 c) {
  return pow(max(c, 0.0), vec3(2.2));
}

void main() {
  vec2 p = vec2(vUv.x - 0.5, 0.5 - vUv.y) * uSize;
  vec2 halfSize = uSize * 0.5;
  float r = min(uRadius, min(halfSize.x, halfSize.y));
  vec2 corner = abs(p) - halfSize + r;
  vec2 side = vec2(p.x >= 0.0 ? 1.0 : -1.0, p.y >= 0.0 ? 1.0 : -1.0);
  float d;
  vec2 outward;
  if (corner.x > 0.0 && corner.y > 0.0) {
    d = length(corner) - r;
    outward = normalize(corner) * side;
  } else if (corner.x > corner.y) {
    d = corner.x - r;
    outward = vec2(side.x, 0.0);
  } else {
    d = corner.y - r;
    outward = vec2(0.0, side.y);
  }
  float coverage = clamp(0.5 - d * uScale, 0.0, 1.0);

  float chamferWidth = min(uBevel, max(r, 1.0));
  float chamfer = chamferWidth > 0.01 ? 1.0 - smoothstep(0.0, chamferWidth, -d) : 0.0;
  vec2 slope = outward * chamfer;

  vec2 wp = p / (220.0 * uWarpScale);
  vec3 w1 = gradientNoise(wp);
  vec3 w2 = gradientNoise(wp * 2.07 + 13.7);
  vec2 ripple = (w1.yz + w2.yz * 0.5) * uWarp;
  slope += ripple * 0.008;

  float grain = valueNoise(vec2(p.x * 0.008, p.y * 0.55)) * 0.45 + valueNoise(vec2(p.x * 0.019 + 3.7, p.y * 0.23)) * 0.35 + valueNoise(vec2(p.x * 0.004 + 9.2, p.y * 0.09)) * 0.2;
  float brush = uRough * uRough;
  slope.y += (grain - 0.5) * brush * 0.004;

  vec3 normal = uRotate * normalize(vec3(slope, 1.0));
  vec3 position = uRotate * vec3(p, 0.0);
  vec3 view = normalize(position - vec3(0.0, 0.0, VIEW));
  vec3 bounce = reflect(view, normal);
  vec2 q = bounce.xy / max(bounce.z, 0.2);

  vec2 footprint = fwidth(q);
  vec2 sigma = sqrt(vec2(uBlur / VIEW) * vec2(uBlur / VIEW) + footprint * footprint * 0.5);
  sigma += vec2(0.004, 0.05) * uRough;

  vec2 shift = clamp((q - p / VIEW) * CONTENT + ripple * 10.0, -uSize, uSize);
  vec2 cp = (p + shift) / (uSize * OVERSCAN);
  vec4 reflected = uCapture > 0.0 ? sampleEnv(vec2(0.5 + cp.x, 0.5 - cp.y)) : vec4(0.0, 0.0, 0.0, 1.0);
  vec3 captured = toLinear(reflected.rgb) * (0.5 / max(pow(reflected.a, 2.2), 0.02));
  captured = mix(vec3(dot(captured, LUMA)), captured, 1.0 - uGray);
  captured = pow(max(captured * 1.2, 0.0), vec3(mix(2.0, 1.5, uTheme)));

  vec3 scene = mix(vec3(room(q, sigma)), captured, uCapture * (1.0 - chamfer) * mix(1.0, 0.6, uTheme));
  scene *= 1.0 + (grain - 0.5) * brush * 0.3;

  vec2 toPointer = (uPointer - p) / (120.0 + uBlur * 4.0);
  vec2 spread = toPointer * vec2(1.0, 1.0 / (1.0 + 2.5 * uRough));
  float reach = dot(spread, spread);
  float glint = max(1.0 + 3.0 * dot(slope, toPointer), 0.0);
  float glare = (exp(-reach * 1.6) + exp(-reach * 0.35) * 0.15) * glint * uGlare * (1.0 + 0.8 * (grain - 0.5) * brush);
  float highlight = (softbox(q, sigma) * uShine + glare) * mix(0.4, 1.0, uMetal);

  vec3 dark = vec3(0.005, 0.005, 0.006) + uTint * (scene * 0.05 * uMetal + highlight * 0.36);
  vec3 light = uTint * (vec3(0.83, 0.83, 0.85) * (1.0 - 0.45 * uMetal * (1.0 - clamp(scene, 0.0, 1.0))) + highlight * 0.35);
  vec3 color = mix(dark, light, uTheme);
  color = min(color, 0.7) + 0.3 * (1.0 - exp(-max(color - 0.7, 0.0) / 0.3));
  color = pow(clamp(color, 0.0, 1.0), vec3(1.0 / 2.2));

  color += (hash(gl_FragCoord.xy) - 0.5) / 255.0;
  color = clamp(color, 0.0, 1.0);
  fragColor = vec4(color * coverage, coverage);
}`,T=(o,e,a)=>Math.min(a,Math.max(e,o));var J=o=>{let e=String(o||"").trim(),a=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(e);if(a){let i=a[1].length===3?a[1].replace(/./g,l=>l+l):a[1];return[0,2,4].map(l=>parseInt(i.slice(l,l+2),16)/255)}let n=/^rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i.exec(e);return n?[n[1],n[2],n[3]].map(i=>T(parseFloat(i)/255,0,1)):[1,1,1]},W=(o,e,a)=>{let n=o.createShader(e);return n?(o.shaderSource(n,a),o.compileShader(n),o.getShaderParameter(n,o.COMPILE_STATUS)?n:(console.error(o.getShaderInfoLog(n)),o.deleteShader(n),null)):null},D=(o,e)=>{let a=W(o,o.VERTEX_SHADER,H),n=W(o,o.FRAGMENT_SHADER,e),i=a&&n?o.createProgram():null;if(!a||!n||!i)return a&&o.deleteShader(a),n&&o.deleteShader(n),null;if(o.attachShader(i,a),o.attachShader(i,n),o.bindAttribLocation(i,0,"aPosition"),o.linkProgram(i),o.deleteShader(a),o.deleteShader(n),!o.getProgramParameter(i,o.LINK_STATUS))return console.error(o.getProgramInfoLog(i)),o.deleteProgram(i),null;let l={},w=o.getProgramParameter(i,o.ACTIVE_UNIFORMS);for(let y=0;y<w;y++){let S=o.getActiveUniform(i,y);S&&(l[S.name]=o.getUniformLocation(i,S.name))}return{program:i,uniforms:l}},B=(o,e,a,n)=>{let i=o/Math.max(1,e),l=i>a?a/i:1,w=i>a?1:i/a,y=n?-l:l;return[y,-w,.5-y*.5,.5+w*.5]},V=(o,e,a,n)=>{let i=o/Math.max(1,e),l=o*(i>n?n/i:1);return Math.max(0,Math.log2(Math.max(1,l/Math.max(1,a)))-.5)},Q=o=>{let e=o.getContext("webgl2",{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,powerPreference:"default"});if(!e)return null;let a=D(e,$),n=D(e,K),i=D(e,j);if(!a||!n||!i){for(let r of[a,n,i])r&&e.deleteProgram(r.program);return null}let l=(r,s)=>{let p=e.createTexture();return e.bindTexture(e.TEXTURE_2D,p),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,r?e.LINEAR_MIPMAP_LINEAR:e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,s),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,s),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,new Uint8Array([0,0,0,255])),p},w=()=>{let r=l(!1,e.MIRRORED_REPEAT),s=e.createFramebuffer();return e.bindFramebuffer(e.FRAMEBUFFER,s),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,r,0),e.bindFramebuffer(e.FRAMEBUFFER,null),{texture:r,framebuffer:s,width:1,height:1}},y=(r,s,p)=>{r.width===s&&r.height===p||(r.width=s,r.height=p,e.bindTexture(e.TEXTURE_2D,r.texture),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,s,p,0,e.RGBA,e.UNSIGNED_BYTE,null))},S=e.createVertexArray();e.bindVertexArray(S);let N=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,N),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.disable(e.BLEND),e.disable(e.DEPTH_TEST);let U={video:l(!0,e.CLAMP_TO_EDGE),cam:l(!0,e.CLAMP_TO_EDGE)},I=w(),z=w(),_=w(),P=new Float32Array(9),R=(r,s)=>(e.bindFramebuffer(e.FRAMEBUFFER,r?r.framebuffer:null),e.viewport(0,0,r?r.width:o.width,r?r.height:o.height),e.useProgram(s.program),s.uniforms),C=(r,s)=>{e.activeTexture(e.TEXTURE0+r),e.bindTexture(e.TEXTURE_2D,s)};return{upload:(r,s)=>{try{return e.bindTexture(e.TEXTURE_2D,U[r]),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,e.RGBA,e.UNSIGNED_BYTE,s),e.generateMipmap(e.TEXTURE_2D),!0}catch{return!1}},renderEnv:({width:r,height:s,scale:p,blur:A,roughness:L,video:d,cam:g})=>{let b=T(2.5/Math.max(A,.01),.12,p),m=Math.max(8,Math.ceil(r*1.2*b)),x=Math.max(8,Math.ceil(s*1.2*b));y(I,m,x),y(z,m,x),y(_,m,x);let u=r/Math.max(1,s),E=1-(1-d.mix)*(1-g.mix),M=E>0?g.mix/E:0,c=R(I,a);C(0,U.video),C(1,U.cam),e.uniform1i(c.uVideo,0),e.uniform1i(c.uCam,1),e.uniform4fv(c.uVideoMap,d.ready?B(d.width,d.height,u,!1):[1,1,0,0]),e.uniform4fv(c.uCamMap,g.ready?B(g.width,g.height,u,!0):[1,1,0,0]),e.uniform2f(c.uWeights,d.ready&&E>0?1-M:0,g.ready?M:0),e.uniform2f(c.uLod,d.ready?V(d.width,d.height,m,u):0,g.ready?V(g.width,g.height,m,u):0),e.drawArrays(e.TRIANGLES,0,3),c=R(z,n),C(0,I.texture),e.uniform1i(c.uTexture,0),e.uniform2f(c.uStep,1/m,0),e.uniform1f(c.uSigma,A*b),e.drawArrays(e.TRIANGLES,0,3),c=R(_,n),C(0,z.texture),e.uniform1i(c.uTexture,0),e.uniform2f(c.uStep,0,1/x),e.uniform1f(c.uSigma,(A*(1+1.5*L)+10*L)*b),e.drawArrays(e.TRIANGLES,0,3)},renderPlate:({width:r,height:s,rotateX:p,rotateY:A,capture:L,glare:d,pointerX:g,pointerY:b,settings:m})=>{let x=Math.cos(p),u=Math.sin(p),E=Math.cos(A),M=Math.sin(A);P.set([E,u*M,-x*M,0,x,u,M,-u*E,x*E]);let c=R(null,i);C(0,_.texture),e.uniform1i(c.uEnv,0),e.uniform2f(c.uEnvSize,_.width,_.height),e.uniform2f(c.uSize,r,s),e.uniform1f(c.uRadius,m.radius),e.uniform1f(c.uScale,o.width/Math.max(1,r)),e.uniformMatrix3fv(c.uRotate,!1,P),e.uniform1f(c.uCapture,L),e.uniform1f(c.uBlur,m.blurStrength),e.uniform1f(c.uRough,m.roughness),e.uniform1f(c.uMetal,m.metalness),e.uniform3fv(c.uTint,m.tint),e.uniform1f(c.uGray,m.grayscale),e.uniform1f(c.uWarp,m.warp),e.uniform1f(c.uWarpScale,m.warpScale),e.uniform1f(c.uShine,m.shine),e.uniform1f(c.uBevel,m.bevel),e.uniform1f(c.uGlare,d),e.uniform2f(c.uPointer,g,b),e.uniform1f(c.uTheme,m.theme),e.drawArrays(e.TRIANGLES,0,3)},dispose:()=>{if(!e.isContextLost()){for(let r of[I,z,_])e.deleteFramebuffer(r.framebuffer),e.deleteTexture(r.texture);e.deleteTexture(U.video),e.deleteTexture(U.cam),e.deleteBuffer(N),e.deleteVertexArray(S);for(let r of[a,n,i])e.deleteProgram(r.program)}}}},Z={tint:"#ffffff",metalness:1,roughness:.3,blurStrength:6,grayscale:1,warp:.6,warpScale:1,shine:1,bevel:3,glare:.5,enableTilt:!0,tiltStrength:12,radius:24,theme:"dark",intro:!0,maxScale:1.75};function ee(o={}){let e={...Z,...o},a={tint:J(e.tint).map(t=>Math.pow(t,2.2)),metalness:T(e.metalness,0,1),roughness:T(e.roughness,0,1),blurStrength:T(e.blurStrength,0,40),grayscale:T(e.grayscale,0,1),warp:T(e.warp,0,2),warpScale:T(e.warpScale,.2,4),shine:T(e.shine,0,3),bevel:T(e.bevel,0,16),glare:T(e.glare,0,1),enableTilt:e.enableTilt,tiltStrength:T(e.tiltStrength,0,30),radius:Math.max(0,e.radius),theme:e.theme==="light"?1:0,intro:e.intro},n=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches,i=document.createElement("canvas"),l=null;try{l=Q(i)}catch{l=null}let w=!1;i.addEventListener("webglcontextlost",t=>{t.preventDefault(),w=!0});let y=new Set,S=0,N=t=>{if(!l||w||!t.size.width||!t.size.height)return;let{size:v}=t,f=Math.max(1,Math.round(v.width*v.scale)),h=Math.max(1,Math.round(v.height*v.scale));(i.width!==f||i.height!==h)&&(i.width=f,i.height=h),(t.canvas.width!==f||t.canvas.height!==h)&&(t.canvas.width=f,t.canvas.height=h);let r=(a.enableTilt&&!n?a.tiltStrength:0)*(Math.PI/180);l.renderPlate({width:v.width,height:v.height,rotateX:t.y.p*r,rotateY:-t.x.p*r,capture:0,glare:a.glare*t.light.p,pointerX:t.pointer.x,pointerY:t.pointer.y,settings:a}),t.ctx.clearRect(0,0,f,h),t.ctx.drawImage(i,0,0)},U=t=>{let v=a.enableTilt&&!n?a.tiltStrength:0,f=t.root.style;f.setProperty("--rc-rotate-x",`${(t.y.p*v).toFixed(3)}deg`),f.setProperty("--rc-rotate-y",`${(-t.x.p*v).toFixed(3)}deg`);let h=1-Math.pow(1-t.presence,3);f.setProperty("--rc-presence",h.toFixed(4)),f.setProperty("--rc-lift",`${((1-h)*14).toFixed(2)}px`)},I=t=>{t.size.width=t.body.offsetWidth,t.size.height=t.body.offsetHeight,t.size.scale=Math.min(window.devicePixelRatio||1,e.maxScale),t.introPointer&&(t.pointer.x=.62*t.size.width*.5,t.pointer.y=-.55*t.size.height*.5,t.introPointer=!1)},z=(t,v)=>{t.resizePending&&(t.resizePending=!1,I(t),t.dirty=!0);let f=Math.min(.05,(v-t.last)/1e3||0);t.last=v;let{x:h,y:r,light:s}=t,p=v<t.slowUntil,A=p?24:120,L=p?9:16;if(v>=t.presenceStart){let g=Math.max(1,Math.ceil(f/.008333333333333333)),b=f/g;for(let x=0;x<g;x++)for(let u of[h,r])u.v+=(A*(u.target-u.p)-L*u.v)*b,u.p+=u.v*b;let m=s.target>s.p?.18:p?.9:.45;s.p+=(s.target-s.p)*(1-Math.exp(-f/m))}t.presence<1&&(t.presence=T((v-t.presenceStart)/650,0,1));let d=Math.abs(h.target-h.p)>5e-4||Math.abs(r.target-r.p)>5e-4||Math.abs(h.v)>5e-4||Math.abs(r.v)>5e-4||Math.abs(s.target-s.p)>.002||t.presence<1;return d||(h.p=h.target,r.p=r.target,h.v=0,r.v=0,s.p=s.target),U(t),(d||t.dirty)&&t.visible&&(N(t),t.dirty=!1),d},_=t=>{S=0;let v=!1;for(let f of y)z(f,t)&&(v=!0);v&&document.visibilityState!=="hidden"&&(S=requestAnimationFrame(_))},P=()=>{S||(S=requestAnimationFrame(_))};document.addEventListener("visibilitychange",P);let R=typeof IntersectionObserver=="function"?new IntersectionObserver(t=>{for(let v of t){let f=v.target.__rcCard;f&&(f.visible=v.isIntersecting,f.visible&&(f.dirty=!0,f.resizePending=!0))}P()}):null;return{supported:!!l,attach:(t,v={})=>{let f=t.querySelector(".reflective-card__body"),h=t.querySelector(".reflective-card__canvas");if(!f||!h)throw new Error("reflective-card markup topilmadi");l||t.classList.add("reflective-card--flat");let r={root:t,body:f,canvas:h,ctx:h.getContext("2d"),x:{p:0,v:0,target:0},y:{p:0,v:0,target:0},light:{p:0,target:0},pointer:{x:0,y:0},size:{width:0,height:0,scale:1},presence:1,presenceStart:0,slowUntil:0,touchId:null,last:performance.now(),dirty:!0,resizePending:!0,visible:!0,introPointer:!1};t.__rcCard=r;let s=(u,E,M=!0)=>{r.x.target=T(u,-1,1),r.y.target=T(E,-1,1),r.light.target=M?1:0,r.slowUntil=0,r.last=performance.now(),P()},p=u=>{let E=t.getBoundingClientRect();if(!E.width||!E.height)return;let M=(u.clientX-E.left)/E.width*2-1,c=(u.clientY-E.top)/E.height*2-1;r.pointer.x=M*r.size.width*.5,r.pointer.y=c*r.size.height*.5,s(M,c)},A=()=>s(0,0,!1),L=u=>{u.pointerType==="mouse"&&p(u)},d=u=>{(u.pointerType==="mouse"||u.pointerId===r.touchId)&&p(u)},g=u=>{u.pointerType==="mouse"&&A()},b=u=>{u.pointerType!=="mouse"&&(r.touchId=u.pointerId,p(u))},m=u=>{u.pointerId===r.touchId&&(r.touchId=null,A())};t.addEventListener("pointerenter",L),t.addEventListener("pointermove",d),t.addEventListener("pointerleave",g),t.addEventListener("pointerdown",b),t.addEventListener("pointerup",m),t.addEventListener("pointercancel",m);let x=typeof ResizeObserver=="function"?new ResizeObserver(()=>{r.resizePending=!0,r.last=performance.now(),P()}):null;return x&&x.observe(f),R&&R.observe(t),a.intro&&!n&&v.intro!==!1&&(r.x.p=.62,r.y.p=-.55,r.light.p=1,r.introPointer=!0,r.presence=0,r.presenceStart=performance.now()+(v.delay||0),r.slowUntil=r.presenceStart+1400),y.add(r),U(r),P(),{refresh(){r.dirty=!0,r.resizePending=!0,P()},destroy(){t.removeEventListener("pointerenter",L),t.removeEventListener("pointermove",d),t.removeEventListener("pointerleave",g),t.removeEventListener("pointerdown",b),t.removeEventListener("pointerup",m),t.removeEventListener("pointercancel",m),x&&x.disconnect(),R&&R.unobserve(t),y.delete(r),delete t.__rcCard}}},destroy(){cancelAnimationFrame(S),document.removeEventListener("visibilitychange",P),R&&R.disconnect(),y.clear(),l&&l.dispose()}}}return Y(te);})();
