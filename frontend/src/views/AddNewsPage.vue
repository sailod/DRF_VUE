<template>
  <div>
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="col-lg-4">
          <form
            @submit.prevent="onSubmit"
            @reset.prevent="onReset"
            v-if="show"
            enctype="multipart/form-data"
          >
            <div class="form-group">
              <label for="input-1">Title:</label>
              <InputText
                id="input-1"
                class="form-control"
                v-model="form.title"
                required
                placeholder="Enter Title"
              ></InputText>
              <small class="form-text text-muted"
                >Keep it short and simple</small
              >
            </div>

            <div class="form-group">
              <label for="input-2">Content:</label>
              <InputText
                id="input-2"
                class="form-control"
                v-model="form.content"
                required
                placeholder="Enter Content"
              ></InputText>
            </div>

            <div class="form-group">
              <label for="input-3">Severity:</label>
              <Dropdown
                id="input-3"
                class="form-control"
                v-model="form.severity"
                :options="severities"
                required
              ></Dropdown>
            </div>

            <div class="form-group">
              <label for="input-4">Image:</label>
              <FileUpload
                id="input-4"
                class="custom-file-input"
                :auto="false"
                :showUploadButton="false"
                :showCancelButton="false"
                :chooseLabel="'Choose a file or drop it here...'"
                :uploadLabel="'Upload'"
                :cancelLabel="'Cancel'"
                :maxFileSize="1000000"
                @select="
                  (file) => {
                    this.form.file = file.files[0]
                  }
                "
              >
              </FileUpload>
              <label class="custom-file-label" for="input-4">
                {{
                  form.file
                    ? form.file.name
                    : 'Choose a file or drop it here...'
                }}
              </label>
            </div>

            <Button type="submit" class="btn btn-primary">Submit</Button>
            <Button type="reset" class="p-button p-button-danger">Reset</Button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { useToast } from "primevue/usetoast";

export default {
  data() {
    return {
      form: {
        title: '',
        content: '',
        severity: null,
        file: null,
        error: null,
      },
      severities: ['Low', 'Medium', 'High'],
      show: true,
    }
  },
  computed: { ...mapState(['http', 'httpWithAuth', 'isLoggedIn']) },
  methods: {
    onSubmit(evt) {
      evt.preventDefault()
      const formData = new FormData()
      formData.append('title', this.form.title)
      formData.append('content', this.form.content)
      formData.append('proof', this.form.file)
      formData.append('source', 'http://test.com')
      this.httpWithAuth
        .post('/api/news/create/', formData)
        .then(() => {
          // const toast = useToast();
          this.$router.push({ path: '/' })
          this.$toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });

        })
        .catch(function (err) {
          console.log(err)
          console.log(err.response)
        })
      console.log(this)
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.title = ''
      this.form.content = ''
      this.form.severity = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
  },
}
</script>
