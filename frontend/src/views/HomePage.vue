<template>
  <div class="home">
    <b-container>
      <div v-if="articles">
        <b-row align-h="center" row-centered>
          <b-col cols="4" mb="2" v-for="article in articles" :key="article.id">
            <div
              class="delete-news-btn"
              v-if="isLoggedIn"
              @click="deleteArticle(article.id)"
            >
              <b-icon icon="trash-fill"></b-icon>
            </div>
            <ArticleCard
              :title="article.title"
              percentages_prop="50"
              :proof="article.proof"
              :source="article.source"
              :content="article.content"
              :id="article.id"
            ></ArticleCard>
          </b-col>
        </b-row>
      </div>
      <b-pagination
        class="pagination-buttons"
        align="center"
        v-model="currentPage"
        :total-rows="articlesCount"
        :per-page="perPage"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
      ></b-pagination>
    </b-container>
  </div>
</template>
<script>
// @ is an alias to /src
import ArticleCard from '@/components/ArticleCard.vue'
import { mapGetters } from 'vuex'
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
  watch: {
    currentPage: {
      handler() {
        this.getArticles()
      },
      deep: true,
    },
  },
  computed: {
    ...mapGetters(['$http', '$http_no_auth', 'isLoggedIn']),
    articles_api_url: function () {
      return process.env.VUE_APP_API_URL.concat('/api/news/?page=').concat(
        this.currentPage
      )
    },
  },
  methods: {
    getArticles() {
      const self = this
      this.$http_no_auth
        .get(
          process.env.VUE_APP_API_URL.concat('/api/news/?page=').concat(
            this.currentPage
          )
        )
        .then((response) => {
          self.articles = response.data
          const obj = {}

          for (const key of response.data.results) {
            obj[key.id] = key
          }
          self.articles = obj
          self.articlesCount = response.data.count
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => (self.loading = false))
    },
    deleteArticle(articleId) {
      this.$http
        .delete(
          this.$api_endpoint.concat('/news/').concat(articleId).concat('/')
        )
        .then((response) => {
          this.$delete(this.articles, articleId)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => (self.loading = false))
    },
  },
}
</script>
<style lang="scss" scoped>
// b-card {
// padding: 10px;
// }
</style>
