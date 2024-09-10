<template>
  <div class="">
    <header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <NuxtLink
          to="/"
          class="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 class="h-6 w-6" />
          <span class="sr-only">Nuxt 3 Starter</span>
        </NuxtLink>
        <NuxtLink
          to="/"
          class="text-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </NuxtLink>
      </nav>
      <Sheet>
        <SheetTrigger as-child>
          <Button
            variant="outline"
            size="icon"
            class="shrink-0 md:hidden"
          >
            <Menu class="h-5 w-5" />
            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          class="flex flex-col"
        >
          <SheetHeader class="hidden">
            <SheetTitle />
            <SheetDescription />
          </SheetHeader>
          <nav class="grid gap-2 text-lg font-medium">
            <NuxtLink
              v-for="item in drawerRoutes"
              :key="item.label"
              :to="item.to"
              class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground"
              :class="activeRoute === item.to ? 'bg-muted text-foreground' : 'text-muted-foreground'"
            >
              <Icon
                :name="item.icon"
                size="24px"
              />
              {{ item.label }}
            </NuxtLink>
          </nav>
        </SheetContent>
      </Sheet>
      <div class="flex items-center gap-4 ml-auto md:gap-2 lg:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button
              id="user-menu"
              variant="secondary"
              size="icon"
              class="rounded-full"
            >
              <Avatar>
                <AvatarImage
                  :src="user?.picture!"
                  :alt="user?.name"
                />
                <AvatarFallback>
                  {{ generateUserInitials(user?.name!) || 'U' }}
                </AvatarFallback>
              </Avatar>
              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <AccountInfo class="m-2" />
            <DropdownMenuSeparator />
            <DropdownMenuItem
              v-for="option in dropdownOptions"
              :key="option.label"
              class="p-0 cursor-pointer"
            >
              <NuxtLink
                :to="option.to"
                class="w-full h-full py-2 px-4"
              >
                {{ option.label }}
              </NuxtLink>
            </DropdownMenuItem>
            <DropdownMenuItem
              class="p-0 cursor-pointer"
              @click="logout"
            >
              <div class="w-full h-full py-2 px-4">
                Logout
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
    <div class="flex-1 container mx-auto my-8 px-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Menu, Package2 } from 'lucide-vue-next'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const { user } = useAuthSession()
const { logout } = useAuth()
const { generateUserInitials } = useUtils()
const route = useRoute()

const activeRoute = computed(() => route.path)
const drawerRoutes = [
  {
    label: 'Dashboard',
    icon: 'ph:house',
    to: '/',
  },
  {
    label: 'Account',
    icon: 'ph:user',
    to: '/account',
  },
]

const dropdownOptions = [
  {
    label: 'Account',
    to: '/account',
  },
]
</script>
