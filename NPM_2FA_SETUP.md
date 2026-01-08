# 🔐 Setup 2FA untuk NPM Publishing

## Error yang Terjadi

```
npm error 403 Two-factor authentication or granular access token 
with bypass 2fa enabled is required to publish packages.
```

## Solusi: Enable 2FA di NPM

### Metode 1: Enable 2FA via Browser (Paling Mudah) ⭐

1. **Login ke NPM**: https://www.npmjs.com/login
2. **Buka Settings**: Klik avatar (kanan atas) → "Account"
3. **Enable 2FA**:
   - Scroll ke bagian "Two-Factor Authentication"
   - Klik "Enable 2FA"
4. **Pilih Mode**:
   - **Authorization and Publishing** (Recommended) - Untuk login dan publish
   - **Authorization Only** - Hanya untuk login
5. **Setup Authenticator**:
   - Download app: **Google Authenticator**, **Authy**, atau **Microsoft Authenticator**
   - Scan QR code yang muncul
   - Masukkan 6-digit code dari app
6. **Simpan Recovery Codes**: Download dan simpan di tempat aman!

### Metode 2: Gunakan OTP saat Publish

Setelah 2FA enabled, saat publish Anda akan diminta OTP:

```powershell
npm publish --access public --otp=123456
```

Ganti `123456` dengan 6-digit code dari authenticator app Anda.

### Metode 3: Gunakan Granular Access Token (Alternatif)

Jika tidak ingin enable 2FA:

1. **Buka NPM**: https://www.npmjs.com/settings/rimgit/tokens
2. **Generate New Token**:
   - Klik "Generate New Token" → "Granular Access Token"
3. **Konfigurasi Token**:
   - **Token name**: `thinking-protocol-mcp-publish`
   - **Expiration**: 90 days (atau pilih durasi)
   - **Packages and scopes**: 
     - Select packages: `thinking-protocol-mcp`
     - Permissions: **Read and write**
4. **Generate Token**: Copy token yang muncul
5. **Login dengan Token**:
   ```powershell
   npm logout
   npm login
   ```
   - Username: `rimgit`
   - Password: (paste token Anda)
   - Email: naufal97689@gmail.com

## 🚀 Publish Setelah Setup 2FA

### Jika Menggunakan 2FA + Authenticator App:

```powershell
# Buka authenticator app, dapatkan 6-digit code
npm publish --access public --otp=123456
```

### Jika Menggunakan Granular Token:

```powershell
# Setelah login dengan token
npm publish --access public
```

## ✅ Verifikasi Publikasi

Setelah berhasil, package akan tersedia di:
**https://www.npmjs.com/package/thinking-protocol-mcp**

## 📝 Catatan Penting

- **2FA lebih aman** dan direkomendasikan oleh NPM
- **Recovery codes** harus disimpan dengan aman
- **Granular tokens** expire dalam 90 hari (perlu di-renew)
- Setiap publish memerlukan OTP jika 2FA enabled

---

**Pilih salah satu metode di atas untuk melanjutkan!** 🔐
