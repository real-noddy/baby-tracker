import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectToDatabase from '@/lib/db';
import Activity from '@/models/Activity';
import Baby from '@/models/Baby';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// GET - Fetch all activities for a specific baby
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const babyId = searchParams.get('babyId');
    const activityType = searchParams.get('type');
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
    
    if (activityType) {
      query.type = activityType;
    }
    
    if (startDate && endDate) {
      query.startTime = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    } else if (startDate) {
      query.startTime = { $gte: new Date(startDate) };
    } else if (endDate) {
      query.startTime = { $lte: new Date(endDate) };
    }

    const activities = await Activity.find(query).sort({ startTime: -1 });

    return NextResponse.json({ activities }, { status: 200 });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}

// POST - Create a new activity record
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { babyId, type, details, startTime, endTime, notes } = await request.json();

    if (!babyId || !type) {
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

    const activity = await Activity.create({
      baby: babyId,
      type,
      details: details || {},
      startTime: startTime ? new Date(startTime) : new Date(),
      endTime: endTime ? new Date(endTime) : undefined,
      notes: notes || '',
    });

    return NextResponse.json({ activity }, { status: 201 });
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json(
      { error: 'Failed to create activity' },
      { status: 500 }
    );
  }
} 