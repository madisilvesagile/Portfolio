<template>
  <div class="posts">
    <div class="loading" v-if="loading">Loading...</div>

    <section>
      <h1><b>Madis Ilves</b><br /><small>UI/UX designer</small></h1>
      <div class="space-between">
        <span class="material-symbols-outlined absolute">
          apps
        </span>
        <aside>
          <div>
            <h3>Biography</h3>
            <p>
              Web development student seeking for <b>front-end developer</b> and
              <b>UX design</b> projects.
            </p>
          </div>
          <div>
            <h3>Services</h3>
            <ul>
              <li>Prototyping</li>
              <li>UI/UX design</li>
              <li>HTML/CSS/Javascript</li>
            </ul>
          </div>
          <div>
            <h3>contact</h3>
            <p>
              <a href="mailto:madis@bobthecat.design">madis@bobthecat.design</a>
              <br />
              <a href="tel:+37258965025">+372 589 65 025</a>
              <br />Tallinn, Estonia
            </p>
          </div>
        </aside>
        <div class="section-center">
          <svg xmlns="http://www.w3.org/2000/svg">
            <clipPath id="svgPath">
              <path
                class="path"
                d="M28.1,-23.9C35,-4.2,38.4,10,33.1,24.3C27.8,38.6,13.9,53.2,-3,54.9C-19.9,56.7,-39.8,45.6,-52.1,27.2C-64.4,8.7,-69.2,-17,-59.2,-38.4C-49.3,-59.9,-24.6,-77.1,-7,-73.1C10.5,-69,21.1,-43.6,28.1,-23.9Z"
                transform="translate(330 370), scale(5)"
              />
            </clipPath>
          </svg>
          <video playsinline autoplay muted loop>
            <source src="../assets/cv.mp4" type="video/mp4" />
          </video>
        </div>
        <aside>
          <div>
            <p class="text-lg">2</p>
            <h3>Years of<br />experience</h3>
          </div>
          <div>
            <p class="text-lg">13</p>
            <h3>finished<br />projects</h3>
          </div>
          <div>
            <p class="text-lg">100%</p>
            <h3>satisfied<br />customers</h3>
          </div>
        </aside>
      </div>
    </section>

    <hr />

    <section>
      <h2>Education and skills</h2>
      <div class="education space-around">
        <div>
          <h3>2020</h3>
          <span>
            <p class="text-md">HTML, CSS, JS certificate</p>
            <p class="text-sm">Codeacademy</p>
          </span>
          <span>
            <p class="text-md">Design internship</p>
            <p class="text-sm">AgileWorks AS</p>
          </span>
        </div>
        <div>
          <h3>2021</h3>
          <span>
            <p class="text-md">UI/UX designer</p>
            <p class="text-sm">AgileWorks AS</p>
          </span>
          <span>
            <p class="text-md">Vue certificate</p>
            <p class="text-sm">Pluralsights</p>
          </span>
          <span>
            <p class="text-md">Logo and web design</p>
            <p class="text-sm">Private company</p>
          </span>
        </div>
        <div>
          <h3>2022</h3>
          <span>
            <p class="text-md">Web design graduate</p>
            <p class="text-sm">Tallinn Polütehnikum</p>
          </span>
          <span>
            <p class="text-md">UI designer</p>
            <p class="text-sm">Random CO</p>
          </span>
          <span>
            <p class="text-md">HTML/CSS teacher</p>
            <p class="text-sm">Tallinn High School</p>
          </span>
        </div>
      </div>

      <div class="skills space-between">
        <div>
          <img src="../assets/figma-logo.png" alt="Figma logo" />
          <div>
            <p class="text-sm">Figma</p>
          </div>
        </div>
        <div>
          <img src="../assets/xd-logo.png" alt="Adobe XD logo" />
          <div>
            <p class="text-sm">Adobe XD</p>
          </div>
        </div>
        <div>
          <img src="../assets/html5-logo.png" alt="HTML 5 logo" />
          <div>
            <p class="text-sm">HTML 5</p>
          </div>
        </div>
        <div>
          <img src="../assets/CSS3-logo.png" alt="CSS 3 logo" />
          <div>
            <p class="text-sm">CSS 3</p>
          </div>
        </div>
        <div>
          <img src="../assets/javascript-logo.png" alt="Javascript logo" />
          <div>
            <p class="text-sm">Javascript</p>
          </div>
        </div>
        <div>
          <img src="../assets/bootstrap-logo.png" alt="Bootstrap logo" />
          <div>
            <p class="text-sm">Bootstrap</p>
          </div>
        </div>
      </div>
    </section>

    <hr />

    <section>
      <h2>Selected projects</h2>
      <div class="projects">
        <div v-for="post in posts" class="post-item" :key="post._id">
          <router-link class="project" :to="`/blog/${post.slug.current}`">
            <div class="img-container">
              <img
                v-if="post.image"
                :src="imageUrlFor(post.image).width(394)"
                alt="Project preview"
              />
            </div>
            <div class="space-between">
              <p class="text-sm">{{ post.categories.join(", ") }}</p>
              <p class="text-sm">{{ post.publishedAt }}</p>
            </div>
            <h4>{{ post.title }}</h4>
          </router-link>
        </div>
      </div>
      <span class="link">
        <a href="/portfolio">More projects</a>
        <span class="material-symbols-outlined">trending_flat</span>
      </span>
    </section>
  </div>
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
}[0...3]`;

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

<style>
</style>