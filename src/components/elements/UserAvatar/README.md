# UserAvatar Component

## Архитектура

UserAvatar использует **динамическое переключение иконок** на основе CSS переменных без хардкода конкретных тем.

## Как это работает

### 1. **CSS переменная управляет иконками**
```scss
--thepro-useravatar-icon-type: default;   // Показывает DefaultAvatarIcon
--thepro-useravatar-icon-type: starwars;  // Показывает StarWarsAvatarIcon
```

### 2. **DynamicAvatarIcon читает CSS переменную**
- Использует хук `useCssVariable` для отслеживания `--thepro-useravatar-icon-type`
- Автоматически переключается между иконками при изменении темы
- Нет хардкода названий тем

### 3. **Реестр иконок**
```typescript
const ICON_REGISTRY = {
  default: DefaultAvatarIcon,    // Стандартная иконка
  starwars: StarWarsAvatarIcon,  // Star Wars иконка
}
```

### 4. **Темы автоматически применяют переменные**
- **light, dark, green** → `--thepro-useravatar-icon-type: default`
- **starwars** → `--thepro-useravatar-icon-type: starwars`

## Преимущества

✅ **UserAvatar не знает про конкретные иконки** - только про DynamicAvatarIcon  
✅ **CSS переменные полностью управляют выбором** - нет хардкода тем  
✅ **Легко добавлять новые иконки** - просто добавить в реестр  
✅ **Автоматическое переключение** - темы сами управляют иконками  
✅ **Чистая архитектура** - разделение ответственности  

## Добавление новой иконки

1. Создать новый компонент иконки (например, `CyberpunkAvatarIcon.vue`)
2. Добавить в реестр:
```typescript
const ICON_REGISTRY = {
  default: DefaultAvatarIcon,
  starwars: StarWarsAvatarIcon,
  cyberpunk: CyberpunkAvatarIcon, // Новая иконка
}
```
3. Добавить CSS переменную в тему:
```scss
[data-theme="cyberpunk"] {
  --thepro-useravatar-icon-type: cyberpunk;
}
```

## Структура файлов

```
UserAvatar/
├── UserAvatar.vue              # Основной компонент
├── DynamicAvatarIcon.vue       # Динамический выбор иконки
├── DefaultAvatarIcon.vue       # Стандартная иконка
├── StarWarsAvatarIcon.vue      # Star Wars иконка
├── useCssVariable.ts           # Хук для работы с CSS переменными
├── types.ts                    # TypeScript типы
├── constants.ts                # Константы
└── styles/
    ├── UserAvatar.scss         # Основные стили
    └── themes/                 # Тематические стили
        ├── light.scss
        ├── dark.scss
        ├── green.scss
        └── starwars.scss
```
