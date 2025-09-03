<template>
  <div class="user-profile-card">
    <CardHeader :text="userData.name" />
    
    <div class="user-profile-body">
      <div class="user-profile-content">
        <UserAvatar 
          :src="userData.avatar" 
          :alt="userData.name"
          :container-id="containerId"
        />
        
        <div class="user-info">
          <div class="user-name">{{ userData.name }}</div>
          <div class="user-phone">{{ userData.phone }}</div>
          <div class="user-description">{{ userData.description }}</div>
        </div>
      </div>
    </div>
    
    <CardFooter :text="userData.status" />
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import CardHeader from '../../elements/CardHeader/CardHeader.vue'
import CardFooter from '../../elements/CardFooter/CardFooter.vue'
import UserAvatar from '../../elements/UserAvatar/UserAvatar.vue'

interface UserData {
  name: string
  phone: string
  description: string
  avatar: string
  status: string
}

interface Props {
  userData: UserData
  containerId?: string
}

const props = defineProps<Props>()

// Передаем containerId дальше дочерним компонентам
if (props.containerId) {
  provide('containerId', props.containerId)
}
</script>

<style lang="scss">
@use './styles/UserProfileCard.scss';
</style>
