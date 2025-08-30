<template>
  <div class="user-profile-card" :data-theme="theme">
    <CardHeader :text="userData.name" />
    
    <CardBody>
      <div class="user-profile-content">
        <div class="user-avatar">
          <img 
            :src="userData.avatar" 
            :alt="userData.name"
            class="avatar-image"
          />
        </div>
        
        <div class="user-info">
          <div class="user-name">{{ userData.name }}</div>
          <div class="user-phone">{{ userData.phone }}</div>
          <div class="user-description">{{ userData.description }}</div>
        </div>
      </div>
    </CardBody>
    
    <CardFooter :text="userData.status" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CardHeader from '../CardHeader/CardHeader.vue'
import CardBody from '../CardBody/CardBody.vue'
import CardFooter from '../CardFooter/CardFooter.vue'

interface UserData {
  name: string
  phone: string
  description: string
  avatar: string
  status: string
}

interface Props {
  userData: UserData
  theme?: 'light' | 'dark' | 'green'
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'light'
})

const theme = computed(() => props.theme)
</script>

<style lang="scss">
@use './styles/UserProfileCard.scss';
</style>
