/** the wire-format query for `name` IN HTTPS, id 0 as RFC 8484 asks */
export declare function httpsQuery(name: string): Uint8Array;
/**
 * The `ech` of the first ServiceMode HTTPS record in a DoH answer (a record
 * for the CNAME target the resolver followed counts as the name's), with
 * the answer's TTL; `null` when there is none.
 */
export declare function parseEch(message: ArrayBuffer): {
    ech: Uint8Array;
    ttl: number;
} | null;
type Fetch = (url: string, accept: string) => Promise<ArrayBuffer>;
/** ECH config lists by host name, from one DoH endpoint, with their TTLs */
export declare class EchResolver {
    #private;
    constructor(dns: string, fetch: Fetch);
    /** what epoxy-tls's `ech_resolver` is given */
    resolve: (host: string) => Promise<Uint8Array | null>;
}
export {};
