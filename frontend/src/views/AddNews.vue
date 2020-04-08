<template>
  <div>
      <b-container>
    <b-row align-h="center" align-v="center">
        <b-col lg="4" col-centered>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Title:"
        label-for="input-1"
        description="Keep it short and Kolea"
      >
        <b-form-input
          id="input-1"
          v-model="form.title"
          type="text"
          required
          placeholder="Enter Title"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Content:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.content"
          required
          placeholder="Enter Content"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Food:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.food"
          :options="foods"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-4" label="Proof:" label-for="input-4">

       <b-form-file
     id="input-4"

      v-model="form.file"
      :state="Boolean(form.file)"
      placeholder="Choose a file or drop it here..."
      drop-placeholder="Drop file here..."
    ></b-form-file>
    <div class="mt-3">Selected file: {{ form.file ? form.file.name : '' }}</div>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
        </b-col>
    </b-row>
      </b-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        title: '',
        content: '',
        food: null,
        file: null,
        file2: null,
        error: null
      },
      foods: [{ text: 'Select One', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
      show: true
    }
  },
  methods: {
    handleFileUpload () {
    },
    onSubmit (evt) {
      evt.preventDefault()
      const formData = new FormData()
      formData.append('title', this.form.title)
      formData.append('content', this.form.content)
      formData.append('proof', this.form.file)
      formData.append('source', 'http://test.co.il')
      formData.append('author', 2)
      this.$http
        .post('http://172.17.0.6:8000/api/news/create/',
          formData,
          {
            headers: {
              Authorization: 'Token  2f747bdb64d4a02cacf3ee428529fbf63509da8b'
            }
          }
        ).then(function () {
          console.log('SUCCESS!!')
        })
        .catch(function (err) {
          console.log(err)
          console.log(err.response)
        })
      console.log(this)
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.title = ''
      this.form.content = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
