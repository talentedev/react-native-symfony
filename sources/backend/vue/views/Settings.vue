<template>
    <div class="mg-top-space">
        <div class="card">
            <div class="card-header">
                Update Password
            </div>
            <div class="card-body">
                <div class="row m-3">
                    <div class="col-3">
                        Old password
                    </div>
                    <div class="col-5">
                        <input required type="password" class="form-control" v-model="oldPasswordInput">
                    </div>
                </div>
                <div class="row m-3">
                    <div class="col-3">
                        New password
                    </div>
                    <div class="col-5">
                        <input required type="password" class="form-control" v-model="passwordInput1">
                    </div>
                </div>
                <div class="row m-3">
                    <div class="col-3">
                        Retype new password
                    </div>
                    <div class="col-5">
                        <input required type="password" class="form-control" v-model="passwordInput2">
                    </div>
                </div>
                <div class="col-12 mg-bottom-space">
                    <button class="btn btn-primary pull-right"
                            :disabled="this.oldPasswordInput === '' || this.passwordInput1 === '' || this.passwordInput2 === '' || this.passwordInput1 !== this.passwordInput2"
                            @click="save">
                        <i class="fa fa-save"></i> save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import ClientsAPI from '../api/clients';
  export default {
    name: 'settings',
    methods : {
      save () {
        if (this.passwordInput1 !== this.passwordInput2) {
          this.$toastr.e('Passwords do not match.');
          return
        }
        ClientsAPI.updatePassword(this.oldPasswordInput, this.passwordInput1)
          .then(res => {
            this.$toastr.s('Password updated successfully');
            this.$router.push('/backoffice/accounts');
          })
          .catch(err => {
            const keyify = (obj, prefix = '') =>
              Object.keys(obj).reduce((res, el) => {
                if( Array.isArray(obj[el]) ) {
                  return res;
                } else if( typeof obj[el] === 'object' && obj[el] !== null ) {
                  return [...res, ...keyify(obj[el], prefix + el + '.')];
                } else {
                  return [...res, prefix + el];
                }
              }, []);
            this.$toastr.e('Unable to update password: ' + err.response.data.error);
            console.log(keyify(err))
          });
      }
    },
    computed: {
    },
    data() {
      return {
        oldPasswordInput : "",
        passwordInput1 : "",
        passwordInput2 : "",
        isDisabled: true,
      }
    },
  }
</script>
