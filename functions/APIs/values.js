//values.js

const { db } = require('../util/admin');

exports.getAllValues = (request, response) => {
    db
        .collection('values')
        .where('username', '==', request.user.username)
        .orderBy('createdAt', 'desc')
        .get()
        .then((data) => {
            let values = [];
            data.forEach((doc) => {
                values.push({
                    valueId: doc.id,
                    title: doc.data().title,
                    body: doc.data().body,
                    createdAt: doc.data().createdAt,
                });
            });
            return response.json(values);
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code});
        });
};

exports.getOneValue = (request, response) => {
	db
        .doc(`/values/${request.params.valueId}`)
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return response.status(404).json(
                    { 
                        error: 'Value not found' 
                    });
            }
            if(doc.data().username !== request.user.username){
                return response.status(403).json({error:"Unauthorized"})
            }
			let ValueData = doc.data();
			ValueData.valueId = doc.id;
			return response.json(TodoData);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: error.code });
		});
};

exports.postOneValue = (request, response) => {
    if (request.body.body.trim() === '') {
        return response.status(400).json({ body: 'Must not be empty' });
    }

    if(request.body.title.trim() === '') {
        return response.status(400).json({ title: 'Must not be empty' });
    }

    const newValueItem = {
        title: request.body.title,
        body: request.body.body,
        username: request.user.username,
        createdAt: new Date().toISOString()
    }
    db
        .collection('values')
        .add(newValueItem)
        .then((doc)=>{
            const responseValueItem = newValueItem;
            responseValueItem.id = doc.id;
            return response.json(responseValueItem);
        })
        .catch((err) => {
            response.status(500).json({ error: 'Something went wrong'});
            console.error(err);
        });
};

exports.deleteValue = (request, response) => {
    const document = db.doc(`/values/${request.params.valueId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Value not found' })
            }
            if(doc.data().username !== request.user.username){
                return response.status(403).json({error:"Unauthorized"})
            }
            return document.delete();
        })
        .then(() => {
            response.json({ message: 'Delete successfull' });
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

exports.editValue = ( request, response ) => { 
    if(request.body.todoId || request.body.createdAt){
        response.status(403).json({message: 'Not allowed to edit'});
    }
    let document = db.collection('values').doc(`${request.params.valueId}`);
    document.update(request.body)
    .then(()=> {
        response.json({message: 'Updated successfully'});
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ 
                error: err.code 
        });
    });
};