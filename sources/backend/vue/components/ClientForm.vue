<template>
    <div class="mg-top-space">
        <div class="card">
            <div class="card-header">
                Client page
            </div>
            <div class="card-body">
                <div class="row m-5">
                    <div class="col-3">
                        Client ID
                    </div>
                    <div class="col-3">
                        <input type="text" :disabled="isEdit" class="form-control" v-model="clientId">
                    </div>
                    <div class="col-3">
                        Creation Date
                    </div>
                    <div class="col-3">
                        <input required disabled type="text" class="form-control" v-model="creationDate">
                    </div>
                </div>
                <div class="row m-5">
                    <div class="col-3">
                        WeChat ID
                    </div>
                    <div class="col-3">
                        <input required :disabled="isEdit" type="text" class="form-control" v-model="wechatId">
                    </div>
                    <div class="col-3">
                        Points
                    </div>
                    <div class="col-3">
                        <input type="number" class="form-control" v-model="points">
                    </div>
                </div>
                <div class="row m-5">
                    <div class="col-3">
                        Passport ID
                    </div>
                    <div class="col-3">
                        <input type="text"  class="form-control" v-model="passportId">
                    </div>
                    <div class="col-3">
                        Civility
                    </div>
                    <div class="col-3">
                        <select class="form-control" v-model="civility">
                            <option>M</option>
                            <option>F</option>
                        </select>
                    </div>
                </div>
                <input type="hidden" v-model="getClient.id">
                <div class="row m-5">
                    <div class="col-3">
                        First Name
                    </div>
                    <div class="col-3">
                        <input type="text" class="form-control" v-model="firstName">
                    </div>
                    <div class="col-3">
                        Last Name
                    </div>
                    <div class="col-3">
                        <input type="text" class="form-control" v-model="lastName">
                    </div>
                </div>
                <div class="row m-5">
                    <div class="col-3">
                        Bithdate
                    </div>
                    <div class="col-3">
                        <date-picker v-model="birthDate" :config="options"></date-picker>
                    </div>
                    <div class="col-3">
                        Phone Number
                    </div>
                    <div class="col-3">
                        <input type="text" class="form-control" v-model="phoneNumber">
                    </div>
                </div>
                <div class="row m-5">
                    <div class="col-3">
                        Email
                    </div>
                    <div class="col-3">
                        <input type="text" class="form-control" v-model="email">
                    </div>
                </div>
                <div class="col-12 mg-bottom-space">
                    <button class="btn btn-warning" :hidden="isLoading" @click="cancel"><i class="fa fa-times"></i> cancel</button>
                    <button class="btn btn-primary pull-right" :disabled="isLoading" @click="save"><i class="fa fa-save"></i> save</button>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import ClientsAPI from '../api/clients';
    import moment from 'moment';
    import { validationMixin } from 'vuelidate'
    import { required } from 'vuelidate/lib/validators'
    import 'bootstrap/dist/css/bootstrap.css';
    import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';
    import datePicker from 'vue-bootstrap-datetimepicker';

    export default {
        name: 'ClientForm',
        props: ['client'],
        mixins: [validationMixin],
        validations: {
            clientId: { required },
            creationDate: {required},
            wechatId: {required},
        },
        components: {datePicker},
        data() {
            return {
                id: null,
                clientId: this.getClient ? this.getClient.clientId : '',
                options: {
                    format: 'YYYY-MM-DD',
                    useCurrent: true,
                },
                creationDate: '',
                wechatId: '',
                points: '',
                passportId: '',
                civility: '',
                firstName:'',
                lastName: '',
                birthDate: '',
                phoneNumber: '',
                email: '',

                isLoading: false,
            }
        },
        computed: {
            error () {
                return this.$store.getters['clients/error'];
            },
            isEdit(){
                return this.client?true:false;
            },
            getClient: {
                get: function () {
                    let client =  this.client ? this.client : {} ;
                    this.creationDate = this.client&&this.client.creationDate?moment(this.client.creationDate).format('YYYY-MM-DD  HH:mm:ss') : new moment().format('YYYY-MM-DD  HH:mm:ss') ;
                    this.clientId = this.client ? this.client.clientId : '';
                    this.wechatId = this.client ? this.client.wechatId: '';
                    this.points = this.client ? this.client.points: '';
                    this.passportId = this.client ? this.client.passportId: '';
                    this.civility = this.client ? this.client.civility:'M';
                    this.firstName = this.client ? this.client.firstname: '';
                    this.lastName = this.client ? this.client.lastname: '';
                    this.birthDate = this.client ? this.client.birthDate:new moment().format('YYYY-MM-DD');
                    this.email = this.client ? this.client.email: '';
                    this.phoneNumber = this.client ? this.client.phoneNumber: '';
                    return client ;
                },
                set: function (value) {
                    this.client = value ;
                }
            }
        },
        created(){
        },
        methods: {
            checkValidation() {
                let errors = [];

                this.$v.$touch();
                if (this.$v.$invalid) {
                    if (this.$v.clientId.$error) {
                        errors.push('Client ID is required')
                    }
                    if (this.$v.creationDate.$error) {
                        errors.push('Creation date required')
                    }
                    if (this.$v.wechatId.$error) {
                        errors.push('weChat ID is required')
                    }
                }
                if (!(Number(this.points)>=0 ||Number(this.points)<0)) {
                    errors.push('Points must be a number')
                }
                let isValid = errors.length === 0;
                errors.forEach(error => {
                    this.$notify({
                        group: 'default',
                        title: 'Error',
                        text: error,
                        type: 'error',
                    })
                });

                return isValid
            },
            save() {
                this.isLoading = true;
                if (!this.checkValidation()) {
                    return;
                }
                let client = {
                    id : this.getClient?this.getClient.id:null,
                    clientId : this.clientId,
                    wechatId : this.wechatId,
                    points : this.points,
                    passportId : this.passportId,
                    civility : this.civility,
                    firstName : this.firstName,
                    lastName : this.lastName,
                    birthDate :this.birthDate,
                    email : this.email,
                    phoneNumber : this.phoneNumber
                } ;
                ClientsAPI.saveClient(client)
                    .then(res => {
                        this.$notify({
                            group: 'default',
                            title: 'Success',
                            text: "Client saved successfully",
                            type: 'success',
                        }) ;
                        this.$router.push('/backoffice/clients');
                    })
                    .catch(err => {
                        this.$notify({
                            group: 'default',
                            title: 'Error',
                            text: 'Unable to save changes </br>'+err,
                            type: 'error',
                        });
                        console.log(err)
                    });
            },
            cancel() {
                this.$notify({
                    group: 'default',
                    title: 'Canceled',
                    text: 'Save was canceled',
                    type: 'primary',
                });
                this.$router.push('/backoffice/clients');
            }
        },
    }
</script>