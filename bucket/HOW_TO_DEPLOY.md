# Bookworms Bucket — Local Deployment Guide

## Prerequisites

- Node.js v24+
- PM2 (`npm i -g pm2`)
- Cloudflare account with your domain
- `cloudflared` (`brew install cloudflare/cloudflare/cloudflared`)

---

## 1. Server setup

```bash
cd /bucket
npm install
```

Create `.env`:

```env
NODE_ENV=production
PORT=3100
BUCKET_DIR=/absolute/path/to/your/images
ALLOWED_ORIGINS=yourdomain.com,yourotherdomain.com
ALLOWED_EXTENSIONS=webp
```

---

## 2. Cloudflare Tunnel setup

Login and verify your tunnel exists:

```bash
cloudflared tunnel login
cloudflared tunnel list
# Should show: <your-tunnel-id>   <tunnel-name>
```

If the tunnel doesn't exist, create it:

```bash
cloudflared tunnel create <tunnel-name>
cloudflared tunnel route dns <tunnel-name> <your-subdomain.yourdomain.com>
```

Create `~/.cloudflared/config.yml`:

```yaml
tunnel: <your-tunnel-id>
credentials-file: /Users/<youruser>/.cloudflared/<your-tunnel-id>.json

ingress:
    - hostname: <your-subdomain.yourdomain.com>
      service: http://localhost:3100
    - service: http_status:404
```

---

## 3. PM2

```bash
pm2 start ecosystem.config.cjs
pm2 start "cloudflared tunnel --config /Users/<youruser>/.cloudflared/config.yml run <your-tunnel-id>" --name tunnel
pm2 save
pm2 startup  # run the command it outputs
```

---

## 4. Verify

```bash
pm2 status               # both 'bucket' and 'tunnel' should be online
pm2 logs tunnel          # should show connected, no errors
```

Test: `https://<your-subdomain.yourdomain.com>/bucket/<filename>.webp`

---

## Troubleshooting

| Error | Cause                                       | Fix                                                    |
| ----- | ------------------------------------------- | ------------------------------------------------------ |
| 1033  | Tunnel is down                              | `pm2 restart tunnel`                                   |
| 503   | Server is down or tunnel not reading config | `pm2 restart bucket` / pass `--config` flag explicitly |
| 403   | Origin not in whitelist                     | Add domain to `ALLOWED_ORIGINS` in `.env`              |
| 404   | File doesn't exist in `BUCKET_DIR`          | Verify the file path                                   |
| 415   | Extension not allowed                       | Add extension to `ALLOWED_EXTENSIONS` in `.env`        |
