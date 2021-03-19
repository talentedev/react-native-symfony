<template>
    <div class="mg-top-space loading apollo" v-if="isLoadingList">
        Loading......
    </div>
    <div v-else class="mg-top-space">
        <div class="ambassador-content-header">
            <span class="badge badge-pill badge-primary">BUSINESS</span>
            <h2 class="header-title">Promotion list</h2>
            <p class="header-description">Approve,control and monitor promotions</p>
        </div>
        <!-- Error -->
        <div v-if="$apollo.queries.promotionList.error" class="error apollo">
            An error occured
        </div>
        <div v-else-if="total>0">
            <table class="table ambassador-table">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col" style="width:12%">Categorie</th>
                    <th scope="col">Caption</th>
                    <th scope="col">Target</th>
                    <th scope="col">Period</th>
                    <th scope="col">Budget</th>
                    <th scope="col" style="width:12%">Approval</th>
                </tr>
                </thead>
                <tbody v-for="(promotion,$index) in promotions">
               <!-- <td><img class="ambassador-logo" :src="businessAccount.profileImageUrl" v-if="businessAccount.profileImageUrl"></td>-->
                <tr>
                    <td>{{promotion.business.businessName}}</td>
                    <td>{{promotion.business.category.label}}</td>
                    <td>{{promotion.caption}}</td>
                    <td>{{promotion.targetNumber}} people</td>
                    <td>
                        {{promotion.period}}<br>
                        {{promotion.startDate|formatDate}}<span class="ambassador-modal subtitle" v-if="promotion.period"><b> to </b></span>{{promotion.endDate|formatDate}}
                        <br><span class="ambassador-error-text" v-if="isExpired(promotion)">EXPIRED</span>
                    </td>
                    <td>${{promotion.budget}}</td>
                    <td>
                        <span v-if="promotion.status==='pending'">
                            <button @click="updatePromotionStatus(promotion.uuid, 'approved', null,$index)" class="btn btn-default ambassador-state-btn"><i class="fa fa-check"></i></button>
                            <button @click="showRejectModal(promotion,$index)"  class="btn btn-default ambassador-state-btn"><i class="fa fa-times"></i></button>
                        </span>
                        <span v-if="promotion.status==='approved'" class="ambassador-status approved"><i class="fa fa-check"></i> Approved</span>
                        <span v-if="promotion.status==='refused' || promotion.status==='rejected'" class="ambassador-status rejected"><i class="fa fa-times"></i> Rejected</span>
                    </td>
                </tr>
               <tr class="subrow head">
                   <th>Promo image</th>
                   <th>Locations</th>
                   <th colspan="4">Description</th>
               </tr>
               <tr class="subrow body">
                   <td><a :href="promotion.promoImageUrl" target='_blank'><img class="ambassador-promotion-image" :src="promotion.promoImageUrl" v-if="promotion.promoImageUrl"></a></td>
                   <td><span v-for="location in promotion.businessLocations">
                       {{location.caption}},<br>
                   </span> </td>
                   <td colspan="4">{{promotion.description |wrapDescription}}<br><a href="" @click.prevent="showDescriptionModal(promotion)" class="promotion-link">Read more</a> </td>
                   <td>
                       <span v-if="promotion.status==='pending' && promotion.rejectedReason" class="ambassador-status rejected">{{"Previous rejected reason: " + promotion.rejectedReason}}</span>
                       <span v-if="(promotion.status==='refused' || promotion.status==='rejected') && promotion.rejectedReason" class="ambassador-status rejected">{{"Reason: " + promotion.rejectedReason}}</span>
                   </td>
               </tr>

                </tbody>
            </table>
            <span v-if="$apollo.queries.promotionList.loading && isLazyLoading">Loading more...</span>
        </div>
        <div v-else class="no-result apollo">
            <div class="col-4 table-list-container">
                No result...
            </div>
        </div>
        <b-modal ref="rejectPromotionModal" hide-footer>
            <template slot="modal-title">
                <h5 class="ambassador-modal title">Rejecting <span class="ambassador-modal subtitle" v-if="selectedPromotion && selectedPromotion.business">{{selectedPromotion.business.businessName}}</span></h5>
            </template>
            <div class="form-group">
                <label class="ambassador-modal label-subtitle">Please provide a reason for rejecting the promotion</label>
                <textarea class="form-control" rows="3" v-model="rejectReason" ></textarea>
            </div>
            <button class="btn btn-danger ambassador-modal-btn reject"  @click="rejectPromotion(selectedPromotion)" :disabled="!this.rejectReason"> Reject promotion</button>
            <button class="btn btn-default ambassador-modal-btn cancel"  @click="hideRejectModal"> Cancel</button>

        </b-modal>

        <b-modal ref="promotionDescriptionModal" hide-footer>
            <template slot="modal-title">
                <h5 class="ambassador-modal title"><span v-if="selectedPromotion && selectedPromotion.business">{{selectedPromotion.business.businessName}}</span><span class="ambassador-modal subtitle">  Description</span></h5>
            </template>
            <div>
               {{selectedPromotion.description}}
            </div>
            <!--<button class="btn btn-default ambassador-modal-btn"  @click="hideDescriptionModal"> Close</button>-->

        </b-modal>
    </div>

</template>

<script>
    import bPagination from 'bootstrap-vue/es/components/pagination/pagination';
    import bModal from 'bootstrap-vue/es/components/modal/modal';
    import moment from 'moment' ;

    export default {
        components: {bPagination, bModal},
        name: 'promotionList',
        data(){
          return {
              promotions : [],
              total: "",
              pageSize : 4,
              currentPage : 1,
              isLoading: false,
              isLoadingList:false,
              selectedPromotion:'',
              modalTitle:'',
              rejectReason:null,
              shouldLoadDataOnScroll:false,
              selectedIndex:null,
              shouldAppendList:true,
              isLazyLoading : false,
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
            isExpired(selectedPromotion){
                if(selectedPromotion.endDate !==null){
                    let endDate = moment(selectedPromotion.endDate);
                    return moment().isAfter(endDate);
                }
                return false;
            },
            showDescriptionModal(selectedPromotion) {
                this.selectedPromotion = selectedPromotion;
                this.$refs.promotionDescriptionModal.show();
            },
            hideDescriptionModal() {
                this.$refs.promotionDescriptionModal.hide()
            },
            showRejectModal(selectedPromotion,$index) {
                this.selectedIndex = $index ;
                this.selectedPromotion = selectedPromotion;
                this.rejectReason=null;
                this.$refs.rejectPromotionModal.show();
            },
            hideRejectModal() {
                this.$refs.rejectPromotionModal.hide() ;
                this.selectedIndex=null;
            },
            rejectPromotion(selectedPromotion){
                if(this.rejectReason && this.rejectReason.length>0){
                    this.updatePromotionStatus(selectedPromotion.uuid,'rejected',this.rejectReason, this.selectedIndex)
                }
                else {
                    this.$toastr.e('Reject reason can not be empty.');
                }
            },
            updatePromotionStatus(uuid, status, rejectReason,order){
                this.shouldAppendList = false;
                this.$apollo.mutate({
                    mutation: require('../graphql/updatePromotionStatus.gql'),
                    variables: {
                        uuid: uuid,
                        status: status,
                        rejectReason: rejectReason,
                    },
                }).then(result => {
                    this.isLoading = false;
                    this.$toastr.s('Promotion '+ status);
                    if(order !=null){
                        this.promotions[order].status = status;
                        this.promotions[order].rejectedReason = rejectReason;
                        this.hideRejectModal();
                    }
                    //this.$apollo.queries.promotionList.refetch();
                    this.hideRejectModal()
                }).catch(err => {
                    this.isLoading = false;
                    this.$toastr.e("Unable to update promotion "+err );
                });
            },
        },
        computed: {
        },
        // Apollo-specific options
        apollo: {
            promotionList: {
                // GraphQL Query
                query: require('../graphql/getAllPromotion.gql'),
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
                    if(this.promotions.length <=0){
                        this.isLoadingList = loading
                        this.total = data.allPromotions?data.allPromotions.count:0;
                        this.promotions = data.allPromotions?data.allPromotions.items:null
                    }
                    else {
                        this.isLazyLoading = true;
                        //Avoid append on status update
                        if(this.shouldAppendList){
                            this.promotions.push(...data.allPromotions.items) ;
                        }
                    }
                    if(this.promotions.length < this.total){
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
                return value?moment(value).format('YYYY-MM-DD'):'';
            },

            formatDateTime : function (value) {
                return moment(value).format('YYYY-MM-DD  HH:mm:ss');
            },
            wrapDescription : function (value) {
                return value.substr(0,200);

            }
        }
    }
</script>
