# 文章

{{data}}

<TagList :posts="data" />

---

<PostList :posts="data" />

<script setup lang="ts">
import PostList from '~/components/PostList.vue'
import TagList from '~/components/TagList.vue'
import { data } from '~/posts.data'
</script>
