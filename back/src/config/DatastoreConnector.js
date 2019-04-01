const { Gstore, instances } = require('gstore-node');
const { Datastore } = require('@google-cloud/datastore');

class DatastoreConnector {
    static connect() {
        return new Promise((resolve, reject) => {
            try {
                const gstore = new Gstore({ cache: true });
                const datastore = new Datastore({
                    projectId: process.env.PROJECT_ID,
                    namespace: process.env.DATASTORE_NAMESPACE
                });
                gstore.connect(datastore);
                instances.set('default', gstore);
                resolve();
            } catch (err) { reject(err); }
        });
    }
}

module.exports = DatastoreConnector;
