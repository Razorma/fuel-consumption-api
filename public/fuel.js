document.addEventListener('alpine:init', () => {
    
Alpine.data('appData', () => {
    return {
        //initialize data for vehicle infomation
        vehicles: [],
        empty:0,
        newVehicle: {
          description: '',
          regNumber: ''
        },
        refuelData: {
            vehicleId: '',
            liters: '',
            amount: '',
            distance: '',
            filledUp: false
          },
          error:"",
        //create a function to add the vehicle
        addVehicle() {
         //get the vehicles endpoint
            axios.post('http://localhost:3000/api/vehicle', this.newVehicle)
              .then(response => {
              //if there is an error send it to the error message variable
                if(response.data.status==='error'){
                    this.error = response.data.message
                    setTimeout(()=>{
                        this.error =""
                    },3000)
                }
                
                // Clear the form fields
                this.newVehicle.description = '';
                this.newVehicle.regNumber = '';
              })
              .catch(error => {
              //if there is an error send it to the error message variable
                this.error = error.message
              });
          },
          //create a function to record the fuel
          recordRefuel() {
            console.log(this.refuelData)
            //get the record fuel endpoint
            axios.post('http://localhost:3000/api/refuel', this.refuelData)
              .then(response => {
                console.log(response.data);

                // Clear the form fields
                this.refuelData.vehicleId = '';
                this.refuelData.liters = '';
                this.refuelData.amount = '';
                this.refuelData.distance = '';
                this.refuelData.filledUp = false;
              })
              //if there is an error
              .catch(error => console.error(error));//debug
          },
        init() {
        //get all the cart on page refresh
            axios.get('http://localhost:3000/api/vehicles')
            .then(response =>{
                this.vehicles = response.data.data
            } )
            //catch error 
            .catch(error => console.error(error));//debug

            
        },
    }
});
});