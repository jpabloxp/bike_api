'use strict';

const fs = require('fs');

module.exports = {
    
    getBikes: function () {

        var message = "";
        try {
    
            let rawdata = fs.readFileSync('bikesdatabase.json');
            message = JSON.parse(rawdata);
    
        } catch (error) {
            console.log(error);
            message = error;
        }
    
        return message;
    },
    addBike: function (bike) {

        var message = "";
    
        try {

            var jsonData = this.getBikes();
            jsonData.push({        //add the bike
                id: bike.id,
                name: bike.name,
                brand: bike.brand,
                year: bike.year,
                motorType: bike.motorType,
                type: bike.type
            });
            let data = JSON.stringify(jsonData, null, 2);  //reserialize to JSON

            fs.writeFileSync('bikesdatabase.json', data);
            message = "Bike added";
    
        } catch (error) {
            console.log(error);
            message = error;
        }
    
        return message;
    },
    updateBike: function (bike) {

        var message = "";
    
        try {

            var jsonData = this.getBikes();
            jsonData.forEach((jsonBike) => {
                if(jsonBike.id == bike.id){
                    jsonBike.id = bike.id;
                    jsonBike.name = bike.name;
                    jsonBike.brand = bike.brand;
                    jsonBike.year = bike.year;
                    jsonBike.motorType = bike.motorType;
                    jsonBike.type = bike.type;
                }
            });

            let data = JSON.stringify(jsonData, null, 2);  //reserialize to JSON

            fs.writeFileSync('bikesdatabase.json', data);
            message = "Bike updated";
    
        } catch (error) {
            console.log(error);
            message = error;
        }
    
        return message;
    },
    deleteBike: function (bikeId) {

        var message = "";
        var count = 0;
    
        try {

            var jsonData = this.getBikes();
            for (let jsonBike of jsonData) {
                if(jsonBike.id == bikeId) break;
                else count++;
            }
            console.log(jsonData);
            jsonData.splice(count, 1);
            console.log(jsonData);

            let data = JSON.stringify(jsonData, null, 2);  //reserialize to JSON

            fs.writeFileSync('bikesdatabase.json', data);
            message = "Bike deleted";
    
        } catch (error) {
            console.log(error);
            message = error;
        }
    
        return message;
    }
  };