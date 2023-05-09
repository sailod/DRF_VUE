<template>
  <div>
    <Card>
      <template #header>
        <div style="position: relative">
          <img
            alt="Article Header"
            src="https://picsum.photos/600/300/?image=25"
            style="max-width: 100%"
          />
          <div
            v-if="this.isLoggedIn"
            class="delete-news-btn"
            @click="deleteArticle(this.id)"
          >
            <Button style="background-color: transparent; border: none"
              ><i class="pi pi-trash" style="font-size: 1rem; color: red"></i>
            </Button>
          </div>
        </div>
      </template>
      <template #title> {{ title }} </template>
      <template #content>
        <p>
          {{ content }}
        </p>
      </template>
      <template #footer>
        <div class="row">
          <div class="col">
            <a :href="proof">
              <Button icon="pi pi-check" label="Proof" />
            </a>
          </div>
          <div class="col">
            <a :href="source">
              <Button
                icon="pi pi-times"
                label="Source"
                severity="secondary"
                style="margin-left: 0.5em"
              />
            </a>
          </div>
        </div>
        <div class="row">
          <div v-if="!already_voted" class="col">
            <Button
              @click="commitVote('true', $event)"
              icon="pi pi-thumbs-up"
              label="True"
              severity="primary"
              style="margin-left: 0.5em"
            />
          </div>

          <div v-if="already_voted">Thanks For Voting</div>

          <div class="col">
            <ProgressBar :value="percentages"></ProgressBar>
          </div>
          <div v-if="!already_voted" class="col">
            <Button
              @click="commitVote('false', $event)"
              icon="pi pi-thumbs-down"
              label="False"
              severity="primary"
              style="margin-left: 0.5em"
            />
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Card from 'primevue/card'

export default {
  props: ['title', 'content', 'id', 'percentages_prop', 'source', 'proof'],
  components: { Card },
  data() {
    return {
      percentages: 0,
      already_voted: 0,
    }
  },
  mounted() {
    this.fetchVotes()
  },
  computed: {
    ...mapState(['http', 'httpWithAuth']),
    ...mapGetters(['isLoggedIn']),
    tooltipId: function () {
      return 'progress-bar-' + this.id
    },
  },
  methods: {
    commitVote(vote) {
      this.httpWithAuth
        .post('/api/news-vote/', { choice: vote, news: this.id }, {})
        .then((response) => {
          this.already_voted = 1
          this.fetchVotes()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fetchVotes() {
      this.http
        .get(`/api/news-vote/${this.id}/`)
        .then((response) => {
          // console.log(response.data)
          this.already_voted = response.data.already_voted
          this.percentages =
            (response.data.true / (response.data.false + response.data.true)) *
            100
        })
        .catch((error) => {
          console.log(error)
        })
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

<style scoped></style>
