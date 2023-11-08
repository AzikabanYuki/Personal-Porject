<script setup>
import {ref, onMounted} from 'vue'
import {useRoute, useRouter} from "vue-router";
const router = useRouter();
const route = useRoute();

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
const loading = ref(false);
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
    <div class="container-fluid">
      <div class="row">
        <div class="col-6 ms-5">
                <span class="badge text-bg-light mt-4">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item VolunteerPage"><a href="/" style="text-decoration: none">Home</a></li>
                            <li class="breadcrumb-item VolunteerPage"><a href="/event" style="text-decoration: none">Events</a></li>
                            <li class="breadcrumb-item VolunteerPage active" aria-current="page">Event title</li>
                        </ol>
                    </nav>
                </span>
        </div>
      </div>
    </div>
    <!--    <div class="d-flex justify-content-center" v-if="loading!==false">-->
    <!--      <div class="spinner-border" role="status">-->
    <!--        <span class="visually-hidden">Loading...</span>-->
    <!--      </div>-->
    <!--    </div>-->
    <div class="row">
      <div class="col-6 ms-5">
        <div class="card col-12 my-4" style="height: 30rem;">
          <div class="card-body ">
            <h5 class="card-title" id="event_title">{{event.Title}}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary" id="organizer">{{event.Organizer}}</h6>
            <p class="card-text" id="description">{{event.Description}}</p>
            <div class="card">
              <ul class="list-group list-group-flush">
                <li class="list-group-item" id="datetime">{{event.Datetime}}</li>
                <li class="list-group-item" id="location">{{event.Location}}</li>
                <li class="list-group-item" id="quota">{{event.Quota}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="col-5">
        <div class="card my-4" style="width: 35rem;height: 30rem;">
          <img v-bind:src="event.Image" class="card-img-top" id="image" style="height: 23rem;"
               alt="Can not display image">
          <div class="card-body">
            <h5 class="card-title" style="color: rgb(128,128,128)"><strong>Become a volunteer!</strong></h5>
            <p class="card-text" style="color: rgb(128,128,128)">You time and talent can make a real different in people's life.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.VolunteerPage {
  font-weight: normal;
  font-size: medium;
  margin-top: 0.4rem;
}
</style>