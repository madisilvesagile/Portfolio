<template>
    <section>
      <h2>Contact</h2>
      <form ref="form" @submit.prevent="sendEmail" @submit="submitForm">
        <label>Name</label>
        <input type="text" name="user_name">
        <label>Email</label>
        <input type="email" name="user_email">
        <label>Message</label>
        <textarea name="message"></textarea>
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
  width: 24rem;
  margin: 0 auto 10rem;
  display: flex;
  flex-direction: column;
}

input, textarea {
  padding: 1rem;
  border: 1px solid $gray-80;
  box-sizing: border-box;
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  resize: vertical;
  font-size: 1rem;
}

input:focus, textarea:focus {
  outline-color:  $gray-70;
}

textarea {
  height: 10rem;
}

button {
  padding: 1rem;
  font-size: 1rem;
  color: $gray-10;
}
.message {
    position: fixed;
    z-index: 10;
    bottom: 2rem;
    right: 2rem;
    padding: 1rem;
    font-weight: 600;
    background-color: white;
    border: 1px solid $grey-10;
    border-radius: .125rem;
}

@media (max-width: 768px) {
  form {
    width: 100%;
  }
}
</style>

