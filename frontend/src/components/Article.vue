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
        <b-card-text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </b-card-text>

        <b-row>
          <b-col class="col-4">
        <b-button
        block
          v-b-tooltip.hover
          title="True"
          variant="primary"
          >    <font-awesome-icon icon="thumbs-up" /></b-button>
          </b-col>
          <b-col class="col-4">
              <b-tooltip :target="tooltipId" :title="''+percentages"></b-tooltip>
    <b-progress  class="mt-2 " show-value animated>
      <b-progress-bar v-if="tooltipId" :id="tooltipId" :value="percentages" variant="success"></b-progress-bar>

    </b-progress>

          </b-col>
          <b-col class="col-4">
                  <b-button
                  block
          v-b-tooltip.hover
          title="False"
          variant="primary"
          >    <font-awesome-icon icon="thumbs-down" /></b-button>
          </b-col>
        </b-row>
              <template v-slot:footer>
        <em>Footer Slot</em>
      </template>
      </b-card>
    </b-col>
  </div>
</template>

<script>
export default {
  props: ['title', 'content', 'id', 'percentages_prop'],
  data () {
    return {
      percentages: 0
    }
  },
  mounted () {
    const self = this
    setTimeout(function () {
      self.percentages = self.percentages_prop
    }, 600)
  },
  computed: {
    tooltipId: function () {
      return 'progress-bar-' + this.id
    }
  }
}
</script>

<style scoped></style>
