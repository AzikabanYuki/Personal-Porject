<script setup>
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();

const total = ref(0);
const sortField = ref("modifiedAt");
const sortOrder = ref("desc");
const loading = ref(false);
const data = ref([]);
const for_loop = ref([0, 1]);
const search_value = ref("");

const getInfor = () => {
  const params = [
    `Title=${route.query.Title}`,
    `perPage=6`,
    `sort_by=${sortField.value}.${sortOrder.value}`,
  ].join("&");
  loading.value = true;
  fetch(`/api/get_home_events?${params}`)
      .then((response) => response.json())
      .then((result) => {
        total.value = result.total;
        data.value = result.volunteer.map((item) => {
          return item;
        });
        if (data.value.length < 6) {
          const defaultImageUrl = 'data:image/png;base64,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';
          for (let i = data.value.length; i < 6; i++) {
            data.value.push({Image: defaultImageUrl, Title: 'No Title', Description: 'No Description'});
          }
        }
        loading.value = false;
      })
      .catch((error) => {
        data.value = [];
        total.value = 0;
        loading.value = false;
        throw error;
      });
};
const getTimeDifference = (updateTime) => {
  const currentTime = new Date();
  const updateTimestamp = new Date(updateTime);
  const timeDifference = currentTime - updateTimestamp;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) {
    return `last updated ${days} day(s) ${hours - days * 24} hour(s) ago`;
  } else if (hours > 0) {
    return `last updated ${hours} hour(s) ${minutes - hours * 60} minute(s) ago`;
  } else if (minutes > 0) {
    return `last updated ${minutes} minute(s) ${seconds - minutes * 60} second(s) ago`;
  } else if (seconds > 0) {
    return `last updated ${seconds} second(s) ago`;
  } else {
    return `No update information`;
  }
}

async function performSearch() {
  await router.push(`/search?Title=${search_value.value}`);
  location.reload();
}

onMounted(async () => {
  // if there is an id in the route
  await getInfor();
});
</script>

<template>
  <section class="fixed-top scrollable-content">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/event">Events</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/become/volunteer">Become
                volunteer</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/volunteers">Volunteer</a>
            </li>
          </ul>
          <input class="form-control me-2" type="search" placeholder="Keywords" aria-label="Search" v-model="search_value" style="width: auto">
          <button class="btn btn-outline-success" style="width: 6rem" @click="performSearch">Search</button>
        </div>
      </div>
    </nav>
    <div class="container-fluid mx-4 mt-4">
    <span class="badge text-bg-light event">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item VolunteerPage"><a href="/" style="text-decoration: none">Home</a></li>
          <li class="breadcrumb-item VolunteerPage active" aria-current="page">Event</li>
        </ol>
      </nav>
    </span>
      <a class="btn btn-primary" href="/event/new" role="button" style="float: right;margin-right: 3rem">New</a>
    </div>

    <div class="d-flex justify-content-center" v-if="loading!==false">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div class="row my-4 mx-4" v-for="temp in for_loop" :key="temp">
      <div class="card-group mt3" v-if="loading===false">
        <div class="card" v-for="item in data.slice(3*temp,3*temp+3)" :key="item">
          <a :href="`/event/detail/${item._id}`">
            <img v-bind:src="item.Image" class="card-img-top" alt="can not display the image" style="height: 20rem">
          </a>
          <div class="card-body">
            <h5 class="card-title">{{ item.Title }}</h5>
            <p class="card-text">{{ item.Description }}</p>
            <router-link :to="`/event/edit/${item._id}`" class="btn btn-outline-primary btn-lg" role="button"
                         style="float: right;width: 6rem">Edit
            </router-link>
            <p class="card-text"><small class="text-body-secondary">{{ getTimeDifference(item.modifiedAt) }}</small></p>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollable-content {
  max-height: 100vh; /* Adjust the maximum height as needed */
  overflow-y: auto;
}

.VolunteerPage {
  font-weight: normal;
  font-size: medium;
  margin-top: 0.4rem;
}
</style>