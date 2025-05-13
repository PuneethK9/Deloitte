const express=require("express")
const mongoose=require("mongoose")
const bodyParser=require("body-parser");
const cors=require("cors");

const app=express();

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/WorkFlows");

import { ObjectID } from mongodb

const workflowschema = {
    Name: String,
    Description: String
}

const stepschema = {
    WorkflowID: ObjectID,
    Name: String,
    Description: String,
    NextSteps: [ step ],
}

const workflow = new mongoose.model("workflow", workflowschema);
const step = new mongoose.model("step", stepschema);

app.post("/workflows", async function(req,res){

    const Name = req.body.Name;
    const Description = req.body.Description;

    const data = new Worker({
        Name: Name,
        Description: Description
    });

    await Worker.insert(data);

    return res.json({ Message:"Added", status:200});
})

app.post("/workflows/:id/steps", async function (req,res) {

    const ID = req.params.id;
    const Name = req.body.Name;
    const Description = req.body.Description;

    const data =  new step({
        Name: Name,
        Description: Description,
        WorkflowID: ID
    });

    await data.save();    
})

app.post("/workflows/:id/dependencies", async function (req,res) {
    
    const stepA = req.body.stepA;
    const stepB = req.body.stepB;

    const checkstepA = step.findOne({_id:stepA._id});
    const checkstepB = step.findOne({_id:stepB._id});

    if(!checkstepA){
        return res.json({Message: "Step doesn't exist",stepID: stepA.ID})
    }
    if(!checkstepA){
        return res.json({Message: "Step doesn't exist", stepID: stepB.ID})
    }

    checkstepB.NextSteps.push(stepA);
    const adddependency = await step.updateOne({_id:stepB.ID, NextSteps:{$set: checkstepB.NextSteps}});
});

app.get("/workflows/:id/details", aysnc function(req, res) {

    const ID = req.params.id;

    const arr = await step.find({WorkflowID:ID});

    return res.json({Step:arr});
})


app.listen(4000,function(){
    console.log("Server Listening at Port 4000");
})
