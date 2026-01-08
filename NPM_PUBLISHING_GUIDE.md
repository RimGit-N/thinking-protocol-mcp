# 📦 NPM Publishing Guide

## Langkah-Langkah Publish ke NPM

### Step 1: Buat Akun NPM (Jika Belum Punya)

1. Buka: https://www.npmjs.com/signup
2. Isi form registrasi:
   - **Username**: (pilih username unik)
   - **Email**: naufal97689@gmail.com
   - **Password**: (buat password yang kuat)
3. Verifikasi email Anda

### Step 2: Login ke NPM via Terminal

Jalankan perintah berikut di terminal:

```powershell
npm login
```

Anda akan diminta:
- **Username**: (username NPM Anda)
- **Password**: (password NPM Anda)
- **Email**: naufal97689@gmail.com
- **One-time password**: (jika 2FA enabled, cek email/authenticator app)

### Step 3: Verifikasi Login

```powershell
npm whoami
```

Ini akan menampilkan username NPM Anda jika login berhasil.

### Step 4: Publish Package

```powershell
npm publish --access public
```

**CATATAN**: 
- Flag `--access public` diperlukan untuk package gratis
- Tanpa flag ini, NPM akan mencoba publish sebagai private (berbayar)

### Step 5: Verifikasi Publikasi

Setelah berhasil, package Anda akan tersedia di:
**https://www.npmjs.com/package/thinking-protocol-mcp**

## 🔄 Update Package di Masa Depan

Setiap kali Anda ingin update package:

### 1. Update Versi

```powershell
# Untuk bug fixes (1.0.0 -> 1.0.1)
npm version patch

# Untuk fitur baru (1.0.0 -> 1.1.0)
npm version minor

# Untuk breaking changes (1.0.0 -> 2.0.0)
npm version major
```

### 2. Commit & Push

```powershell
git push origin main
git push --tags
```

### 3. Publish Update

```powershell
npm publish
```

## ⚠️ Troubleshooting

### Error: "You must be logged in to publish packages"

**Solusi**: Jalankan `npm login` terlebih dahulu

### Error: "Package name already exists"

**Solusi**: Nama `thinking-protocol-mcp` sudah diambil orang lain. Ganti nama di `package.json`:
```json
"name": "@RimGit-N/thinking-protocol-mcp"
```

Lalu publish dengan:
```powershell
npm publish --access public
```

### Error: "You do not have permission to publish"

**Solusi**: 
1. Pastikan Anda sudah login dengan `npm whoami`
2. Pastikan email sudah diverifikasi di NPM
3. Gunakan flag `--access public`

## ✅ Setelah Publish Berhasil

Orang lain bisa install package Anda dengan:

```bash
# Global installation
npm install -g thinking-protocol-mcp

# Via NPX (no installation)
npx -y thinking-protocol-mcp
```

---

**Ready to publish? Jalankan perintah di atas!** 🚀
