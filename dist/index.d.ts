import type { RawHeaders, TransferrableResponse, ProxyTransport } from "@mercuryworkshop/proxy-transports";
import { EpoxyClient, EpoxyClientOptions, info as epoxyInfo } from "@mercuryworkshop/epoxy-tls";
export { epoxyInfo };
export type EpoxyOptions = {
    wisp_v2?: boolean;
    udp_extension_required?: boolean;
    title_case_headers?: boolean;
    ws_title_case_headers?: boolean;
    wisp_ws_protocols?: string[];
    redirect_limit?: number;
    header_limit?: number;
    buffer_size?: number;
    /** PEM certificates trusted next to the web roots (a test's own CA) */
    pem_files?: string[];
    /**
     * A DNS-over-HTTPS endpoint (RFC 8484, e.g.
     * `https://cloudflare-dns.com/dns-query`) asked for each name's HTTPS
     * record before a TLS connection to it: with an `ech` config list there
     * the connection offers real Encrypted Client Hello, as Chrome does.
     * Unset, every connection sends a GREASE ECH.
     */
    ech_dns?: string;
};
export default class EpoxyTransport implements ProxyTransport {
    ready: boolean;
    readonly fieldSupport: {
        acceptEncoding: string;
        priority: boolean;
    };
    private initializing;
    client_version: typeof epoxyInfo;
    client: EpoxyClient;
    wisp: string;
    opts: EpoxyOptions;
    constructor(opts: EpoxyOptions & {
        wisp: string;
    });
    setopt(opts: EpoxyClientOptions, opt: string): void;
    init(): Promise<void>;
    meta(): Promise<void>;
    request(remote: URL, method: string, body: BodyInit | null, headers: RawHeaders, signal: AbortSignal | undefined): Promise<TransferrableResponse>;
    connect(url: URL, protocols: string[], requestHeaders: RawHeaders, onopen: (protocol: string, extensions: string) => void, onmessage: (data: Blob | ArrayBuffer | string) => void, onclose: (code: number, reason: string) => void, onerror: (error: string) => void): [
        (data: Blob | ArrayBuffer | string) => void,
        (code: number, reason: string) => void
    ];
}
