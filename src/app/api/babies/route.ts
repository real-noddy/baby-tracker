import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectToDatabase from '@/lib/db';
import Baby from '@/models/Baby';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET - Fetch all babies for logged-in user
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const babies = await Baby.find({ parent: session.user.id });

    return NextResponse.json({ babies }, { status: 200 });
  } catch (error) {
    console.error('Error fetching babies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch babies' },
      { status: 500 }
    );
  }
}

// POST - Create a new baby
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, birthDate, gender, weight, height } = await request.json();

    if (!name || !birthDate || !gender) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const baby = await Baby.create({
      name,
      birthDate: new Date(birthDate),
      gender,
      weight: weight || undefined,
      height: height || undefined,
      parent: session.user.id,
    });

    return NextResponse.json({ baby }, { status: 201 });
  } catch (error) {
    console.error('Error creating baby:', error);
    return NextResponse.json(
      { error: 'Failed to create baby' },
      { status: 500 }
    );
  }
} 