<template>
  <div v-if="!loading">
    <masonry-wall
      :items="articles"
      :ssr-columns="1"
      :column-width="300"
      :gap="16"
    >
      <template #default="{ item, index }">
        <ArticleCard
          :title="item.title"
          percentages_prop="50"
          :proof="item.proof"
          :source="item.source"
          :content="item.content"
          :id="item.id"
          @articleDeleted="onArticleDelete"
        ></ArticleCard>
      </template>
    </masonry-wall>

    <!-- <div class="row" align-h="center" row-centered>
      <div
        class="col col-4 p-2"
        mb="2"
        v-for="article in articles"
        :key="article.id"
      >
        <ArticleCard
          :title="article.title"
          percentages_prop="50"
          :proof="article.proof"
          :source="article.source"
          :content="article.content"
          :id="article.id"
          @articleDeleted="onArticleDelete"
        ></ArticleCard>
      </div>
    </div> -->
    <div>
      <Paginator
        :rows="10"
        :totalRecords="articlesCount"
        :rowsPerPageOptions="[perPage]"
        @page="onPageSwtich"
        v-if="Object.keys(articles)"
      ></Paginator>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import ArticleCard from '@/components/ArticleCard.vue'

export default {
  components: {
    ArticleCard,
  },

  async setup() {
    const store = useStore()
    const articlesApiUrl = computed(() => {
      return '/api/news/?page=' + currentPage.value
    })

    const loading = ref(true)
    const currentPage = ref(1)
    const perPage = ref(9)
    const articles = ref([])
    const articlesCount = ref(0)

    await getArticles()

    const onPageSwtich = ({ page }) => {
      currentPage.value = page + 1
      getArticles()
    }

    const onArticleDelete = () => getArticles()

    const items = ref([
      {
        title: 'First',
        description: 'The first item.',
      },
      {
        title: 'Second',
        description: 'The second item.',
      },
    ])

    async function getArticles() {
      store.state.http
        .get(articlesApiUrl.value)
        .then((response) => {
          articles.value = response.data.results
          articlesCount.value = response.data.count
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => (loading.value = false))
    }

    return {
      loading,
      articles,
      articlesCount,
      perPage,
      onPageSwtich,
      onArticleDelete,
    }
  },
}
</script>

<style lang="scss" scoped></style>

vbase
