<template>
  <component :is="tag" :class="clazz" :href="href">
    <component :is="icon" :size="20" />
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { type Component, computed } from 'vue'
import clsx from 'clsx'

const props = withDefaults(
  defineProps<{
    variant: 'brand' | 'alt'
    href?: string
    as?: string
    icon?: Component
  }>(),
  {
    variant: 'brand',
  }
)

const tag = computed(() => (props.as || props.href ? 'a' : 'button'))
const clazz = computed(() =>
  clsx(
    'ui-button',

    'flex',
    'gap-4px',
    'justify-center',
    'items-center',
    'inline-block',
    'border',
    'text-center',
    'font-semibold',
    'whitespace-nowrap',
    'transition-colors',
    'duration-250',

    'px-20px',
    'rounded-20px',
    'leading-38px',
    'text-sm',

    props.variant === 'brand' && [
      'text-button-brand-text',
      'bg-button-brand-bg',
      'border-button-brand-border',
      'hover:text-button-brand-hover-text',
      'hover:bg-button-brand-hover-bg',
      'hover:border-button-brand-hover-border',
      'active:text-button-brand-active-text',
      'active:bg-button-brand-active-bg',
      'active:border-button-brand-active-border',
    ],

    props.variant === 'alt' && [
      'text-button-alt-text',
      'bg-button-alt-bg',
      'border-button-alt-border',
      'hover:text-button-alt-hover-text',
      'hover:bg-button-alt-hover-bg',
      'hover:border-button-alt-hover-border',
      'active:text-button-alt-active-text',
      'active:bg-button-alt-active-bg',
      'active:border-button-alt-active-border',
    ]
  )
)
</script>
