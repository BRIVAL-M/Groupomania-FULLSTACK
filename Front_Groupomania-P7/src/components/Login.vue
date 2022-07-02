
<script>

function logUser(email, password) {

  const url = 'http://localhost:8080/api/auth/login';
  console.log(url);

  console.log({ email, password });//---------------------------------A delete !
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => response.json())
    .then((res) => {

      if (res.error) {//_____________________________________ Les erreurs de user.js dans le back
        console.log(res.error);
        alert(res.error);

        return;
      }
      if (res.errors) {//______________________________________ Les erreurs de validator.js dans le back
        const findMsg = res.errors.find(function (element) {
          return element.msg
        });
        if (findMsg) {
          console.log(findMsg.msg);
          alert(findMsg.msg);
          return;
        }
      }
      else {
        
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.userId);
        localStorage.setItem('email', email);
        
        this.$router.push("/news");
      }
      console.log(res);
    })
    .catch(error => {

      console.log(error);

    });
}

import "bootstrap/dist/css/bootstrap.min.css";

import "/App.css";
export default {
  name: "Login", data,
  methods: {
    logUser,
  }
};

function data() {

  return {
    email: "",
    password: "",
    error: this.error,
    //isAdmin: "",
  }

}

</script>
<template>

  <div class="container-fluid">
    <div class="row no-gutter">

      <div class="col-md-6 d-none d-md-flex bg-image"></div>



      <div class="col-md-6 bg-light">
        <div class="login d-flex align-items-center py-5">


          <div class="container">
            <div class="row">
              <div class="col-lg-10 col-xl-7 mx-auto">
                <h3 class="display-4 text-center">Groupomania</h3>
                <p class="text-muted mb-4 text-center">Restez connecté à l'entreprise même durant vos congés !</p>
                <form>
                  <div class="mb-3">
                    <input id="inputEmail" type="email" placeholder="Email address" required="required" autofocus=""
                      class="form-control rounded-pill border-0 shadow-sm px-4" v-model="email" />
                    <!-- <small v-if="this.errors" class="text-danger">{{findMsg.msg}}</small> -->
                    <!--afficher les erreurs de validator.js dans le back-->




                  </div>
                  <div class="mb-3">
                    <input id="inputPassword" type="password" placeholder="Password" required=""
                      class="form-control rounded-pill border-0 shadow-sm px-4 text-danger" v-model="password" />
                    <!-- <small  v-if="v$.password.$error">{{v$.password.$errors[0].$message}}</small> -->







                  </div>
                  <!-- <div class="form-check">
                                            <input id="customCheck1" type="checkbox" checked class="form-check-input" />
                                            <label for="customCheck1" class="form-check-label">Remember password</label>
                                        </div> -->
                  <div class="d-grid gap-2 mt-2">
                    <button type="submit" class="btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                      @click.prevent="logUser(email, password)">Connexion</button>
                  <router-link to="/signup" class="btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm">Je n'ai pas de compte !</router-link>


                  </div>

                 
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>

</template>  

<style>
</style>