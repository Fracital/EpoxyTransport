/* tslint:disable */
/* eslint-disable */
/**
 * Connect to `host` (the TLS server name) over the datagram channel.
 * `options`: `{ pem?: string, timeoutMs?: number }`: extra trusted roots
 * (tests) and how long the handshake may take (10 s).
 */
export function connect(host: string, readable: ReadableStream, writable: WritableStream, options: any): Promise<H3Connection>;
/**
 * The `ReadableStreamType` enum.
 *
 * *This API requires the following crate features to be activated: `ReadableStreamType`*
 */
type ReadableStreamType = "bytes";
/**
 * One HTTP/3 connection to one origin; requests multiplex over it.
 */
export class H3Connection {
  private constructor();
  free(): void;
  /**
   * Run one request. `headers` is `[name, value][]` in the order to send;
   * `body` is null, a Uint8Array, or a ReadableStream of Uint8Array.
   * Resolves to `{ status, headers: [name, value][], body: ReadableStream | null }`
   * once the response head arrives; the body streams after that, decoded
   * from gzip or br the way epoxy decodes it.
   */
  request(method: string, url: string, headers: Array<any>, body: any): Promise<any>;
  close(): void;
  /**
   * The connection's smoothed RTT and datagram counters.
   */
  stats(): any;
  readonly handshake_ms: number;
  /**
   * False once the connection closed (idle timeout, GOAWAY, error).
   */
  readonly alive: boolean;
}
export class IntoUnderlyingByteSource {
  private constructor();
  free(): void;
  pull(controller: ReadableByteStreamController): Promise<any>;
  start(controller: ReadableByteStreamController): void;
  cancel(): void;
  readonly autoAllocateChunkSize: number;
  readonly type: ReadableStreamType;
}
export class IntoUnderlyingSink {
  private constructor();
  free(): void;
  abort(reason: any): Promise<any>;
  close(): Promise<any>;
  write(chunk: any): Promise<any>;
}
export class IntoUnderlyingSource {
  private constructor();
  free(): void;
  pull(controller: ReadableStreamDefaultController): Promise<any>;
  cancel(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_h3connection_free: (a: number, b: number) => void;
  readonly connect: (a: number, b: number, c: any, d: any, e: any) => any;
  readonly h3connection_alive: (a: number) => number;
  readonly h3connection_close: (a: number) => void;
  readonly h3connection_handshake_ms: (a: number) => number;
  readonly h3connection_request: (a: number, b: number, c: number, d: number, e: number, f: any, g: any) => any;
  readonly h3connection_stats: (a: number) => any;
  readonly ring_core_0_17_14__bn_mul_mont: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly __wbg_intounderlyingbytesource_free: (a: number, b: number) => void;
  readonly __wbg_intounderlyingsink_free: (a: number, b: number) => void;
  readonly __wbg_intounderlyingsource_free: (a: number, b: number) => void;
  readonly intounderlyingbytesource_autoAllocateChunkSize: (a: number) => number;
  readonly intounderlyingbytesource_cancel: (a: number) => void;
  readonly intounderlyingbytesource_pull: (a: number, b: any) => any;
  readonly intounderlyingbytesource_start: (a: number, b: any) => void;
  readonly intounderlyingbytesource_type: (a: number) => number;
  readonly intounderlyingsink_abort: (a: number, b: any) => any;
  readonly intounderlyingsink_close: (a: number) => any;
  readonly intounderlyingsink_write: (a: number, b: any) => any;
  readonly intounderlyingsource_cancel: (a: number) => void;
  readonly intounderlyingsource_pull: (a: number, b: any) => any;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_1: WebAssembly.Table;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_export_3: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly _dyn_core_8592b7f1da481f01___ops__function__FnMut_____Output______as_wasm_bindgen_b3e04dad1803989f___closure__WasmClosure___describe__invoke______: (a: number, b: number) => void;
  readonly closure161_externref_shim: (a: number, b: number, c: any) => void;
  readonly closure110_externref_shim: (a: number, b: number, c: any, d: any) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
