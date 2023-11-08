<script setup>

import {onMounted, ref, watch} from "vue";

const data = ref([]);

const rangeBefore = ref(0);
const rangeAfter = ref(2);
const isSimple = ref(false);
const isRounded = ref(false);
const prevIcon = ref("chevron-left");
const nextIcon = ref("chevron-right");
const total = ref(1);
const current = ref(1);
const perPage = ref(10);
const order = ref("");
const size = ref("");
const loading = ref(false);
const search_value = ref("");


const loadAsyncData = () => {
  const params = [
    // "api_key=bb6f51bef07465653c3e553d6ab161a8",
    // "language=en-US",
    // "include_adult=false",
    // "include_video=false",
    `page=${current.value}`,
  ].join("&");
  loading.value = true;
  fetch(`/api/volunteer?${params}`)
      .then((response) => response.json())
      .then((result) => {
        total.value = result.total;
        data.value = result.bookings.map((item) => {
          return item;
        });
        loading.value = false;
      })
      .catch((error) => {
        data.value = [];
        total.value = 0;
        loading.value = false;
        throw error;
      });
};
watch(() => current.value, () => {
  loadAsyncData();
});
onMounted(() => {
  loadAsyncData();
});
</script>

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
              <a class="nav-link" href="/event">Events</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/become/volunteer">Become
                volunteer</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="/volunteers">Volunteer</a>
            </li>
          </ul>
          <input class="form-control me-2" type="search" placeholder="Keywords" aria-label="Search" v-model="search_value" style="width: auto">
          <router-link :to="`/search?Title=${search_value}`" class="btn btn-outline-success" role="button"
                       style="float: right;width: 6rem">Search
          </router-link>
        </div>
      </div>
    </nav>

    <div class="container mt-1 mb-3 mx-5">
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status" v-if="loading!==false">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div class="row" v-if="loading===false">
        <div class="col">
            <span class="badge text-bg-light event mt-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item VolunteerPage"><a href="/"
                                                                     style="text-decoration: none">Home</a></li>
                        <li class="breadcrumb-item VolunteerPage active" aria-current="page">Volunteers</li>
                    </ol>
                </nav>
            </span>
        </div>
        <div class="col mt-4">
          <a class="btn btn-primary btn-lg" href="/volunteer" role="button" style="float: right;">New</a>
        </div>
      </div>

      <div class="row" v-if="loading===false">
        <div class="col">
          <table class="table table-striped-columns">
            <thead>
            <tr>
              <th scope="col">Volunteer name</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in data" :key="item" style="height: 3.44rem">
              <th>{{ item.Name }}</th>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="col">
          <table class="table table-striped-columns">
            <thead>
            <tr>
              <th scope="col">Email</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in data" :key="item" style="height: 3.44rem">
              <th>{{ item.Email }}</th>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="col">
          <table class="table table-striped-columns">
            <thead>
            <tr>
              <th scope="col">Contact</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in data" :key="item" style="height: 3.44rem">

              <th v-if="item.Contact!==''">{{ item.Contact }}</th>
              <th v-if="item.Contact===''">No Contact</th>

            </tr>
            </tbody>
          </table>
        </div>
        <div class="col">
          <table class="table table-striped-columns">
            <thead>
            <tr>
              <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in data" :key="item">
              <th>
                <router-link :to="`/volunteer/${item._id}`" class="btn btn-secondary New" role="button"
                             style="float: left;width: 6rem">Edit
                </router-link>
              </th>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <o-pagination class="mt-4"
          v-model:current="current"
          :total="total"
          :range-before="rangeBefore"
          :range-after="rangeAfter"
          :order="order"
          :size="size"
          :simple="isSimple"
          :rounded="isRounded"
          :per-page="perPage"
          :icon-prev="prevIcon"
          :icon-next="nextIcon"
          aria-next-label="Next page"
          aria-previous-label="Previous page"
          aria-page-label="Page"
          aria-current-label="Current page">
      </o-pagination>
    </div>


  </section>
</template>
