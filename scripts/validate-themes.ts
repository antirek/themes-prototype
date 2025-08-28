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
 * Основная функция валидации
 */
async function validateAllThemes(): Promise<void> {
  console.log('🔍 Начинаю валидацию тем компонентов и глобальных тем...\n');
  
  // Находим все компоненты
  const allPaths = await glob('src/components/*');
  const componentPaths = allPaths.filter(path => fs.statSync(path).isDirectory());
  const interfaceResults: InterfaceValidationResult[] = [];
  const prefixResults: PrefixValidationResult[] = [];
  const forbiddenResults: ForbiddenVariablesValidationResult[] = [];
  
  for (const componentPath of componentPaths) {
    const componentName = path.basename(componentPath);
    const typesPath = path.join(componentPath, 'types.ts');
    
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
      
      const themeName = path.basename(themePath, '.scss');
      
      if (interfaceResult.isValid && prefixResult.isValid && forbiddenResult.isValid) {
        console.log(`   ✅ ${themeName}: интерфейс OK, префиксы OK, глобальные переменные OK`);
      } else {
        const allErrors = [...interfaceResult.errors, ...prefixResult.errors, ...forbiddenResult.errors];
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
  const allResults = [...interfaceResults, ...prefixResults, ...forbiddenResults];
  const validResults = allResults.filter(r => r.isValid);
  const invalidResults = allResults.filter(r => !r.isValid);
  
  console.log('📊 Итоговая статистика:');
  console.log(`   Всего проверено: ${interfaceResults.length} тем (3 проверки на тему)`);
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
