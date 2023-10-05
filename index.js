const { MongoClient } = require('mongodb');
const { error } = require('console');

const uri = 'mongodb+srv://spider_sorbet:AUO7qmzPxqPfPzc2@maindata.41fxhz2.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const main = async () => {
    try {
        await client.connect();
        console.log(`Connected to MongoDB Atlas`);
        const database = await client.db().admin().listDatabases();
        console.table(database.databases);

    } catch (error) {
        console.error(`Fail to connect:`, error);

    } finally {
        await client.close();

    }
};

main()
    .catch((err) => console.log(err))
    .finally(() => client.close());