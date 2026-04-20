# Transfer status: copy-cod repository

I attempted to transfer this site directly to:

- https://github.com/graurulana-boop/copy-cod.git

But this runtime cannot reach GitHub over HTTPS from shell commands (`CONNECT tunnel failed, response 403`).

To make transfer easy once network/auth is available, use:

```bash
./transfer-to-copy-cod.sh /path/to/local/clone/of/copy-cod
```

This will copy the website files:

- `index.html`
- `style.css`
- `script.js`

Then commit and push from the destination repo.
