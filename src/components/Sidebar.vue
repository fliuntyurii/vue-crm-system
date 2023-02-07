<template>
	<ul class="sidenav app-sidenav" :class="{open: value}">
    <li
      v-for="link in links"
      :key="link.url"
    >
      <router-link
        active-class="active"
        :to="link.url"
        class="waves-effect waves-orange pointer"
      >
        {{ link.title }}
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent } from "@vue/runtime-core";

  export default defineComponent({
    props: ['value'],
    data: () => ({
      links: [
        { title: "Check", url: "/" },
        { title: "History", url: "/history" },
        { title: "Planning", url: "/planning" },
        { title: "New Entry", url: "/record" },
        { title: "Category", url: "/categories" },
      ]
    })
  });
</script>