<template>
  <div id="app">
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'app',
  components: { Header, Footer },
  created: function () {
    const self = this
    this.$http.interceptors.response.use(undefined, function (err) {
      return new Promise(function (resolve, reject) {
        if (!err.response || ((err.response.status === 400 || err.response.status === 401) && err.config && !err.config.__isRetryRequest)) {
          self.$store.dispatch('logout')
        }
        throw err
      })
    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  color: $primary;

}

.navbar {
  margin-bottom: 30px;
}

.btn.btn-primary.btn-block{
  background-color: $secondary;
  border-color: $secondary;
}
.pagination ul {
  display: inline-block;
  padding: 0;
  margin: 0;
}

.pagination li {
  display: inline;
}

.pagination li button {
  color: $primary;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}

.pagination .page-item.active .page-link {
  background-color: $primary;
  color: white;
  border-color: $primary;
}

.pagination li:hover:not(.active) a {
  background-color: #ddd;
}
button a:hover {
    text-decoration: none;
    color:white ;

}
button a{
    color:white ;
}

article.card{
  height:518px;
}

// .card-text {
//   min-height: 200px;
// }
.card-img-top{
  height: 100px;
}
.card-title {
height: 80px;
}
div .card-text{
  height: 190px;
}
</style>
