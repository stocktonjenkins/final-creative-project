/*global Vue*/
/*global axios*/
/*global moment*/
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
        totalAttendance: 0,
        nextTuesday: '',
    },
    methods: {
        async submitRSVP() {
            if (this.isNullOrEmpty(this.attendee.firstName) ||
                this.isNullOrEmpty(this.attendee.lastName) ||
                this.isNullOrEmpty(this.attendee.sizeOfParty)) {
                this.failedSubmission();
                return false;
            }
            console.log('attendee: ', this.attendee);
            try {
                let response = await axios.post("/api/attendees", {
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
            }
            catch (error) {
                console.log(error);
            }
        },
        submittedSuccessful(firstName) {
            swal("Success!", "We'll see you on " + this.nextTuesday + " at Taco Tuesday, " + firstName + "! 🌮", "success");
            document.getElementById('taco-form').reset();
        },
        failedSubmission() {
            swal("Submission Incomplete!", "Your form was not complete. Please try again.", "warning");
            document.getElementById('taco-form').reset();
        },
        async getAttendees() {
            try {
                let response = await axios.get("/api/attendees");
                this.attendees = response.data;
                this.setTotalAttendance();
                console.log("attendees: ", this.attendees);
            }
            catch (error) {
                console.log(error);
            }
        },
        setTotalAttendance() {
            this.attendees.forEach(attendee => {
                this.totalAttendance += attendee.partySize;
            });
        },
        isNullOrEmpty(input) {
            return input == "" || input == null;
        },
        findNextTuesday() {
            const tuesday = 2; // for Thursday
            const today = moment().isoWeekday();

            // if we haven't yet passed the day of the week that I need:
            if (today <= tuesday) {
                // then just give me this week's instance of that day
                this.nextTuesday = moment().isoWeekday(tuesday).format("MMM Do YY");
            }
            else {
                // otherwise, give me *next week's* instance of that same day
                this.nextTuesday =  moment().add(1, 'weeks').isoWeekday(tuesday).format("MMM Do YY");
            }
            
        }
    },
    created() {
        this.getAttendees();
        this.findNextTuesday();
    }
});
