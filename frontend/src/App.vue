<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/media">Library Collection List</router-link>
    <router-link to="/media">Paper Books List</router-link>
    <router-link to="/ebooks">eBooks Collection List</router-link>
    <router-link to="/media">Audio Book Collection</router-link>
    <router-link to="/media">Digital Music Collection</router-link>
    <router-link to="/create">Add Media to Collection</router-link>
  </div>

  <div class="container">
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <div :key="route.name">
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}

a.router-link-active {
  border-bottom: 1px solid white;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}
</style>
