import clientPromise from '@/utils/mongodb';

async function getDb() {
  const client = await clientPromise;
  const db = client.db('sample_mflix');
  return db.collection('comments').find({}).toArray();
}

export default async function HomePage() {
  const examples = await getDb();
  console.log('e', examples);
  return <p>hi</p>;
}
