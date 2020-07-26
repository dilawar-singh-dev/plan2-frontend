<template>
    <base-nav class="navbar-top navbar-dark position-relative"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <div class="form-group mb-0">
                <base-input placeholder="Search"
                            class="input-group-alternative"
                            alternative=""
                            addon-right-icon="fas fa-search">
                </base-input>
            </div>
        </form>
        <ul class="navbar-nav align-items-center d-none d-md-flex">
            <li class="nav-item dropdown">
                <base-dropdown class="nav-link pr-0">
                    <div class="media align-items-center" slot="title">
                <span class="avatar avatar-sm rounded-circle">
                  <img alt="Image placeholder" src="img/theme/team-1-800x800.jpg">
                </span>
                        <div class="media-body ml-2 d-none d-lg-block">
                            <span class="mb-0 text-sm  font-weight-bold">{{ user.name }}</span>
                        </div>
                        
                    </div>

                    <template>
                        <router-link to="/" class="dropdown-item">
                            <i class="ni ni-settings-gear-65"></i>
                            <span>Settings</span>
                        </router-link>
                        <div class="dropdown-divider"></div>
                        <span
                         @click="logout()" class="dropdown-item cursor-pointer ">
                            <i class="ni ni-user-run text-danger"></i>
                            <span class="text-danger">Logout</span>
                        </span>
                    </template>
                </base-dropdown>
            </li>
        </ul>
    </base-nav>
</template>
<script>
const axios = require('axios');
  export default {
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchQuery: '',
        user: {}
      };
    },
    methods: {
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      },
        getAuthUser() {
              
                var token = localStorage.getItem('authToken');
                axios.get('user', {
                        headers: {
                            Authorization: 'Bearer ' + token
                        }
                    }).then(
                        response => {
                            this.user = response.data;
                            console.log(this.user)
                        })
                    .catch(e => {
                        // MODAL BOX
                        this.$confirm({
                            message: e.response.data.statusMessage,
                            button: {
                                no: 'Close',
                                // yes: 'Yes'
                            },
                            /**
                             * Callback Function
                             * @param {Boolean} confirm 
                             */
                            callback: confirm => {
                                if (confirm) {
                                    // ... do something
                                }
                            }

                        })
                    });
            },
      logout(){
        localStorage.removeItem("authToken");
         this.$router.push({
            name: 'login'
        });
      }
    },
    mounted(){
      this.getAuthUser();
    }
  };
</script>
