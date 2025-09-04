// Atoms - самые базовые компоненты
export { default as AvatarIcon } from './atoms/AvatarIcon/AvatarIcon.vue'
export * from './atoms/AvatarIcon'

// Elements - простые компоненты
export { default as CardHeader } from './elements/CardHeader/CardHeader.vue'
export { default as CardBody } from './elements/CardBody/CardBody.vue'
export { default as CardFooter } from './elements/CardFooter/CardFooter.vue'
export { default as UserAvatar } from './elements/UserAvatar/UserAvatar.vue'
export { ThemeSelector } from './elements/ThemeSelector'

// Blocks - составные компоненты
export { default as UserProfileCard } from './blocks/UserProfileCard/UserProfileCard.vue'

// Containers - контейнеры для управления состоянием
export { default as BaseContainer } from './containers/BaseContainer.vue'

// Types - экспорт всех типов компонентов
export type * from './atoms/AvatarIcon/types'
export type * from './elements/CardHeader/types'
export type * from './elements/CardBody/types'
export type * from './elements/CardFooter/types'
export type * from './elements/UserAvatar/types'
export type * from './elements/ThemeSelector/types'
export type * from './blocks/UserProfileCard/types'
