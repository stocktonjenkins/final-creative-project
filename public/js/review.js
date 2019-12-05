/*global Vue*/
/*global axios*/
/*global swal*/

new Vue({
    el: "#review",
    data: {
        reviewer: {
            review: '',
            firstName: '',
            lastName: ''
        },
        reviews: [],
    },
    methods: {
        async submitReview() {
            if(this.isNullOrEmpty(this.reviewer.review) ||
               this.isNullOrEmpty(this.reviewer.firstName) ||
               this.isNullOrEmpty(this.reviewer.lastName)) {
                   this.failedSubmission();
                   return false;
               }
            console.log('review: ', this.reviewer);
            try {
                let response = await axios.post("/api/reviews", {
                    review: this.reviewer.review,
                    firstName: this.reviewer.firstName,
                    lastName: this.reviewer.lastName,
                });
                this.submittedSuccessful(this.reviewer.firstName);
                this.reviewer.firstName = "";
                this.reviewer.lastName = "";
                this.reviewer.review = "";
            } catch (error) {
                console.log(error);
            }
        },
        submittedSuccessful(firstName) {
            swal("Submission Complete!", "Thank you, " +  firstName + ", for your Review!", "success");
            document.getElementById('review-form').reset();
        },
        failedSubmission() {
            swal("Submission Incomplete!", "Your form was not complete. Please try again.", "warning");
            document.getElementById('review-form').reset();
        },
        async getReviews() {
            try {
                let response = await axios.get("/api/reviews");
                this.reviews = response.data;
                console.log("reviews: ", this.reviews);
            } catch (error) {
                console.log(error);
            }
        },
        isNullOrEmpty(input) {
            return input == "" || input == null;
        }
    },
    created() {
        this.getReviews();
    }
});
