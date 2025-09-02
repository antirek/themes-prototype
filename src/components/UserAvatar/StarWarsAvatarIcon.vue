<template>
  <svg 
    class="starwars-avatar-icon" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- Фоновая окружность -->
    <circle cx="12" cy="12" r="11" fill="currentColor" opacity="0.1"/>
    
    <!-- Основная форма шлема Дарта Вейдера -->
    <path 
      d="M12 3C8.5 3 6 5.5 6 9c0 1.5 0.5 2.5 1 3.5C5.5 15 4 17 4 20v1h16v-1c0-3-1.5-5-3-7.5 0.5-1 1-2 1-3.5 0-3.5-2.5-6-6-6z" 
      fill="currentColor" 
      opacity="0.9"
    />
    
    <!-- Верхняя часть шлема (купол) -->
    <path 
      d="M12 3c-1.5 0-2.5 0.3-3 0.8C8.5 3.3 9.5 3 11 3c1.5 0 2.5 0.3 3 0.8C13.5 3.3 12.5 3 12 3z" 
      fill="currentColor" 
      opacity="0.7"
    />
    
    <!-- Глазницы - характерные для Дарта Вейдера -->
    <path 
      d="M8.5 9.5C8.5 8.7 9.2 8 10 8s1.5 0.7 1.5 1.5S10.8 11 10 11s-1.5-0.7-1.5-1.5z" 
      fill="currentColor" 
      opacity="0.9"
    />
    <path 
      d="M12.5 9.5C12.5 8.7 13.2 8 14 8s1.5 0.7 1.5 1.5S14.8 11 14 11s-1.5-0.7-1.5-1.5z" 
      fill="currentColor" 
      opacity="0.9"
    />
    
    <!-- Дыхательный аппарат (характерная деталь) -->
    <rect x="10.5" y="12" width="3" height="1.5" fill="currentColor" opacity="0.8"/>
    <rect x="10" y="13.5" width="4" height="0.8" fill="currentColor" opacity="0.6"/>
    
    <!-- Дополнительные детали шлема -->
    <path 
      d="M7 7.5c0.8-0.5 1.8-0.8 2.8-0.8s2 0.3 2.8 0.8" 
      stroke="currentColor" 
      stroke-width="0.5" 
      opacity="0.5"
      fill="none"
    />
    <path 
      d="M14.2 7.5c0.8-0.5 1.8-0.8 2.8-0.8s2 0.3 2.8 0.8" 
      stroke="currentColor" 
      stroke-width="0.5" 
      opacity="0.5"
      fill="none"
    />
    
    <!-- Боковые детали шлема -->
    <path 
      d="M6 10c0.5-0.3 1.2-0.5 2-0.5s1.5 0.2 2 0.5" 
      stroke="currentColor" 
      stroke-width="0.3" 
      opacity="0.4"
      fill="none"
    />
    <path 
      d="M16 10c0.5-0.3 1.2-0.5 2-0.5s1.5 0.2 2 0.5" 
      stroke="currentColor" 
      stroke-width="0.3" 
      opacity="0.4"
      fill="none"
    />
  </svg>
</template>

<script setup lang="ts">
// Star Wars версия иконки аватара - шлем Дарта Вейдера
</script>
