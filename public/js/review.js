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
            swal("Thank you, " +  firstName + " for your Review!");
            document.getElementById('review-form').reset();
        },
        async getReviews() {
            try {
                let response = await axios.get("/api/reviews");
                this.reviews = response.data;
                console.log("attendees: ", this.attendees);
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getReviews();
    }
});
