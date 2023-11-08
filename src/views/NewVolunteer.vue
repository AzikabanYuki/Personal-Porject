<script setup>
import {ref, onMounted, computed} from 'vue'
import {useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const search_value = ref("");
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
const getInfor = async function () {
  // get the booking from the backend
  loading.value = true;
  const response = await fetch('/api/get_volunteer/' + route.params.id);
  loading.value = false;
  // convert the response to json
  const json = await response.json();
  // set the booking
  volunteer.value = {...json};
}

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
const deleteVolunteer = async function () {
  // post the booking to the backend
  loading.value = true;
  const response = await fetch('/api/delete_volunteer/' + volunteer.value._id, {
    method: 'DELETE'
  });
  // convert the response to json
  const json = await response.json();
  // alert the user
  loading.value = false;
  alert(JSON.stringify(json));
  // redirect to the home page
  await router.push('/');
}
onMounted(async () => {
  // if there is an id in the route
  if (route.params.id) {
    await getInfor();
  }
});
</script>
<style scoped>
.VolunteerPage {
  font-weight: normal;
  font-size: medium;
  margin-top: 0.4rem;
}
.scrollable-content {
  max-height: 100vh; /* Adjust the maximum height as needed */
  overflow-y: auto;
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
              <a class="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/event">Events</a>
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
    <div class="row">
      <div class="col-11 ms-5">
          <span class="badge text-bg-light mt-4">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item VolunteerPage"><a href="/"
                                                                     style="text-decoration: none;">Home</a></li>
                      <li class="breadcrumb-item VolunteerPage"><a href="/volunteers" style="text-decoration: none;">Volunteers</a></li>

                        <li class="breadcrumb-item VolunteerPage active" aria-current="page">Edit</li>
                    </ol>
                </nav>
            </span>
        <button type="button" class="btn btn-danger mt-4" v-if="route.name === 'edit_volunteer' & loading===false" v-on:click="deleteVolunteer"
                style="float: right">Delete
        </button>

      </div>


    </div>
    <div class="d-flex justify-content-center" v-if="loading!==false">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="row" v-if="loading===false">
      <div class="col-5 ms-5">
        <form @submit.prevent="Submit">
          <div class="my-4">
            <label for="Email" class="form-label">Email</label>
            <input type="email" class="form-control" name="Email" id="Email" style="border-width: 2px"
                   v-model="volunteer.Email" required>
          </div>
          <div class="mb-4">
            <label for="Password" class="form-label">Password</label>
            <input type="password" class="form-control" name="Password" id="Password" v-model="volunteer.Password"
                   style="border-width: 2px"
                   required>
          </div>
          <div class="mb-4">
            <label for="Name" class="form-label">Name</label>
            <input type="text" class="form-control" id="Name" name="Name" v-model="volunteer.Name"
                   style="border-width: 2px" required>
          </div>
          <div class="mb-4">
            <label for="Contact" class="form-label">Contact</label>
            <input type="text" class="form-control" id="Contact" name="Contact" v-model="volunteer.Contact"
                   style="border-width: 2px">
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
          <button type="submit" class="btn btn-primary">Save</button>
        </form>
      </div>
    </div>
  </section>

</template>