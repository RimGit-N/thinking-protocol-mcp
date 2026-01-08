# 📱 Cara Login NPM di HP dengan Bitwarden 2FA

## 🔐 Situasi Anda

- ✅ NPM account: `rimgit`
- ✅ Email: `naufal97689@gmail.com`
- ✅ 2FA enabled dengan Bitwarden Authenticator (di laptop)
- ❓ Ingin login di HP

---

## 🎯 Solusi: 3 Cara Login NPM di HP

### **Cara 1: Install Bitwarden di HP (Recommended)** ⭐

Bitwarden bisa sync 2FA codes ke semua device Anda!

#### Langkah-Langkah:

1. **Install Bitwarden di HP**:
   - **Android**: https://play.google.com/store/apps/details?id=com.x8bit.bitwarden
   - **iOS**: https://apps.apple.com/app/bitwarden-password-manager/id1137397744

2. **Login ke Bitwarden**:
   - Buka app Bitwarden di HP
   - Login dengan akun Bitwarden yang sama dengan laptop
   - Masukkan master password Bitwarden Anda

3. **Sync Data**:
   - Bitwarden akan otomatis sync semua data termasuk 2FA codes
   - Cari item "NPM" atau "npmjs.com" di vault Bitwarden

4. **Dapatkan 2FA Code**:
   - Tap pada item NPM
   - Lihat bagian "Authenticator Key (TOTP)"
   - Code 6-digit akan muncul dan auto-refresh setiap 30 detik

5. **Login NPM di HP**:
   - Buka browser di HP: https://www.npmjs.com/login
   - Username: `rimgit`
   - Password: (password NPM Anda)
   - 2FA Code: (dari Bitwarden app di HP)

✅ **Keuntungan**: 
- Sync otomatis ke semua device
- Satu app untuk semua password & 2FA
- Backup otomatis

---

### **Cara 2: Gunakan Recovery Codes** 🔑

NPM memberikan recovery codes saat Anda setup 2FA.

#### Langkah-Langkah:

1. **Cek Recovery Codes** (di laptop):
   - Login ke NPM: https://www.npmjs.com/settings/rimgit/account
   - Scroll ke "Two-Factor Authentication"
   - Klik "View recovery codes" atau "Regenerate recovery codes"
   - **SIMPAN** recovery codes di tempat aman (Bitwarden vault)

2. **Login di HP dengan Recovery Code**:
   - Buka: https://www.npmjs.com/login
   - Username: `rimgit`
   - Password: (password NPM Anda)
   - Saat diminta 2FA code, klik "Use a recovery code"
   - Masukkan salah satu recovery code

⚠️ **Catatan**: 
- Setiap recovery code hanya bisa digunakan SEKALI
- Setelah digunakan, code tersebut tidak valid lagi
- Anda punya 10 recovery codes

---

### **Cara 3: Export TOTP Secret dari Bitwarden** 🔐

Jika Bitwarden extension menyimpan TOTP secret, Anda bisa setup di authenticator app lain.

#### Langkah-Langkah:

1. **Di Laptop - Export TOTP Secret**:
   - Buka Bitwarden extension
   - Cari item "NPM" atau "npmjs.com"
   - Klik "Edit"
   - Cari "Authenticator Key (TOTP)"
   - Copy secret key (biasanya format: `otpauth://totp/...` atau string panjang)

2. **Di HP - Import ke Authenticator App**:
   
   **Option A: Google Authenticator**
   - Install: [Android](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2) | [iOS](https://apps.apple.com/app/google-authenticator/id388497605)
   - Buka app → "+" → "Enter a setup key"
   - Account: `NPM - rimgit`
   - Key: (paste TOTP secret dari Bitwarden)
   - Time-based: ON
   - Add

   **Option B: Microsoft Authenticator**
   - Install: [Android](https://play.google.com/store/apps/details?id=com.azure.authenticator) | [iOS](https://apps.apple.com/app/microsoft-authenticator/id983156458)
   - Buka app → "+" → "Other account"
   - Scan QR atau enter manually
   - Paste TOTP secret

   **Option C: Authy**
   - Install: [Android](https://play.google.com/store/apps/details?id=com.authy.authy) | [iOS](https://apps.apple.com/app/authy/id494168017)
   - Buka app → "+" → "Enter key manually"
   - Paste TOTP secret

3. **Login NPM di HP**:
   - Browser: https://www.npmjs.com/login
   - Username: `rimgit`
   - Password: (password NPM)
   - 2FA Code: (dari authenticator app di HP)

---

## 🎯 Rekomendasi Saya

### **Gunakan Cara 1: Install Bitwarden di HP** ⭐

**Alasan**:
- ✅ Paling mudah dan praktis
- ✅ Sync otomatis ke semua device
- ✅ Satu app untuk semua (password + 2FA)
- ✅ Backup otomatis ke cloud Bitwarden
- ✅ Tidak perlu setup ulang 2FA

**Cara 2 & 3** hanya jika Anda tidak ingin install Bitwarden di HP.

---

## 📋 Checklist Setup Bitwarden di HP

- [ ] Download Bitwarden app di HP
- [ ] Login dengan akun Bitwarden yang sama
- [ ] Sync data (otomatis)
- [ ] Cari item NPM di vault
- [ ] Verifikasi 2FA code muncul
- [ ] Test login NPM di browser HP

---

## 🔒 Tips Keamanan

1. **Backup Recovery Codes**:
   - Simpan di Bitwarden vault
   - Print dan simpan di tempat aman
   - Jangan share dengan siapa pun

2. **Enable Bitwarden 2FA**:
   - Protect Bitwarden vault dengan 2FA juga
   - Gunakan authenticator app terpisah untuk Bitwarden

3. **Biometric Lock**:
   - Enable fingerprint/face unlock di Bitwarden app
   - Lebih cepat dan aman

---

## ❓ Troubleshooting

### "Bitwarden tidak sync 2FA codes"

**Solusi**:
1. Pull down to refresh di Bitwarden app
2. Logout dan login ulang
3. Check internet connection
4. Pastikan menggunakan akun Bitwarden yang sama

### "2FA code tidak diterima NPM"

**Solusi**:
1. Pastikan waktu di HP sudah benar (2FA sensitive terhadap waktu)
2. Tunggu code baru (refresh setiap 30 detik)
3. Gunakan recovery code sebagai backup

### "Tidak punya recovery codes"

**Solusi**:
1. Login di laptop
2. Buka: https://www.npmjs.com/settings/rimgit/account
3. Regenerate recovery codes
4. Simpan di Bitwarden vault

---

## 📱 Quick Guide (TL;DR)

**Paling Mudah**:
1. Install Bitwarden di HP
2. Login dengan akun yang sama
3. Buka item NPM
4. Copy 2FA code
5. Login NPM di browser HP

**Alternatif**:
- Gunakan recovery code (one-time use)
- Export TOTP secret ke authenticator app lain

---

**Apakah Anda sudah punya Bitwarden app di HP, atau perlu bantuan setup?** 😊
