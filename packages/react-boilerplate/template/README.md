# Minimaui React Boilerplate

Modern React admin dashboard boilerplate'i Minimaui UI bileşenleri ile oluşturulmuştur.

## Özellikler

- ⚡ **Vite** - Hızlı geliştirme ortamı
- 🎨 **Minimaui UI** - Modern ve tutarlı tasarım sistemi
- 🔐 **Authentication** - Login/logout sistemi
- 🌙 **Dark/Light Theme** - Tema desteği
- 📱 **Responsive** - Mobil uyumlu tasarım
- 🛠 **TypeScript** - Tip güvenliği
- 🎯 **React Router** - Sayfa yönlendirme
- 📊 **Dashboard** - Admin paneli örnekleri

## Hızlı Başlangıç

### Gereksinimler

- Node.js 18+
- npm veya yarn

### Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Tarayıcıda http://localhost:3000 adresini aç
```

### Demo Hesap

- **Email:** admin@example.com
- **Şifre:** password

## Proje Yapısı

```
src/
├── components/          # Yeniden kullanılabilir bileşenler
│   ├── auth/           # Kimlik doğrulama bileşenleri
│   ├── layout/         # Layout bileşenleri
│   └── common/         # Ortak bileşenler
├── pages/              # Sayfa bileşenleri
├── providers/          # Context providers
├── hooks/              # Custom hooks
├── utils/              # Yardımcı fonksiyonlar
└── types/              # TypeScript tip tanımları
```

## Kullanılan Teknolojiler

- **React 18** - UI kütüphanesi
- **TypeScript** - Tip güvenliği
- **Vite** - Build tool
- **Tailwind CSS** - CSS framework
- **React Router** - Routing
- **React Hook Form** - Form yönetimi
- **Zod** - Schema validation
- **TanStack Query** - Server state management
- **Minimaui UI** - UI bileşen kütüphanesi

## Geliştirme

### Komutlar

```bash
npm run dev          # Geliştirme sunucusu
npm run build        # Production build
npm run preview      # Build önizleme
npm run lint         # ESLint kontrolü
npm run typecheck    # TypeScript kontrolü
```

### Yeni Sayfa Ekleme

1. `src/pages/` dizininde yeni sayfa bileşeni oluşturun
2. `src/App.tsx` dosyasında route ekleyin
3. `src/components/layout/DashboardLayout.tsx` dosyasında navigasyon menüsüne ekleyin

### Yeni Bileşen Ekleme

1. `src/components/` dizininde uygun alt dizinde bileşen oluşturun
2. TypeScript interface'lerini tanımlayın
3. Minimaui UI bileşenlerini kullanın

## Tema Özelleştirme

Tema ayarları `src/providers/ThemeProvider.tsx` dosyasında yönetilir:

- **Light Theme** - Açık tema
- **Dark Theme** - Koyu tema  
- **System Theme** - Sistem temasını takip et

## Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

MIT License - Detaylar için [LICENSE](LICENSE) dosyasına bakın.
