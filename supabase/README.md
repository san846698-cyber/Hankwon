# Supabase setup

1. Create a new project at https://supabase.com
2. Open SQL editor → paste contents of `schema.sql` → Run
3. Project Settings → API → copy:
   - `URL`
   - `anon` public key
   - `service_role` key (server-only, never expose to client)
4. Add to `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

5. Restart dev server.

The Next.js API routes use the service role key from the server side and never
expose it to the client. The anon key is safe to ship to the browser because
all table access requires going through SECURITY DEFINER RPCs that we control.
