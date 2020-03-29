<template>
  <div class="home">
    <b-container>
      <div v-if="articles">
        <b-row align-h="center" row-centered>
            <Article :title="article.title" percentages_prop="50" :content="article.content" :id="article.id" v-for="article in articles.results" :key="article.id"></Article>
        </b-row>
      </div>
      <b-pagination class="pagination-buttons" align="center" v-model="currentPage" :total-rows="articles.count" :per-page="perPage" first-text="First" prev-text="Prev" next-text="Next" last-text="Last" @input="paginate(currentPage)"></b-pagination>
    </b-container>
  </div>
</template>
<script>
// @ is an alias to /src
import Article from '@/components/Article.vue'

export default {
  name: 'home',
  mounted () {
    this.getArticles()
  },
  data () {
    return {
      loading: true,
      currentPage: 1,
      perPage: 9,
      articles: {}
    }
  },
  watch: {
    currentPage: function () {
      this.getArticles()
    }
  },
  components: { Article },
  computed: {
    articles_api_url: function () {
      return 'http://172.17.0.6:8000/api/news/?page='.concat(this.currentPage)
    }

  },
  methods: {
    getArticles () {
      const self = this
      this.$http
        .get(self.articles_api_url, {
          headers: {
            Authorization: 'Token  2f747bdb64d4a02cacf3ee428529fbf63509da8b'
          }
        })
        .then(response => {
          self.articles = response.data
        })
        .catch(error => {
          console.log(error)
        })
        .finally(() => (self.loading = false))
    }
  }
}

</script>
<style lang="scss" scoped>
// b-card {
// padding: 10px;
// }

</style>
