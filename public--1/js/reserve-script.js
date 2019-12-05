/*global Vue*/
/*global axios*/
/*global swal*/

new Vue({
    el: "#reserve",
    data: {
        attendee: {
            firstName: '',
            lastName: '',
            sizeOfParty: '',
            phone: '',
            message: ''    
        },
        attendees: [],
    },
    methods: {
        async submitRSVP() {
            console.log('attendee: ', this.attendee);
            try {
                let resposne = await axios.post("/api/attendees", {
                    firstName: this.attendee.firstName,
                    lastName: this.attendee.lastName,
                    partySize: this.attendee.sizeOfParty,
                    phone: this.attendee.phone,
                    message: this.attendee.message,
                });
                this.submittedSuccessful(this.attendee.firstName);
                this.attendee.firstName = "";
                this.attendee.lastName = "";
                this.attendee.partySize = "";
                this.attendee.phone = "";
                this.attendee.message = "";
            } catch (error) {
                console.log(error);
            }
        },
        submittedSuccessful(firstName) {
            swal("Success!", "We'll see you at Taco Tuesday, " +  firstName + "! 🌮", "success");
            document.getElementById('taco-form').reset();
        },
        async getAttendees() {
            try {
                let response = await axios.get("/api/attendees");
                this.attendees = response.data;
                console.log("attendees: ", this.attendees);
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getAttendees();
    }
});
