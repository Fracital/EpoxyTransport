/* tslint:disable */
/* eslint-disable */
/**
 * Connect to `host` (the TLS server name) over the datagram channel.
 * `options`: `{ pem?: string, timeoutMs?: number }`: extra trusted roots
 * (tests) and how long the handshake may take (10 s).
 */
export function connect(host: string, readable: ReadableStream, writable: WritableStream, options: any): Promise<H3Connection>;
/**
 * Open a WebTransport session to `url` over the datagram channel.
 * `options`: `{ origin, protocols?, headers?, hashes?, pem?, timeoutMs? }` (see
 * API.md in the stream notes); resolves once the server answers the
 * CONNECT with `:status 200`, rejects with "handshake: ..." otherwise.
 */
export function connect_webtransport(url: string, readable: ReadableStream, writable: WritableStream, options: any): Promise<WtSession>;
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
   * Resolves to `{ status, headers: [name, value][], body: ReadableStream | null,
   * encoded: { bytes } }` once the response head arrives; the body streams
   * after that, decoded from gzip, deflate, br or zstd the way epoxy
   * decodes it. `encoded.bytes` counts the DATA bytes as they came, before
   * the decoding (a browser's encodedBodySize), and is the whole body's
   * once the stream has ended.
   */
  request(method: string, url: string, headers: Array<any>, body: any): Promise<any>;
  close(): void;
  /**
   * The connection's smoothed RTT and datagram counters.
   */
  stats(): any;
  /**
   * When the handshake ended, in this realm's `performance.now()` (a
   * browser's connectEnd)
   */
  readonly connectEnd: number;
  readonly handshake_ms: number;
  /**
   * When `connect` was called, the Initial about to go out, in this
   * realm's `performance.now()` (a browser's connectStart and, QUIC's
   * handshake being its TLS one, secureConnectionStart)
   */
  readonly connectStart: number;
  /**
   * False once the connection closed (idle timeout, GOAWAY, error).
   */
  readonly alive: boolean;
  /**
   * The PING frames sent so far: the keep-alive's while a request is
   * open, and the probes of a loss timeout with nothing to send again.
   * Each one is acknowledged at once by a live peer, so the host times
   * one as it times a request (Http3Transport's blackhole watch).
   */
  readonly pings: number;
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
/**
 * One WebTransport session: streams by handle, datagrams, close.
 */
export class WtSession {
  private constructor();
  free(): void;
  /**
   * The next unidirectional stream from the server; undefined once over
   */
  accept_uni(): Promise<any>;
  /**
   * The next datagram of the session; undefined once it is over
   */
  read_datagram(): Promise<any>;
  /**
   * The peer's RESET_STREAM code (WebTransport; 0 for any other), seen
   * without reading; undefined once the receive side is over another way
   */
  reset_received(handle: number): Promise<any>;
  /**
   * Up to `max` bytes of what has arrived (undefined at FIN). Rejects
   * "reset <n>" (the peer's RESET_STREAM, n its WebTransport code, 0 for
   * any other), "gone" (the session ended).
   */
  read(handle: number, max: number): Promise<any>;
  /**
   * Resolves once quinn has taken every byte (its flow control and send
   * buffer are the backpressure). Rejects "stop <n>", "gone".
   */
  write(handle: number, data: Uint8Array): Promise<void>;
  /**
   * `{ closeCode, reason }` once the session closed cleanly (either side);
   * rejects "lost ..." when it ended any other way
   */
  closed(): Promise<any>;
  /**
   * FIN after what was written
   */
  finish(handle: number): Promise<void>;
  /**
   * A stream of ours, both ways; its header (`40 41 00`) written
   */
  open_bi(): Promise<number>;
  /**
   * The peer's STOP_SENDING code (WebTransport; 0 for any other); undefined
   * once the send side is over another way (finished and acknowledged,
   * reset, the session ended)
   */
  stopped(handle: number): Promise<any>;
  /**
   * A unidirectional stream of ours; its header (`40 54 00`) written
   */
  open_uni(): Promise<number>;
  /**
   * The next stream the server opened both ways; undefined once over
   */
  accept_bi(): Promise<any>;
  /**
   * Send one datagram; false when it cannot go (too large, session over),
   * dropped as Chrome drops it
   */
  send_datagram(data: Uint8Array): boolean;
  /**
   * STOP_SENDING with WebTransport code `code`
   */
  stop(handle: number, code: number): void;
  /**
   * CLOSE_WEBTRANSPORT_SESSION (`code`, `reason` cut to 1024 bytes) and
   * FIN on the CONNECT stream; streams reset with SESSION_GONE; the
   * connection closes once that is acknowledged (at most a second)
   */
  close(code: number, reason: string): void;
  /**
   * RESET_STREAM with WebTransport code `code`
   */
  reset(handle: number, code: number): void;
  /**
   * Diagnostics: RTT, handshake time, datagram and packet counters
   */
  stats(): any;
  /**
   * Forget a stream. A direction still open is reset / stopped with
   * WebTransport code 0 (quinn would otherwise finish it, or stop it with
   * code 0 outside the WebTransport range).
   */
  release(handle: number): void;
  /**
   * The largest datagram payload now (0 when the peer takes none)
   */
  readonly max_datagram_size: number;
  /**
   * The server's `wt-protocol` when it is one of those offered, else ''
   */
  readonly protocol: string;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_h3connection_free: (a: number, b: number) => void;
  readonly __wbg_wtsession_free: (a: number, b: number) => void;
  readonly connect: (a: number, b: number, c: any, d: any, e: any) => any;
  readonly connect_webtransport: (a: number, b: number, c: any, d: any, e: any) => any;
  readonly h3connection_alive: (a: number) => number;
  readonly h3connection_close: (a: number) => void;
  readonly h3connection_connectEnd: (a: number) => number;
  readonly h3connection_connectStart: (a: number) => number;
  readonly h3connection_handshake_ms: (a: number) => number;
  readonly h3connection_pings: (a: number) => number;
  readonly h3connection_request: (a: number, b: number, c: number, d: number, e: number, f: any, g: any) => any;
  readonly h3connection_stats: (a: number) => any;
  readonly wtsession_accept_bi: (a: number) => any;
  readonly wtsession_accept_uni: (a: number) => any;
  readonly wtsession_close: (a: number, b: number, c: number, d: number) => void;
  readonly wtsession_closed: (a: number) => any;
  readonly wtsession_finish: (a: number, b: number) => any;
  readonly wtsession_max_datagram_size: (a: number) => number;
  readonly wtsession_open_bi: (a: number) => any;
  readonly wtsession_open_uni: (a: number) => any;
  readonly wtsession_protocol: (a: number) => [number, number];
  readonly wtsession_read: (a: number, b: number, c: number) => any;
  readonly wtsession_read_datagram: (a: number) => any;
  readonly wtsession_release: (a: number, b: number) => void;
  readonly wtsession_reset: (a: number, b: number, c: number) => void;
  readonly wtsession_reset_received: (a: number, b: number) => any;
  readonly wtsession_send_datagram: (a: number, b: number, c: number) => number;
  readonly wtsession_stats: (a: number) => any;
  readonly wtsession_stop: (a: number, b: number, c: number) => void;
  readonly wtsession_stopped: (a: number, b: number) => any;
  readonly wtsession_write: (a: number, b: number, c: number, d: number) => any;
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
  readonly rust_zstd_wasm_shim_calloc: (a: number, b: number) => number;
  readonly rust_zstd_wasm_shim_free: (a: number) => void;
  readonly rust_zstd_wasm_shim_malloc: (a: number) => number;
  readonly rust_zstd_wasm_shim_memcmp: (a: number, b: number, c: number) => number;
  readonly rust_zstd_wasm_shim_memcpy: (a: number, b: number, c: number) => number;
  readonly rust_zstd_wasm_shim_memmove: (a: number, b: number, c: number) => number;
  readonly rust_zstd_wasm_shim_memset: (a: number, b: number, c: number) => number;
  readonly rust_zstd_wasm_shim_qsort: (a: number, b: number, c: number, d: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_export_1: WebAssembly.Table;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_export_3: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly _dyn_core_8592b7f1da481f01___ops__function__FnMut_____Output______as_wasm_bindgen_b3e04dad1803989f___closure__WasmClosure___describe__invoke______: (a: number, b: number) => void;
  readonly closure160_externref_shim: (a: number, b: number, c: any) => void;
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
