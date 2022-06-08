<template>
  <p>
    <section>
      <h2>Contact</h2>
      <form>
        <label for="name">Name</label>
        <input type="text" id="fname" name="name" autocomplete="off">
  
        <label for="email">Email</label>
        <input type="email" id="email" name="email" autocomplete="off">
  
        <label for="subject">Subject</label>
        <textarea id="subject" name="subject"></textarea>
  
        <button>Send</button>
      </form>
    </section>
  </p>
</template>

<style scoped>
form {
  width: 24rem;
  margin: 0 auto 10rem;
  display: flex;
  flex-direction: column;
}

input, textarea {
  padding: 1rem;
  border: 1px solid var(--gray-80);
  box-sizing: border-box;
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  resize: vertical;
  font-size: 1rem;
}

input:focus, textarea:focus {
  outline-color:  var(--gray-70);
}

textarea {
  height: 10rem;
}

button {
  padding: 1rem;
  font-size: 1rem;
  color: var(--gray-10);
}

@media (max-width: 768px) {
  form {
    width: 100%;
  }
}
</style>

