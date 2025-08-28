// Простой тест импорта нашего пакета
import pkg from './dist/index.es.js';
const { CardHeader, CardBody, CardFooter, CardWithTheme, applyTheme } = pkg;

console.log('✅ Пакет импортирован успешно!');
console.log('Компоненты:', { CardHeader, CardBody, CardFooter, CardWithTheme });
console.log('Функции:', { applyTheme });

// Тестируем функцию applyTheme
applyTheme('light');
console.log('✅ Тема применена успешно!');
