/*global Vue*/
/*global axios*/
/*global swal*/

new Vue({
    el: "#admin",
    data: {
        reviews: [],
        rsvps: [],
    },
    methods: {
        async clearReviews() {
            console.log('called clearReviews');
            this.reviews.forEach(review => {
                try {
                    let response = axios.delete("/api/reviews/" + review._id);

                }
                catch (error) {
                    console.log(error);
                    return;
                }
            });
            this.clearedSuccessful("Reviews");
        },
        clearedSuccessful(eraseType) {
            swal("Successfully cleared!", "Cleared " + eraseType , "success");
        },
        async clearRSVP() {
            this.rsvps.forEach(rsvp => {
                try {
                    let response = axios.delete("/api/attendees/" + rsvp._id);
                }
                catch (error) {
                    console.log(error);
                    return;
                }
            });
            this.clearedSuccessful("RSVP");
        },
        async getReviews() {
            try {
                let response = await axios.get("/api/reviews");
                this.reviews = response.data;
                console.log('current reviews: ', this.reviews);
            }
            catch (error) {
                console.log(error);
            }
        },
        async getAttendees() {
            try {
                let response = await axios.get("/api/attendees");
                this.rsvps = response.data;
                console.log("current attendees: ", this.rsvps);
            }
            catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getReviews();
        this.getAttendees();
    }
});
