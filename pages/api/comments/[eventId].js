import {MongoClient} from 'mongodb'

async function handler(req, res){
    const eventId = req.query.eventId;
    const client = await MongoClient.connect('mongodb+srv://shawn:ao5yrIBmUtaZ4QpZ@cluster0.vd94k.mongodb.net/events?retryWrites=true&w=majority')
       
    if (req.method === "POST"){
        const {email, name, text} = req.body.commentData;

        if(!email.includes('@') || !name || name.trim() === '' || !text || text.trim() === ''){
            return res.status(422).json({message: 'invalid input!'})
        }
    
        const newComment = {
            email,
            name,
            text,
            eventId
        }
       
        let db;
        try{
            db = client.db();
        }catch (error){
            return res.status(500).json({message: 'Connecting to the database failed!'})
        }
        
        try{
            await db.collection('comments').insertOne(newComment)
            client.close()
        }catch(error){
            return res.status(500).json({message: "Inserting data failed!"})
        }
       
        return res.status(201).json({message: 'Add comments successful', comment: newComment})
    }

    if(req.method === 'GET'){
        const db = client.db();
        const documents = await db.collection('comments').find({eventId}).sort({_id: -1}).toArray()
        // const dummyList = [
        //     {id: 'c1', name: 'Max', text: 'A first comment!'},
        //     {id: 'c2', name: 'Manuel', text: 'A second comment!'}
        // ]

        return res.status(200).json({comments: documents})
    }

    client.close()
}

export default handler;

