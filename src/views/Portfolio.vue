<template>
  <section>
    <h2>Projects</h2>
    <div class="projects">
      <div v-for="post in posts" class="post-item" :key="post._id">
        <router-link class="project" :to="`/blog/${post.slug.current}`">
          <div class="img-container">
            <img v-if="post.image" :src="imageUrlFor(post.image).width(394)" />
          </div>
          <div class="space-between">
            <p class="text-sm">{{ post.categories.join(", ") }}</p>
            <p class="text-sm">{{ post.publishedAt }}</p>
          </div>
          <h4>{{ post.title }}</h4>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import sanity from "../client";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanity);

const query = `*[_type == "post"]{
  _id,
  title,
  "categories": categories[]->title,
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
}[0...50]`;

export default {
  name: "Home",
  data() {
    return {
      loading: true,
      posts: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      sanity.fetch(query).then(
        (posts) => {
          this.loading = false;
          this.posts = posts;
        },
        (error) => {
          this.error = error;
        }
      );
    },
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
  },
};
</script>
