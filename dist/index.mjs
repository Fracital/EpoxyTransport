// <data:text/javascript;base64,CmV4cG9ydCBmdW5jdGlvbiB3c19wcm90b2Nv...>
function ws_protocol() {
  return ("10000000-1000-4000-8000" + -1e11).replace(
    /[018]/g,
    (c) => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
function object_get(obj, k) {
  try {
    return obj[k];
  } catch (x) {
    return void 0;
  }
}
function object_set(obj, k, v) {
  try {
    obj[k] = v;
  } catch {
  }
}
async function convert_body_inner(body) {
  let req = new Request("", { method: "POST", duplex: "half", body });
  let type = req.headers.get("content-type");
  return [new Uint8Array(await req.arrayBuffer()), type];
}
async function convert_streaming_body_inner(body) {
  try {
    let req = new Request("", { method: "POST", body });
    let type = req.headers.get("content-type");
    return [false, new Uint8Array(await req.arrayBuffer()), type];
  } catch (x) {
    let req = new Request("", { method: "POST", duplex: "half", body });
    let type = req.headers.get("content-type");
    return [true, req.body, type];
  }
}
function entries_of_object_inner(obj) {
  return Object.entries(obj).map((x) => x.map(String));
}
function define_property(obj, k, v) {
  Object.defineProperty(obj, k, { value: v, writable: false });
}
function ws_key() {
  let key = new Uint8Array(16);
  crypto.getRandomValues(key);
  return btoa(String.fromCharCode.apply(null, key));
}
function from_entries(entries) {
  var ret = {};
  for (var i = 0; i < entries.length; i++) ret[entries[i][0]] = entries[i][1];
  return ret;
}

// ../epoxy-tls/client/full/epoxy.js
var wasm;
var heap = new Array(128).fill(void 0);
heap.push(void 0, null, true, false);
function getObject(idx) {
  return heap[idx];
}
var heap_next = heap.length;
function addHeapObject(obj) {
  if (heap_next === heap.length) heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}
function isLikeNone(x) {
  return x === void 0 || x === null;
}
function handleError(f, args) {
  try {
    return f.apply(this, args);
  } catch (e) {
    wasm.__wbindgen_exn_store(addHeapObject(e));
  }
}
function dropObject(idx) {
  if (idx < 132) return;
  heap[idx] = heap_next;
  heap_next = idx;
}
function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
var cachedTextDecoder = typeof TextDecoder !== "undefined" ? new TextDecoder("utf-8", { ignoreBOM: true, fatal: true }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
if (typeof TextDecoder !== "undefined") {
  cachedTextDecoder.decode();
}
var cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
  if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
    cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8ArrayMemory0;
}
function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}
var cachedDataViewMemory0 = null;
function getDataViewMemory0() {
  if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || cachedDataViewMemory0.buffer.detached === void 0 && cachedDataViewMemory0.buffer !== wasm.memory.buffer) {
    cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
  }
  return cachedDataViewMemory0;
}
var WASM_VECTOR_LEN = 0;
function passArrayJsValueToWasm0(array, malloc) {
  const ptr = malloc(array.length * 4, 4) >>> 0;
  const mem = getDataViewMemory0();
  for (let i = 0; i < array.length; i++) {
    mem.setUint32(ptr + 4 * i, addHeapObject(array[i]), true);
  }
  WASM_VECTOR_LEN = array.length;
  return ptr;
}
var cachedTextEncoder = typeof TextEncoder !== "undefined" ? new TextEncoder("utf-8") : { encode: () => {
  throw Error("TextEncoder not available");
} };
var encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
  return cachedTextEncoder.encodeInto(arg, view);
} : function(arg, view) {
  const buf = cachedTextEncoder.encode(arg);
  view.set(buf);
  return {
    read: arg.length,
    written: buf.length
  };
};
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length, 1) >>> 0;
    getUint8ArrayMemory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len, 1) >>> 0;
  const mem = getUint8ArrayMemory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127) break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
    const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);
    offset += ret.written;
    ptr = realloc(ptr, len, offset, 1) >>> 0;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
function getArrayU8FromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
var CLOSURE_DTORS = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((state) => {
  wasm.__wbindgen_export_3.get(state.dtor)(state.a, state.b);
});
function makeMutClosure(arg0, arg1, dtor, f) {
  const state = { a: arg0, b: arg1, cnt: 1, dtor };
  const real = (...args) => {
    state.cnt++;
    const a = state.a;
    state.a = 0;
    try {
      return f(a, state.b, ...args);
    } finally {
      if (--state.cnt === 0) {
        wasm.__wbindgen_export_3.get(state.dtor)(a, state.b);
        CLOSURE_DTORS.unregister(state);
      } else {
        state.a = a;
      }
    }
  };
  real.original = state;
  CLOSURE_DTORS.register(real, state, state);
  return real;
}
function makeClosure(arg0, arg1, dtor, f) {
  const state = { a: arg0, b: arg1, cnt: 1, dtor };
  const real = (...args) => {
    state.cnt++;
    try {
      return f(state.a, state.b, ...args);
    } finally {
      if (--state.cnt === 0) {
        wasm.__wbindgen_export_3.get(state.dtor)(state.a, state.b);
        state.a = 0;
        CLOSURE_DTORS.unregister(state);
      }
    }
  };
  real.original = state;
  CLOSURE_DTORS.register(real, state, state);
  return real;
}
function debugString(val) {
  const type = typeof val;
  if (type == "number" || type == "boolean" || val == null) {
    return `${val}`;
  }
  if (type == "string") {
    return `"${val}"`;
  }
  if (type == "symbol") {
    const description = val.description;
    if (description == null) {
      return "Symbol";
    } else {
      return `Symbol(${description})`;
    }
  }
  if (type == "function") {
    const name = val.name;
    if (typeof name == "string" && name.length > 0) {
      return `Function(${name})`;
    } else {
      return "Function";
    }
  }
  if (Array.isArray(val)) {
    const length = val.length;
    let debug = "[";
    if (length > 0) {
      debug += debugString(val[0]);
    }
    for (let i = 1; i < length; i++) {
      debug += ", " + debugString(val[i]);
    }
    debug += "]";
    return debug;
  }
  const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
  let className;
  if (builtInMatches && builtInMatches.length > 1) {
    className = builtInMatches[1];
  } else {
    return toString.call(val);
  }
  if (className == "Object") {
    try {
      return "Object(" + JSON.stringify(val) + ")";
    } catch (_) {
      return "Object";
    }
  }
  if (val instanceof Error) {
    return `${val.name}: ${val.message}
${val.stack}`;
  }
  return className;
}
function getArrayJsValueFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  const mem = getDataViewMemory0();
  const result = [];
  for (let i = ptr; i < ptr + 4 * len; i += 4) {
    result.push(takeObject(mem.getUint32(i, true)));
  }
  return result;
}
function _assertClass(instance, klass) {
  if (!(instance instanceof klass)) {
    throw new Error(`expected instance of ${klass.name}`);
  }
}
function __wbg_adapter_34(arg0, arg1, arg2) {
  wasm._dyn_core_53f6e1a9155ba422___ops__function__FnMut_______Output______as_wasm_bindgen_6ccdefb7d7690db8___closure__WasmClosure___describe__invoke___wasm_bindgen_6ccdefb7d7690db8___JsValue_____(arg0, arg1, addHeapObject(arg2));
}
function __wbg_adapter_37(arg0, arg1, arg2) {
  const ret = wasm._dyn_core_53f6e1a9155ba422___ops__function__Fn_______Output______as_wasm_bindgen_6ccdefb7d7690db8___closure__WasmClosure___describe__invoke___wasm_bindgen_6ccdefb7d7690db8___JsValue__js_sys_6ecba7b8a31a842___Promise_(arg0, arg1, addHeapObject(arg2));
  return takeObject(ret);
}
function __wbg_adapter_40(arg0, arg1, arg2) {
  wasm._dyn_core_53f6e1a9155ba422___ops__function__Fn_______Output______as_wasm_bindgen_6ccdefb7d7690db8___closure__WasmClosure___describe__invoke___wasm_bindgen_6ccdefb7d7690db8___JsValue_____(arg0, arg1, addHeapObject(arg2));
}
function __wbg_adapter_45(arg0, arg1) {
  const ret = wasm._dyn_core_53f6e1a9155ba422___ops__function__Fn_____Output______as_wasm_bindgen_6ccdefb7d7690db8___closure__WasmClosure___describe__invoke___wasm_bindgen_6ccdefb7d7690db8___JsValue_(arg0, arg1);
  return takeObject(ret);
}
function __wbg_adapter_48(arg0, arg1) {
  wasm._dyn_core_53f6e1a9155ba422___ops__function__Fn_____Output______as_wasm_bindgen_6ccdefb7d7690db8___closure__WasmClosure___describe__invoke______(arg0, arg1);
}
function __wbg_adapter_51(arg0, arg1) {
  wasm._dyn_core_53f6e1a9155ba422___ops__function__FnMut_____Output______as_wasm_bindgen_6ccdefb7d7690db8___closure__WasmClosure___describe__invoke______(arg0, arg1);
}
function __wbg_adapter_163(arg0, arg1, arg2, arg3) {
  wasm.wasm_bindgen_6ccdefb7d7690db8___convert__closures__invoke2_mut___wasm_bindgen_6ccdefb7d7690db8___JsValue__wasm_bindgen_6ccdefb7d7690db8___JsValue_____(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}
var __wbindgen_enum_BinaryType = ["blob", "arraybuffer"];
var EpoxyClientFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_epoxyclient_free(ptr >>> 0, 1));
var EpoxyClient = class {
  toJSON() {
    return {
      redirect_limit: this.redirect_limit,
      user_agent: this.user_agent,
      buffer_size: this.buffer_size
    };
  }
  toString() {
    return JSON.stringify(this);
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    EpoxyClientFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_epoxyclient_free(ptr, 0);
  }
  /**
   * @returns {number}
   */
  get redirect_limit() {
    const ret = wasm.__wbg_get_epoxyclient_redirect_limit(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} arg0
   */
  set redirect_limit(arg0) {
    wasm.__wbg_set_epoxyclient_redirect_limit(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {string}
   */
  get user_agent() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_epoxyclient_user_agent(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @param {string} arg0
   */
  set user_agent(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_epoxyclient_user_agent(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @returns {number}
   */
  get buffer_size() {
    const ret = wasm.__wbg_get_epoxyclient_buffer_size(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} arg0
   */
  set buffer_size(arg0) {
    wasm.__wbg_set_epoxyclient_buffer_size(this.__wbg_ptr, arg0);
  }
  /**
   * @param {EpoxyUrlInput} url
   * @returns {Promise<EpoxyIoStream>}
   */
  connect_tcp(url) {
    const ret = wasm.epoxyclient_connect_tcp(this.__wbg_ptr, addHeapObject(url));
    return takeObject(ret);
  }
  /**
   * @param {EpoxyUrlInput} url
   * @returns {Promise<EpoxyIoStream>}
   */
  connect_tls(url) {
    const ret = wasm.epoxyclient_connect_tls(this.__wbg_ptr, addHeapObject(url));
    return takeObject(ret);
  }
  /**
   * @param {EpoxyUrlInput} url
   * @returns {Promise<EpoxyIoStream>}
   */
  connect_udp(url) {
    const ret = wasm.epoxyclient_connect_udp(this.__wbg_ptr, addHeapObject(url));
    return takeObject(ret);
  }
  /**
   * @param {EpoxyHandlers} handlers
   * @param {EpoxyUrlInput} url
   * @param {string[]} protocols
   * @param {EpoxyWebSocketHeadersInput} headers
   * @returns {Promise<EpoxyWebSocket>}
   */
  connect_websocket(handlers, url, protocols, headers) {
    _assertClass(handlers, EpoxyHandlers);
    var ptr0 = handlers.__destroy_into_raw();
    const ptr1 = passArrayJsValueToWasm0(protocols, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ret = wasm.epoxyclient_connect_websocket(this.__wbg_ptr, ptr0, addHeapObject(url), ptr1, len1, addHeapObject(headers));
    return takeObject(ret);
  }
  /**
   * @returns {Promise<void>}
   */
  replace_stream_provider() {
    const ret = wasm.epoxyclient_replace_stream_provider(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @param {EpoxyUrlInput} url
   * @param {object} options
   * @returns {Promise<Response>}
   */
  fetch(url, options) {
    const ret = wasm.epoxyclient_fetch(this.__wbg_ptr, addHeapObject(url), addHeapObject(options));
    return takeObject(ret);
  }
  /**
   * @param {EpoxyWispTransport} transport
   * @param {EpoxyClientOptions} options
   */
  constructor(transport, options) {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      _assertClass(options, EpoxyClientOptions);
      var ptr0 = options.__destroy_into_raw();
      wasm.epoxyclient_new(retptr, addHeapObject(transport), ptr0);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
      if (r2) {
        throw takeObject(r1);
      }
      this.__wbg_ptr = r0 >>> 0;
      EpoxyClientFinalization.register(this, this.__wbg_ptr, this);
      return this;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
};
var EpoxyClientOptionsFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_epoxyclientoptions_free(ptr >>> 0, 1));
var EpoxyClientOptions = class {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    EpoxyClientOptionsFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_epoxyclientoptions_free(ptr, 0);
  }
  /**
   * @returns {boolean}
   */
  get wisp_v2() {
    const ret = wasm.__wbg_get_epoxyclientoptions_wisp_v2(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @param {boolean} arg0
   */
  set wisp_v2(arg0) {
    wasm.__wbg_set_epoxyclientoptions_wisp_v2(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {boolean}
   */
  get udp_extension_required() {
    const ret = wasm.__wbg_get_epoxyclientoptions_udp_extension_required(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @param {boolean} arg0
   */
  set udp_extension_required(arg0) {
    wasm.__wbg_set_epoxyclientoptions_udp_extension_required(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {boolean}
   */
  get title_case_headers() {
    const ret = wasm.__wbg_get_epoxyclientoptions_title_case_headers(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @param {boolean} arg0
   */
  set title_case_headers(arg0) {
    wasm.__wbg_set_epoxyclientoptions_title_case_headers(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {boolean}
   */
  get ws_title_case_headers() {
    const ret = wasm.__wbg_get_epoxyclientoptions_ws_title_case_headers(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @param {boolean} arg0
   */
  set ws_title_case_headers(arg0) {
    wasm.__wbg_set_epoxyclientoptions_ws_title_case_headers(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {string[]}
   */
  get websocket_protocols() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_epoxyclientoptions_websocket_protocols(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4, 4);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string[]} arg0
   */
  set websocket_protocols(arg0) {
    const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_epoxyclientoptions_websocket_protocols(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @returns {number}
   */
  get redirect_limit() {
    const ret = wasm.__wbg_get_epoxyclientoptions_redirect_limit(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} arg0
   */
  set redirect_limit(arg0) {
    wasm.__wbg_set_epoxyclientoptions_redirect_limit(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get header_limit() {
    const ret = wasm.__wbg_get_epoxyclientoptions_header_limit(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} arg0
   */
  set header_limit(arg0) {
    wasm.__wbg_set_epoxyclientoptions_header_limit(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {string}
   */
  get user_agent() {
    let deferred1_0;
    let deferred1_1;
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_epoxyclientoptions_user_agent(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      deferred1_0 = r0;
      deferred1_1 = r1;
      return getStringFromWasm0(r0, r1);
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
      wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
    }
  }
  /**
   * @param {string} arg0
   */
  set user_agent(arg0) {
    const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_epoxyclientoptions_user_agent(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @returns {string[]}
   */
  get pem_files() {
    try {
      const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
      wasm.__wbg_get_epoxyclientoptions_pem_files(retptr, this.__wbg_ptr);
      var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
      var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
      var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
      wasm.__wbindgen_free(r0, r1 * 4, 4);
      return v1;
    } finally {
      wasm.__wbindgen_add_to_stack_pointer(16);
    }
  }
  /**
   * @param {string[]} arg0
   */
  set pem_files(arg0) {
    const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    wasm.__wbg_set_epoxyclientoptions_pem_files(this.__wbg_ptr, ptr0, len0);
  }
  /**
   * @returns {boolean}
   */
  get disable_certificate_validation() {
    const ret = wasm.__wbg_get_epoxyclientoptions_disable_certificate_validation(this.__wbg_ptr);
    return ret !== 0;
  }
  /**
   * @param {boolean} arg0
   */
  set disable_certificate_validation(arg0) {
    wasm.__wbg_set_epoxyclientoptions_disable_certificate_validation(this.__wbg_ptr, arg0);
  }
  /**
   * @returns {number}
   */
  get buffer_size() {
    const ret = wasm.__wbg_get_epoxyclientoptions_buffer_size(this.__wbg_ptr);
    return ret >>> 0;
  }
  /**
   * @param {number} arg0
   */
  set buffer_size(arg0) {
    wasm.__wbg_set_epoxyclientoptions_buffer_size(this.__wbg_ptr, arg0);
  }
  /**
   * r" `(host) => Promise<Uint8Array | null>`: the ECHConfigList of
   * r" the host's HTTPS DNS record (RFC 9460 `ech`), asked before a
   * r" TLS connection to a DNS name opens. With one, the connection
   * r" offers real ECH (RFC 9849) as Chrome does; without, GREASE.
   * @returns {Function | undefined}
   */
  get ech_resolver() {
    const ret = wasm.__wbg_get_epoxyclientoptions_ech_resolver(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * r" `(host) => Promise<Uint8Array | null>`: the ECHConfigList of
   * r" the host's HTTPS DNS record (RFC 9460 `ech`), asked before a
   * r" TLS connection to a DNS name opens. With one, the connection
   * r" offers real ECH (RFC 9849) as Chrome does; without, GREASE.
   * @param {Function | null} [arg0]
   */
  set ech_resolver(arg0) {
    wasm.__wbg_set_epoxyclientoptions_ech_resolver(this.__wbg_ptr, isLikeNone(arg0) ? 0 : addHeapObject(arg0));
  }
  constructor() {
    const ret = wasm.epoxyclientoptions_new_default();
    this.__wbg_ptr = ret >>> 0;
    EpoxyClientOptionsFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
};
var EpoxyHandlersFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_epoxyhandlers_free(ptr >>> 0, 1));
var EpoxyHandlers = class {
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    EpoxyHandlersFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_epoxyhandlers_free(ptr, 0);
  }
  /**
   * @returns {Function}
   */
  get onopen() {
    const ret = wasm.__wbg_get_epoxyhandlers_onopen(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @param {Function} arg0
   */
  set onopen(arg0) {
    wasm.__wbg_set_epoxyhandlers_onopen(this.__wbg_ptr, addHeapObject(arg0));
  }
  /**
   * @returns {Function}
   */
  get onclose() {
    const ret = wasm.__wbg_get_epoxyhandlers_onclose(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @param {Function} arg0
   */
  set onclose(arg0) {
    wasm.__wbg_set_epoxyhandlers_onclose(this.__wbg_ptr, addHeapObject(arg0));
  }
  /**
   * @returns {Function}
   */
  get onerror() {
    const ret = wasm.__wbg_get_epoxyhandlers_onerror(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @param {Function} arg0
   */
  set onerror(arg0) {
    wasm.__wbg_set_epoxyhandlers_onerror(this.__wbg_ptr, addHeapObject(arg0));
  }
  /**
   * @returns {Function}
   */
  get onmessage() {
    const ret = wasm.__wbg_get_epoxyhandlers_onmessage(this.__wbg_ptr);
    return takeObject(ret);
  }
  /**
   * @param {Function} arg0
   */
  set onmessage(arg0) {
    wasm.__wbg_set_epoxyhandlers_onmessage(this.__wbg_ptr, addHeapObject(arg0));
  }
  /**
   * @param {Function} onopen
   * @param {Function} onclose
   * @param {Function} onerror
   * @param {Function} onmessage
   */
  constructor(onopen, onclose, onerror, onmessage) {
    const ret = wasm.epoxyhandlers_new(addHeapObject(onopen), addHeapObject(onclose), addHeapObject(onerror), addHeapObject(onmessage));
    this.__wbg_ptr = ret >>> 0;
    EpoxyHandlersFinalization.register(this, this.__wbg_ptr, this);
    return this;
  }
};
var EpoxyWebSocketFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_epoxywebsocket_free(ptr >>> 0, 1));
var EpoxyWebSocket = class _EpoxyWebSocket {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_EpoxyWebSocket.prototype);
    obj.__wbg_ptr = ptr;
    EpoxyWebSocketFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    EpoxyWebSocketFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_epoxywebsocket_free(ptr, 0);
  }
  /**
   * @param {EpoxyWebSocketInput} payload
   * @returns {Promise<void>}
   */
  send(payload) {
    const ret = wasm.epoxywebsocket_send(this.__wbg_ptr, addHeapObject(payload));
    return takeObject(ret);
  }
  /**
   * @param {number} code
   * @param {string} reason
   * @returns {Promise<void>}
   */
  close(code, reason) {
    const ptr0 = passStringToWasm0(reason, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.epoxywebsocket_close(this.__wbg_ptr, code, ptr0, len0);
    return takeObject(ret);
  }
};
var IntoUnderlyingByteSourceFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_intounderlyingbytesource_free(ptr >>> 0, 1));
var IntoUnderlyingSinkFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_intounderlyingsink_free(ptr >>> 0, 1));
var IntoUnderlyingSink = class _IntoUnderlyingSink {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_IntoUnderlyingSink.prototype);
    obj.__wbg_ptr = ptr;
    IntoUnderlyingSinkFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    IntoUnderlyingSinkFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_intounderlyingsink_free(ptr, 0);
  }
  /**
   * @param {any} reason
   * @returns {Promise<any>}
   */
  abort(reason) {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.intounderlyingsink_abort(ptr, addHeapObject(reason));
    return takeObject(ret);
  }
  /**
   * @returns {Promise<any>}
   */
  close() {
    const ptr = this.__destroy_into_raw();
    const ret = wasm.intounderlyingsink_close(ptr);
    return takeObject(ret);
  }
  /**
   * @param {any} chunk
   * @returns {Promise<any>}
   */
  write(chunk) {
    const ret = wasm.intounderlyingsink_write(this.__wbg_ptr, addHeapObject(chunk));
    return takeObject(ret);
  }
};
var IntoUnderlyingSourceFinalization = typeof FinalizationRegistry === "undefined" ? { register: () => {
}, unregister: () => {
} } : new FinalizationRegistry((ptr) => wasm.__wbg_intounderlyingsource_free(ptr >>> 0, 1));
var IntoUnderlyingSource = class _IntoUnderlyingSource {
  static __wrap(ptr) {
    ptr = ptr >>> 0;
    const obj = Object.create(_IntoUnderlyingSource.prototype);
    obj.__wbg_ptr = ptr;
    IntoUnderlyingSourceFinalization.register(obj, obj.__wbg_ptr, obj);
    return obj;
  }
  __destroy_into_raw() {
    const ptr = this.__wbg_ptr;
    this.__wbg_ptr = 0;
    IntoUnderlyingSourceFinalization.unregister(this);
    return ptr;
  }
  free() {
    const ptr = this.__destroy_into_raw();
    wasm.__wbg_intounderlyingsource_free(ptr, 0);
  }
  /**
   * @param {ReadableStreamDefaultController} controller
   * @returns {Promise<any>}
   */
  pull(controller) {
    const ret = wasm.intounderlyingsource_pull(this.__wbg_ptr, addHeapObject(controller));
    return takeObject(ret);
  }
  cancel() {
    const ptr = this.__destroy_into_raw();
    wasm.intounderlyingsource_cancel(ptr);
  }
};
async function __wbg_load(module2, imports) {
  if (typeof Response === "function" && module2 instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module2, imports);
      } catch (e) {
        if (module2.headers.get("Content-Type") != "application/wasm") {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }
    const bytes = await module2.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module2, imports);
    if (instance instanceof WebAssembly.Instance) {
      return { instance, module: module2 };
    } else {
      return instance;
    }
  }
}
function __wbg_get_imports() {
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbg_at_7d852dd9f194d43e = function(arg0, arg1) {
    const ret = getObject(arg0).at(arg1);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_buffer_09165b52af8c5237 = function(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_buffer_609cc3eee51ed158 = function(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_byobRequest_77d9adf63337edfb = function(arg0) {
    const ret = getObject(arg0).byobRequest;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_byteLength_e674b853d9c77e1d = function(arg0) {
    const ret = getObject(arg0).byteLength;
    return ret;
  };
  imports.wbg.__wbg_byteOffset_fd862df290ef848d = function(arg0) {
    const ret = getObject(arg0).byteOffset;
    return ret;
  };
  imports.wbg.__wbg_call_672a4d21634d4a24 = function() {
    return handleError(function(arg0, arg1) {
      const ret = getObject(arg0).call(getObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_call_7cccdd69e0791ae2 = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_call_833bed5770ea2041 = function() {
    return handleError(function(arg0, arg1, arg2, arg3) {
      const ret = getObject(arg0).call(getObject(arg1), getObject(arg2), getObject(arg3));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_cancel_8a308660caa6cadf = function(arg0) {
    const ret = getObject(arg0).cancel();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_catch_a6e601879b2610e9 = function(arg0, arg1) {
    const ret = getObject(arg0).catch(getObject(arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_close_2893b7d056a0627d = function() {
    return handleError(function(arg0) {
      getObject(arg0).close();
    }, arguments);
  };
  imports.wbg.__wbg_close_304cc1fef3466669 = function() {
    return handleError(function(arg0) {
      getObject(arg0).close();
    }, arguments);
  };
  imports.wbg.__wbg_close_5ce03e29be453811 = function() {
    return handleError(function(arg0) {
      getObject(arg0).close();
    }, arguments);
  };
  imports.wbg.__wbg_close_fa50b16598acbea1 = function(arg0) {
    const ret = getObject(arg0).close();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_convertbodyinner_6fe8dd4e68b5f3db = function() {
    return handleError(function(arg0) {
      const ret = convert_body_inner(takeObject(arg0));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_convertstreamingbodyinner_375d0dfb5ffb3501 = function() {
    return handleError(function(arg0) {
      const ret = convert_streaming_body_inner(takeObject(arg0));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_crypto_574e78ad8b13b65f = function(arg0) {
    const ret = getObject(arg0).crypto;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_data_432d9c3df2630942 = function(arg0) {
    const ret = getObject(arg0).data;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_defineproperty_43a9e1b71c872fe4 = function(arg0, arg1, arg2, arg3) {
    define_property(getObject(arg0), getStringFromWasm0(arg1, arg2), takeObject(arg3));
  };
  imports.wbg.__wbg_enqueue_bb16ba72f537dc9e = function() {
    return handleError(function(arg0, arg1) {
      getObject(arg0).enqueue(getObject(arg1));
    }, arguments);
  };
  imports.wbg.__wbg_entriesofobjectinner_c04ecb6f83c3b5e9 = function(arg0, arg1) {
    const ret = entries_of_object_inner(getObject(arg1));
    const ptr1 = passArrayJsValueToWasm0(ret, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_epoxywebsocket_new = function(arg0) {
    const ret = EpoxyWebSocket.__wrap(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_error_e83ed36836dc7c4c = function(arg0, arg1) {
    console.error(getStringFromWasm0(arg0, arg1));
  };
  imports.wbg.__wbg_from_2a5d3e218e67aa85 = function(arg0) {
    const ret = Array.from(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_fromentries_6c45317a28a59811 = function() {
    return handleError(function(arg0) {
      const ret = from_entries(getObject(arg0));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_getRandomValues_b8f5dbd5f3995a9e = function() {
    return handleError(function(arg0, arg1) {
      getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments);
  };
  imports.wbg.__wbg_getReader_48e00749fe3f6089 = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).getReader();
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_getWriter_6ce182d0adc3f96b = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).getWriter();
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_get_67b2ba62fc30de12 = function() {
    return handleError(function(arg0, arg1) {
      const ret = Reflect.get(getObject(arg0), getObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_get_b9b93047fe3cf45b = function(arg0, arg1) {
    const ret = getObject(arg0)[arg1 >>> 0];
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_getdone_d47073731acd3e74 = function(arg0) {
    const ret = getObject(arg0).done;
    return isLikeNone(ret) ? 16777215 : ret ? 1 : 0;
  };
  imports.wbg.__wbg_getvalue_009dcd63692bee1f = function(arg0) {
    const ret = getObject(arg0).value;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_href_e36b397abf414828 = function(arg0, arg1) {
    const ret = getObject(arg1).href;
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_instanceof_ArrayBuffer_e14585432e3737fc = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof ArrayBuffer;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Error_4d54113b22d20306 = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof Error;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Headers_7730b58b2f544659 = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof Headers;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Promise_935168b8f4b49db3 = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof Promise;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Uint8Array_17156bcf118086a9 = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof Uint8Array;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_instanceof_Url_a8a94b3a8d7be902 = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof URL;
    } catch (_) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbg_length_a446193dc22c12f8 = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
  };
  imports.wbg.__wbg_length_e2d2a49132c1b256 = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
  };
  imports.wbg.__wbg_log_b6efdfd841ebbc0d = function(arg0, arg1) {
    console.log(getStringFromWasm0(arg0, arg1));
  };
  imports.wbg.__wbg_msCrypto_a61aeb35a24c1329 = function(arg0) {
    const ret = getObject(arg0).msCrypto;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_23a2665fac83c611 = function(arg0, arg1) {
    try {
      var state0 = { a: arg0, b: arg1 };
      var cb0 = (arg02, arg12) => {
        const a = state0.a;
        state0.a = 0;
        try {
          return __wbg_adapter_163(a, state0.b, arg02, arg12);
        } finally {
          state0.a = a;
        }
      };
      const ret = new Promise(cb0);
      return addHeapObject(ret);
    } finally {
      state0.a = state0.b = 0;
    }
  };
  imports.wbg.__wbg_new_405e22f390576ce2 = function() {
    const ret = new Object();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_78feb108b6472713 = function() {
    const ret = new Array();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_92c54fc74574ef55 = function() {
    return handleError(function(arg0, arg1) {
      const ret = new WebSocket(getStringFromWasm0(arg0, arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_new_a12002a7f91c75be = function(arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_new_c68d7209be747379 = function(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_newnoargs_105ed471475aaf50 = function(arg0, arg1) {
    const ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_newwithbyteoffsetandlength_d97e637ebe145a9a = function(arg0, arg1, arg2) {
    const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_newwithintounderlyingsink_08f1a3e40fc70d83 = function(arg0) {
    const ret = new WritableStream(IntoUnderlyingSink.__wrap(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_newwithintounderlyingsource_b47f6a6a596a7f24 = function(arg0, arg1) {
    const ret = new ReadableStream(IntoUnderlyingSource.__wrap(arg0), takeObject(arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_newwithlength_a381634e90c276d4 = function(arg0) {
    const ret = new Uint8Array(arg0 >>> 0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_newwithoptreadablestreamandinit_e7fabd7063fd0b3e = function() {
    return handleError(function(arg0, arg1) {
      const ret = new Response(getObject(arg0), getObject(arg1));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_newwithstrsequence_6e9d6479e1cf978d = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = new WebSocket(getStringFromWasm0(arg0, arg1), getObject(arg2));
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_node_905d3e251edff8a2 = function(arg0) {
    const ret = getObject(arg0).node;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_now_71123b9940376874 = function(arg0) {
    const ret = getObject(arg0).now();
    return ret;
  };
  imports.wbg.__wbg_now_807e54c39636c349 = function() {
    const ret = Date.now();
    return ret;
  };
  imports.wbg.__wbg_now_d18023d54d4e5500 = function(arg0) {
    const ret = getObject(arg0).now();
    return ret;
  };
  imports.wbg.__wbg_objectget_c8383b541b239c8b = function(arg0, arg1, arg2) {
    const ret = object_get(getObject(arg0), getStringFromWasm0(arg1, arg2));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_objectset_af96af6ac6388625 = function(arg0, arg1, arg2, arg3) {
    object_set(getObject(arg0), getStringFromWasm0(arg1, arg2), takeObject(arg3));
  };
  imports.wbg.__wbg_of_66b3ee656cbd962b = function(arg0, arg1) {
    const ret = Array.of(getObject(arg0), getObject(arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_performance_1a2515c93daf8b0c = function(arg0) {
    const ret = getObject(arg0).performance;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_process_dc0fbacc7c1c06f7 = function(arg0) {
    const ret = getObject(arg0).process;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_push_737cfc8c1432c2c6 = function(arg0, arg1) {
    const ret = getObject(arg0).push(getObject(arg1));
    return ret;
  };
  imports.wbg.__wbg_queueMicrotask_97d92b4fcc8a61c5 = function(arg0) {
    queueMicrotask(getObject(arg0));
  };
  imports.wbg.__wbg_queueMicrotask_d3219def82552485 = function(arg0) {
    const ret = getObject(arg0).queueMicrotask;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_randomFillSync_ac0988aba3254290 = function() {
    return handleError(function(arg0, arg1) {
      getObject(arg0).randomFillSync(takeObject(arg1));
    }, arguments);
  };
  imports.wbg.__wbg_read_a2434af1186cb56c = function(arg0) {
    const ret = getObject(arg0).read();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_readyState_7ef6e63c349899ed = function(arg0) {
    const ret = getObject(arg0).readyState;
    return ret;
  };
  imports.wbg.__wbg_ready_480b0e63c18378c7 = function(arg0) {
    const ret = getObject(arg0).ready;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_releaseLock_091899af97991d2e = function(arg0) {
    getObject(arg0).releaseLock();
  };
  imports.wbg.__wbg_releaseLock_a389e6ea62ce0f4d = function(arg0) {
    getObject(arg0).releaseLock();
  };
  imports.wbg.__wbg_require_60cc747a6bc5215a = function() {
    return handleError(function() {
      const ret = module.require;
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_resolve_4851785c9c5f573d = function(arg0) {
    const ret = Promise.resolve(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_respond_1f279fa9f8edcb1c = function() {
    return handleError(function(arg0, arg1) {
      getObject(arg0).respond(arg1 >>> 0);
    }, arguments);
  };
  imports.wbg.__wbg_send_fc0c204e8a1757f4 = function() {
    return handleError(function(arg0, arg1, arg2) {
      getObject(arg0).send(getArrayU8FromWasm0(arg1, arg2));
    }, arguments);
  };
  imports.wbg.__wbg_setTimeout_efd7c11531df1743 = function() {
    return handleError(function(arg0, arg1, arg2) {
      const ret = getObject(arg0).setTimeout(getObject(arg1), arg2);
      return ret;
    }, arguments);
  };
  imports.wbg.__wbg_set_65595bdd868b3009 = function(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
  };
  imports.wbg.__wbg_setbinaryType_92fa1ffd873b327c = function(arg0, arg1) {
    getObject(arg0).binaryType = __wbindgen_enum_BinaryType[arg1];
  };
  imports.wbg.__wbg_setheaders_3b47c898e8de6d44 = function(arg0, arg1) {
    getObject(arg0).headers = getObject(arg1);
  };
  imports.wbg.__wbg_sethighwatermark_793c99c89830c8e9 = function(arg0, arg1) {
    getObject(arg0).highWaterMark = arg1;
  };
  imports.wbg.__wbg_setonclose_14fc475a49d488fc = function(arg0, arg1) {
    getObject(arg0).onclose = getObject(arg1);
  };
  imports.wbg.__wbg_setonerror_8639efe354b947cd = function(arg0, arg1) {
    getObject(arg0).onerror = getObject(arg1);
  };
  imports.wbg.__wbg_setonmessage_6eccab530a8fb4c7 = function(arg0, arg1) {
    getObject(arg0).onmessage = getObject(arg1);
  };
  imports.wbg.__wbg_setonopen_2da654e1f39745d5 = function(arg0, arg1) {
    getObject(arg0).onopen = getObject(arg1);
  };
  imports.wbg.__wbg_setstatus_51b4fc011091cbb3 = function(arg0, arg1) {
    getObject(arg0).status = arg1;
  };
  imports.wbg.__wbg_setstatustext_0f3162c3db034880 = function(arg0, arg1, arg2) {
    getObject(arg0).statusText = getStringFromWasm0(arg1, arg2);
  };
  imports.wbg.__wbg_static_accessor_GLOBAL_88a902d13a557d07 = function() {
    const ret = typeof global === "undefined" ? null : global;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_static_accessor_GLOBAL_THIS_56578be7e9f832b0 = function() {
    const ret = typeof globalThis === "undefined" ? null : globalThis;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_static_accessor_SELF_37c5d418e4bf5819 = function() {
    const ret = typeof self === "undefined" ? null : self;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_static_accessor_WINDOW_5de37043a91a9c40 = function() {
    const ret = typeof window === "undefined" ? null : window;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_subarray_aa9065fa9dc5df96 = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_tee_15d2d039bef462ae = function() {
    return handleError(function(arg0) {
      const ret = getObject(arg0).tee();
      return addHeapObject(ret);
    }, arguments);
  };
  imports.wbg.__wbg_then_44b73946d2fb3e7d = function(arg0, arg1) {
    const ret = getObject(arg0).then(getObject(arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_then_48b406749878a531 = function(arg0, arg1, arg2) {
    const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_toString_c813bbd34d063839 = function(arg0) {
    const ret = getObject(arg0).toString();
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_versions_c01dfd4722a88165 = function(arg0) {
    const ret = getObject(arg0).versions;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_view_fd8a56e8983f448d = function(arg0) {
    const ret = getObject(arg0).view;
    return isLikeNone(ret) ? 0 : addHeapObject(ret);
  };
  imports.wbg.__wbg_write_311434e30ee214e5 = function(arg0, arg1) {
    const ret = getObject(arg0).write(getObject(arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_wskey_0b2afb978da35653 = function(arg0) {
    const ret = ws_key();
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbg_wsprotocol_85604d2fc1ec3450 = function(arg0) {
    const ret = ws_protocol();
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbindgen_cb_drop = function(arg0) {
    const obj = takeObject(arg0).original;
    if (obj.cnt-- == 1) {
      obj.a = 0;
      return true;
    }
    const ret = false;
    return ret;
  };
  imports.wbg.__wbindgen_closure_wrapper5133 = function(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 182, __wbg_adapter_51);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_closure_wrapper864 = function(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 182, __wbg_adapter_34);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_closure_wrapper940 = function(arg0, arg1, arg2) {
    const ret = makeClosure(arg0, arg1, 18, __wbg_adapter_37);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_closure_wrapper942 = function(arg0, arg1, arg2) {
    const ret = makeClosure(arg0, arg1, 22, __wbg_adapter_40);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_closure_wrapper944 = function(arg0, arg1, arg2) {
    const ret = makeClosure(arg0, arg1, 22, __wbg_adapter_40);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_closure_wrapper946 = function(arg0, arg1, arg2) {
    const ret = makeClosure(arg0, arg1, 18, __wbg_adapter_45);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_closure_wrapper948 = function(arg0, arg1, arg2) {
    const ret = makeClosure(arg0, arg1, 22, __wbg_adapter_48);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
    const ret = debugString(getObject(arg1));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_is_array = function(arg0) {
    const ret = Array.isArray(getObject(arg0));
    return ret;
  };
  imports.wbg.__wbindgen_is_falsy = function(arg0) {
    const ret = !getObject(arg0);
    return ret;
  };
  imports.wbg.__wbindgen_is_function = function(arg0) {
    const ret = typeof getObject(arg0) === "function";
    return ret;
  };
  imports.wbg.__wbindgen_is_object = function(arg0) {
    const val = getObject(arg0);
    const ret = typeof val === "object" && val !== null;
    return ret;
  };
  imports.wbg.__wbindgen_is_string = function(arg0) {
    const ret = typeof getObject(arg0) === "string";
    return ret;
  };
  imports.wbg.__wbindgen_is_undefined = function(arg0) {
    const ret = getObject(arg0) === void 0;
    return ret;
  };
  imports.wbg.__wbindgen_memory = function() {
    const ret = wasm.memory;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_number_new = function(arg0) {
    const ret = arg0;
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
    const ret = getObject(arg0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
  };
  imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof obj === "string" ? obj : void 0;
    var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
  };
  imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };
  return imports;
}
function __wbg_init_memory(imports, memory) {
}
function __wbg_finalize_init(instance, module2) {
  wasm = instance.exports;
  __wbg_init.__wbindgen_wasm_module = module2;
  cachedDataViewMemory0 = null;
  cachedUint8ArrayMemory0 = null;
  return wasm;
}
async function __wbg_init(module_or_path) {
  if (wasm !== void 0) return;
  if (typeof module_or_path !== "undefined") {
    if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
      ({ module_or_path } = module_or_path);
    } else {
      console.warn("using deprecated parameters for the initialization function; pass a single object instead");
    }
  }
  if (typeof module_or_path === "undefined") {
    module_or_path = new URL("epoxy.wasm", import.meta.url);
  }
  const imports = __wbg_get_imports();
  if (typeof module_or_path === "string" || typeof Request === "function" && module_or_path instanceof Request || typeof URL === "function" && module_or_path instanceof URL) {
    module_or_path = fetch(module_or_path);
  }
  __wbg_init_memory(imports);
  const { instance, module: module2 } = await __wbg_load(await module_or_path, imports);
  __wbg_finalize_init(instance, module2);
}
var epoxy_default = __wbg_init;
var info = { version: "2.1.20-1", minimal: false, release: true, commit: "9cde724aea1a0f5e46b1c962b3d19ca1389af074" };

// src/ech.ts
var TYPE_HTTPS = 65;
var KEY_ECH = 5;
var NEGATIVE_MS = 5 * 60 * 1e3;
var MIN_TTL_MS = 60 * 1e3;
var MAX_TTL_MS = 24 * 60 * 60 * 1e3;
var WAIT_MS = 1500;
function httpsQuery(name) {
  const out = [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0];
  for (const label of name.split(".")) {
    const bytes = new TextEncoder().encode(label);
    if (!bytes.length || bytes.length > 63) throw new Error("bad DNS name");
    out.push(bytes.length, ...bytes);
  }
  out.push(0, 0, TYPE_HTTPS, 0, 1);
  return new Uint8Array(out);
}
function base64url(bytes) {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function skipName(view, offset) {
  for (; ; ) {
    const len = view.getUint8(offset);
    if (len === 0) return offset + 1;
    if ((len & 192) === 192) return offset + 2;
    offset += len + 1;
  }
}
function parseEch(message) {
  const view = new DataView(message);
  if (view.byteLength < 12 || (view.getUint8(3) & 15) !== 0) return null;
  const questions = view.getUint16(4);
  const answers = view.getUint16(6);
  let offset = 12;
  for (let i = 0; i < questions; i++) offset = skipName(view, offset) + 4;
  for (let i = 0; i < answers; i++) {
    offset = skipName(view, offset);
    const type = view.getUint16(offset);
    const ttl = view.getUint32(offset + 4);
    const start = offset + 10;
    const end = start + view.getUint16(offset + 8);
    offset = end;
    if (type !== TYPE_HTTPS || end > view.byteLength) continue;
    if (view.getUint16(start) === 0) continue;
    for (let at = skipName(view, start + 2); at + 4 <= end; ) {
      const key = view.getUint16(at);
      const len = view.getUint16(at + 2);
      if (key === KEY_ECH && at + 4 + len <= end)
        return { ech: new Uint8Array(message.slice(at + 4, at + 4 + len)), ttl };
      at += 4 + len;
    }
    return null;
  }
  return null;
}
var EchResolver = class {
  #dns;
  #fetch;
  #cache = /* @__PURE__ */ new Map();
  constructor(dns, fetch2) {
    this.#dns = new URL(dns);
    this.#fetch = fetch2;
  }
  /** what epoxy-tls's `ech_resolver` is given */
  resolve = (host) => {
    const name = host.toLowerCase().replace(/\.$/, "");
    if (name === this.#dns.hostname || !name.includes(".") || /^[\d.]+$|:|^\[/.test(name) || /(^|\.)(localhost|local|internal|test|invalid)$/.test(name))
      return Promise.resolve(null);
    const cached = this.#cache.get(name);
    if (cached && cached.until > Date.now()) return wait(cached.value);
    const entry = { until: Date.now() + NEGATIVE_MS, value: this.#ask(name) };
    this.#cache.set(name, entry);
    return wait(entry.value);
  };
  async #ask(name) {
    const url = new URL(this.#dns);
    url.searchParams.set("dns", base64url(httpsQuery(name)));
    try {
      const found = parseEch(
        await this.#fetch(url.href, "application/dns-message")
      );
      if (!found) return null;
      const entry = this.#cache.get(name);
      if (entry)
        entry.until = Date.now() + Math.min(Math.max(found.ttl * 1e3, MIN_TTL_MS), MAX_TTL_MS);
      return found.ech;
    } catch {
      return null;
    }
  }
};
function wait(value) {
  return Promise.race([
    value,
    new Promise((resolve) => setTimeout(() => resolve(null), WAIT_MS))
  ]);
}

// src/main.ts
var opts = [
  "wisp_v2",
  "udp_extension_required",
  "title_case_headers",
  "ws_title_case_headers",
  "wisp_ws_protocols",
  "redirect_limit",
  "header_limit",
  "buffer_size",
  "pem_files"
];
var epoxyLoaded = null;
function loadEpoxy() {
  epoxyLoaded ??= epoxy_default().then(
    () => {
    },
    (error) => {
      epoxyLoaded = null;
      throw error;
    }
  );
  return epoxyLoaded;
}
var EpoxyTransport = class {
  ready = false;
  // What this build does with the request fields a host sends in Chrome's
  // shape: it decodes every encoding Chrome offers (and answers with that
  // Accept-Encoding whatever it is given), and it sends a Priority field
  // over HTTP/2 only, as Chrome does, leaving it out of HTTP/1 requests.
  fieldSupport = {
    acceptEncoding: "gzip, deflate, br, zstd",
    priority: true
  };
  initializing = null;
  client_version;
  client = null;
  wisp;
  opts;
  constructor(opts2) {
    this.wisp = opts2.wisp;
    this.opts = opts2;
    this.client_version = info;
  }
  setopt(opts2, opt) {
    if (this.opts[opt] != null) opts2[opt] = this.opts[opt];
  }
  // Hosts call init() from every request that finds the transport not ready
  // yet, so concurrent calls share one load and one client.
  init() {
    this.initializing ??= (async () => {
      await loadEpoxy();
      let options = new EpoxyClientOptions();
      options.user_agent = navigator.userAgent;
      opts.forEach((x) => this.setopt(options, x));
      if (this.opts.ech_dns) {
        const resolver = new EchResolver(this.opts.ech_dns, async (url, accept) => {
          const res = await this.client.fetch(url, {
            method: "GET",
            headers: { accept },
            redirect: "manual"
          });
          if (res.status !== 200) throw new Error(`DoH answered ${res.status}`);
          return await res.arrayBuffer();
        });
        options.ech_resolver = resolver.resolve;
      }
      this.client = new EpoxyClient(this.wisp, options);
      this.ready = true;
    })().catch((error) => {
      this.initializing = null;
      throw error;
    });
    return this.initializing;
  }
  async meta() {
  }
  async request(remote, method, body, headers, signal) {
    if (body instanceof Blob) body = await body.arrayBuffer();
    try {
      let headersObj = {};
      for (let [key, value] of headers) {
        if (headersObj[key]) {
          console.warn(
            `Duplicate header key "${key}" detected. Overwriting previous value.`
          );
        }
        headersObj[key] = value;
      }
      let res = await this.client.fetch(remote.href, {
        method,
        body,
        headers: headersObj,
        redirect: "manual"
      });
      let headersEntries = [];
      for (let [key, value] of Object.entries(res.rawHeaders)) {
        if (Array.isArray(value)) {
          for (let v of value) {
            headersEntries.push([key, v]);
          }
        } else {
          headersEntries.push([key, value]);
        }
      }
      return {
        body: res.body,
        headers: headersEntries,
        status: res.status,
        statusText: res.statusText
      };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  connect(url, protocols, requestHeaders, onopen, onmessage, onclose, onerror) {
    let handlers = new EpoxyHandlers(
      // epoxy-tls passes the protocol the server chose; it offers no
      // extension, so none is ever negotiated
      (protocol) => onopen(protocol ?? "", ""),
      // the server's close frame: its status (1005 when it carried
      // none, 1006 when the connection ended without one) and reason
      (code, reason) => onclose(code ?? 1005, reason ?? ""),
      onerror,
      (data) => (
        //@ts-ignore
        data instanceof Uint8Array ? onmessage(data.buffer) : onmessage(data)
      )
    );
    let headersObj = {};
    for (let [key, value] of requestHeaders) {
      if (headersObj[key]) {
        console.warn(
          `Duplicate header key "${key}" detected. Overwriting previous value.`
        );
      }
      headersObj[key] = value;
    }
    let ws = this.client.connect_websocket(
      handlers,
      url.href,
      protocols,
      headersObj
    );
    return [
      async (data) => {
        if (data instanceof Blob) data = await data.arrayBuffer();
        (await ws).send(data);
      },
      async (code, reason) => {
        (await ws).close(code, reason || "");
      }
    ];
  }
};
export {
  EpoxyTransport as default,
  info as epoxyInfo
};
