/** the wire-format query for `name` IN HTTPS, id 0 as RFC 8484 asks */
export declare function httpsQuery(name: string): Uint8Array;
/** what a DoH answer says of a name: its ECH config list (null: none), and for how many seconds (null: not to be kept) */
export interface HttpsAnswer {
    ech: Uint8Array | null;
    ttl: number | null;
}
/**
 * The `ech` of the first ServiceMode HTTPS record in a DoH answer (a record
 * for the CNAME target the resolver followed counts as the name's), and the
 * TTL to keep the answer by: the smallest of the records taken (the CNAMEs
 * and the HTTPS record); for an answer with no HTTPS record (NODATA or
 * NXDOMAIN), the negative TTL of its SOA, the smaller of the SOA's own TTL
 * and its MINIMUM (RFC 2308 5), or null without one. A message that is no
 * answer (too short, an error other than NXDOMAIN) throws.
 */
export declare function parseHttps(message: ArrayBuffer): HttpsAnswer;
/**
 * one kept answer: a partition's name (`EchResolver.key`), its ECH config
 * list or none, when it is stale (ms since the epoch), and the DoH answer
 * itself (wire format), which `httpsAnswer` gives a host. A host that keeps
 * `answer` across a reload saves the name a second question there; an
 * entry that comes back without it still serves ECH, and the first
 * `httpsAnswer` for it asks again.
 */
export interface EchCacheEntry {
    key: string;
    ech: Uint8Array | null;
    until: number;
    answer?: ArrayBuffer | null;
}
/**
 * Where a host keeps answers across the realm's end (a reload, a new tab):
 * `load` gives back what was kept (stale entries may come back; they are
 * not used), `put` keeps one more, and replaces the one of its key.
 */
export interface EchCache {
    load(): Promise<EchCacheEntry[]>;
    put(entry: EchCacheEntry): void;
}
type Fetch = (url: string, accept: string) => Promise<ArrayBuffer>;
/**
 * HTTPS records by network partition and host name, from one DoH endpoint,
 * with their TTLs: one question per name and partition answers both the ECH
 * config list epoxy-tls asks for before a handshake (`resolveIn`) and the
 * host's own reading of the record (`answerIn`: its alpn and port), and a
 * lookup out is shared by every caller in its partition
 */
export declare class EchResolver {
    #private;
    constructor(dns: string, fetch: Fetch, store?: EchCache | null);
    /** the key of `name` in `partition` ("" for requests that name none) */
    static key(partition: string, name: string): string;
    /** what epoxy-tls's `ech_resolver` is given: the main client's lookups */
    resolve: (host: string) => Promise<Uint8Array | null>;
    /** a lookup of `host` for the network partition `partition` (EpoxyClient.partition's resolver) */
    resolveIn(partition: string, host: string): Promise<Uint8Array | null>;
    /**
     * The DoH answer (wire format) to `host`'s HTTPS question in `partition`,
     * the one `resolveIn` reads, or null when it is not asked or the lookup
     * failed. Not bounded: the caller decides how long to wait. A copy each
     * time, so the caller may transfer it.
     */
    answerIn(partition: string, host: string): Promise<ArrayBuffer | null>;
}
export {};
