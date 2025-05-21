import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectToDatabase from '@/lib/db';
import FoodIntake from '@/models/FoodIntake';
import Baby from '@/models/Baby';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET - Fetch all food intake records for a specific baby
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const babyId = searchParams.get('babyId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!babyId) {
      return NextResponse.json(
        { error: 'Baby ID is required' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Verify that the baby belongs to the logged-in user
    const baby = await Baby.findOne({
      _id: babyId,
      parent: session.user.id,
    });

    if (!baby) {
      return NextResponse.json({ error: 'Baby not found' }, { status: 404 });
    }

    // Build query based on filters
    const query: any = { baby: babyId };
    
    if (startDate && endDate) {
      query.consumedAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    } else if (startDate) {
      query.consumedAt = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.consumedAt = { $lte: new Date(endDate) };
    }

    const foodIntakes = await FoodIntake.find(query).sort({ consumedAt: -1 });

    return NextResponse.json({ foodIntakes }, { status: 200 });
  } catch (error) {
    console.error('Error fetching food intakes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch food intakes' },
      { status: 500 }
    );
  }
}

// POST - Create a new food intake record
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { babyId, foodName, foodType, amount, unit, consumedAt, nutritionalInfo, notes } = await request.json();

    if (!babyId || !foodName || !foodType || !amount || !unit) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Verify that the baby belongs to the logged-in user
    const baby = await Baby.findOne({
      _id: babyId,
      parent: session.user.id,
    });

    if (!baby) {
      return NextResponse.json({ error: 'Baby not found' }, { status: 404 });
    }

    const foodIntake = await FoodIntake.create({
      baby: babyId,
      foodName,
      foodType,
      amount,
      unit,
      consumedAt: consumedAt ? new Date(consumedAt) : new Date(),
      nutritionalInfo: nutritionalInfo || {},
      notes: notes || '',
    });

    return NextResponse.json({ foodIntake }, { status: 201 });
  } catch (error) {
    console.error('Error creating food intake:', error);
    return NextResponse.json(
      { error: 'Failed to create food intake' },
      { status: 500 }
    );
  }
} 