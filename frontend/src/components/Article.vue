<template>
  <div>
<!--               <b-col l="4">
 -->                            <b-col l="4" mb="2">

      <b-card
        :title="title"
        footer-tag="footer"
        img-src="https://picsum.photos/600/300/?image=25"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 21rem;"
        class="mb-4"
      >
      <div>
        <b-card-text>
          {{ content }}
        </b-card-text>
      </div>
        <b-row id="article-button-row" align-v="end">
          <b-col>
        <b-button
        block
          v-b-tooltip.hover
          title="Proof"
          variant="primary"
          >   <b-link :href="proof">Proof</b-link></b-button></b-col>
          <b-col>
        <b-button
        block
          v-b-tooltip.hover
          title="Source"
          variant="primary"
          >   <b-link :href="source">Source</b-link></b-button>
          </b-col>
        </b-row>
              <template v-slot:footer>
        <b-row>

          <b-col v-if="!already_voted" class="col">
        <b-button
        v-on:click="commitVote('true', $event)"
        block
          v-b-tooltip.hover
          title="True"
          variant="primary"
          >    <font-awesome-icon icon="thumbs-up" /></b-button>
          </b-col>

        <div v-if="already_voted">Thanks For Voting</div>

          <b-col class="col">
              <b-tooltip :target="tooltipId" :title="''+percentages"></b-tooltip>
    <b-progress  class="mt-2 " show-value animated>
      <b-progress-bar v-if="tooltipId" :id="tooltipId" :value="percentages" variant="success"></b-progress-bar>

    </b-progress>

          </b-col>
          <b-col v-if="!already_voted" class="col">
                  <b-button
                  v-on:click="commitVote('false', $event)"
                  block
          v-b-tooltip.hover
          title="False"
          variant="primary"
          >    <font-awesome-icon icon="thumbs-down" /></b-button>
          </b-col>
        </b-row>
      </template>
      </b-card>
    </b-col>
  </div>
</template>

<script>
export default {
  props: ['title', 'content', 'id', 'percentages_prop', 'source', 'proof'],
  data () {
    return {
      percentages: 0,
      already_voted: 0
    }
  },
  mounted () {
    this.fetchVotes()
  },
  computed: {
    tooltipId: function () {
      return 'progress-bar-' + this.id
    }
  },
  methods: {
    commitVote: function (vote) {
      console.log('clicked')
      const self = this
      this.$http
        .post(this.$api_endpoint.concat('/news-vote/'), { choice: vote, news: this.id }, {
          headers: {
            Authorization: 'Token  2f747bdb64d4a02cacf3ee428529fbf63509da8b'
          }
        })
        .then(response => {
          self.already_voted = 1
          self.fetchVotes()
        })
        .catch(error => {
          console.log(error)
        })
    },
    fetchVotes: function () {
      const self = this
      // setTimeout(function () {
      //   self.percentages = self.percentages_prop
      // }, 600)
      this.$http
        .get(this.$api_endpoint.concat('/news-vote/') + this.id + '/', {
          headers: {
            Authorization: 'Token  2f747bdb64d4a02cacf3ee428529fbf63509da8b'
          }
        })
        .then(response => {
          // console.log(response.data)
          self.already_voted = response.data.already_voted
          self.percentages = (response.data.true / (response.data.false + response.data.true)) * 100
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped></style>
