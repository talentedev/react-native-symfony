<template>
    <div class="mg-top-space loading apollo" v-if="isLoading">
        Loading......
    </div>
    <div v-else class="mg-top-space">
        <div class="ambassador-content-header">
            <span class="badge badge-pill badge-primary">BUSINESS</span>
            <h2 class="header-title">Account management</h2>
            <p class="header-description">Control and monitor busines accounts</p>
        </div>
        <!-- Error -->
        <div v-if="$apollo.queries.businessAccounts.error" class="error apollo">
            An error occured
        </div>
        <div v-else-if="businessAccounts.length>0" class="table-responsive ambassador-result-table">
            <table class="table table-fixed">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Category & sub</th>
                    <th scope="col">Logo</th>
                    <th scope="col">Email</th>
                    <th scope="col">Links</th>
                    <th scope="col" style="width:12%">Approval</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(businessAccount, $index) in businessAccounts">
                    <td>{{businessAccount.businessName}}</td>
                    <td>@{{businessAccount.userName}}</td>
                    <td>{{businessAccount.category.label}}<br>-{{businessAccount.subCategory.label}}</td>
                    <td><a :href="businessAccount.profileImageUrl" target='_blank'><img class="business-logo" :src="businessAccount.profileImageUrl" v-if="businessAccount.profileImageUrl"></a></td>
                    <td>{{businessAccount.email}}</td>
                    <td>
                        <a class="business-icon-link" :href="businessAccount.facebookUrl" target="_blank"><i class="fa fa-facebook-square"></i></a>
                        <a class="business-icon-link" :href="'https://www.instagram.com/'+businessAccount.instagramId" target="_blank"><i class="fa fa-instagram"></i></a>
                        <a class="business-icon-link" :href="businessAccount.websiteUrl" target="_blank"><i class="fa fa-globe"></i></a>
                    </td>
                    <td>
                        <span v-if="businessAccount.status==='pending'">
                            <button @click="updateBusinessStatus(businessAccount.id, 'approved', null, $index)" class="btn btn-default ambassador-state-btn"><i class="fa fa-check"></i></button>
                            <button @click="showRejectModal(businessAccount, $index)"  class="btn btn-default ambassador-state-btn"><i class="fa fa-times"></i></button>
                            <span v-if="businessAccount.rejectedReason" class="ambassador-status rejected"><br />{{"Previous rejected reason: " + businessAccount.rejectedReason}}</span>
                        </span>
                        <span v-if="businessAccount.status==='approved'" class="ambassador-status approved"><i class="fa fa-check"></i> Approved</span>
                        <span v-if="(businessAccount.status ==='refused' || businessAccount.status==='rejected')" class="ambassador-status rejected">
                            <i class="fa fa-times"></i> Rejected
                            <span v-if="businessAccount.rejectedReason" class="ambassador-status rejected"><br />{{"Reason: " + businessAccount.rejectedReason}}</span>
                        </span>
                    </td>
                </tr>
                <span v-if="$apollo.queries.businessAccounts.loading && isLazyLoading">Loading more...</span>
                </tbody>
            </table>

        </div>
        <div v-else class="no-result apollo">
            <div class="col-4 table-list-container">
                No result...
            </div>
        </div>
        <b-modal ref="rejectAccountModal" hide-footer>
            <template slot="modal-title">
                <h5 class="ambassador-modal title">Rejecting <span class="ambassador-modal subtitle">{{selectedAccount.businessName}}</span></h5>
            </template>
            <div class="form-group">
                <label class="ambassador-modal label-subtitle">Please provide a reason for rejecting the business account</label>
                <textarea class="form-control" rows="3" v-model="rejectReason" ></textarea>
            </div>
            <button class="btn btn-danger ambassador-modal-btn reject"  @click="rejectBusinessAccount(selectedAccount)" :disabled="!this.rejectReason"> Reject account</button>
            <button class="btn btn-default ambassador-modal-btn cancel"  @click="hideRejectModal"> Cancel</button>

        </b-modal>
    </div>

</template>

<script>
    import bPagination from 'bootstrap-vue/es/components/pagination/pagination';
    import bModal from 'bootstrap-vue/es/components/modal/modal';
    import moment from 'moment' ;
    export default {
        components: {bPagination, bModal},
        name: 'businessAccounts',
        data(){
          return {
              businessAccounts : [],
              total: 0,
              pageSize : 15,
              currentPage : 1,
              isLoading: false,
              isLazyLoading : false,
              selectedAccount:'',
              modalTitle:'',
              rejectReason:null,
              shouldLoadDataOnScroll:false,
              selectedIndex:null,
              shouldAppendList:true,
          }
        },
        created(){
            window.scroll(0, 0);
            window.addEventListener('scroll', this.onScrool);
        },
        methods : {
            onScrool(){
                let bottomOfWindow = (document.documentElement.scrollTop + window.innerHeight) - document.documentElement.offsetHeight ;
                if(this.shouldLoadDataOnScroll && Math.abs(bottomOfWindow) <=2){
                    this.shouldLoadDataOnScroll=false ;
                    this.currentPage++ ;
                }
            },
            showRejectModal(selectedAccount, $index) {
                this.selectedAccount = selectedAccount;
                this.selectedIndex = $index ;
                this.rejectReason=null;
                this.$refs.rejectAccountModal.show();
            },
            hideRejectModal() {
                this.$refs.rejectAccountModal.hide() ;
                this.selectedIndex=null;
            },
            rejectBusinessAccount(selectedAccount){
                if(this.rejectReason && this.rejectReason.length>0){
                    this.updateBusinessStatus(selectedAccount.id,'rejected',this.rejectReason,this.selectedIndex )
                }
                else {
                    this.$toastr.e('Reject reason can not be empty.');
                }
            },
            updateBusinessStatus(id, status, rejectReason, order){
                this.shouldAppendList = false;
                this.$apollo.mutate({
                    mutation: require('../graphql/updateBusinessStatus.gql'),
                    variables: {
                        id: id,
                        status: status,
                        rejectReason: rejectReason,
                    },
                }).then(result => {
                    this.isLoading = false;
                    this.$toastr.s('Business '+ status);
                    if(order !=null){
                        this.businessAccounts[order].status = status;
                        this.businessAccounts[order].rejectedReason = rejectReason;
                        this.hideRejectModal();
                    }
                    //this.$apollo.queries.businessAccounts.refetch();
                }).catch(err => {
                    this.isLoading = false;
                    this.$toastr.e("Unable to update business "+err );
                });
            },
        },
        computed: {
        },
        // Apollo-specific options
        apollo: {
            businessAccounts: {
                // GraphQL Query
                query: require('../graphql/getAllBusiness.gql'),
                // Additional options here
                fetchPolicy: 'network-only',
                // Reactive parameters
                variables() {
                    // Use vue reactive properties here
                    return {
                        limit: this.pageSize,
                        offset: (this.currentPage - 1) * (this.pageSize),
                    }
                },
                // Optional result hook
                result ({ data, loading, networkStatus }) {
                    if(this.businessAccounts.length <=0){
                        this.isLoading = loading;
                        this.total = data.allBusiness.count ;
                        this.businessAccounts = data.allBusiness.items
                    }
                    else {
                        this.isLazyLoading = true;
                        //Avoid append on status update
                       if(this.shouldAppendList){
                           this.businessAccounts.push(...data.allBusiness.items) ;
                       }
                    }
                    if(this.businessAccounts.length < this.total){
                        this.shouldLoadDataOnScroll=true;
                    }

                },
                // Error handling
                error (error) {
                    console.error('We\'ve got an error!', error)
                },
            },
        },
        filters : {
            formatDate : function (value) {
                return moment(value).format('YYYY-MM-DD');
            },

            formatDateTime : function (value) {
                return moment(value).format('YYYY-MM-DD  HH:mm:ss');
            }
        }
    }
</script>
