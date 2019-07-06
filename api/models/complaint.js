const mongoose = require('mongoose')

const status={
    UNR:'Unresolved',
    RES:'Resolved'
}

const compType={
    TECH:'Technical',
    GEN:'General',
    LOG:'Logistics',
    COMM:'Communication'
}


// Define a schema for a complaint
const complaint = new mongoose.Schema({
        title: {
            type: String
        },
        complaintType: {
            //Use Enums
            //type: String
            type:compType
        },
        descriptions:{
            type:String
        },
        complaintStatus:{
            type:status
        },
        filedBy:
            {type:String}
        ,
    },
    {timestamps:true}
);


var Complaint = mongoose.model('Complaint', complaint)
module.exports =Complaint
