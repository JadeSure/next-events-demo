import {MongoClient} from 'mongodb'

async function handler(req, res){
    if(req.method === 'POST'){
        const userEmail = req.body.email;

        if(!userEmail || !userEmail.includes('@')){
            return res.status(422).json({message: 'Invalid email address.'})
        }

        const client = await MongoClient.connect('mongodb+srv://shawn:ao5yrIBmUtaZ4QpZ@cluster0.vd94k.mongodb.net/events?retryWrites=true&w=majority')
       
        const db = client.db();
        await db.collection('newsletter').insertOne({email: userEmail})
        
        client.close()

        return res.status(201).json({message: 'Signed up!'})
    }

    if(req.method === 'GET'){
        // const userEmail = req.body.email;
        // console.log(userEmail);

        // if(!userEmail || !userEmail.includes('@')){
        //     return res.status(422).json({message: 'Invalid email address.'})
        // }

        // console.log(userEmail);
        return res.status(200).json({message: 'Get Methods'})
    }
}

export default handler;