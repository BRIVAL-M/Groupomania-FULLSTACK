 <script>
import "bootstrap/dist/css/bootstrap.min.css";
import "/App.css";




 function signUser(name,email,password) {
     //
      const url = 'http://localhost:8080/api/auth/signup';
     console.log(url);
        console.log({name,email, password});//---------------------------------A delete !
        fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email, password})
      })
        .then(response => response.json()) // sert à convertir la réponse en json

         ///////////////////////////////////////////////////////////recupérer le token

         
        .catch(error => { console.log(error);
          });
          localStorage.setItem('UserName', name); 
        this.$router.push("/login");

 }

export default {
  name: "Signup", 
    methods :{
        signUser,
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
                                    <p class="text-muted mb-4 text-center">Restez connecté à l'entreprise même durant vos congés ! </p>
                                    <form>
                                         <div class="mb-3">
                                            <input id="inputName" type="text" placeholder="Name" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4"  v-model="name"/>
                                        </div>
                                       <!-- <div class="mb-3">
                                            <input id="inputJob" type="job" placeholder="Job title" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" />
                                        </div> -->
                                        <div class="mb-3">
                                            <input id="inputEmail" type="email" placeholder="Email address" required="" autofocus="" class="form-control rounded-pill border-0 shadow-sm px-4" v-model="email" />
                                        </div>
                                        <div class="mb-3">
                                            <input id="inputPassword" type="password" placeholder="Password" required="" class="form-control rounded-pill border-0 shadow-sm px-4 text-danger" v-model="password" />
                                        </div>
                                        <!-- <div class="form-check">
                                            <input id="customCheck1" type="checkbox" checked class="form-check-input" />
                                            <label for="customCheck1" class="form-check-label">Remember password</label>
                                        </div> -->
                                        <div class="d-grid gap-2 mt-2">
                                        <button type="submit" class="btn btn-danger btn-block text-uppercase mb-2 rounded-pill shadow-sm" @click.prevent="signUser(name,email, password)">Sign in</button>
                                        </div>
                                        
                                        <div class="text-center d-flex justify-content-between mt-4"><p>Vous avez déjà un compte ? <router-link to = "/login">LOGIN</router-link></p></div>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

</template>  