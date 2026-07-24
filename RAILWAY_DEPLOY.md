# Railway'ga Deploy Qo'llanmasi

## 1. GitHub'ga push qiling

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <YOUR_REPO_URL>
git push -u origin main
```

## 2. Railway'da loyiha yarating

1. [Railway](https://railway.app) saytiga kiring
2. **New Project** → **Deploy from GitHub repo**
3. Repozitoriyingizni tanlang

## 3. MySQL Database qo'shing

1. Railway dashboard'da **New** → **Database** → **MySQL** (Railway MySQL yoki Add plugin)
2. MySQL ulangandan so'ng, Railway avtomatik ravishda quyidagi env o'zgaruvchilarni beradi:
   - `MYSQLHOST`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`
   - `MYSQLDATABASE`
   - `MYSQLPORT`

## 4. Backend serviceni sozlang

Railway'da **New** → **Service** → **Add from GitHub**

Sozlamalar:
| Sozlama | Qiymat |
|---------|--------|
| **Root Directory** | `feyza-backend` |
| **Build Command** | (avtomatik - `npm run build`) |
| **Start Command** | (avtomatik - `npm start`) |

### Environment variables:
Railway MySQL avtomatik qo'yadi, qo'shimcha env kerak emas.

## 5. Frontend serviceni sozlang

**New** → **Service** → **Add from GitHub**

Sozlamalar:
| Sozlama | Qiymat |
|---------|--------|
| **Root Directory** | `feyza-frontend` |
| **Build Command** | (avtomatik - `npm run build`) |
| **Start Command** | (avtomatik - `npm start`) |

### Environment variables:
| Variable | Qiymat |
|----------|--------|
| `API_URL` | `https://<backend-service>.railway.app` (Backend URL'ni qo'ying) |
| `PORT` | (avtomatik - Railway beradi) |

Backend URL'ni topish: Backend service → **Settings** → **Networking** → **Public Networking** dan oling.

## 6. Muhim: Upload fayllar

Railway'da fayllar saqlanmaydi (ephemeral filesystem). Agar foydalanuvchilar rasm yuklasa, ular yo'qoladi. Buning uchun:

- **Qisqa muddat**: Upload qilingan rasmlarni backendga yuklash ishlaydi, lekin restart bo'lganda o'chadi
- **Uzoq muddat**: Cloud storage (AWS S3, Cloudinary, yoki Railway Volumes) kerak

## 7. Tayyor!

- **Frontend**: `https://<frontend-service>.railway.app`
- **Admin panel**: `https://<backend-service>.railway.app` (Backend admin'ni serve qiladi)
- **API**: `https://<backend-service>.railway.app/api`
