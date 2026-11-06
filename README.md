> **Fracital build.** Built from the patch set in stomp-rewrite `deploy/epoxy/` against
> the sibling epoxy-tls checkout, whose HTTP/2 client accepts response header blocks up to
> 256 KiB like Chrome instead of hyper's 16 KiB default (which reset YouTube and other
> header-heavy sites with `PROTOCOL_ERROR`). epoxy-tls is bundled into `dist/`, so it is a
> devDependency and consumers fetch nothing else. TypeScript is pinned to 5 because
> dts-bundle-generator does not run on TypeScript 7.

# epoxy-transport

epoxy-transport is a transport for bare-mux which allows you to use [epoxy-tls](https://github.com/MercuryWorkshop/epoxy-tls) in your bare client.

## Usage:
Here is a basic example of using epoxy-transport. The Wisp proxy server is specified in the `wisp` option. 
```js
import { EpoxyClient } from "@mercuryworkshop/epoxy-transport";
let client = new EpoxyClient({ wisp: "wss://example.com/wisp/" });

// pass to proxy
```

You can also use the non-esm build
```html
<script src="https://unpkg.com/@mercuryworkshop/epoxy-transport@3/dist/index.js"></script>
<script>
  let client = new EpoxyTransport.EpoxyClient({ wisp: "wss://example.com/wisp/" });
</script>
```

## Copyright:
This package is licensed under the GNU AGPL v3.
