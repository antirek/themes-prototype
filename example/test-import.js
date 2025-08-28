// Простой тест импорта нашего пакета
import { CardHeader, CardBody, CardFooter, CardWithTheme, applyTheme } from './dist/index.es.js';

console.log('✅ Пакет импортирован успешно!');
console.log('Компоненты:', { CardHeader, CardBody, CardFooter, CardWithTheme });
console.log('Функции:', { applyTheme });

// Тестируем функцию applyTheme
applyTheme('light');
console.log('✅ Тема применена успешно!');
