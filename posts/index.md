# 文章

<TagList :posts="data" />
<CategoryList :posts="data" />

---

<PostList :posts="data" />

<script setup lang="ts">
import PostList from '~/components/PostList.vue'
import TagList from '~/components/TagList.vue'
import CategoryList from '~/components/CategoryList.vue'
import { data } from '~/posts.data'
</script>
