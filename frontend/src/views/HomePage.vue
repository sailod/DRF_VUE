<template>
  <div class="home">
    <b-container>
      <div v-if="articles">
        <b-row align-h="center" row-centered>
          <b-col cols="4" mb="2" v-for="article in articles" :key="article.id">
            <div
              v-if="isLoggedIn"
              class="delete-news-btn"
              @click="deleteArticle(article.id)"
            >
              <font-awesome-icon icon="trash" />
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
  watch: {
    currentPage: {
      handler() {
        this.getArticles()
      },
      deep: true,
    },
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
          this.articles = response.data
          const obj = {}

          for (const key of response.data.results) {
            obj[key.id] = key
          }
          this.articles = obj
          this.articlesCount = response.data.count
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => (this.loading = false))
    },
    deleteArticle(articleId) {
      this.httpWithAuth
        .delete(`/api/news/${articleId}`, {
          withCredentials: true,
        })
        .then((response) => {
          this.getArticles()
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
