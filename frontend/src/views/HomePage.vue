<!-- Start of Selection -->
<template>
  <div class="home">
    <div class="container text-center">
      <h1>Hello {{ state.user.email }}</h1>
      <Suspense>
        <template #default>
          <ArticleGrid />
        </template>
        <template #fallback>
          <div class="row" align-h="center" row-centered>
            <div class="col col-4 p-2" v-for="index in 9">
              <Skeleton width="100%" height="30em" class="m-2"></Skeleton>
            </div>
          </div>
        </template>
      </Suspense>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import ArticleGrid from '@/components/ArticleGrid.vue'
import { Suspense } from 'vue'
import { mapState } from 'vuex'
import { useStore } from 'vuex'

const store = useStore()

export default {
  name: 'HomePage',
  components: { ArticleGrid, Suspense },
  computed: {
    ...mapState({
      state: state => state
    })
  }
}
</script>
<style lang="scss" scoped></style>
<!-- End of Selection -->
