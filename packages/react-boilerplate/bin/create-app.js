#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const args = process.argv.slice(2);
const projectName = args[0];

if (!projectName) {
  console.error('❌ Proje adı belirtmelisiniz!');
  console.log('Kullanım: npx @minimaui/react-boilerplate <proje-adı>');
  process.exit(1);
}

const projectPath = path.resolve(process.cwd(), projectName);

// Proje dizini zaten var mı kontrol et
if (fs.existsSync(projectPath)) {
  console.error(`❌ "${projectName}" dizini zaten mevcut!`);
  process.exit(1);
}

console.log(`🚀 "${projectName}" projesi oluşturuluyor...`);

try {
  // Proje dizinini oluştur
  fs.mkdirSync(projectPath, { recursive: true });
  
  // Template dosyalarını kopyala
  const templatePath = path.join(__dirname, '..', 'template');
  copyTemplate(templatePath, projectPath);
  
  // package.json'da proje adını güncelle
  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.name = projectName;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  
  console.log('✅ Proje başarıyla oluşturuldu!');
  console.log('');
  console.log('📦 Bağımlılıkları yüklemek için:');
  console.log(`   cd ${projectName}`);
  console.log('   npm install');
  console.log('');
  console.log('🚀 Geliştirme sunucusunu başlatmak için:');
  console.log('   npm run dev');
  
} catch (error) {
  console.error('❌ Proje oluşturulurken hata oluştu:', error.message);
  process.exit(1);
}

function copyTemplate(src, dest) {
  const stats = fs.statSync(src);
  
  if (stats.isDirectory()) {
    // Dizin ise içeriğini kopyala
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    const files = fs.readdirSync(src);
    files.forEach(file => {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);
      copyTemplate(srcPath, destPath);
    });
  } else {
    // Dosya ise kopyala
    fs.copyFileSync(src, dest);
  }
}
