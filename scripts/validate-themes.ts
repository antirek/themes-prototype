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
  const interfaceRegex = /export interface (\w+ThemeCSSVariables)\s*{([^}]+)}/s;
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
 * Валидирует префиксы CSS переменных
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
 * Основная функция валидации
 */
async function validateAllThemes(): Promise<void> {
  console.log('🔍 Начинаю валидацию тем компонентов...\n');
  
  // Находим все компоненты
  const allPaths = await glob('src/components/*');
  const componentPaths = allPaths.filter(path => fs.statSync(path).isDirectory());
  const interfaceResults: InterfaceValidationResult[] = [];
  const prefixResults: PrefixValidationResult[] = [];
  
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
    console.log(`   Ожидаемые переменные: ${expectedVariables.join(', ')}`);
    
    // Находим все темы компонента
    const themePaths = await glob(path.join(componentPath, 'styles/themes/*.scss'));
    
    for (const themePath of themePaths) {
      // Валидация 1: Соответствие интерфейсу
      const interfaceResult = validateComponentThemeInterface(componentName, themePath, expectedVariables);
      interfaceResults.push(interfaceResult);
      
      // Валидация 2: Префиксы CSS переменных
      const prefixResult = validateCSSVariablePrefixes(componentName, themePath);
      prefixResults.push(prefixResult);
      
      const themeName = path.basename(themePath, '.scss');
      
      if (interfaceResult.isValid && prefixResult.isValid) {
        console.log(`   ✅ ${themeName}: интерфейс OK, префиксы OK`);
      } else {
        const allErrors = [...interfaceResult.errors, ...prefixResult.errors];
        console.log(`   ❌ ${themeName}: ${allErrors.join('; ')}`);
      }
    }
    
    console.log('');
  }
  
  // Выводим итоговую статистику
  const allResults = [...interfaceResults, ...prefixResults];
  const validResults = allResults.filter(r => r.isValid);
  const invalidResults = allResults.filter(r => !r.isValid);
  
  console.log('📊 Итоговая статистика:');
  console.log(`   Всего проверено: ${interfaceResults.length} тем (2 проверки на тему)`);
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
