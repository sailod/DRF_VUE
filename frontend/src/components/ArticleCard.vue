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
          <div v-if="!already_voted" class="col-3">
            <Button
              @click="commitVote('true', $event)"
              icon="pi pi-thumbs-up"
              severity="primary"
              style="margin-left: 0.5em"
            />
          </div>

          <div v-if="already_voted">Thanks For Voting</div>

          <div class="col stretch my-auto justify-content-center">
            <ProgressBar :value="percentages"></ProgressBar>
          </div>
          <div v-if="!already_voted" class="col-3">
            <Button
              @click="commitVote('false', $event)"
              icon="pi pi-thumbs-down"
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
import axios from 'axios'

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
      axios
        .put(
          `https://vault.immudb.io/ics/api/v1/ledger/default/collection/default/document`,
          { choice: vote, news: this.id },
          {
            headers: {
              'X-API-Key':
                'default.LVodxizqRZkbuWlXyFSaWA.p8OgfRID80Zcg-7bP54GfmeS3vmBfXiCLSTbhv8d7zsIDghJ',
            },
          },
        )
        .then((response) => {
          if (this.content == 'wefw') debugger
          this.already_voted = 1
          this.fetchVotes()
        })
        .catch((error) => {
          if (this.content == 'wefw') debugger
          console.log(error)
        })
    },
    async fetchVotes() {
      if (this.content == 'wefw') debugger

      try {
        const trueVotes = await axios.post(
          'https://vault.immudb.io/ics/api/v1/ledger/default/collection/default/documents/count',
          {
            query: {
              expressions: [
                {
                  fieldComparisons: [
                    { field: 'news', operator: 'EQ', value: this.id },
                    { field: 'choice', operator: 'EQ', value: true },
                  ],
                },
              ],
            },
          },
          {
            headers: {
              'X-API-Key':
                'default.LVodxizqRZkbuWlXyFSaWA.p8OgfRID80Zcg-7bP54GfmeS3vmBfXiCLSTbhv8d7zsIDghJ',
            },
          },
        )
        const falseVotes = await axios.post(
          'https://vault.immudb.io/ics/api/v1/ledger/default/collection/default/documents/count',
          {
            query: {
              expressions: [
                {
                  fieldComparisons: [
                    { field: 'id', operator: 'EQ', value: this.id },
                    { field: 'choice', operator: 'EQ', value: 'false' },
                  ],
                },
              ],
            },
          },
          {
            headers: {
              'X-API-Key':
                'default.LVodxizqRZkbuWlXyFSaWA.p8OgfRID80Zcg-7bP54GfmeS3vmBfXiCLSTbhv8d7zsIDghJ',
            },
          },
        )
        // console.log(response.data)
        this.already_voted = response.data.already_voted
        this.percentages =
          (response.data.true / (response.data.false + response.data.true)) *
          100
      } catch (e) {
        console.log(`failed to fetch votes: ${e}`)
      }
    },
    deleteArticle(articleId) {
      this.httpWithAuth
        .delete(`/api/news/${articleId}`, {
          withCredentials: true,
        })
        .then((response) => {
          this.$emit('articleDeleted')
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
