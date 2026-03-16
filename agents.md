# Proje Hafızası: Çınarlar Boru ve Sulama Sistemleri

Bu dosya, projenin teknik yapısını, tasarım kurallarını ve kritik yapılandırmalarını özetler. Yeni bir oturum başladığında veya geliştirme yapıldığında bu dosyayı okuyarak bağlamı hızla kavrayabilirsiniz.

## 🛠 Teknik Yığın (Tech Stack)
- **Framework:** React 19 + Vite
- **Dil:** TypeScript (TSX)
- **Styling:** Tailwind CSS v4
- **Animasyon:** Motion (motion/react)
- **İkonlar:** Lucide React
- **Backend:** Supabase (Bağlantı: `src/lib/supabase.ts`)
- **Yönlendirme:** React Router DOM

## 🎨 Tasarım Standartları (Critical Design Rules)
- **Köşe Yuvarlaklığı:** Proje genelindeki tüm butonlar ve badge'ler `rounded-xl` sınıfını kullanır. "Pill-shaped" (oval) görünümden kaçınılmıştır.
- **Header Yerleşimi:**
  - Logo ve Yazı Mesafesi: `gap-0`
  - Başlık Metni Sola Kaydırma: Logo görselindeki boşluğu kompanse etmek için başlığa `-ml-8` uygulanmıştır.
  - Satır Aralığı: Başlık metni `leading-[1.1]` ile sıkıştırılmıştır.
- **Renkler:** Tailwind yapılandırmasında `agri-green`, `agri-water`, `agri-text` gibi özel renk tokenları kullanılmaktadır.

## 📊 Veritabanı Şeması (Supabase)
### `blogs` Tablosu:
```sql
create table blogs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  summary text,
  content text not null,
  image_url text,
  category text default 'Genel',
  author text default 'Çınarlar Editör Ekibi',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

## 🔄 Otomasyon ve Veri Akışı
- **Blog Otomasyonu:** n8n üzerinden haftada 2 kez otomatik içerik üretilir.
- **Entegrasyon:** n8n çıktısı doğrudan Supabase REST API (POST) üzerinden `blogs` tablosuna yazılır.
- **Arayüz:** `BlogList.tsx` ve `BlogDetail.tsx` bileşenleri veriyi dinamik olarak Supabase'den çeker.

## 📂 Dosya Yapısı
- `src/pages/`: Sayfa bileşenleri (`Home`, `BlogList`, `BlogDetail`)
- `src/components/`: Ortak bileşenler (`Layout`)
- `src/lib/supabase.ts`: Üçüncü taraf servis yapılandırmaları (`supabase.ts`)

## ⚡ Optimizasyon Protokolü (Token Tasarrufu)
Bu proje üzerinde çalışırken aşağıdaki kurallara uyulur:
1. **Dosya Güncelliği:** Her önemli teknik değişiklikten sonra `agents.md` güncellenir.
2. **Değişim Özeti:** Her görev sonunda yapılanlar madde madde raporlanır.
3. **Bağlam Odaklılık:** Sadece ilgili dosyalar üzerinde işlem yapılır, gereksiz dosya okumalarından kaçınılır.
