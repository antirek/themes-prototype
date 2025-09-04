#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

/**
 * Интерфейс для CSS переменных темы
 */
interface ThemeCSSVariables {
  [key: string]: string;
}

/**
 * Интерфейс для результатов валидации соответствия интерфейсу
 */
interface InterfaceValidationResult {
  component: string;
  theme: string;
  isValid: boolean;
  errors: string[];
  missingVariables: string[];
  extraVariables: string[];
}

/**
 * Интерфейс для результатов валидации префиксов
 */
interface PrefixValidationResult {
  component: string;
  theme: string;
  isValid: boolean;
  errors: string[];
  invalidPrefixes: string[];
}

/**
 * Интерфейс для результатов валидации запрещенных переменных
 */
interface ForbiddenVariablesValidationResult {
  component: string;
  theme: string;
  isValid: boolean;
  errors: string[];
  forbiddenVariables: string[];
}

/**
 * Интерфейс для результатов валидации использования базовых настроек темы
 */
interface ThemeUsageValidationResult {
  component: string;
  theme: string;
  isValid: boolean;
  errors: string[];
  hardcodedValues: string[];
}

/**
 * Интерфейс для результатов валидации отсутствия data-theme в файлах стилей
 */
interface DataThemeValidationResult {
  component: string;
  theme: string;
  isValid: boolean;
  errors: string[];
  dataThemeUsage: string[];
}

/**
 * Интерфейс для результатов валидации отсутствия CSS классов в файлах тем
 */
interface CSSClassesValidationResult {
  component: string;
  theme: string;
  isValid: boolean;
  errors: string[];
  cssClasses: string[];
}

/**
 * Интерфейс для результатов валидации отсутствия импортов тем в файлах стилей
 */
interface ThemeImportsValidationResult {
  component: string;
  theme: string;
  isValid: boolean;
  errors: string[];
  themeImports: string[];
}

/**
 * Интерфейс для результатов валидации использования глобальных переменных тем в файлах стилей
 */
interface GlobalThemeVariablesValidationResult {
  component: string;
  theme: string;
  isValid: boolean;
  errors: string[];
  globalVariables: string[];
}

/**
 * Извлекает CSS переменные из SCSS файла
 */
function extractCSSVariablesFromSCSS(filePath: string): ThemeCSSVariables {
  const content = fs.readFileSync(filePath, 'utf-8');
  const variables: ThemeCSSVariables = {};
  
  // Регулярное выражение для поиска CSS переменных
  const variableRegex = /--thepro-([^:]+):\s*([^;]+);/g;
  let match;
  
  while ((match = variableRegex.exec(content)) !== null) {
    const variableName = `--thepro-${match[1]}`;
    const variableValue = match[2].trim();
    variables[variableName] = variableValue;
  }
  
  return variables;
}

/**
 * Получает интерфейс компонента из файла types.ts
 */
function getComponentInterface(componentPath: string): string[] {
  const typesPath = path.join(componentPath, 'types.ts');
  
  if (!fs.existsSync(typesPath)) {
    return [];
  }
  
  const content = fs.readFileSync(typesPath, 'utf-8');
  const interfaceRegex = /export interface (\w*ThemeCSSVariables)\s*{([^}]+)}/s;
  const match = content.match(interfaceRegex);
  
  if (!match) {
    return [];
  }
  
  const interfaceContent = match[2];
  const variables: string[] = [];
  
  // Извлекаем переменные из интерфейса
  const variableRegex = /'([^']+)':\s*string;/g;
  let varMatch;
  
  while ((varMatch = variableRegex.exec(interfaceContent)) !== null) {
    variables.push(varMatch[1]);
  }
  
  return variables;
}

/**
 * Валидирует соответствие темы интерфейсу компонента
 */
function validateComponentThemeInterface(
  componentName: string,
  themePath: string,
  expectedVariables: string[]
): InterfaceValidationResult {
  const themeName = path.basename(themePath, '.scss');
  const actualVariables = extractCSSVariablesFromSCSS(themePath);
  const actualVariableNames = Object.keys(actualVariables);
  
  const missingVariables = expectedVariables.filter(
    expected => !actualVariableNames.includes(expected)
  );
  
  const extraVariables = actualVariableNames.filter(
    actual => !expectedVariables.includes(actual)
  );
  
  const isValid = missingVariables.length === 0 && extraVariables.length === 0;
  const errors: string[] = [];
  
  if (missingVariables.length > 0) {
    errors.push(`Отсутствуют переменные: ${missingVariables.join(', ')}`);
  }
  
  if (extraVariables.length > 0) {
    errors.push(`Лишние переменные: ${extraVariables.join(', ')}`);
  }
  
  return {
    component: componentName,
    theme: themeName,
    isValid,
    errors,
    missingVariables,
    extraVariables
  };
}

/**
 * Валидирует префиксы CSS переменных для компонентов
 */
function validateCSSVariablePrefixes(
  componentName: string,
  themePath: string
): PrefixValidationResult {
  const themeName = path.basename(themePath, '.scss');
  const content = fs.readFileSync(themePath, 'utf-8');
  
  // Регулярное выражение для поиска всех CSS переменных
  const variableRegex = /--thepro-([a-zA-Z0-9-]+):/g;
  const expectedPrefix = `--thepro-${componentName.toLowerCase()}`;
  const invalidPrefixes: string[] = [];
  let match;
  
  while ((match = variableRegex.exec(content)) !== null) {
    const fullVariableName = `--thepro-${match[1]}`;
    
    // Проверяем, что переменная начинается с правильного префикса
    if (!fullVariableName.startsWith(expectedPrefix)) {
      invalidPrefixes.push(fullVariableName);
    }
  }
  
  const isValid = invalidPrefixes.length === 0;
  const errors: string[] = [];
  
  if (invalidPrefixes.length > 0) {
    errors.push(`Неправильные префиксы: ${invalidPrefixes.join(', ')}`);
  }
  
  return {
    component: componentName,
    theme: themeName,
    isValid,
    errors,
    invalidPrefixes
  };
}

/**
 * Валидирует префиксы CSS переменных для глобальных тем
 */
function validateCSSVariablePrefixesForGlobalTheme(
  themeName: string,
  themePath: string
): PrefixValidationResult {
  const content = fs.readFileSync(themePath, 'utf-8');
  
  // Регулярное выражение для поиска всех CSS переменных
  const variableRegex = /--thepro-([a-zA-Z0-9-]+):/g;
  const expectedPrefix = '--thepro-theme-';
  const invalidPrefixes: string[] = [];
  let match;
  
  while ((match = variableRegex.exec(content)) !== null) {
    const fullVariableName = `--thepro-${match[1]}`;
    
    // Проверяем, что переменная начинается с правильного префикса для глобальных тем
    if (!fullVariableName.startsWith(expectedPrefix)) {
      invalidPrefixes.push(fullVariableName);
    }
  }
  
  const isValid = invalidPrefixes.length === 0;
  const errors: string[] = [];
  
  if (invalidPrefixes.length > 0) {
    errors.push(`Неправильные префиксы: ${invalidPrefixes.join(', ')}`);
  }
  
  return {
    component: themeName,
    theme: themeName,
    isValid,
    errors,
    invalidPrefixes
  };
}

/**
 * Валидирует отсутствие глобальных переменных в файлах стилей компонентов
 */
function validateForbiddenGlobalVariables(
  componentName: string,
  themePath: string
): ForbiddenVariablesValidationResult {
  const themeName = path.basename(themePath, '.scss');
  const content = fs.readFileSync(themePath, 'utf-8');
  
  // Регулярное выражение для поиска глобальных переменных
  const globalVariableRegex = /--thepro-theme-([a-zA-Z0-9-]+):/g;
  const forbiddenVariables: string[] = [];
  let match;
  
  while ((match = globalVariableRegex.exec(content)) !== null) {
    const fullVariableName = `--thepro-theme-${match[1]}`;
    forbiddenVariables.push(fullVariableName);
  }
  
  const isValid = forbiddenVariables.length === 0;
  const errors: string[] = [];
  
  if (forbiddenVariables.length > 0) {
    errors.push(`Запрещенные глобальные переменные: ${forbiddenVariables.join(', ')}`);
  }
  
  return {
    component: componentName,
    theme: themeName,
    isValid,
    errors,
    forbiddenVariables
  };
}

/**
 * Валидирует использование базовых настроек темы в файлах стилей компонентов
 */
function validateThemeUsageInComponents(
  componentName: string,
  stylePath: string
): ThemeUsageValidationResult {
  const content = fs.readFileSync(stylePath, 'utf-8');
  const hardcodedValues: string[] = [];
  
  // Функция для проверки, содержит ли строка CSS переменную
  function containsCSSVariable(line: string): boolean {
    return line.includes('var(--thepro-') || line.includes('var(--shadow-');
  }
  
  // Функция для проверки, является ли значение CSS переменной
  function isCSSVariable(value: string): boolean {
    return value.trim().startsWith('var(--thepro-') || value.trim().startsWith('var(--shadow-');
  }
  
  // Функция для получения строки, содержащей совпадение
  function getLineContainingMatch(content: string, matchIndex: number): string {
    const beforeMatch = content.substring(0, matchIndex);
    const lines = beforeMatch.split('\n');
    return lines[lines.length - 1] || '';
  }
  
  // Проверяем жестко заданные цвета (исключаем CSS переменные)
  const colorRegex = /:\s*(#[0-9a-fA-F]{3,6}|rgba?\([^)]+\)|hsla?\([^)]+\));/g;
  let colorMatch;
  while ((colorMatch = colorRegex.exec(content)) !== null) {
    const currentLine = getLineContainingMatch(content, colorMatch.index);
    
    if (!containsCSSVariable(currentLine)) {
      hardcodedValues.push(`Жестко заданный цвет: ${colorMatch[1]}`);
    }
  }
  
  // Проверяем жестко заданные размеры шрифтов (исключаем CSS переменные)
  const fontSizeRegex = /font-size:\s*([0-9.]+(?:rem|em|px|%));/g;
  let fontSizeMatch;
  while ((fontSizeMatch = fontSizeRegex.exec(content)) !== null) {
    const currentLine = getLineContainingMatch(content, fontSizeMatch.index);
    
    if (!containsCSSVariable(currentLine)) {
      hardcodedValues.push(`Жестко заданный размер шрифта: ${fontSizeMatch[1]}`);
    }
  }
  
  // Проверяем жестко заданные отступы (исключаем CSS переменные)
  const paddingRegex = /padding:\s*([0-9.]+(?:rem|em|px|%)(?:\s+[0-9.]+(?:rem|em|px|%))*);/g;
  let paddingMatch;
  while ((paddingMatch = paddingRegex.exec(content)) !== null) {
    const currentLine = getLineContainingMatch(content, paddingMatch.index);
    
    if (!containsCSSVariable(currentLine)) {
      hardcodedValues.push(`Жестко заданные отступы: ${paddingMatch[1]}`);
    }
  }
  
  // Проверяем жестко заданные скругления (исключаем CSS переменные)
  const borderRadiusRegex = /border-radius:\s*([0-9.]+(?:rem|em|px|%));/g;
  let borderRadiusMatch;
  while ((borderRadiusMatch = borderRadiusRegex.exec(content)) !== null) {
    const currentLine = getLineContainingMatch(content, borderRadiusMatch.index);
    
    if (!containsCSSVariable(currentLine)) {
      hardcodedValues.push(`Жестко заданное скругление: ${borderRadiusMatch[1]}`);
    }
  }
  
  // Проверяем жестко заданные шрифты (исключаем CSS переменные)
  const fontFamilyRegex = /font-family:\s*([^;]+);/g;
  let fontFamilyMatch;
  while ((fontFamilyMatch = fontFamilyRegex.exec(content)) !== null) {
    const currentLine = getLineContainingMatch(content, fontFamilyMatch.index);
    const fontValue = fontFamilyMatch[1].trim();
    
    if (!containsCSSVariable(currentLine) && !isCSSVariable(fontValue)) {
      hardcodedValues.push(`Жестко заданный шрифт: ${fontValue}`);
    }
  }
  
  // Проверяем жестко заданные тени (исключаем CSS переменные)
  const boxShadowRegex = /box-shadow:\s*([^;]+);/g;
  let boxShadowMatch;
  while ((boxShadowMatch = boxShadowRegex.exec(content)) !== null) {
    const currentLine = getLineContainingMatch(content, boxShadowMatch.index);
    const shadowValue = boxShadowMatch[1].trim();
    
    if (!containsCSSVariable(currentLine) && !isCSSVariable(shadowValue)) {
      hardcodedValues.push(`Жестко заданная тень: ${shadowValue}`);
    }
  }
  
  const isValid = hardcodedValues.length === 0;
  const errors: string[] = [];
  
  if (hardcodedValues.length > 0) {
    errors.push(`Жестко заданные значения: ${hardcodedValues.join(', ')}`);
  }
  
  return {
    component: componentName,
    theme: 'style.scss',
    isValid,
    errors,
    hardcodedValues
  };
}

/**
 * Валидирует отсутствие data-theme в файлах стилей компонентов
 */
function validateNoDataThemeInStyleFiles(
  componentName: string,
  stylePath: string
): DataThemeValidationResult {
  const content = fs.readFileSync(stylePath, 'utf-8');
  const dataThemeUsage: string[] = [];
  
  // Регулярное выражение для поиска data-theme
  const dataThemeRegex = /\[data-theme="[^"]+"\]/g;
  let match;
  
  while ((match = dataThemeRegex.exec(content)) !== null) {
    dataThemeUsage.push(match[0]);
  }
  
  const isValid = dataThemeUsage.length === 0;
  const errors: string[] = [];
  
  if (dataThemeUsage.length > 0) {
    errors.push(`Использование data-theme в файле стилей: ${dataThemeUsage.join(', ')}`);
  }
  
  return {
    component: componentName,
    theme: 'style.scss',
    isValid,
    errors,
    dataThemeUsage
  };
}

/**
 * Валидирует отсутствие CSS классов в файлах тем компонентов
 */
function validateNoCSSClassesInThemeFiles(
  componentName: string,
  themePath: string
): CSSClassesValidationResult {
  const themeName = path.basename(themePath, '.scss');
  const content = fs.readFileSync(themePath, 'utf-8');
  const cssClasses: string[] = [];
  
  // Разбиваем на строки и проверяем каждую
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Пропускаем пустые строки и комментарии
    if (!line || line.startsWith('//') || line.startsWith('/*')) {
      continue;
    }
    
    // Ищем CSS классы в строке
    const classMatch = line.match(/\.([a-zA-Z][a-zA-Z0-9_-]*)\s*{/);
    if (classMatch) {
      const className = classMatch[1];
      
      // Запрещаем любые CSS классы в файлах тем компонентов
      cssClasses.push(`.${className}`);
    }
  }
  
  const isValid = cssClasses.length === 0;
  const errors: string[] = [];
  
  if (cssClasses.length > 0) {
    errors.push(`CSS классы в файле темы: ${cssClasses.join(', ')}`);
  }
  
  return {
    component: componentName,
    theme: themeName,
    isValid,
    errors,
    cssClasses
  };
}

/**
 * Валидирует отсутствие импортов тем в файлах стилей компонентов
 */
function validateNoThemeImportsInStyleFiles(
  componentName: string,
  stylePath: string
): ThemeImportsValidationResult {
  const content = fs.readFileSync(stylePath, 'utf-8');
  const themeImports: string[] = [];
  
  // Регулярное выражение для поиска импортов тем
  const themeImportRegex = /@use\s+['"]\.\/themes\/([^'"]+)\.scss['"]/g;
  let match;
  
  while ((match = themeImportRegex.exec(content)) !== null) {
    themeImports.push(`@use './themes/${match[1]}.scss'`);
  }
  
  const isValid = themeImports.length === 0;
  const errors: string[] = [];
  
  if (themeImports.length > 0) {
    errors.push(`Импорты тем в файле стилей: ${themeImports.join(', ')}`);
  }
  
  return {
    component: componentName,
    theme: 'style.scss',
    isValid,
    errors,
    themeImports
  };
}

/**
 * Проверяет, что в файле стилей компонента не используются глобальные переменные тем
 */
function validateNoGlobalThemeVariablesInStyleFiles(
  componentName: string,
  stylePath: string
): GlobalThemeVariablesValidationResult {
  const content = fs.readFileSync(stylePath, 'utf-8');
  const globalVariables: string[] = [];
  
  // Регулярное выражение для поиска глобальных переменных тем (исключаем переменные компонента)
  // Ищем --thepro-theme-*, но исключаем --thepro-theme-<компонент>-*
  const globalThemeVarRegex = /var\(--thepro-theme-(?!\w+-)[^)]+\)/g;
  let match;
  
  while ((match = globalThemeVarRegex.exec(content)) !== null) {
    globalVariables.push(match[0]);
  }
  
  const isValid = globalVariables.length === 0;
  const errors: string[] = [];
  
  if (globalVariables.length > 0) {
    errors.push(`Использование глобальных переменных тем: ${globalVariables.join(', ')}`);
  }
  
  return {
    component: componentName,
    theme: 'style.scss',
    isValid,
    errors,
    globalVariables
  };
}

/**
 * Основная функция валидации
 */
async function validateAllThemes(): Promise<void> {
  console.log('🔍 Начинаю валидацию тем компонентов и глобальных тем...\n');
  
  // Находим все компоненты (исключаем atoms, так как они не содержат тем)
  const allPaths = await glob('src/components/*/*');
  const componentPaths = allPaths.filter(path => {
    const isDirectory = fs.statSync(path).isDirectory();
    const pathParts = path.split('/');
    const parentDir = pathParts[pathParts.length - 2]; // Получаем родительскую директорию
    const isNotAtoms = parentDir !== 'atoms'; // Исключаем atoms
    // Исключаем подпапки (styles, stories, themes)
    const componentName = pathParts[pathParts.length - 1];
    const isNotSubfolder = !['styles', 'stories', 'themes'].includes(componentName);
    return isDirectory && isNotAtoms && isNotSubfolder;
  });
  const interfaceResults: InterfaceValidationResult[] = [];
  const prefixResults: PrefixValidationResult[] = [];
  const forbiddenResults: ForbiddenVariablesValidationResult[] = [];
  const themeUsageResults: ThemeUsageValidationResult[] = [];
  const dataThemeResults: DataThemeValidationResult[] = [];
  const cssClassesResults: CSSClassesValidationResult[] = [];
  const themeImportsResults: ThemeImportsValidationResult[] = [];
  const globalThemeVariablesResults: GlobalThemeVariablesValidationResult[] = [];
  
  for (const componentPath of componentPaths) {
    const componentName = path.basename(componentPath);
    const typesPath = path.join(componentPath, 'types.ts');
    
    // Проверяем основной файл стилей компонента (для всех компонентов)
    const stylePath = path.join(componentPath, 'styles', `${componentName}.scss`);
    if (fs.existsSync(stylePath)) {
      const themeImportsResult = validateNoThemeImportsInStyleFiles(componentName, stylePath);
      themeImportsResults.push(themeImportsResult);
      
      const globalThemeVariablesResult = validateNoGlobalThemeVariablesInStyleFiles(componentName, stylePath);
      globalThemeVariablesResults.push(globalThemeVariablesResult);
      
      if (!themeImportsResult.isValid) {
        console.log(`   ❌  style.scss: ${themeImportsResult.errors.join('; ')}`);
      }
      
      if (!globalThemeVariablesResult.isValid) {
        console.log(`   ❌  style.scss: ${globalThemeVariablesResult.errors.join('; ')}`);
      }
    }
    
    // Проверяем, есть ли файл types.ts
    if (!fs.existsSync(typesPath)) {
      console.log(`⚠️  Компонент ${componentName}: файл types.ts не найден`);
      continue;
    }
    
    // Получаем ожидаемые переменные из интерфейса
    const expectedVariables = getComponentInterface(componentPath);
    
    if (expectedVariables.length === 0) {
      console.log(`⚠️  Компонент ${componentName}: интерфейс не найден или пуст`);
      continue;
    }
    
    console.log(`📋 Проверяю компонент: ${componentName}`);
    console.log(`   Ожидаемые переменные:`);
    expectedVariables.forEach(variable => {
      console.log(`     • ${variable}`);
    });
    
    // Проверяем основной файл стилей компонента (дополнительные проверки)
    if (fs.existsSync(stylePath)) {
      const themeUsageResult = validateThemeUsageInComponents(componentName, stylePath);
      themeUsageResults.push(themeUsageResult);
      
      const dataThemeResult = validateNoDataThemeInStyleFiles(componentName, stylePath);
      dataThemeResults.push(dataThemeResult);
      
      if (!themeUsageResult.isValid) {
        console.log(`   ⚠️  style.scss: ${themeUsageResult.errors.join('; ')}`);
      }
      
      if (!dataThemeResult.isValid) {
        console.log(`   ❌  style.scss: ${dataThemeResult.errors.join('; ')}`);
      }
    }
    
    // Находим все темы компонента
    const themePaths = await glob(path.join(componentPath, 'styles/themes/*.scss'));
    
    for (const themePath of themePaths) {
      // Валидация 1: Соответствие интерфейсу
      const interfaceResult = validateComponentThemeInterface(componentName, themePath, expectedVariables);
      interfaceResults.push(interfaceResult);
      
      // Валидация 2: Префиксы CSS переменных
      const prefixResult = validateCSSVariablePrefixes(componentName, themePath);
      prefixResults.push(prefixResult);
      
      // Валидация 3: Отсутствие глобальных переменных
      const forbiddenResult = validateForbiddenGlobalVariables(componentName, themePath);
      forbiddenResults.push(forbiddenResult);
      
      // Валидация 4: Отсутствие CSS классов в файлах тем
      const cssClassesResult = validateNoCSSClassesInThemeFiles(componentName, themePath);
      cssClassesResults.push(cssClassesResult);
      
      // Валидация 5: Отсутствие хардкода в файлах тем
      const themeHardcodedResult = validateThemeUsageInComponents(componentName, themePath);
      themeUsageResults.push(themeHardcodedResult);
      
      const themeName = path.basename(themePath, '.scss');
      
      if (interfaceResult.isValid && prefixResult.isValid && forbiddenResult.isValid && cssClassesResult.isValid && themeHardcodedResult.isValid) {
        console.log(`   ✅ ${themeName}: интерфейс OK, префиксы OK, глобальные переменные OK, CSS классы OK, хардкод OK`);
      } else {
        const allErrors = [...interfaceResult.errors, ...prefixResult.errors, ...forbiddenResult.errors, ...cssClassesResult.errors, ...themeHardcodedResult.errors];
        console.log(`   ❌ ${themeName}: ${allErrors.join('; ')}`);
      }
    }
    
    console.log('');
  }
  
  // Валидация глобальных тем
  console.log('🌍 Проверяю глобальные темы...\n');
  
  const allGlobalPaths = await glob('src/themes/*');
  const globalThemePaths = allGlobalPaths.filter(path => fs.statSync(path).isDirectory());
  
  for (const themePath of globalThemePaths) {
    const themeName = path.basename(themePath);
    const themeFile = path.join(themePath, `${themeName}.scss`);
    
    if (!fs.existsSync(themeFile)) {
      console.log(`⚠️  Глобальная тема ${themeName}: файл ${themeName}.scss не найден`);
      continue;
    }
    
    // Получаем ожидаемые переменные из интерфейса глобальной темы
    const expectedGlobalVariables = getComponentInterface('src/themes');
    
    if (expectedGlobalVariables.length === 0) {
      console.log(`⚠️  Глобальная тема ${themeName}: интерфейс не найден или пуст`);
      continue;
    }
    
    console.log(`📋 Проверяю глобальную тему: ${themeName}`);
    console.log(`   Ожидаемые переменные:`);
    expectedGlobalVariables.forEach(variable => {
      console.log(`     • ${variable}`);
    });
    
    // Валидация 1: Соответствие интерфейсу
    const interfaceResult = validateComponentThemeInterface(themeName, themeFile, expectedGlobalVariables);
    interfaceResults.push(interfaceResult);
    
      // Валидация 2: Префиксы CSS переменных (для глобальных тем проверяем --thepro-theme-)
  const prefixResult = validateCSSVariablePrefixesForGlobalTheme(themeName, themeFile);
    prefixResults.push(prefixResult);
    
    if (interfaceResult.isValid && prefixResult.isValid) {
      console.log(`   ✅ ${themeName}: интерфейс OK, префиксы OK`);
    } else {
      const allErrors = [...interfaceResult.errors, ...prefixResult.errors];
      console.log(`   ❌ ${themeName}: ${allErrors.join('; ')}`);
    }
    
    console.log('');
  }
  
  // Выводим итоговую статистику
  const allResults = [...interfaceResults, ...prefixResults, ...forbiddenResults, ...themeUsageResults, ...dataThemeResults, ...cssClassesResults, ...themeImportsResults, ...globalThemeVariablesResults];
  const validResults = allResults.filter(r => r.isValid);
  const invalidResults = allResults.filter(r => !r.isValid);
  
  console.log('📊 Итоговая статистика:');
  console.log(`   Всего проверено: ${interfaceResults.length} тем (8 проверок на тему)`);
  console.log(`   ✅ Валидных проверок: ${validResults.length}`);
  console.log(`   ❌ Невалидных проверок: ${invalidResults.length}`);
  
  if (invalidResults.length > 0) {
    console.log('\n❌ Детали ошибок:');
    for (const result of invalidResults) {
      console.log(`   ${result.component}/${result.theme}:`);
      for (const error of result.errors) {
        console.log(`     - ${error}`);
      }
    }
    process.exit(1);
  } else {
    console.log('\n🎉 Все темы валидны!');
  }
}

// Запускаем валидацию
validateAllThemes().catch(error => {
  console.error('❌ Ошибка при валидации:', error);
  process.exit(1);
});
