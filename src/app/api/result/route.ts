import { MongoClient } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export async function POST(request: NextRequest) {
    const { name, phoneNumber, score } = await request.json();

    try {
        await client.connect();

        const db = client.db('luna-quiz');
        const collection = db.collection('luna-quiz');

        await collection.insertOne({ name, phoneNumber, score });

        const results = await collection.find({}, { sort: { score: -1 } }).toArray();
        const rank = results.findIndex((result) => result.name === name) + 1;
        const totalResults = results.length;

        return NextResponse.json({ rank, totalResults });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    } finally {
        await client.close();
    }
}
