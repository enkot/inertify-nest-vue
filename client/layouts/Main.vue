<script setup lang="ts">
import Logo from '@/assets/logo.svg?component'
import HomeIcon from '~icons/heroicons-outline/home'
import CityIcon from '~icons/heroicons-outline/office-building'
import PeoplesIcon from '~icons/heroicons-outline/users'
import ReportsIcon from '~icons/heroicons-outline/document-text'

const component = computed(() => usePage().component.value)
const auth = computed<any>(() => usePage().props.value.auth)
const sidebarOpen = ref(false)
const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Organizations', href: '/organizations', icon: CityIcon },
  { name: 'Contacts', href: '/contacts', icon: PeoplesIcon },
  { name: 'Reports', href: '/reports', icon: ReportsIcon }
]
const userNavigation = computed(() => [
  { name: 'My Profile', href: `/users/${auth.value?.user.id}` },
  { name: 'Manage Users', href: '/users' },
  { name: 'Logout', href: '/auth/logout' },
])
</script>

<template>
  <div class="h-screen flex overflow-hidden bg-gray-100">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="fixed inset-0 flex z-40 md:hidden" @close="sidebarOpen = false">
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <heroicons-outline-x class="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
            </TransitionChild>
            <div class="flex-shrink-0 flex items-center px-4 space-x-2">
              <Logo class="h-5 w-auto" alt="Inertify" />
              <span class="text-white text-2xl font-bold">
                Inertify
                <span class="text-xs text-gray-500">CRM</span>
              </span>
            </div>
            <div class="mt-5 flex-1 h-0 overflow-y-auto">
              <nav class="px-2 space-y-1">
                <Link
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  :class="[component.startsWith(item.name) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']"
                >
                  <component
                    :is="item.icon"
                    :class="[component.startsWith(item.name) ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-4 flex-shrink-0 h-6 w-6']"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </Link>
              </nav>
            </div>
          </div>
        </TransitionChild>
        <div class="flex-shrink-0 w-14" aria-hidden="true">
          <!-- Dummy element to force sidebar to shrink to fit close icon -->
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div class="flex-1 flex flex-col min-h-0">
          <div class="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900 space-x-2">
            <Logo class="h-6 w-auto" alt="Inertify" />
            <span class="text-white text-2xl font-bold">
              Inertify
              <span class="text-xs text-gray-500">CRM</span>
            </span>
          </div>
          <div class="flex-1 flex flex-col overflow-y-auto">
            <nav class="flex-1 px-2 py-4 bg-gray-800 space-y-1">
              <Link
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[component.startsWith(item.name) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'group flex items-center px-2 py-2.5 text-sm font-medium rounded-md']"
              >
                <component
                  :is="item.icon"
                  :class="[component.startsWith(item.name) ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300', 'mr-3 flex-shrink-0 h-6 w-6']"
                  aria-hidden="true"
                />
                {{ item.name }}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <div class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm">
        <button
          type="button"
          class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500 md:hidden"
          @click="sidebarOpen = true"
        >
          <span class="sr-only">Open sidebar</span>
          <heroicons-outline-menu-alt-2 class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="flex-1 px-4 flex justify-between">
          <div
            class="flex-1 flex items-center font-medium text-gray-600"
          >{{ auth.user.account.name }}</div>
          <div class="ml-4 flex items-center md:ml-6">
            <!-- Profile dropdown -->
            <Menu as="div" class="ml-3 relative">
              <div>
                <MenuButton
                  class="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50"
                >
                  <div
                    v-if="auth.user.photo"
                    class="flex justify-center items-center h-8 w-8 rounded-full bg-gray-200 overflow-hidden"
                  >
                    <img :src="`/uploads/${auth.user.photo}`" alt="Avatar" />
                  </div>
                  <div
                    v-else
                    class="flex justify-center items-center h-8 w-8 rounded-full text-white font-bold bg-violet-500 uppercase overflow-hidden"
                  >
                    <span>{{ auth.user.firstName[0] }}</span>
                  </div>

                  <span class="hidden ml-2 text-gray-700 text-sm font-medium lg:block">
                    <span class="sr-only">Open user menu for</span>
                    {{ auth.user.firstName }} {{ auth.user.lastName }}
                  </span>
                  <icon-park-outline-down
                    class="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                    <Link
                      :href="item.href"
                      :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 cursor-pointer']"
                      as="div"
                    >{{ item.name }}</Link>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </div>
      </div>

      <main class="flex-1 relative overflow-y-auto focus:outline-none">
        <div class="py-12">
          <slot />
        </div>
      </main>
    </div>
    <Flash />
  </div>
</template>