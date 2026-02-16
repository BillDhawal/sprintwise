import { NextRequest, NextResponse } from 'next/server';

const KIE_BASE_URL = process.env.KIE_BASE_URL || 'https://api.kie.ai';
const KIE_API_KEY = process.env.KIE_API_KEY;

export async function GET(request: NextRequest) {
  if (!KIE_API_KEY) {
    return NextResponse.json(
      { error: 'KIE_API_KEY is not configured' },
      { status: 500 }
    );
  }

  const taskId = request.nextUrl.searchParams.get('taskId');
  if (!taskId) {
    return NextResponse.json(
      { error: 'taskId is required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${KIE_BASE_URL}/api/v1/jobs/recordInfo?taskId=${encodeURIComponent(taskId)}`,
      {
        headers: {
          Authorization: `Bearer ${KIE_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { error: text || `KIE API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('KIE status error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to get status' },
      { status: 500 }
    );
  }
}
