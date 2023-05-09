<template>
  <div class="home">
    <div class="container text-center">
      <div v-if="articles">
        <div class="row" align-h="center" row-centered>
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
            ></ArticleCard>
          </div>
        </div>
      </div>
      <div>
        <Paginator
          :rows="10"
          :totalRecords="articlesCount"
          :rowsPerPageOptions="[this.perPage]"
          @page="
            ({ page }) => {
              this.currentPage = page + 1
              this.getArticles()
            }
          "
        ></Paginator>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import ArticleCard from '@/components/ArticleCard.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'HomePage',
  components: { ArticleCard },
  mounted() {
    this.getArticles()
  },
  data() {
    return {
      loading: true,
      currentPage: 1,
      perPage: 9,
      articles: {},
      articlesCount: 0,
    }
  },
  computed: {
    ...mapState(['http', 'httpWithAuth']),
    ...mapGetters(['isLoggedIn']),
    articlesApiUrl() {
      return '/api/news/?page='.concat(this.currentPage)
    },
  },
  methods: {
    getArticles() {
      this.http
        .get(this.articlesApiUrl)
        .then((response) => {
          this.articles = response.data.results.reduce(
            (all, article) => ({ ...all, [article.id]: article }),
            {}
          )
          this.articlesCount = response.data.count
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => (this.loading = false))
    },
  },
}
</script>
<style lang="scss" scoped></style>
