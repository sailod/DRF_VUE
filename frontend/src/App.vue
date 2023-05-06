<template>
  <div id="app">
    <HeaderSection></HeaderSection>
    <router-view/>
    <FooterSection></FooterSection>
  </div>
</template>

<script>
import HeaderSection from '@/components/HeaderSection.vue'
import FooterSection from '@/components/FooterSection.vue'

export default {
  name: 'app',
  components: { HeaderSection, FooterSection },
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
  background-color: $secondary;
}

.footerSection-container {
  margin-top: 1.5rem;
}

.footerSection {
  background-color: $secondary;
  color: $tertiary;
}

.btn.btn-primary.btn-block{
  background-color: $secondary;
  border-color: $secondary;
}

.delete-news-btn{
  z-index: 1;
  position: absolute;
  top: 1%;
  right: 6%;
  color: red;
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
