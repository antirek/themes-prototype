# Публикация пакета @thepro/cards

## Подготовка к публикации

### 1. Проверка валидации тем
```bash
npm run validate-themes
```

### 2. Сборка библиотеки
```bash
npm run build:lib
```

### 3. Проверка собранных файлов
```bash
ls -la dist/
```

Должны быть созданы:
- `dist/index.js` - CommonJS версия
- `dist/index.es.js` - ES модули версия
- `dist/themes/style.css` - CSS файлы тем
- `dist/components/` - Отдельные компоненты

### 4. Тестирование примера
```bash
cd example
npm install
npm run dev
```

Откройте http://localhost:3001 для проверки работы пакета.

## Публикация в npm

### 1. Логин в npm (если не залогинены)
```bash
npm login
```

### 2. Публикация пакета
```bash
npm publish
```

### 3. Публикация с тегом (для бета версий)
```bash
npm publish --tag beta
```

## Использование пакета

После публикации пакет можно установить:

```bash
npm install @thepro/cards
```

### Импорт компонентов
```typescript
import { CardHeader, CardBody, CardFooter, CardWithTheme } from '@thepro/cards';
```

### Импорт тем
```typescript
import '@thepro/cards/themes/light/light.css';
import '@thepro/cards/themes/dark/dark.css';
import '@thepro/cards/themes/green/green.css';
```

### Импорт типов
```typescript
import type { ThemeName, CardHeaderThemeCSSVariables } from '@thepro/cards';
```

## Версионирование

### Обновление версии
```bash
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.0 -> 1.1.0
npm version major  # 1.0.0 -> 2.0.0
```

### Публикация новой версии
```bash
npm run build:lib
npm publish
```

## Структура пакета

```
@thepro/cards/
├── dist/
│   ├── index.js              # CommonJS entry
│   ├── index.es.js           # ES modules entry
│   ├── themes/
│   │   └── style.css         # Все CSS темы
│   └── components/           # Отдельные компоненты
├── src/
│   ├── components/           # Vue компоненты
│   ├── themes/               # SCSS темы
│   └── index.ts              # Главный экспорт
└── package.json
```

## Проверка пакета

### Установка в тестовый проект
```bash
mkdir test-package
cd test-package
npm init -y
npm install @thepro/cards
```

### Создание тестового файла
```typescript
import { CardHeader, CardBody, CardFooter } from '@thepro/cards';
import '@thepro/cards/themes/light/light.css';

console.log('Package imported successfully!');
```

## Troubleshooting

### Ошибка при сборке
1. Проверьте, что все зависимости установлены
2. Запустите валидацию тем: `npm run validate-themes`
3. Очистите кэш: `rm -rf node_modules/.vite`

### Ошибка при публикации
1. Проверьте, что вы залогинены: `npm whoami`
2. Проверьте права на пакет: `npm access ls-packages`
3. Убедитесь, что версия уникальна

### Проблемы с импортом
1. Проверьте правильность путей в `package.json`
2. Убедитесь, что файлы собраны в `dist/`
3. Проверьте совместимость версий Vue
