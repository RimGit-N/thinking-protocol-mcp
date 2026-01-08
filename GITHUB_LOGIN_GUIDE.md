# 🔐 Cara Login GitHub di Terminal

## ⚠️ PENTING: GitHub Tidak Lagi Menerima Password Biasa!

Sejak 2021, GitHub tidak lagi menerima password biasa untuk autentikasi Git. Anda harus menggunakan **Personal Access Token (PAT)**.

## 🎯 Langkah-Langkah Login GitHub

### Metode 1: Personal Access Token (PAT) - RECOMMENDED ⭐

#### Step 1: Buat Personal Access Token

1. **Login ke GitHub** di browser: https://github.com/login
2. **Buka Settings**: Klik foto profil (kanan atas) → Settings
3. **Developer Settings**: Scroll ke bawah → klik "Developer settings"
4. **Personal Access Tokens**: 
   - Klik "Personal access tokens" 
   - Pilih "Tokens (classic)"
5. **Generate New Token**:
   - Klik "Generate new token" → "Generate new token (classic)"
6. **Konfigurasi Token**:
   - **Note**: `thinking-protocol-mcp-upload` (atau nama lain)
   - **Expiration**: Pilih durasi (30 days, 60 days, atau No expiration)
   - **Select scopes**: Centang **`repo`** (ini akan centang semua sub-options di bawahnya)
7. **Generate Token**: Klik "Generate token" di bawah
8. **COPY TOKEN**: ⚠️ **SANGAT PENTING!** Copy token yang muncul dan simpan di tempat aman. Token ini hanya muncul SEKALI!

Token akan terlihat seperti ini:
```
ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### Step 2: Gunakan Token Saat Push

Ketika Anda menjalankan `git push`, Git akan meminta username dan password:

```powershell
git push -u origin main
```

**Input yang harus Anda masukkan:**
- **Username**: `RimGit-N`
- **Password**: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` (paste token Anda, BUKAN password GitHub!)

### Metode 2: GitHub CLI (gh) - ALTERNATIF

Cara yang lebih modern dan mudah:

#### Step 1: Install GitHub CLI

Download dari: https://cli.github.com/

Atau via winget:
```powershell
winget install --id GitHub.cli
```

#### Step 2: Login via GitHub CLI

```powershell
gh auth login
```

Ikuti prompt interaktif:
1. **What account do you want to log into?** → GitHub.com
2. **What is your preferred protocol for Git operations?** → HTTPS
3. **Authenticate Git with your GitHub credentials?** → Yes
4. **How would you like to authenticate GitHub CLI?** → Login with a web browser

Copy kode yang muncul, tekan Enter, browser akan terbuka, paste kode, dan authorize.

#### Step 3: Push Seperti Biasa

Setelah login via `gh`, Anda tidak perlu input username/password lagi:

```powershell
git push -u origin main
```

## 🚀 Perintah Lengkap untuk Upload

### Jika Menggunakan PAT (Token):

```powershell
# 1. Tambahkan remote
git remote add origin https://github.com/RimGit-N/thinking-protocol-mcp.git

# 2. Rename branch ke main
git branch -M main

# 3. Push (akan minta username & token)
git push -u origin main
# Username: RimGit-N
# Password: ghp_your_token_here
```

### Jika Menggunakan GitHub CLI:

```powershell
# 1. Login dulu (sekali saja)
gh auth login

# 2. Tambahkan remote
git remote add origin https://github.com/RimGit-N/thinking-protocol-mcp.git

# 3. Rename branch ke main
git branch -M main

# 4. Push (otomatis terautentikasi)
git push -u origin main
```

## 💾 Simpan Kredensial (Opsional)

Agar tidak perlu input token setiap kali push:

### Windows:

```powershell
git config --global credential.helper wincred
```

Setelah ini, Git akan menyimpan token Anda di Windows Credential Manager.

### Atau gunakan Git Credential Manager:

Download: https://github.com/git-ecosystem/git-credential-manager/releases

## 🔍 Troubleshooting

### Error: "Support for password authentication was removed"

**Solusi**: Anda menggunakan password GitHub biasa. Gunakan Personal Access Token (PAT) sebagai gantinya.

### Error: "remote: Permission denied"

**Solusi**: 
1. Pastikan token memiliki scope `repo`
2. Pastikan username benar: `RimGit-N`
3. Generate token baru jika perlu

### Error: "fatal: repository not found"

**Solusi**: Pastikan Anda sudah membuat repository di GitHub dengan nama `thinking-protocol-mcp`

## ✅ Checklist Sebelum Push

- [ ] Repository `thinking-protocol-mcp` sudah dibuat di GitHub
- [ ] Repository diset sebagai **Public**
- [ ] Personal Access Token sudah dibuat dengan scope `repo`
- [ ] Token sudah di-copy dan disimpan
- [ ] Git identity sudah di-setup (`user.name` dan `user.email`)

---

**Setelah berhasil push, repository Anda akan tersedia di:**
**https://github.com/RimGit-N/thinking-protocol-mcp** 🎉
