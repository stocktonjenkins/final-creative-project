/*global Vue*/
/*global axios*/
/*global swal*/

new Vue({
    el: "#photos",
    data: {
        photos: [],
    },
    methods: {
        async uploadPhoto() {
            try {
                
            } catch (error) {
                console.log(error);
            }
        },
        submittedSuccessful(firstName) {
            swal("Photo upload Complete!", "success");
        },
        async getPhotos() {
            try {
                let response = await axios.get("/api/photos");
                this.photos = response.data;
                console.log("reviews: ", this.reviews);
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        // this.getPhotos();
    }
});
