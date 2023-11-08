<script setup>
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const event = ref({
  Title: '',
  Organizer: '',
  Datetime: '',
  Location: '',
  Description: '',
  Quota: '',
  Image:'',
  Highlight: false
});
const search_value = ref("");

const Submit = async function () {
  let url = '/api/upload_event/'+ route.params.id;
  let method = 'PUT';
  loading.value = true;
  // post the booking to the backend
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event.value)
  });
  // convert the response to json
  const json = await response.json();
  // alert the user
  loading.value = false;
  alert(JSON.stringify(json));
  await router.push('/event');
}

const getInfor = async function () {
  // get the booking from the backend
  loading.value = true;
  const response = await fetch('/api/get_event/' + route.params.id);
  loading.value = false;
  // convert the response to json
  const json = await response.json();
  // set the booking
  event.value = {...json};
}
onMounted(() => {
  getInfor();
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
              <a class="nav-link  active" href="/event">Events</a>
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
          <router-link :to="`/search?Title=${search_value}`" class="btn btn-outline-success" role="button"
                       style="float: right;width: 6rem">Search
          </router-link>
        </div>
      </div>
    </nav>
    <div class="d-flex justify-content-center" v-if="loading!==false">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="container-fluid" v-if="loading===false">
    <span class="badge text-bg-light ms-5 mt-4">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item VolunteerPage"><a href="/" style="text-decoration: none">Home</a></li>
                <li class="breadcrumb-item VolunteerPage"><a href="/event" style="text-decoration: none">Event</a></li>

                <li class="breadcrumb-item VolunteerPage active" aria-current="page">New Event</li>
            </ol>
        </nav>
    </span>
      <form @submit.prevent="Submit">
        <div class="row">
          <div class="col-5 ms-5">
            <div class="mb-4">
              <label for="Title" class="form-label">Event title</label>
              <input type="text" class="form-control" v-model="event.Title" id="Title" maxlength="25"
                     style="border-width: 2px" required>
            </div>
            <div class="mb-4">
              <label for="Organizer" class="form-label">Organizer</label>
              <input type="text" class="form-control" v-model="event.Organizer" id="Organizer" style="border-width: 2px"
                     required>
            </div>
            <div class="mb-4">
              <label for="Datetime" class="form-label">Datetime</label>
              <input type="text" class="form-control" id="Datetime" v-model="event.Datetime"
                     placeholder="06/12/2024, 13:00" style="border-width: 2px" required>
            </div>
            <div class="mb-4">
              <label for="Location" class="form-label">Location</label>
              <input type="text" class="form-control" id="Location" v-model="event.Location"
                     placeholder="Apartment, studio or floor" style="border-width: 2px" required>
            </div>
            <div class="mb-4">
              <input type="checkbox" class="form-check-input" id="Highlight" v-model="event.Highlight"
                     style="border-width: thin;  border-color: rgb(128,128,128);background-color: lightgray">
              <label class="form-check-label" for="Highlight">Highlight</label>
            </div>

          </div>
          <div class="col-5">
            <div class="mb-4">
              <label for="Description" class="form-label">Description</label>
              <textarea class="form-control" id="Description" rows="5" v-model="event.Description"
                        style="border-width: 2px"></textarea>
            </div>
            <div class="mb-4">
              <label for="Quota" class="form-label">Quota</label>
              <input type="text" class="form-control" id="Quota" v-model="event.Quota" placeholder="10"
                     style="border-width: 2px" required>
            </div>
            <div class="mb-4">
              <label for="Image" class="form-label">Image</label>
              <input type="url" class="form-control" id="Image" v-model="event.Image"
                     placeholder="http://image.com/example.png" style="border-width: 2px">
            </div>
            <button type="submit" class="btn btn-primary" style="float: right;" id="save">Save</button>
          </div>
        </div>
      </form>
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