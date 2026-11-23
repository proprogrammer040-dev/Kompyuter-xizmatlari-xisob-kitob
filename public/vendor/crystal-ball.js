var CrystalBallLib=(()=>{var $e=Object.defineProperty;var wr=Object.getOwnPropertyDescriptor;var Mr=Object.getOwnPropertyNames;var Fr=Object.prototype.hasOwnProperty;var Tr=(t,e)=>{for(var i in e)$e(t,i,{get:e[i],enumerable:!0})},_r=(t,e,i,r)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Mr(e))!Fr.call(t,s)&&s!==i&&$e(t,s,{get:()=>e[s],enumerable:!(r=wr(e,s))||r.enumerable});return t};var Rr=t=>_r($e({},"__esModule",{value:!0}),t);var hs={};Tr(hs,{createCrystalBall:()=>ls});function pe(t){let e=t[0],i=t[1],r=t[2];return Math.sqrt(e*e+i*i+r*r)}function ze(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t}function Wt(t,e,i,r){return t[0]=e,t[1]=i,t[2]=r,t}function Ke(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t[2]=e[2]+i[2],t}function Je(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t[2]=e[2]-i[2],t}function Yt(t,e,i){return t[0]=e[0]*i[0],t[1]=e[1]*i[1],t[2]=e[2]*i[2],t}function Qt(t,e,i){return t[0]=e[0]/i[0],t[1]=e[1]/i[1],t[2]=e[2]/i[2],t}function Pe(t,e,i){return t[0]=e[0]*i,t[1]=e[1]*i,t[2]=e[2]*i,t}function jt(t,e){let i=e[0]-t[0],r=e[1]-t[1],s=e[2]-t[2];return Math.sqrt(i*i+r*r+s*s)}function Zt(t,e){let i=e[0]-t[0],r=e[1]-t[1],s=e[2]-t[2];return i*i+r*r+s*s}function et(t){let e=t[0],i=t[1],r=t[2];return e*e+i*i+r*r}function $t(t,e){return t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t}function Kt(t,e){return t[0]=1/e[0],t[1]=1/e[1],t[2]=1/e[2],t}function De(t,e){let i=e[0],r=e[1],s=e[2],n=i*i+r*r+s*s;return n>0&&(n=1/Math.sqrt(n)),t[0]=e[0]*n,t[1]=e[1]*n,t[2]=e[2]*n,t}function tt(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}function it(t,e,i){let r=e[0],s=e[1],n=e[2],a=i[0],l=i[1],h=i[2];return t[0]=s*h-n*l,t[1]=n*a-r*h,t[2]=r*l-s*a,t}function Jt(t,e,i,r){let s=e[0],n=e[1],a=e[2];return t[0]=s+r*(i[0]-s),t[1]=n+r*(i[1]-n),t[2]=a+r*(i[2]-a),t}function ei(t,e,i,r,s){let n=Math.exp(-r*s),a=e[0],l=e[1],h=e[2];return t[0]=i[0]+(a-i[0])*n,t[1]=i[1]+(l-i[1])*n,t[2]=i[2]+(h-i[2])*n,t}function ti(t,e,i){let r=e[0],s=e[1],n=e[2],a=i[3]*r+i[7]*s+i[11]*n+i[15];return a=a||1,t[0]=(i[0]*r+i[4]*s+i[8]*n+i[12])/a,t[1]=(i[1]*r+i[5]*s+i[9]*n+i[13])/a,t[2]=(i[2]*r+i[6]*s+i[10]*n+i[14])/a,t}function ii(t,e,i){let r=e[0],s=e[1],n=e[2],a=i[3]*r+i[7]*s+i[11]*n+i[15];return a=a||1,t[0]=(i[0]*r+i[4]*s+i[8]*n)/a,t[1]=(i[1]*r+i[5]*s+i[9]*n)/a,t[2]=(i[2]*r+i[6]*s+i[10]*n)/a,t}function ri(t,e,i){let r=e[0],s=e[1],n=e[2];return t[0]=r*i[0]+s*i[3]+n*i[6],t[1]=r*i[1]+s*i[4]+n*i[7],t[2]=r*i[2]+s*i[5]+n*i[8],t}function si(t,e,i){let r=e[0],s=e[1],n=e[2],a=i[0],l=i[1],h=i[2],c=i[3],o=l*n-h*s,f=h*r-a*n,u=a*s-l*r,d=l*u-h*f,p=h*o-a*u,g=a*f-l*o,m=c*2;return o*=m,f*=m,u*=m,d*=2,p*=2,g*=2,t[0]=r+o+d,t[1]=s+f+p,t[2]=n+u+g,t}var ni=(function(){let t=[0,0,0],e=[0,0,0];return function(i,r){ze(t,i),ze(e,r),De(t,t),De(e,e);let s=tt(t,e);return s>1?0:s<-1?Math.PI:Math.acos(s)}})();function ai(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]}var G=class t extends Array{constructor(e=0,i=e,r=e){return super(e,i,r),this}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}set x(e){this[0]=e}set y(e){this[1]=e}set z(e){this[2]=e}set(e,i=e,r=e){return e.length?this.copy(e):(Wt(this,e,i,r),this)}copy(e){return ze(this,e),this}add(e,i){return i?Ke(this,e,i):Ke(this,this,e),this}sub(e,i){return i?Je(this,e,i):Je(this,this,e),this}multiply(e){return e.length?Yt(this,this,e):Pe(this,this,e),this}divide(e){return e.length?Qt(this,this,e):Pe(this,this,1/e),this}inverse(e=this){return Kt(this,e),this}len(){return pe(this)}distance(e){return e?jt(this,e):pe(this)}squaredLen(){return et(this)}squaredDistance(e){return e?Zt(this,e):et(this)}negate(e=this){return $t(this,e),this}cross(e,i){return i?it(this,e,i):it(this,this,e),this}scale(e){return Pe(this,this,e),this}normalize(){return De(this,this),this}dot(e){return tt(this,e)}equals(e){return ai(this,e)}applyMatrix3(e){return ri(this,this,e),this}applyMatrix4(e){return ti(this,this,e),this}scaleRotateMatrix4(e){return ii(this,this,e),this}applyQuaternion(e){return si(this,this,e),this}angle(e){return ni(this,e)}lerp(e,i){return Jt(this,this,e,i),this}smoothLerp(e,i,r){return ei(this,this,e,i,r),this}clone(){return new t(this[0],this[1],this[2])}fromArray(e,i=0){return this[0]=e[i],this[1]=e[i+1],this[2]=e[i+2],this}toArray(e=[],i=0){return e[i]=this[0],e[i+1]=this[1],e[i+2]=this[2],e}transformDirection(e){let i=this[0],r=this[1],s=this[2];return this[0]=e[0]*i+e[4]*r+e[8]*s,this[1]=e[1]*i+e[5]*r+e[9]*s,this[2]=e[2]*i+e[6]*r+e[10]*s,this.normalize()}};var hi=new G,Ar=1,br=1,oi=!1,ge=class{constructor(e,i={}){e.canvas||console.error("gl not passed as first argument to Geometry"),this.gl=e,this.attributes=i,this.id=Ar++,this.VAOs={},this.drawRange={start:0,count:0},this.instancedCount=0,this.gl.renderer.bindVertexArray(null),this.gl.renderer.currentGeometry=null,this.glState=this.gl.renderer.state;for(let r in i)this.addAttribute(r,i[r])}addAttribute(e,i){if(this.attributes[e]=i,i.id=br++,i.size=i.size||1,i.type=i.type||(i.data.constructor===Float32Array?this.gl.FLOAT:i.data.constructor===Uint16Array?this.gl.UNSIGNED_SHORT:this.gl.UNSIGNED_INT),i.target=e==="index"?this.gl.ELEMENT_ARRAY_BUFFER:this.gl.ARRAY_BUFFER,i.normalized=i.normalized||!1,i.stride=i.stride||0,i.offset=i.offset||0,i.count=i.count||(i.stride?i.data.byteLength/i.stride:i.data.length/i.size),i.divisor=i.instanced||0,i.needsUpdate=!1,i.usage=i.usage||this.gl.STATIC_DRAW,i.buffer||this.updateAttribute(i),i.divisor){if(this.isInstanced=!0,this.instancedCount&&this.instancedCount!==i.count*i.divisor)return console.warn("geometry has multiple instanced buffers of different length"),this.instancedCount=Math.min(this.instancedCount,i.count*i.divisor);this.instancedCount=i.count*i.divisor}else e==="index"?this.drawRange.count=i.count:this.attributes.index||(this.drawRange.count=Math.max(this.drawRange.count,i.count))}updateAttribute(e){let i=!e.buffer;i&&(e.buffer=this.gl.createBuffer()),this.glState.boundBuffer!==e.buffer&&(this.gl.bindBuffer(e.target,e.buffer),this.glState.boundBuffer=e.buffer),i?this.gl.bufferData(e.target,e.data,e.usage):this.gl.bufferSubData(e.target,0,e.data),e.needsUpdate=!1}setIndex(e){this.addAttribute("index",e)}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}setInstancedCount(e){this.instancedCount=e}createVAO(e){this.VAOs[e.attributeOrder]=this.gl.renderer.createVertexArray(),this.gl.renderer.bindVertexArray(this.VAOs[e.attributeOrder]),this.bindAttributes(e)}bindAttributes(e){e.attributeLocations.forEach((i,{name:r,type:s})=>{if(!this.attributes[r]){console.warn(`active attribute ${r} not being supplied`);return}let n=this.attributes[r];this.gl.bindBuffer(n.target,n.buffer),this.glState.boundBuffer=n.buffer;let a=1;s===35674&&(a=2),s===35675&&(a=3),s===35676&&(a=4);let l=n.size/a,h=a===1?0:a*a*4,c=a===1?0:a*4;for(let o=0;o<a;o++)this.gl.vertexAttribPointer(i+o,l,n.type,n.normalized,n.stride+h,n.offset+o*c),this.gl.enableVertexAttribArray(i+o),this.gl.renderer.vertexAttribDivisor(i+o,n.divisor)}),this.attributes.index&&this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.attributes.index.buffer)}draw({program:e,mode:i=this.gl.TRIANGLES}){var s;this.gl.renderer.currentGeometry!==`${this.id}_${e.attributeOrder}`&&(this.VAOs[e.attributeOrder]||this.createVAO(e),this.gl.renderer.bindVertexArray(this.VAOs[e.attributeOrder]),this.gl.renderer.currentGeometry=`${this.id}_${e.attributeOrder}`),e.attributeLocations.forEach((n,{name:a})=>{let l=this.attributes[a];l.needsUpdate&&this.updateAttribute(l)});let r=2;((s=this.attributes.index)==null?void 0:s.type)===this.gl.UNSIGNED_INT&&(r=4),this.isInstanced?this.attributes.index?this.gl.renderer.drawElementsInstanced(i,this.drawRange.count,this.attributes.index.type,this.attributes.index.offset+this.drawRange.start*r,this.instancedCount):this.gl.renderer.drawArraysInstanced(i,this.drawRange.start,this.drawRange.count,this.instancedCount):this.attributes.index?this.gl.drawElements(i,this.drawRange.count,this.attributes.index.type,this.attributes.index.offset+this.drawRange.start*r):this.gl.drawArrays(i,this.drawRange.start,this.drawRange.count)}getPosition(){let e=this.attributes.position;if(e.data)return e;if(!oi)return console.warn("No position buffer data found to compute bounds"),oi=!0}computeBoundingBox(e){e||(e=this.getPosition());let i=e.data,r=e.size;this.bounds||(this.bounds={min:new G,max:new G,center:new G,scale:new G,radius:1/0});let s=this.bounds.min,n=this.bounds.max,a=this.bounds.center,l=this.bounds.scale;s.set(1/0),n.set(-1/0);for(let h=0,c=i.length;h<c;h+=r){let o=i[h],f=i[h+1],u=i[h+2];s.x=Math.min(o,s.x),s.y=Math.min(f,s.y),s.z=Math.min(u,s.z),n.x=Math.max(o,n.x),n.y=Math.max(f,n.y),n.z=Math.max(u,n.z)}l.sub(n,s),a.add(s,n).divide(2)}computeBoundingSphere(e){e||(e=this.getPosition());let i=e.data,r=e.size;this.bounds||this.computeBoundingBox(e);let s=0;for(let n=0,a=i.length;n<a;n+=r)hi.fromArray(i,n),s=Math.max(s,this.bounds.center.squaredDistance(hi));this.bounds.radius=Math.sqrt(s)}remove(){for(let e in this.VAOs)this.gl.renderer.deleteVertexArray(this.VAOs[e]),delete this.VAOs[e];for(let e in this.attributes)this.gl.deleteBuffer(this.attributes[e].buffer),delete this.attributes[e]}};var Sr=1,ci={},ne=class{constructor(e,{vertex:i,fragment:r,uniforms:s={},transparent:n=!1,cullFace:a=e.BACK,frontFace:l=e.CCW,depthTest:h=!0,depthWrite:c=!0,depthFunc:o=e.LEQUAL}={}){e.canvas||console.error("gl not passed as first argument to Program"),this.gl=e,this.uniforms=s,this.id=Sr++,i||console.warn("vertex shader not supplied"),r||console.warn("fragment shader not supplied"),this.transparent=n,this.cullFace=a,this.frontFace=l,this.depthTest=h,this.depthWrite=c,this.depthFunc=o,this.blendFunc={},this.blendEquation={},this.stencilFunc={},this.stencilOp={},this.transparent&&!this.blendFunc.src&&(this.gl.renderer.premultipliedAlpha?this.setBlendFunc(this.gl.ONE,this.gl.ONE_MINUS_SRC_ALPHA):this.setBlendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA)),this.vertexShader=e.createShader(e.VERTEX_SHADER),this.fragmentShader=e.createShader(e.FRAGMENT_SHADER),this.program=e.createProgram(),e.attachShader(this.program,this.vertexShader),e.attachShader(this.program,this.fragmentShader),this.setShaders({vertex:i,fragment:r})}setShaders({vertex:e,fragment:i}){if(e&&(this.gl.shaderSource(this.vertexShader,e),this.gl.compileShader(this.vertexShader),this.gl.getShaderInfoLog(this.vertexShader)!==""&&console.warn(`${this.gl.getShaderInfoLog(this.vertexShader)}
Vertex Shader
${fi(e)}`)),i&&(this.gl.shaderSource(this.fragmentShader,i),this.gl.compileShader(this.fragmentShader),this.gl.getShaderInfoLog(this.fragmentShader)!==""&&console.warn(`${this.gl.getShaderInfoLog(this.fragmentShader)}
Fragment Shader
${fi(i)}`)),this.gl.linkProgram(this.program),!this.gl.getProgramParameter(this.program,this.gl.LINK_STATUS))return console.warn(this.gl.getProgramInfoLog(this.program));this.uniformLocations=new Map;let r=this.gl.getProgramParameter(this.program,this.gl.ACTIVE_UNIFORMS);for(let a=0;a<r;a++){let l=this.gl.getActiveUniform(this.program,a);this.uniformLocations.set(l,this.gl.getUniformLocation(this.program,l.name));let h=l.name.match(/(\w+)/g);l.uniformName=h[0],l.nameComponents=h.slice(1)}this.attributeLocations=new Map;let s=[],n=this.gl.getProgramParameter(this.program,this.gl.ACTIVE_ATTRIBUTES);for(let a=0;a<n;a++){let l=this.gl.getActiveAttrib(this.program,a),h=this.gl.getAttribLocation(this.program,l.name);h!==-1&&(s[h]=l.name,this.attributeLocations.set(l,h))}this.attributeOrder=s.join("")}setBlendFunc(e,i,r,s){this.blendFunc.src=e,this.blendFunc.dst=i,this.blendFunc.srcAlpha=r,this.blendFunc.dstAlpha=s,e&&(this.transparent=!0)}setBlendEquation(e,i){this.blendEquation.modeRGB=e,this.blendEquation.modeAlpha=i}setStencilFunc(e,i,r){this.stencilRef=i,this.stencilFunc.func=e,this.stencilFunc.ref=i,this.stencilFunc.mask=r}setStencilOp(e,i,r){this.stencilOp.stencilFail=e,this.stencilOp.depthFail=i,this.stencilOp.depthPass=r}applyState(){this.depthTest?this.gl.renderer.enable(this.gl.DEPTH_TEST):this.gl.renderer.disable(this.gl.DEPTH_TEST),this.cullFace?this.gl.renderer.enable(this.gl.CULL_FACE):this.gl.renderer.disable(this.gl.CULL_FACE),this.blendFunc.src?this.gl.renderer.enable(this.gl.BLEND):this.gl.renderer.disable(this.gl.BLEND),this.cullFace&&this.gl.renderer.setCullFace(this.cullFace),this.gl.renderer.setFrontFace(this.frontFace),this.gl.renderer.setDepthMask(this.depthWrite),this.gl.renderer.setDepthFunc(this.depthFunc),this.blendFunc.src&&this.gl.renderer.setBlendFunc(this.blendFunc.src,this.blendFunc.dst,this.blendFunc.srcAlpha,this.blendFunc.dstAlpha),this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB,this.blendEquation.modeAlpha),this.stencilFunc.func||this.stencilOp.stencilFail?this.gl.renderer.enable(this.gl.STENCIL_TEST):this.gl.renderer.disable(this.gl.STENCIL_TEST),this.gl.renderer.setStencilFunc(this.stencilFunc.func,this.stencilFunc.ref,this.stencilFunc.mask),this.gl.renderer.setStencilOp(this.stencilOp.stencilFail,this.stencilOp.depthFail,this.stencilOp.depthPass)}use({flipFaces:e=!1}={}){let i=-1;this.gl.renderer.state.currentProgram===this.id||(this.gl.useProgram(this.program),this.gl.renderer.state.currentProgram=this.id),this.uniformLocations.forEach((s,n)=>{let a=this.uniforms[n.uniformName];for(let l of n.nameComponents){if(!a)break;if(l in a)a=a[l];else{if(Array.isArray(a.value))break;a=void 0;break}}if(!a)return ui(`Active uniform ${n.name} has not been supplied`);if(a&&a.value===void 0)return ui(`${n.name} uniform is missing a value parameter`);if(a.value.texture)return i=i+1,a.value.update(i),rt(this.gl,n.type,s,i);if(a.value.length&&a.value[0].texture){let l=[];return a.value.forEach(h=>{i=i+1,h.update(i),l.push(i)}),rt(this.gl,n.type,s,l)}rt(this.gl,n.type,s,a.value)}),this.applyState(),e&&this.gl.renderer.setFrontFace(this.frontFace===this.gl.CCW?this.gl.CW:this.gl.CCW)}remove(){this.gl.deleteProgram(this.program)}};function rt(t,e,i,r){r=r.length?Cr(r):r;let s=t.renderer.state.uniformLocations.get(i);if(r.length)if(s===void 0||s.length!==r.length)t.renderer.state.uniformLocations.set(i,r.slice(0));else{if(zr(s,r))return;s.set?s.set(r):Dr(s,r),t.renderer.state.uniformLocations.set(i,s)}else{if(s===r)return;t.renderer.state.uniformLocations.set(i,r)}switch(e){case 5126:return r.length?t.uniform1fv(i,r):t.uniform1f(i,r);case 35664:return t.uniform2fv(i,r);case 35665:return t.uniform3fv(i,r);case 35666:return t.uniform4fv(i,r);case 35670:case 5124:case 35678:case 36306:case 35680:case 36289:return r.length?t.uniform1iv(i,r):t.uniform1i(i,r);case 35671:case 35667:return t.uniform2iv(i,r);case 35672:case 35668:return t.uniform3iv(i,r);case 35673:case 35669:return t.uniform4iv(i,r);case 35674:return t.uniformMatrix2fv(i,!1,r);case 35675:return t.uniformMatrix3fv(i,!1,r);case 35676:return t.uniformMatrix4fv(i,!1,r)}}function fi(t){let e=t.split(`
`);for(let i=0;i<e.length;i++)e[i]=i+1+": "+e[i];return e.join(`
`)}function Cr(t){let e=t.length,i=t[0].length;if(i===void 0)return t;let r=e*i,s=ci[r];s||(ci[r]=s=new Float32Array(r));for(let n=0;n<e;n++)s.set(t[n],n*i);return s}function zr(t,e){if(t.length!==e.length)return!1;for(let i=0,r=t.length;i<r;i++)if(t[i]!==e[i])return!1;return!0}function Dr(t,e){for(let i=0,r=t.length;i<r;i++)t[i]=e[i]}var st=0;function ui(t){st>100||(console.warn(t),st++,st>100&&console.warn("More than 100 program warnings - stopping logs."))}var nt=new G,Pr=1,Fe=class{constructor({canvas:e=document.createElement("canvas"),width:i=300,height:r=150,dpr:s=1,alpha:n=!1,depth:a=!0,stencil:l=!1,antialias:h=!1,premultipliedAlpha:c=!1,preserveDrawingBuffer:o=!1,powerPreference:f="default",autoClear:u=!0,webgl:d=2}={}){let p={alpha:n,depth:a,stencil:l,antialias:h,premultipliedAlpha:c,preserveDrawingBuffer:o,powerPreference:f};this.dpr=s,this.alpha=n,this.color=!0,this.depth=a,this.stencil=l,this.premultipliedAlpha=c,this.autoClear=u,this.id=Pr++,d===2&&(this.gl=e.getContext("webgl2",p)),this.isWebgl2=!!this.gl,this.gl||(this.gl=e.getContext("webgl",p)),this.gl||console.error("unable to create webgl context"),this.gl.renderer=this,this.setSize(i,r),this.state={},this.state.blendFunc={src:this.gl.ONE,dst:this.gl.ZERO},this.state.blendEquation={modeRGB:this.gl.FUNC_ADD},this.state.cullFace=!1,this.state.frontFace=this.gl.CCW,this.state.depthMask=!0,this.state.depthFunc=this.gl.LEQUAL,this.state.premultiplyAlpha=!1,this.state.flipY=!1,this.state.unpackAlignment=4,this.state.framebuffer=null,this.state.viewport={x:0,y:0,width:null,height:null},this.state.textureUnits=[],this.state.activeTextureUnit=0,this.state.boundBuffer=null,this.state.uniformLocations=new Map,this.state.currentProgram=null,this.extensions={},this.isWebgl2?(this.getExtension("EXT_color_buffer_float"),this.getExtension("OES_texture_float_linear")):(this.getExtension("OES_texture_float"),this.getExtension("OES_texture_float_linear"),this.getExtension("OES_texture_half_float"),this.getExtension("OES_texture_half_float_linear"),this.getExtension("OES_element_index_uint"),this.getExtension("OES_standard_derivatives"),this.getExtension("EXT_sRGB"),this.getExtension("WEBGL_depth_texture"),this.getExtension("WEBGL_draw_buffers")),this.getExtension("WEBGL_compressed_texture_astc"),this.getExtension("EXT_texture_compression_bptc"),this.getExtension("WEBGL_compressed_texture_s3tc"),this.getExtension("WEBGL_compressed_texture_etc1"),this.getExtension("WEBGL_compressed_texture_pvrtc"),this.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),this.vertexAttribDivisor=this.getExtension("ANGLE_instanced_arrays","vertexAttribDivisor","vertexAttribDivisorANGLE"),this.drawArraysInstanced=this.getExtension("ANGLE_instanced_arrays","drawArraysInstanced","drawArraysInstancedANGLE"),this.drawElementsInstanced=this.getExtension("ANGLE_instanced_arrays","drawElementsInstanced","drawElementsInstancedANGLE"),this.createVertexArray=this.getExtension("OES_vertex_array_object","createVertexArray","createVertexArrayOES"),this.bindVertexArray=this.getExtension("OES_vertex_array_object","bindVertexArray","bindVertexArrayOES"),this.deleteVertexArray=this.getExtension("OES_vertex_array_object","deleteVertexArray","deleteVertexArrayOES"),this.drawBuffers=this.getExtension("WEBGL_draw_buffers","drawBuffers","drawBuffersWEBGL"),this.parameters={},this.parameters.maxTextureUnits=this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),this.parameters.maxAnisotropy=this.getExtension("EXT_texture_filter_anisotropic")?this.gl.getParameter(this.getExtension("EXT_texture_filter_anisotropic").MAX_TEXTURE_MAX_ANISOTROPY_EXT):0}setSize(e,i){this.width=e,this.height=i,this.gl.canvas.width=e*this.dpr,this.gl.canvas.height=i*this.dpr,this.gl.canvas.style&&Object.assign(this.gl.canvas.style,{width:e+"px",height:i+"px"})}setViewport(e,i,r=0,s=0){this.state.viewport.width===e&&this.state.viewport.height===i||(this.state.viewport.width=e,this.state.viewport.height=i,this.state.viewport.x=r,this.state.viewport.y=s,this.gl.viewport(r,s,e,i))}setScissor(e,i,r=0,s=0){this.gl.scissor(r,s,e,i)}enable(e){this.state[e]!==!0&&(this.gl.enable(e),this.state[e]=!0)}disable(e){this.state[e]!==!1&&(this.gl.disable(e),this.state[e]=!1)}setBlendFunc(e,i,r,s){this.state.blendFunc.src===e&&this.state.blendFunc.dst===i&&this.state.blendFunc.srcAlpha===r&&this.state.blendFunc.dstAlpha===s||(this.state.blendFunc.src=e,this.state.blendFunc.dst=i,this.state.blendFunc.srcAlpha=r,this.state.blendFunc.dstAlpha=s,r!==void 0?this.gl.blendFuncSeparate(e,i,r,s):this.gl.blendFunc(e,i))}setBlendEquation(e,i){e=e||this.gl.FUNC_ADD,!(this.state.blendEquation.modeRGB===e&&this.state.blendEquation.modeAlpha===i)&&(this.state.blendEquation.modeRGB=e,this.state.blendEquation.modeAlpha=i,i!==void 0?this.gl.blendEquationSeparate(e,i):this.gl.blendEquation(e))}setCullFace(e){this.state.cullFace!==e&&(this.state.cullFace=e,this.gl.cullFace(e))}setFrontFace(e){this.state.frontFace!==e&&(this.state.frontFace=e,this.gl.frontFace(e))}setDepthMask(e){this.state.depthMask!==e&&(this.state.depthMask=e,this.gl.depthMask(e))}setDepthFunc(e){this.state.depthFunc!==e&&(this.state.depthFunc=e,this.gl.depthFunc(e))}setStencilMask(e){this.state.stencilMask!==e&&(this.state.stencilMask=e,this.gl.stencilMask(e))}setStencilFunc(e,i,r){this.state.stencilFunc===e&&this.state.stencilRef===i&&this.state.stencilFuncMask===r||(this.state.stencilFunc=e||this.gl.ALWAYS,this.state.stencilRef=i||0,this.state.stencilFuncMask=r||0,this.gl.stencilFunc(e||this.gl.ALWAYS,i||0,r||0))}setStencilOp(e,i,r){this.state.stencilFail===e&&this.state.stencilDepthFail===i&&this.state.stencilDepthPass===r||(this.state.stencilFail=e,this.state.stencilDepthFail=i,this.state.stencilDepthPass=r,this.gl.stencilOp(e,i,r))}activeTexture(e){this.state.activeTextureUnit!==e&&(this.state.activeTextureUnit=e,this.gl.activeTexture(this.gl.TEXTURE0+e))}bindFramebuffer({target:e=this.gl.FRAMEBUFFER,buffer:i=null}={}){this.state.framebuffer!==i&&(this.state.framebuffer=i,this.gl.bindFramebuffer(e,i))}getExtension(e,i,r){return i&&this.gl[i]?this.gl[i].bind(this.gl):(this.extensions[e]||(this.extensions[e]=this.gl.getExtension(e)),i?this.extensions[e]?this.extensions[e][r].bind(this.extensions[e]):null:this.extensions[e])}sortOpaque(e,i){return e.renderOrder!==i.renderOrder?e.renderOrder-i.renderOrder:e.program.id!==i.program.id?e.program.id-i.program.id:e.zDepth!==i.zDepth?e.zDepth-i.zDepth:i.id-e.id}sortTransparent(e,i){return e.renderOrder!==i.renderOrder?e.renderOrder-i.renderOrder:e.zDepth!==i.zDepth?i.zDepth-e.zDepth:i.id-e.id}sortUI(e,i){return e.renderOrder!==i.renderOrder?e.renderOrder-i.renderOrder:e.program.id!==i.program.id?e.program.id-i.program.id:i.id-e.id}getRenderList({scene:e,camera:i,frustumCull:r,sort:s}){let n=[];if(i&&r&&i.updateFrustum(),e.traverse(a=>{if(!a.visible)return!0;a.draw&&(r&&a.frustumCulled&&i&&!i.frustumIntersectsMesh(a)||n.push(a))}),s){let a=[],l=[],h=[];n.forEach(c=>{c.program.transparent?c.program.depthTest?l.push(c):h.push(c):a.push(c),c.zDepth=0,!(c.renderOrder!==0||!c.program.depthTest||!i)&&(c.worldMatrix.getTranslation(nt),nt.applyMatrix4(i.projectionViewMatrix),c.zDepth=nt.z)}),a.sort(this.sortOpaque),l.sort(this.sortTransparent),h.sort(this.sortUI),n=a.concat(l,h)}return n}render({scene:e,camera:i,target:r=null,update:s=!0,sort:n=!0,frustumCull:a=!0,clear:l}){r===null?(this.bindFramebuffer(),this.setViewport(this.width*this.dpr,this.height*this.dpr)):(this.bindFramebuffer(r),this.setViewport(r.width,r.height)),(l||this.autoClear&&l!==!1)&&(this.depth&&(!r||r.depth)&&(this.enable(this.gl.DEPTH_TEST),this.setDepthMask(!0)),(this.stencil||!r||r.stencil)&&(this.enable(this.gl.STENCIL_TEST),this.setStencilMask(255)),this.gl.clear((this.color?this.gl.COLOR_BUFFER_BIT:0)|(this.depth?this.gl.DEPTH_BUFFER_BIT:0)|(this.stencil?this.gl.STENCIL_BUFFER_BIT:0))),s&&e.updateMatrixWorld(),i&&i.updateMatrixWorld(),this.getRenderList({scene:e,camera:i,frustumCull:a,sort:n}).forEach(c=>{c.draw({camera:i})})}};function di(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t}function pi(t,e,i,r,s){return t[0]=e,t[1]=i,t[2]=r,t[3]=s,t}function gi(t,e){let i=e[0],r=e[1],s=e[2],n=e[3],a=i*i+r*r+s*s+n*n;return a>0&&(a=1/Math.sqrt(a)),t[0]=i*a,t[1]=r*a,t[2]=s*a,t[3]=n*a,t}function mi(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]+t[3]*e[3]}function xi(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t}function vi(t,e,i){i=i*.5;let r=Math.sin(i);return t[0]=r*e[0],t[1]=r*e[1],t[2]=r*e[2],t[3]=Math.cos(i),t}function at(t,e,i){let r=e[0],s=e[1],n=e[2],a=e[3],l=i[0],h=i[1],c=i[2],o=i[3];return t[0]=r*o+a*l+s*c-n*h,t[1]=s*o+a*h+n*l-r*c,t[2]=n*o+a*c+r*h-s*l,t[3]=a*o-r*l-s*h-n*c,t}function Ei(t,e,i){i*=.5;let r=e[0],s=e[1],n=e[2],a=e[3],l=Math.sin(i),h=Math.cos(i);return t[0]=r*h+a*l,t[1]=s*h+n*l,t[2]=n*h-s*l,t[3]=a*h-r*l,t}function yi(t,e,i){i*=.5;let r=e[0],s=e[1],n=e[2],a=e[3],l=Math.sin(i),h=Math.cos(i);return t[0]=r*h-n*l,t[1]=s*h+a*l,t[2]=n*h+r*l,t[3]=a*h-s*l,t}function wi(t,e,i){i*=.5;let r=e[0],s=e[1],n=e[2],a=e[3],l=Math.sin(i),h=Math.cos(i);return t[0]=r*h+s*l,t[1]=s*h-r*l,t[2]=n*h+a*l,t[3]=a*h-n*l,t}function Mi(t,e,i,r){let s=e[0],n=e[1],a=e[2],l=e[3],h=i[0],c=i[1],o=i[2],f=i[3],u,d,p,g,m;return d=s*h+n*c+a*o+l*f,d<0&&(d=-d,h=-h,c=-c,o=-o,f=-f),1-d>1e-6?(u=Math.acos(d),p=Math.sin(u),g=Math.sin((1-r)*u)/p,m=Math.sin(r*u)/p):(g=1-r,m=r),t[0]=g*s+m*h,t[1]=g*n+m*c,t[2]=g*a+m*o,t[3]=g*l+m*f,t}function Fi(t,e){let i=e[0],r=e[1],s=e[2],n=e[3],a=i*i+r*r+s*s+n*n,l=a?1/a:0;return t[0]=-i*l,t[1]=-r*l,t[2]=-s*l,t[3]=n*l,t}function Ti(t,e){return t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t[3]=e[3],t}function _i(t,e){let i=e[0]+e[4]+e[8],r;if(i>0)r=Math.sqrt(i+1),t[3]=.5*r,r=.5/r,t[0]=(e[5]-e[7])*r,t[1]=(e[6]-e[2])*r,t[2]=(e[1]-e[3])*r;else{let s=0;e[4]>e[0]&&(s=1),e[8]>e[s*3+s]&&(s=2);let n=(s+1)%3,a=(s+2)%3;r=Math.sqrt(e[s*3+s]-e[n*3+n]-e[a*3+a]+1),t[s]=.5*r,r=.5/r,t[3]=(e[n*3+a]-e[a*3+n])*r,t[n]=(e[n*3+s]+e[s*3+n])*r,t[a]=(e[a*3+s]+e[s*3+a])*r}return t}function Ri(t,e,i="YXZ"){let r=Math.sin(e[0]*.5),s=Math.cos(e[0]*.5),n=Math.sin(e[1]*.5),a=Math.cos(e[1]*.5),l=Math.sin(e[2]*.5),h=Math.cos(e[2]*.5);return i==="XYZ"?(t[0]=r*a*h+s*n*l,t[1]=s*n*h-r*a*l,t[2]=s*a*l+r*n*h,t[3]=s*a*h-r*n*l):i==="YXZ"?(t[0]=r*a*h+s*n*l,t[1]=s*n*h-r*a*l,t[2]=s*a*l-r*n*h,t[3]=s*a*h+r*n*l):i==="ZXY"?(t[0]=r*a*h-s*n*l,t[1]=s*n*h+r*a*l,t[2]=s*a*l+r*n*h,t[3]=s*a*h-r*n*l):i==="ZYX"?(t[0]=r*a*h-s*n*l,t[1]=s*n*h+r*a*l,t[2]=s*a*l-r*n*h,t[3]=s*a*h+r*n*l):i==="YZX"?(t[0]=r*a*h+s*n*l,t[1]=s*n*h+r*a*l,t[2]=s*a*l-r*n*h,t[3]=s*a*h-r*n*l):i==="XZY"&&(t[0]=r*a*h-s*n*l,t[1]=s*n*h-r*a*l,t[2]=s*a*l+r*n*h,t[3]=s*a*h+r*n*l),t}var Ai=di,bi=pi;var Si=mi;var Ci=gi;var Le=class extends Array{constructor(e=0,i=0,r=0,s=1){super(e,i,r,s),this.onChange=()=>{},this._target=this;let n=["0","1","2","3"];return new Proxy(this,{set(a,l){let h=Reflect.set(...arguments);return h&&n.includes(l)&&a.onChange(),h}})}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}get w(){return this[3]}set x(e){this._target[0]=e,this.onChange()}set y(e){this._target[1]=e,this.onChange()}set z(e){this._target[2]=e,this.onChange()}set w(e){this._target[3]=e,this.onChange()}identity(){return xi(this._target),this.onChange(),this}set(e,i,r,s){return e.length?this.copy(e):(bi(this._target,e,i,r,s),this.onChange(),this)}rotateX(e){return Ei(this._target,this._target,e),this.onChange(),this}rotateY(e){return yi(this._target,this._target,e),this.onChange(),this}rotateZ(e){return wi(this._target,this._target,e),this.onChange(),this}inverse(e=this._target){return Fi(this._target,e),this.onChange(),this}conjugate(e=this._target){return Ti(this._target,e),this.onChange(),this}copy(e){return Ai(this._target,e),this.onChange(),this}normalize(e=this._target){return Ci(this._target,e),this.onChange(),this}multiply(e,i){return i?at(this._target,e,i):at(this._target,this._target,e),this.onChange(),this}dot(e){return Si(this._target,e)}fromMatrix3(e){return _i(this._target,e),this.onChange(),this}fromEuler(e,i){return Ri(this._target,e,e.order),i||this.onChange(),this}fromAxisAngle(e,i){return vi(this._target,e,i),this.onChange(),this}slerp(e,i){return Mi(this._target,this._target,e,i),this.onChange(),this}fromArray(e,i=0){return this._target[0]=e[i],this._target[1]=e[i+1],this._target[2]=e[i+2],this._target[3]=e[i+3],this.onChange(),this}toArray(e=[],i=0){return e[i]=this[0],e[i+1]=this[1],e[i+2]=this[2],e[i+3]=this[3],e}};var Ir=1e-6;function zi(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t}function Di(t,e,i,r,s,n,a,l,h,c,o,f,u,d,p,g,m){return t[0]=e,t[1]=i,t[2]=r,t[3]=s,t[4]=n,t[5]=a,t[6]=l,t[7]=h,t[8]=c,t[9]=o,t[10]=f,t[11]=u,t[12]=d,t[13]=p,t[14]=g,t[15]=m,t}function Pi(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function Li(t,e){let i=e[0],r=e[1],s=e[2],n=e[3],a=e[4],l=e[5],h=e[6],c=e[7],o=e[8],f=e[9],u=e[10],d=e[11],p=e[12],g=e[13],m=e[14],v=e[15],_=i*l-r*a,y=i*h-s*a,x=i*c-n*a,M=r*h-s*l,w=r*c-n*l,R=s*c-n*h,P=o*g-f*p,L=o*m-u*p,z=o*v-d*p,I=f*m-u*g,b=f*v-d*g,B=u*v-d*m,F=_*B-y*b+x*I+M*z-w*L+R*P;return F?(F=1/F,t[0]=(l*B-h*b+c*I)*F,t[1]=(s*b-r*B-n*I)*F,t[2]=(g*R-m*w+v*M)*F,t[3]=(u*w-f*R-d*M)*F,t[4]=(h*z-a*B-c*L)*F,t[5]=(i*B-s*z+n*L)*F,t[6]=(m*x-p*R-v*y)*F,t[7]=(o*R-u*x+d*y)*F,t[8]=(a*b-l*z+c*P)*F,t[9]=(r*z-i*b-n*P)*F,t[10]=(p*w-g*x+v*_)*F,t[11]=(f*x-o*w-d*_)*F,t[12]=(l*L-a*I-h*P)*F,t[13]=(i*I-r*L+s*P)*F,t[14]=(g*y-p*M-m*_)*F,t[15]=(o*M-f*y+u*_)*F,t):null}function lt(t){let e=t[0],i=t[1],r=t[2],s=t[3],n=t[4],a=t[5],l=t[6],h=t[7],c=t[8],o=t[9],f=t[10],u=t[11],d=t[12],p=t[13],g=t[14],m=t[15],v=e*a-i*n,_=e*l-r*n,y=e*h-s*n,x=i*l-r*a,M=i*h-s*a,w=r*h-s*l,R=c*p-o*d,P=c*g-f*d,L=c*m-u*d,z=o*g-f*p,I=o*m-u*p,b=f*m-u*g;return v*b-_*I+y*z+x*L-M*P+w*R}function ht(t,e,i){let r=e[0],s=e[1],n=e[2],a=e[3],l=e[4],h=e[5],c=e[6],o=e[7],f=e[8],u=e[9],d=e[10],p=e[11],g=e[12],m=e[13],v=e[14],_=e[15],y=i[0],x=i[1],M=i[2],w=i[3];return t[0]=y*r+x*l+M*f+w*g,t[1]=y*s+x*h+M*u+w*m,t[2]=y*n+x*c+M*d+w*v,t[3]=y*a+x*o+M*p+w*_,y=i[4],x=i[5],M=i[6],w=i[7],t[4]=y*r+x*l+M*f+w*g,t[5]=y*s+x*h+M*u+w*m,t[6]=y*n+x*c+M*d+w*v,t[7]=y*a+x*o+M*p+w*_,y=i[8],x=i[9],M=i[10],w=i[11],t[8]=y*r+x*l+M*f+w*g,t[9]=y*s+x*h+M*u+w*m,t[10]=y*n+x*c+M*d+w*v,t[11]=y*a+x*o+M*p+w*_,y=i[12],x=i[13],M=i[14],w=i[15],t[12]=y*r+x*l+M*f+w*g,t[13]=y*s+x*h+M*u+w*m,t[14]=y*n+x*c+M*d+w*v,t[15]=y*a+x*o+M*p+w*_,t}function Ni(t,e,i){let r=i[0],s=i[1],n=i[2],a,l,h,c,o,f,u,d,p,g,m,v;return e===t?(t[12]=e[0]*r+e[4]*s+e[8]*n+e[12],t[13]=e[1]*r+e[5]*s+e[9]*n+e[13],t[14]=e[2]*r+e[6]*s+e[10]*n+e[14],t[15]=e[3]*r+e[7]*s+e[11]*n+e[15]):(a=e[0],l=e[1],h=e[2],c=e[3],o=e[4],f=e[5],u=e[6],d=e[7],p=e[8],g=e[9],m=e[10],v=e[11],t[0]=a,t[1]=l,t[2]=h,t[3]=c,t[4]=o,t[5]=f,t[6]=u,t[7]=d,t[8]=p,t[9]=g,t[10]=m,t[11]=v,t[12]=a*r+o*s+p*n+e[12],t[13]=l*r+f*s+g*n+e[13],t[14]=h*r+u*s+m*n+e[14],t[15]=c*r+d*s+v*n+e[15]),t}function Ii(t,e,i){let r=i[0],s=i[1],n=i[2];return t[0]=e[0]*r,t[1]=e[1]*r,t[2]=e[2]*r,t[3]=e[3]*r,t[4]=e[4]*s,t[5]=e[5]*s,t[6]=e[6]*s,t[7]=e[7]*s,t[8]=e[8]*n,t[9]=e[9]*n,t[10]=e[10]*n,t[11]=e[11]*n,t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t}function Bi(t,e,i,r){let s=r[0],n=r[1],a=r[2],l=Math.hypot(s,n,a),h,c,o,f,u,d,p,g,m,v,_,y,x,M,w,R,P,L,z,I,b,B,F,se;return Math.abs(l)<Ir?null:(l=1/l,s*=l,n*=l,a*=l,h=Math.sin(i),c=Math.cos(i),o=1-c,f=e[0],u=e[1],d=e[2],p=e[3],g=e[4],m=e[5],v=e[6],_=e[7],y=e[8],x=e[9],M=e[10],w=e[11],R=s*s*o+c,P=n*s*o+a*h,L=a*s*o-n*h,z=s*n*o-a*h,I=n*n*o+c,b=a*n*o+s*h,B=s*a*o+n*h,F=n*a*o-s*h,se=a*a*o+c,t[0]=f*R+g*P+y*L,t[1]=u*R+m*P+x*L,t[2]=d*R+v*P+M*L,t[3]=p*R+_*P+w*L,t[4]=f*z+g*I+y*b,t[5]=u*z+m*I+x*b,t[6]=d*z+v*I+M*b,t[7]=p*z+_*I+w*b,t[8]=f*B+g*F+y*se,t[9]=u*B+m*F+x*se,t[10]=d*B+v*F+M*se,t[11]=p*B+_*F+w*se,e!==t&&(t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t)}function ki(t,e){return t[0]=e[12],t[1]=e[13],t[2]=e[14],t}function ot(t,e){let i=e[0],r=e[1],s=e[2],n=e[4],a=e[5],l=e[6],h=e[8],c=e[9],o=e[10];return t[0]=Math.hypot(i,r,s),t[1]=Math.hypot(n,a,l),t[2]=Math.hypot(h,c,o),t}function Oi(t){let e=t[0],i=t[1],r=t[2],s=t[4],n=t[5],a=t[6],l=t[8],h=t[9],c=t[10],o=e*e+i*i+r*r,f=s*s+n*n+a*a,u=l*l+h*h+c*c;return Math.sqrt(Math.max(o,f,u))}var ct=(function(){let t=[1,1,1];return function(e,i){let r=t;ot(r,i);let s=1/r[0],n=1/r[1],a=1/r[2],l=i[0]*s,h=i[1]*n,c=i[2]*a,o=i[4]*s,f=i[5]*n,u=i[6]*a,d=i[8]*s,p=i[9]*n,g=i[10]*a,m=l+f+g,v=0;return m>0?(v=Math.sqrt(m+1)*2,e[3]=.25*v,e[0]=(u-p)/v,e[1]=(d-c)/v,e[2]=(h-o)/v):l>f&&l>g?(v=Math.sqrt(1+l-f-g)*2,e[3]=(u-p)/v,e[0]=.25*v,e[1]=(h+o)/v,e[2]=(d+c)/v):f>g?(v=Math.sqrt(1+f-l-g)*2,e[3]=(d-c)/v,e[0]=(h+o)/v,e[1]=.25*v,e[2]=(u+p)/v):(v=Math.sqrt(1+g-l-f)*2,e[3]=(h-o)/v,e[0]=(d+c)/v,e[1]=(u+p)/v,e[2]=.25*v),e}})();function Ui(t,e,i,r){let s=pe([t[0],t[1],t[2]]),n=pe([t[4],t[5],t[6]]),a=pe([t[8],t[9],t[10]]);lt(t)<0&&(s=-s),i[0]=t[12],i[1]=t[13],i[2]=t[14];let h=t.slice(),c=1/s,o=1/n,f=1/a;h[0]*=c,h[1]*=c,h[2]*=c,h[4]*=o,h[5]*=o,h[6]*=o,h[8]*=f,h[9]*=f,h[10]*=f,ct(e,h),r[0]=s,r[1]=n,r[2]=a}function Vi(t,e,i,r){let s=t,n=e[0],a=e[1],l=e[2],h=e[3],c=n+n,o=a+a,f=l+l,u=n*c,d=n*o,p=n*f,g=a*o,m=a*f,v=l*f,_=h*c,y=h*o,x=h*f,M=r[0],w=r[1],R=r[2];return s[0]=(1-(g+v))*M,s[1]=(d+x)*M,s[2]=(p-y)*M,s[3]=0,s[4]=(d-x)*w,s[5]=(1-(u+v))*w,s[6]=(m+_)*w,s[7]=0,s[8]=(p+y)*R,s[9]=(m-_)*R,s[10]=(1-(u+g))*R,s[11]=0,s[12]=i[0],s[13]=i[1],s[14]=i[2],s[15]=1,s}function Gi(t,e){let i=e[0],r=e[1],s=e[2],n=e[3],a=i+i,l=r+r,h=s+s,c=i*a,o=r*a,f=r*l,u=s*a,d=s*l,p=s*h,g=n*a,m=n*l,v=n*h;return t[0]=1-f-p,t[1]=o+v,t[2]=u-m,t[3]=0,t[4]=o-v,t[5]=1-c-p,t[6]=d+g,t[7]=0,t[8]=u+m,t[9]=d-g,t[10]=1-c-f,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function Hi(t,e,i,r,s){let n=1/Math.tan(e/2),a=1/(r-s);return t[0]=n/i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=n,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=(s+r)*a,t[11]=-1,t[12]=0,t[13]=0,t[14]=2*s*r*a,t[15]=0,t}function qi(t,e,i,r,s,n,a){let l=1/(e-i),h=1/(r-s),c=1/(n-a);return t[0]=-2*l,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*h,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*c,t[11]=0,t[12]=(e+i)*l,t[13]=(s+r)*h,t[14]=(a+n)*c,t[15]=1,t}function Xi(t,e,i,r){let s=e[0],n=e[1],a=e[2],l=r[0],h=r[1],c=r[2],o=s-i[0],f=n-i[1],u=a-i[2],d=o*o+f*f+u*u;d===0?u=1:(d=1/Math.sqrt(d),o*=d,f*=d,u*=d);let p=h*u-c*f,g=c*o-l*u,m=l*f-h*o;return d=p*p+g*g+m*m,d===0&&(c?l+=1e-6:h?c+=1e-6:h+=1e-6,p=h*u-c*f,g=c*o-l*u,m=l*f-h*o,d=p*p+g*g+m*m),d=1/Math.sqrt(d),p*=d,g*=d,m*=d,t[0]=p,t[1]=g,t[2]=m,t[3]=0,t[4]=f*m-u*g,t[5]=u*p-o*m,t[6]=o*g-f*p,t[7]=0,t[8]=o,t[9]=f,t[10]=u,t[11]=0,t[12]=s,t[13]=n,t[14]=a,t[15]=1,t}function ft(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t[2]=e[2]+i[2],t[3]=e[3]+i[3],t[4]=e[4]+i[4],t[5]=e[5]+i[5],t[6]=e[6]+i[6],t[7]=e[7]+i[7],t[8]=e[8]+i[8],t[9]=e[9]+i[9],t[10]=e[10]+i[10],t[11]=e[11]+i[11],t[12]=e[12]+i[12],t[13]=e[13]+i[13],t[14]=e[14]+i[14],t[15]=e[15]+i[15],t}function ut(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t[2]=e[2]-i[2],t[3]=e[3]-i[3],t[4]=e[4]-i[4],t[5]=e[5]-i[5],t[6]=e[6]-i[6],t[7]=e[7]-i[7],t[8]=e[8]-i[8],t[9]=e[9]-i[9],t[10]=e[10]-i[10],t[11]=e[11]-i[11],t[12]=e[12]-i[12],t[13]=e[13]-i[13],t[14]=e[14]-i[14],t[15]=e[15]-i[15],t}function Wi(t,e,i){return t[0]=e[0]*i,t[1]=e[1]*i,t[2]=e[2]*i,t[3]=e[3]*i,t[4]=e[4]*i,t[5]=e[5]*i,t[6]=e[6]*i,t[7]=e[7]*i,t[8]=e[8]*i,t[9]=e[9]*i,t[10]=e[10]*i,t[11]=e[11]*i,t[12]=e[12]*i,t[13]=e[13]*i,t[14]=e[14]*i,t[15]=e[15]*i,t}var te=class extends Array{constructor(e=1,i=0,r=0,s=0,n=0,a=1,l=0,h=0,c=0,o=0,f=1,u=0,d=0,p=0,g=0,m=1){return super(e,i,r,s,n,a,l,h,c,o,f,u,d,p,g,m),this}get x(){return this[12]}get y(){return this[13]}get z(){return this[14]}get w(){return this[15]}set x(e){this[12]=e}set y(e){this[13]=e}set z(e){this[14]=e}set w(e){this[15]=e}set(e,i,r,s,n,a,l,h,c,o,f,u,d,p,g,m){return e.length?this.copy(e):(Di(this,e,i,r,s,n,a,l,h,c,o,f,u,d,p,g,m),this)}translate(e,i=this){return Ni(this,i,e),this}rotate(e,i,r=this){return Bi(this,r,e,i),this}scale(e,i=this){return Ii(this,i,typeof e=="number"?[e,e,e]:e),this}add(e,i){return i?ft(this,e,i):ft(this,this,e),this}sub(e,i){return i?ut(this,e,i):ut(this,this,e),this}multiply(e,i){return e.length?i?ht(this,e,i):ht(this,this,e):Wi(this,this,e),this}identity(){return Pi(this),this}copy(e){return zi(this,e),this}fromPerspective({fov:e,aspect:i,near:r,far:s}={}){return Hi(this,e,i,r,s),this}fromOrthogonal({left:e,right:i,bottom:r,top:s,near:n,far:a}){return qi(this,e,i,r,s,n,a),this}fromQuaternion(e){return Gi(this,e),this}setPosition(e){return this.x=e[0],this.y=e[1],this.z=e[2],this}inverse(e=this){return Li(this,e),this}compose(e,i,r){return Vi(this,e,i,r),this}decompose(e,i,r){return Ui(this,e,i,r),this}getRotation(e){return ct(e,this),this}getTranslation(e){return ki(e,this),this}getScaling(e){return ot(e,this),this}getMaxScaleOnAxis(){return Oi(this)}lookAt(e,i,r){return Xi(this,e,i,r),this}determinant(){return lt(this)}fromArray(e,i=0){return this[0]=e[i],this[1]=e[i+1],this[2]=e[i+2],this[3]=e[i+3],this[4]=e[i+4],this[5]=e[i+5],this[6]=e[i+6],this[7]=e[i+7],this[8]=e[i+8],this[9]=e[i+9],this[10]=e[i+10],this[11]=e[i+11],this[12]=e[i+12],this[13]=e[i+13],this[14]=e[i+14],this[15]=e[i+15],this}toArray(e=[],i=0){return e[i]=this[0],e[i+1]=this[1],e[i+2]=this[2],e[i+3]=this[3],e[i+4]=this[4],e[i+5]=this[5],e[i+6]=this[6],e[i+7]=this[7],e[i+8]=this[8],e[i+9]=this[9],e[i+10]=this[10],e[i+11]=this[11],e[i+12]=this[12],e[i+13]=this[13],e[i+14]=this[14],e[i+15]=this[15],e}};function Yi(t,e,i="YXZ"){return i==="XYZ"?(t[1]=Math.asin(Math.min(Math.max(e[8],-1),1)),Math.abs(e[8])<.99999?(t[0]=Math.atan2(-e[9],e[10]),t[2]=Math.atan2(-e[4],e[0])):(t[0]=Math.atan2(e[6],e[5]),t[2]=0)):i==="YXZ"?(t[0]=Math.asin(-Math.min(Math.max(e[9],-1),1)),Math.abs(e[9])<.99999?(t[1]=Math.atan2(e[8],e[10]),t[2]=Math.atan2(e[1],e[5])):(t[1]=Math.atan2(-e[2],e[0]),t[2]=0)):i==="ZXY"?(t[0]=Math.asin(Math.min(Math.max(e[6],-1),1)),Math.abs(e[6])<.99999?(t[1]=Math.atan2(-e[2],e[10]),t[2]=Math.atan2(-e[4],e[5])):(t[1]=0,t[2]=Math.atan2(e[1],e[0]))):i==="ZYX"?(t[1]=Math.asin(-Math.min(Math.max(e[2],-1),1)),Math.abs(e[2])<.99999?(t[0]=Math.atan2(e[6],e[10]),t[2]=Math.atan2(e[1],e[0])):(t[0]=0,t[2]=Math.atan2(-e[4],e[5]))):i==="YZX"?(t[2]=Math.asin(Math.min(Math.max(e[1],-1),1)),Math.abs(e[1])<.99999?(t[0]=Math.atan2(-e[9],e[5]),t[1]=Math.atan2(-e[2],e[0])):(t[0]=0,t[1]=Math.atan2(e[8],e[10]))):i==="XZY"&&(t[2]=Math.asin(-Math.min(Math.max(e[4],-1),1)),Math.abs(e[4])<.99999?(t[0]=Math.atan2(e[6],e[5]),t[1]=Math.atan2(e[8],e[0])):(t[0]=Math.atan2(-e[9],e[10]),t[1]=0)),t}var Qi=new te,Ne=class extends Array{constructor(e=0,i=e,r=e,s="YXZ"){super(e,i,r),this.order=s,this.onChange=()=>{},this._target=this;let n=["0","1","2"];return new Proxy(this,{set(a,l){let h=Reflect.set(...arguments);return h&&n.includes(l)&&a.onChange(),h}})}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}set x(e){this._target[0]=e,this.onChange()}set y(e){this._target[1]=e,this.onChange()}set z(e){this._target[2]=e,this.onChange()}set(e,i=e,r=e){return e.length?this.copy(e):(this._target[0]=e,this._target[1]=i,this._target[2]=r,this.onChange(),this)}copy(e){return this._target[0]=e[0],this._target[1]=e[1],this._target[2]=e[2],this.onChange(),this}reorder(e){return this._target.order=e,this.onChange(),this}fromRotationMatrix(e,i=this.order){return Yi(this._target,e,i),this.onChange(),this}fromQuaternion(e,i=this.order,r){return Qi.fromQuaternion(e),this._target.fromRotationMatrix(Qi,i),r||this.onChange(),this}fromArray(e,i=0){return this._target[0]=e[i],this._target[1]=e[i+1],this._target[2]=e[i+2],this}toArray(e=[],i=0){return e[i]=this[0],e[i+1]=this[1],e[i+2]=this[2],e}};var Ie=class{constructor(){this.parent=null,this.children=[],this.visible=!0,this.matrix=new te,this.worldMatrix=new te,this.matrixAutoUpdate=!0,this.worldMatrixNeedsUpdate=!1,this.position=new G,this.quaternion=new Le,this.scale=new G(1),this.rotation=new Ne,this.up=new G(0,1,0),this.rotation._target.onChange=()=>this.quaternion.fromEuler(this.rotation,!0),this.quaternion._target.onChange=()=>this.rotation.fromQuaternion(this.quaternion,void 0,!0)}setParent(e,i=!0){this.parent&&e!==this.parent&&this.parent.removeChild(this,!1),this.parent=e,i&&e&&e.addChild(this,!1)}addChild(e,i=!0){~this.children.indexOf(e)||this.children.push(e),i&&e.setParent(this,!1)}removeChild(e,i=!0){~this.children.indexOf(e)&&this.children.splice(this.children.indexOf(e),1),i&&e.setParent(null,!1)}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.worldMatrixNeedsUpdate||e)&&(this.parent===null?this.worldMatrix.copy(this.matrix):this.worldMatrix.multiply(this.parent.worldMatrix,this.matrix),this.worldMatrixNeedsUpdate=!1,e=!0);for(let i=0,r=this.children.length;i<r;i++)this.children[i].updateMatrixWorld(e)}updateMatrix(){this.matrix.compose(this.quaternion,this.position,this.scale),this.worldMatrixNeedsUpdate=!0}traverse(e){if(!e(this))for(let i=0,r=this.children.length;i<r;i++)this.children[i].traverse(e)}decompose(){this.matrix.decompose(this.quaternion._target,this.position,this.scale),this.rotation.fromQuaternion(this.quaternion)}lookAt(e,i=!1){i?this.matrix.lookAt(this.position,e,this.up):this.matrix.lookAt(e,this.position,this.up),this.matrix.getRotation(this.quaternion._target),this.rotation.fromQuaternion(this.quaternion)}};function ji(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[4],t[4]=e[5],t[5]=e[6],t[6]=e[8],t[7]=e[9],t[8]=e[10],t}function Zi(t,e){let i=e[0],r=e[1],s=e[2],n=e[3],a=i+i,l=r+r,h=s+s,c=i*a,o=r*a,f=r*l,u=s*a,d=s*l,p=s*h,g=n*a,m=n*l,v=n*h;return t[0]=1-f-p,t[3]=o-v,t[6]=u+m,t[1]=o+v,t[4]=1-c-p,t[7]=d-g,t[2]=u-m,t[5]=d+g,t[8]=1-c-f,t}function $i(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t}function Ki(t,e,i,r,s,n,a,l,h,c){return t[0]=e,t[1]=i,t[2]=r,t[3]=s,t[4]=n,t[5]=a,t[6]=l,t[7]=h,t[8]=c,t}function Ji(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t}function er(t,e){let i=e[0],r=e[1],s=e[2],n=e[3],a=e[4],l=e[5],h=e[6],c=e[7],o=e[8],f=o*a-l*c,u=-o*n+l*h,d=c*n-a*h,p=i*f+r*u+s*d;return p?(p=1/p,t[0]=f*p,t[1]=(-o*r+s*c)*p,t[2]=(l*r-s*a)*p,t[3]=u*p,t[4]=(o*i-s*h)*p,t[5]=(-l*i+s*n)*p,t[6]=d*p,t[7]=(-c*i+r*h)*p,t[8]=(a*i-r*n)*p,t):null}function dt(t,e,i){let r=e[0],s=e[1],n=e[2],a=e[3],l=e[4],h=e[5],c=e[6],o=e[7],f=e[8],u=i[0],d=i[1],p=i[2],g=i[3],m=i[4],v=i[5],_=i[6],y=i[7],x=i[8];return t[0]=u*r+d*a+p*c,t[1]=u*s+d*l+p*o,t[2]=u*n+d*h+p*f,t[3]=g*r+m*a+v*c,t[4]=g*s+m*l+v*o,t[5]=g*n+m*h+v*f,t[6]=_*r+y*a+x*c,t[7]=_*s+y*l+x*o,t[8]=_*n+y*h+x*f,t}function tr(t,e,i){let r=e[0],s=e[1],n=e[2],a=e[3],l=e[4],h=e[5],c=e[6],o=e[7],f=e[8],u=i[0],d=i[1];return t[0]=r,t[1]=s,t[2]=n,t[3]=a,t[4]=l,t[5]=h,t[6]=u*r+d*a+c,t[7]=u*s+d*l+o,t[8]=u*n+d*h+f,t}function ir(t,e,i){let r=e[0],s=e[1],n=e[2],a=e[3],l=e[4],h=e[5],c=e[6],o=e[7],f=e[8],u=Math.sin(i),d=Math.cos(i);return t[0]=d*r+u*a,t[1]=d*s+u*l,t[2]=d*n+u*h,t[3]=d*a-u*r,t[4]=d*l-u*s,t[5]=d*h-u*n,t[6]=c,t[7]=o,t[8]=f,t}function rr(t,e,i){let r=i[0],s=i[1];return t[0]=r*e[0],t[1]=r*e[1],t[2]=r*e[2],t[3]=s*e[3],t[4]=s*e[4],t[5]=s*e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t}function sr(t,e){let i=e[0],r=e[1],s=e[2],n=e[3],a=e[4],l=e[5],h=e[6],c=e[7],o=e[8],f=e[9],u=e[10],d=e[11],p=e[12],g=e[13],m=e[14],v=e[15],_=i*l-r*a,y=i*h-s*a,x=i*c-n*a,M=r*h-s*l,w=r*c-n*l,R=s*c-n*h,P=o*g-f*p,L=o*m-u*p,z=o*v-d*p,I=f*m-u*g,b=f*v-d*g,B=u*v-d*m,F=_*B-y*b+x*I+M*z-w*L+R*P;return F?(F=1/F,t[0]=(l*B-h*b+c*I)*F,t[1]=(h*z-a*B-c*L)*F,t[2]=(a*b-l*z+c*P)*F,t[3]=(s*b-r*B-n*I)*F,t[4]=(i*B-s*z+n*L)*F,t[5]=(r*z-i*b-n*P)*F,t[6]=(g*R-m*w+v*M)*F,t[7]=(m*x-p*R-v*y)*F,t[8]=(p*w-g*x+v*_)*F,t):null}var Be=class extends Array{constructor(e=1,i=0,r=0,s=0,n=1,a=0,l=0,h=0,c=1){return super(e,i,r,s,n,a,l,h,c),this}set(e,i,r,s,n,a,l,h,c){return e.length?this.copy(e):(Ki(this,e,i,r,s,n,a,l,h,c),this)}translate(e,i=this){return tr(this,i,e),this}rotate(e,i=this){return ir(this,i,e),this}scale(e,i=this){return rr(this,i,e),this}multiply(e,i){return i?dt(this,e,i):dt(this,this,e),this}identity(){return Ji(this),this}copy(e){return $i(this,e),this}fromMatrix4(e){return ji(this,e),this}fromQuaternion(e){return Zi(this,e),this}fromBasis(e,i,r){return this.set(e[0],e[1],e[2],i[0],i[1],i[2],r[0],r[1],r[2]),this}inverse(e=this){return er(this,e),this}getNormalMatrix(e){return sr(this,e),this}};var Ur=0,ae=class extends Ie{constructor(e,{geometry:i,program:r,mode:s=e.TRIANGLES,frustumCulled:n=!0,renderOrder:a=0}={}){super(),e.canvas||console.error("gl not passed as first argument to Mesh"),this.gl=e,this.id=Ur++,this.geometry=i,this.program=r,this.mode=s,this.frustumCulled=n,this.renderOrder=a,this.modelViewMatrix=new te,this.normalMatrix=new Be,this.beforeRenderCallbacks=[],this.afterRenderCallbacks=[]}onBeforeRender(e){return this.beforeRenderCallbacks.push(e),this}onAfterRender(e){return this.afterRenderCallbacks.push(e),this}draw({camera:e}={}){e&&(this.program.uniforms.modelMatrix||Object.assign(this.program.uniforms,{modelMatrix:{value:null},viewMatrix:{value:null},modelViewMatrix:{value:null},normalMatrix:{value:null},projectionMatrix:{value:null},cameraPosition:{value:null}}),this.program.uniforms.projectionMatrix.value=e.projectionMatrix,this.program.uniforms.cameraPosition.value=e.worldPosition,this.program.uniforms.viewMatrix.value=e.viewMatrix,this.modelViewMatrix.multiply(e.viewMatrix,this.worldMatrix),this.normalMatrix.getNormalMatrix(this.modelViewMatrix),this.program.uniforms.modelMatrix.value=this.worldMatrix,this.program.uniforms.modelViewMatrix.value=this.modelViewMatrix,this.program.uniforms.normalMatrix.value=this.normalMatrix),this.beforeRenderCallbacks.forEach(r=>r&&r({mesh:this,camera:e}));let i=this.program.cullFace&&this.worldMatrix.determinant()<0;this.program.use({flipFaces:i}),this.geometry.draw({mode:this.mode,program:this.program}),this.afterRenderCallbacks.forEach(r=>r&&r({mesh:this,camera:e}))}};var nr=new Uint8Array(4);function ar(t){return(t&t-1)===0}var Vr=1,ie=class{constructor(e,{image:i,target:r=e.TEXTURE_2D,type:s=e.UNSIGNED_BYTE,format:n=e.RGBA,internalFormat:a=n,wrapS:l=e.CLAMP_TO_EDGE,wrapT:h=e.CLAMP_TO_EDGE,wrapR:c=e.CLAMP_TO_EDGE,generateMipmaps:o=r===(e.TEXTURE_2D||e.TEXTURE_CUBE_MAP),minFilter:f=o?e.NEAREST_MIPMAP_LINEAR:e.LINEAR,magFilter:u=e.LINEAR,premultiplyAlpha:d=!1,unpackAlignment:p=4,flipY:g=r==(e.TEXTURE_2D||e.TEXTURE_3D),anisotropy:m=0,level:v=0,width:_,height:y=_,length:x=1}={}){this.gl=e,this.id=Vr++,this.image=i,this.target=r,this.type=s,this.format=n,this.internalFormat=a,this.minFilter=f,this.magFilter=u,this.wrapS=l,this.wrapT=h,this.wrapR=c,this.generateMipmaps=o,this.premultiplyAlpha=d,this.unpackAlignment=p,this.flipY=g,this.anisotropy=Math.min(m,this.gl.renderer.parameters.maxAnisotropy),this.level=v,this.width=_,this.height=y,this.length=x,this.texture=this.gl.createTexture(),this.store={image:null},this.glState=this.gl.renderer.state,this.state={},this.state.minFilter=this.gl.NEAREST_MIPMAP_LINEAR,this.state.magFilter=this.gl.LINEAR,this.state.wrapS=this.gl.REPEAT,this.state.wrapT=this.gl.REPEAT,this.state.anisotropy=0}bind(){this.glState.textureUnits[this.glState.activeTextureUnit]!==this.id&&(this.gl.bindTexture(this.target,this.texture),this.glState.textureUnits[this.glState.activeTextureUnit]=this.id)}update(e=0){let i=!(this.image===this.store.image&&!this.needsUpdate);if((i||this.glState.textureUnits[e]!==this.id)&&(this.gl.renderer.activeTexture(e),this.bind()),!!i){if(this.needsUpdate=!1,this.flipY!==this.glState.flipY&&(this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,this.flipY),this.glState.flipY=this.flipY),this.premultiplyAlpha!==this.glState.premultiplyAlpha&&(this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this.premultiplyAlpha),this.glState.premultiplyAlpha=this.premultiplyAlpha),this.unpackAlignment!==this.glState.unpackAlignment&&(this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT,this.unpackAlignment),this.glState.unpackAlignment=this.unpackAlignment),this.minFilter!==this.state.minFilter&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_MIN_FILTER,this.minFilter),this.state.minFilter=this.minFilter),this.magFilter!==this.state.magFilter&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_MAG_FILTER,this.magFilter),this.state.magFilter=this.magFilter),this.wrapS!==this.state.wrapS&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_S,this.wrapS),this.state.wrapS=this.wrapS),this.wrapT!==this.state.wrapT&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_T,this.wrapT),this.state.wrapT=this.wrapT),this.wrapR!==this.state.wrapR&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_R,this.wrapR),this.state.wrapR=this.wrapR),this.anisotropy&&this.anisotropy!==this.state.anisotropy&&(this.gl.texParameterf(this.target,this.gl.renderer.getExtension("EXT_texture_filter_anisotropic").TEXTURE_MAX_ANISOTROPY_EXT,this.anisotropy),this.state.anisotropy=this.anisotropy),this.image){if(this.image.width&&(this.width=this.image.width,this.height=this.image.height),this.target===this.gl.TEXTURE_CUBE_MAP)for(let r=0;r<6;r++)this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+r,this.level,this.internalFormat,this.format,this.type,this.image[r]);else if(ArrayBuffer.isView(this.image))this.target===this.gl.TEXTURE_2D?this.gl.texImage2D(this.target,this.level,this.internalFormat,this.width,this.height,0,this.format,this.type,this.image):(this.target===this.gl.TEXTURE_2D_ARRAY||this.target===this.gl.TEXTURE_3D)&&this.gl.texImage3D(this.target,this.level,this.internalFormat,this.width,this.height,this.length,0,this.format,this.type,this.image);else if(this.image.isCompressedTexture)for(let r=0;r<this.image.length;r++)this.gl.compressedTexImage2D(this.target,r,this.internalFormat,this.image[r].width,this.image[r].height,0,this.image[r].data);else this.target===this.gl.TEXTURE_2D?this.gl.texImage2D(this.target,this.level,this.internalFormat,this.format,this.type,this.image):this.gl.texImage3D(this.target,this.level,this.internalFormat,this.width,this.height,this.length,0,this.format,this.type,this.image);this.generateMipmaps&&(!this.gl.renderer.isWebgl2&&(!ar(this.image.width)||!ar(this.image.height))?(this.generateMipmaps=!1,this.wrapS=this.wrapT=this.gl.CLAMP_TO_EDGE,this.minFilter=this.gl.LINEAR):this.gl.generateMipmap(this.target)),this.onUpdate&&this.onUpdate()}else if(this.target===this.gl.TEXTURE_CUBE_MAP)for(let r=0;r<6;r++)this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,this.gl.RGBA,1,1,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,nr);else this.width?this.target===this.gl.TEXTURE_2D?this.gl.texImage2D(this.target,this.level,this.internalFormat,this.width,this.height,0,this.format,this.type,null):this.gl.texImage3D(this.target,this.level,this.internalFormat,this.width,this.height,this.length,0,this.format,this.type,null):this.gl.texImage2D(this.target,0,this.gl.RGBA,1,1,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,nr);this.store.image=this.image}}};var Ee=class{constructor(e,{width:i=e.canvas.width,height:r=e.canvas.height,target:s=e.FRAMEBUFFER,color:n=1,depth:a=!0,stencil:l=!1,depthTexture:h=!1,wrapS:c=e.CLAMP_TO_EDGE,wrapT:o=e.CLAMP_TO_EDGE,wrapR:f=e.CLAMP_TO_EDGE,minFilter:u=e.LINEAR,magFilter:d=u,type:p=e.UNSIGNED_BYTE,format:g=e.RGBA,internalFormat:m=g,unpackAlignment:v,premultiplyAlpha:_}={}){this.gl=e,this.width=i,this.height=r,this.depth=a,this.stencil=l,this.buffer=this.gl.createFramebuffer(),this.target=s,this.gl.renderer.bindFramebuffer(this),this.textures=[];let y=[];for(let x=0;x<n;x++)this.textures.push(new ie(e,{width:i,height:r,wrapS:c,wrapT:o,wrapR:f,minFilter:u,magFilter:d,type:p,format:g,internalFormat:m,unpackAlignment:v,premultiplyAlpha:_,flipY:!1,generateMipmaps:!1})),this.textures[x].update(),this.gl.framebufferTexture2D(this.target,this.gl.COLOR_ATTACHMENT0+x,this.gl.TEXTURE_2D,this.textures[x].texture,0),y.push(this.gl.COLOR_ATTACHMENT0+x);y.length>1&&this.gl.renderer.drawBuffers(y),this.texture=this.textures[0],h&&(this.gl.renderer.isWebgl2||this.gl.renderer.getExtension("WEBGL_depth_texture"))?(this.depthTexture=new ie(e,{width:i,height:r,minFilter:this.gl.NEAREST,magFilter:this.gl.NEAREST,format:this.stencil?this.gl.DEPTH_STENCIL:this.gl.DEPTH_COMPONENT,internalFormat:e.renderer.isWebgl2?this.stencil?this.gl.DEPTH24_STENCIL8:this.gl.DEPTH_COMPONENT16:this.gl.DEPTH_COMPONENT,type:this.stencil?this.gl.UNSIGNED_INT_24_8:this.gl.UNSIGNED_INT}),this.depthTexture.update(),this.gl.framebufferTexture2D(this.target,this.stencil?this.gl.DEPTH_STENCIL_ATTACHMENT:this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.texture,0)):(a&&!l&&(this.depthBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_COMPONENT16,i,r),this.gl.framebufferRenderbuffer(this.target,this.gl.DEPTH_ATTACHMENT,this.gl.RENDERBUFFER,this.depthBuffer)),l&&!a&&(this.stencilBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.stencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.STENCIL_INDEX8,i,r),this.gl.framebufferRenderbuffer(this.target,this.gl.STENCIL_ATTACHMENT,this.gl.RENDERBUFFER,this.stencilBuffer)),a&&l&&(this.depthStencilBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthStencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_STENCIL,i,r),this.gl.framebufferRenderbuffer(this.target,this.gl.DEPTH_STENCIL_ATTACHMENT,this.gl.RENDERBUFFER,this.depthStencilBuffer))),this.gl.renderer.bindFramebuffer({target:this.target})}setSize(e,i){if(!(this.width===e&&this.height===i)){this.width=e,this.height=i,this.gl.renderer.bindFramebuffer(this);for(let r=0;r<this.textures.length;r++)this.textures[r].width=e,this.textures[r].height=i,this.textures[r].needsUpdate=!0,this.textures[r].update(),this.gl.framebufferTexture2D(this.target,this.gl.COLOR_ATTACHMENT0+r,this.gl.TEXTURE_2D,this.textures[r].texture,0);this.depthTexture?(this.depthTexture.width=e,this.depthTexture.height=i,this.depthTexture.needsUpdate=!0,this.depthTexture.update(),this.gl.framebufferTexture2D(this.target,this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.texture,0)):(this.depthBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_COMPONENT16,e,i)),this.stencilBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.stencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.STENCIL_INDEX8,e,i)),this.depthStencilBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthStencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_STENCIL,e,i))),this.gl.renderer.bindFramebuffer({target:this.target})}}};var Te=class extends ge{constructor(e,{attributes:i={}}={}){Object.assign(i,{position:{size:2,data:new Float32Array([-1,-1,3,-1,-1,3])},uv:{size:2,data:new Float32Array([0,0,2,0,0,2])}}),super(e,i)}};var lr={plasma:{color:"#F25BD0",strands:6,crackle:.85,flares:.65,glow:.9,sparks:.6,particleCount:15e3,fill:.5,motion:"rise",particleShape:"square",depth:.6,sway:.5,twinkle:.5,haze:.7,dustSpeed:1},aurora:{color:"#5CFFC8",strands:5,crackle:.6,flares:.5,glow:.8,sparks:.45,particleCount:15e3,fill:.5,motion:"rise",particleShape:"square",depth:.6,sway:.5,twinkle:.5,haze:.7,dustSpeed:1},nebula:{color:"#9478FF",strands:6,crackle:1,flares:.5,glow:.9,sparks:.6,particleCount:18e3,fill:.45,motion:"rise",particleShape:"square",depth:.5,sway:.4,twinkle:.6,haze:.8,dustSpeed:1.2},ember:{color:"#FF8A2A",strands:5,crackle:.9,flares:.8,glow:1,sparks:.8,particleCount:12e3,fill:.35,motion:"rise",particleShape:"round",depth:.7,sway:.3,twinkle:.7,haze:.9,dustSpeed:1.6},frost:{color:"#BFE6FF",strands:3,crackle:.3,flares:.3,glow:.6,sparks:.2,particleCount:16e3,fill:.6,motion:"fall",particleShape:"round",depth:.8,sway:.4,twinkle:.4,haze:.5,dustSpeed:.7},solar:{color:"#FFD36E",strands:6,crackle:.7,flares:1,glow:1.1,sparks:.5,particleCount:15e3,fill:.55,motion:"orbit",particleShape:"square",depth:.6,sway:.7,twinkle:.5,haze:.8,dustSpeed:1},eclipse:{color:"#FFFFFF",strands:4,crackle:.5,flares:.4,glow:.7,sparks:.35,particleCount:14e3,fill:.5,motion:"drift",particleShape:"square",depth:.7,sway:.5,twinkle:.5,haze:.5,dustSpeed:.8},abyss:{color:"#3F7BFF",strands:5,crackle:.55,flares:.6,glow:.9,sparks:.4,particleCount:2e4,fill:.8,motion:"orbit",particleShape:"round",depth:.8,sway:.8,twinkle:.5,haze:.6,dustSpeed:.9}},Gr={rise:0,fall:1,drift:2,orbit:3},Hr={square:0,round:1},fr=8,pt=4,qr=4e4,le=256,Xr=45e5,Wr=2.2,Yr=7,ke=[1,1,1],gt=[0,0,0],C=(t,e,i)=>Math.min(Math.max(t,e),i),re=(t,e,i)=>{let r=C((i-t)/(e-t),0,1);return r*r*(3-2*r)},hr=t=>1-Math.pow(1-t,3),we=(t,e,i)=>t.map((r,s)=>r+(e[s]-r)*i),or=t=>t-Math.PI*2*Math.floor((t+Math.PI)/(Math.PI*2)),Qr=(t,e)=>{try{let i=document.createElement("canvas").getContext("2d");if(!i)return e;i.fillStyle="#000000",i.fillStyle=t;let r=i.fillStyle;if(r.startsWith("#")){let n=parseInt(r.slice(1),16);return[(n>>16&255)/255,(n>>8&255)/255,(n&255)/255]}let s=r.match(/[\d.]+/g);return!s||s.length<3?e:[Number(s[0])/255,Number(s[1])/255,Number(s[2])/255]}catch{return e}},jr=t=>t<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4),Zr=t=>t<=.0031308?t*12.92:1.055*Math.pow(t,1/2.4)-.055,_e=t=>{let[e,i,r]=t.map(jr),s=Math.cbrt(.4122214708*e+.5363325363*i+.0514459929*r),n=Math.cbrt(.2119034982*e+.6806995451*i+.1073969566*r),a=Math.cbrt(.0883024619*e+.2817188376*i+.6299787005*r);return[.2104542553*s+.793617785*n-.0040720468*a,1.9779984951*s-2.428592205*n+.4505937099*a,.0259040371*s+.7827717662*n-.808675766*a]},xt=([t,e,i])=>{let r=Math.pow(t+.3963377774*e+.2158037573*i,3),s=Math.pow(t-.1055613458*e-.0638541728*i,3),n=Math.pow(t-.0894841775*e-1.291485548*i,3);return[4.0767416621*r-3.3077115913*s+.2309699292*n,-1.2684380046*r+2.6097574011*s-.3413193965*n,-.0041960863*r-.7034186147*s+1.707614701*n].map(a=>C(Zr(C(a,0,1)),0,1))},cr=(t,e,i)=>xt(we(_e(t),_e(e),i)),ye=(t,e,i,r)=>{let[s,n,a]=_e(t),l=Math.hypot(n,a)*r,h=Math.atan2(a,n)+e*Math.PI/180;return xt([C(s+i,0,1),l*Math.cos(h),l*Math.sin(h)])},Q=(t,e,i,r)=>{let[,s,n]=_e(t),a=Math.max(Math.hypot(s,n)*r,.02),l=Math.atan2(n,s)+e*Math.PI/180;return xt([C(i,0,1),a*Math.cos(l),a*Math.sin(l)])},$r=(t,e)=>{if(e){let i=Q(t,0,Math.min(_e(t)[0],.62),1.15);return{rim:i,rimHot:i,rimMid:i,rimDeep:Q(t,0,.72,.8),spark:Q(t,0,.6,1.2),sparkGlow:Q(t,0,.78,.8),haze:Q(t,0,.8,.6),edge:Q(t,0,.72,.8),tones:[Q(t,0,.56,1.1),Q(t,16,.6,1.05),Q(t,-16,.5,1.1),Q(t,0,.66,.9),Q(t,0,.74,.7)]}}return{rim:t,rimHot:we(t,ke,.72),rimMid:we(t,gt,.15),rimDeep:we(t,gt,.45),spark:we(t,ke,.45),sparkGlow:ye(t,0,-.15,1),haze:we(t,gt,.6),edge:ye(t,0,-.3,.9),tones:[ye(t,0,-.06,1),ye(t,16,-.02,1),ye(t,-16,-.12,1.05),ye(cr(t,ke,.25),0,.04,1),cr(t,ke,.7)]}},vt=t=>{let e=t>>>0;return()=>{e=e+1831565813>>>0;let i=e;return i=Math.imul(i^i>>>15,i|1),i^=i+Math.imul(i^i>>>7,i|61),((i^i>>>14)>>>0)/4294967296}},Kr=()=>{let t=vt(99),e=[[6,12,.6,1.6],[18,34,1.5,3.5],[40,70,3,7],[80,130,6,12]],i={harmonics:[],rates:[],phases:[],flareHarmonics:[],flareRates:[],flarePhases:[]};for(let r=0;r<fr;r++){e.forEach(([n,a,l,h])=>{i.harmonics.push(Math.round(n+t()*(a-n))),i.rates.push((l+t()*(h-l))*(t()<.5?-1:1)),i.phases.push(t()*Math.PI*2)});for(let n=0;n<3;n++)i.flareHarmonics.push(4+Math.floor(t()*6)),i.flareRates.push((.4+t()*.8)*(t()<.5?-1:1)),i.flarePhases.push(t()*Math.PI*2);let s=r===0;i.flareHarmonics.push(s?.75:.95+t()*.3),i.flareRates.push(s?1.15:.8+t()*.2),i.flarePhases.push(s?1:.7+t()*.25)}return i},Jr=t=>{let e=vt(1337),i=Math.max(1,Math.ceil(t/le)),r=new Float32Array(le*i*4),s=new Float32Array(le*i*4),n=0,a=0;for(;n<t&&a<t*80;){a++;let l,h,c;if(e()<.28){let f=e()*Math.PI*2,u=.87+Math.sqrt(e())*.105;if(l=Math.cos(f)*u,h=Math.sin(f)*u,e()>re(-.6,.3,-h))continue;let d=e();c=d<.5?3:d<.8?2:1}else{l=e()*2-1,h=e()*2-1;let f=Math.hypot(l,h);if(f>.975)continue;let u=Math.pow(re(-.25,.85,-h),1.3),d=re(.66,.96,f)*re(-.7,.3,-h),p=Math.max(u,d*.9);if(e()>.012+.988*p)continue;if(p<.12)c=4;else{let g=e();c=g<.32?0:g<.52?1:g<.8?2:3}}let o=Math.sqrt(Math.max(0,.95-l*l-h*h));r[n*4]=l,r[n*4+1]=h,r[n*4+2]=(e()*2-1)*o,r[n*4+3]=c,s[n*4]=c===4?1.8:e()<.22?2.1:1.3,s[n*4+1]=e(),s[n*4+2]=2.5+e()*3.5,s[n*4+3]=.16+e()*.26,n++}return{home:r,seed:s,count:n,rows:i}},mt=`#version 300 es
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,Et=`
uint scramble(uint v) {
  v = v * 747796405u + 2891336453u;
  uint w = ((v >> ((v >> 28u) + 4u)) ^ v) * 277803737u;
  return (w >> 22u) ^ w;
}

float random(uint v) {
  return float(scramble(v)) * (1.0 / 4294967295.0);
}
`,ur=`
uniform float uDustTime;
uniform vec2 uTurn;
uniform float uMotion;
uniform float uFill;

vec3 settle(vec3 p, out float spread) {
  float bend = exp2((0.5 - uFill) * 1.8);
  float h = clamp((p.y + 1.0) * 0.5, 0.0, 1.0);
  float y = 2.0 * pow(h, bend) - 1.0;
  float from = sqrt(max(1.0 - p.y * p.y, 1e-4));
  float to = sqrt(max(1.0 - y * y, 0.0));
  spread = clamp(bend * pow(max(h, 1e-3), bend - 1.0) * to / from, 0.25, 1.0);
  return vec3(p.xz * (to / from), y).xzy;
}

vec3 drift(vec4 home, vec4 seed, uint id, out float life, out float spread) {
  vec3 p = settle(home.xyz, spread);
  float t = uDustTime;
  float u = fract(t / seed.z + seed.y);
  life = sin(3.14159265 * u);
  float travel = seed.w;
  if (uMotion < 0.5) {
    p.y += travel * (u - 0.5);
  } else if (uMotion < 1.5) {
    p.y -= travel * (u - 0.5);
  } else if (uMotion < 2.5) {
    p += 0.045 * vec3(
      sin(t * 0.37 + seed.y * 17.0) + 0.5 * sin(t * 0.83 + seed.z * 5.0),
      sin(t * 0.29 + seed.z * 11.0) + 0.5 * sin(t * 0.61 + seed.w * 7.0),
      sin(t * 0.33 + seed.w * 23.0)
    );
  } else {
    float loop = t * (0.6 + 0.9 * random(id * 7u + 3u)) * (random(id * 7u + 10u) < 0.5 ? -1.0 : 1.0) + seed.y * 6.2831853;
    p.xy += (0.025 + 0.05 * random(id * 7u + 16u)) * vec2(cos(loop), sin(loop));
  }
  float wobble = 0.002 + 0.006 * random(id * 7u + 1u);
  float w1 = 0.8 + 2.4 * random(id * 7u + 2u);
  float w2 = 0.8 + 2.4 * random(id * 7u + 4u);
  p += wobble * vec3(sin(t * w1 + seed.y * 40.0), cos(t * w2 + seed.z * 30.0), sin(t * (w1 + w2) * 0.5 + seed.w * 20.0));
  float cy = cos(uTurn.x);
  float sy = sin(uTurn.x);
  p.xz = mat2(cy, -sy, sy, cy) * p.xz;
  float cx = cos(uTurn.y);
  float sx = sin(uTurn.y);
  p.yz = mat2(cx, -sx, sx, cx) * p.yz;
  return p;
}
`,es=`#version 300 es
precision highp float;

uniform vec2 uCenter;
uniform float uRadius;
uniform float uDpr;
uniform float uLine;
uniform float uTime;
uniform float uFrame;
uniform float uBins;
uniform float uStrands;
uniform float uCrackle;
uniform float uFlares;
uniform float uGlow;
uniform float uHaze;
uniform float uFill;
uniform float uPresence;
uniform float uUnfold;
uniform float uBloom;
uniform float uInside;
uniform float uEncode;
uniform vec3 uRim;
uniform vec3 uRimHot;
uniform vec3 uRimMid;
uniform vec3 uRimDeep;
uniform vec3 uSpark;
uniform vec3 uSparkGlow;
uniform vec3 uHazeColor;
uniform vec3 uEdgeColor;
uniform vec4 uHeat;
uniform vec4 uHarmonics[8];
uniform vec4 uRates[8];
uniform vec4 uPhases[8];
uniform vec4 uFlareHarmonics[8];
uniform vec4 uFlareRates[8];
uniform vec4 uFlarePhases[8];
uniform vec4 uArcs[4];

out vec4 fragColor;
${Et}
const float PI = 3.14159265;
const float TAU = 6.28318531;
const vec4 AMPS = vec4(0.35, 0.3, 0.22, 0.13);

float bell(float d, float w) {
  float x = d / w;
  return exp(-x * x);
}

float segment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-5), 0.0, 1.0);
  return length(pa - ba * h);
}

float pool(vec2 q) {
  float t = length(q - vec2(0.0, mix(-1.0, -0.66, uFill))) / mix(0.8, 1.35, uFill);
  return t < 0.6 ? mix(0.5, 0.22, t / 0.6) : mix(0.22, 0.0, clamp((t - 0.6) / 0.4, 0.0, 1.0));
}

void main() {
  vec2 p = gl_FragCoord.xy / uDpr - uCenter;
  float r = length(p);
  float R = uRadius;
  float theta = atan(p.y, p.x);
  float lift = p.y / max(r, 1e-3);
  float topDim = 1.0 - 0.35 * pow(max(lift, 0.0), 1.5);
  vec3 col = vec3(0.0);
  float hot = 0.0;
  uint frame = uint(uFrame);

  if (r < R) {
    vec2 q = p / R;
    float chord = sqrt(max(1.0 - dot(q, q), 0.0));
    float haze = pool(q) * (0.55 + 0.45 * chord);
    col += uHazeColor * haze * uHaze * uInside;
    float e = length(q - vec2(0.0, 0.2)) / 1.2;
    float edge = 0.5 * pow(smoothstep(0.62, 1.0, e), 1.4);
    col += uEdgeColor * edge * uInside * (0.5 + 0.5 * uHaze);
  }

  float dr = r - R;
  float halo = 1.0 - smoothstep(R * 0.05, R * 0.105, abs(dr - R * 0.0213));
  col += uRimDeep * 0.18 * halo * topDim * uGlow * uBloom;
  col += uRim * 0.12 * bell(dr + R * 0.0383, R * 0.032) * uGlow * uBloom;
  col += uRim * 0.32 * bell(dr, max(R * 0.0117, uLine)) * uPresence * uUnfold;

  float delta = mod(theta - uHeat.x + PI, TAU) - PI;
  float heat = uHeat.z * uHeat.y * exp(-delta * delta / 0.3);
  float crackle = uCrackle + heat * 0.9;
  float amp = R * 0.016 * (0.3 + 1.4 * crackle) * uUnfold;
  float jitterAmp = R * 0.0048 * (0.3 + 1.4 * uCrackle) * uUnfold * (1.0 + heat * 0.3);
  float flareAmp = R * 0.064 * (0.4 + 1.2 * crackle) * uFlares * 1.6 * uUnfold;

  if (abs(dr) < amp * 2.0 + flareAmp + R * 0.3) {
    float step = TAU / uBins;
    float binPos = (theta + PI) / step;
    float bin0 = floor(binPos);
    float binF = binPos - bin0;
    float th0 = bin0 * step - PI;
    float th1 = th0 + step;
    uint b0 = uint(mod(bin0, uBins));
    uint b1 = uint(mod(bin0 + 1.0, uBins));
    float gain = min(1.0, 2.4 / max(uStrands, 1.0));
    for (int k = 0; k < 8; k++) {
      if (float(k) >= uStrands) break;
      vec4 m = uHarmonics[k];
      vec4 lead = uRates[k] * uTime + uPhases[k];
      float wave0 = dot(AMPS, sin(m * th0 + lead));
      float wave1 = dot(AMPS, sin(m * th1 + lead));
      uint salt = uint(k) * 1013u + frame * 7919u;
      vec4 shape = uFlareHarmonics[k];
      vec4 look = uFlareRates[k];
      vec4 tone = uFlarePhases[k];
      float a = amp * shape.w;
      float off0 = a * wave0 + jitterAmp * (random(b0 + salt) - 0.5);
      float off1 = a * wave1 + jitterAmp * (random(b1 + salt) - 0.5);
      float rc = R + mix(off0, off1, binF);
      float grade = (off1 - off0) / (step * max(r, 1.0));
      float d = abs(r - rc) * inversesqrt(1.0 + grade * grade);
      float swell = 0.8 + 0.4 * (0.5 + 0.5 * sin(3.0 * theta + uTime * 0.7 + tone.x * 1.7));
      float width = uLine * look.w * swell * (1.0 + heat * 0.25);
      float core = exp(-d * d / (width * width));
      float sheath = exp(-d * d / (width * width * 3.0));
      float bright = tone.w * (1.0 + heat * 0.45) * uPresence;
      col += (uRimHot * core * 0.8 + uRim * sheath * 0.32) * bright;
      hot += core * bright;
      vec3 fargs = shape.xyz * theta + look.xyz * uTime + tone.xyz;
      float flare = max(0.0, (sin(fargs.x) + sin(fargs.y) + sin(fargs.z)) / 3.0);
      flare = (flare * flare + heat * 0.35) * flareAmp;
      float dw = abs(r - rc - flare);
      float dm = abs(r - rc - flare * 0.6);
      float dn = abs(r - rc - flare * 0.25);
      vec3 glow = uRimDeep * (0.07 * bell(dw, R * 0.09) + 0.16 * bell(dw, R * 0.05));
      glow += uRimMid * 0.28 * bell(dm, R * 0.027) + uRim * 0.38 * bell(dn, R * 0.013);
      col += glow * gain * topDim * uGlow * uBloom * (1.0 + heat * 1.4);
    }
  }

  for (int i = 0; i < 4; i++) {
    vec4 arc = uArcs[i];
    if (arc.w <= 0.002) continue;
    float mid = arc.x + arc.y * 0.5;
    vec2 center = R * 0.93 * vec2(cos(mid), sin(mid));
    if (distance(p, center) > R * (abs(arc.y) * 0.6 + 0.1) + 12.0) continue;
    float ar = R * 0.955;
    vec2 a0 = ar * vec2(cos(arc.x), sin(arc.x));
    vec2 a2 = ar * vec2(cos(arc.x + arc.y), sin(arc.x + arc.y));
    vec2 a1 = R * (0.955 - arc.z) * vec2(cos(mid), sin(mid));
    float dmin = 1e5;
    float along = 0.0;
    vec2 prev = a0;
    for (int s = 1; s <= 10; s++) {
      float u = float(s) / 10.0;
      vec2 b = mix(mix(a0, a1, u), mix(a1, a2, u), u);
      vec2 pa = p - prev;
      vec2 ba = b - prev;
      float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-5), 0.0, 1.0);
      float dist = length(pa - ba * h);
      if (dist < dmin) {
        dmin = dist;
        along = (float(s) - 1.0 + h) / 10.0;
      }
      prev = b;
    }
    float taper = sqrt(max(sin(PI * along), 0.0));
    float arcWidth = uLine * (0.55 + 0.6 * taper);
    float arcCore = exp(-dmin * dmin / (arcWidth * arcWidth));
    float arcGlow = exp(-dmin * dmin / (arcWidth * arcWidth * 12.0));
    col += (uSpark * 0.95 * arcCore + uSparkGlow * 0.4 * arcGlow) * arc.w * taper;
    hot += arcCore * arc.w * taper * 0.6;
  }

  fragColor = vec4(col, hot) * uEncode;
}
`,ts=`#version 300 es
precision highp float;

in float aIndex;

uniform sampler2D tHome;
uniform sampler2D tSeed;
uniform sampler2D tOffset;
uniform float uStirred;
uniform vec2 uCenter;
uniform vec2 uViewport;
uniform float uRadius;
uniform float uDpr;
uniform float uDepth;
uniform float uTwinkle;
uniform float uPointScale;
uniform float uReveal;
uniform float uEncode;
uniform vec3 uTones[5];
uniform vec3 uRimTone;

out vec3 vColor;
out float vSize;
${Et}
${ur}
void main() {
  ivec2 cell = ivec2(int(mod(aIndex, ${le}.0)), int(floor(aIndex / ${le}.0)));
  uint id = uint(aIndex);
  vec4 home = texelFetch(tHome, cell, 0);
  vec4 seed = texelFetch(tSeed, cell, 0);
  float life;
  float spread;
  vec3 p = drift(home, seed, id, life, spread);
  if (uStirred > 0.5) p += texelFetch(tOffset, cell, 0).xyz;
  float len = length(p);
  float inside = 1.0 - smoothstep(0.955, 0.985, length(p.xy));
  if (len > 0.975) p *= 0.975 / len;

  float front = p.z * 0.5 + 0.5;
  float depthSize = mix(1.0, 0.7 + 0.6 * front, uDepth);
  float depthLight = mix(1.0, 0.35 + 0.8 * front, uDepth);
  float blink = sin(uDustTime * (2.0 + 6.0 * random(id * 7u + 5u)) + random(id * 7u + 6u) * 6.2831853);
  float twinkle = mix(1.0, smoothstep(-0.9, -0.6, blink), uTwinkle);
  float fade = smoothstep(0.04, 0.12, life);
  float order = (home.y + 1.0) * 0.5 * 0.55 + random(id * 7u + 8u) * 0.25;
  float reveal = smoothstep(order, order + 0.2, uReveal * 1.0);
  float alpha = random(id * 7u + 9u) < 0.5 || home.w > 3.5 ? 1.0 : 0.6;

  float size = seed.x * uPointScale * (0.35 + 0.95 * life) * depthSize * mix(0.5, 1.0, reveal);
  vec2 screen = uCenter + p.xy * uRadius;
  gl_Position = vec4(screen / uViewport * 2.0 - 1.0, 0.0, 1.0);
  float px = size * uDpr;
  gl_PointSize = px + 2.0;
  vSize = px;

  int tone = int(home.w + 0.5);
  float rimLit = smoothstep(0.8, 0.97, length(p.xy));
  vec3 color = uTones[tone] + uRimTone * rimLit * rimLit * 0.12;
  vColor = color * alpha * fade * twinkle * depthLight * reveal * inside * sqrt(spread) * uEncode;
}
`,is=`#version 300 es
precision highp float;

uniform float uShape;

in vec3 vColor;
in float vSize;

out vec4 fragColor;

void main() {
  vec2 q = (gl_PointCoord - 0.5) * (vSize + 2.0);
  float half_ = max(vSize * 0.5, 0.5);
  float cover;
  if (uShape < 0.5) {
    vec2 c = clamp(half_ - abs(q) + 0.5, 0.0, 1.0);
    cover = c.x * c.y;
  } else {
    cover = clamp(half_ - length(q) + 0.5, 0.0, 1.0);
  }
  if (cover <= 0.0) discard;
  fragColor = vec4(vColor * cover, 0.0);
}
`,rs=`#version 300 es
precision highp float;

uniform sampler2D tHome;
uniform sampler2D tSeed;
uniform sampler2D tOffset;
uniform sampler2D tVelocity;
uniform float uDt;
uniform float uReset;
uniform vec4 uBrush;
uniform float uBrushPower;
uniform vec4 uKick;

layout(location = 0) out vec4 outOffset;
layout(location = 1) out vec4 outVelocity;
${Et}
${ur}
vec3 swirl(vec3 p) {
  float t = uDustTime * 0.15;
  vec3 a = vec3(1.7, 1.9, 1.5) * p.yzx + vec3(t, 1.2, 2.1);
  vec3 b = vec3(2.3, 2.1, 2.7) * p.zxy + vec3(0.4, t * 1.3, 0.9);
  vec3 ca = cos(a) * vec3(1.7, 1.9, 1.5);
  vec3 cb = cos(b) * vec3(2.3, 2.1, 2.7);
  return vec3(ca.z - cb.x, cb.y - ca.x, ca.y - cb.z);
}

void main() {
  ivec2 cell = ivec2(gl_FragCoord.xy);
  if (uReset > 0.5) {
    outOffset = vec4(0.0);
    outVelocity = vec4(0.0);
    return;
  }
  uint id = uint(cell.y * ${le} + cell.x);
  vec4 home = texelFetch(tHome, cell, 0);
  vec4 seed = texelFetch(tSeed, cell, 0);
  vec3 o = texelFetch(tOffset, cell, 0).xyz;
  vec3 v = texelFetch(tVelocity, cell, 0).xyz;
  float life;
  float spread;
  vec3 base = drift(home, seed, id, life, spread);
  vec3 p = base + o;

  float k = mix(0.8, 2.2, random(id * 7u + 11u));
  vec3 acc = -k * o - 1.5 * sqrt(k) * v;

  vec2 gap = p.xy - uBrush.xy;
  float touch = exp(-dot(gap, gap) / 0.07) * uBrushPower;
  acc += (vec3(uBrush.zw, 0.0) - v) * touch * 14.0;
  float pace = length(v);
  if (pace > 1e-4) {
    vec3 heading = v / pace;
    vec3 curl = swirl(p * 1.6);
    acc += (curl - heading * dot(curl, heading)) * min(pace, 2.0) * 1.8;
  }

  if (uKick.z > 0.0) {
    vec3 jolt = vec3(random(id * 7u + 12u), random(id * 7u + 13u), random(id * 7u + 14u)) - 0.5;
    float near = exp(-dot(p.xy - uKick.xy, p.xy - uKick.xy) / 0.4);
    vec3 spinKick = vec3(-p.z, 0.0, p.x) * 0.9;
    vec3 lift = vec3(0.0, 0.5 + 0.8 * random(id * 7u + 15u), 0.0) * (0.3 + 0.7 * smoothstep(0.2, -0.8, p.y));
    v += (jolt * 0.8 + spinKick + lift) * uKick.z * (0.4 + 0.45 * near);
  }

  v += acc * uDt;
  o += v * uDt;
  vec3 q = base + o;
  float len = length(q);
  if (len > 0.97) {
    vec3 n = q / len;
    o -= n * (len - 0.97);
    v -= n * max(dot(v, n), 0.0) * 1.5;
  }
  outOffset = vec4(o, 1.0);
  outVelocity = vec4(v, 1.0);
}
`,ss=`#version 300 es
precision highp float;

uniform sampler2D tScene;
uniform float uLight;
uniform float uDecode;

in vec2 vUv;
out vec4 fragColor;

vec3 soften(vec3 x) {
  vec3 over = max(x - 0.6, 0.0);
  return min(x, 0.6) + 0.4 * (1.0 - exp(-over / 0.4));
}

void main() {
  vec4 scene = texture(tScene, vUv) * uDecode;
  vec3 light = max(scene.rgb, 0.0);
  float peak = max(light.r, max(light.g, light.b));
  if (uLight > 0.5) {
    vec3 hue = light / max(peak, 1e-4);
    float cover = 1.0 - exp(-peak * 2.4);
    vec3 ink = hue * mix(0.92, 0.72, cover);
    float core = clamp(scene.a * 0.7, 0.0, 1.0) * cover;
    vec3 tint = mix(vec3(1.0), hue, 0.22);
    fragColor = vec4(tint * core + ink * cover * (1.0 - core), core + cover * (1.0 - core));
    return;
  }
  light += vec3(max(peak - 1.8, 0.0) * 0.25);
  vec3 shown = soften(light);
  fragColor = vec4(shown, max(shown.r, max(shown.g, shown.b)));
}
`,ns={preset:"plasma",theme:"dark",size:.7,speed:1,interactive:!0,hoverStrength:.7,intro:!0,paused:!1},as=["strands","crackle","flares","glow","sparks","particleCount","fill","motion","particleShape","depth","sway","twinkle","haze","dustSpeed"];function ls(t,e={}){let i={...ns,...e},r=null,s=null,n=()=>{let c=lr[i.preset]||lr.plasma,o=u=>i[u]===void 0||i[u]===null?c[u]:i[u],f=i.theme==="light";r={light:f,palette:$r(Qr(o("color"),[.95,.36,.82]),f),size:i.size,speed:i.speed,interactive:i.interactive,hoverStrength:i.hoverStrength,intro:i.intro,paused:i.paused},as.forEach(u=>r[u]=o(u))},a=c=>{i={...i,...c},n(),s&&s()};n();let l={supported:!1,set:c=>{i={...i,...c}},destroy(){}};t.classList.add("crystalized-ball");try{return h()}catch(c){return console.warn("CrystalizedBall:",c),l}function h(){var Lt,Nt,It;let c=new Fe({alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1}),o=c.gl;if(!c.isWebgl2)return(Lt=o.getExtension("WEBGL_lose_context"))==null||Lt.loseContext(),l;let f=o.canvas;f.style.display="block",f.style.width="100%",f.style.height="100%",f.setAttribute("aria-hidden","true"),t.appendChild(f);let u=!!o.getExtension("EXT_color_buffer_float"),d=u||!!o.getExtension("EXT_color_buffer_half_float"),p=d?1:.25,g=new Te(o),m=new ie(o),v=Kr(),_=new Ee(o,{width:1,height:1,depth:!1,type:d?o.HALF_FLOAT:o.UNSIGNED_BYTE,format:o.RGBA,internalFormat:d?o.RGBA16F:o.RGBA,minFilter:o.NEAREST,magFilter:o.NEAREST}),y=new Array(pt*4).fill(0),x={uCenter:{value:[0,0]},uRadius:{value:1},uDpr:{value:1},uLine:{value:.6},uTime:{value:0},uFrame:{value:0},uBins:{value:420},uStrands:{value:5},uCrackle:{value:.6},uFlares:{value:.5},uGlow:{value:.8},uHaze:{value:.7},uFill:{value:.5},uPresence:{value:0},uUnfold:{value:0},uBloom:{value:0},uInside:{value:0},uEncode:{value:p},uRim:{value:[1,1,1]},uRimHot:{value:[1,1,1]},uRimMid:{value:[1,1,1]},uRimDeep:{value:[1,1,1]},uSpark:{value:[1,1,1]},uSparkGlow:{value:[1,1,1]},uHazeColor:{value:[0,0,0]},uEdgeColor:{value:[0,0,0]},uHeat:{value:[0,0,0,0]},uHarmonics:{value:v.harmonics},uRates:{value:v.rates},uPhases:{value:v.phases},uFlareHarmonics:{value:v.flareHarmonics},uFlareRates:{value:v.flareRates},uFlarePhases:{value:v.flarePhases},uArcs:{value:y}},M={uDustTime:{value:0},uTurn:{value:[0,0]},uMotion:{value:0},uFill:x.uFill,tHome:{value:m},tSeed:{value:m}},w={...M,tOffset:{value:m},uStirred:{value:0},uCenter:x.uCenter,uViewport:{value:[1,1]},uRadius:x.uRadius,uDpr:x.uDpr,uDepth:{value:.6},uTwinkle:{value:.5},uPointScale:{value:1},uReveal:{value:0},uEncode:{value:p},uTones:{value:new Array(15).fill(1)},uRimTone:{value:[1,1,1]},uShape:{value:0}},R={...M,tOffset:{value:m},tVelocity:{value:m},uDt:{value:.016},uReset:{value:1},uBrush:{value:[0,0,0,0]},uBrushPower:{value:0},uKick:{value:[0,0,0,0]}},P={tScene:{value:_.texture},uLight:{value:0},uDecode:{value:1/p}},L=A=>(A.setBlendFunc(o.ONE,o.ONE),A),z=new ae(o,{geometry:g,program:L(new ne(o,{vertex:mt,fragment:es,uniforms:x,transparent:!0,depthTest:!1,depthWrite:!1}))}),I=L(new ne(o,{vertex:ts,fragment:is,uniforms:w,transparent:!0,depthTest:!1,depthWrite:!1})),b=d?new ae(o,{geometry:g,program:new ne(o,{vertex:mt,fragment:rs,uniforms:R,depthTest:!1,depthWrite:!1})}):null,B=new ae(o,{geometry:g,program:new ne(o,{vertex:mt,fragment:ss,uniforms:P,depthTest:!1,depthWrite:!1})}),F=A=>{A&&(o.deleteFramebuffer(A.buffer),A.textures.forEach(E=>o.deleteTexture(E.texture)))},se=A=>new Ee(o,{width:le,height:A,color:2,depth:!1,type:u?o.FLOAT:o.HALF_FLOAT,format:o.RGBA,internalFormat:u?o.RGBA32F:o.RGBA16F,minFilter:o.NEAREST,magFilter:o.NEAREST}),yt=(A,E)=>new ie(o,{image:A,width:le,height:E,type:o.FLOAT,format:o.RGBA,internalFormat:o.RGBA32F,minFilter:o.NEAREST,magFilter:o.NEAREST,generateMipmaps:!1,flipY:!1}),D=null,wt=()=>{D&&(D.mesh.geometry.remove(),o.deleteTexture(D.home.texture),o.deleteTexture(D.seed.texture),F(D.read),F(D.write),D=null)},Mt=()=>{!b||!D||!D.read||!D.write||(R.tOffset.value=m,R.tVelocity.value=m,R.uReset.value=1,c.render({scene:b,target:D.read,clear:!1}),c.render({scene:b,target:D.write,clear:!1}),R.uReset.value=0)},dr=A=>{let E=C(Math.round(A/100)*100,0,qr);if(D&&D.requested===E)return;if(wt(),!E){D=null;return}let T=Jr(E),q=new Float32Array(T.count);for(let Z=0;Z<T.count;Z++)q[Z]=Z;let X=new ge(o,{aIndex:{size:1,data:q}});D={requested:E,rows:T.rows,home:yt(T.home,T.rows),seed:yt(T.seed,T.rows),mesh:new ae(o,{mode:o.POINTS,geometry:X,program:I}),read:b?se(T.rows):null,write:b?se(T.rows):null},M.tHome.value=D.home,M.tSeed.value=D.seed,Mt(),he=0},Re=(It=(Nt=window.matchMedia)==null?void 0:Nt.call(window,"(prefers-reduced-motion: reduce)").matches)!=null?It:!1,H=vt(913),K=1,J=1,Me=0,Oe=performance.now(),Ue=0,Ft=0,Ve=0,ee=0,Ae=!0,Ge=!0,j=0,he=0,He=0,oe=null,qe=.3,ce=[],k={x:0,y:0,inside:!1,fresh:!0},S={angle:0,velocity:0,power:0,near:0},N={x:0,y:0,vx:0,vy:0},O={x:0,y:0,vx:0,vy:0},Xe=!1,pr=()=>{K=Math.max(1,t.clientWidth),J=Math.max(1,t.clientHeight),c.dpr=Math.min(window.devicePixelRatio||1,2,Math.sqrt(Xr/(K*J))),c.setSize(K,J),_.setSize(o.canvas.width,o.canvas.height)},Tt=()=>{Xe=!0,fe()},We=(A,E)=>{ce.length>=pt||ce.push({start:A,span:(.05+H()*.07)*(H()<.5?-1:1),curl:.02+H()*.04,life:0,duration:.2+H()*.2,drift:(H()-.5)*.3,strength:E})},_t=A=>{var qt,Xt;if(Me=0,Xe&&(Xe=!1,pr()),!Ge)return;let E=r,T=Math.min(.05,Math.max(1/240,(A-Oe)/1e3));if(Oe=A,!E)return;let q=!E.paused&&!Re;ee=E.intro&&!Re?Math.min(1,ee+T/Wr):1;let X=hr(re(0,.42,ee)),Z=hr(re(0,.32,ee)),Ye=Math.sin(Math.PI*re(.22,.78,ee))*.35,W=Math.max(8,C(E.size,.1,1.5)*Math.min(K,J)/2),me=E.interactive&&!Re?C(E.hoverStrength,0,1):0,Se=k.x-K/2,Ce=J/2-k.y,gr=Math.hypot(Se,Ce),Qe=k.inside?me:0;S.power<.02&&(S.angle=Math.atan2(Ce,Se),S.velocity=0);let mr=or(Math.atan2(Ce,Se)-S.angle);S.velocity+=(120*mr-19*S.velocity)*T,S.angle=or(S.angle+S.velocity*T),S.power+=(Qe-S.power)*(1-Math.exp(-T/(Qe>S.power?.3:.55)));let xr=Math.exp(-Math.pow((gr-W)/(W*.45),2));S.near+=(xr-S.near)*(1-Math.exp(-T/.15)),j*=Math.exp(-T/.7);let xe=Se/W,ve=Ce/W;Math.hypot(xe-N.x,ve-N.y)>.6&&(k.fresh=!0),k.fresh&&(N.x=xe,N.y=ve,N.vx=0,N.vy=0,k.fresh=!1);let Bt=1-Math.exp(-T/.05);N.vx+=((xe-N.x)/T-N.vx)*Bt,N.vy+=((ve-N.y)/T-N.vy)*Bt,N.x=xe,N.y=ve;let je=Math.hypot(N.vx,N.vy),kt=je>4?4/je:1,vr=Math.exp(-Math.max(0,Math.hypot(xe,ve)-1)*6),Ot=k.inside?me*vr*X:0;if(He=He*Math.exp(-T/1.2)+Ot*Math.min(je,4)*T,q){let Y=1+j*.6+S.power*S.near*.3,U=T*Math.max(0,E.speed)*2*Y;Ue+=U,Ft+=T*Math.max(0,E.dustSpeed)*(1+j*.4),Ve+=T*Math.max(0,E.dustSpeed);let yr=C(E.crackle+j*.5,0,1.5);if(E.sparks>.01&&ee>.55&&(qe-=U*E.sparks*2*(.6+yr*.6),qe<=0)){let ue=S.power*S.near,de=H()<ue*.7?S.angle+(H()-.5)*.8:H()<.7?Math.PI/2+(H()-.5)*1.5:H()*Math.PI*2;We(de,.8+ue*.6+j*.4),qe=.15+H()*.6}for(let ue=ce.length-1;ue>=0;ue--){let de=ce[ue];de.life+=U,de.start+=de.drift*U,de.life>=de.duration&&ce.splice(ue,1)}}else ce.length=0;for(let Y=0;Y<pt;Y++){let U=ce[Y];y[Y*4]=U?U.start:0,y[Y*4+1]=U?U.span:0,y[Y*4+2]=U?U.curl:0,y[Y*4+3]=U?Math.sin(Math.PI*U.life/U.duration)*U.strength:0}dr(E.particleCount);let $=E.palette;x.uCenter.value=[K/2,J/2],x.uRadius.value=W,x.uDpr.value=c.dpr,x.uLine.value=Math.max(.6,W*.0035),x.uTime.value=Ue,x.uFrame.value=Math.floor(Ue*24)%1e5,x.uBins.value=C(Math.round(Math.PI*2*W/2.6),240,900),x.uStrands.value=Math.round(C(E.strands,1,fr)),x.uCrackle.value=C(E.crackle,0,1)+j*.5+Ye,x.uFlares.value=C(E.flares,0,1),x.uGlow.value=C(E.glow,0,2)*(1+j*.5+Ye)*(E.light?.35:1),x.uHaze.value=C(E.haze,0,2)*(E.light?.6:1),x.uFill.value=C(E.fill,0,1),x.uPresence.value=X,x.uUnfold.value=Z,x.uBloom.value=X*X,x.uInside.value=re(.2,.95,ee),x.uRim.value=$.rim,x.uRimHot.value=$.rimHot,x.uRimMid.value=$.rimMid,x.uRimDeep.value=$.rimDeep,x.uSpark.value=$.spark,x.uSparkGlow.value=$.sparkGlow,x.uHazeColor.value=$.haze,x.uEdgeColor.value=$.edge,x.uHeat.value=[S.angle,S.near,S.power*X,0],M.uDustTime.value=Ft;let Ut=k.inside?me*X:0,Vt=C(xe,-1.6,1.6)*Ut,Gt=C(ve,-1.6,1.6)*Ut;O.vx+=(40*(Vt-O.x)-11*O.vx)*T,O.vy+=(40*(Gt-O.y)-11*O.vy)*T,O.x+=O.vx*T,O.y+=O.vy*T;let Ht=C(E.sway,0,1);M.uTurn.value=[Ht*.42*Math.sin(Ve*.23)+O.x*.3,Ht*.12*Math.sin(Ve*.17+1.3)-O.y*.16],M.uMotion.value=(qt=Gr[E.motion])!=null?qt:0,w.uViewport.value=[K,J],w.uDepth.value=C(E.depth,0,1),w.uTwinkle.value=C(E.twinkle,0,1),w.uPointScale.value=Math.max(1,W/491),w.uReveal.value=re(.18,1,ee),w.uTones.value=$.tones.flat(),w.uRimTone.value=$.rim,w.uShape.value=(Xt=Hr[E.particleShape])!=null?Xt:0;let V=D;V&&b&&(He>.002||oe)&&(he=Yr);let Ze=!1;if(V&&V.read&&V.write&&b&&he>0){R.uDt.value=Math.min(T,1/30),R.uBrush.value=[N.x,N.y,N.vx*kt,N.vy*kt],R.uBrushPower.value=Ot,R.uKick.value=oe?[oe.x,oe.y,oe.strength,0]:[0,0,0,0],R.tOffset.value=V.read.textures[0],R.tVelocity.value=V.read.textures[1],c.render({scene:b,target:V.write,clear:!1});let Y=V.read;V.read=V.write,V.write=Y,he-=T,Ze=he>0,Ze||(he=0,Mt())}oe=null,w.uStirred.value=Ze?1:0,w.tOffset.value=V&&V.read?V.read.textures[0]:m,o.clearColor(0,0,0,0),c.render({scene:z,target:_,clear:!0}),D&&c.render({scene:D.mesh,target:_,clear:!1}),P.uLight.value=E.light?1:0,c.render({scene:B,clear:!1});let Er=Math.abs(Qe-S.power)>.002||j>.002||he>0||Math.abs(S.velocity)>.01||Math.hypot(O.vx,O.vy,O.x-Vt,O.y-Gt)>.001;Ae&&(q||ee<1||Er)&&(Me=requestAnimationFrame(_t))},fe=()=>{Me||!Ae||!Ge||(Oe=performance.now(),Me=requestAnimationFrame(_t))},Rt=A=>{let E=t.getBoundingClientRect(),T=A.clientX-E.left,q=A.clientY-E.top;return{x:T,y:q,inside:T>=0&&q>=0&&T<=E.width&&q<=E.height}},At=A=>{let E=Rt(A);E.inside&&!k.inside&&(k.fresh=!0),k.x=E.x,k.y=E.y,k.inside=E.inside,E.inside&&fe()},bt=A=>{let E=r,T=Rt(A);if(!E||!E.interactive||Re||!T.inside)return;k.inside||(k.fresh=!0),k.x=T.x,k.y=T.y,k.inside=!0;let q=Math.max(8,C(E.size,.1,1.5)*Math.min(K,J)/2),X=(T.x-K/2)/q,Z=(J/2-T.y)/q;if(Math.hypot(X,Z)>1.3)return;let W=C(E.hoverStrength,0,1);oe={x:X,y:Z,strength:W*1.2},j=Math.max(j,W);let me=Math.atan2(Z,X);We(me+(H()-.5)*.5,1.3),We(me+Math.PI+(H()-.5)*1.2,1.1),fe()},be=()=>{k.inside=!1,fe()},St=A=>{A.relatedTarget||be()},Ct=A=>{A.pointerType==="touch"&&be()},zt=()=>{document.hidden||fe()};window.addEventListener("pointermove",At,{passive:!0}),window.addEventListener("pointerdown",bt,{passive:!0}),window.addEventListener("pointerout",St,{passive:!0}),window.addEventListener("pointerup",Ct,{passive:!0}),window.addEventListener("blur",be),document.addEventListener("visibilitychange",zt);let Dt=new ResizeObserver(Tt);Dt.observe(t);let Pt=new IntersectionObserver(([A])=>{Ae=A.isIntersecting,fe()});return Pt.observe(t),s=fe,Tt(),{supported:!0,set:a,destroy:()=>{var A;Ge=!1,Ae=!1,cancelAnimationFrame(Me),Dt.disconnect(),Pt.disconnect(),window.removeEventListener("pointermove",At),window.removeEventListener("pointerdown",bt),window.removeEventListener("pointerout",St),window.removeEventListener("pointerup",Ct),window.removeEventListener("blur",be),document.removeEventListener("visibilitychange",zt),s=null,wt(),F(_),(A=o.getExtension("WEBGL_lose_context"))==null||A.loseContext(),f.parentNode&&f.parentNode.removeChild(f)}}}}return Rr(hs);})();
