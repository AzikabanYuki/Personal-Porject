<script setup>
import {computed, ref} from "vue";
const search_value = ref("");
const loading = ref(false);
const volunteer = ref({
  Email: '',
  Password: '',
  Name: '',
  Contact: '',
  Age: 'not selected',
  remark: '',
  terms: false
});
const color = computed(() => {
  if (volunteer.value.Age === 'not selected') {
    return "color:rgb(128,128,128)";
  } else {
    return "black";
  }
});
const Submit = async function () {
  if (volunteer.value.terms) {
    let url = '/api/upload';
    let method = 'POST';

    if (volunteer.value._id) {
      url = url + '/' + volunteer.value._id;
      method = 'PUT';
    }
    loading.value = true;
    // post the booking to the backend
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(volunteer.value)
    });
    // convert the response to json
    const json = await response.json();
    // alert the user
    loading.value = false;
    alert(JSON.stringify(json));
  } else {
    alert("Please agree to terms and conditions")
  }
}
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
              <a class="nav-link" href="/event">Events</a>
            </li>
            <li class="nav-item">
              <a class="nav-link  active" href="/become/volunteer">Become
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
      <div class="row">
        <div class="col-6 ms-5">
          <span class="badge text-bg-light mt-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item VolunteerPage"><a href="/" style="text-decoration: none;">Home</a></li>
                        <li class="breadcrumb-item VolunteerPage active" aria-current="page">Become volunteer!</li>
                    </ol>
                </nav>
            </span>
        </div>
      </div>
      <div class="row">
        <div class="col-6 ms-5">
          <form @submit.prevent="Submit">
            <div class="my-4">
              <label for="Email" class="form-label">Email</label>
              <input type="email" class="form-control" v-model="volunteer.Email" id="Email" style="border-width: 2px" required>
            </div>
            <div class="mb-4">
              <label for="Password" class="form-label">Password</label>
              <input type="password" class="form-control" v-model="volunteer.Password" id="Password" style="border-width: 2px"
                     required>
            </div>
            <div class="mb-4">
              <label for="Name" class="form-label">Name</label>
              <input type="text" class="form-control" id="Name"  v-model="volunteer.Name" style="border-width: 2px" required>
            </div>
            <div class="mb-4">
              <label for="Contact" class="form-label">Contact</label>
              <input type="text" class="form-control" id="Contact" v-model="volunteer.Contact" style="border-width: 2px">
            </div>
            <div class="mb-4">
              <label for="age">Age group</label>
              <select class="form-select" name="Age" id="age" v-bind:style="color" style="border-width: 2px"
                      v-model="volunteer.Age">
                <option value="not selected" style="color:rgb(128,128,128);" selected>Dropdown...</option>
                <option value="18-24" style="color: black">18-24</option>
                <option value="25-34" style="color: black">25-34</option>
                <option value="35-45" style="color: black">35-45</option>
                <option value="Over 45" style="color: black">Over 45</option>
              </select>
            </div>
            <div class="mb-4">
              <label for="exampleFormControlTextarea1" class="form-label">About me and remark</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="remark"
                        style="border-width: 2px" v-model="volunteer.remark"></textarea>
            </div>
            <div class="mb-4">
              <input class="form-check-input" type="checkbox" id="agree"
                     style="border-width: thin;  border-color: black;background-color: lightgray"
                     v-model="volunteer.terms">
              <label class="form-check-label Checkbox" for="agree" style="color: rgb(128,128,128);">agree to terms
                and conditions</label>
            </div>

            <button type="submit" class="btn btn-primary">Register</button>
          </form>
        </div>


        <div class="col-5">
          <div class="card" style="width: 35rem;height: 30rem;">
            <img src="https://picsum.photos/1920/1080" class="card-img-top" alt="Can not display image">
            <!-- <div class="card-img-overlay">
                    <p class="card-text">Image cap</p>
                </div> -->
            <div class="card-body">
              <h5 class="card-title" style="color: rgb(128,128,128)"><strong>Become a volunteer!</strong></h5>
              <p class="card-text" style="color: rgb(128,128,128)">You time and talent can make a real different in people's life.</p>
            </div>
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