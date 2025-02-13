import { MongoClient, ServerApiVersion } from 'mongodb';

interface GlobalMongoClient {
  _mongoClientPromise?: Promise<MongoClient>;
}

declare const global: GlobalMongoClient;

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI가 환경변수에 설정되지 않았습니다.');
}

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
