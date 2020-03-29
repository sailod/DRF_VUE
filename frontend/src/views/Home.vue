<template>
  <div class="home">
    <b-container>
      <div v-if="!loading">
        <b-row>
            <Article :title="article.title" :id="article.id" v-for="article in articles.results" :key="article.id"></Article>
        </b-row>
      </div>
      <b-pagination v-model="currentPage" :total-rows="12" :per-page="perPage" first-text="First" prev-text="Prev" next-text="Next" last-text="Last" @input="paginate(currentPage)"></b-pagination>
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
      perPage: 3,
      articles: null
    }
  },
  components: { Article },
  computed: {},
  methods: {
    getArticles () {
      const self = this
      this.$http
        .get('http://172.17.0.6:8000/api/news/', {
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
