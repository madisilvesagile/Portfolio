<template>
  <div>
    <div class="loading" v-if="loading">Loading...</div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <div class="space-between">
        <div>
          <h3>Tags</h3>
          <p class="text-sm">{{ post.categories.join(", ") }}</p>
        </div>
        <div>
          <h3>Work hours</h3>
          <p class="text-sm">{{ post.name }}hr</p>
        </div>
        <div>
          <h3>Issued</h3>
          <p class="text-sm">{{ post.publishedAt }}</p>
        </div>
      </div>
      <img v-if="post.image" :src="imageUrlFor(post.image).width(480)" />
      <article>
        <h5>Problem</h5>
        <p>{{ post.excerpt }}</p>
      </article>
      <article>
        <h5>Solution</h5>
        <SanityBlocks :blocks="blocks" />
      </article>
    </div>
  </div>
</template>

<script>
import { SanityBlocks } from "sanity-blocks-vue-component";
import sanity from "../client";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanity);

const query = `*[slug.current == $slug] {
  _id,
  title,
  "categories": categories[]->title,
  excerpt,
  slug,
  body,
  publishedAt,
  "image": mainImage{
  asset->{
  _id,
  url
}
},
"name":author->name,
"authorImage":author->image
}[0]
`;

export default {
  name: "SinglePost",
  components: { SanityBlocks },
  data() {
    return {
      loading: true,
      post: [],
      blocks: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    fetchData() {
      this.error = this.post = null;
      this.loading = true;

      sanity.fetch(query, { slug: this.$route.params.slug }).then(
        (post) => {
          this.loading = false;
          this.post = post;
          this.blocks = post.body;
        },
        (error) => {
          this.error = error;
        }
      );
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 40em;
}

h3 {
  margin-bottom: 0;
}

h5 {
  margin-bottom: 0.25rem;
}

.space-between {
  margin-bottom: 2rem;
}

article {
  margin: 2rem 0 0;
}

article:last-of-type {
  margin-bottom: 5rem;
}
</style>
