<template>
  <div>
    <b-card
      :title="title"
      footer-tag="footer"
      img-src="https://picsum.photos/600/300/?image=25"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 21rem"
      class="mb-4"
    >
      <div class="mb-2">
        <b-card-text>
          {{ content }}
        </b-card-text>
      </div>
      <b-row class="mb-2" id="article-button-row" align-v="end">
        <b-col>
          <b-link :href="proof"
            ><b-button block v-b-tooltip.hover title="Proof" variant="primary">
              Proof</b-button
            ></b-link
          ></b-col
        >
        <b-col>
          <b-button block v-b-tooltip.hover title="Source" variant="primary">
            <b-link :href="source">Source</b-link></b-button
          >
        </b-col>
      </b-row>
      <template>
        <b-row>
          <b-col v-if="!already_voted" class="col">
            <b-button
              v-on:click="commitVote('true', $event)"
              block
              v-b-tooltip.hover
              title="True"
              variant="primary"
            >
              <font-awesome-icon icon="thumbs-up"
            /></b-button>
          </b-col>

          <div v-if="already_voted">Thanks For Voting</div>

          <b-col class="col">
            <b-tooltip
              :target="tooltipId"
              :title="'' + percentages"
            ></b-tooltip>
            <b-progress class="mt-2" show-value animated>
              <b-progress-bar
                v-if="tooltipId"
                :id="tooltipId"
                :value="percentages"
                variant="success"
              ></b-progress-bar>
            </b-progress>
          </b-col>
          <b-col v-if="!already_voted" class="col">
            <b-button
              v-on:click="commitVote('false', $event)"
              block
              v-b-tooltip.hover
              title="False"
              variant="primary"
            >
              <font-awesome-icon icon="thumbs-down" />
            </b-button>
          </b-col>
        </b-row>
      </template>
    </b-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['title', 'content', 'id', 'percentages_prop', 'source', 'proof'],
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
    ...mapState(['http', 'httpWithAuth', 'isLoggedIn']),
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
  },
}
</script>

<style scoped></style>
