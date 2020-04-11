<template>
  <div class="home">
    <b-container>
      <div v-if="articles">
        <b-row  align-h="center" row-centered>
                                   <b-col cols="4" mb="2" v-for="article in articles.results" :key="article.id">

            <Article :title="article.title" percentages_prop="50" :proof="article.proof" :source="article.source" :content="article.content" :id="article.id"  ></Article>    </b-col>

        </b-row>
      </div>
      <b-pagination class="pagination-buttons" align="center" v-model="currentPage" :total-rows="articles.count" :per-page="perPage" first-text="First" prev-text="Prev" next-text="Next" last-text="Last" ></b-pagination>
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
      return this.$api_endpoint.concat('/news/?page=').concat(this.currentPage)
    }

  },
  methods: {
    getArticles () {
      const self = this
      this.$http
        .get(self.articles_api_url)
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
