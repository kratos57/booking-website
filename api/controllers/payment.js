import axios from 'axios';



// Define the backend route handling the payment request
export const Add = async (req, res) => {
    const url = "https://developers.flouci.com/api/generate_payment";
    const payload = {
        "app_token": "414e44a4-53f0-4187-9bef-7aaf811a123a", 
        "app_secret": process.env.FLOUCI_SECRET,
        "amount": req.body.amount,
        "accept_card": "true",
        "session_timeout_secs": 1200,
        "success_link": "http://localhost:3000/success", // Update success link
        "fail_link": "http://localhost:3000/failure", // Update fail link
        "developer_tracking_id": "119aea19-7c28-424f-a4c6-bd126aa65edf",
    };

    try {
        const result = await axios.post(url, payload);
        res.send(result.data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

export const Verify = async(req, res)=>{
    const id_payment = req.params.id


    await axios.get( `https://developers.flouci.com/api/verify_payment/${id_payment}`,{
        headers :{
        'Content-Type': 'application/json',
         'apppublic': '414e44a4-53f0-4187-9bef-7aaf811a123a',
          'appsecret': process.env.FLOUCI_SECRET,

        }} ).then(result=>{
            res.send(result.data)
        }).catch(err=>{
            console.log(err.message)
        })
}