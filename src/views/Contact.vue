<template>
    <section>
      <h2>Contact</h2>
      <form ref="form" @submit.prevent="sendEmail" @submit="submitForm" autocomplete="off">
        <div class="row">
          <div class="form-group">
            <label>Name</label>
            <input type="text" name="user_name">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" name="user_email">
          </div>
        </div>
        <div class="form-group">
          <label>Message</label>
          <textarea name="message"></textarea>
        </div>
        <button type="submit" value="Send">Send</button>
      </form>
    </section>
</template>

<script>
import emailjs from '@emailjs/browser';

export default {
  name: 'MyComponent',
  methods: {
    sendEmail() {
      emailjs.sendForm('service_ufi3pfr', 'template_hpxetew', this.$refs.form, 'mAxs_kQQdKFT2LoFN')
        .then((result) => {
            console.log('SUCCESS!', result.text);
        }, (error) => {
            console.log('FAILED...', error.text);
        });
    },
    submitForm(){
        this.$refs.form.reset();
    },
  },
}
</script>

<style scoped>

form {
  max-width: 40rem;
  margin: 0 auto;
}
.row {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.form-group {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

input, textarea {
  padding: 1rem;
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  font-size: 1rem;
}

textarea {
  height: 10rem;
}

button {
  width: 10rem;
  padding: 0.75rem;
  font-size: 1rem;
}

@media (max-width: 768px) {
  form {
    width: 100%;
  }
  .row {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
}
</style>

